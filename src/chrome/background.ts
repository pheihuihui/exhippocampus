import { insertOneItem } from "../client/request"
import { I_MessageResponseMap } from "../meta/chrome"
import { CONF_CLIENT } from "../utilities/configurations"
import { sleep } from "../utilities/others"

const contextMenuId_page = 'id_capture_page'
const contextMenuId_image = 'id_capture_image'
const serverUrl = CONF_CLIENT.SERVER

type T_Callback = Parameters<typeof chrome.contextMenus.onClicked.addListener>[0]

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId_page,
        title: 'capture page',
        contexts: ['page']
    })
    chrome.contextMenus.create({
        id: contextMenuId_image,
        title: 'capture image',
        contexts: ["image"]
    })
})

const listener: T_Callback = async function (info, tab) {
    if (info.menuItemId == contextMenuId_page) {
        let tbid = tab?.id
        if (tbid) {

            let site = info.pageUrl.split('/')[2]

            switch (site) {
                case 'movie.douban.com': {
                    let resp = await sendMessageToContent(tbid, 'douban_movie')
                    // await insertOneItem('douban_movie', {
                    //     source: 'douban_movie',
                    //     title: 'title',
                    //     timestamp: Date.now(),
                    //     language: 'none',
                    //     details: {},
                    //     tags: [],
                    //     link: tab?.url
                    // })
                    break
                }
                case 'book.douban.com': {
                    break
                }
                default: {
                    sendMessageToContent(tbid, 'general')
                    let window = await chrome.windows.getCurrent()
                    if (window.id) {
                        console.log(window.id)
                        await chrome.windows.update(window.id, { state: 'normal', height: 1000, width: 1275 })
                        await sleep(500)

                        let txt = await getContentFromCurrentPage(tbid)
                        await insertOneItem('general', {
                            source: 'general',
                            title: 'title',
                            timestamp: Date.now(),
                            language: ['cn'],
                            details: {
                                type: 'mhtml',
                                content: txt!
                            },
                            tags: [],
                            link: tab?.url,
                            relatedPersons: []
                        })

                        await sleep(500)
                        await chrome.windows.update(window.id, { state: 'maximized' })
                    }
                    break
                }
            }
        }
    }
    if (info.menuItemId == contextMenuId_image) {
        let url = info.srcUrl
        if (url) {
            fetch(url)
                .then(x => x.blob())
                .then(console.log)
        }
    }
}

chrome.contextMenus.onClicked.addListener(listener)

async function getContentFromCurrentPage(tabid: number) {
    return new Promise<string>((resolve, reject) => {
        chrome.pageCapture.saveAsMHTML({ tabId: tabid }, async data => {
            if (data?.size) {
                let txt = await data.text()
                resolve(txt)
            } else {
                reject('no data')
            }
        })
    })
}

function sendMessageToContent<K extends keyof I_MessageResponseMap>(tab: number, mess: K) {
    return new Promise<I_MessageResponseMap[K]>(resolve => {
        chrome.tabs.sendMessage<K, I_MessageResponseMap[K]>(tab, mess, function (resp) {
            resolve(resp)
        })
    })
}