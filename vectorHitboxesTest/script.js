/* global buttons */
/* global m */


var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    fieldH = $('#canvas').height(),
    fieldW = $('#canvas').width(),
    lastm = {},
    points = [],
    lines = [],
    objects = [],
    showGuideText = true;



start('squares');
//start('lines'); // isn't working


function start(scene) {
    if(scene === 'squares') {
        let ret = addFigure(calcSquare(vec2(30, 30), 400, 10));
        points = ret.points;
        lines = ret.lines;

        ret = addFigure(calcSquare(vec2(), 400, 10));
        points = ret.points;
        lines = ret.lines;
        
        lines.push({firstPoint: 0, secondPoint: 3, width: 10});
        lines.push({firstPoint: 2, secondPoint: 1, width: 10});
        
        lines.push({firstPoint: 4, secondPoint: 7, width: 10});
        lines.push({firstPoint: 6, secondPoint: 5, width: 10});
        
    } else if(scene === 'lines') {
        let ret = addFigure(calcLine(vec2(), vec2(50)));
        points = ret.points;
        lines = ret.lines;

        ret = addFigure(calcLine(vec2(), vec2(0, 50)));
        points = ret.points;
        lines = ret.lines;
    }
    
    setInterval(draw, 15);
}

function addFigure(figure, currPoints = points, currLines = lines) {
    for(let i in figure.lines) {
        let line = figure.lines[i];
        
        line.firstPoint += currPoints.length;
        line.secondPoint += currPoints.length;
        
        currLines.push(line);
    }
    for(let i in figure.points)
        currPoints.push(figure.points[i]);
    
    return {points: currPoints, lines: currLines};
}
function calcSquare(center, size, lineWidth, pointSize, pointColor, lineColor) {
    
    let decor = setSizesAndColors(lineWidth, pointSize, pointColor, lineColor);
    
    function setSizesAndColors(lineWidth, pointSize, pointColor, lineColor) {
        let returnValue = {
            lineWidth: 1,
            pointSize: 3,
            pointColor: 'black',
            lineColor: 'black'
        };
        
        if(typeof lineWidth !== 'undefined')
            returnValue.lineWidth = lineWidth;
        
        if(typeof pointSize !== 'undefined')
            returnValue.pointSize = pointSize;
        
        if(typeof pointColor !== 'undefined')
            returnValue.pointColor = pointColor;
        
        if(typeof lineColor !== 'undefined')
            returnValue.lineColor = lineColor;
        
        return {lineWidth, pointSize, lineColor, pointColor};
    }
    
    let points = [];
    let lines = [];
    
    for(let i = 0; i <= 3; i++) {
        let bin = convert2Bin(i, true);
        
        if(bin.length === 1)
            bin = '0' + bin;
        
        let point = {
            x: parseInt(bin.charAt(1)),
            y: parseInt(bin.charAt(0)),
            color: decor.pointColor,
            size: decor.pointSize
        };
        
        points.push(point);
    }
    
    for(let i in points) {
        
        i = parseInt(i);
        let point = points[i];
        
        if(point.x === 0) {
            let line = {firstPoint: i, secondPoint: i + 1, color: decor.color, width: decor.lineWidth};
            lines.push(line);
        }
        
        if(point.y === 0) {
            let line = {firstPoint: i, secondPoint: i + 2, color: decor.color, width: decor.lineWidth};
            lines.push(line);
        }
        
        point.x = point.x * size - size/2 + center.x;
        point.y = point.y * size - size/2 + center.y;
        
    }
    
    return {points, lines};
}
function calcLine(firstPoint, secondPoint, color, width, pointsColor, pointSize) {
    return {
        points: [
            {x: firstPoint.x, y: firstPoint.y, color: pointsColor, size: pointSize},
            {x: secondPoint.x, y: secondPoint.y, color: pointsColor, size: pointSize}
        ],
        lines: [{firstPoint: 0, secondPoint: 1, color, width}]};
}

