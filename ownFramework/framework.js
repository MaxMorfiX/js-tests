/*global canvasShapes*/

"use strict";

let canvas, ctx;

let objects = [];

let NoNameFramework = class {
    
    static onLoad() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        this.fitToSize();

        setInterval(frameworkUpdate, 16.666666666);
    }
    
    static fitToSize() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    
    static calculateDeltaT() {
        return 16.6666666666666;
    }
    
    static frameworkUpdate() {

        let deltaT = calculateDeltaT();

        for(let i = 0; i < objects.length; i++) {
            let behavior = objects[i];

            behavior.update(deltaT);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < objects.length; i++) {
            let behavior = objects[i];

            behavior.drawOnScreen();
        }
        
    }
    
    static checkObjectsClick() {
        for(let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            
            if(typeof obj.onclick !== "undefined") {
                continue;
            }
            
            
            
        }
    }
    
};