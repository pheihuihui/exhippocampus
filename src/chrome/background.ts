import { insertNewItem } from "../utilities/mongo_client"

const contextMenuId = 'id_capture_content'

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: "Capture content"
    })
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == contextMenuId) {
            let tbid = tab?.id
            if (tbid) {
                chrome.pageCapture.saveAsMHTML({ tabId: tbid }, data => {
                    let sz = data?.size
                    console.log(sz)
                    if (sz) {
                        insertNewItem(sz.toString())
                    }
                })
            }
        }
    })
})