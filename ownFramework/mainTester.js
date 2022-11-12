/*global canvasShapes*/
/*global camera*/
/*global buttons*/
/*global m*/
/*global basicObjectComponents*/
/*global keyPressFunctions*/

class Player extends BasicObject {
    
    moveSpeed = 1;
    
    constructor() {
        super();
        
        this.addComponent(this.generateTexture());
        this.addComponent(new basicObjectComponents.KinematicBody([new colliderShapes.Square(vec2(), 30)]));
        this.addComponent(new basicObjectComponents.Collider());
        
        this.pos.x = 400;
        this.pos.y = 300;
    }
    
    generateTexture() {
        return new basicObjectComponents.Texture([
            new canvasShapes.Square(vec2(), 30),
//            new canvasShapes.Line(vec2(), vec2(30, -30)),
            new canvasShapes.Square(vec2(), 20),
            new canvasShapes.Square(vec2(), 15),
            new canvasShapes.Square(vec2(), 10)
        ]);
    }
    
    update(deltaT) {
        
        let kb = this.getComponent("kinematicBody");
        
        if(buttons[37]) {
            kb.vel.x = -deltaT*this.moveSpeed;
        }
        if(buttons[39]) {
            kb.vel.x = deltaT*this.moveSpeed;
        }
        
        if(!buttons[37] && !buttons[39]) {
            kb.vel.x = 0;
        }
        
    }
    
    jump() {
        this.getComponent("kinematicBody").vel.y = 20;
    }
}
class Block extends BasicObject {
    constructor(pos) {
        super();
        
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        
        this.addComponent(this.generateTexture());
        this.addComponent(new basicObjectComponents.KinematicBody([new colliderShapes.Square(vec2(), 30)]));
    }
    
    generateTexture() {
        return new basicObjectComponents.Texture([
            new canvasShapes.Square(vec2(), 30, {fillOrNot: true, fillStyle: "blue"})
        ]);
    }
}

let blocks = [
    new Block(vec2(400, 270)),
    new Block(vec2(430, 270)),
    new Block(vec2(370, 270))
];

let player = new Player();

keyPressFunctions[32] = function() {player.jump();};


//6,67430 = G