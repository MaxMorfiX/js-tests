/*global canvasShapes*/
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
        
        let force = {
            x: (m.x - this.pos.x)*deltaT*0.0001,
            y: (m.y - this.pos.y)*deltaT*0.0001
        };
        
        kb.addForce(force);
    }
};

new BallClass(vec2(200, 200), "blue");

for(let i = 0; i < 100; i++) {
    new BallClass({
        x: Math.random()*1280,
        y: Math.random()*680
    });
}