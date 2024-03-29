// Global variables

let menu = document.getElementById('menu-container').innerHTML;
let informationContainer = document.getElementById("information-container");
let instructionContainer = document.getElementById("instruction-container");
let payContainer = document.getElementById("pay-container");
let tabButtons = document.querySelectorAll('.tablinks');

// Income Tax Bands and rates
const taxBand1 = 42000;
const lowerRate = 0.20;
const higherRate = 0.40;

// USC Rates
const uscRate1 = 0.005;
const uscRate2 = 0.02;
const uscRate3 = 0.04;
const uscRate4 = 0.08;
const usc1 = 12012 * uscRate1;
const usc2 = 13748 * uscRate2;
const usc3 = 44284 * uscRate3;


// Tax credits for 2024
const taxCreditSingle = 1875;
const taxCreditPaye = 1875;
const taxCreditMarried = 1875;
const taxCreditSpcc = 1750;
const taxCreditRentS = 750;
const taxCreditRentM = 1500;
const taxCreditHomeCare = 1800;
const taxCreditAgeSingle = 245;
const taxCreditAgeMarried = 490; 
let incomeTax;
let netIncomeTax;
let otherTaxCredits = 0;
let reducedTaxCredit = 0;

let uscDeduction;
let prsiDeduction;

let details = ['Salary', 'Income Tax', 'USC', 'PRSI'];
let timePeriods = ['Yearly', 'Monthly', 'Weekly'];
let values;
let netPay;

//PRSI rates
const prsiRate = 0.04;


// Iteration Statement
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

// FUNCTIONS
// Display menu options in main container
window.onload = menuOptions();

function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
}

// Modal container elements
let infoButton = document.getElementById("info-button");
let infoButtonHide = document.getElementById("information-close");
let instructButton = document.getElementById("inst-button");
let instructButtonHide = document.getElementById("instruction-close");
let calcButton = document.getElementById("calcPay-button");
let calcButtonHide = document.getElementById("calc-close");

// Show-Hide event listeners for main container
infoButton.addEventListener('click', showInfoContainer);
infoButtonHide.addEventListener('click', hideInfoContainer);
instructButton.addEventListener('click', showInstructionContainer);
instructButtonHide.addEventListener('click', hideInstructionContainer);
calcButtonHide.addEventListener('click', hideCalcsContainer);
calcButton.addEventListener('click', showCalcContainer);



// Eventlisteners
document.getElementById('calculateButton-adv').addEventListener('click', calculateSalaryAdv);
document.getElementById('calculateButton').addEventListener('click', calculateSalary);
document.addEventListener('DOMContentLoaded', function() {
    const singleInput = document.getElementById('single');
    const marriedInput = document.getElementById('married');
    const spouseIncomeInput = document.getElementById('spouse-income');
    const ageInput = document.getElementById('age');

    singleInput.addEventListener('change', function() {
        spouseIncomeInput.disabled = true;
        updateTaxCredits(); // Update tax credits whenever singleInput Changes
    });

    marriedInput.addEventListener('change', function() {
        spouseIncomeInput.disabled = false;
    });

    
    ageInput.addEventListener('change', updateTaxCredits);
    
});

// To show/hide info container
// Show information container
function showInfoContainer() {
    informationContainer.style.display = 'block';
}

// Hide information container
function hideInfoContainer() {
    informationContainer.style.display = 'none';
}

// To show/hide instructions container
// Instruction container show
function showInstructionContainer() {
    instructionContainer.style.display = 'block';
}

// Instruction container hide
function hideInstructionContainer() {
    instructionContainer.style.display = 'none';
}

// To show calculate pay container occupying replacing all elements in the main-container
function showCalcContainer() {
    payContainer.style.display = 'block';
}

// to hide pay container
function hideCalcsContainer() {
    payContainer.style.display = 'none';
    document.getElementById('calcResultsContainer').innerHTML = '';
    document.getElementById('salary').value = '';
}

function validateYearlySalary(yearlySalary) {
    // Validate the salary input to not accept 0 and negative values
    if (yearlySalary < 0) {
        alert('Salary cannot be negative.');
        return false;
    } else if (!yearlySalary) {
        alert('Please enter your salary.');
        return false;
    }
    return true;
}

// Calculation Section
function calculateUSCDeduction(yearlySalary) {
    
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

    return uscDeduction;
}

