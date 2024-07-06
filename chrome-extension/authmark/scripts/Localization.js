[...document.querySelectorAll('[data-i18n]')].forEach(e => {
    e.textContent = chrome.i18n.getMessage(e.dataset.i18n);
});