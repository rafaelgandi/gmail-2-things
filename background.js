import {
    sendMessageToActiveTab,
    storageSet,
    storageGet,
    openInNewTab
} from './lib/helpers.js';



(async () => {

    // See: https://dev.to/paulasantamaria/adding-shortcuts-to-your-chrome-extension-2i20
    chrome.commands.onCommand.addListener(function setKeyboardShortcut(command) {
        switch (command) {
            case 'open-g2t-dialog':
                sendMessageToActiveTab({
                    message: 'open-g2t-dialog'
                });
                break;
            default:
                console.log(`Command ${command} not found`);
        }
    });

    chrome.runtime.onInstalled.addListener(function onStashExtensionInstall(details) {
        // console.log(details);
        console.log('Running on install listeners');
        // LM: 2023-11-02 16:01:23 [If user has updated the extension.]
        // See: https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update
        if (details?.reason === 'update') {
            if (details?.previousVersion !== chrome.runtime.getManifest().version) {
                // openInNewTab(onStashUpdateNotionPage); // Open review campaign notion page.
            }
        }
        (async () => {
            const g2tThingsEmail = await storageGet('g2tThingsEmail');
            if (!g2tThingsEmail) {
                storageSet('g2tThingsEmail', '');
            }
        })();
    });

})()