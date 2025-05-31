document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lista-pedidos");
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    container.innerHTML = "<p>Nenhum pedido realizado até o momento.</p>";
    return;
  }

  pedidos.forEach(pedido => {
    const div = document.createElement("div");
    div.className = "pedido";

    const data = new Date(Number(pedido.data)).toLocaleString("pt-BR");


    const itens = pedido.itens.map(item =>
      `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`
    ).join("");

    div.innerHTML = `
      <h3>Pedido #${pedido.id}</h3>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
      <ul>${itens}</ul>
      <hr />
    `;

    container.appendChild(div);
  });
});
