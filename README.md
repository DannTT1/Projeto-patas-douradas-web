# 🐾 Patas Douradas - Pet Shop E-Commerce

> Uma aplicação web de e-commerce front-end que simula uma experiência full-stack utilizando o `localStorage` do navegador como banco de dados.
https://danntt1.github.io/Projeto-patas-douradas-web/index.html
## ✨ Funcionalidades Principais

-   **Autenticação de Usuários:** Sistema completo de cadastro e login com dois perfis distintos: **Cliente** e **Vendedor**.
-   **Vitrine de Produtos:** Exibição de produtos em destaque na home e uma página com o catálogo completo.
-   **Detalhes do Produto:** Página dedicada para cada item, com descrição, preço e estoque.
-   **Carrinho de Compras:** Lógica avançada de carrinho com gerenciamento de **quantidade**, cálculo de subtotal e total.
-   **Finalização de Pedidos:** Clientes logados podem finalizar suas compras, atualizando o estoque dos produtos e gerando um histórico de pedidos.
-   **Painel do Vendedor:** Área administrativa segura onde vendedores podem:
    -   Visualizar um dashboard com métricas de vendas.
    -   Adicionar, editar e remover produtos do catálogo.
    -   Consultar o histórico de todos os pedidos recebidos.
-   **Segurança:** Páginas de cliente e vendedor são protegidas, garantindo que apenas usuários autenticados e com o perfil correto possam acessá-las.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica e acessível.
-   **CSS3:** Estilização moderna com Flexbox, Grid e Variáveis CSS para um design responsivo e de fácil manutenção.
-   **JavaScript (ES6+):** Toda a lógica da aplicação, incluindo manipulação do DOM, gerenciamento de estado e interatividade.

## 🏛️ Arquitetura do Projeto

### O "Banco de Dados" no Navegador: `localStorage`

O `localStorage` é o coração da persistência de dados do projeto. Ele armazena o estado da aplicação no formato chave-valor, garantindo que as informações de usuários, produtos e pedidos não se percam ao recarregar a página.

| Chave | Descrição |
| :--- | :--- |
| `usuarios` | Armazena um array com todos os objetos de usuários cadastrados. |
| `usuario_logado` | Armazena o objeto do usuário que está com a sessão ativa. |
| `produtosDisponiveis` | Armazena o catálogo completo de produtos, sendo a "fonte da verdade". |
| `carrinho` | Armazena os itens que o cliente adicionou, incluindo a quantidade. |
| `pedidos` | Armazena um histórico de todos os pedidos finalizados. |

Como o `localStorage` só armazena texto (strings), utilizamos `JSON.stringify()` para converter objetos em texto antes de salvar e `JSON.parse()` para convertê-los de volta em objetos ao ler.

### A Arquitetura Modular JavaScript

O código JavaScript foi modularizado para seguir o princípio de responsabilidade única, tornando o projeto mais organizado e escalável.

-   **Módulos de Lógica (Core):** `gerenciador-produtos.js` e `auth.js` formam o núcleo da aplicação, contendo a lógica de negócio principal.
-   **Módulos de Página (Controllers):** Arquivos como `home.js`, `carrinho.js` e `painel.js` atuam como "controladores", capturando eventos da interface e utilizando as funções dos módulos principais para executar as ações.

## 🚀 Como Executar o Projeto

1.  Clone ou baixe o repositório.
2.  Para uma melhor experiência de desenvolvimento, utilize a extensão **Live Server** no Visual Studio Code.
3.  Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
4.  A aplicação será aberta em seu navegador em um endereço local (ex: `http://127.0.0.1:5500`).

## 📄 Detalhamento dos Módulos JavaScript

#### `js/gerenciador-produtos.js` (O Coração do Catálogo)

Este é o módulo mais importante para a gestão de produtos.

-   **`produtosIniciais`**: Um array que serve como o "banco de dados" inicial de produtos. Ele é usado para popular o `localStorage` na primeira vez que o site é acessado.
-   **`carregarProdutos()`**: A única função no sistema responsável por ler os produtos. Ela verifica se `produtosDisponiveis` já existe no `localStorage`. Se sim, o retorna. Se não, salva a lista `produtosIniciais` e a retorna. Possui tratamento de erros (`try...catch`) para casos de dados corrompidos.
-   **`salvarProdutos(listaDeProdutos)`**: A única função responsável por salvar o catálogo. Ela recebe uma lista de produtos atualizada e a persiste no `localStorage`.

#### `js/auth.js` (Módulo de Autenticação)

Encapsula toda a lógica de usuários em um objeto `Auth`.

-   **`Auth.login(email, senha, tipo)`**: Valida as credenciais e, se corretas, salva o usuário em `usuario_logado`.
-   **`Auth.logout()`**: Remove `usuario_logado` do `localStorage`.
-   **`Auth.cadastrar(novoUsuario)`**: Adiciona um novo usuário à lista de `usuarios`.
-   **`Auth.verificarEmailExistente(email)`**: Previne cadastros duplicados.
-   **`Auth.getUsuarioLogado()`**: Retorna o objeto do usuário logado.
-   **`protegerPagina(tiposPermitidos)`**: Função de segurança crucial. Garante que apenas usuários logados e com o perfil correto (ex: `['vendedor']`) possam acessar determinadas páginas.

#### Scripts do Cliente

-   **`js/home.js`**: Renderiza os produtos em destaque na `index.html`.
-   **`js/produtos.js`**: Renderiza a lista completa de produtos na `produtos-lista.html`.
-   **`js/detalhes-produto.js`**: Busca um produto por ID e exibe suas informações detalhadas.
-   **`js/carrinho.js`**: Gerencia a página do carrinho. Contém a lógica de **quantidade**, cálculo de total, e a função `finalizarPedido()` que atualiza o estoque e cria o registro do pedido.
-   **`js/pedidos-cliente.js`**: Filtra e exibe apenas os pedidos realizados pelo cliente atualmente logado.

#### Scripts do Vendedor

-   **`js/painel.js`**: Alimenta o dashboard com métricas (total de vendas, pedidos, etc.) e protege o acesso.
-   **`js/gerenciar-produtos.js`**: Renderiza a lista de produtos com botões de "Editar" e "Remover".
-   **`js/produtos-adicionar.js`**: Controla o formulário para adicionar novos produtos.
-   **`js/editar-produto.js`**: Controla o formulário para editar um produto existente.
-   **`js/gerenciar-pedidos.js`**: Exibe o histórico de **todos** os pedidos recebidos de todos os clientes.