async function buscarProdutos() {
    try {
        const response = await fetch('../data/produtos.json');
        const produtos = await response.json();
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

async function renderizarProdutosHome() {
    const produtosDestaqueLista = document.getElementById('produtos-destaque-lista');
    if (produtosDestaqueLista) {
        const produtos = await buscarProdutos();
        const produtosDestaque = produtos.filter(produto => produto.destaque);

        produtosDestaque.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-card');
            produtoDiv.innerHTML = `
                <a href="pages/cliente/produto-detalhes.html?id=${produto.id}">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                </a>
            `;
            produtosDestaqueLista.appendChild(produtoDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', renderizarProdutosHome);