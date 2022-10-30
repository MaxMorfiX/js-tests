/*global canvasShapes*/

"use strict";

let basicObjects = [];
let fieldH = 680;
let fieldW = 1280;

let fw = class {
    
    static onLoad() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        this.fitToSize();

        setInterval(fw.frameworkUpdate, 16.666666666);
    }
    
    static fitToSize() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        
        fieldH = canvas.height;
        fieldW = canvas.width;
    }
    
    static calculateDeltaT() {
        return 16.6666666666666;
    }
    
    static frameworkUpdate() {

        let deltaT = fw.calculateDeltaT();

        for(let i = 0; i < basicObjects.length; i++) {
            let object = basicObjects[i];

            object.update(deltaT);
        }

        for(let i = 0; i < basicObjects.length; i++) {
            let object = basicObjects[i];
            let body = object.getComponent("kinematicBody");
            
            if(body) {
                body.update();
            }
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(let i = 0; i < basicObjects.length; i++) {
            let object = basicObjects[i];
            let texture = object.getComponent("texture");
            
            if(texture) {
                texture.drawOnScreen();
            }
        }
        
    }
    
};