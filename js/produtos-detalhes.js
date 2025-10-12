async function buscarProdutos() {
    try {
        const response = await fetch('../../data/produtos.json');
        const produtos = await response.json();
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

async function buscarProdutoPorId(id) {
    const produtos = await buscarProdutos();
    return produtos.find(produto => produto.id == id);
}

function renderizarDetalhesProduto(produto) {
    const produtoDetalhesContainer = document.getElementById('produto-detalhes-container');
    if (produto) {
        produtoDetalhesContainer.innerHTML = `
            <div class="produto-detalhes-card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="produto-info">
                    <h2>${produto.nome}</h2>
                    <p>${produto.descricao}</p>
                    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="adicionar-carrinho-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    } else {
        produtoDetalhesContainer.innerHTML = '<p>Produto não encontrado.</p>';
    }
}

async function carregarDetalhesProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const produto = await buscarProdutoPorId(productId);
        renderizarDetalhesProduto(produto);
    }
}

document.addEventListener('DOMContentLoaded', carregarDetalhesProduto);