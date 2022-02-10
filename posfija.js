const operador = {
  orden: 0,
  simbolo: "",
};
const arregloOperadores = ["^", "*", "/", "+", "-"];
let posfija = '';

const definePrioridad = (arregloOps = []) => {
  const resultado = arregloOps.map((elemento, indice) => {
    if (elemento == "*" || elemento == "/") {
      return inicializaOperador(2, elemento);
    }
    if (elemento == "+" || elemento == "-") {
      return inicializaOperador(3, elemento);
    } else {
      return inicializaOperador(indice + 1, elemento);
    }
  });
  return resultado;
};

const inicializaOperador = (orden, simbolo) => {
  const operadorSimbolo = { ...operador };
  operadorSimbolo["orden"] = orden;
  operadorSimbolo["simbolo"] = simbolo;
  return operadorSimbolo;
};

const inicializaInfija = (expresion = "") => {
  return expresion.split("");
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

const esOperando = (caracter = "") => {
  for (let i = 0; i < 10; i++) {
    if (Number(caracter) == i) return caracter;
  }
  return false;
};

const parentesisDerecho = (pila = []) => {
  for (let i = 0; i < pila.length; i++) {
    const elemento = pila[i];
    if (elemento != "(") {
      posfija += pila.pop();
      continue;
    }
    pila.pop();
    break;
  }
};

const caracterOperador = (pila = [], operador = "") => {
  let bandera = true;
  const tope = pila[pila.length - 1];
  while (bandera) {
    if (pila.length == 0 || tope == "(" || mayorPrioridad(operador, tope)) {
      pila.push(operador);
      bandera = false;
    } else posfija += pila.pop();
  }
};

const mayorPrioridad = (operador = "", tope = "") => {
  const prioridadOperador = definePrioridad([operador]);
  const prioridadTope = definePrioridad([tope]);
  return prioridadOperador[0].orden < prioridadTope[0].orden;
};

function excepcionCaracter(caracter) {
  this.mensaje = "Caracter no válido: ";
  this.caracter = caracter;
}

const convierteInfija = (arregloInfija = [], pila = []) => {
  try {
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
          caracterOperador(pila,caracter);
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
    pila.forEach((elemento) => (posfija += elemento));
  } catch (error) {
    console.log(error.mensaje, error.caracter);
  }
};

function funcionPrincipal() {
  const pila = [];
  const infija = "5*(3+2)*4";
  const arregloInfija = inicializaInfija(infija);
  convierteInfija(arregloInfija, pila);
  console.log(posfija);
}

funcionPrincipal();
