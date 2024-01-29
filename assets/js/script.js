//Global variables

let menu = document.getElementById('menu-container').innerHTML;
let libraryContainer = document.getElementById("library-container");




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

window.onload = menuOptions();


//Display menu options in main container
function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
   // document.getElementById("mid-container").innerHTML;
  
}





//To show/hide library container
//Library container Show
function showLibraryContainer() {
    libraryContainer.style.display = 'block';
}

//Library container hide
function hideLibraryContainer() {
    libraryContainer.style.display = 'none';
}

//Information button elements
let infoButton = document.getElementById("information-button");
let infoButtonHide = document.getElementById("library-close");


//Information event listeners
infoButton.addEventListener('click', showLibraryContainer);
infoButtonHide.addEventListener('click', hideLibraryContainer);



//To show/hide instructions container
//Instruction container show
//Instruction container hide



//To show calculate pay container occupying replacing all elements in the main-container


//Basic calculation formula



//Display result of basic calculation by inserting a table



//Advanced calculation formula



//Display result of advanced calculation by inserting a table








