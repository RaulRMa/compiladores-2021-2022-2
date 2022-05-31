import {onbtenTokens,analisisLexico2} from '../Gramatica/aLExico.js';
import Arbol from '../Gramatica/arbol.js';
import Gramatica from '../Gramatica/gramatica.js';

const G = new Gramatica();

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

  let contador = 0;
  const arbol = new Arbol(X, contador);
  const raizHtml = $("#raizArbol");
  raizHtml.text(arbol.nombre);
  let nodoRHtml = $("#listaRaiz");
  let arbolAux = arbol;
  const listaAux = [arbol];
  let x2 = arbol;
  //listaAux.push("$");
  while(X != "$"){
    let arbolAux = arbol.obtenHijo(X);
    if(X == a){ 
      pila.shift();
      listaAux.shift();
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
        const sublista = [];
        for(const prod of contenido){
          if(esTerminal(prod)){
            const nuevoNodo = x2.inserta(prod,contador++);
            
            const nodo = `
              <li>
                <span class="tf-nc">${nuevoNodo.nombre}</span>
              </li>
            `;
            $(`#ul-${x2.id}`).append(nodo);
            sublista.push(nuevoNodo);
          }else{
            const nuevoNodo = x2.inserta(prod,contador++);
            const nodo = `
              <li>
                <span class="tf-nc">${nuevoNodo.nombre}</span>
                <ul id="ul-${nuevoNodo.id}">
                </ul>
              </li>
            `;
            $(`#ul-${x2.id}`).append(nodo);
            sublista.push(nuevoNodo);
          }
        }
        pila.shift();
        listaAux.shift();
        listaAux.unshift(...sublista);
        pila.unshift(...contenido);

      }else{
        const nuevoNodo = x2.inserta("ε");
        const nodo = `
              <li>
                <span class="tf-nc">${nuevoNodo.nombre}</span>
              </li>
            `;
        $(`#ul-${x2.id}`).append(nodo);
        pila.shift();
        listaAux.shift();
      }
    }
    X = pila[0];
    x2 = listaAux[0];
  }
  return arbol;
}


const estructuraArbol = (arbol = new Arbol()) => {
  const raiz = $("#raizArbol");
  raiz.text(`${arbol.nombre}`);
  let nodoRaiz = $("#listaRaiz");
  let indx = 0;
  let id = "";
  let bandera = false;
  let cont = 0;
  let nodoAnt = arbol;
  arbol.recorreArbol(nodo => {
    if(nodo.hijos.length != 0){
      const nodoHtml = $(`
        <li>
          <span class="tf-nc">${nodo.nombre}</span>
          <ul id="ul-${nodo.id}-${indx}">
          </ul>
        </li>
      `);
      if(nodoAnt != "" && cont < nodoAnt.hijos.length){
        cont = 0;
        nodoRaiz.append(nodoHtml);
      }else{
        cont++;
        nodoRaiz = $(`#ul-${id}-${indx - 1}`);
        nodoRaiz.append(nodoHtml);
      }
      
      // if(!bandera){
      //   nodoRaiz.append(nodoHtml);
      // }else{
      //   nodoRaiz = $(`#ul-${id}-${indx}`);
      //   nodoRaiz.append(nodoHtml);
      // }
      indx++;
      id = nodo.id;
    }else{
      bandera = true;
      const nodoHoja = $(`
        <li>
          <span class="tf-nc">${nodo.nombre}</span>
          <ul id="ul-${nodo.id}-${indx}">
          </ul>
        </li>
      `);
      $(`#ul-${id}-${indx}`).append(nodoHoja);
    }
    nodoAnt = nodo;
  })
  return null;
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
  const arbol = algoritmo(entrada, analisis);
  //const estructura = estructuraArbol(arbol);
  //return algoritmo(entrada, analisis);
}