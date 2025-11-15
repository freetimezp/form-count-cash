const info = document.querySelector("#info");
const totalDisplay = document.querySelector("#total");
const summaryList = document.querySelector("#summaryList");
const docTotal = document.querySelector("#docTotal");

// Fill modal header info
document.getElementById("cashModal").addEventListener("show.bs.modal", () => {
    const today = new Date().toLocaleDateString("uk-UA");
    info.textContent = `${today} • Магазин 3 • Олена Петрівна • Каса №3`;
});

// Denominations
const banknotes = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
const coins = [10, 5, 2, 1, 0.5, 0.25];

function renderInputs(id, values) {
    const container = document.getElementById(id);
    values.forEach((v) => {
        container.innerHTML += `
            <div class="input-group justify-content-between">
                <span class="input-group-text" style="width: 90px;">${v >= 1 ? v + " грн" : v * 100 + " коп"}</span>
                <input type="number" style="max-width: 150px;" class="form-control denom-input" data-value="${v}" min="0">
            </div>`;
    });
}

renderInputs("banknotes", banknotes);
renderInputs("coins", coins);

// Calculate totals
function updateTotals() {
    const inputs = document.querySelectorAll(".denom-input");
    let total = 0;
    let items = [];

    inputs.forEach((inp) => {
        const count = parseFloat(inp.value) || 0;
        const value = parseFloat(inp.dataset.value);
        if (count > 0) {
            const subtotal = count * value;
            items.push({ value, count, subtotal });
            total += subtotal;
        }
    });

    // Update summary list
    summaryList.innerHTML = "";
    if (items.length === 0) {
        summaryList.innerHTML = `<li class="list-group-item text-muted">Заповніть поля</li>`;
    } else {
        items.sort((a, b) => b.value - a.value);
        items.forEach((i) => {
            summaryList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between">
                    <span>${i.value >= 1 ? i.value + " грн" : i.value * 100 + " коп"}</span>
                    <span>× ${i.count}</span>
                    <strong>${i.subtotal.toFixed(2)} грн</strong>
                </li>`;
        });
    }

    totalDisplay.textContent = total.toFixed(2) + " грн";
}

document.addEventListener("input", (e) => {
    if (e.target.classList.contains("denom-input")) {
        updateTotals();
    }
});

// Cash & Noncash
document.querySelectorAll(".cash-input").forEach((inp) => {
    inp.addEventListener("input", () => {
        let s = 0;
        document.querySelectorAll(".cash-input").forEach((i) => (s += parseFloat(i.value) || 0));
        docTotal.textContent = s.toFixed(2) + " грн";
    });
});

// Theme switch
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
});
