protegerPagina(['vendedor']);

document.addEventListener("DOMContentLoaded", function () {
    atualizarMetricasDoDashboard();
});

function atualizarMetricasDoDashboard() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    
    const produtos = carregarProdutos(); 

    const totalPedidosEl = document.getElementById("totalPedidos");
    const totalVendasEl = document.getElementById("totalVendas");
    const totalEstoqueEl = document.getElementById("totalEstoque");

    if (!totalPedidosEl || !totalVendasEl || !totalEstoqueEl) {
        console.error("Um ou mais elementos do dashboard não foram encontrados.");
        return;
    }

    totalPedidosEl.textContent = pedidos.length;

    const totalVendas = pedidos.reduce((soma, pedido) => soma + pedido.total, 0);
    totalVendasEl.textContent = `R$ ${totalVendas.toFixed(2)}`;

    const totalEstoque = produtos.reduce((soma, produto) => soma + produto.estoque, 0);
    totalEstoqueEl.textContent = totalEstoque;
}

