
function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function aumentarQuantidade(produtoId) {
    const carrinho = obterCarrinho();
    const itemNoCarrinho = carrinho.find(p => p.id == produtoId);
    const produtosDaLoja = carregarProdutos();
    const produtoNaLoja = produtosDaLoja.find(p => p.id == produtoId);

    if (itemNoCarrinho && produtoNaLoja) {
        if (itemNoCarrinho.quantidade < produtoNaLoja.estoque) {
            itemNoCarrinho.quantidade++;
            salvarCarrinho(carrinho);
            renderizarCarrinho();
        } else {
            alert(`Você atingiu o limite de estoque para "${produtoNaLoja.nome}".`);
        }
    }
}

function diminuirQuantidade(produtoId) {
    const carrinho = obterCarrinho();
    const itemIndex = carrinho.findIndex(p => p.id == produtoId);

    if (itemIndex > -1) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade--;
        } else {
            carrinho.splice(itemIndex, 1);
        }
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

function removerItemDoCarrinho(produtoId) {
    if (confirm("Tem certeza que deseja remover este item do carrinho?")) {
        let carrinho = obterCarrinho();
        carrinho = carrinho.filter(p => p.id != produtoId);
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

function finalizarPedido() {
    const carrinho = obterCarrinho();
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para finalizar o pedido.");
        window.location.href = "/Projeto-patas-douradas-web/pages/login-cadastro/login.html";
        return;
    }
    const produtosDaLoja = carregarProdutos();
    let estoqueSuficiente = true;
    for (const itemCarrinho of carrinho) {
        const produtoNaLoja = produtosDaLoja.find(p => p.id == itemCarrinho.id);
        if (!produtoNaLoja || itemCarrinho.quantidade > produtoNaLoja.estoque) {
            alert(`Estoque insuficiente para "${itemCarrinho.nome}".\nDisponível: ${produtoNaLoja ? produtoNaLoja.estoque : 0}.\nNo seu carrinho: ${itemCarrinho.quantidade}.`);
            estoqueSuficiente = false;
            break;
        }
    }
    if (!estoqueSuficiente) {
        renderizarCarrinho();
        return;
    }
    carrinho.forEach(itemCarrinho => {
        const produtoNaLoja = produtosDaLoja.find(p => p.id == itemCarrinho.id);
        if (produtoNaLoja) {
            produtoNaLoja.estoque -= itemCarrinho.quantidade;
        }
    });
    salvarProdutos(produtosDaLoja);
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const novoPedido = {
        id: Date.now(),
        data: new Date().toISOString(),
        cliente: usuarioLogado.nome,
        itens: carrinho,
        total: carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    };
    pedidos.push(novoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    localStorage.removeItem("carrinho");
    alert("Pedido finalizado com sucesso!");
    window.location.href = "pedidos-cliente.html";
}

function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    const produtosDaLoja = carregarProdutos();
    const container = document.getElementById("itens-carrinho");
    const totalSpan = document.getElementById("total");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");
    
    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<tr><td colspan='5' data-label='Aviso'>O carrinho está vazio.</td></tr>";
        totalSpan.textContent = "R$ 0,00";
        if (botaoFinalizar) botaoFinalizar.disabled = true;
        return;
    }
    
    if (botaoFinalizar) botaoFinalizar.disabled = false;

    let totalGeral = 0;
    carrinho.forEach(item => {
        const produtoNaLoja = produtosDaLoja.find(p => p.id == item.id);
        const estoqueDisponivel = produtoNaLoja ? produtoNaLoja.estoque : 0;
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        const classeErro = item.quantidade > estoqueDisponivel ? 'estoque-insuficiente' : '';
        
        const itemHtml = `
            <tr class="${classeErro}" data-id="${item.id}">
                <td data-label="Produto">${item.nome}</td>
                <td data-label="Preço">R$ ${item.preco.toFixed(2)}</td>
                <td data-label="Quantidade" class="quantidade-controls">
                    <button class="btn-diminuir">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-aumentar">+</button>
                </td>
                <td data-label="Subtotal">R$ ${subtotal.toFixed(2)}</td>
                <td data-label="Ação">
                    <button class="btn-remover">Remover</button>
                </td>
            </tr>
        `;
        container.innerHTML += itemHtml;
    });

    totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// --- INICIALIZAÇÃO E GERENCIADOR DE EVENTOS ---
function inicializarEventosCarrinho() {
    const container = document.getElementById("itens-carrinho");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");

    container.addEventListener('click', (event) => {
        const target = event.target;
        const tr = target.closest('tr');
        if (!tr || !tr.dataset.id) return;

        const produtoId = tr.dataset.id;

        if (target.classList.contains('btn-aumentar')) {
            aumentarQuantidade(produtoId);
        } else if (target.classList.contains('btn-diminuir')) {
            diminuirQuantidade(produtoId);
        } else if (target.classList.contains('btn-remover')) {
            removerItemDoCarrinho(produtoId);
        }
    });

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarPedido);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();
    inicializarEventosCarrinho();
});