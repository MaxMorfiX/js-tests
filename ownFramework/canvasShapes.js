let fieldH = 680;
let fieldW = 1280;

let canvas;
let ctx;

let canvasShapes = {};

canvasShapes.Universal = class {
    
    parent;

    strokeStyle;
    fillStyle;
    lineWidth;
    lineCap;
    lineJoin;

    fillOrNot;

    constructor(params = {}) {

        if(this.constructor === canvasShapes.Universal){
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }

        this.strokeStyle = params.strokeStyle || params.lineColor || "black";
        this.fillStyle = params.fillStyle || params.fillColor || "black";
        this.lineWidth = params.lineWidth || 1;
        this.lineCap = params.lineCap || "square";
        this.lineJoin = params.lineJoin || "miter";
        this.fillOrNot = params.fillOrNot || false;

    }

    startDraw() {
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.lineJoin = this.lineJoin;

        ctx.beginPath();
    }

    endDraw() {
        if(this.fillOrNot === true) {
            ctx.fill();
        }

        ctx.stroke();
        ctx.closePath();
    }
    
    setParent(parent) {
        this.parent = parent;
    }

};

canvasShapes.Line = class extends canvasShapes.Universal {
    
    pos1 = vec2();
    pos2 = vec2();
    
    constructor(pos1, pos2, params = {}) {
        
        if(!pos1 || !pos2) {
            throw new Error("You need to set positions of line");
        }
        
        super(params);
        
        this.pos1 = pos1;
        this.pos2 = pos2;
        
    }
    
    draw() {
        this.startDraw();
        
        let offset = this.parent.parent.getComponent("transform").pos;
        let scale = this.parent.parent.getComponent("transform").scale;
        
        let pos1 = multPosByTransform(this.pos1, offset, scale);
        let pos2 = multPosByTransform(this.pos2, offset, scale);
        
        pos1 = camera.world2CameraPoint(pos1);
        pos2 = camera.world2CameraPoint(pos2);
        
        let width = multLenghtByTransform(this.lineWidth, scale);
        width = camera.world2CameraLenght(width);
        ctx.lineWidth = width;
        
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        
        this.endDraw();
    }
    
};
canvasShapes.Circle = class extends canvasShapes.Universal {
    
    center = vec2();
    radius;
    
    constructor(center, radius, params = {}) {
        
        if(!center) {
            throw new Error("You need to set position of center");
        }
        if(!radius) {
            throw new Error("You need to set radius of a circle");
        }
        
        super(params);
        
        this.radius = radius;
        this.center = center;
    }
    
    draw() {
        this.startDraw();
        
        let offset = this.parent.parent.getComponent("transform").pos;
        let scale = this.parent.parent.getComponent("transform").scale;
        
        let pos = multPosByTransform(this.center, offset, scale);
        let radius = multLenghtByTransform(this.radius, scale);
        
        pos = camera.world2CameraPoint(pos);
        
        let width = multLenghtByTransform(this.lineWidth, scale);
        width = camera.world2CameraLenght(width);
        ctx.lineWidth = width;
        
        ctx.arc(pos.x, pos.y, camera.world2CameraLenght(radius), 0, 2*Math.PI);
        
        this.endDraw();
    }
    
};

canvasShapes.Rect = class extends canvasShapes.Universal {
    
    pos1 = vec2();
    pos2 = vec2();
    
    get height() {return this.pos2.y - this.pos1.y;}
    get width() {return this.pos2.x - this.pos1.x;}
    
    constructor(pos1, pos2, params = {}) {
        
        if(!pos1 || !pos2) {
            throw new Error("You need to set positions of line");
        }
        
        super(params);
        
        this.pos1 = pos1;
        this.pos2 = pos2;
        
    }
    
    draw() {
        this.startDraw();
        
        let offset = this.parent.parent.getComponent("transform").pos;
        let scale = this.parent.parent.getComponent("transform").scale;
        
        let pos1 = multPosByTransform(this.pos1, offset, scale);
        let pos2 = multPosByTransform(this.pos2, offset, scale);
        
        pos1 = camera.world2CameraPoint(pos1);
        pos2 = camera.world2CameraPoint(pos2);
        
        let width = multLenghtByTransform(this.lineWidth, scale);
        width = camera.world2CameraLenght(width);
        ctx.lineWidth = width;
        
        let diff = vec2(pos1.x - pos2.x, pos2.y - pos1.y);
        
        ctx.rect(pos2.x, pos1.y, diff.x, diff.y);
        
        this.endDraw();
    }
};
canvasShapes.Square = class extends canvasShapes.Rect {
    constructor(center, size, params) {
        let pos1 = vec2(center.x - size/2, center.y - size/2);
        let pos2 = vec2(center.x + size/2, center.y + size/2);
        
        super(pos1, pos2, params);
    }
};




let multPosByTransform = function(pos, offset, scale) {
    let retPos = JSON.parse(JSON.stringify(pos));;
    
    retPos.x *= scale;
    retPos.y *= scale;
    
    retPos.x += offset.x;
    retPos.y += offset.y;
    
    return retPos;
};

let multLenghtByTransform = function(lenght, scale) {
    let retLenght = lenght;
    
    retLenght *= scale;
    
    return retLenght;
};

let Camera = class extends BasicObject {
    pos;
    zoom = 1;
    
    constructor(params = {}) {
        super();

        this.pos = this.getComponent("transform").pos;
        
        this.pos = params.pos || this.pos;
        this.zoom = params.zoom || this.zoom;
    }
    
    world2CameraPoint(point) {
        let retPoint = vec2(point);
        
        retPoint.x -= this.pos.x;
        retPoint.y -= this.pos.y;
        
        retPoint.x *= this.zoom;
        retPoint.y *= this.zoom;
        
        retPoint.y = fieldH - retPoint.y;
        
        return retPoint;
    }
    
    camera2WorldPoint(point) {
        let retPoint = vec2(point);
        
        retPoint.y = fieldH - retPoint.y;
        
        retPoint.x /= this.zoom;
        retPoint.y /= this.zoom;
        
        retPoint.x += this.pos.x;
        retPoint.y += this.pos.y;
        
        return retPoint;
    }
    
    world2CameraLenght(lenght) {
        return lenght*this.zoom;
    }
    Camera2WorldLenght(lenght) {
        return lenght/this.zoom;
    }
};