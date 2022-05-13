import Gramatica from "../Gramatica/gramatica.js";

const gram = new Gramatica();
const terminales = gram.gramaticaP().terminales;

$("#inptabla").click(() => {
  terminales.forEach((simb) => {
    $("#ths-gram").append(`
        <th class="text-center">${"\t\t" + simb + "\t\t"}</th>
    `);
  });
  const noTerm = gram.gramaticaP().nTerminales;
  const body = $("#tbody-sint-tiny");
  const tabla = gram.tablaM();
  noTerm.forEach((nt) => {
    const fila = $(`<tr></tr>`);
    $(fila).append(`<td>${nt}</td>`);
    const filaNt = tabla[nt];
    terminales.forEach(term => {
      let bandera = false;

      for(let i = 0; i < filaNt.length; i++){
        const prod = filaNt[i];
        for (let j = 0; j < prod.columnas.length; j++) {
          const col = prod.columnas[j];
          if(term == ":="){
            console.log(`produccion: ${nt}`,"comparando: ", term , " con: ", col);
          }
          if(term == col){
            fila.append(`<td>${nt} -> ${prod.produccion} </td>`);
            bandera = true;
            break;
          }
        }
      }
      if(!bandera) fila.append(`<td>  </td>`);
    })
    body.append(fila);
  });
  $("#tabla-anSint").removeClass("d-none");
});
