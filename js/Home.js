document.addEventListener('DOMContentLoaded', () => {
    const produtos = carregarProdutos(); 

    const container = document.getElementById('produtos-destaque-lista');
    if (!container) {
        console.error("Elemento #produtos-destaque-lista não foi encontrado!");
        return;
    }

    const produtosEmDestaque = produtos.filter(p => p.destaque === true);
    
    container.innerHTML = ''; 

    if (produtosEmDestaque.length > 0) {
        produtosEmDestaque.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            
            card.innerHTML = `
                <a href="pages/cliente/produto-detalhes.html?id=${produto.id}">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div class="info-wrapper">
                        <h3>${produto.nome}</h3>
                        <p>R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                </a>
                <button class="adicionar-carrinho-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = "<p>Nenhum produto em destaque no momento.</p>";
    }
});