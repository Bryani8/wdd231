document.addEventListener("DOMContentLoaded", () => {
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");
    const dialogs = document.querySelectorAll("dialog");

    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    dialogs.forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                dialog.close();
            }
        });
    });

    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});