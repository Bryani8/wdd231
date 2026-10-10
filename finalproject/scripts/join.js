import { updateFooterInfo, setupNavigation } from './utils.js';
document.addEventListener("DOMContentLoaded", () => {
    updateFooterInfo();
    setupNavigation();
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});