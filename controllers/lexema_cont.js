import {Lexema} from '../funciones/lexema.js';
let afd = 0;
function inicializa(){
    $("#boton-analizar").click(() => {
        const cadena = $("#lexema").val();
        const resultado = Lexema(cadena,afd);
        console.log(resultado);
    })
}

export function mainLexema(AFD = []) {
    afd = AFD.TABLA;
    inicializa();
}