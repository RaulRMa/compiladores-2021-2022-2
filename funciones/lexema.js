

const pertenece = (dEstado = [], letra = '', AFD) => {
    for (let i = 0; i < dEstado.encabezados.length; i++) {
        const enc = dEstado.encabezados[i];
        if(enc == letra){
            const nombreDEstado = dEstado.transiciones[i];
            for(let j = 0; j < AFD.length; j++){
                const dEstado = AFD [j];
                if(nombreDEstado == dEstado.estado) return dEstado;
            }
        }
    }
    return false;
}

const analiza = (cadena = "", AFD = []) => {
    const arrCadena = cadena.split("");
    const primerLetra = arrCadena[0];
    const primerDEst = AFD[0];
    let siguiente = pertenece(primerDEst,primerLetra,AFD);
    let ultimo = "";
    if(siguiente != false){
        for(let i = 1; i < arrCadena.length; i++){
            const letra = arrCadena[i];
            siguiente = pertenece(siguiente, letra,AFD);
            if(siguiente != false){
                ultimo = letra;
            }else{
                ultimo = null;
                break;
            }
        }
        if(ultimo != null){
            return true
        }
    }
    return false;
}

export function Lexema(cadena = '', AFD = []){
    return analiza(cadena,AFD);
}