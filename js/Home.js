document.addEventListener('DOMContentLoaded', () => {
    
    const produtosDestaqueContainer = document.getElementById('produtos-destaque-lista');
    
    if (produtosDestaqueContainer) {
        
        const todosOsProdutos = carregarProdutos();
        
        const produtosEmDestaque = todosOsProdutos.filter(produto => produto.destaque === true);

        produtosDestaqueContainer.innerHTML = '';

        produtosEmDestaque.forEach(produto => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('produto-card');
            
            cardDiv.innerHTML = `
                <a href="pages/cliente/produto-detalhes.html?id=${produto.id}">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                </a>
            `;
            produtosDestaqueContainer.appendChild(cardDiv);
        });
    }
});