//Global variables

let menu = document.getElementById('menu-container').innerHTML;
let informationContainer = document.getElementById("information-container");
let instructionContainer = document.getElementById("instruction-container");
let payContainer = document.getElementById("pay-container");


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

//Show-Hide event listeners for main container
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
    payContainer.style.display = 'block';
   
}

//to hide pay container
function hideCalcsContainer() {
    payContainer.style.display = 'none';
    
   
}