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
    
    constructor(params = {}) {
        super();
        
        this.mass = params.mass || 1;
        this.gravityScale = params.gravityScale || 1;
        this.velocity = params.velocity || 1;
    }
    
    update() {
        let attractionVec = vec2(this.mass*this.gravityScale.x, this.mass*this.gravityScale.y);
        
        this.vel.x += attractionVec.x;
        this.vel.y += attractionVec.y;
        
        this.parent.move(this.vel);
        
        console.log(`attractionVec: ${JSON.stringify(attractionVec)}, vel: ${JSON.stringify(this.vel)}, pos: ${JSON.stringify(this.parent.getComponent("transform").pos)}`);
    }
    
    addForce(forceVec) {
        this.vel.x += forceVec.x*this.mass;
        this.vel.y += forceVec.y*this.mass;
    }
};