
const COLUNAS = 10; // |
const LINHAS = 20; // -
const TAMANHOBLOCO = 30;


const FORCAMOVIMENTO = 1
const LISTACHAVES = {
    "a":{
        tipoMovimento: "x",
        velocidadeMovimento: -FORCAMOVIMENTO
    }
    ,
    "d":{
        tipoMovimento: "x",
        velocidadeMovimento: FORCAMOVIMENTO
    },
    "ArrowRight":{
        tipoMovimento: "x",
        velocidadeMovimento: FORCAMOVIMENTO
    },
    "ArrowLeft":{
        tipoMovimento: "x",
        velocidadeMovimento: -FORCAMOVIMENTO
    },
    "s": {

    },
    "ArrowDown":{
        tipoMovimento: "y",
        velocidadeMovimento: FORCAMOVIMENTO
    },
    "ArrowUp": {
        tipoMovimento: "r",
        velocidadeMovimento: FORCAMOVIMENTO
    },
    "w": {
        tipoMovimento: "r",
        velocidadeMovimento: FORCAMOVIMENTO
    },
    "q": {
        tipoMovimento: "r",
        velocidadeMovimento: -FORCAMOVIMENTO
    },
    
}


const LISTAPECAS = {
    "I":[
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
    ],
    "L":[
        [0,2,0],
        [0,2,0],
        [0,2,2],
    ],
    "J":[
        [0,3,0],
        [0,3,0],
        [3,3,0],
    ],
    "O":[
        [4,4],
        [4,4],
    ],
    "Z":[
        [5,5,0],
        [0,5,5],
        [0,0,0],
    ],
    "S":[
        [0,6,6],
        [6,6,0],
        [0,0,0],
    ],
    "T":[
        [0,7,0],
        [7,7,7],
        [0,0,0],
    ],


};