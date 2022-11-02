let basicObjectComponents = {};

basicObjectComponents.Universal = class {
    #parent;
    get parent() {return this.#parent;}
    
    constructor(){}
    
    setParent(parent) {
        this.#parent = parent;
    }
};

basicObjectComponents.Texture = class extends basicObjectComponents.Universal {
    #name = "texture";
    get name() {return this.#name;}
    
    shapes = [];
    
    constructor(setShapes){
        super();
        
        if(setShapes) {
            this.shapes = setShapes;
        }
        
        for(let i = 0; i < this.shapes.length; i++) {
            let shape = this.shapes[i];
            
            shape.setParent(this);
        }
    }
    
    drawOnScreen() {
        for(let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].draw();
        }
    }
};

basicObjectComponents.Transform = class extends basicObjectComponents.Universal {
    
    #name = "transform";
    get name() {return this.#name;}
    
    pos = vec2();
    scale = 1;
    
    constructor(pos, scale) {
        super();
        
        if(pos) {
            
            this.pos = pos;
            
            if(scale) {
                this.scale = scale;
            }
            
        }
    }
};

basicObjectComponents.KinematicBody = class extends basicObjectComponents.Universal {
    
    #name = "kinematicBody";
    get name() {return this.#name;}
    
    mass = 1;
    gravityScale = vec2(0, -1);
    velocity = vec2();
    vel = this.velocity;
    
    limitVel = true;
    velLimiter = 100;
    
    constructor(params = {}) {
        super();
        
        this.mass = params.mass || this.mass;
        this.gravityScale = params.gravityScale || this.gravityScale;
        this.velocity = params.velocity || this.velocity;
    }
    
    update() {
        let attractionVec = vec2(this.mass*this.gravityScale.x, this.mass*this.gravityScale.y);
        
        this.vel.x += attractionVec.x;
        this.vel.y += attractionVec.y;
        
        if(this.limitVel) {
            if(Math.abs(this.vel.x) > this.velLimiter) {
                this.vel.y *= this.velLimiter/Math.abs(this.vel.x);
                this.vel.x *= this.velLimiter/Math.abs(this.vel.x);
            }
            if(Math.abs(this.velocity.y) > this.velLimiter) {
                this.vel.x *= this.velLimiter/Math.abs(this.vel.y);
                this.vel.y *= this.velLimiter/Math.abs(this.vel.y);
            }
        }
        
        this.parent.move(this.vel);
    }
    
    addForce(forceVec) {
        this.vel.x += forceVec.x/this.mass;
        this.vel.y += forceVec.y/this.mass;
    }
};