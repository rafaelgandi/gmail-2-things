import {
    storageSet,
    storageGet,
    reloadTabWithUrl,
    openInNewTab,
    landingPageUrl,
    feedbackUrl
} from './lib/helpers.js';


Zepto(() => {
    const $emailSection = Zepto('#g2t__email-input-section');
    const $form = $emailSection.find('form');
    const $emailField = Zepto('#g2t__things-email-input');
    
    // Set stored email if it exists //
    (async () => {
        const storedEmail = await storageGet('g2tThingsEmail') ?? '';
        $emailField.val(storedEmail);
    })();

    function showSection(id) {
        Zepto('.g2t__section').addClass('hide');
        Zepto(`#${id}`).removeClass('hide');
    }

    function onSubmit(e) {
        e.preventDefault();
        const email = $emailField.val().trim();
        if (email === '') {
            $emailField.addClass('error');
            return;
        }
        (async () => {
            await storageSet('g2tThingsEmail', email);
            await reloadTabWithUrl('mail.google.com');
            window.close();
        })();
        return false;
    }
    $emailField.on('focus', () => $emailField.removeClass('error'));
    $form.on('submit', onSubmit);
    Zepto(document)
    .on('click', '#g2t__feedback-link', (e) => {
        e.preventDefault();
        openInNewTab(feedbackUrl);
        return false;
    })
    .on('click', '#g2t__about-link', (e) => {
        e.preventDefault();
        showSection('g2t__about-section');
        return false;
    });


    document.getElementById('g2t__version-con').innerHTML = chrome.runtime.getManifest().version;
    Zepto('.g2t__landing-page-link').attr('href', landingPageUrl);
});

