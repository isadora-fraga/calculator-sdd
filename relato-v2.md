# Relato do Processo de Desenvolvimento: Calculadora Web

## 1. Evolução de Requisitos
Durante a elaboração da especificação técnica, percebemos a necessidade de refinar as regras de negócio, adicionando requisitos extras como o tratamento nativo e correto de porcentagens, além da exibição de mensagens de erro mais amigáveis ao usuário (ex: "Não é possível dividir por zero").

## 2. Decisões Arquiteturais e Plano Técnico
Na fase de planejamento, tomamos a decisão crítica de permitir a importação de uma biblioteca externa (`Math.js`) para atuar como motor de cálculo. Inicialmente, a IA sugeriu o desenvolvimento de um *parser* matemático próprio e nativo. Optamos por não seguir essa sugestão, pois criar um *parser* do zero costuma abrir margem para diversos bugs em casos de borda complexos — um risco considerável que não foi alertado por ele no momento da sugestão. A escolha pela lib externa priorizou a estabilidade.

## 3. Estruturação e Gestão das Tarefas
Ao revisar o plano de ação, decidimos desmembrar a tarefa de construção visual. A etapa que contemplava HTML e CSS juntos foi dividida em duas *tasks* separadas (Task 2 para Estrutura HTML e Task 3 para Layout CSS), melhorando a organização do fluxo de trabalho.

## 4. UX e Omissões de Interface
Ao visualizar a estrutura HTML gerada, identificamos uma falha de usabilidade: a interface possuía apenas o botão "C" (limpar tudo), faltando um botão para apagar apenas o último caractere digitado. A função de apagar um caractere ficou restrita ao uso da tecla `Backspace` no teclado físico, o que prejudica diretamente a experiência de usuários *mobile*. 

Optamos por não alterar a interface naquele momento para não gerar um impacto em cascata no layout (CSS Grid) e na lógica já estruturada. É importante pontuar que essa omissão ocorreu mesmo após a instrução explícita para que o design seguisse as boas práticas das calculadoras comuns do mercado e de termos solicitado especificamente que a aplicação deveria ser pensada para o uso na versão mobile.

## 5. Fluxo de Trabalho (Workflow)
O processo de baixar os pacotes ZIP e realizar o upload manual de todos os arquivos para o GitHub provou-se bastante trabalhoso e repetitivo. A utilização de uma ferramenta integrada diretamente ao VSCode agilizaria muito esse fluxo, eliminando o atrito do versionamento manual.

## 6. Oportunidades de Melhoria Identificadas nos Testes
Testando a aplicação funcional, já mapeamos os seguintes pontos de atenção para futuras iterações:
* **Inclusão da tecla 'Del' na Interface:** Adicionar um botão visual para apagar um único dígito, corrigindo o problema de acessibilidade mobile.
* **Comportamento do botão de Limpar:** Avaliar se o botão atual deve limpar toda a expressão ou apenas a última entrada, dependendo do contexto.
* **Overflow de Dígitos no Visor:** A interface não está lidando bem com números que possuem muitos dígitos (o texto acaba quebrando ou vazando o layout). Embora o tratamento de limite de caracteres estivesse previsto na especificação original, a implementação gerada não cobriu esse cenário corretamente.

## 7. Conclusão
Apesar das oportunidades de melhoria mapeadas na interface e no fluxo operacional, a base lógica entregue é sólida. Os demais Critérios de Aceite estipulados na especificação técnica inicial foram cumpridos com sucesso.
