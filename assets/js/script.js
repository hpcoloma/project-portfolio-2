//Global variables

let menu = document.getElementById('menu-container').innerHTML;




/*let style = document.createElement('style');
style.innerHTML = `
    menu {
        color: yellow;
        display: flex;
        flex-direction: column;
    }
`;
document.head.appendChild(style);  */

//Setup styles to objects
/*let styles = {
    display: 'flex';
    color: 'red';
    flex-direction: 'column';
}*/


//Assign the styles to the elements
//Object.assign(menu.style, styles);

//FUNCTIONS

window.onload = menuOptions();

function menuOptions() {
    document.getElementById("main-container").innerHTML = menu;
    document.getElementById("mid-container").innerHTML;
}

/*helper function to add style to element
function css(element, style) {
    for (let property in style)
        element.style[property] = style[property];
}*/

