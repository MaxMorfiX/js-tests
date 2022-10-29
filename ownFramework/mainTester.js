/*global canvasShapes*/
/*global basicObjectComponents*/

class Ball extends BasicObject {
    constructor(pos) {
        super();
        
        if(pos) {
            this.getComponent("transform").pos = pos;
        }
        
        this.addComponent(this.generateTexture());
        
    }
    
    generateTexture() {
        return new basicObjectComponents.Texture([
            new canvasShapes.Circle(vec2(), 30)
        ]);
    }
    
    update = function(deltaT) {
        if(buttons.mouse === true) {
            this.getComponent("transform").pos = vec2(m);
        }
    }
    
}

new Ball(vec2(300, 100));