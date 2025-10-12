document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const container = document.getElementById('produto-detalhes-container');

    if (!productId || !container) {
        if(container) container.innerHTML = '<p>Erro: ID do produto não fornecido.</p>';
        return;
    }

    const todosOsProdutos = carregarProdutos(); 
    const produtoEncontrado = todosOsProdutos.find(produto => produto.id == productId);

    if (produtoEncontrado) {
        const imagePath = produtoEncontrado.imagem;

        container.innerHTML = `
            <div class="detalhe-produto-imagem-wrapper">
                <img src="${imagePath}" alt="${produtoEncontrado.nome}">
            </div>
            <div class="produto-info">
                <h2>${produtoEncontrado.nome}</h2>
                <p class="preco">R$ ${produtoEncontrado.preco.toFixed(2)}</p>
                <p>${produtoEncontrado.descricao}</p>
                <button class="adicionar-carrinho-btn" data-id="${produtoEncontrado.id}">Adicionar ao Carrinho</button>
            </div>
        `;
    } else {
        container.innerHTML = '<p>Produto não encontrado.</p>';
    }
});