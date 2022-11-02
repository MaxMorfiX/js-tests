/*global canvasShapes*/
/*global fieldH*/
/*global fieldW*/

"use strict";

let basicObjects = [];
let camera = new Camera();

let worldm = vec2();

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
        
        worldm = camera.camera2WorldPoint(vec2(m.x, fieldH - m.y));

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
        
        fw.handleCollisions();
    }
    
    static handleCollisions() {
        for(let i = 0; i < basicObjects.length; i++) {
            for(let j = i + 1; j < basicObjects.length; j++) {
                
                let obj1 = basicObjects[i];
                let obj2 = basicObjects[j];
                
                let col1 = obj1.getComponent("collider");
                let col2 = obj2.getComponent("collider");
                
                if(!col1 || !col2) {
                    continue;
                }
                
                let recentRes = obj1.currCollisions[col2.uniqueId];
                
                let res = col1.isCollidingWith(col2);
                
                obj1.currCollisions[col2.uniqueId] = res;
                obj2.currCollisions[col1.uniqueId] = res;
                
                if(recentRes === false && res === true) {
                    if(col1.onBodyEnter) {
                        col1.onBodyEnter(col2);
                    }
                    if(col2.onBodyEnter) {
                        col2.onBodyEnter(col1);
                    }
                }
                    
                if(recentRes === true && res === true) {
                    if(col1.whileBodyInside) {
                        col1.whileBodyInside(col2);
                    }
                    if(col2.whileBodyInside) {
                        col2.whileBodyInside(col1);
                    }
                }
                
                if(recentRes === true && res === false) {
                    if(col1.onBodyExit) {
                        col1.onBodyExit(col2);
                    }
                    if(col2.onBodyExit) {
                        col2.onBodyExit(col1);
                    }
                }
            }
        }
    }
};