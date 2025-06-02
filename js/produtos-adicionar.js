document.getElementById("formProduto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const estoque = parseInt(document.getElementById("estoque").value);
  const imagem = document.getElementById("imagem").value;

  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  const novoProduto = {
    id: Date.now(),
    nome: nome,       
    preco: Number(preco),
    estoque: Number(estoque),
    imagem: imagem
  };

  produtos.push(novoProduto);
  localStorage.setItem("produtosDisponiveis", JSON.stringify(produtos));

  alert("Produto cadastrado com sucesso!");
  window.location.href = "gerenciar-produtos.html";
}); 