document.addEventListener("DOMContentLoaded", function () {
    function obterNomeClientePorId(clienteId) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const cliente = usuarios.find(user => user.id === clienteId);
        return cliente ? cliente.nome : "Cliente não identificado";
    }

    function exibirTodosOsPedidos() {
        const container = document.getElementById("lista-pedidos");
        if (!container) {
            console.error("Elemento 'lista-pedidos' não encontrado.");
            return;
        }

        const todosPedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        
        todosPedidos.sort((a, b) => b.id - a.id);

        if (todosPedidos.length === 0) {
            container.innerHTML = "<p>Nenhum pedido foi realizado ainda.</p>";
            return;
        }

        container.innerHTML = ""; 

        todosPedidos.forEach(pedido => {
            const div = document.createElement("div");
            div.className = "pedido-card"; 

            const dataFormatada = new Date(pedido.id).toLocaleString("pt-BR", {
                dateStyle: "long",
                timeStyle: "short"
            });

            const itensHtml = pedido.itens.map(item =>
                `<li>${item.nome} (x${item.quantidade}) - R$ ${item.preco.toFixed(2)}</li>`
            ).join("");

            const nomeCliente = obterNomeClientePorId(pedido.clienteId);

            div.innerHTML = `
                <h3>Pedido #${pedido.id}</h3>
                <p><strong>Cliente:</strong> ${nomeCliente}</p>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
                <p><strong>Itens:</strong></p>
                <ul>${itensHtml}</ul>
            `;

            container.appendChild(div);
        });
    }

    exibirTodosOsPedidos();
});