//Global variables

let menu = document.getElementById('menu-container').innerHTML;
let tabButtons = document.querySelectorAll('.tablinks');
let i;



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
    });
}

//FUNCTIONS

window.onload = menuOptions();


//Display menu options in main container
function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
   // document.getElementById("mid-container").innerHTML;
  
}

