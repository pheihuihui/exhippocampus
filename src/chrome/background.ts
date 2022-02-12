import { I_Sources, REQ_NAMES_INSERT, T_Item, T_Item_Form, T_Source } from "../meta/item"
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
                    let dt = buildData({
                        title: 'title1',
                        language: ['cn', 'en'],
                        tags: ['tag1']
                    }, {
                        pageContent: data
                    }, 'link1')
                    insertData('general', dt)
                }
            })
        }
    }
}

chrome.contextMenus.onClicked.addListener(listener)

async function insertData<T extends T_Source>(itemType: T, item: T_Item<T>) {
    let url = `${serverUrl}${REQ_NAMES_INSERT[itemType]}`
    let str = await serializeItem(itemType, item)
    console.log(str.length)
    let resp = await fetch(url, { method: 'POST', body: str })
    console.log(resp)
}

function buildData<T extends T_Source>(form: T_Item_Form, details: I_Sources[T], link?: string): T_Item<T> {
    return {
        title: form.title,
        timestamp: Date.now(),
        language: form.language,
        link: link,
        relatedPersons: [],
        details: details,
        tags: []
    }
}