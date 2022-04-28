import {analisisLexico} from '../Gramatica/aLExico.js';

function inicializaElementos(){
    $("#btn-clasifica").click(() => {
        const identificador = $("#inpIdentificador").val();
        const numero = $("#inpNumero").val();
        const cadena = $("#areaTexto").val();
        const resultado = analisisLexico(identificador,numero,cadena);
        creaTabla(resultado);
    })
}

function creaTabla(resultado){

    const claves = Object.keys(resultado);
    claves.forEach(clave => {
        let auxiliar = clave;
        let valor = resultado[clave];
        if(clave.lastIndexOf("-") != -1){
            auxiliar = clave.split("-")[0];
        }
        const fila = `
            <tr>
                <td class="text-center">${auxiliar}</td>
                <td class="text-center">${valor}</td>
            </tr>
        `;
        $("#tbody-tiny").append(fila);
    });
}

export function aLexicoMain(){
    inicializaElementos();
}