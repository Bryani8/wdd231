const currentUrl = window.location.href;
const formData = new URLSearchParams(window.location.search);

function showValue(paramKey, elementId) {
    const value = formData.get(paramKey);
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value && value.trim() !== "" ? decodeURIComponent(value) : "Not Provided";
    }
}

showValue("fname", "display-fname");
showValue("lname", "display-lname");
showValue("email", "display-email");
showValue("phone", "display-phone");
showValue("bname", "display-organization");
showValue("timestamp", "display-timestamp");