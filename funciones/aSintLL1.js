import {onbtenTokens,analisisLexico2} from '../Gramatica/aLExico.js';
import Gramatica from '../Gramatica/gramatica.js';

const G = new Gramatica();

const raizArbol = {
  text:"Parent 2",
  children:[
    {
      text:"Parent 3",
      children:[
        {text:"Child 3",checked:true},
        {text:"Child 4"}
      ]
    }
  ]
};

const objArbol =[{
  text:"Parent 1",// Required
  checked:true,// Optional
  id:15,
  otherDatas:"Other Datas",// Optional
  children:[// Required
    { text:"Child 1" /* Required */, checked:true },
    { text:"Child 2" /* Required */ }
  ]},
]

const algoritmo = (tokens, analisis) => {
  const tabla = G.tablaM();
  const noTerminales = Object.keys(tabla);
  const tokens2 = Object.keys(analisis);
  const primero = noTerminales[0];
  const pila = [primero,"$"];
  let w = tokens2.map(token => {
    if(token.includes("-")){
      let letra = token.split("-");
      letra = letra[0];
      return letra;
    }
    return token;
  })
  w.push("$");
  
  let X = pila[0];
  let cont = 0;
  let a = w[cont];
  
  //contenidoTabla(X,a,tabla)
  while(X != "$"){
    if(X == a){ 
      pila.shift();
      cont++;
      a = w[cont];
    }
    else if(esTerminal(X)){
      console.log("Hay un error");
      break;
    }
    else{
      const contenido = contenidoTabla(X,a,tabla);
      if(!contenido){
         console.log("Hay un error");
      }
      else if(contenido[0] != "ϵ"){
        pila.shift();
        pila.unshift(...contenido);
      }else{
        console.log("No pasa nada");
        pila.shift();
      }
    }
    X = pila[0];
  }
}

const contenidoTabla = (simbolo = "", produccion = "", tabla = {}) => {
  const contenido = tabla[simbolo];
  for (let i = 0; i < contenido.length; i++) {
    const cont = contenido[i];
    if(cont.columnas.includes(produccion)){
      const produccion = cont.produccion;
      return produccion.split(" ");
    }
  }
  return false;
}

const esTerminal = (simbolo) => {
  const terminales = G.sTerminales;
  for (let i = 0; i < terminales.simbolos.length; i++) {
    const simboloT = terminales.simbolos[i];
    if(simbolo == simboloT) return true;
  }
  for (let i = 0; i < terminales.reservadas.length; i++) {
    const reservada = terminales.reservadas[i];
    if(simbolo == reservada) return true;
  }
  return false;
}


export function mainLL1(programa, analisis){
  const entrada = onbtenTokens(programa);
  algoritmo(entrada, analisis);
}