import  "./gramatica.js";
import {convierteAPosfija} from '../funciones/posfija.js';
import {afn,encabezados} from '../funciones/afn.js';
import {AFD} from '../funciones/afd.js'
import {Lexema} from '../funciones/lexema.js'
import Gramatica from "./gramatica.js";

const identificador = "[a-z]+";
const numero = '[0-9]+';
const gramatica = new Gramatica();
const simbolos = gramatica.sTerminales.simbolos;
const reservadas = gramatica.sTerminales.reservadas;


function onbtenTokens(codigo){
  let programa = codigo.replace(/[\r\n]/g,"");
  programa = programa.trim();
  simbolos.forEach(simbolo => {
    const regex = new RegExp(`[${simbolo}]`,'g');
    if(simbolo != "="){
      if(simbolo == ":="){
        programa = programa.replace(simbolo, ` ${simbolo} `);
      }else{
        programa = programa.replace(regex, ` ${simbolo} `);
      }
    }else{
      programa = programa.replace(regex, `${simbolo} `);
    }
  });
  let prog2 = "";
  for(let i = 0; i < programa.length; i++){
    if(programa[i] != ' '){
      if(programa[i] == '=' && prog2.length > 0){
        if(prog2[prog2.length -1] != ':' && prog2 != ' ')
          prog2 += " "
      }
      prog2 += programa[i];
    }else if(programa[i] == ' ' && prog2.length > 0){
      if(prog2[prog2.length - 1] != ' '){
        prog2 += " ";
      }
    }
  }
  let resultado = prog2.trim().split(" ");
  prog2 = "";
  resultado.forEach(cadena => {
    if(cadena.trim() != ""){
      prog2 += cadena.trim() + " ";
    }
  })
  return prog2.trim().split(" ");
}


const obtenAfd = (expreg = '') => {
    const posfija = convierteAPosfija(expreg);
    const tablaAfn = afn(posfija);
    const transiciones = tablaAfn[0].transiciones;
    const encs = encabezados(tablaAfn);
    const tablaAfd = AFD(transiciones,encs);
    return tablaAfd.TABLA;
}

function analisisLexico(identificador, numero, cadena){
  
  const tokens = onbtenTokens(cadena);
  const objeto = {};
  const afdIdent = obtenAfd(identificador);
  const afdNum = obtenAfd(numero);
  tokens.forEach(token => {
    if(reservadas.lastIndexOf(token) != -1 || simbolos.lastIndexOf(token) != -1){
      objeto[token] = token; 
    }else if(Lexema(token, afdIdent)){
      objeto[`identificador-${token}`] = token;
    }else if(Lexema(token, afdNum)){
      objeto[`numero-${token}`] = token;
    }else{
      objeto[`Error léxico-${token}`] = token;
    }
  })
  return objeto;
}

function analisisLexico2(identificador, numero, cadena){
  
  const tokens = onbtenTokens(cadena);
  const objeto = {};
  const afdIdent = obtenAfd(identificador);
  const afdNum = obtenAfd(numero);
  tokens.forEach((token,indx) => {
    if(reservadas.lastIndexOf(token) != -1 || simbolos.lastIndexOf(token) != -1){
      objeto[`${token}-${indx}`] = token; 
    }else if(Lexema(token, afdIdent)){
      objeto[`identificador-${indx}-${token}`] = token;
    }else if(Lexema(token, afdNum)){
      objeto[`numero-${indx}-${token}`] = token;
    }else{
      objeto[`Error léxico-${token}`] = token;
    }
  })
  return objeto;
}

export {
  analisisLexico,onbtenTokens, analisisLexico2
}