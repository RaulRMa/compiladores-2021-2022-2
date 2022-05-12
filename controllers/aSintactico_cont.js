import Gramatica from '../Gramatica/gramatica.js'

const gram = new Gramatica();

gram.sTerminales.reservadas.forEach(term => {
    $("#ths-gram").append(`
        <th class="text-center">${term}</th>
    `);
})
gram.sTerminales.simbolos.forEach(simb => {
    $("#ths-gram").append(`
        <th class="text-center">${simb}</th>
    `);
})

