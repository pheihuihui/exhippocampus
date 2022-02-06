const contextMenuId = 'id_capture_page'

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: "Capture page"
    })
    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId == contextMenuId) {
            console.log(info.pageUrl)
            let tbid = tab?.id
            console.log(tbid)
            if (tbid) {
                chrome.pageCapture.saveAsMHTML({ tabId: tbid }, data => {
                    console.log(data?.size)
                })
            }
        }
    })
})