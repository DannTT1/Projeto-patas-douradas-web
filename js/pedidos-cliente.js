function listarPedidos() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const container = document.getElementById("lista-pedidos");
  container.innerHTML = "";

  if (!usuarioLogado) {
    container.innerHTML = "<p>Erro: usuário não está logado.</p>";
    return;
  }

  // Filtrar apenas os pedidos do usuário logado
  const pedidosUsuario = pedidos.filter(pedido => {
    return pedido.cliente && pedido.cliente.email === usuarioLogado.email;
  });

  if (pedidosUsuario.length === 0) {
    container.innerHTML = "<p>Nenhum pedido encontrado para este usuário.</p>";
    return;
  }

  pedidosUsuario.forEach(pedido => {
    const div = document.createElement("div");
    div.className = "pedido-item";

    let produtosHTML = "";
    pedido.itens.forEach(item => {
      produtosHTML += `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`;
    });

    div.innerHTML = `
      <h3>Pedido #${pedido.id}</h3>
      <p><strong>Data:</strong> ${new Date(pedido.data).toLocaleString()}</p>
      <ul>${produtosHTML}</ul>
      <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
      <hr>
    `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", listarPedidos); 