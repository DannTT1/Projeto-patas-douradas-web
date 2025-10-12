document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const todosOsProdutos = carregarProdutos(); 

    const produtoEncontrado = todosOsProdutos.find(produto => produto.id == productId);

    const container = document.getElementById('produto-detalhes-container');

    if (produtoEncontrado) {
        container.innerHTML = `
            <div class="produto-detalhes-card">
                <img src="${produtoEncontrado.imagem}" alt="${produtoEncontrado.nome}">
                <div class="produto-info">
                    <h2>${produtoEncontrado.nome}</h2>
                    <p>${produtoEncontrado.descricao}</p>
                    <p class="preco">R$ ${produtoEncontrado.preco.toFixed(2)}</p>
                    <button class="adicionar-carrinho-btn" data-id="${produtoEncontrado.id}">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = '<p>Produto não encontrado.</p>';
    }
});