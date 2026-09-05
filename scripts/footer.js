document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#currentYear').textContent = new Date().getFullYear();
    document.querySelector('#lastModified').textContent = document.lastModified;
});