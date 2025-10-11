document.addEventListener("DOMContentLoaded", () => {
    carregarDetalhesDoProduto();
});

function carregarDetalhesDoProduto() {
    const container = document.getElementById("detalhes-produto");
    if (!container) {
        console.error("Elemento 'detalhes-produto' não encontrado.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const produtoId = parseInt(params.get("id"));

    if (!produtoId || isNaN(produtoId)) {
        container.innerHTML = "<p>Produto não encontrado ou ID inválido.</p>";
        return;
    }

    const todosProdutos = carregarProdutos();
    const produto = todosProdutos.find(p => p.id === produtoId);

    if (!produto) {
        container.innerHTML = "<p>Produto não encontrado.</p>";
        return;
    }

    container.innerHTML = `
        <img src="../../${produto.imagem}" alt="${produto.nome}" class="detalhe-produto-imagem">
        <div class="detalhe-produto-info">
            <h1>${produto.nome}</h1>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <p class="estoque"><strong>Estoque disponível:</strong> ${produto.estoque} unidades</p>
            <p class="descricao">${produto.descricao}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque <= 0 ? "disabled" : ""}>
                ${produto.estoque <= 0 ? "Indisponível" : "Adicionar ao Carrinho"}
            </button>
        </div>
    `;
}

function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produtoId) {
    const produtos = carregarProdutos();
    const produtoParaAdicionar = produtos.find(p => p.id === produtoId);

    if (!produtoParaAdicionar || produtoParaAdicionar.estoque <= 0) {
        alert("Produto indisponível no momento!");
        return;
    }

    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        if (itemExistente.quantidade < produtoParaAdicionar.estoque) {
            itemExistente.quantidade++;
            salvarCarrinho(carrinho);
            alert(`Mais uma unidade de "${produtoParaAdicionar.nome}" foi adicionada ao carrinho!`);
        } else {
            alert(`Você já atingiu o limite de estoque para "${produtoParaAdicionar.nome}".`);
        }
    } else {
        carrinho.push({ ...produtoParaAdicionar, quantidade: 1 });
        salvarCarrinho(carrinho);
        alert(`"${produtoParaAdicionar.nome}" foi adicionado ao carrinho!`);
    }
}