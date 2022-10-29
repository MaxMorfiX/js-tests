/*global canvasShapes*/
/*global buttons*/

class Ball extends BasicObject {
    
    radius;
    
    constructor(pos, radius) {
        super();
        
        this.pos = pos;
        this.radius = radius;
        
        this.generateTexture();
    }
    
    generateTexture() {
        this.addShape(new canvasShapes.Circle(vec2(), this.radius), "circle");
        this.addShape(new canvasShapes.Line(vec2(), vec2(this.radius*1.1)), "line");
    }
    
    
    update = function(deltaT) {
//        this.pos.x += deltaT*0.1;
//        this.pos.y += 0;
    }
}

class MovingBall extends Ball {
    
    controller = {
        "left": 37,
        "right": 39,
        "up": 38,
        "down": 40
    }
    
    constructor(pos, radius, controller) {
        super(pos, radius);
        
        if(controller) {
            this.controller = controller;
        }
    }
    
    update = function(deltaT) {
        if(buttons[this.controller.left]) {
            this.pos.x -= deltaT*0.1;
            this.getShape("line").pos2.x = -this.radius*1.1;
        }
        if(buttons[this.controller.right]) {
            this.pos.x += deltaT*0.1;
            this.getShape("line").pos2.x = +this.radius*1.1;
        }
        if(!buttons[this.controller.left] && !buttons[this.controller.right]) {
            this.getShape("line").pos2.x = 0;
        }
        
        
        if(buttons[this.controller.up]) {
            this.pos.y -= deltaT*0.1;
            this.getShape("line").pos2.y = -this.radius*1.1;
        }
        if(buttons[this.controller.down]) {
            this.pos.y += deltaT*0.1;
            this.getShape("line").pos2.y = this.radius*1.1;
        }
        if(!buttons[this.controller.up] && !buttons[this.controller.down]) {
            this.getShape("line").pos2.y = 0;
        }
        
    }
}

new MovingBall(vec2(100, 100), 100);
new MovingBall(vec2(400, 300), 100, {
    "left": 65,
    "right": 68,
    "up": 87,
    "down": 83
});
new Ball(vec2(200, 200), 70);