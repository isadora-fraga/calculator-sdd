# Especificação Técnica: Calculadora Web

## Contexto
O objetivo deste documento é detalhar a implementação de uma calculadora web. A aplicação permitirá que os usuários realizem operações matemáticas diretamente no navegador, suportando expressões complexas e seguindo as regras universais de precedência (PEMDAS). A interface deve ser limpa, intuitiva e seguir padrões de mercado para usabilidade. O processamento será feito integralmente no front-end, garantindo respostas em tempo real.

## Requisitos Funcionais
* **Operações Suportadas:** A calculadora deve realizar adição (+), subtração (-), multiplicação (*), divisão (/) e cálculo de porcentagem (%).
* **Validação de Entrada (Input):** O sistema deve aceitar exclusivamente números (0 a 9), separador decimal (ponto ou vírgula), símbolo de porcentagem e os símbolos das operações suportadas. A digitação de letras, espaços ou outros caracteres especiais via teclado físico deve ser ativamente interceptada e bloqueada.
* **Expressões Extensas e Ordem de Precedência (PEMDAS):** A calculadora deve permitir a construção de expressões completas (ex: `2+2*4`) no visor. O cálculo só deve ocorrer quando o botão de igual ("=") for acionado, respeitando a prioridade matemática onde multiplicação e divisão são resolvidas antes de adição e subtração.
* **Números Negativos:** A aplicação deve suportar entradas e cálculos com números negativos (ex: iniciar uma conta com `-5` ou lidar com resultados abaixo de zero).
* **Interface e Layout (UX):** A disposição dos botões deve seguir os padrões mentais já consolidados pelos principais sistemas operacionais (ex: iOS, Windows, Android). Os números devem estar em um grid decrescente (7, 8, 9 na linha superior), com o zero na base, operadores principais agrupados à direita e funções de limpeza/modificação no topo.
* **Visor (Display):** A tela deve exibir a expressão matemática enquanto ela é construída e, após o cálculo, exibir o resultado final.
* **Ações de Limpeza:** Deve existir um botão "C" ou "AC" para redefinir totalmente o estado e o visor da calculadora.

## Requisitos Não Funcionais
* **Stack Tecnológico:** Desenvolvimento com HTML5, CSS3 e JavaScript (Vanilla), sem uso de frameworks externos para a lógica.
* **Arquitetura Client-Side:** Toda a avaliação matemática (parsing da expressão) deve rodar de forma segura no navegador. *Nota de segurança técnica: caso se utilize a função `eval()` nativa do JS, as validações de entrada restritas citadas nos Requisitos Funcionais são mandatórias para evitar injeção de código, embora seja preferível o uso de um parser matemático próprio.*
* **Responsividade:** O layout deve se adaptar fluidamente a telas de dispositivos móveis, tablets e desktops (abordagem *Mobile First*).
* **Acessibilidade:** Suporte a navegação por teclado numérico, tecla `Enter` para igual, `Esc`/`Backspace` para apagar. Contraste de cores seguindo diretrizes WCAG.

## Casos de Borda (Edge Cases)
* **Divisão por Zero:** O sistema deve prevenir o retorno nativo do JavaScript (`Infinity`). Ao identificar uma divisão por zero, o visor deve exibir a mensagem amigável: **"Não é possível dividir por zero"**.
* **Comportamento da Porcentagem:** O sistema deve converter corretamente o valor percentual dentro da expressão. Exemplo: Em uma multiplicação como `50 * 20%`, o sistema deve interpretar como `50 * 0.2`. Em somas como `100 + 10%`, o sistema deve calcular o percentual sobre o valor anterior (resultando em `110`).
* **Tratamento de Múltiplos Operadores:** Caso o usuário digite dois operadores matemáticos de forma consecutiva (ex: `5 + * 2`), o sistema deve **sobrescrever o último operador digitado** pelo novo. Neste exemplo, se o usuário digitar `+` e logo em seguida `*`, a expressão passará a ser `5 * 2` no visor.
* **Múltiplos Pontos Decimais:** Impedir a inserção de mais de um separador decimal no mesmo bloco numérico (ex: bloquear `5.5.5`).

## Critérios de Aceite
* **CA1 (Precedência):** O usuário digita `2`, `+`, `2`, `*`, `4`, `=`. O sistema avalia a expressão e o visor exibe `10`.
* **CA2 (Divisão por Zero):** O usuário digita `8`, `/`, `0`, `=`. O visor exibe "Não é possível dividir por zero". Ao clicar em qualquer outro número em seguida, o visor é reiniciado.
* **CA3 (Restrição de Entrada):** O usuário tenta digitar a palavra `TESTE` no teclado físico. Nenhuma letra aparece no visor e a aplicação não sofre erros no console.
* **CA4 (Porcentagem):** O usuário digita `200`, `+`, `15`, `%`, `=`. O visor exibe `230`.
* **CA5 (Números Negativos):** O usuário digita `-`, `10`, `+`, `5`, `=`. O visor exibe `-5`. 
* **CA6 (Layout):** A calculadora é renderizada com os números de 1 a 9 organizados de baixo para cima (123 embaixo, 456 no meio, 789 em cima), com o 0 ocupando uma área maior na base.
* **CA7 (Sobrescrita de Operadores):** O usuário digita `5`, `+`. Ao perceber o erro, clica em `*`, e depois `2`. O visor deve atualizar para `5 * 2` e, ao apertar `=`, exibir o resultado `10`.

## Fora de Escopo
* **Histórico de Operações:** Área para visualizar as contas feitas anteriormente.
* **Funções Científicas:** Operações como raiz quadrada, potência, funções trigonométricas ou logarítmicas.
* **Persistência de Dados:** Salvar o estado da calculadora para que os números permaneçam após o recarregamento da página.
