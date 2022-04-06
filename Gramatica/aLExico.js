import "./gramatica";
const identificador = "[a-z]+";
const numero = "[0-9]";
const programa = 
`
    read x;
    repeat
        x:=x+1;
        write1 x
    until x < 10
`;


function analisis(){
    const gram = new Gramatica();
    let listaProg = []
    listaProg = programa.split(/\s+/).join(" ").trim();
    console.log(listaProg);
    gram.sTerminales.simbolos.forEach(simbolo =>{
        console.log(simbolo);
    })
}