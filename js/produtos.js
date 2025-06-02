document.addEventListener("DOMContentLoaded", () => {
  // Se ainda não existir, define os produtos no localStorage
  if (!localStorage.getItem("produtosDisponiveis")) {
    const produtosIniciais = [

{ id: 1, nome: "Ração Premium para Cães", preco: 199.90, imagem: "../../assets/img/Ração Premium Canina 15kg.png", estoque: 18 },
{ id: 2, nome: "Ração Premium para Gatos", preco: 164.90, imagem: "../../assets/img/Ração Premium Felina 10kg.png", estoque: 22 },
{ id: 3, nome: "Mordedor de Borracha", preco: 19.90, imagem: "../../assets/img/Mordedor Pequeno Canino.png", estoque: 30 },
{ id: 4, nome: "Casinha para Cães", preco: 289.90, imagem: "../../assets/img/Casinha para Cães.png", estoque: 7 },
{ id: 5, nome: "Rosquinha para Gatos", preco: 84.90, imagem: "../../assets/img/Rosquinha para Gatos.png", estoque: 15 },
{ id: 6, nome: "Gaiola para Calopsitas", preco: 139.90, imagem: "../../assets/img/Gaiola para Calopsitas.png", estoque: 9 },
{ id: 7, nome: "Areia Higiênica para Gatos", preco: 29.90, imagem: "../../assets/img/Areia Higiênica Felina.png", estoque: 25 },
{ id: 8, nome: "Arranhador para Gatos", preco: 119.90, imagem: "../../assets/img/Arranhador Felino.png", estoque: 12 },
{ id: 9, nome: "Caixa de Transporte para Gatos", preco: 89.90, imagem: "../../assets/img/Caixa de Transporte para Gatos.png", estoque: 20 },
{ id: 10, nome: "Coleira Peitoral para Cães", preco: 54.90, imagem: "../../assets/img/Coleira Peitoral Canina.png", estoque: 16 },
{ id: 11, nome: "Coleira Antipulgas para Cães e Gatos", preco: 39.90, imagem: "../../assets/img/Coleira Antipulgas Cães & Gatos.png", estoque: 14 },
{ id: 12, nome: "Frisbee para Cães", preco: 24.90, imagem: "../../assets/img/Frisbee para Cães.png", estoque: 28 }

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