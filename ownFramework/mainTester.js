/*global canvasShapes*/
/*global camera*/
/*global buttons*/
/*global m*/
/*global basicObjectComponents*/

let BallClass = class extends BasicObject {
    
    static objects = [];
    color;
    ballId;
    pos;
    
    constructor(pos, color) {
        super();
        
        this.pos = this.getComponent("transform").pos;
        
        this.ballId = BallClass.objects.length;
        BallClass.objects.push(this);
        
        if(pos) {
            this.setPos(pos);
        }
        
        this.color = color;
        
        this.addComponent(this.generateTexture(color));
        this.addComponent(new basicObjectComponents.KinematicBody());
        this.getComponent("kinematicBody").gravityScale = vec2();
        
    }
    
    generateTexture(color) {
        return new basicObjectComponents.Texture([
            new canvasShapes.Circle(vec2(), 10, {strokeStyle: color}),
            new canvasShapes.Circle(vec2(), 6, {strokeStyle: color, strokeWidth: 5})
        ]);
    }
    
    update(deltaT) {
        if(!buttons.mouse) {
            return;
        }
        
        let kb = this.getComponent("kinematicBody");
        
        let diff = vec2(worldm.x - this.pos.x, worldm.y - this.pos.y);
        
        let force = {
            x: diff.x*deltaT*1,
            y: diff.y*deltaT*1
        };
        
        force.x /= diff.magnitude*diff.magnitude;
        force.y /= diff.magnitude*diff.magnitude;
        
        kb.addForce(force);
    }
};
let GameController = class extends BasicObject {
    constructor() {super();}
    
    update = function(deltaT) {
        if(buttons[191]) {
            camera.zoom += 1.1*deltaT*0.001;
        }
        if(buttons[190]) {
            camera.zoom -= 1.1*deltaT*0.001;
        }
        
        if(buttons[37]) {
            camera.pos.x -= deltaT*0.1/camera.zoom;
        }
        if(buttons[39]) {
            camera.pos.x += deltaT*0.1/camera.zoom;
        }
        if(buttons[40]) {
            camera.pos.y -= deltaT*0.1/camera.zoom;
        }
        if(buttons[38]) {
            camera.pos.y += deltaT*0.1/camera.zoom;
        }
    }
};

new GameController();
new BallClass(vec2(200, 200), "blue");

for(let i = 0; i < 100; i++) {
    new BallClass({
        x: Math.random()*1280,
        y: Math.random()*680
    });
}