const PI = Math.PI;

let m = vec2();
let buttons = {};

let keyDownFunctions = {}, keyUpFunctions = {}, keyPressFunctions = {};




document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);
document.addEventListener('keypress', KeyPress);

function KeyDown(e) {
    buttons[e.which] = true;
    
    if(keyDownFunctions[e.which]) {
        keyPressFunctions[e.which]();
    }
}
function KeyUp(e) {
    buttons[e.which] = false;
    
    if(keyUpFunctions[e.which]) {
        keyPressFunctions[e.which]();
    }
}
function KeyPress(e) {
    if(keyPressFunctions[e.which]) {
        keyPressFunctions[e.which]();
    }
}

function vec2(x, y) {
    let returnValue = {
        x: x || 0,
        y: y || 0
    };
    
    if(typeof x === "object") {
        returnValue = JSON.parse(JSON.stringify(x));
    }
    
    return returnValue;
}

function mouseClick(action) {
    if (action === 'down' || action === 1 || action === true) {
        buttons.mouse = true;
    } else if (action === 'up' || action === 0 || action === false) {
        buttons.mouse = false;
    } else if (action === 'click' || action === 2) {
//        checkObjectsClick();
    }
}

onmousemove = function (e) {
    resentmxpos = m.x;
    resentmypos = m.x;
    
    m.x = e.x;
    m.y = canvas.height - e.y;
    
//    console.log(mx + ' ' + my);
};