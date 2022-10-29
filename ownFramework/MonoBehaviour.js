/*global canvasShapes*/
/*global objects*/

let BasicObject = class {
    
    #drawShapes = [];
    #shapesNamed = {};
    #pos = vec2();
    scale = 1;
    
    get pos() {
        return this.#pos;
    }

    set pos(newPos) {
        this.#pos = newPos;
        
        for(let i = 0; i < this.#drawShapes.length; i++) {
            let shape = this.#drawShapes[i];
            shape.calcNewWorldPos(this);
        }
    }
    
    update = function(deltaT){};
    
    constructor() {
        if(this.constructor === BasicObject){
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
        
        objects.push(this);
    }
    
    drawOnScreen() {
        for(let i = 0; i < this.#drawShapes.length; i++) {
            let shape = this.#drawShapes[i];
            
            shape.draw(this.pos, this.scale);
        }
    }
    
    addShape(shape, name) {
        this.#drawShapes.push(shape);
        
        if(name)
            this.#shapesNamed[name] = shape;
    }
    getShape(name) {
        return this.#shapesNamed[name];
    }
};

let GameObject = class extends BasicObject {
    colliders = [];
    #mouseColliders = [];
    
    constructor(){super();}
    
    checkCollidingWithMouse() {
        
        for(let i = 0; i < #mouseColliders.lenght; i++) {
            if(#mouseColliders[i].isDotInside(m)) {
                return true;
            }
        }
        
        return false;
        
    }
    
    
    set pos(newPos) {
        this.#pos = newPos;
        
        for(let i = 0; i < this.#drawShapes.length; i++) {
            let shape = this.#drawShapes[i];
            shape.calcNewWorldPos(this);
        }
        for(let i = 0; i < this.#mouseColliders.length; i++) {
            let collider = this.#mouseColliders[i];
            collider.calcNewWorldPos(this);
        }
    }
    
}