function calcLinesFormules(lines = lines, points = points) {
    for(let i in lines) {
        lines[i].formula = calcLineFormula(lines[i], points);
    }
    
    return lines;
}
function calcLineFormula(line, points = points) {
    
    let firstPoint = points[line.firstPoint],
        secondPoint = points[line.secondPoint],
        
        diff = {x: secondPoint.x - firstPoint.x, y: secondPoint.y - firstPoint.y},
        formula = {
            k: diff.y/diff.x,
            b: firstPoint.y - firstPoint.x*diff.y/diff.x
        };
        
    return formula;
}

function draw() {
    ctx.clearRect(0, 0, fieldW, fieldH);
    
    if(buttons[68])
        showGuideText = false;
    if(showGuideText)
        drawGuideText();
    
    for(let i in lines) {
        lines[i].id = i;
    }
    
    let collPoints = calcLinesCollision();
    
    drawLines(lines, points);
    
//    lines = calcLinesFormules(lines, points);
    
    drawPoints(collPoints, 'blue', 2);
    
    drawPoints(points);
    
    modify();
}

function calcLinesCollision(currlines = lines, currPoints = points) {
    
    let collPoints = [];
    
    for(let i in currlines) {
        for(let j in currlines) {
            
            if(j === i)
                continue;
            
            let ret = calcLineCollision(currlines[i], currlines[j], currPoints);
            
            if(!ret)
                continue;
            
            collPoints.push(ret);
            
        }
    }
    
    return collPoints;
    
}
function calcLineCollision(line1, line2, points = points) {
    
    let x1 = points[line1.firstPoint].x;
    let y1 = points[line1.firstPoint].y;
    
    let x2 = points[line1.secondPoint].x;
    let y2 = points[line1.secondPoint].y;
    
    let x3 = points[line2.firstPoint].x;
    let y3 = points[line2.firstPoint].y;
    
    let x4 = points[line2.secondPoint].x;
    let y4 = points[line2.secondPoint].y;
    
    let dot = {};
    
    let n;
    
    if (y2 - y1 !== 0) {
        let q = (x2 - x1) / (y1 - y2);   
        let sn = (x3 - x4) + (y3 - y4) * q;
        
        if(!sn) {
            return false; 
        }
        
        let fn = (x3 - x1) + (y3 - y1) * q;
        n = fn / sn;
    }
    else {
        if (!(y3 - y4)) {
            return false;
        }
        n = (y3 - y1) / (y3 - y4);
    }
    dot.x = x3 + (x4 - x3) * n;
    dot.y = y3 + (y4 - y3) * n;
    
    if(isPointInBetween(dot, {x: x1, y: y1}, {x: x2, y: y2})) {
        if(isPointInBetween(dot, {x: x3, y: y3}, {x: x4, y: y4})) {
            dot.intersection = true;
            dot.firstLine = line1.id;
            dot.secondLine = line2.id;
            return dot;
        }
    }
    
    return false;
    
}

function isPointInRectangle(point, leftBottom, rightTop) {
    
    if(point.x >= leftBottom.x && point.x <= rightTop.x) {
        if(point.y >= leftBottom.y && point.y <= rightTop.y) {
            return true;
        }
    }
    
    return false;
    
}
function isPointInBetween(point, collPoint1, collPoint2) {
    
    let leftBottom = vec2();
    let rightTop = vec2();
    
    if(collPoint1.x < collPoint2.x) {
        leftBottom.x = collPoint1.x;
        rightTop.x = collPoint2.x;
    } else {
        leftBottom.x = collPoint2.x;
        rightTop.x = collPoint1.x;
    }
    
    if(collPoint1.y < collPoint2.y) {
        leftBottom.y = collPoint1.y;
        rightTop.y = collPoint2.y;
    } else {
        leftBottom.y = collPoint2.y;
        rightTop.y = collPoint1.y;
    }
    
    return isPointInRectangle(point, leftBottom, rightTop);
    
}

