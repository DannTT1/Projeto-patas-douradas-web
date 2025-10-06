🐱 💛 🐶 Projeto Patas Douradas Web
🎯        Site funcional:
👉 https://danntt1.github.io/Projeto-patas-douradas-web/

Aplicação web desenvolvida com HTML, CSS e JavaScript puros.
Simula uma loja de pet shop com funcionalidades completas de vitrine, carrinho, pedidos e painel de gerenciamento para vendedores.

🚀 Tecnologias Utilizadas
HTML5

CSS3

JavaScript Vanilla (sem frameworks)

LocalStorage para persistência de dados no navegador

📁 Estrutura de Pastas
📦 Projeto-patas-douradas-web
├── 📁 css — Estilizações da aplicação
├── 📁 js — Lógica e funcionalidades em JavaScript
├── 📁 pages
│   ├── 📁 cliente — Páginas visíveis para o cliente
│   ├── 📁 login-cadastro — Autenticação de usuários
│   └── 📁 vendedor — Painel administrativo
├── 📁 assets/img — Imagens do projeto
└── 📁 documentação — Arquivos de documentação interna
✨ Funcionalidades
👤 Cliente
Listagem de produtos

Visualização de detalhes do produto

Adicionar itens ao carrinho

Edição e remoção de itens no carrinho

Finalização de pedidos

Visualização do histórico de pedidos

🔐 Login e Cadastro
Tela de login e cadastro

Armazenamento de dados de usuários no LocalStorage

Validação de credenciais

🛒 Carrinho
Persistência de itens no navegador

Cálculo automático de totais

Vinculação do pedido ao cliente logado

🧑‍💼 Painel do Vendedor
Visualização do dashboard com dados agregados

Adição, edição e exclusão de produtos

Gerenciamento dos pedidos recebidos

Geração de relatórios (via interface)

📜 Descrição dos Módulos JavaScript (/js)
A lógica da aplicação é dividida em vários scripts, cada um com sua responsabilidade.

auth.js: Módulo central de autenticação. Gerencia o login, logout e os dados dos usuários salvos.

cadastro.js: Controla a lógica do formulário de cadastro, validando dados e prevenindo a criação de usuários com e-mails duplicados.

carrinho.js: Gerencia todas as funcionalidades do carrinho de compras do cliente, como adicionar, remover e listar itens.

dashboard-vendedor.js: Contém lógicas específicas do painel do vendedor, como a funcionalidade de apagar todos os dados do localStorage para reiniciar a loja.

editar-produto.js: Controla o formulário de edição de produtos, permitindo que o vendedor altere preço e estoque.

gerenciar-pedidos.js: Responsável pela lógica de visualização dos pedidos no painel do vendedor.

gerenciar-produtos.js: Controla a página de gerenciamento de produtos, implementando a exclusão de itens e o redirecionamento para a página de edição.

home.js: Script para a página principal do cliente, geralmente lidando com a exibição de produtos em destaque.

login.js: Gerencia o formulário de login, direcionando o usuário para a área correta (cliente ou vendedor) ou exibindo mensagens de erro.

pedidos-cliente.js: Controla a lógica de exibição do histórico de pedidos para o cliente.

produtos-adicionar.js: Script que gerencia o formulário de adição de novos produtos pelo vendedor.

produto-detalhes.js: Responsável por buscar e exibir as informações de um produto específico na página de detalhes.

produtos.js: Contém a lógica principal relacionada aos produtos, como a inicialização do catálogo e a listagem na vitrine.

saudacao-usuario.js: Script que exibe uma mensagem de boas-vindas personalizada no cabeçalho para o usuário logado.

🧪 Como Executar Localmente
Clone este repositório:

Bash

git clone https://github.com/DannTT1/Projeto-patas-douradas-web.git
cd Projeto-patas-douradas-web
Abra o arquivo index.html em seu navegador de preferência.