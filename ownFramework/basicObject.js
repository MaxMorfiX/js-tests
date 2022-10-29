/*global basicObjectComponents*/

class BasicObject {
    
    #childs = [];
    #childsNamed = {};
    #parent = "window";
    
    #components = {
        "transform": new basicObjectComponents.Transform()
    };
    
    
    get parent() {
        return this.#parent;
    }
    set parent(val) {
        throw new Error("cannot change parent of an object");
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
            this.childsNamed[name] = this.#childs.length;
        
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
    
    constructor(){basicObjects.push(this)};
    
    update(){};
}