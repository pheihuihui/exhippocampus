import { I_Sources, REQ_NAMES_INSERT, T_Item, T_Item_Form, T_Source } from "../meta/item"
import { CONF_CLIENT } from "../utilities/configurations"
import { serializeItem } from "../utilities/data_transfer"

const contextMenuId = 'id_capture_content'
const serverUrl = CONF_CLIENT.SERVER

type T_Callback = Parameters<typeof chrome.contextMenus.onClicked.addListener>[0]

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: "Capture this page"
    })
})

const listener: T_Callback = function (info, tab) {
    if (info.menuItemId == contextMenuId) {
        let tbid = tab?.id
        if (tbid) {
            chrome.pageCapture.saveAsMHTML({ tabId: tbid }, data => {
                if (data?.size) {
                    insertData('general', {
                        source: 'general',
                        title: 'title',
                        timestamp: Date.now(),
                        language: ['cn'],
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
    let url = `http://${serverUrl}${REQ_NAMES_INSERT[itemType]}`
    let str = await serializeItem(itemType, item)
    let resp = await fetch(url, { method: 'POST', body: str })
    console.log(resp)
}

function buildData<T extends T_Source>(source: T, form: T_Item_Form, details: I_Sources[T], link?: string): T_Item<T> {
    return {
        source: source,
        title: form.title,
        timestamp: Date.now(),
        language: form.language,
        link: link,
        relatedPersons: [],
        details: details,
        tags: []
    }
}

function sendMessageToContent(tab: number) {
    chrome.tabs.sendMessage(tab, 'hello', function (resp) {
        console.log(resp)
    })
}