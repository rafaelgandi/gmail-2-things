
(async () => {
    async function getCurrentTabData() {
        // See: https://stackoverflow.com/a/17826527
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        return tabs?.[0] ?? undefined;
    }
    
    async function sendMessageToActiveTab(data) {
        const tab = await getCurrentTabData();
        if (!tab) { return; }
        return new Promise((resolve) => {
            chrome.tabs.sendMessage(tab.id, data, (response) => {
                resolve(response ?? undefined);
                return false;
            });
        });
    }
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

})()