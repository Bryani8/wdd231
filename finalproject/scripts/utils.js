export function updateFooterInfo() {
    const yearSpan = document.querySelector('#currentYear');
    const modifiedSpan = document.querySelector('#lastModified');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
}

export function setupNavigation() {
    const navbutton = document.querySelector('#ham-btn');
    const navBar = document.querySelector('#nav-bar');
    if (navbutton && navBar) {
        navbutton.addEventListener('click', () => {
            navbutton.classList.toggle('show');
            navBar.classList.toggle('show');
        });
    }
}