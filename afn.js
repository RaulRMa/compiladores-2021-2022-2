let arrPosfija = [];
let automata = [];
const Estado = (nombre = 0, tipo = "") => {
  return {
    nombre,
    tipo,
    visitado: false,
  };
};
const Transicion = (
  estadoInicio = Estado(),
  estadoDestino = Estado(),
  nombre = ""
) => {
  return {
    nombre,
    estadoInicio,
    estadoDestino,
  };
};

const creaTransicion = (nombre = "", indice = 0) => {
  const inicio = Estado(indice++, "inicio");
  const final = Estado(indice, "final");
  return Transicion(inicio, final, nombre);
};

const Automata = (nombre = "", transiciones = []) => {
  return {
    nombre,
    transiciones,
  };
};

const obtenEdos = (automata = Automata()) => {
  const indiceFin = automata.transiciones.length - 1;
  const transIni = automata.transiciones[0];
  const transFin = automata.transiciones[indiceFin];
  const nombresIni = {
    nombre: transIni["nombre"],
    nombreInicio: transIni["estadoInicio"]["nombre"],
    nombreFin: transIni["estadoDestino"]["nombre"],
    estIni: transIni["estadoInicio"],
    estFin: transIni["estadoDestino"],
  };
  const nombresFin = {
    nombre: transFin["nombre"],
    nombreInicio: transFin["estadoInicio"]["nombre"],
    nombreFin: transFin["estadoDestino"]["nombre"],
    estIni: transFin["estadoInicio"],
    estFin: transFin["estadoDestino"],
  };
  return { nombresIni, nombresFin };
};

const alternativas = (automata = Automata(), automat2 = Automata(), nombre) => {
  const edosAut1 = obtenEdos(automata);
  const edosAut2 = obtenEdos(automat2);
  const inicio = Estado(edosAut1.nombresIni.nombreInicio - 1, "inicio");
  const acept = Estado(edosAut2.nombresFin.nombreFin + 1, "aceptación");

  const transiciones = [];
  const epsilon1 = Transicion(inicio, edosAut1.nombresIni.estIni, "e");
  const epsilon2 = Transicion(inicio, edosAut2.nombresIni.estIni, "e");
  transiciones.push(epsilon1);
  transiciones.push(epsilon2);
  automata.transiciones.forEach((elemento) => transiciones.push(elemento));
  automat2.transiciones.forEach((elemento) => transiciones.push(elemento));
  const epsilon3 = Transicion(edosAut1.nombresFin.estFin, acept, "e");
  const epsilon4 = Transicion(edosAut2.nombresFin.estFin, acept, "e");
  transiciones.push(epsilon3);
  transiciones.push(epsilon4);
  return Automata(nombre, transiciones);
};

const concatenacion = (
  automata = Automata(),
  automat2 = Automata(),
  nombre
) => {
  const transiciones1 = [];
  const transiciones2 = [];
  const transiciones = [];
  let edo1 = "";
  let edo2 = "";
  let edo3 = "";
  let transAux = "";
  let transAux2 = "";
  automata.transiciones.forEach((transicion, indx) => {
    if (indx == automata.transiciones.length - 1) {
      edo1 = transicion.estadoDestino;
    }
    transiciones1.push(transicion);
  });
  automat2.transiciones.forEach((transicion, indx) => {
    if (indx == 0) {
      edo2 = transicion.estadoDestino;
      edo2.nombre--;
      transAux = transicion;
      edo2.visitado = true;
    }else if(indx == 1){
      edo3 = transicion.estadoDestino;
      edo3.nombre--;
      transAux2 = transicion;
      edo3.visitado = true;
    }
     else {
      if(!transicion.estadoInicio.visitado){
        transicion.estadoInicio.nombre--;
      }
      transiciones.push(transicion);
      if(indx == automat2.transiciones.length -1){
        transicion.estadoDestino--;
      }
    }
  });
  const concatenacion = Transicion(edo1, edo2, transAux.nombre);
  const concatenacion2 = Transicion(edo1,edo3);
  transiciones1.forEach((elemento) => transiciones.push(elemento));
  transiciones.push(concatenacion);
  transiciones.push(concatenacion2);
  transiciones2.forEach((elemento) => transiciones.push(elemento));
  return Automata(nombre, transiciones);
};

