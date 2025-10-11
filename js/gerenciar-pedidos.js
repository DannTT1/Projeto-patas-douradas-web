document.addEventListener("DOMContentLoaded", function () {
    exibirPedidosDoCliente();
});

function exibirPedidosDoCliente() {
    const container = document.getElementById("lista-pedidos");
    if (!container) {
        console.error("Elemento 'lista-pedidos' não encontrado.");
        return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
    
    if (!usuarioLogado || !usuarioLogado.nome) {
        container.innerHTML = `
            <p>Você precisa estar logado para visualizar seus pedidos.</p>
            <a href="/Projeto-patas-douradas-web/pages/login-cadastro/login.html">Ir para a página de Login</a>
        `;
        return;
    }

    const todosPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const meusPedidos = todosPedidos.filter(pedido => pedido.cliente === usuarioLogado.nome);
    
    meusPedidos.sort((a, b) => b.id - a.id);

    if (meusPedidos.length === 0) {
        container.innerHTML = "<p>Você ainda não realizou nenhum pedido.</p>";
        return;
    }

    container.innerHTML = ""; 

    meusPedidos.forEach(pedido => {
        const div = document.createElement("div");
        div.className = "pedido-card"; 

        const dataFormatada = new Date(pedido.data).toLocaleString("pt-BR", {
            dateStyle: "long",
            timeStyle: "short"
        });

        const itensHtml = pedido.itens.map(item =>
            `<li>${item.nome} (x${item.quantidade}) - R$ ${item.preco.toFixed(2)}</li>`
        ).join("");

        div.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
            <p><strong>Itens:</strong></p>
            <ul>${itensHtml}</ul>
        `;

        container.appendChild(div);
    });
}