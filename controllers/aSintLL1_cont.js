import { mainLL1 } from '../funciones/aSintLL1.js';
import {analisisLexico2} from '../Gramatica/aLExico.js';

const objetoArbol = [
  {
    text:"Parent 1",// Required
    checked:true,// Optional
    id:15,
    otherDatas:"Other Datas",// Optional
    children:[// Required
      { text:"Child 1" /* Required */, checked:true },
      { text:"Child 2" /* Required */ }
    ]},{
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
  }
]

const iniciaComps = () =>{
  $("#btn-als").click(() => {
    anLS();  
  });
  const arbol = new TreeView(objetoArbol);
  $("#arbolALS").append( arbol.root );
}

const anLS = () => {
  const identificador = $("#inpIdentificadorALS").val();
  const numero = $("#inpNumeroALS").val();
  const cadena = $("#areaTextoALS").val();
  const resultado = analisisLexico2(identificador,numero,cadena);
  
  const errores = contieneErrores(resultado);
  if(errores){
    mensajeError(errores,cadena);
  }else{
    mainLL1(cadena, resultado);
  }
}

const contieneErrores = (result) =>{
  const claves = Object.keys(result);
  let bandera = false;
  let errores = [];
  for (let index = 0; index < claves.length; index++) {
    const clave = claves[index];
    if(clave.includes("Error")){ 
      bandera = true;
      errores.push(result[clave]);
    }
  }

  return bandera ? errores : false;
}

const mensajeError = (errores = [],programa = "") =>{
  const lineas = programa.split("\n");
  const errLinea = [];
  errores.forEach(error => {
    lineas.forEach((linea,indxLinea) => {
      if(linea.includes(error)){
        errLinea.push({
          error,
          numLinea: indxLinea + 1          
        })
      }
    })
  });
  let mensaje = "";

  errLinea.forEach(error => {
    const linea = `Línea ${error.numLinea}. ${error.error} no se reconoce.\t`;
    mensaje += linea;
  });
  $("#alertALS").html(mensaje);
  $("#divAlertALS").removeClass("d-none");
}


function LL1Main(){
  iniciaComps();
}

LL1Main();