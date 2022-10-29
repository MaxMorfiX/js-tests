let collidersShapes = {};

collidersShapes.Universal = class {
    constructor(){
        if(this.constructor === colliderShapes.Universal){
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
    }
};

collidersShapes.Box = class extends collidersShapes.Universal {
    
    pos1;
    pos2;
    
    drawObject;
    
    constructor(pos1, pos2, params) {
        if(!pos1 || !pos2) {
            throw new Error("You need to set positions of line");
        }
        
        super();
        
        this.drawObject = new canvasShapes.Rect(pos1, pos2, params);
    }
    
    isDotInside(dot) {
    }
};