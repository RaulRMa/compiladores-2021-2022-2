import { convierteAPosfija } from "./posfija.js"; //Importa la función de conversión
import { afn, encabezados } from "./afn.js";
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

//Obtiene el botón de AFN
const btnAfn = document.getElementById("btn-afn");
const clickCreaAfn = () => {
  if (posfija != "") {
    const automata = afn(posfija);
    const enc = encabezados(automata);
    console.log(automata);
    const fin = automata[0].transiciones.length;
    const tamano = automata[0].transiciones[fin - 1].estadoDestino.nombre;
    encabezadosTabla(enc);
    const columnas = columnasTabla(automata[0].transiciones, enc);
    agregaTotales(automata);
    agregaFilas(columnas, tamano, enc);
  } else {
    alert("No hay posfija");
  }
};

const agregaTotales = (automata) => {
  const fin = automata[0].transiciones.length;
  const totEdos = automata[0].transiciones[fin - 1].estadoDestino.nombre;
  let totTrans =0;
  automata[0].transiciones.forEach(elemento => elemento.nombre == 'ε' ? totTrans++ : 0);
  $("#n-estados").append(
    `<div class="btn btn-dark m-auto text-center" >Número de estados: ${totEdos+1}</div>`
  );
  $("#n-transiciones").append(
    `<div class="btn btn-dark m-auto text-center" >Número de transiciones ε: ${totTrans}</div>`
  );
};

const encabezadosTabla = (arreglo = []) => {
  let element;
  let indx;
  $("#ths-aut").append(`<th scope="col" class="enc-aut text-center">Edo</th>`);
  arreglo.forEach((elemento, i) => {
    element = `
        <th scope="col" class="enc-aut text-center" id="th-${i}">${elemento}</th>
    `;
    $("#ths-aut").append(element);
  });
  $("#ths-aut").append(`<th scope="col" class="enc-aut text-center">ε</th>`);
};

const columnasTabla = (transiciones = [], operandos = []) => {
  operandos.push("ε");
  const columnas = [];
  for (let i = 0; i < operandos.length; i++) {
    const op = operandos[i];
    const conjuntos = [];
    const objeto = { operando: op };
    for (let j = 0; j < transiciones.length; j++) {
      const trans = transiciones[j];
      if (op == trans.nombre) {
        conjuntos.push(trans);
      } else {
        conjuntos.push("Φ");
      }
    }
    objeto["transiciones"] = conjuntos;
    columnas.push(objeto);
  }
  return columnas;
};
const columnasTabla2 = (transiciones = [], operandos = []) => {
  operandos.push("ε");
  const columnas = [];
  for (let i = 0; i < operandos.length; i++) {
    transiciones.forEach(elemento => {

    })
  }
  return columnas;
};
const agregaFilas = (columnas, tamano, operadores) => {
  console.log("Columnas: ", columnas);
  let body = $("#aut-body").empty();
  for (let i = 0; i <= tamano; i++) {
    $(body).append(`<tr id="fila-${i}-aut"></tr>`);
    $(`#fila-${i}-aut`).append(`<th class="text-center">${i}</th>`);
    let band = false;
    let aux = "";
    columnas.forEach((col) => {
      const trans = col.transiciones[i];
      $(`#fila-${i}-aut`).append(
        `<td class="text-center">${trans == "Φ" ? trans : trans.estadoDestino.nombre}</td>`
      );
    });
  }
};

const agregaFilas2 = (columnas, tamano, operadores) => {
  let body = $("#aut-body").empty();
  for (let i = 0; i <= tamano; i++) {
    $(body).append(`<tr id="fila-${i}-aut"></tr>`);
    $(`#fila-${i}-aut`).append(`<th class="text-center">${i}</th>`);
    let band = false;
    let aux = "";
    columnas.forEach((col) => {
      const trans = col.transiciones[i];
      $(`#fila-${i}-aut`).append(
        `<td class="text-center">${trans == "Φ" ? trans : trans.estadoDestino.nombre}</td>`
      );
    });
  }
};

const inicializaElementos = () => {
  $("#aut-body").empty();
  $("#n-estados").empty();
  $("#n-transiciones").empty();
  $("#ths-aut").empty();

}
btnAfn.addEventListener("click", clickCreaAfn);
