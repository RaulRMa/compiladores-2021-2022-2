class Gramatica{

    constructor(){
        this.sTerminales = this.terminales();
        this.sNoTerminales = this.noTerminales();
        this.gramatica = this.defineReglas();
    }

    terminales(){
        return{
            reservadas:["if", "then","else","end","repeat","until","read","write"],
            simbolos: ["+","-","*","/","=","<",">","(",")",";",":="]
        }
    }
    noTerminales(){
        return [
            "programa", "secuencia-sent","sentencia","sent-if","sent-repeat",
            "sent-assign","sent-read","sent-write","exp","op-comp","exp-simple",
            "opsuma","term","opmult","factor"
        ];
    }

    defineReglas(){
        return [
            {
                nombre: "programa",
                produce: ["secuencia-sent"]
            },
            {
                nombre: "secuencia-sent",
                produce: ["secuencia-sent",";","sentencia","|","sentencia"]
            },
            {
                nombre: "sentencia",
                produce: ["sent-if","|","sent-repeat","|","sent-assign","|","sent-read", "|","sent-write"]
            },
            {
                nombre: "sent-if",
                produce: ["if","exp","then","secuencia-sent","end","|","if","exp", "then","secuencia-sent","else", "secuencia-sent","end"]

            },
            {
                nombre: "sent-repeat",
                produce: ["repeat", "secuencia-sent", "until", "exp"]
            },
            {
                nombre:"sent-assign",
                produce: ["indentificador", ":=", "exp"]
            },
            {
                nombre: "sent-read",
                produce: ["read", "identificador"]
            },
            {
                nombre: "sent-write",
                produce: ["write", "exp"]
            },
            {
                nombre: "exp",
                produce: ["exp-simple", "op-comp", "exp-simple", "|", "exp-simple"]
            },
            {
                nombre: "op-comp",
                produce: ["<", "|", ">", "|","="]
            },
            {
                nombre: "opsuma",
                produce: ["+", "|", "-"]
            },
            {
                nombre: "term",
                produce: ["term", "opmult", "factor", "|", "factor"]
            },
            {
                nombre: "opmult",
                produce: ["*", "|", "/"]
            },
            {
                nombre: "factor",
                produce: ["(", "exp", ")", "|", "numero", "|", "identificador"]
            },
        ];
    }

}

module.export = Gramatica;