function calculatePRSIDeduction(yearlySalary) {
    /**Calculate PRSI deductions
    PRSI is nil if the yearly salary is less than or equal to €18,304 per year or €352 per week.
    **/
    if (yearlySalary <= 18304) {
        prsiDeduction = 0;
    } else {
        prsiDeduction = Math.round(yearlySalary * prsiRate);
    }

    return prsiDeduction;
}

function calculateIncomeTax(yearlySalary) {
    
// Calculate income tax
    if (yearlySalary <= 18750) {
        incomeTax = 0;
    } else if (yearlySalary > 18750 && yearlySalary <= taxBand1) {
        incomeTax = Math.round((yearlySalary * lowerRate));
    } else {
        incomeTax = Math.round(((taxBand1 * lowerRate) + ((yearlySalary - taxBand1) * higherRate)));
    }

    return incomeTax;
}

function calculateSalary() {
    const yearlySalary = parseFloat(document.getElementById('salary').value);

    // Validate the salary input
    if (!validateYearlySalary(yearlySalary)) {
        return;
    }
    
    // Calculate Income Tax
    incomeTax = calculateIncomeTax(yearlySalary);

    // Calculate Net Income tax
    if (incomeTax == 0) {
        netIncomeTax = 0;
    } else {
        netIncomeTax = incomeTax - taxCreditSingle - taxCreditPaye;
    }    
   
    //Calculate USC Deductions
    uscDeduction = calculateUSCDeduction(yearlySalary);

    //Calculate PRSI Deductions
    prsiDeduction = calculatePRSIDeduction(yearlySalary);

    calculateMonthlyWeekly(yearlySalary, netIncomeTax, uscDeduction, prsiDeduction);
    
    //function to create the result table
    createResultTable(details, timePeriods, values, netPay);

}

function updateTaxCredits() {
    const singleInput = document.getElementById('single');
    const marriedInput = document.getElementById('married');
    const ageInput = document.getElementById('age');
    const depInput = document.getElementById('depyes');
    const rentInput = document.getElementById('rentyes');
    const spouseIncomeInput = document.getElementById('spouse-income');
    let spouseIncome = parseInt(spouseIncomeInput.value);
    const age = parseFloat(ageInput.value);
    
    // Reset otherTaxCredits
    otherTaxCredits = 0;

    if (singleInput.checked && parseInt(ageInput.value) >= 65) {
        otherTaxCredits += taxCreditAgeSingle;
    }
    
    if (singleInput.checked && depInput.checked) {
        otherTaxCredits += taxCreditSpcc;
    }
    if (singleInput.checked && rentInput.checked) {
        otherTaxCredits += taxCreditRentS;
    }
    if (marriedInput.checked) {
        otherTaxCredits += taxCreditMarried;
    }
    if (marriedInput.checked && parseInt(ageInput.value) >= 65) {
        otherTaxCredits += taxCreditAgeMarried;
    }
    if (marriedInput.checked && rentInput.checked) {
        otherTaxCredits += taxCreditRentM;
    }

    if (marriedInput.checked && depInput.checked) {
        if (parseInt(spouseIncomeInput.value) >= 0 && parseInt(spouseIncomeInput.value) <= 7200) {
            otherTaxCredits += taxCreditHomeCare;
        } else if (parseInt(spouseIncomeInput.value) > 7200 && parseInt(spouseIncomeInput.value) <= 10800) {
            reducedTaxCredit = taxCreditHomeCare - ((parseInt(spouseIncomeInput.value)-7200)/2);
            otherTaxCredits += reducedTaxCredit;
        }
    }

    // Validate age input
    if(isNaN(age) || age < 14 || age > 110) {
        alert('Please enter a valid age between 14 to 110.');
        return;
    }

    // Validate spouse income
    if (isNaN(spouseIncome) || spouseIncome < 0) {
        alert('Spouse income must not be a negative value.');
        spouseIncome = 0;
        spouseIncomeInput.value = spouseIncome; // Update the input field
        return false;
    }

}

function calculatePension(yearlySalary) {
    const pensionInput = document.getElementById('pension');
    const pensionPercentage = parseFloat(pensionInput.value);

    if (isNaN(pensionPercentage)) {
        alert('Please enter a valid pension contribution percentage.');
        return;
    } else if(pensionPercentage < 0 || pensionPercentage > 40 ) {
        alert('Invalid pension contribution.');
        return;
    }

    return (yearlySalary * pensionPercentage) / 100;

}

