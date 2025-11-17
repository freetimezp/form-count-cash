const info = document.querySelector("#info");
const docTotal = document.querySelector("#docTotal");
const tableBody = document.querySelector("#BanknotDoc");

document.querySelector("#ModalBanknotDoc").addEventListener("show.bs.modal", () => {
    const today = new Date().toLocaleDateString("uk-UA");
    info.textContent = `${today} • Магазин 3 • Олена Петрівна • Каса №3`;
});

function buildTable() {
    tableBody.innerHTML = "";

    if (moneyData) {
        const moneyArray = Object.entries(moneyData).map(([name, value]) => ({
            name,
            value,
        }));

        moneyArray.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.value}</td>
                <td>
                    <input type="number" 
                           class="form-control form-control-sm count-input" 
                           data-value="${item.value}" 
                           min="0" value="0"
                           style="max-width: 90px">
                </td>
                <td class="sum-cell">0.00</td>
            `;

            tableBody.appendChild(row);
        });
    }
}

function updateTotals() {
    let total = 0;

    document.querySelectorAll(".count-input").forEach((input) => {
        const count = Number(input.value);
        const value = Number(input.dataset.value);

        const rowSum = count * value;

        input.closest("tr").querySelector(".sum-cell").textContent = rowSum.toFixed(2);
        total += rowSum;
    });

    docTotal.value = `${total.toFixed(2)} грн`;
}

buildTable();

document.addEventListener("input", (e) => {
    if (e.target.classList.contains("count-input")) {
        updateTotals();
    }
});
