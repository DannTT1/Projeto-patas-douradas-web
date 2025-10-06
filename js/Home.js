document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
  if (usuarioLogado && usuarioLogado.nome) {
    const saudacao = document.getElementById("saudacaoUsuario");
    if (saudacao) {
      saudacao.textContent = `Olá, ${usuarioLogado.nome}!`;
    }
  }

  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const container = document.getElementById("produtosDestaque");

  if (!container || produtos.length === 0) {
    console.warn("⚠️ Nenhum produto encontrado para exibir.");
    return;
  }

  const destaque = produtos.filter(p => [1, 2, 7].includes(p.id));

  destaque.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto-card"; 
    
   
    div.innerHTML = `
      <div class="imagem-container" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
          <img src="${produto.imagem}" alt="${produto.nome}">
      </div>
      <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    container.appendChild(div);
  });
});



function adicionarAoCarrinho(id) {
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];
  const produto = produtos.find(p => p.id === id);

  if (!produto || produto.estoque <= 0) {
    alert("Produto indisponível!");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert(`${produto.nome} foi adicionado ao carrinho!`);
}

function verDetalhes(id) {
    
    window.location.href = `pages/cliente/produto-detalhes.html?id=${id}`;
}