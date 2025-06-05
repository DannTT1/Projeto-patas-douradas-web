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

  // Somente os produtos em destaque (IDs 1, 2, 10)
  const destaque = produtos.filter(p => [1, 2, 7].includes(p.id));

  destaque.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    `;
    container.appendChild(div);
  });
});

// Função global para adicionar ao carrinho
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
