//Global variables

let menu = document.getElementById('menu-container').innerHTML;
let informationContainer = document.getElementById("information-container");
let instructionContainer = document.getElementById("instruction-container");
let payContainer = document.getElementById("pay-container");
let tabButtons = document.querySelectorAll('.tablinks');

//Iteration Statement
for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', () => {
        let tabId = tabButtons[i].getAttribute('data-tab');
        let tabContents = document.querySelectorAll('.tabscontent');
        //To hide all tabs
        for (let j = 0; j < tabContents.length; j++) {
            tabContents[j].style.display = 'none';
        }

        //Show the active tab
        document.getElementById(tabId).style.display = 'block';
        document.getElementById(tabId).style.backgroundColor = '#56BFB5';
    });
}

//FUNCTIONS
//Display menu options in main container
window.onload = menuOptions();

function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
}

//modal container elements
let infoButton = document.getElementById("info-button");
let infoButtonHide = document.getElementById("information-close");
let instructButton = document.getElementById("inst-button");
let instructButtonHide = document.getElementById("instruction-close");
let calcButton = document.getElementById("calcPay-button");
let calcButtonHide = document.getElementById("calc-close");

//Show-Hide event listeners for main container
infoButton.addEventListener('click', showInfoContainer);
infoButtonHide.addEventListener('click', hideInfoContainer);
instructButton.addEventListener('click', showInstructionContainer);
instructButtonHide.addEventListener('click', hideInstructionContainer);
calcButtonHide.addEventListener('click', hideCalcsContainer);
calcButton.addEventListener('click', showCalcContainer);

//Eventlistener for button to open a new page
document.getElementById('calculateButton-adv').addEventListener('click', function () {
    //This is the link I want to open
    const errorPage = '404.html';

    //To open the link
    window.location.href = errorPage;
});

//To show/hide info container
//Show information container
function showInfoContainer() {
    informationContainer.style.display = 'block';
}

//Hide information container
function hideInfoContainer() {
    informationContainer.style.display = 'none';
}

//To show/hide instructions container
//Instruction container show
function showInstructionContainer() {
    instructionContainer.style.display = 'block';
}

//Instruction container hide
function hideInstructionContainer() {
    instructionContainer.style.display = 'none';
}

//To show calculate pay container occupying replacing all elements in the main-container
function showCalcContainer() {
    payContainer.style.display = 'block';
}

//to hide pay container
function hideCalcsContainer() {
    payContainer.style.display = 'none';
    document.getElementById('calcResultsContainer').innerHTML = '';
    document.getElementById('salary').value = '';
}

//Calculation Section
//Functions
function calculateSalary() {
    const yearlySalary = parseFloat(document.getElementById('salary').value);

    if (!yearlySalary) {
        alert('Please enter your salary.');
        return;
    }

    //Income Tax Bands and rates
    const taxBand1 = 42000;
    const lowerRate = 0.20;
    const higherRate = 0.40;

    // Calculate Monthly and Weekly Gross Salary
    const grossMonthlySalary = Math.round(yearlySalary / 12);
    const grossWeeklySalary = Math.round(yearlySalary / 52);

    //Calculate income tax
    const taxCreditSingle = 1875;
    const taxCreditPaye = 1875;
    let netIncomeTax = 0;

    if (yearlySalary <= 18750) {
        netIncomeTax = 0;
    } else if (yearlySalary > 18750 && yearlySalary <= taxBand1) {
        netIncomeTax = Math.round((yearlySalary * lowerRate) - (taxCreditSingle + taxCreditPaye));
    } else {
        netIncomeTax = Math.round(((taxBand1 * 0.20) + ((yearlySalary - taxBand1) * higherRate)) - (taxCreditPaye + taxCreditSingle));
    }

    //USC Rates
    const uscRate1 = 0.005;
    const uscRate2 = 0.02;
    const uscRate3 = 0.04;
    const uscRate4 = 0.08;
    const usc1 = 12012 * uscRate1;
    const usc2 = 13748 * uscRate2;
    const usc3 = 44284 * uscRate3;
    let uscDeduction = 0;

    //USC Calculation
    if (yearlySalary <= 13000) {
        uscDeduction = 0;
    } else if (yearlySalary > 12012 && yearlySalary <= 25760) {
        uscDeduction = Math.round(usc1 + ((yearlySalary - 12012) * uscRate2));
    } else if (yearlySalary > 25760 && yearlySalary <= 70044) {
        uscDeduction = Math.round(usc1 + usc2 + ((yearlySalary - 25760) * uscRate3));
    } else {
        uscDeduction = Math.round(usc1 + usc2 + usc3 + ((yearlySalary - 70044) * uscRate4));
    }

    //PRSI rates
    const prsiRate = 0.04;
    let prsiDeduction = 0;

    // Calculate PRSI deductions
    if (yearlySalary <= 18304) {
        prsiDeduction = 0;
    } else {
        prsiDeduction = Math.round(yearlySalary * prsiRate);
    }

    //Monthly and weekly calculations
    const monthlyUsc = Math.round(uscDeduction / 12);
    const monthlyPrsi = Math.round(prsiDeduction / 12);
    const weeklyUsc = Math.round(uscDeduction / 52);
    const weeklyPrsi = Math.round(prsiDeduction / 52);
    const monthlyTax = Math.round(netIncomeTax / 12);
    const weeklyTax = Math.round(netIncomeTax / 52);

    // Calculate net salary after deductions
    const netYearlySalary = yearlySalary - uscDeduction - prsiDeduction;
    const netMonthlySalary = Math.round(netYearlySalary / 12);
    const netWeeklySalary = Math.round(netYearlySalary / 52);

    const timePeriods = ['Yearly', 'Monthly', 'Weekly'];
    const details = ['Salary', 'Income Tax', 'USC', 'PRSI'];
    const values = [yearlySalary, grossMonthlySalary, grossWeeklySalary, netIncomeTax, monthlyTax, weeklyTax, uscDeduction, monthlyUsc, weeklyUsc, prsiDeduction, monthlyPrsi, weeklyPrsi];

    const netPay = [netYearlySalary, netMonthlySalary, netWeeklySalary];
    const resultsContainer = document.getElementById('calcResultsContainer');

    // Clear existing content
    resultsContainer.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headerRow = thead.insertRow(0);
    headerRow.insertCell(0).textContent = 'Details'; // Label for details column
    for (let i = 0; i < timePeriods.length; i++) {
        const headerCell = headerRow.insertCell(i + 1);
        headerCell.textContent = timePeriods[i];
    }

    // Create rows for details and net pay values
    for (let i = 0; i < details.length; i++) {
        const row = tbody.insertRow(i);
        const detailsCell = row.insertCell(0);
        detailsCell.textContent = details[i];

        for (let j = 0; j < timePeriods.length; j++) {
            const valueCell = row.insertCell(j + 1);
            valueCell.textContent = `€${values[i * timePeriods.length + j]}`;
        }
    }

    // Create a row for net pay values
    const netPayRow = tbody.insertRow(details.length);
    netPayRow.insertCell(0).textContent = 'Net Pay';
    for (let i = 0; i < netPay.length; i++) {
        const cell = netPayRow.insertCell(i + 1);
        cell.textContent = `€${netPay[i]}`;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsContainer.appendChild(table);
}

document.getElementById('calculateButton').addEventListener('click', calculateSalary);
