document.addEventListener("DOMContentLoaded", () => {
  
  // --- INICIALIZAÇÃO INTELIGENTE DOS PRODUTOS ---
  // Verifica se já existe uma lista de produtos no localStorage
  if (!localStorage.getItem("produtosDisponiveis")) {
    
    // Se NÃO existir, cria a lista inicial com os produtos padrão
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
      // ... (os outros produtos da sua lista)
      { 
        id: 7, 
        nome: "Areia Higiênica para Gatos", 
        preco: 29.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/areiahigienicafelina.png", 
        estoque: 24,
        descricao: "Areia sanitária de alta absorção que forma torrões firmes, facilitando a limpeza. Controla os odores de forma eficaz, mantendo o ambiente sempre fresco."
      }
    ];

    // Salva a lista inicial no localStorage APENAS UMA VEZ
    localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
  }

  // --- EXIBIÇÃO DOS PRODUTOS NA TELA ---
  // Agora ele sempre puxa a lista correta, seja a inicial ou a que foi modificada pelo vendedor
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const container = document.getElementById("lista-produtos");

  if (container) {
    container.innerHTML = "";
    
    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.className = "produto-card";
      
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

// --- FUNÇÕES GLOBAIS ---

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
  window.location.href = `produto-detalhes.html?id=${id}`;
}