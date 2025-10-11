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

function limparDadosLocalStorage() {
    const confirmacao = "TEM CERTEZA? Esta ação apagará TODOS os produtos, pedidos e usuários e não pode ser desfeita. Digite 'APAGAR' para confirmar.";
    
    if (prompt(confirmacao) === "APAGAR") {
        localStorage.clear();
        alert("Todos os dados foram apagados com sucesso!");
        location.reload();
    } else {
        alert("Operação cancelada.");
    }
}