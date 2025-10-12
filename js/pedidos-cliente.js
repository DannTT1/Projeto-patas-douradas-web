
document.addEventListener("DOMContentLoaded", () => {
    exibirPedidosDoCliente();
});

function exibirPedidosDoCliente() {
    const container = document.getElementById("lista-pedidos");
    if (!container) {
        console.error("Elemento 'lista-pedidos' não foi encontrado.");
        return;
    }

    const usuarioLogado = Auth.getUsuarioLogado(); 

    if (!usuarioLogado || !usuarioLogado.id) {
        container.innerHTML = `
            <div class="aviso-login">
                <p>Você precisa estar logado para visualizar seus pedidos.</p>
                <a href="login.html" class="btn">Ir para a página de Login</a>
            </div>
        `;
        return;
    }

    const todosPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const meusPedidos = todosPedidos.filter(pedido => pedido.clienteId === usuarioLogado.id);

    meusPedidos.sort((a, b) => b.id - a.id);

    if (meusPedidos.length === 0) {
        container.innerHTML = "<p>Você ainda não realizou nenhum pedido.</p>";
        return;
    }

    container.innerHTML = ""; 

    meusPedidos.forEach(pedido => {
        const div = document.createElement("div");
        div.className = "pedido-card"; 

        const dataFormatada = new Date(pedido.id).toLocaleString("pt-BR", {
            dateStyle: "long",
            timeStyle: "short"
        });

        const itensHtml = pedido.itens.map(item =>
            `<li>${item.nome} (x${item.quantidade}) - R$ ${item.preco.toFixed(2)}</li>`
        ).join("");

        div.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2).replace('.', ',')}</p>
            <p><strong>Itens:</strong></p>
            <ul>${itensHtml}</ul>
        `;

        container.appendChild(div);
    });
}