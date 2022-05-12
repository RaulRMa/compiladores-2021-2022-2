export default class Gramatica{

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

    siguientes(){
        return{
            "programa" : ["$"],
            "secuencia-sent" : ["end", "else"," until"],
            "secuencia-sentl": ["end", "else"," until"],
            "sentencia": [";" , "end", "else", "until"],
            "sent-if": [";" , "end", "else", "until"],
            "sent-ifl": [";" , "end", "else", "until"],
            "sent-repeat": [";" , "end", "else", "until"],
            "sent-assing": [";" , "end", "else", "until"],
            "sent-read": [";" , "end", "else", "until"],
            "sent-write": [";" , "end", "else", "until"],
            "exp": ["then", ";" , "end", "else", "until", ")"],
            "expl": ["then", ";" , "end", "else", "until", ")"],
            "op-comp": ["(", "numero", "identificador"],
            "exp-simple": ["<", ">", "=", "then", ";" , "end", "else", "until", ")"],
            "exp-simplel": ["<", ">", "=", "then", ";" , "end", "else", "until", ")"],
            "opsuma": ["(", "numero", "identificador"],
            "term": ["+", "-", "<", ">", "=", "then", ";" , "end", "else", "until", ")"],
            "terml": ["+", "-", "<", ">", "=", "then", ";" , "end", "else", "until", ")"],
            "opmult": ["(", "numero", "identificador"],
            "factor": ["*", "/", "+", "-", "<", ">", "=", "then", ";" , "end", "else", "until", ")"],
        }
        
    }

    primeros(){
        return{
            "programa": ["if", "repeat", "identificador", "read", "write"],
            "secuencia-sent": ["if", "repeat", "identificador", "read", "write"],
            "sentencia": ["if", "repeat", "identificador", "read", "write"],
            "sent-if": ["if"],
            "sent-repeat": ["repeat"],
            "sent-assing": ["identificador"],
            "sent-read": ["read"],
            "sent-write": ["write"],
            "secuencia-sentl": [ ";" , "ε "],
            "sent-ifl": ["end", "else"],
            "exp": ["(", "numero", "identificador"],
            "factor": ["(", "numero", "identificador"],
            "term": ["(", "numero", "identificador"],
            "exp-simple": ["(", "numero", "identificador"],
            "expl": ["<", ">", "=", "ε"],
            "op-comp": ["<", ">", "="],
            "exp-simplel": ["+", "-", "ε" ],
            "opsuma": ["+", "-"],
            "terml": ["*", "/", "ε"],
            "opmult": ["*", "/"]
        }
    }

}