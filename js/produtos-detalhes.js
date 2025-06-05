function getProdutoById(id) {
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  return produtos.find(p => p.id === id);
}

/*aqui estamos pegando o valor do parâmetro id da url
convertendo esse valor para número, e usando esse número para buscar 
os detalhes do produto por meio da função getProdutoById */
function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const produto = getProdutoById(id);

  if (!produto) {
    document.getElementById("detalhes-produto").innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  document.getElementById("detalhes-produto").innerHTML = `
    <div class="produto-card">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
      <p><strong>Estoque:</strong> ${produto.estoque}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque <= 0 ? "disabled" : ""}>
        ${produto.estoque <= 0 ? "Indisponível" : "Adicionar ao Carrinho"}
      </button>
    </div>
  `;
}

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

function voltar() {
  window.location.href = "produtos-lista.html";
}

document.addEventListener("DOMContentLoaded", carregarDetalhes); 