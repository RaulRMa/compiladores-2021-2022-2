Array.prototype.equals = function (getArray) {
    if (this.length != getArray.length) return false;
  
    for (var i = 0; i < getArray.length; i++) {
      if (this[i] instanceof Array && getArray[i] instanceof Array) {
        if (!this[i].equals(getArray[i])) return false;
      } else if (JSON.stringify( this[i]) != JSON.stringify( getArray[i])) {
        return false;
      }
    }
    return true;
};//Sobre escribe el método de javascript para comparar 2 arreglos
//const dEstados = [];
const dEstado = (nombre = '', subconjuntos = []) =>{
    return {
        nombre,subconjuntos,
        visitado: false,
    }
}

const cerraduraEpsilon = (transiciones = [], encabezados = []) => {
    encabezados.pop();
    let encs = encabezados.filter((enc,i,array) => i == array.indexOf(enc));
    marcaNovisitados(transiciones);
    const edoInicio = transiciones[0].estadoInicio;
    const dEstados = [];
    const edoA = [];
    edoA.push({estado: edoInicio,transicion:transiciones[0]});
    recorridoEpsilon(edoInicio,transiciones,edoA);
    dEstados.push(dEstado("A",edoA));
    const conjuntos = [];
    const TABLA = [];
    for(let k = 0; k < dEstados.length; k++){
        const dEstadoSub = dEstados[k];
        const fila = {
            estado: "",
            encabezados:[],
            transiciones: [],
        };
        fila.estado = dEstadoSub.nombre;
        for (let c = 0; c < encs.length; c++) {
            const ultimo = dEstados[dEstados.length -1];
            const encabezado = encs[c];
            fila.encabezados.push(encabezado);
            let estados = [];
            dEstadoSub.subconjuntos.forEach(edo => {
                estadoEncabezado(transiciones,encabezado,estados,edo);
            })
            if(estados.length == 0){
                fila.transiciones.push("");
                continue;
            }
            marcaNovisitados(transiciones);
            const subconjuntos = [];
            let nombreCerradura = '{';
            let objeto = dEstado(String.fromCharCode(ultimo.nombre.charCodeAt(0)+1));
            estados.forEach((edo,j) => {
                nombreCerradura += j != estados.length -1? `${edo.nombre},` : `${edo.nombre}}`;
                subconjuntos.push({estado:edo});
                recorridoEpsilon(edo,transiciones,subconjuntos);
            });
            objeto.subconjuntos = subconjuntos;
            if(!subConjuntoExiste(dEstados,subconjuntos)){
                dEstados.push(objeto);
                conjuntos.push(subconjuntos);
            }else{
                const nombreEstado = subConjuntoRepetido(dEstados,subconjuntos);
                fila.transiciones.push(nombreEstado.nombre);
            }
            
        }
        TABLA.push(fila);
    }
    console.log(TABLA);
    return dEstados;
}

const subConjuntoExiste = (dEstados = [], subconj = []) =>{
    for (let i = 0; i < dEstados.length; i++) {
        const subconjunto = dEstados[i].subconjuntos;
        if(subconjunto.equals(subconj)) return true;
    }
    return false;
}
const subConjuntoRepetido = (dEstados = [], subconj = []) =>{
    for (let i = 0; i < dEstados.length; i++) {
        const subconjunto = dEstados[i].subconjuntos;
        if(subconjunto.equals(subconj)){
            return dEstados[i];
        };
    }
}
const estadoEncabezado = (transiciones, encabezado, arreglo, edo) =>{
    for (let i = 0; i < transiciones.length; i++) {
        const trans = transiciones[i];
        if(trans.nombre == encabezado && trans.estadoInicio.nombre == edo.estado.nombre){
            arreglo.push(trans.estadoDestino)
        }
    }
}

const recorridoEpsilon = (estadoInicio, transiciones, lista) =>{
    estadoInicio.visitado = true;
    const listaVecinos = adyacentes(estadoInicio, transiciones);
    while(listaVecinos.length != 0){
        const estado =  listaVecinos.shift();
        if(!estado.estado.visitado) {
            lista.push(estado);
            recorridoEpsilon(estado.estado,transiciones,lista);
        }
    }

}

const adyacentes = (estado, transiciones) => {
    const resultado = [];
    const auxiliar = estado;
    transiciones.forEach(transicion => {
        if(transicion.estadoInicio.nombre == auxiliar.nombre && transicion.nombre == "ε"){
            resultado.push({
               estado: transicion.estadoDestino,  
               transicion
            });
        }
    })
    return resultado;
}

const marcaNovisitados = (transiciones = []) =>{
    transiciones.forEach(transicion => {
        transicion.estadoInicio.visitado = false;
        transicion.estadoDestino.visitado = false;
    });
}

const construyeAfd = (dEstados = [],encabezados = [], transiciones) => {
    let encs = encabezados.filter((enc,i,array) => i == array.indexOf(enc));
    const TABLA = [];
    for(let k = 0; k < dEstados.length; k++){
        const dEstadoSub = dEstados[k];
        const fila = {
            estado: "",
            encabezados:[],
            transiciones: [],
        };
        fila.estado = dEstadoSub.nombre;
        for (let c = 0; c < encs.length; c++) {
            const encabezado = encs[c];
            fila.encabezados.push(encabezado);
            let estados = [];
            dEstadoSub.subconjuntos.forEach(edo => {
                estadoEncabezado(transiciones,encabezado,estados,edo);
            })
            if(estados.length == 0){
                fila.transiciones.push("");
                continue;
            }
            marcaNovisitados(transiciones);
            const subconjuntos = [];
            estados.forEach((edo,j) => {
                subconjuntos.push({estado:edo});
                recorridoEpsilon(edo,transiciones,subconjuntos);
            });
            if(subConjuntoExiste(dEstados,subconjuntos)){
                const nombreEstado = subConjuntoRepetido(dEstados,subconjuntos);
                fila.transiciones.push(nombreEstado.nombre);
            }
        }
        TABLA.push(fila);
    }
    console.log(TABLA);
}

export function AFD (transiciones = [], encabezados = []) {
    console.log("Creando afd");
    const dEstados = cerraduraEpsilon(transiciones, encabezados);
    construyeAfd(dEstados,encabezados, transiciones);
}