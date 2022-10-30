/*global canvasShapes*/
/*global buttons*/
/*global m*/
/*global basicObjectComponents*/

class Ball extends BasicObject {
    
    color;
    ballId = 0;
    
    constructor(pos, id, color) {
        super();
        
        if(pos) {
            this.getComponent("transform").pos = pos;
        }
        
        this.color = color;
        this.ballId = id;
        
        this.addComponent(this.generateTexture(color));
        
    }
    
    generateTexture(color) {
        return new basicObjectComponents.Texture([
            new canvasShapes.Circle(vec2(), 30, {strokeStyle: color})
        ]);
    }
    
    update = function(deltaT) {
        if(this.ballId === 2) {
            if(buttons.mouse && buttons[66]) {
                this.setPos(vec2(m));
            }
        }
        if(this.ballId === 1) {
            if(buttons.mouse && buttons[32]) {
                this.setPos(vec2(m));
            }
        }
        if(this.ballId === 0) {
            if(buttons.mouse && !buttons[32] && !buttons[66]) {
                this.setPos(vec2(m));
            }
        }
        
        if(buttons[37]) {
            this.move(vec2(1*deltaT, 0));
        }
    }
    
}

let ball1 = new Ball(vec2(300, 100), 0, "blue");

let ball2 = new Ball(vec2(350, 130), 1);
ball1.addChild(ball2, "ball2");
let ball3 = new Ball(vec2(400, 100), 2);
ball1.addChild(ball3, "ball3");