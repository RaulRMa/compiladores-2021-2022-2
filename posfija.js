const operador = {
  orden: 0,
  simbolo: "",
  unario: false,
};
const arregloOperadores = ["|", "&", "+", "*", "?"];
let posfija = "";

const prioridadAlfabeto = () => {};

/**
 * Convierte el parámetro a código ascii y lo compara
 * con el rango 65...90 y 97...122.
 * @param {char} letra
 * @returns caracter comparado con el código ascii, carácter nulo si no pertenece al alfabeto
 */
const esOperadorLetra = (letra = "") => {
  const asciiLetra = letra.charCodeAt();
  //Codigo ascii de letras mayúsculas
  for (let i = 65; i <= 90; i++) {
    if (i == asciiLetra) return letra;
  }
  //Codigo ascii de letras minúsculas
  for (let j = 97; j <= 122; j++) {
    if (j == asciiLetra) return letra;
  }
  return "\0";
};

//Orden de precedencia 
const definePrioridad = (arregloOps = []) => {
  const resultado = arregloOps.map((elemento, indice) => {
    //Operadores Unarios
    if (elemento == "*" || elemento == "+"  || elemento == "?") {
      return inicializaOperador(3, elemento, true);
    }
    //Concatenacion
    if (elemento == "&") {
      return inicializaOperador(2, elemento, false);
    } else {

      //Seleccion de alternativas 
      return inicializaOperador(indice + 1, elemento, false);
    }
  });
  return resultado;
};

//Identificar que tipo de Operador es 
const inicializaOperador = (orden, simbolo, unario) => {
  const operadorSimbolo = { ...operador };
  operadorSimbolo["orden"] = orden;
  operadorSimbolo["simbolo"] = simbolo;
  operadorSimbolo["unario"] = unario;
  return operadorSimbolo;
};

const esOperador = (caracter = "") => {
  for (let i = 0; i < arregloOperadores.length; i++) {
    const operador = arregloOperadores[i];
    if (caracter == operador) {
      return caracter;
    }
  }
  return false;
};

//Rango de operando sea de numero
const esOperando = (caracter = "") => {
  for (let i = 0; i < 10; i++) {
    if (Number(caracter) == i) return caracter;
  }
  //si no el operador es letra 
  return esOperadorLetra(caracter);
};

//Si el caracter es parentesis derecho 
const parentesisDerecho = (pila = []) => {
  let tamano = pila.length -1; //Extraer de la pila 
  const limite = pila.length;
  for (let i = 0; i < limite; i++) {
    const tope = pila[tamano--];
    if (tope != "(") { //Hasta encontrar parentesis izquierdo
      posfija += pila.pop();
      continue;
    }
    pila.pop();
    break;
  }
};

//En caso de que sea caracter operando
const caracterOperador = (pila = [], operador = "") => {
  if (pila.length == 0) {
    pila.push(operador);
    return;
  }


  let bandera = true;
  let tope = pila[pila.length - 1];
  while (bandera) {
    //Checa si pila esta vacia 
    if(pila.length != 0){
      tope = pila[pila.length -1];
    }
    //compara si tope de la pila es un parentesis izquierdo
    if (pila.length == 0 || tope == "(" || mayorPrioridad(operador, tope)) {
      pila.push(operador); //Compara operador tiene mayor prioridad que el tope de la pila
      bandera = false;
    } else posfija += pila.pop();
  }
};

const mayorPrioridad = (operador = "", tope = "") => {
  const prioridadOperador = definePrioridad([operador]);
  const prioridadTope = definePrioridad([tope]);
  return prioridadOperador[0].orden > prioridadTope[0].orden;
};

function excepcionCaracter(caracter) {
  this.mensaje = "Caracter no válido: ";
  this.caracter = caracter;
}

const convierteInfAPos = (arregloInfija = [], pila = []) => {
  posfija = "";
  const prioridades = definePrioridad(arregloOperadores);
  let indice = 0;
  let caracter = arregloInfija[indice];

  while (indice < arregloInfija.length) {
    switch (caracter) {
      case "(":
        pila.push(caracter);
        break;
      case ")":
        parentesisDerecho(pila);
        break;
      case esOperador(caracter):
        caracterOperador(pila, caracter);
        break;
      case esOperando(caracter):
        posfija += caracter;
        break;
      default:
        throw new excepcionCaracter(caracter);
        break;
    }
    caracter = arregloInfija[++indice];
  }
  for (let i = pila.length - 1; i > -1; i--) posfija += pila[i];
};

const convierteAInfija = (expresion = "") => {
  const arreglo = expresion.split("");
  let cadena = "";
  for (let i = 0; i < arreglo.length; i++) {
    const caracter = arreglo[i];

    if (caracter != "]") cadena += caracter;

    if (i + 1 < arreglo.length) {
      const indice = i + 1;
      const actual = arreglo[indice];
      const anterior = arreglo[indice - 1];
      if (esOperador(actual) || actual == ")") continue;
      if (
        anterior != "(" &&
        anterior != "|" &&
        anterior != "&" &&
        indice - 1 >= 0
      )
        cadena += "&";
    }
  }
  return cadena;
};

export function convierteAPosfija(expReg = "") {
  const pila = [];
  const resultado = convierteAInfija(expReg);
  convierteInfAPos(resultado, pila);
  return posfija;
}
