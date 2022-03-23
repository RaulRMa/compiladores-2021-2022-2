import { AFD } from "../funciones/afd.js";
let banderaAfd;
function inicializa() {
    banderaAfd = true;
    $("#ths-afd").empty();
    $("#afd-body").empty();
    $("#tabla-afn").hide("linear");
    funcionesFlechas()
}

function funcionesFlechas(){
    $("#flechas").show()
    $("#btn_afd").hide();
    $("#btn_afn").click(()=>{
        $("#btn_afd").show();
        $("#btn_afn").hide();
        $("#tabla-afd").hide("linear");
        $("#tabla-afn").show("linear");
        $("#totDEstados").hide();
    })
    $("#btn_afd").click(()=>{
        $("#btn_afn").show();
        $("#btn_afd").hide();
        $("#tabla-afn").hide("linear");
        $("#tabla-afd").show("linear");
        $("#totDEstados").show("linear");
    })
}


function creaTabla(tabla = []) {
    let body = $("#afd-body").empty();
    encabezadosTabla(tabla.encs);
    const filas = tabla.TABLA;
    filas.forEach((fila,i) => {
        $(body).append(`<tr id="fila-${i}-afd"></tr>`);
        $(`#fila-${i}-afd`).append(`<th class="text-center">${fila.estado}</th>`);
        fila.transiciones.forEach(transicion =>{
            $(`#fila-${i}-afd`).append(
                `<td class="text-center">${
                  transicion == ' ' ? ' ' : transicion
                }</td>`
            );
        })
    });
    $("#totDEstados").append(
        `<div class="btn btn-dark m-auto text-center" >Número de dEstados: ${
          filas.length
        }</div>`
      );
}
function encabezadosTabla(encs = []) {
    let elemento = '';
    $("#ths-afd").append(`<th scope="col" class="enc-aut text-center">Edo</th>`);
    encs.forEach((elemento, i) => {
        elemento = `
        <th scope="col" class="enc-aut text-center" id="th-${i}">${elemento}</th>
        `;
        $("#ths-afd").append(elemento);
    })

}
export function mainAfd(transiciones, encabezados) {
    inicializa();
    const tabla = AFD(transiciones, encabezados);
    creaTabla(tabla);
    return tabla;
}