function calculateSalaryAdv() {
    const yearlySalary = parseFloat(document.getElementById('salary-adv').value);

    // Validate the salary input
    if (!validateYearlySalary(yearlySalary)) {
        return;
    }

    // Calculate pension contribution
    const pensionContribution = calculatePension(yearlySalary);

    // Calculate USC Deductions
    uscDeduction = calculateUSCDeduction(yearlySalary);

    // Calculate PRSI Deductions
    prsiDeduction = calculatePRSIDeduction(yearlySalary);

    updateTaxCredits();
      
    // Calculate total tax credits
    const totalTaxCredits = taxCreditSingle + taxCreditPaye + otherTaxCredits;
    const taxableIncome = yearlySalary - pensionContribution;

    // Calculate Income Tax
    incomeTax = calculateIncomeTax(taxableIncome);   

     // Calculate Net Income tax
     if (incomeTax == 0) {
        netIncomeTax = 0;
    } else {
        netIncomeTax = incomeTax - totalTaxCredits;
    }

    if (netIncomeTax < 0) {
        netIncomeTax = 0;
    }

    calculateMonthlyWeekly(yearlySalary, netIncomeTax, uscDeduction, prsiDeduction);

    // function to create the result table
    createResultTableAdv(details, timePeriods, values, netPay, pensionContribution);

}


function calculateMonthlyWeekly(yearlySalary, netIncomeTax, uscDeduction, prsiDeduction){
    // Calculate Gross Monthly and Weekly Gross Salary
    const grossMonthlySalary = Math.round(yearlySalary / 12);
    const grossWeeklySalary = Math.round(yearlySalary / 52);
 
    // Monthly and weekly calculations
     const monthlyUsc = Math.round(uscDeduction / 12);
     const monthlyPrsi = Math.round(prsiDeduction / 12);
     const weeklyUsc = Math.round(uscDeduction / 52);
     const weeklyPrsi = Math.round(prsiDeduction / 52);
     const monthlyTax = Math.round(netIncomeTax / 12);
     const weeklyTax = Math.round(netIncomeTax / 52);
     //const monthlyPension = Math.round(pensionContribution/12);
     //const weeklyPension = Math.round(pensionContribution/52);

    // Calculate net salary after deductions
    const netYearlySalary = yearlySalary - netIncomeTax - uscDeduction - prsiDeduction;
    const netMonthlySalary = Math.round(netYearlySalary / 12);
    const netWeeklySalary = Math.round(netYearlySalary / 52);

    // Data for the table
    values = [yearlySalary, grossMonthlySalary, grossWeeklySalary, netIncomeTax, monthlyTax, weeklyTax, uscDeduction, monthlyUsc, weeklyUsc, prsiDeduction, monthlyPrsi, weeklyPrsi];
    netPay = [netYearlySalary, netMonthlySalary, netWeeklySalary];
    
}

// Table for Basic
function createResultTable(details, timePeriods, values, netPay) {
    const table = ResultTable(details, timePeriods, values, netPay); 
    displayResultTable(table);   
}

// Table for Advance
function createResultTableAdv(details, timePeriods, values, netPay) {
    const table = ResultTable(details, timePeriods, values, netPay); 
    displayResultTableAdv(table);   
}

function ResultTable(details, timePeriods, values, netPay) {
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

    // Create rows
    for (let i = 0; i < details.length; i++) {
        const row = tbody.insertRow(i);
        const detailsCell = row.insertCell(0);
        detailsCell.textContent = details[i];

        for (let j = 0; j < timePeriods.length; j++) {
            const valueCell = row.insertCell(j + 1);
            valueCell.textContent = `€${values[i * timePeriods.length + j].toLocaleString()}`;
        }
    }

    // Create a row for net pay values
    const netPayRow = tbody.insertRow(details.length);
    netPayRow.insertCell(0).textContent = 'Net Pay';
    for (let i = 0; i < netPay.length; i++) {
        const cell = netPayRow.insertCell(i + 1);
        cell.textContent = `€${netPay[i].toLocaleString()}`;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    
    return table;
}


function displayResultTable(table){
    const resultsContainer = document.getElementById('calcResultsContainer');
   
    // Clear existing content
    resultsContainer.innerHTML = '';

    // Append the generated table
    resultsContainer.appendChild(table);
}

function displayResultTableAdv(table) {
    const resultsContainer = document.getElementById('calcResultsContainerAdv');
   
    // Clear existing content
    resultsContainer.innerHTML = '';

    // Append the generated table
    resultsContainer.appendChild(table);
}