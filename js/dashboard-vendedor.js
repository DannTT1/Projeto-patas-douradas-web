document.addEventListener("DOMContentLoaded", function () {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const produtos = JSON.parse(localStorage.getItem("produtosDisponiveis")) || [];

  const totalPedidosEl = document.getElementById("totalPedidos");
  const totalVendasEl = document.getElementById("totalVendas");
  const totalEstoqueEl = document.getElementById("totalEstoque");

  if (!totalPedidosEl || !totalVendasEl || !totalEstoqueEl) {
    console.error("❌ Algum dos elementos não foi encontrado no DOM.");
    return;
  }

  totalPedidosEl.textContent = pedidos.length;

  let totalVendas = 0;
  pedidos.forEach(pedido => {
    totalVendas += Number(pedido.total || 0);
  });
  totalVendasEl.textContent = totalVendas.toFixed(2);

  let totalEstoque = 0;
  produtos.forEach(produto => {
    totalEstoque += Number(produto.estoque || 0);
  });
  totalEstoqueEl.textContent = totalEstoque;

  // exibe o relatório também
  exibirRelatorioLocalStorage();
});
function alternarRelatorio() {
  const container = document.getElementById("relatorioContainer");
  if (container.style.display === "none") {
    container.style.display = "block";
    exibirRelatorioLocalStorage(); // Atualiza sempre que abrir
  } else {
    container.style.display = "none";
  }
}

function exibirRelatorioLocalStorage() {
  const dados = {};
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    try {
      dados[chave] = JSON.parse(localStorage.getItem(chave));
    } catch (e) {
      dados[chave] = localStorage.getItem(chave);
    }
  }

  const pre = document.getElementById("relatorioDados");
  if (pre) {
    pre.textContent = JSON.stringify(dados, null, 2);
  }
}

function limparDadosLocalStorage() {
  if (confirm("Tem certeza que deseja apagar todos os dados do localStorage? Isso não pode ser desfeito.")) {
    localStorage.clear();
    alert("Todos os dados foram apagados!");
    exibirRelatorioLocalStorage();
    location.reload();
  }
}
