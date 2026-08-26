// script.js - Task 6: Motor de Cálculo e Integração (Math.js)

let expressaoAtual = "";
let calculoRealizado = false; // Controle de estado pós-cálculo
const operadores = ['+', '-', '*', '/', '%'];

document.addEventListener("DOMContentLoaded", () => {
    const displayElement = document.getElementById("display");
    const botoes = document.querySelectorAll(".btn");

    function atualizarVisor() {
        if (expressaoAtual === "") {
            displayElement.innerText = "0";
            displayElement.classList.remove("error-text");
        } else {
            displayElement.innerText = expressaoAtual;
            // Ajusta o tamanho da fonte caso seja uma mensagem de erro longa
            if (expressaoAtual === "Não é possível dividir por zero" || expressaoAtual === "Erro") {
                displayElement.classList.add("error-text");
            } else {
                displayElement.classList.remove("error-text");
            }
        }
    }

    // Pré-processamento de porcentagens conforme a Especificação
    function preProcessarPorcentagem(exp) {
        // Regra para Somas e Subtrações: ex: 100 + 10% -> 100 + (100 * 10 / 100)
        let formatada = exp.replace(/(\d+(?:\.\d+)?)\s*([+-])\s*(\d+(?:\.\d+)?)%/g, (match, p1, p2, p3) => {
            return `${p1} ${p2} (${p1} * ${p3} / 100)`;
        });
        
        // Regra para outros casos (Multiplicação, divisão, ou isolados): 50 * 20% -> 50 * (20 / 100)
        formatada = formatada.replace(/(\d+(?:\.\d+)?)%/g, '($1 / 100)');
        
        return formatada;
    }

    function processarEntrada(valor) {
        // Se a tela estiver mostrando erro e o usuário digitar algo, resetamos o estado
        if (expressaoAtual === "Não é possível dividir por zero" || expressaoAtual === "Erro") {
            expressaoAtual = "";
        }

        // Se acabou de fazer um cálculo e o usuário digitar um NÚMERO, começamos uma conta nova.
        // Se digitar um OPERADOR, continuamos a conta a partir do resultado anterior.
        if (calculoRealizado) {
            if (['0','1','2','3','4','5','6','7','8','9','.'].includes(valor)) {
                expressaoAtual = "";
            }
            calculoRealizado = false;
        }

        if (valor === 'C' || valor === 'c' || valor === 'Escape') {
            expressaoAtual = ""; 
        } else if (valor === '=' || valor === 'Enter') {
            if (expressaoAtual !== "") {
                try {
                    // Prevenir finalização com operador pendente
                    let expressaoLimpa = expressaoAtual;
                    if (operadores.includes(expressaoAtual.slice(-1)) && expressaoAtual.slice(-1) !== '%') {
                        expressaoLimpa = expressaoAtual.slice(0, -1);
                    }

                    // Pré-processa porcentagens
                    let expressaoPronta = preProcessarPorcentagem(expressaoLimpa);

                    // Validação de Divisão por Zero explícita
                    if (/\/0(?!\.)/.test(expressaoPronta)) {
                        throw new Error("Divisão por zero");
                    }

                    // Motor Math.js avaliando a string
                    let resultado = math.evaluate(expressaoPronta);

                    // Verifica se o resultado tendeu ao infinito
                    if (!isFinite(resultado)) {
                        throw new Error("Divisão por zero");
                    }

                    // Usa formatação do Math.js para evitar problemas de ponto flutuante do JS
                    resultado = math.format(resultado, { precision: 14 });
                    
                    expressaoAtual = String(resultado);
                    calculoRealizado = true;
                } catch (error) {
                    if (error.message === "Divisão por zero") {
                        expressaoAtual = "Não é possível dividir por zero";
                    } else {
                        expressaoAtual = "Erro";
                    }
                    calculoRealizado = true;
                }
            }
        } else if (valor === '.') {
            const segmentos = expressaoAtual.split(/[+\-*/%]/);
            const ultimoSegmento = segmentos[segmentos.length - 1];
            
            if (!ultimoSegmento.includes('.')) {
                if (expressaoAtual === "" || operadores.includes(expressaoAtual.slice(-1))) {
                    expressaoAtual += "0.";
                } else {
                    expressaoAtual += ".";
                }
            }
        } else if (operadores.includes(valor)) {
            const ultimoChar = expressaoAtual.slice(-1);
            
            if (expressaoAtual === "") {
                if (valor === '-') expressaoAtual = "-";
            } else if (operadores.includes(ultimoChar) && ultimoChar !== '%') {
                if (valor !== '%') {
                    expressaoAtual = expressaoAtual.slice(0, -1) + valor;
                }
            } else {
                expressaoAtual += valor;
            }
        } else {
            expressaoAtual += valor;
        }
        
        atualizarVisor();
    }

    // Event Listeners
    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            const valorBotao = e.target.innerText;
            processarEntrada(valorBotao);
        });
    });

    document.addEventListener("keydown", (e) => {
        const teclasPermitidas = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
            '.', ',', '+', '-', '*', '/', '%', 
            'Enter', '=', 'Escape', 'c', 'C'
        ];
        
        if (teclasPermitidas.includes(e.key)) {
            e.preventDefault(); 
            let valorTecla = e.key === ',' ? '.' : e.key;
            processarEntrada(valorTecla);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            if (expressaoAtual === "Não é possível dividir por zero" || expressaoAtual === "Erro") {
                expressaoAtual = "";
            } else {
                expressaoAtual = expressaoAtual.slice(0, -1);
            }
            atualizarVisor();
        }
    });
    
    atualizarVisor();
});
