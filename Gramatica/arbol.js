export default class Arbol{
    constructor(nombre = "", id = 0){
        this.nombre = nombre;
        this.hijos = [];
        this.id = "";
        this.asignaId(nombre,id)
        this.padre = "";
    }

    asignaId(nombre, id){
        if(nombre.includes("'")){
            this.id = id + "-"+ nombre.split("'")[0];
        }else{
            this.id = id + "-"+ nombre.split("-")[0];
        }
    }

    inserta(nombre = "",id){
        const nuevoNodo = new Arbol(nombre,id);
        nuevoNodo.padre = this;        
        this.hijos.push(nuevoNodo);
        return nuevoNodo;
    }

    obtenHijo(nombre){
        if(nombre == this.nombre) return this;
        for(const child of this.hijos){
            if(child.nombre === nombre) return child
            const result = child.obtenHijo(nombre)
            if(!result) continue
            return result
        }
        return false
    }
    
    obtenHijoPorId(id){
        if(id == this.id) return this;
        for(const child of this.hijos){
            if(child.id === id) return child
            const result = child.obtenHijo(id)
            if(!result) continue
            return result
        }
        return false
    }

    recorreArbol(cb){
        for(const child of this.hijos){
            cb(child)
            child.recorreArbol(cb)
        }
    }

}