# Plano Técnico: Calculadora Web

## Tecnologias
* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Estilização utilizando CSS Grid para o layout do teclado e variáveis nativas para temas e espaçamentos.
* **JavaScript (Vanilla - ES6+):** Lógica de estado da interface, manipulação do DOM e gerenciamento de eventos.
* **Math.js (via CDN):** Biblioteca externa utilizada exclusivamente como motor de cálculo para fazer o *parsing* seguro das expressões matemáticas.

## Estrutura de Arquivos
A arquitetura seguirá um modelo simples, separando responsabilidades:

```text
/calculadora-web
│
├── index.html       # Marcação principal (visor, teclado e importação do Math.js via CDN).
├── css/
│   └── styles.css   # Estilos globais, grid do teclado e responsividade (Mobile First).
└── js/
    └── script.js    # Lógica de interface, controle de estado, validação de inputs e integração com Math.js.
```

## Decisões Técnicas Relevantes

**1. Motor de Cálculo com Math.js**
Para garantir a robustez de um ambiente *production-ready* e mitigar vulnerabilidades associadas ao uso da função nativa `eval()`, o cálculo real da expressão matemática será delegado à biblioteca Math.js. O JavaScript nativo atuará interceptando as entradas, tratando exceções visuais (como porcentagens e regras de sobrescrita de operadores) e formatando a string final antes de enviá-la ao parser da biblioteca.

**2. Gerenciamento de Estado Unidirecional (State-Driven View)**
A aplicação não extrairá dados lendo o HTML. Todo o controle acontecerá via um estado centralizado no JavaScript (ex: uma variável armazenando a expressão atual). Qualquer interação (teclado ou clique) atualizará este estado interno e disparará uma função única de renderização, garantindo que o visor (DOM) seja sempre uma representação fiel da memória da aplicação.

**3. Layout Estruturado com CSS Grid**
A montagem do teclado usará CSS Grid Layout. Como uma calculadora possui um padrão bidimensional rígido — onde botões como o "0" podem precisar ocupar o espaço de duas colunas —, o CSS Grid oferece a abordagem mais semântica e limpa. Isso exige menos código em comparação ao Flexbox e facilita o redimensionamento proporcional para telas de diferentes tamanhos.
