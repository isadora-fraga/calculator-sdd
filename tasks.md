# Checklist de Tarefas: Calculadora Web (tasks.md)

## 1. Configuração e Estrutura Inicial (Setup)
- [ ] Criar a estrutura de diretórios (`css/` e `js/`).
- [ ] Criar os arquivos em branco: `index.html`, `css/styles.css` e `js/script.js`.
- [ ] Configurar o boilerplate do HTML5 no `index.html` (lang, meta tags de viewport).
- [ ] Importar o arquivo `css/styles.css` no `<head>` do HTML.
- [ ] Importar o arquivo `js/script.js` no final do `<body>` do HTML.
- [ ] Adicionar a tag `<script>` com o CDN do Math.js antes do `script.js`.

## 2. Estrutura da Interface (HTML)
- [ ] Criar o contêiner principal da calculadora no HTML.
- [ ] Criar a área do visor (display) no HTML (ex: uma tag `<div>` ou `<input readonly>`).
- [ ] Criar os botões numéricos (0 a 9) e o separador decimal (.).
- [ ] Criar os botões de operações (+, -, *, /, %).
- [ ] Criar os botões de ação (C/AC e =).

## 3. Estilização e Layout (CSS)
- [ ] Aplicar **CSS Grid** no contêiner de botões para organizar o layout.
- [ ] Posicionar os números em ordem decrescente de linhas (789 no topo, 456 no meio, 123 abaixo).
- [ ] Posicionar o botão `0` na base, ajustando seu tamanho no Grid (ex: ocupando duas colunas).
- [ ] Estilizar a interface com cores contrastantes (garantindo conformidade WCAG).
- [ ] Adicionar feedback visual nos botões via CSS (estados `:hover` e `:active`).
- [ ] Testar a responsividade para garantir que a calculadora se adapta a telas móveis sem quebra de layout ou rolagem horizontal.

## 4. Estado e Eventos (JavaScript Core)
- [ ] Criar a variável de estado central no JS (ex: `let expressaoAtual = ""`).
- [ ] Criar a função `atualizarVisor()` que reflete o valor de `expressaoAtual` no DOM.
- [ ] Adicionar *Event Listeners* de clique para todos os botões da calculadora.
- [ ] Mapear o valor de cada botão clicado para ser adicionado à `expressaoAtual`.
- [ ] Adicionar *Event Listener* global para capturar digitação via teclado físico.
- [ ] Mapear as teclas numéricas e operadores do teclado físico para atualizar o estado.

## 5. Validações e Regras de Negócio
- [ ] Implementar bloqueio no teclado físico: rejeitar letras, espaços e caracteres não matemáticos.
- [ ] Implementar a regra de "Múltiplos Pontos Decimais": impedir que um mesmo bloco numérico receba mais de um ponto (ex: bloquear `5.5.5`).
- [ ] Implementar a regra de "Sobrescrita de Operadores": se o usuário digitar dois operadores seguidos (ex: `+` e depois `*`), substituir o primeiro pelo segundo na string de estado.
- [ ] Implementar a ação do botão `C` (Clear): redefinir a variável `expressaoAtual` para vazio/zero e chamar `atualizarVisor()`.
- [ ] Permitir que a expressão inicie com um sinal de menos (`-`) para suportar números negativos.

## 6. Motor de Cálculo e Integração (Math.js)
- [ ] Criar a função de cálculo atrelada ao botão `=` e à tecla `Enter`.
- [ ] Criar uma função de pré-processamento que ajusta a sintaxe de porcentagem (ex: transformar algo que o Math.js não entenda nativamente na intenção de UX correta).
- [ ] Enviar a string pré-processada para `math.evaluate(expressao)`.
- [ ] Tratar o caso de divisão por zero: se a string contiver divisão por zero ou o resultado tender a `Infinity`, forçar a exibição de "Não é possível dividir por zero".
- [ ] Atualizar o estado `expressaoAtual` com o resultado do cálculo.
- [ ] Chamar `atualizarVisor()` para exibir o resultado final na tela.
- [ ] Garantir que, se um novo número for digitado logo após o resultado de `=` ser exibido, o estado seja reiniciado para uma nova conta.
