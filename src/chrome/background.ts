import { REQ_NAMES_INSERT, T_Item, T_Source } from "../meta/item"
import { serializeItem } from "../utilities/data_transfer"

const contextMenuId = 'id_capture_content'
const serverUrl = 'http://127.0.0.1:30000'

type T_Callback = (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab | undefined) => void

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: "Capture content"
    })
})

const listener: T_Callback = function (info, tab) {
    if (info.menuItemId == contextMenuId) {
        let tbid = tab?.id
        if (tbid) {
            chrome.pageCapture.saveAsMHTML({ tabId: tbid }, data => {
                if (data?.size) {
                    insertData('general', {
                        title: 'title',
                        timestamp: Date.now(),
                        language: 'none',
                        link: 'ssss',
                        relatedPersons: [],
                        details: {
                            pageContent: data
                        },
                        tags: []
                    })
                }
            })
        }
    }
}

chrome.contextMenus.onClicked.addListener(listener)

async function insertData<T extends T_Source>(itemType: T, item: T_Item<T>) {
    let url = `${serverUrl}${REQ_NAMES_INSERT[itemType]}`
    let str = await serializeItem(itemType, item)
    console.log(str)
    let resp = await fetch(url, { method: 'POST', body: str })
    console.log(resp)
}
