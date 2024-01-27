//Global variables

let menu = document.getElementById('menu-container').innerHTML;



//FUNCTIONS

window.onload = menuOptions();


//Display menu options in main container
function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
   // document.getElementById("mid-container").innerHTML;
}