function modify() {
    if(buttons.mouse) {
        
        let diff = {
            x: m.x - lastm.x,
            y: m.y - lastm.y
        };
        if(diff.x !== 0 || diff.y !== 0) {
            if(buttons[32]) {
                let savedPoints = points;
                points = rotatePoints(diff.x, vec2(), [points[0], points[1], points[2], points[3]]);
                
                points.push(savedPoints[4]);
                points.push(savedPoints[5]);
                points.push(savedPoints[6]);
                points.push(savedPoints[7]);
            } else {
                let savedPoints = points;
                points = movePoints(vec2(diff.x, diff.y), [points[0], points[1], points[2], points[3]]);
                
                points.push(savedPoints[4]);
                points.push(savedPoints[5]);
                points.push(savedPoints[6]);
                points.push(savedPoints[7]);
            }
        }
    }
    
    lastm.x = m.x;
    lastm.y = m.y;
    
}

function rotatePoints(ang, center = {x: 0, y: 0}, currPoints = points) {
    
    let returnValue = [];

    for(let i in currPoints) {
        let point = currPoints[i],
            returnPoint = rotatePoint(ang, center, point);

        returnValue.push(returnPoint);
    }

    return returnValue;
    
}
function rotatePoint(ang, center = {x: 0, y: 0}, point) {
    ang = d2R(ang);
    let cos = Math.cos(ang),
        sin = Math.sin(ang),
        x = cos * (point.x - center.x) - sin * (point.y-center.y) + center.x,
        y = sin * (point.x - center.x) + cos * (point.y - center.y) + center.y,

        z = point.z,
        color = point.color,
        size = point.size,
        returnValue = {x, y, color, size};


    return returnValue;
}

function movePoints(vec2, currPoints = points) {
    
    let returnValue = [];

    for(let i in currPoints) {
        let point = currPoints[i],
            returnPoint = movePoint(point, vec2);

        returnValue.push(returnPoint);
    }

    return returnValue;
    
}
function movePoint(point, vec2) {
    point.x += vec2.x;
    point.y += vec2.y;
    
    return point;
}

function drawGuideText() {
    ctx.beginPath();
    ctx.fillStyle = 'darkgray';
    ctx.font = "15px Arial";
    ctx.fillText('Hello There!', 10, 25);
    ctx.fillText('in this project I tried', 10, 40);
    ctx.fillText('to check collisions of lines', 10, 55);
    ctx.fillText('to play with it, you can:', 10, 70);
    ctx.fillText('1: hold your mouse and move it &', 10, 85);
    ctx.fillText('   one of the squares (or what is it) will move with it', 10, 100);
    ctx.fillText('2: hold mouse and space key & square will', 10, 115);
    ctx.fillText('   rotate around a center with moving of mouse', 10, 130);
    ctx.fillText('Have fun!', 10, 145);
    ctx.fillText('(press D to delete this)', 10, 160);
    ctx.closePath();
}






















function drawLines(lines = lines, points = points) {
    for(let i in lines) {
        
        let line = lines[i];
        
        if(typeof points[line.firstPoint] === 'undefined' || typeof points[line.secondPoint] === 'undefined') {
            console.log('errrrrorrr - trying to draw line from ' + line.firstPoint + ' to ' + line.secondPoint + ', but the only aviable is ' + points.length);
            continue;
        }
        
        let color = line.color;
        let width = line.width;
            
        drawLine(
            startPoint = {x: points[line.firstPoint].x, y: points[line.firstPoint].y},
            endPoint = {x: points[line.secondPoint].x, y: points[line.secondPoint].y},
            color,
            width
        );
    }
}
function drawLine(startPoint, endPoint, color = 'black', width = 1) {
    ctx.beginPath();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    
    ctx.moveTo(startPoint.x + fieldW/2, fieldH/2 - startPoint.y);
    ctx.lineTo(endPoint.x + fieldW/2, fieldH/2 - endPoint.y);
    
    ctx.stroke();
    ctx.closePath();
}

function drawPoints(points, color = 'black', size = 3) {
    for(let i in points) {
        drawPoint(points[i], color, size);
    }
}
function drawPoint(point, color = 'black', radius = 3) {

    if(typeof point.color !== 'undefined')
        color = point.color;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    if(typeof point.size !== 'undefined')
        radius = point.size;

    ctx.beginPath();
    ctx.arc(point.x + fieldW/2, fieldH/2 - point.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}