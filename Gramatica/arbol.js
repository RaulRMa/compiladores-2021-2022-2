export default class Arbol{
    constructor(nombre = ""){
        this.nombre = nombre;
        this.hijos = [];
    }

    inserta(nombre = ""){
        const nuevoNodo = new Arbol(nombre);
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
    

}