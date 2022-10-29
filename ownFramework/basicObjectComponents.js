let basicObjectComponents = {};

basicObjectComponents.Universal = class {
    name;
    parent;
    
    constructor(){}
    
    setParent(parent) {
        this.parent = parent;
    }
};

basicObjectComponents.Texture = class extends basicObjectComponents.Universal {
    name = "texture";
    
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
    
    name = "transform";
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