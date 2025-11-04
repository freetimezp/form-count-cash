const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");
const inputs = document.querySelectorAll("#formContainer input");
const totalDisplay = document.getElementById("total");
const info = document.getElementById("info");

// Modal open
openModal.addEventListener("click", () => {
    const today = new Date().toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const store = "Store A"; // could be dynamic
    const user = "John Doe"; // could be from login data
    const register = "№3";
    info.textContent = `${today} • ${store} • ${user} • Cash Register ${register}`;
    modalOverlay.style.display = "flex";
});

// Modal close
closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

// Calculate total
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        let total = 0;
        inputs.forEach((i) => {
            const count = parseFloat(i.value) || 0;
            const val = parseFloat(i.dataset.value);
            total += count * val;
        });
        totalDisplay.textContent = total.toFixed(2) + " ₴";
    });
});
