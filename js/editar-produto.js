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

  // Popula os campos do formulário com os dados existentes do produto
  document.getElementById("preco").value = produto.preco;
  document.getElementById("estoque").value = produto.estoque;
  
  // --- MODIFICAÇÃO AQUI: Popula o campo de descrição ---
  document.getElementById("descricao").value = produto.descricao;

  document.getElementById("form-editar").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Atualiza o objeto do produto com os novos valores do formulário
    produto.preco = parseFloat(document.getElementById("preco").value);
    produto.estoque = parseInt(document.getElementById("estoque").value);

    // --- MODIFICAÇÃO AQUI: Atualiza a descrição ---
    produto.descricao = document.getElementById("descricao").value;

    // Salva a lista de produtos atualizada de volta no localStorage
    localStorage.setItem("produtosDisponiveis", JSON.stringify(produtos));
    
    alert("Produto atualizado com sucesso!");
    window.location.href = "gerenciar-produtos.html";
  });
});