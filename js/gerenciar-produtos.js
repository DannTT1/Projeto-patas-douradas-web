document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lista-produtos");
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  if (produtos.length === 0) {
    container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.className = "produto-card";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <div class="estoque">Estoque: ${produto.estoque}</div>
      <div class="botoes">
        <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
        <button class="btn-excluir" onclick="removerProduto(${produto.id})">Remover</button>
      </div>
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

function editarProduto(id) {
  window.location.href = `editar-produto.html?id=${id}`;
}