const cerraduraPositiva = (automata = Automata(), nombre = '') =>{
  const transiciones = [];
  reEnumera(automata.transiciones);
  const final = automata.transiciones.length -1;
  const transAut1 = automata.transiciones[0];
  const transAut2 = automata.transiciones[final];
  const edoInicio = Estado(transAut1.estadoInicio.nombre -1,'inicio');
  const edoAcept = Estado(transAut2.estadoDestino.nombre +1,'aceptacion');
  const trans1 = Transicion(edoInicio,transAut1.estadoInicio,'e');
  const trans2 = Transicion(transAut2.estadoDestino,edoAcept,'e');
  const trans3 = Transicion(transAut2.estadoDestino,transAut1.estadoInicio,'e');
  transiciones.push(trans1);
  automata.transiciones.forEach(elemento => transiciones.push(elemento));
  transiciones.push(trans3);
  transiciones.push(trans2);
  return Automata(nombre, transiciones);
}

const kleen = (automata, nombre) => {
  const transiciones = [];
  const resultado = cerraduraPositiva(automata, nombre);
  const inicio = resultado.transiciones.shift();
  const indxFin = resultado.transiciones.length -1;
  const final = resultado.transiciones[indxFin];
  const transicion = Transicion(inicio.estadoInicio,final.estadoDestino,'e');
  transiciones.push(inicio);
  transiciones.push(transicion);
  resultado.transiciones.forEach(elemento => transiciones.push(elemento));
  return Automata(nombre,transiciones);
}

const ceroOUnaInstancia = (automata, nombre) => {
  reEnumera(automata.transiciones);
  const transiciones = [];
  const inicio = automata.transiciones[0];
  const final = automata.transiciones[automata.transiciones.length -1];
  const edoIni = Estado(inicio.estadoInicio.nombre-1, 'inicio');
  const edoFin = Estado(final.estadoDestino.nombre+1,'aceptacion');
  const trans1 = Transicion(edoIni,inicio.estadoInicio,'e');
  const trans2 = Transicion(edoIni, edoFin,'e');
  const trans3 = Transicion(final.estadoDestino,edoFin,'e');
  transiciones.push(trans1);
  transiciones.push(trans2);
  automata.transiciones.forEach(elemento => transiciones.push(elemento));
  transiciones.push(trans3);
  return Automata(nombre,transiciones);
}

const esOperando = (caracter = "") => {
  const expresionRegular = "^[a-zA-Z0-9]$";
  if (caracter.match(expresionRegular) != null) return caracter;
  return "\0";
};

const esOperador = (caracter = "") => {
  const expresionRegular = "^[*+?&]$";
  if (caracter.match(expresionRegular) != null || caracter == "|")
    return caracter;
  return "\0";
};

const esUnario = (caracter = "") => {
  const expresion = "^[+*?]$";
  if (caracter.match(expresion) != null) return true;
  return false;
};

const reEnumera = (pila = []) => {
  if (pila.length > 1) {
    pila.forEach((elemento, indx) => {
      if (!elemento.estadoInicio.visitado) {
        elemento.estadoInicio.visitado = true;
        elemento.estadoInicio.nombre++;
      }
      if (indx == pila.length - 1) {
        elemento.estadoDestino.nombre++;
      }
    });
  } else {
    pila.forEach((elemento) => {
      elemento.estadoInicio.nombre++;
      elemento.estadoDestino.nombre++;
    });
  }
};

const creaAfn = (posfija) => {
  const unaPosfija = posfija;
  const pila = [];
  let indice = 0;
  let contador = 1;
  unaPosfija.forEach((elemento, i) => {
    switch (elemento) {
      case esOperando(elemento):
        if (pila.length != 0) {
          const transFin = obtenEdos(pila[pila.length - 1]);
          indice = transFin.nombresFin.estFin.nombre + 1;
        }
        const transicion = creaTransicion(elemento, indice);
        const result = Automata(`r${contador++}`, [transicion]);
        pila.push(result);
        break;
      case esOperador(elemento):
        if (!esUnario(elemento)) {
          const op2 = pila.pop();
          const op1 = pila.pop();
          let resultado;
          switch (elemento) {
            case "|":
              reEnumera(op2.transiciones);
              reEnumera(op1.transiciones);
              resultado = alternativas(op1, op2, `r${contador++}`);
              pila.push(resultado);
              break;
            case "&":
              resultado = concatenacion(op1, op2, `r${contador++}`);
              pila.push(resultado);
              break;
          }
        }else{
          const op = pila.pop();
          let resultado = '';
          switch(elemento){
            case "+":
              resultado = cerraduraPositiva(op,`r${contador++}`);
              console.log(resultado);
            break;
            case "*":
              resultado = kleen(op,`r${contador++}`);
              console.log(resultado);
            break;
            case "?":
              resultado = ceroOUnaInstancia(op,`r${contador++}`);
              console.log(resultado);
            break;
          }
        }
        break;
    }
  });
  console.log("alternativas", pila);
  //console.log(pila);
};

export function afn(posfija = "") {
  arrPosfija = posfija.split("");
  creaAfn(arrPosfija);
}
