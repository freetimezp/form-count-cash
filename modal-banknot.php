<?php //include $_SERVER["DOCUMENT_ROOT"] . "/app/controllers/check.php";
//$check_deffered = selectAllCheckDeffered(['check_status_id' => 1]);
//tt($_SESSION['check_deffered']);

$moneyData = [
    "1000" => 1000,
    "500"  => 500,
    "200"  => 200,
    "100"  => 100,
    "50"   => 50,
    "20"   => 20,
    "10"   => 10,
    "5"    => 5,
    "2"    => 2,
    "1"    => 1,
    "0.5"  => 0.5,
    "0.25" => 0.25,
    "0.1"  => 0.1
];

$jsonMoneyData = json_encode($moneyData);
?>
<style>
.catalog-modal .modal-dialog {
    width: 80%;
    max-width: 80%;
}

.catalog-modal .search-box {
    margin: 20px 0;
}

.catalog-modal .catalog {
    height: 50vh;
    max-height: 50vh;
    overflow-y: scroll;
}

.catalog-modal .catalog thead {
    position: sticky;
    top: 0;
    left: 0;
}
.modal-body .form-label {
    font-size: 12px;
    user-select: none;
}

.modal-footer button {
    background-color: orangered;
    color: #fff;
}
</style>

<div class="catalog-modal modal fade" id="ModalBanknotDoc" tabindex="-1" aria-labelledby="ModalLabelBaknotDoc"
    aria-hidden="true">
    <div class="modal-dialog catalog-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Звіт</h5>
                <span id="info" class="me-auto ms-3 small text-muted"></span>
            </div>

            <div class="modal-body">
                <?php //include $_SERVER['DOCUMENT_ROOT'] . "/app/models/list-defferedChecks.php"
                ?>
                <div class="wrapper">
                    <div class="content">
                        <!-- <div class="search-box">
                            <input type="text" placeholder="Search" class="form-control">
                        </div> -->
                        <div class="catalog">
                            <table id="table-cash-count" class="table table-striped table-hover table-light">
                                <thead>
                                    <tr class="">
                                        <th scope="col" class="col" style="width: 10%">#</th>
                                        <th scope="col" class="col" style="width: 30%">Купюра/Монета</th>
                                        <th scope="col" class="col" style="width: 20%">Номінал</th>
                                        <th scope="col" class="col" style="width: 20%">Кількість</th>
                                        <th scope="col" class="col" style="width: 20%">Сума</th>
                                    </tr>
                                </thead>
                                <tbody id="BanknotDoc"></tbody>
                            </table>
                        </div>

                        <!-- CASH/NONCASH -->
                        <div class="card p-3 mt-4">
                            <div class="row g-2 align-items-center">
                                <div class="col-md-4 d-flex p-1">
                                    <label class="form-label">Сума виручки готівки</label>
                                    <input
                                        type="number"
                                        style="max-width: 150px; margin-left: 20px"
                                        class="form-control cash-input"
                                        data-type="cash"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div class="col-md-4 d-flex p-1">
                                    <label class="form-label">Сума виручки безготівки</label>
                                    <input
                                        type="number"
                                        style="max-width: 150px; margin-left: 20px"
                                        class="form-control cash-input"
                                        data-type="noncash"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div class="col-md-4 d-flex p-1">
                                    <label class="form-label px-3">Сума документа: </label>
                                    <input
                                        type="text"
                                        style="max-width: 150px; margin-left: 20px"
                                        class="form-control cash-input text-bold"
                                        data-type="noncash"
                                        placeholder="0.00"
                                        id="docTotal"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="modal-footer">
                <button class="btn w-20" data-bs-dismiss="modal">Зберегти ти закрити</button>
            </div>
        </div>
    </div>
</div>

<script>
let moneyData = <?php echo json_encode($moneyData, JSON_UNESCAPED_UNICODE); ?>;

const info = document.querySelector("#info");
const docTotal = document.querySelector("#docTotal");
const tableBody = document.querySelector("#BanknotDoc");

document.getElementById("cashModal").addEventListener("show.bs.modal", () => {
    const today = new Date().toLocaleDateString("uk-UA");
    info.textContent = `${today} • Магазин 3 • Олена Петрівна • Каса №3`;
});


function buildTable() {
    tableBody.innerHTML = "";

    if(moneyData) {
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

</script>

<!-- <script>
document.addEventListener("DOMContentLoaded", () => {
    let tableBody = document.getElementById("catalogRows");
    //console.log(tableBody);

    if (tableBody) {
        let rows = tableBody.querySelectorAll("tr");

        rows.forEach((el, i) => el.addEventListener("click", () => {
            rows.forEach(row => row.classList.remove("active"));
            el.setAttribute("id", `row-${i}`);

            el.classList.add("active");

            el.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            if (el.classList.contains("active")) {
                el.setAttribute('tabindex', '-1');
                el.focus();
                el.removeAttribute('tabindex');
            }
        }));



        function autoClickRandomRow() {
            if (rows.length === 0) return;

            let randomIndex = Math.floor(Math.random() * rows.length);
            rows[randomIndex].click();

            //console.log(`Auto-clicked row index: ${randomIndex}`);
        }

        //setInterval(autoClickRandomRow, 2000);
    }

})
</script> -->