let colliderShapes = {};

colliderShapes.Universal = class {
    
    parent;
    
    setParent(parent) {
        this.parent = parent;
    }
    
    constructor(){}

};

colliderShapes.Rect = class extends colliderShapes.Universal {
    
    pos1 = vec2();
    pos2 = vec2();
    
    get absPos1() {
        return multPosByTransform(pos1, this.parent.parent.pos, this.parent.getComponent("transform").scale);
    }
    get absPos2() {
        return multPosByTransform(pos2, this.parent.parent.pos, this.parent.getComponent("transform").scale);
    }
    
    constructor(pos1, pos2) {
        if(!pos1 || !pos2) {
            throw new Error("You need to set positions of line");
        }
        
        super();
        
        this.pos1 = pos1;
        this.pos2 = pos2;
    }
    
    isCollidingWith(colliderShape) {
        let p11 = vec2(this.absPos1);
        let p12 = vec2(this.absPos2);
        
        let p21 = vec2(colliderShape.absPos1);
        let p22 = vec2(colliderShape.absPos2);
        
        if(p21.x < p12.x && p21.y < p12.y &&
           p22.x > p11.x && p22.y > p11.y) {
            return true;
        }
    }
};

colliderShapes.Square = class extends colliderShapes.Rect {
    constructor(center, size) {
        let pos1 = vec2(center.x - size/2, center.y - size/2);
        let pos2 = vec2(center.x + size/2, center.y + size/2);
        
        super(pos1, pos2);
    }
};