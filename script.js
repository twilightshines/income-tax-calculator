function calculateTax() {
    let totalIncome = calculateTotalIncome();

    if (totalIncome === 0) {
        alert("Please enter income!");
        return;
    }

    let deductions = calculateDeductions();
    let taxableIncome = Math.max(0, totalIncome - deductions);

    let tax = computeTax(taxableIncome);
    tax = applyRebate(taxableIncome, tax);
    tax = addCess(tax);

    displayResult(totalIncome, deductions, taxableIncome, tax);
}

function getValue(id) {
    let val = document.getElementById(id).value;
    return val ? parseFloat(val) : 0;
}

function calculateTotalIncome() {
    return getValue("salary") +
           getValue("otherIncome") +
           getValue("interestIncome") +
           getValue("rentalIncome");
}

function calculateDeductions() {
    let standard = 50000;
    let d80C = Math.min(getValue("deduction80C"), 150000);
    let d80D = getValue("deduction80D");
    let d80G = getValue("deduction80G");

    return standard + d80C + d80D + d80G;
}

function computeTax(income) {
    let tax = 0;

    if (income <= 250000) {
        tax = 0;
    } 
    else if (income <= 500000) {
        tax = (income - 250000) * 0.05;
    } 
    else if (income <= 1000000) {
        tax = (250000 * 0.05) + (income - 500000) * 0.2;
    } 
    else {
        tax = (250000 * 0.05) + (500000 * 0.2) + (income - 1000000) * 0.3;
    }

    return tax;
}

function applyRebate(income, tax) {
    if (income <= 500000) return 0;
    return tax;
}

function addCess(tax) {
    return tax + (tax * 0.04);
}

function formatMoney(amount) {
    return amount.toLocaleString("en-IN");
}

function displayResult(total, deductions, taxable, tax) {
    document.getElementById("result").innerHTML = `
        Total Income: ₹${formatMoney(total)} <br>
        Deductions: ₹${formatMoney(deductions)} <br>
        Taxable Income: ₹${formatMoney(taxable)} <br>
        <hr>
        Tax Payable: ₹${formatMoney(tax)}
    `;
}

function showSection(section) {
    let calc = document.getElementById("calculatorSection");
    let about = document.getElementById("aboutSection");

    let calcBtn = document.getElementById("calcBtn");
    let aboutBtn = document.getElementById("aboutBtn");

    if (section === "calculator") {
        calc.style.display = "block";
        about.style.display = "none";
        calcBtn.classList.add("active");
        aboutBtn.classList.remove("active");
    } else {
        calc.style.display = "none";
        about.style.display = "block";
        aboutBtn.classList.add("active");
        calcBtn.classList.remove("active");
    }
}