

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