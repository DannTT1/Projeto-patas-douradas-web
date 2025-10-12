
function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function carregarProdutos() {
    return JSON.parse(localStorage.getItem("produtos")) || [];
}

function salvarProdutos(produtos) {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


function aumentarQuantidade(produtoId) {
    const carrinho = obterCarrinho();
    const itemNoCarrinho = carrinho.find(p => p.id == produtoId);
    const produtosDaLoja = carregarProdutos();
    const produtoNaLoja = produtosDaLoja.find(p => p.id == produtoId);

    if (itemNoCarrinho && produtoNaLoja && itemNoCarrinho.quantidade < produtoNaLoja.estoque) {
        itemNoCarrinho.quantidade++;
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    } else {
        alert(`Você atingiu o limite de estoque para "${produtoNaLoja.nome}".`);
    }
}

function diminuirQuantidade(produtoId) {
    const carrinho = obterCarrinho();
    const itemIndex = carrinho.findIndex(p => p.id == produtoId);

    if (itemIndex > -1) {
        carrinho[itemIndex].quantidade > 1 ? carrinho[itemIndex].quantidade-- : carrinho.splice(itemIndex, 1);
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

function removerItemDoCarrinho(produtoId) {
    if (confirm("Tem certeza que deseja remover este item?")) {
        let carrinho = obterCarrinho().filter(p => p.id != produtoId);
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

function finalizarPedido() {
    const carrinho = obterCarrinho();
    const produtosDaLoja = carregarProdutos();
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")); 

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    if (!usuarioLogado) {
        alert("Você precisa estar logado para finalizar a compra.");
        window.location.href = "login.html"; 
        return;
    }

    carrinho.forEach(itemNoCarrinho => {
        const produtoNaLoja = produtosDaLoja.find(p => p.id == itemNoCarrinho.id);
        if (produtoNaLoja) {
            produtoNaLoja.estoque -= itemNoCarrinho.quantidade;
        }
    });

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const novoPedido = {
        id: Date.now(), 
        data: new Date().toLocaleDateString("pt-BR"),
        clienteId: usuarioLogado.id, 
        itens: carrinho,
        total: carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    };

    pedidos.push(novoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    
    salvarProdutos(produtosDaLoja);

    
    salvarCarrinho([]); 

    alert("Pedido finalizado com sucesso! Obrigado por comprar conosco.");
    renderizarCarrinho(); 
    
}
function renderizarCarrinho() {
    const carrinho = obterCarrinho();
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
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        
        const itemHtml = `
            <tr data-id="${item.id}">
                <td data-label="Produto">${item.nome}</td>
                <td data-label="Preço">R$ ${item.preco.toFixed(2)}</td>
                <td data-label="Quantidade" class="quantidade-controls">
                    <button class="btn-diminuir">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-aumentar">+</button>
                </td>
                <td data-label="Subtotal">R$ ${subtotal.toFixed(2)}</td>
                <td data-label="Ação"><button class="btn-remover">Remover</button></td>
            </tr>
        `;
        container.innerHTML += itemHtml;
    });

    totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

function inicializarEventosCarrinho() {
    const container = document.getElementById("itens-carrinho");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");

    container.addEventListener('click', (event) => {
        const target = event.target;
        const tr = target.closest('tr');
        if (!tr || !tr.dataset.id) return;

        const produtoId = tr.dataset.id;

        if (target.classList.contains('btn-aumentar')) aumentarQuantidade(produtoId);
        if (target.classList.contains('btn-diminuir')) diminuirQuantidade(produtoId);
        if (target.classList.contains('btn-remover')) removerItemDoCarrinho(produtoId);
    });

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarPedido);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();
    inicializarEventosCarrinho();
});