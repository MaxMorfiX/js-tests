/*global canvasShapes*/
/*global camera*/
/*global buttons*/
/*global m*/
/*global basicObjectComponents*/

let Ball = class extends BasicObject {
    
    static globalG = 6.67384;
    static objects = [];
    color;
    ballId;
    pos;
    
    velLimiterOnCenter = 0.01;
    
    constructor(pos, params = {}) {
        super();
        
        this.pos = this.getComponent("transform").pos;
        
        this.ballId = Ball.objects.length;
        Ball.objects.push(this);
        
        if(pos) {
            this.setPos(pos);
        }
        
        this.color = params.color;
        
        this.addComponent(this.generateTexture(params.color, params.radius));
        this.addComponent(new basicObjectComponents.KinematicBody());
        this.getComponent("kinematicBody").gravityScale = vec2();
        
        this.getComponent("kinematicBody").mass = params.mass || 0.1;
    }
    
    generateTexture(color, radius) {
        return new basicObjectComponents.Texture([
            new canvasShapes.Circle(vec2(), radius || 30, {strokeStyle: color, fillOrNot: true, fillStyle: color})
//            new canvasShapes.Circle(vec2(), 6, {strokeStyle: color, strokeWidth: 5})
        ]);
    }
    
    update(deltaT) {
        
        this.attractToBalls(deltaT);
        
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
        
        if(diff.magnitude < 5) {
            if(Math.abs(force.x) > this.velLimiterOnCenter) {
                force.y *= this.velLimiterOnCenter/Math.abs(force.x);
                force.x *= this.velLimiterOnCenter/Math.abs(force.x);
            }
            if(Math.abs(force.y) > this.velLimiterOnCenter) {
                force.x *= this.velLimiterOnCenter/Math.abs(force.y);
                force.y *= this.velLimiterOnCenter/Math.abs(force.y);
            }
        }
        
        kb.addForce(force);
    }
    
    attractToBalls(deltaT) {
        
        let finalForce = vec2();
        
        for(let i in Ball.objects) {
            let ball = Ball.objects[i];
            
            if(ball === this) continue;
            
            let ballPos = ball.getComponent("transform").pos;
            let ballMass = ball.getComponent("kinematicBody").mass;
            
            let diff = vec2(ballPos.x - this.pos.x, ballPos.y - this.pos.y);
        
            let force = {
                x: diff.x*deltaT*ballMass*Ball.globalG,
                y: diff.y*deltaT*ballMass*Ball.globalG
            };

            force.x /= diff.magnitude*diff.magnitude;
            force.y /= diff.magnitude*diff.magnitude;

            if(diff.magnitude < 5) {
                if(Math.abs(force.x) > this.velLimiterOnCenter) {
                    force.y *= this.velLimiterOnCenter/Math.abs(force.x);
                    force.x *= this.velLimiterOnCenter/Math.abs(force.x);
                }
                if(Math.abs(force.y) > this.velLimiterOnCenter) {
                    force.x *= this.velLimiterOnCenter/Math.abs(force.y);
                    force.y *= this.velLimiterOnCenter/Math.abs(force.y);
                }
            }
            
            finalForce.x += force.x;
            finalForce.y += force.y;
            
        }
        
        this.getComponent("kinematicBody").addForce(finalForce);
        
    }
};
let GameController = class extends BasicObject {
    constructor() {
        super();
        
        camera.zoom = 0.1;
    }
    
    update = function(deltaT) {
        if(buttons[191]) {
            camera.zoom += 1.1*deltaT*0.001*camera.zoom;
        }
        if(buttons[190]) {
            camera.zoom -= 1.1*deltaT*0.001*camera.zoom;
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
new Ball(vec2(200, 200), {color: "blue", mass: 1, radius: 100});

for(let i = 0; i < 10; i++) {
    new Ball({
        x: Math.random()*1280,
        y: Math.random()*680
    });
}