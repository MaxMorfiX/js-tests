/*global basicObjectComponents*/
/*global basicObjects*/

class BasicObject {
    
    #childs = [];
    #childsNamed = {};
    #childsWithUniqueIds = {};
    #parent = "window";
    #uniqueId = 0;
    
    #components = {};
    
    get uniqueId() {
        return this.#uniqueId;
    }
    
    get parent() {
        return this.#parent;
    }
    set parent(val) {
        if(this.parent === "window") {
            throw new Error("cannot change a parent of an object");
        }
        
        this.parent = parent;
    }
    
    getComponent(name) {
        return this.#components[name];
    }
    addComponent(component) {
        if(this.#components[component.name]) {
            return false;
        }
        
        component.setParent(this);
        
        this.#components[component.name] = component;
    }
    
    addChild(child, name) {
        if(name !== undefined)
            this.#childsNamed[name] = this.#childs.length;
        
        this.#childsWithUniqueIds[child.uniqueId] = this.#childs.length;
        child.parent === this;
        this.#childs.push(child);
    }
    getChild(name) {
        if(this.childsNamed[name]) {
            return this.#childs[this.childsNamed[name]];
        }
    }
    getAllChilds() {
        return this.#childs;
    }
    getChildByUniqueId(id) {
        if(this.#childsWithUniqueIds[id]) {
            return this.#childs[this.#childsWithUniqueIds[id]];
        }
        
        return false;
    }
    deleteChildByUniqueId(id) {
        if(this.#childsWithUniqueIds[id]) {
            let childInsideId = this.#childsWithUniqueIds[id];
            this.#childs.splice(childInsideId, 1);
            this.#childsWithUniqueIds.splice(id);
            
            for(let i = 0; i < this.#childsNamed; i++) {
                let obj = this.#childsNamed[i];
                if(obj === childInsideId) {
                    this.#childsNamed.splice(i, 1);
                }
            }
        }
    }
    
    move(moveVec) {
        this.getComponent("transform").pos.x += moveVec.x;
        this.getComponent("transform").pos.y += moveVec.y;
        
        for(let i = 0; i < this.#childs.length; i++) {
            let child = this.#childs[i];
            child.move(moveVec);
        }
    }
    setPos(pos) {
        let currPos = this.getComponent("transform").pos;
        let diff = vec2(pos.x - currPos.x, pos.y - currPos.y);
        
        for(let i = 0; i < this.#childs.length; i++){
            let child = this.#childs[i];
            
            child.move(diff);
        }
        
        currPos.x = pos.x;
        currPos.y = pos.y;        
    }
    
    constructor(){
        this.#uniqueId = basicObjects.length;
        
        basicObjects.push(this);
        
        this.addComponent(new basicObjectComponents.Transform());
    };
    
    update(){};
}