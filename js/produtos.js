// Aguarda o HTML da página ser completamente carregado antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  
  // --- DEFINIÇÃO DOS PRODUTOS ---
  // Esta lista será usada para ATUALIZAR os produtos na memória do navegador toda vez que a página carregar.
// VERSÃO FINAL PARA PUBLICAR NO GITHUB
const produtosIniciais = [
  { id: 1, nome: "Ração Premium para Cães", preco: 199.90, imagem: "/Projeto-patas-douradas-web/assets/img/raçao premium canina 15kg.png", estoque: 18 },
  { id: 2, nome: "Ração Premium para Gatos", preco: 164.90, imagem: "/Projeto-patas-douradas-web/assets/img/raçao premium felina 10kg.png", estoque: 22 },
  { id: 3, nome: "Mordedor de Borracha", preco: 19.90, imagem: "/Projeto-patas-douradas-web/assets/img/mordedor pequeno canino.png", estoque: 30 },
  { id: 4, nome: "Casinha para Cães", preco: 289.90, imagem: "/Projeto-patas-douradas-web/assets/img/casinha para caes.png", estoque: 7 },
  { id: 5, nome: "Rosquinha para Gatos", preco: 84.90, imagem: "/Projeto-patas-douradas-web/assets/img/rosquinha para gatos.png", estoque: 15 },
  { id: 6, nome: "Gaiola para Calopsitas", preco: 139.90, imagem: "/Projeto-patas-douradas-web/assets/img/gaiola para calopsitas.png", estoque: 9 },
  { id: 7, nome: "Areia Higiênica para Gatos", preco: 29.90, imagem: "/Projeto-patas-douradas-web/assets/img/areia higienica felina.png", estoque: 24 }
];

  // Salva a lista atualizada no localStorage, sobrescrevendo qualquer lista antiga.
  localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));


  // --- EXIBIÇÃO DOS PRODUTOS NA TELA ---
  // Puxa a lista fresca que acabamos de salvar na memória
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const container = document.getElementById("lista-produtos");

  // Garante que o container para os produtos existe na página atual
  if (container) {
    container.innerHTML = ""; // Limpa a lista para evitar duplicação
    
    produtos.forEach(produto => {
      const card = document.createElement("div");
      card.className = "produto-card";
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <p><strong>Estoque:</strong> ${produto.estoque}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque <= 0 ? "disabled" : ""}>
          ${produto.estoque <= 0 ? "Indisponível" : "Adicionar ao Carrinho"}
        </button>
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
  window.location.href = `produto-detalhes.html?id=${id}`;
}