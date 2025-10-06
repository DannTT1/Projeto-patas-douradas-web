// Aguarda o HTML da página ser completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  
  // --- DEFINIÇÃO DOS PRODUTOS ---
  // Esta lista será usada para ATUALIZAR os produtos na memória do navegador toda vez que a página carregar.
  const produtosIniciais = [
    { 
      id: 1, 
      nome: "Ração Premium para Cães", 
      preco: 199.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/raçaopremiumcanina15kg.png", 
      estoque: 18,
      descricao: "Alimento completo e balanceado, desenvolvido com ingredientes de alta qualidade para garantir a saúde e vitalidade do seu cão. Ideal para todas as raças de porte médio e grande."
    },
    { 
      id: 2, 
      nome: "Ração Premium para Gatos", 
      preco: 164.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/raçaopremiumfelina10kg.png", 
      estoque: 22,
      descricao: "Ração super premium para gatos adultos, com sabor irresistível e nutrientes essenciais que ajudam a manter a saúde do trato urinário e a beleza da pelagem."
    },
    { 
      id: 3, 
      nome: "Mordedor de Borracha", 
      preco: 19.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/mordedorpequenocanino.png", 
      estoque: 30,
      descricao: "Brinquedo de borracha atóxica e resistente, perfeito para aliviar o estresse e auxiliar na limpeza dos dentes do seu pet. Diversão garantida por horas!"
    },
    { 
      id: 4, 
      nome: "Casinha para Cães", 
      preco: 289.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/casinhaparacaes.png", 
      estoque: 7,
      descricao: "Casinha plástica resistente e confortável, ideal para áreas externas e internas. Proporciona um abrigo seguro e aconchegante para o seu cão em todas as estações do ano."
    },
    { 
      id: 5, 
      nome: "Rosquinha para Gatos", 
      preco: 84.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/rosquinhaparagatos.png", 
      estoque: 15,
      descricao: "Cama em formato de rosquinha, super macia e quentinha. O design aconchegante ajuda a acalmar e relaxar seu gato, proporcionando um sono tranquilo."
    },
    { 
      id: 6, 
      nome: "Gaiola para Calopsitas", 
      preco: 139.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/gaiolaparacalopsitas.png", 
      estoque: 9,
      descricao: "Gaiola espaçosa e segura para calopsitas e outras aves de porte similar. Acompanha poleiros e comedouros, garantindo o conforto e bem-estar da sua ave."
    },
    { 
      id: 7, 
      nome: "Areia Higiênica para Gatos", 
      preco: 29.90, 
      imagem: "/Projeto-patas-douradas-web/assets/img/areiahigienicafelina.png", 
      estoque: 24,
      descricao: "Areia sanitária de alta absorção que forma torrões firmes, facilitando a limpeza. Controla os odores de forma eficaz, mantendo o ambiente sempre fresco."
    }
  ];

  // Salva a lista atualizada no localStorage, sobrescrevendo qualquer lista antiga.
  localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));


  // --- EXIBIÇÃO DOS PRODUTOS NA TELA ---
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const container = document.getElementById("lista-produtos");

  if (container) {
    container.innerHTML = ""; // Limpa a lista para evitar duplicação
    
    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.className = "produto-card";
      
      // --- ESTRUTURA HTML DO CARD CORRIGIDA ---
      card.innerHTML = `
        <div class="imagem-container" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
            <img src="${produto.imagem}" alt="${produto.nome}">
        </div>
        <div class="produto-info">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${produto.estoque}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque <= 0 ? "disabled" : ""}>
                ${produto.estoque <= 0 ? "Indisponível" : "Adicionar ao Carrinho"}
            </button>
        </div>
      `;
      container.appendChild(card);
    });
  }
});

// --- FUNÇÕES GLOBAIS (acessíveis por botões no HTML) ---

function adicionarAoCarrinho(id) {
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const produto = produtos.find(p => p.id === id);
  
  if (!produto || produto.estoque <= 0) {
    alert("Produto esgotado!");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert(`${produto.nome} foi adicionado ao carrinho!`);
}

function verDetalhes(id) {
  // O caminho correto para a página de detalhes, subindo um nível
  window.location.href = `produto-detalhes.html?id=${id}`;
}