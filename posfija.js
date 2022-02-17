//DEfines un objeto de operador 
const operador = {
  orden: 0,
  simbolo: "",
  unario: false, //Valor boleano 
};
const arregloOperadores = ["|", "&", "+", "*", "?"];
let posfija = "";


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
  for(let k = 0; k < 10; k++){
    if(k == Number(letra)) return letra;
  }
  //codigo ascii del punto
  if(asciiLetra == 46) return letra;
  return "\0";
};

//Orden de precedencia 
const definePrioridad = (arregloOps = []) => {
  const resultado = arregloOps.map((elemento, indice) => {
    //Operadores Unarios 3
    if (elemento == "*" || elemento == "+"  || elemento == "?") {
      return inicializaOperador(3, elemento, true);
    }
    //Concatenacion 2
    if (elemento == "&") {
      return inicializaOperador(2, elemento, false);
    } else {

      //Seleccion de alternativas 1
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

//checa si esta dentro del arreglo de operadores 
const esOperador = (caracter = "") => {
  for (let i = 0; i < arregloOperadores.length; i++) {
    const operador = arregloOperadores[i];
    if (caracter == operador) { //en caso de que este, regresa el caracter  comparado
      return caracter;
    }
  }
  return false;
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

//Define las prioridades y el orden 
const mayorPrioridad = (operador = "", tope = "") => {
  const prioridadOperador = definePrioridad([operador]);
  const prioridadTope = definePrioridad([tope]);
  return prioridadOperador[0].orden > prioridadTope[0].orden;
};

//Manda mensaje de error
function excepcionCaracter(caracter) {
  this.mensaje = "Caracter no válido: ";
  this.caracter = caracter;
}
//Algoritmo Principal
const convierteInfAPos = (arregloInfija = [], pila = []) => {
  posfija = "";
  let indice = 0; //posicion primera del arreglo
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
      case esOperadorLetra(caracter):
        posfija += caracter;
        break;
      default:
        throw new excepcionCaracter(caracter);
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

    //Detecta corchetes izquierdos
    if(caracter == "["){
      const siguiente = arreglo[i+1];
      cadena += "(" + siguiente;
      let acumulador = 0;
      if(arreglo[i + 2] == '-'){
        const inicio = siguiente.charCodeAt();
        const final = arreglo[i+3].charCodeAt();
        for(acumulador = inicio + 1; acumulador <= final; acumulador++) 
          cadena += "|" + String.fromCharCode(acumulador);
        i += 3;
      }else{
        for(acumulador = i +2; arreglo[acumulador] != ']'; acumulador++)
          cadena += "|" + arreglo[acumulador];
        i = acumulador -1;
      }
      cadena += ")"
    }else{
      if (caracter !== "]") cadena += caracter;
  
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

  }
  return cadena;
};

export function convierteAPosfija(expReg = "") {
  const expresionRegular = expReg.trim();
  const pila = [];
  const resultado = convierteAInfija(expresionRegular);
  convierteInfAPos(resultado, pila);
  return posfija;
}