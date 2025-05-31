document.addEventListener("DOMContentLoaded", () => {
  // Busca os pedidos
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  // Busca os produtos disponíveis
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  // Total de pedidos
  const totalPedidos = pedidos.length;

  // Soma o total das vendas de todos os pedidos
  const totalVendas = pedidos.reduce((soma, pedido) => soma + (pedido.total || 0), 0);

  // Soma o estoque de todos os produtos
  const totalEstoque = produtos.reduce((soma, produto) => soma + (produto.estoque || 0), 0);

  // Atualiza os valores no HTML
  document.getElementById("totalPedidos").textContent = totalPedidos;
  document.getElementById("totalVendas").textContent = totalVendas.toFixed(2);
  document.getElementById("totalEstoque").textContent = totalEstoque;
});
