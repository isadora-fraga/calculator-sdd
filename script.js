// script.js - Arquivo inicial. A lógica e o estado serão implementados nas próximas etapas.

document.addEventListener("DOMContentLoaded", () => {
    // Verificando se o Math.js foi carregado com sucesso via CDN
    console.log("Calculadora iniciada.");
    if (typeof math !== 'undefined') {
        console.log("Math.js carregado com sucesso!");
    } else {
        console.error("Erro ao carregar o Math.js");
    }
});
