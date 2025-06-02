document.addEventListener("DOMContentLoaded", () => {
  // Se ainda não existir, define os produtos no localStorage
  if (!localStorage.getItem("produtosDisponiveis")) {
    const produtosIniciais = [
{ id: 1, nome: "Ração Premium para Cães", preco: 79.90, imagem: "../../assets/img/Ração Premium Canina 15kg.png", estoque: 10 },
{ id: 2, nome: "Coleira Peitoral Canina", preco: 33.00, imagem: "../../assets/img/Coleira Peitoral Canina.png", estoque: 9 },
{ id: 3, nome: "Mordedor de Borracha", preco: 15.00, imagem: "../../assets/img/Mordedor Pequeno Canino.png", estoque: 8 },
{ id: 4, nome: "Areia Higiênica Felina", preco: 39.99, imagem: "../../assets/img/areia-higienica.png", estoque: 7 },
{ id: 5, nome: "Arranhador para Gatos", preco: 49.99, imagem: "../../assets/img/Arranhador Felino.png", estoque: 6 },
{ id: 6, nome: "Coleira Antipulgas", preco: 25.00, imagem: "../../assets/img/Coleira Antipulgas Cães & Gatos.png", estoque: 5 }
    ];

    localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
  }

  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const container = document.getElementById("lista-produtos");

  container.innerHTML = ""; // evita duplicação
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
});

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