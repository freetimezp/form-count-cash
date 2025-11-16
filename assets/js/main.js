const info = document.querySelector("#info");
const docTotal = document.querySelector("#docTotal");
const tableBody = document.querySelector("#BanknotDoc");

document.querySelector("#ModalBanknotDoc").addEventListener("show.bs.modal", () => {
    const today = new Date().toLocaleDateString("uk-UA");
    info.textContent = `${today} • Магазин 3 • Олена Петрівна • Каса №3`;
});

const moneyData = [
    { name: "1000 грн.", value: 1000 },
    { name: "500 грн.", value: 500 },
    { name: "200 грн.", value: 200 },
    { name: "100 грн.", value: 100 },
    { name: "50 грн.", value: 50 },
    { name: "20 грн.", value: 20 },
    { name: "10 грн.", value: 10 },
    { name: "5 грн.", value: 5 },
    { name: "2 грн.", value: 2 },
    { name: "1 грн.", value: 1 },
    { name: "10 грн.(коп.)", value: 10 },
    { name: "5 грн.(коп.)", value: 5 },
    { name: "2 грн.(коп.)", value: 2 },
    { name: "1 грн.(коп.)", value: 1 },
    { name: "50 коп.", value: 0.5 },
    { name: "25 коп.", value: 0.25 },
    { name: "10 коп.", value: 0.1 },
];

function buildTable() {
    tableBody.innerHTML = "";

    moneyData.forEach((item, index) => {
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
