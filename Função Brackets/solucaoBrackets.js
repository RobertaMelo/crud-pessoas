const abertos = ['(', '{' , '['];
const fechados = [')', '}' , ']'];

let isBracketsAberto = caracter => abertos.includes(caracter); 
let isBracketsFechado = caracter => fechados.includes(caracter);
let isBracketsValido = caracter => isBracketsAberto(caracter) || isBracketsFechado(caracter);

function isBracketsPar(caracterAberto, caracterFechado) {
    let posicaoAberta;
    abertos.forEach((valor, indice) => {
    if (valor == caracterAberto) {
        posicaoAberta = indice;
        return;     
    }
    })
    return fechados[posicaoAberta] == caracterFechado;
}

function validaPares(brackets) {
    let bracketsArray = brackets.split('');
    let bracketsAbertos = [];
    bracketsArray.forEach(function(valor, indice) {
        if (!isBracketsValido(valor,indice)) {
            throw "O caracter '" + valor + "' não é valido.";
        } 
        if (isBracketsAberto(valor,indice)) {
            bracketsAbertos.push(valor);
            return;
        }

        let ultimoBracketAberto = bracketsAbertos[bracketsAbertos.length - 1];
        if (isBracketsPar(ultimoBracketAberto, valor)) {
            bracketsAbertos.pop();
            return;
        }

        return valor + " is not valid";
    })
    
    return bracketsAbertos.length == 0 ? (brackets + " is valid") : (brackets + " is not valid");
}

console.log(validaPares("[{)]"))