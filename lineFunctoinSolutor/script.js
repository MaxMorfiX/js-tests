let input1 = $('#input');
let input2 = $('#input2');
let ret = $('#return');

let mode = 0;





function calc() {
    
    input1 = JSON.parse(input1.text());
    input2 = JSON.parse(input2.text());
    
    ret.text(calcLineFormula(input1, input2));
    
}
function changeMode() {
    mode++;
    
    if(mode >= 0)
        mode = 0;
}


function calcLineFormula(firstPoint, secondPoint) {
        
        diff = {x: secondPoint.x - firstPoint.x, y: secondPoint.y - firstPoint.y},
        formula = {
            k: diff.y/diff.x,
            b: firstPoint.y - firstPoint.x*diff.y/diff.x
        };
        
    return formula;
}