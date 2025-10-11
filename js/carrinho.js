function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function aumentarQuantidade(produtoId) {
    const carrinho = obterCarrinho();
    const itemNoCarrinho = carrinho.find(p => p.id === produtoId);
    
    const produtosDaLoja = carregarProdutos();
    const produtoNaLoja = produtosDaLoja.find(p => p.id === produtoId);

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
    const itemIndex = carrinho.findIndex(p => p.id === produtoId);

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
        carrinho = carrinho.filter(p => p.id !== produtoId);
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
        const produtoNaLoja = produtosDaLoja.find(p => p.id === itemCarrinho.id);
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
        const produtoNaLoja = produtosDaLoja.find(p => p.id === itemCarrinho.id);
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
    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<tr><td colspan='5'>O carrinho está vazio.</td></tr>";
        totalSpan.textContent = "R$ 0,00";
        return;
    }

    let totalGeral = 0;
    carrinho.forEach(item => {
        const produtoNaLoja = produtosDaLoja.find(p => p.id === item.id);
        const estoqueDisponivel = produtoNaLoja ? produtoNaLoja.estoque : 0;
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const classeErro = item.quantidade > estoqueDisponivel ? 'estoque-insuficiente' : '';
        
        const itemHtml = `
            <tr class="${classeErro}">
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td class="quantidade-controls">
                    <button onclick="diminuirQuantidade(${item.id})">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="aumentarQuantidade(${item.id})">+</button>
                </td>
                <td>R$ ${subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn-remover" onclick="removerItemDoCarrinho(${item.id})">Remover</button>
                </td>
            </tr>
        `;
        container.innerHTML += itemHtml;
    });

    totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);