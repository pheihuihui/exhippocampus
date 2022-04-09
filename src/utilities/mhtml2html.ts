import * as QuotedPrintable from 'quoted-printable'
import { JSDOM } from 'jsdom'

type T_Asset = {
    encoding: string,
    type: string,
    data: string,
    id: string
}

type T_Frame = Record<string, T_Asset>

type T_Media = Record<string, T_Asset>

type T_MHTML = {
    frames: T_Frame
    media: T_Media
    index?: string
}

// Asserts a condition.
function assert(condition: boolean, error: string) {
    if (!condition) {
        throw new Error(error);
    }
    return true;
}

// Returns an absolute url from base and relative paths.
function absoluteURL(base: string, relative: string) {
    if (relative.indexOf('http://') === 0 || relative.indexOf('https://') === 0) {
        return relative;
    }

    const stack = base.split('/');
    const parts = relative.split('/');

    stack.pop();

    for (const u of parts) {
        if (u == '.') {
            continue
        } else if (u == '..') {
            stack.pop()
        } else {
            stack.push(u)
        }
    }

    return stack.join('/');
}

// Replace asset references with the corresponding data.
function replaceReferences(media: T_Media, base: string, asset: string) {
    const CSS_URL_RULE = 'url(';
    let reference, i;

    for (i = 0; (i = asset.indexOf(CSS_URL_RULE, i)) > 0; i += reference.length) {
        i += CSS_URL_RULE.length;
        reference = asset.substring(i, asset.indexOf(')', i));

        // Get the absolute path of the referenced asset.
        const path = absoluteURL(base, reference.replace(/(\"|\')/g, ''));
        if (media[path] != null) {
            if (media[path].type === 'text/css') {
                media[path].data = replaceReferences(media, base, media[path].data);
            }
            // Replace the reference with an encoded version of the resource.
            try {
                let tmp = media[path].encoding == 'base64' ? media[path].data : Buffer.from(media[path].data).toString('base64')
                const embeddedAsset = `'data:${media[path].type};base64,${tmp}'`;
                asset = `${asset.substring(0, i)}${embeddedAsset}${asset.substring(i + reference.length)}`;
            } catch (e) {
                console.warn(e);
            }
        }
    }
    return asset;
}

// Converts the provided asset to a data URI based on the encoding.
function convertAssetToDataURI(asset: T_Asset) {
    switch (asset.encoding) {
        case 'quoted-printable':
            return `data:${asset.type};utf8,${escape(QuotedPrintable.decode(asset.data))}`;
        case 'base64':
            return `data:${asset.type};base64,${asset.data}`;
        default:
            return `data:${asset.type};base64,${Buffer.from(asset.data).toString('base64')}`;
    }
}

export const mhtml2html = {

    parse: (mhtml: string, htmlOnly = false) => {

        const MHTML_FSM = {
            MHTML_HEADERS: 0,
            MTHML_CONTENT: 1,
            MHTML_DATA: 2,
            MHTML_END: 3
        };

        let asset: T_Asset,
            headers: Record<string, string>,
            content: Record<string, string>,
            media: T_Media,
            frames: T_Frame                     // Record-keeping.
        let location, encoding, type, id;       // Content properties.
        let state: number,
            key: string,
            next: string,
            index: string | undefined,
            i: number,
            l: number                           // States.
        let boundary: string                    // Boundaries.

        headers = {};
        content = {};
        media = {};
        frames = {};

        // Initial state and index.
        state = MHTML_FSM.MHTML_HEADERS;
        i = l = 0;

        // Discards characters until a non-whitespace character is encountered.
        function trim() {
            while (assert(i < mhtml.length - 1, 'Unexpected EOF') && /\s/.test(mhtml[i])) {
                i += 1
                if (mhtml[i] == '\n') {
                    l += 1
                }
            }
        }

        // Returns the next line from the index.
        function getLine(encoding?: string) {
            const j = i;

            // Wait until a newline character is encountered or when we exceed the str length.
            while (mhtml[i] !== '\n' && assert(i++ < mhtml.length - 1, 'Unexpected EOF'))

                i += 1
            l += 1

            const line = mhtml.substring(j, i);

            // Return the (decoded) line.
            if (encoding == 'quoted-printable') {
                return QuotedPrintable.decode(line);
            }
            if (encoding == 'base64') {
                return line.trim();
            }
            return line;
        }

        // Splits headers from the first instance of ':'.
        function splitHeaders(line: string, obj: Record<string, string>) {
            const m = line.indexOf(':');
            if (m > -1) {
                key = line.substring(0, m).trim();
                obj[key] = line.substring(m + 1, line.length).trim();
            } else {
                assert(typeof key != 'undefined', `Missing MHTML headers; Line ${l}`);
                obj[key] += line.trim();
            }
        }

        while (state != MHTML_FSM.MHTML_END) {
            switch (state) {
                // Fetch document headers including the boundary to use.
                case MHTML_FSM.MHTML_HEADERS: {
                    next = getLine();
                    // Use a new line or null character to determine when we should
                    // stop processing headers.
                    if (next != '\n') {
                        splitHeaders(next, headers);
                    } else {
                        assert(typeof headers['Content-Type'] !== 'undefined', `Missing document content type; Line ${l}`);
                        const matches = headers['Content-Type'].match(/boundary=(.*)/m);

                        // Ensure the extracted boundary exists.
                        assert(matches != null, `Missing boundary from document headers; Line ${l}`);
                        boundary = matches![1].replace(/\"/g, '');

                        trim();
                        next = getLine();

                        // Expect the next boundary to appear.
                        assert(next.includes(boundary), `Expected boundary; Line ${l}`);
                        content = {};
                        state = MHTML_FSM.MTHML_CONTENT;
                    }
                    break;
                }

                // Parse and store content headers.
                case MHTML_FSM.MTHML_CONTENT: {
                    next = getLine();

                    // Use a new line or null character to determine when we should
                    // stop processing headers.
                    if (next != '\n') {
                        splitHeaders(next, content);
                    } else {
                        encoding = content['Content-Transfer-Encoding'];
                        type = content['Content-Type'];
                        id = content['Content-ID'];
                        location = content['Content-Location'];

                        // Assume the first boundary to be the document.
                        if (typeof index == 'undefined') {
                            index = location;
                            assert(typeof index !== 'undefined' && type === "text/html", `Index not found; Line ${l}`);
                        }

                        // Ensure the extracted information exists.
                        assert(typeof id !== 'undefined' || typeof location !== 'undefined',
                            `ID or location header not provided;  Line ${l}`);
                        assert(typeof encoding !== 'undefined', `Content-Transfer-Encoding not provided;  Line ${l}`);
                        assert(typeof type !== 'undefined', `Content-Type not provided; Line ${l}`);

                        asset = {
                            encoding: encoding,
                            type: type,
                            data: '',
                            id: id
                        };

                        // Keep track of frames by ID.
                        if (typeof id !== 'undefined') {
                            frames[id] = asset;
                        }

                        // Keep track of resources by location.
                        if (typeof location !== 'undefined' && typeof media[location] === 'undefined') {
                            media[location] = asset;
                        }

                        trim();
                        content = {};
                        state = MHTML_FSM.MHTML_DATA;
                    }
                    break;
                }

                // Map data to content.
                case MHTML_FSM.MHTML_DATA: {
                    next = getLine(encoding);

                    // Build the decoded string.
                    while (!next.includes(boundary!)) {
                        asset!.data += next;
                        next = getLine(encoding);
                    }

                    try {
                        // Decode unicode.
                        asset!.data = decodeURIComponent(escape(asset!.data));
                    } catch (e) { e; }

                    // Ignore assets if 'htmlOnly' is set.
                    if (htmlOnly === true && typeof index !== 'undefined') {
                        // return parseDOM(asset!.data);
                    }

                    // Set the finishing state if there are no more characters.
                    state = (i >= mhtml.length - 1 ? MHTML_FSM.MHTML_END : MHTML_FSM.MTHML_CONTENT);
                    break;
                }
            }
        }

        return {
            frames: frames,
            media: media,
            index: index
        } as T_MHTML
    },

    convert: (_mhtml: string | T_MHTML, convertIframes = false) => {

        const parseDOM = (html: string) => new JSDOM(html)

        let style: HTMLStyleElement
        let base
        let img

        let href: string | null = null
        let src: string | null = null

        let mhtml: T_MHTML

        if (typeof _mhtml === "string") {
            mhtml = mhtml2html.parse(_mhtml);
        } else {
            assert(typeof _mhtml === "object", 'Expected argument of type string or object')
            mhtml = _mhtml
        }

        let frames = mhtml.frames;
        let media = mhtml.media;
        let index = mhtml.index;

        if (index == undefined) {
            return null
        }

        assert(typeof frames === "object", 'MHTML error: invalid frames');
        assert(typeof media === "object", 'MHTML error: invalid media');
        assert(typeof index === "string", 'MHTML error: invalid index');
        assert(media[index] && media[index].type === "text/html", 'MHTML error: invalid index');

        const dom = parseDOM(media[index].data);
        const documentElem = dom.window.document;
        const nodes: Array<Document | HTMLElement> = [documentElem];

        // Merge resources into the document.
        while (nodes.length) {
            const childNode = nodes.shift();

            // Resolve each node.
            let cns = childNode?.childNodes as NodeListOf<HTMLElement & { src?: string }> | undefined

            cns?.forEach(function (child) {
                if (child.getAttribute) {
                    href = child.getAttribute('href');
                    src = child.getAttribute('src');
                }
                if (child.removeAttribute) {
                    child.removeAttribute('integrity');
                }
                switch (child.tagName) {
                    case 'HEAD':
                        // Link targets should be directed to the outer frame.
                        base = documentElem.createElement("base");
                        base.setAttribute("target", "_parent");
                        child.insertBefore(base, child.firstChild);
                        break;

                    case 'LINK':
                        if (!href) {
                            break
                        }
                        if (typeof media[href] !== 'undefined' && media[href].type === 'text/css') {
                            // Embed the css into the document.
                            style = documentElem.createElement('style');
                            style.type = 'text/css';
                            media[href].data = replaceReferences(media, href, media[href].data);
                            style.appendChild(documentElem.createTextNode(media[href].data));
                            childNode!.replaceChild(style, child);
                        }
                        break;

                    case 'STYLE':
                        style = documentElem.createElement('style');
                        style.type = 'text/css';
                        if (index == undefined) {
                            return null
                        }
                        style.appendChild(documentElem.createTextNode(replaceReferences(media, index, child.innerHTML)));
                        childNode!.replaceChild(style, child);
                        break;

                    case 'IMG':
                        img = null;
                        if (!src) {
                            break
                        }
                        if (typeof media[src] !== 'undefined' && media[src].type.includes('image')) {
                            // Embed the image into the document.
                            try {
                                img = convertAssetToDataURI(media[src]);
                            } catch (e) {
                                console.warn(e);
                            }
                            if (img !== null) {
                                child.setAttribute('src', img);
                            }
                        }
                        if (index == undefined) {
                            return null
                        }
                        child.style.cssText = replaceReferences(media, index, child.style.cssText);
                        break;

                    case 'IFRAME':
                        if (convertIframes == true && src) {
                            const id = `<${src.split('cid:')[1]}>`;
                            const frame = frames[id];

                            if (frame && frame.type === 'text/html') {
                                let __mhtml: T_MHTML = {
                                    media: Object.assign({}, media, { [id]: frame }),
                                    frames: frames,
                                    index: id
                                }
                                const iframe = mhtml2html.convert(__mhtml, convertIframes);
                                if (!iframe) {
                                    break
                                }
                                child.src = `data:text/html;charset=utf-8,${encodeURIComponent(iframe.window.document.documentElement.outerHTML)}`
                            }
                        }
                        break;

                    default:
                        if (child.style && index) {
                            child.style.cssText = replaceReferences(media, index, child.style.cssText);
                        }
                        break;
                }
                nodes.push(child);
            });
        }
        return dom;
    }

}
