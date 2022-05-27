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
            "secuencia-sent" : ["$","end", "else"," until"],
            "secuencia-sent'": ["$","end", "else"," until"],
            "sentencia": [";","$" , "end", "else", "until"],
            "sent-if": [";","$" , "end", "else", "until"],
            "sent-if'": [";","$" , "end", "else", "until"],
            "sent-repeat": [";","$" , "end", "else", "until"],
            "sent-assing": [";","$" , "end", "else", "until"],
            "sent-read": [";" ,"$", "end", "else", "until"],
            "sent-write": [";","$" , "end", "else", "until"],
            "exp": ["then", ";","$" , "end", "else", "until", ")"],
            "expl": ["then", ";","$" , "end", "else", "until", ")"],
            "op-comp": ["(", "numero", "identificador"],
            "exp-simple": ["<", "=", "then", ";","$" , "end", "else", "until", ")"],
            "exp-simple'": ["<", "=", "then", ";","$", "end", "else", "until", ")"],
            "opsuma": ["(", "numero", "identificador"],
            "term": ["+", "-", "<", "=", "then", ";","$", "end", "else", "until", ")"],
            "term'": ["+", "-", "<", "=", "then", ";" ,"$", "end", "else", "until", ")"],
            "opmult": ["(", "numero", "identificador"],
            "factor": ["*", "/", "+", "-", "<", "=", "then", ";","$", "end", "else", "until", ")"],
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
            "secuencia-sentl": [ ";" , "ε"],
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

    tablaM() {
        return {
            "programa":[
                {
                    produccion: "secuencia-sent",
                    columnas:["if","repeat","identificador","read","write"]
                },
            ],
            "secuencia-sent":[
                {
                    produccion: "sentencia secuencia-sent'",
                    columnas:["if","repeat","identificador","read","write"]
                },
            ],
            "secuencia-sent'":[
                {
                    produccion: "; sentencia secuencia-sent'",
                    columnas:[";"]
                },
                {
                    produccion: "ϵ",
                    columnas:["$","end","else","until"]
                },
            ],
            "sentencia":[
                {
                    produccion: "sent-if",
                    columnas:["if"]
                },
                {
                    produccion: "sent-repeat",
                    columnas:["repeat"]
                },
                {
                    produccion: "sent-assign",
                    columnas:["identificador"]
                },{
                    produccion: "sent-read",
                    columnas:["read"]
                },{
                    produccion: "sent-write",
                    columnas:["write"]
                },
            ],
            "sent-if":[
                {
                    produccion: "if exp then secuencia-sent sent-if'",
                    columnas:["if"]
                }
            ],
            "sent-if'":[
                {
                    produccion: "end",
                    columnas:["end"]
                },
                {
                    produccion: "else secuencia-sent end",
                    columnas:["else"]
                },
            ],
            "sent-repeat":[
                {
                    produccion: "repeat secuencia-sent until exp",
                    columnas:["repeat"]
                },
            ],
            "sent-assign":[
                {
                    produccion: "identificador := exp",
                    columnas:["identificador"]
                },
            ],
            "sent-read":[
                {
                    produccion: "read identificador",
                    columnas:["read"]
                },
            ],
            "sent-write":[
                {
                    produccion: "write exp",
                    columnas:["write"]
                },
            ],
            "exp":[
                {
                    produccion: "exp-simple exp'",
                    columnas:["(","numero","identificador"]
                },
            ],
            "exp'":[
                {
                    produccion: "op-comp exp-simple",
                    columnas:["<","="]
                },
                {
                    produccion: "ϵ",
                    columnas:["then",";","$","end","else","until",")"]
                },
            ],
            "op-comp":[
                {
                    produccion: "<",
                    columnas:["<"]
                },
                {
                    produccion: "=",
                    columnas:["="]
                },
            ],
            "exp-simple":[
                {
                    produccion: "term exp-simple'",
                    columnas:["(","numero","identificador"]
                },
            ],
            "exp-simple'":[
                {
                    produccion: "opsuma term exp-simple'",
                    columnas:["+","-",]
                },
                {
                    produccion: "ϵ",
                    columnas:["<","=","then",";","$","end","else","until",")"]
                },
            ],
            "opsuma":[
                {
                    produccion: "+",
                    columnas:["+"]
                },
                {
                    produccion: "-",
                    columnas:["-"]
                },
            ],
            "term":[
                {
                    produccion: "factor term'",
                    columnas:["(","numero","identificador"]
                },
            ],
            "term'":[
                {
                    produccion: "opmult factor term'",
                    columnas:["*","/"]
                },
                {
                    produccion: "ϵ",
                    columnas:["+","-","<","=","then",";","$","end","else","until",")"]
                },
            ],
            "opmult":[
                {
                    produccion: "*",
                    columnas:["*"]
                },
                {
                    produccion: "/",
                    columnas:["/"]
                }
            ],
            "factor":[
                {
                    produccion: "(exp)",
                    columnas:["("]
                },
                {
                    produccion: "numero",
                    columnas:["numero"]
                },
                {
                    produccion: "identificador",
                    columnas:["identificador"]
                }
            ],
        }
    }

    gramaticaP(){
        return {
            terminales: ["if", "then","else","end","repeat","until","read","write","numero", "identificador",
                        "+","-","*","/","=","<",">","(",")",";",":=","$",],
            nTerminales:["programa","secuencia-sent","secuencia-sent'","sentencia","sent-if","sent-if'",
                        "sent-repeat","sent-assign","sent-read","sent-write","exp","exp'","op-comp","exp-simple",
                        "exp-simple'","opsuma","term","term'","opmult","factor"]
        }
    }
}