let arrPosfija = [];
let automata = [];
const Estado = (nombre = 0, tipo = "") => {
  return {
    nombre,
    tipo,
    visitado:false,
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
  const indiceFin = automata.transiciones.length -1;
  const transIni = automata.transiciones[0];
  const transFin = automata.transiciones[indiceFin];
  const nombresIni = {
    nombre: transIni["nombre"],
    nombreInicio:transIni["estadoInicio"]["nombre"],
    nombreFin:transIni["estadoDestino"]["nombre"],
    estIni: transIni["estadoInicio"],
    estFin: transIni["estadoDestino"],
  }
  const nombresFin = {
    nombre: transFin["nombre"],
    nombreInicio:transFin["estadoInicio"]["nombre"],
    nombreFin:transFin["estadoDestino"]["nombre"],
    estIni: transFin["estadoInicio"],
    estFin: transFin["estadoDestino"]
  }
  return {nombresIni,nombresFin}
}


const alternativas = (automata = Automata(),automat2 = Automata(), nombre) => {
  const edosAut1 = obtenEdos(automata);
  const edosAut2 = obtenEdos(automat2);
  const inicio = Estado(edosAut1.nombresIni.nombreInicio -1, "inicio");
  const acept = Estado(edosAut2.nombresFin.nombreFin +1, "aceptación");

  const transiciones = [];
  const epsilon1 = Transicion(inicio, edosAut1.nombresIni.estIni, "e");
  const epsilon2 = Transicion(inicio, edosAut2.nombresIni.estIni, "e");
  transiciones.push(epsilon1);
  transiciones.push(epsilon2);
  automata.transiciones.forEach(elemento => transiciones.push(elemento));
  automat2.transiciones.forEach(elemento => transiciones.push(elemento));
  const epsilon3 = Transicion(edosAut1.nombresFin.estFin, acept, "e");
  const epsilon4 = Transicion(edosAut2.nombresFin.estFin, acept, "e");
  transiciones.push(epsilon3);
  transiciones.push(epsilon4);
  return Automata(nombre, transiciones);
};

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
  if(pila.length > 1){
    pila.forEach((elemento,indx) => {
      if(!elemento.estadoInicio.visitado){
        elemento.estadoInicio.visitado = true;
        elemento.estadoInicio.nombre++;
      }
      if(indx == pila.length -1){
        elemento.estadoDestino.nombre++;
      }
    });
  }else{
    pila.forEach(elemento => {
      elemento.estadoInicio.nombre++;
      elemento.estadoDestino.nombre++;
    })
  }

}

const creaAfn = () => {
  const unaPosfija = ["a", "b", "|", "c", "d", "|", "|"];
  const pila = [];
  let indice = 0;
  let contador = 1;
  unaPosfija.forEach((elemento, i) => {
    switch (elemento) {
      case esOperando(elemento):
        if(pila.length != 0) {
          const transFin = obtenEdos(pila[pila.length -1]);
          indice = transFin.nombresFin.estFin.nombre +1;
        }
        const transicion = creaTransicion(elemento, indice);
        const result = Automata(`r${contador++}`, [transicion]);
        pila.push(result);
        break;
      case esOperador(elemento):
        if (!esUnario(elemento)) {
          switch (elemento) {
            case "|":
              const op2 = pila.pop();
              const op1 = pila.pop();
              reEnumera(op2.transiciones);
              reEnumera(op1.transiciones);
              const resultado = alternativas(op1, op2, `r${contador++}`);
              pila.push(resultado);
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
  creaAfn();
}
