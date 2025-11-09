const openModal = document.querySelector("#cash-count #openModal");
const closeModal = document.querySelector("#cash-count #closeModal");
const modalOverlay = document.querySelector("#cash-count #modalOverlay");
const inputs = document.querySelectorAll("#cash-count #formContainer input");
const totalDisplay = document.querySelector("#cash-count #total");
const info = document.querySelector("#cash-count #info");

// Modal open
openModal.addEventListener("click", () => {
    const today = new Date().toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const store = "Магазин 3";
    const user = "Олена Петрівна";
    const register = "№3";
    info.textContent = `${today} • ${store} • ${user} • Каса ${register}`;
    modalOverlay.style.display = "flex";
});

// Modal close
closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

// Calculate total + update summary + animated total
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        let total = 0;
        let summaryData = [];

        inputs.forEach((i) => {
            const count = parseFloat(i.value) || 0;
            const val = parseFloat(i.dataset.value);
            const subtotal = count * val;

            if (count > 0) {
                summaryData.push({ denom: val, count, subtotal });
                total += subtotal;
            } else {
                total += subtotal;
            }
        });

        // Update summary table
        const summaryTable = document.querySelector("#cash-count #summaryTable");
        summaryTable.innerHTML = "";

        if (summaryData.length === 0) {
            summaryTable.innerHTML = `<p class="placeholder">Заповніть поля, щоб побачити підсумок 💰</p>`;
        } else {
            summaryData.sort((a, b) => b.denom - a.denom);
            summaryData.forEach((item) => {
                const denomLabel = item.denom >= 1 ? `${item.denom} грн` : `${item.denom * 100} коп`;
                summaryTable.innerHTML += `
                    <p>
                        <span>${denomLabel}</span>
                        <span>× ${item.count}</span>
                        <span>= ${item.subtotal.toFixed(2)} ₴</span>
                    </p>
                `;
            });
        }

        // Animate total display
        animateTotal(total);
    });
});

// --- Animated total counter ---
let lastTotal = 0;
function animateTotal(newTotal) {
    const duration = 400;
    const frameRate = 1000 / 60;
    const steps = Math.round(duration / frameRate);
    const increment = (newTotal - lastTotal) / steps;
    let current = lastTotal;
    let step = 0;

    totalDisplay.classList.add("updated");

    const counter = setInterval(() => {
        step++;
        current += increment;
        totalDisplay.textContent = current.toFixed(2) + " ₴";

        if (step >= steps) {
            clearInterval(counter);
            totalDisplay.textContent = newTotal.toFixed(2) + " ₴";
            totalDisplay.classList.remove("updated");
            lastTotal = newTotal;
        }
    }, frameRate);
}

const themeToggle = document.querySelector("#cash-count #themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Toggle icon (moon/sun)
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "🌞";
    } else {
        themeToggle.textContent = "🌙";
    }
});

// --- Cash & Non-Cash total calculation ---
const cashInputs = document.querySelectorAll("#cash-count #cash-non-cash input");
const totalSumDisplay = document.querySelector("#cash-count .total_sum span");

// Function to update document total
function updateDocumentTotal() {
    let totalSum = 0;
    cashInputs.forEach((input) => {
        const value = parseFloat(input.value) || 0;
        totalSum += value;
    });

    totalSumDisplay.textContent = `${totalSum.toFixed(2)} грн.`;
    totalSumDisplay.classList.add("updated");

    setTimeout(() => totalSumDisplay.classList.remove("updated"), 500);
}

// Listen for changes on both fields
cashInputs.forEach((input) => {
    input.addEventListener("input", updateDocumentTotal);
});
