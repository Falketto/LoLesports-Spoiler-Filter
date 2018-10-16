chrome.runtime.onInstalled.addListener(() => { chrome.storage.sync.set({ isOn: true }); })
chrome.browserAction.setBadgeBackgroundColor({ color: "#cec984" });
chrome.browserAction.setBadgeText({ text: "ON" });
chrome.browserAction.onClicked.addListener(() => {
    chrome.storage.sync.get(['isOn'], (data) => {
        if (data.isOn == true) {
            chrome.browserAction.setBadgeText({ text: "OFF" });
            chrome.storage.sync.set({ isOn: false });
            chrome.tabs.query({ url: "https://*.lolesports.com/schedule*" },
                data => {
                    console.log(data);
                    for (i = 0; i < data.length; i++) {
                        chrome.tabs.reload(data[i].id);
                    }
                });
        } else {
            chrome.browserAction.setBadgeText({ text: "ON" });
            chrome.storage.sync.set({ isOn: true });
            chrome.tabs.query({ url: "https://*.lolesports.com/schedule*" },
                data => {
                    for (i = 0; i < data.length; i++) {
                        chrome.tabs.reload(data[i].id);
                    }
                });
        }
    })
});