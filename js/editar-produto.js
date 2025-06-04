document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    alert("Produto não encontrado!");
    window.location.href = "gerenciar-produtos.html";
    return;
  }

  document.getElementById("preco").value = produto.preco;
  document.getElementById("estoque").value = produto.estoque;

  document.getElementById("form-editar").addEventListener("submit", (e) => {
    e.preventDefault();
    produto.preco = parseFloat(document.getElementById("preco").value);
    produto.estoque = parseInt(document.getElementById("estoque").value);

    localStorage.setItem("produtosDisponiveis", JSON.stringify(produtos));
    alert("Produto atualizado com sucesso!");
    window.location.href = "gerenciar-produtos.html";
  });
});
