import { convierteAPosfija } from "./posfija.js"; //Importa la función de conversión
import {afn} from "./afn.js"
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
const clickBotonConvierte = () => {
  const expresion = inputExpresion.value;
  try {
    let posfija = convierteAPosfija(expresion);
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
const clickCreaAfn = () =>{
  afn();
}
btnAfn.addEventListener("click", clickCreaAfn);