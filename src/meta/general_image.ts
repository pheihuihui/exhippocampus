import { dataURItoBlob_node, _readAsDataURL } from "../utilities/others";

export type T_GeneralImage = {
    mimeType: string,
    hash?: string
    content: Blob
}

async function sha1(source: string) {
    const sourceBytes = new TextEncoder().encode(source);
    const digest = await crypto.subtle.digest("SHA-1", sourceBytes);
    const resultBytes = [...new Uint8Array(digest)];
    return resultBytes.map(x => x.toString(16).padStart(2, '0')).join("");
}

export async function serializeImage(img: T_GeneralImage) {
    let content = img.content
    let dt = await _readAsDataURL(content)
    img.hash = await sha1(dt)
    // @ts-ignore
    img.content = dt
    return JSON.stringify(img)
}

export async function deserializeImage(str: string) {
    let obj = JSON.parse(str)
    let ctt = dataURItoBlob_node(obj.content)
    obj.content = ctt
    return obj
}