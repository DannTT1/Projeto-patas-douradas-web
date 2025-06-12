# 🐾 Projeto Patas Douradas Web

Aplicação web desenvolvida com **HTML**, **CSS** e **JavaScript puros**. Simula uma loja de pet shop com funcionalidades completas de vitrine, carrinho, pedidos e painel de gerenciamento para vendedores.

---

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla (sem frameworks)
- LocalStorage para persistência de dados no navegador

---

## 📁 Estrutura de Pastas

📦 Projeto-patas-douradas-web
├── 📁 css # Estilizações da aplicação
├── 📁 js # Lógica e funcionalidades em JavaScript
├── 📁 pages
│ ├── 📁 cliente # Páginas visíveis para o cliente
│ ├── 📁 login-cadastro # Autenticação de usuários
│ └── 📁 vendedor # Painel administrativo
├── 📁 assets/img # Imagens do projeto
└── 📁 documentação # Arquivos de documentação interna


## ✨ Funcionalidades

### 👤 Cliente
- Listagem de produtos
- Visualização de detalhes do produto
- Adicionar itens ao carrinho
- Edição e remoção de itens no carrinho
- Finalização de pedidos
- Visualização do histórico de pedidos

### 🔐 Login e Cadastro
- Tela de login e cadastro
- Armazenamento de dados de usuários no LocalStorage
- Validação de credenciais

### 🛒 Carrinho
- Persistência de itens no navegador
- Cálculo automático de totais
- Vinculação do pedido ao cliente logado

### 🧑‍💼 Painel do Vendedor
- Visualização do dashboard com dados agregados
- Adição, edição e exclusão de produtos
- Gerenciamento dos pedidos recebidos
- Geração de relatórios (via interface)

---

## 🧪 Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/DannTT1/Projeto-patas-douradas-web.git
Acesse o diretório do projeto:


cd Projeto-patas-douradas-web
Abra o arquivo pages/cliente/home.html no navegador.

⚠️ Nenhum servidor ou backend é necessário. Tudo funciona via navegador com armazenamento local (localStorage).