import {
    storageSet,
    storageGet
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

    function onSubmit(e) {
        e.preventDefault();
        const email = $emailField.val().trim();
        if (email === '') {
            $emailField.addClass('error');
            return;
        }
        (async () => {
            await storageSet('g2tThingsEmail', email);
            window.close();
        })();
        return false;
    }
    $emailField.on('focus', () => $emailField.removeClass('error'));
    $form.on('submit', onSubmit);
});

