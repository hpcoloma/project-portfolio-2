//Global variables

let menu = document.getElementById('menu-container').innerHTML;
let informationContainer = document.getElementById("information-container");
let instructionContainer = document.getElementById("instruction-container");
let payContainer = document.getElementById("pay-container");


//Predefined variables
const taxRate1 = 0.2;
const taxRate2 = 0.4;
const uscRate1 = 0.005;
const uscRate2 = 0.02;
const uscRate3 = 0.04;
const uscRate4 = 0.08;
const prsiRate = 0.04;
const taxBand1 = 42000;
const taxBand2 = 46000;
const taxBand3 = 51000;
const taxBand4 = 33000;
const taxCreditSingle = 1875;
const taxCreditPaye = 1875;
const taxCreditMarried = 1875;
const taxCreditSpcc = 1750;
const taxCreditIncapacitated = 3500;
const taxCreditDependent = 245;
const taxCreditRentS = 750;
const taxCreditRentM = 1500;
const taxCreditHomeCare = 1800;




let tabButtons = document.querySelectorAll('.tablinks');

//Iteration Statement

for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', ()=> {
        let tabId = tabButtons[i].getAttribute('data-tab');
        let tabContents = document.querySelectorAll('.tabscontent');
    //To hide all tabs
    for (let j = 0; j < tabContents.length; j++) {
        tabContents[j].style.display = 'none';
   }

    //Show the active tab
    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).style.backgroundColor = 'rgb(86,191,181)';    
});
    
}

//FUNCTIONS
//Display menu options in main container
window.onload = menuOptions();

function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;  
}


//modal container elements
let infoButton = document.getElementById("information-button");
let infoButtonHide = document.getElementById("information-close");
let instructButton = document.getElementById("instruction-button");
let instructButtonHide = document.getElementById("instruction-close");
let calcButton = document.getElementById("calculatePay-button");
let calcButtonHide = document.getElementById("calc-close");

//Show-Hide event listeners
infoButton.addEventListener('click', showInfoContainer);
infoButtonHide.addEventListener('click', hideInfoContainer);
instructButton.addEventListener('click', showInstructionContainer);
instructButtonHide.addEventListener('click', hideInstructionContainer);
calcButtonHide.addEventListener('click', hideCalcsContainer);
calcButton.addEventListener('click', showCalcContainer);


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
    document.getElementById("main-container").innerHTML = payContainer;

    
}

//to hide pay container
function hideCalcsContainer() {
    payContainer.style.display = 'none';
    window.onload = menuOptions();  
   
}

//Calculation variables
let basicButton = document.getElementById("calculateButton");
let netIncomeTax = '';
let totalUsc = 0;
let totalPrsi = '';
let totalIncomeTax = '';
//let bik = '';
//let totalPay = yearlySalary + bik;


//Global function for calculation
//To calculate USC
function calculateUsc() {
    const yearlySalary = document.getElementById('salary').value;

    if (yearlySalary <= 12012) {
        totalUsc = (yearlySalary * uscRate1);
    } else if (yearlySalary <= 25760) {
        totalUsc = (12012 * uscRate1) + ((yearlySalary - 12012)* uscRate2);
    } else if (yearlySalary <= 70044) {
        totalUsc = (12012 * uscRate1) + ((yearlySalary - 12012)* uscRate2);
    } 

}

//To calculate prsi
function calcPrsi() {

}

//Calculate table event listeners
basicButton.addEventListener = ('click', calculateSalary);
   
//Basic calculation formula
function calculateSalary () {
        const yearlySalary = document.getElementById('salary').value;
        const takeHomePay = yearlySalary - netIncomeTax - totalUsc - totalPrsi;
        const monthlySalary = Math.round(yearlySalary/12);
        const weeklySalary = Math.round(yearlySalary/52);
        const timePeriods = ['Yearly','Monthly','Weekly'];
        const netPay = [yearlySalary, monthlySalary, weeklySalary];
        const tableContent = document.getElementById('tableResults').getElementsByTagName('tbody')[0];

        //Clear table rows
        tableContent.innerHTML = '';
  
    for (let i=0; i< timePeriods.length; i++) {
        const row = tableContent.insertRow(i);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = timePeriods[i];
        cell2.textContent = `€${netPay[i]}`;


    }
}



//Display result of basic calculation by inserting a table



//Advanced calculation formula



//Display result of advanced calculation by inserting a table








