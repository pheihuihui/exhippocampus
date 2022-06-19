import { I_MessageResponseMap } from "../meta/chrome"
import { T_DoubanMovie } from "../meta/sites/douban_movie"

function response2backgroud<K extends keyof I_MessageResponseMap>(
    mess: K,
    sender: chrome.runtime.MessageSender,
    sendResp: (response?: I_MessageResponseMap[K]) => void
) {
    switch (mess) {
        case 'douban_movie': {
            let mov: I_MessageResponseMap['douban_movie'] = {
                relatedPersons: [],
                tags: []
            }
            // @ts-ignore 
            sendResp(xxx)
            return
        }
        default: {
            alert('11')
            return
        }
    }
}

chrome.runtime.onMessage.addListener(response2backgroud)

function crawlDoubanMoviePage() {
    let res = {} as T_DoubanMovie
    let div = document.getElementById('content') as HTMLDivElement
    let h1 = div.children[1]
    let span1 = h1.children[0].textContent
    let span2 = h1.children[1].textContent?.slice(1, 5)
    res.name = span1 ?? 'none'
    res.year = Number(span2)
    let rt = document.getElementsByClassName('rating_num')[0].textContent
    res.rating = Number(rt)

    let img = document.getElementsByClassName('nbgnbg')[0]?.children[0]?.getAttribute('src')
    res.img = img ?? undefined

    let sid = document.URL.split('/')[4]
    res.sid = sid

    let spanintro = document.querySelector('[property="v:summary"]')
    res.intro = spanintro?.textContent?.trim() ?? undefined

    res.director = []
    document.querySelectorAll('[rel="v:directedBy"]').forEach(x => {
        if (x.textContent) {
            res.director.push(x.textContent)
        }
    })

    res.writer = []
    let spanwriter = document.getElementsByClassName('attrs')[1]
    spanwriter.childNodes.forEach(x => {
        let txt = x.textContent
        if (txt && txt != ' / ') {
            res.writer.push(txt)
        }
    })

    res.actor = []
    let spanactor = document.getElementsByClassName('attrs')[2]
    spanactor.childNodes.forEach(x => {
        if (x.nodeName == 'SPAN') {
            let txt = x.childNodes[0].textContent
            if (txt && txt != ' / ') {
                res.actor.push(txt)
            }
        }
    })

    res.genre = []
    document.querySelectorAll('[property="v:genre"]').forEach(x => {
        if (x.textContent) {
            res.genre.push(x.textContent)
        }
    })

    let nodenames = ['制片国家/地区:', '语言:', '又名:', 'IMDb:']
    let nodes = document.getElementById('info')?.childNodes
    let len = nodes?.length
    if (nodes && len) {
        let arr = Array.from(nodes)
        let nodeids = nodenames.map(x => arr.findIndex(n => n.textContent == x))
        let nodetxts = nodeids.map(x => arr[x + 1].textContent)

        res.country = []
        if (nodetxts[0]) {
            res.country = nodetxts[0].split('/').map(x => x.trim())
        }

        res.language = []
        if (nodetxts[1]) {
            res.language = nodetxts[1].split('/').map(x => x.trim())
        }

        res.subname = []
        if (nodetxts[2]) {
            res.subname = nodetxts[2].split('/').map(x => x.trim())
        }

        if (nodetxts[3]) {
            res.imdb = nodetxts[3].trim()
        }

    }

    console.log(res)
    return res
}

if (document.URL.indexOf('https://movie.douban.com/subject/') == 0) {
    let res = crawlDoubanMoviePage()
    console.log(res)
}