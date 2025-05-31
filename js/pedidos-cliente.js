function listarPedidos() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const container = document.getElementById("lista-pedidos");
  container.innerHTML = "";

  if (pedidos.length === 0) {
    container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
    return;
  }

  pedidos.forEach(pedido => {
    const div = document.createElement("div");
    div.className = "pedido-item";

    let produtosHTML = "";
    pedido.itens.forEach(item => {
      produtosHTML += `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`;
    });

    div.innerHTML = `
      <h3>Pedido #${pedido.id}</h3>
      <p><strong>Data:</strong> ${pedido.data}</p>
      <ul>${produtosHTML}</ul>
      <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
      <hr>
    `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", listarPedidos);
