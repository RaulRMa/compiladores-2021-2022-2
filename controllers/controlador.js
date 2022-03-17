import { convierteAPosfija } from "../funciones/posfija.js"; //Importa la función de conversión
import { afn, encabezados, filasTabla } from "../funciones/afn.js";
import { AFD } from "../funciones/afd.js";
/**
 * Obtiene los elementos HTML a manipular mediante código
 *  - boton: boton html que desencadena las acciones del algoritmo
 *            de conversión
 *  - inputExpresion: input html donde el usuario ingresa la expresion
 *                    a convertir
 *  - inputResultado: input html donde el usuario visualiza el resultado
 *                    de conversión de la expresión regular
 *  - contenedorResultado: div html que agrupa al botón de conversión
 *                          y los inputs
 *  - contenedor: div html que agrupa todos los componentes del programa
 */
const boton = document.getElementById("boton-convertir");
const inputExpresion = document.getElementById("expresion-regular");
const inputResultado = document.getElementById("resultado-conversion");
const contenedorResultado = document.getElementById("div-programa");
const contenedor = document.getElementById("contenedor-principal");

/**
 * Crea un div html donde se desplegará el mensaje de
 * error en caso de que este ocurra
 */
const alerta = document.createElement("div");

/**
 * Ejecuta la función de conversión de la expresión infija
 * a posfija.
 * Despliega el resultado en el inputResultado en caso de que
 * la operación se haya realizado correctamente.
 * En caso contrario agrega el texto de error y las clases
 * bootstrap al elemento alerta creado anteriormente y lo
 * renderiza en el html
 */
// 3*(6-4+(2*3))+1
let posfija = "";
const clickBotonConvierte = () => {
  inicializaElementos();
  posfija = "";
  const expresion = inputExpresion.value;
  try {
    posfija = convierteAPosfija(expresion);
    inputResultado.value = posfija;
  } catch (error) {
    alerta.setAttribute("class", "alert alert-warning my-0");
    alerta.textContent = error.mensaje + error.caracter;
    contenedor.insertBefore(alerta, contenedorResultado);
    setTimeout(() => contenedor.removeChild(alerta), 2000);
  }
};
boton.addEventListener("click", clickBotonConvierte);

let transicionesAfn = [];
let encabezadosAfd = [];
//Obtiene el botón de AFN
const btnAfn = document.getElementById("btn-afn");
const clickCreaAfn = () => {
  if (posfija != "") {
    const automata = afn(posfija);
    const enc = encabezados(automata);
    encabezadosAfd = enc;
    const fin = automata[0].transiciones.length;
    transicionesAfn = automata[0].transiciones;
    const tamano = automata[0].transiciones[fin - 1].estadoDestino.nombre;
    tabla(tamano);
     agregaTotales(automata)
  } else {
    alert("No hay posfija");
  }
};

const agregaTotales = (automata) => {
  const fin = automata[0].transiciones.length;
  const totEdos = automata[0].transiciones[fin - 1].estadoDestino.nombre;
  let totTrans = 0;
  automata[0].transiciones.forEach((elemento) =>
    elemento.nombre == "ε" ? totTrans++ : 0
  );
  $("#n-estados").append(
    `<div class="btn btn-dark m-auto text-center" >Número de estados: ${
      totEdos + 1
    }</div>`
  );
  $("#n-transiciones").append(
    `<div class="btn btn-dark m-auto text-center" >Número de transiciones ε: ${totTrans}</div>`
  );
};

const encabezadosTabla = (arreglo = []) => {
  let element;
  $("#ths-aut").append(`<th scope="col" class="enc-aut text-center">Edo</th>`);
  arreglo.forEach((elemento, i) => {
    element = `
        <th scope="col" class="enc-aut text-center" id="th-${i}">${elemento}</th>
    `;
    $("#ths-aut").append(element);
  });
};

const tabla = (tamano) => {
  let body = $("#aut-body").empty();
  const t = filasTabla(tamano);
  const filas = t.filas;
  encabezadosTabla(t.encabezados);
  filas.forEach((fila, i) => {
    $(body).append(`<tr id="fila-${i}-aut"></tr>`);
    $(`#fila-${i}-aut`).append(`<th class="text-center">${fila.estado}</th>`);
    fila.conjuntos.forEach((conjunto) => {
      $(`#fila-${i}-aut`).append(
        `<td class="text-center">${
          conjunto == "Φ" ? "Φ" : cadenaConjunto(conjunto)
        }</td>`
      );
    });
  });
};

const cadenaConjunto = (arreglo = []) => {
  let cadena = "{";
  arreglo.forEach((elemento,i) => {
    if(i != arreglo.length -1) cadena += `${elemento.nombre},`;
    else cadena += `${elemento.nombre}}`
  });
  return cadena;
}

const inicializaElementos = () => {
  $("#aut-body").empty();
  $("#n-estados").empty();
  $("#n-transiciones").empty();
  $("#ths-aut").empty();
};
btnAfn.addEventListener("click", clickCreaAfn);

$("#btn-afd").click(() => {
  AFD(transicionesAfn, encabezadosAfd);
});
