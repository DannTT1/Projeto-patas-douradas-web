document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lista-produtos");
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  if (produtos.length === 0) {
    container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "produto-card";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <p>Estoque: ${produto.estoque}</p>
      <button onclick="removerProduto(${produto.id})">Remover</button>
    `;
    container.appendChild(card);
  });
});

function removerProduto(id) {
  let produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  produtos = produtos.filter(p => p.id !== id);
  localStorage.setItem("produtosDisponiveis", JSON.stringify(produtos));
  alert("Produto removido com sucesso!");
  location.reload();
} 