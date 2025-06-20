function obterCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function listarCarrinho() {
  // puxa os itens do carrinho
  const carrinho = obterCarrinho();
  const container = document.getElementById("itens-carrinho");
  const totalSpan = document.getElementById("total");
  container.innerHTML = "";

  if (carrinho.length === 0) {
    container.innerHTML = "<p>O carrinho está vazio.</p>";
    totalSpan.textContent = "";
    return;
  }
/*caso o carrinho nao esteja vazio, itera sobre o array somando os valores
dos produtos */
  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    const div = document.createElement("div");
    div.className = "item-carrinho";
    div.innerHTML = `
      <p><strong>${item.nome}</strong> - R$ ${item.preco.toFixed(2)}</p>
      <button onclick="removerItem(${index})">Remover</button>
    `;
    container.appendChild(div);
  });

  totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  const carrinho = obterCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  listarCarrinho();
}

function finalizarPedido() {
  const carrinho = obterCarrinho();
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
  if (!usuarioLogado) {
    alert("Erro: você precisa estar logado para finalizar o pedido.");
    return;
  }

  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  carrinho.forEach(itemCarrinho => {
    const produtoIndex = produtos.findIndex(p => p.id === itemCarrinho.id);
    if (produtoIndex !== -1) {
      produtos[produtoIndex].estoque = Math.max(0, produtos[produtoIndex].estoque - 1);
    }
  });

  localStorage.setItem("produtosDisponiveis", JSON.stringify(produtos));

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  const novoPedido = {
    id: Date.now(),
    data: Date.now(),
    cliente: usuarioLogado, // Salva o usuário logado junto com o pedido
    itens: carrinho,
    total: carrinho.reduce((acc, item) => acc + item.preco, 0)
  };

  pedidos.push(novoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem("carrinho");

  alert("Pedido finalizado com sucesso!");
  window.location.href = "pedidos-cliente.html";
}

function voltar() {
  window.location.href = "produtos-lista.html";
}

document.addEventListener("DOMContentLoaded", listarCarrinho); 