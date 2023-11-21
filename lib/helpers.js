

export async function storageGet(key) {
    const val = await chrome.storage.local.get([key]);
    //return JSON.stringify(val);
    if (!val?.[key]) {
        return undefined;
    }
    try {
        //logThis([key, val?.[key]]);
        return JSON.parse(val?.[key]);
    }
    catch (err) {
        handleError(err.message);
        return undefined;
    }
}

export async function storageSet(key, value) {
    return await chrome.storage.local.set({
        [key]: JSON.stringify(value)
    });
}

export async function getCurrentTabData() {
    // See: https://stackoverflow.com/a/17826527
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs?.[0] ?? undefined;
}

export async function sendMessageToActiveTab(data) {
    const tab = await getCurrentTabData();
    if (!tab) { return; }
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, data, (response) => {
            resolve(response ?? undefined);
            return false;
        });
    });
}

export function openInNewTab(url) {
    return chrome.tabs.create({ url });
}

export async function reloadTabWithUrl(url = '') {
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
        if (tab.url.includes(url)) {
            chrome.tabs.reload(tab.id);
        }
    });
}

export const landingPageUrl = 'https://rafaelgandi.notion.site/Gmail-to-Things-2f99b29adcbc4065b4b729629d2f35a4';
export const feedbackUrl = 'https://www.notion.so/rafaelgandi/Gmail-to-Things-2f99b29adcbc4065b4b729629d2f35a4?pvs=4#66a9574f1b6946b9a55d9756d42dcf5b';