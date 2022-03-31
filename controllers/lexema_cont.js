import {Lexema} from '../funciones/lexema.js';
let afd = 0;
function inicializa(){
    $("#exp-reg").hide("linear");
    $("#lexema").removeAttr("hidden");
    //$("#flechas-lex").removeAttr("hidden");
    $("#flechas-lex").show();
    $("#lexema").show();
    $("#btn_lex").hide()
    $("#btn_er").click(() =>{
        $("#btn_lex").show();
        $("#btn_er").hide();
        $("#exp-reg").show("linear");
        $("#lexema").hide("linear");
    })
    $("#btn_lex").click(() =>{
        $("#btn_er").show();
        $("#btn_lex").hide();
        $("#exp-reg").hide("linear");
        $("#lexema").show("linear");
    })
    valida();
}

function valida(){
    $("#boton-analizar").click(() => {
        $("#aviso-pertenece").empty();
        const cadena = $("#cadena-lexema").val();
        const resultado = Lexema(cadena,afd);
        const mensaje = `
            <div class="alert alert-${resultado? "success" : "danger"} w-100 text-center">
                <h5>
                    <strong>${resultado? "Si" : "No"} pertenece al lenguaje de la ER</strong>
                </h5>
            </div>
        `;
        $("#aviso-pertenece").append(mensaje);
    })
}

export function mainLexema(AFD = []) {
    afd = AFD.TABLA;
    inicializa();
}