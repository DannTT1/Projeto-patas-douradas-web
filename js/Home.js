document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('produtos-destaque-lista');
    if (!container) {
        console.error("ERRO CRÍTICO: A div #produtos-destaque-lista não existe no seu index.html.");
        return;
    }

    const produtos = carregarProdutos();
    const produtosEmDestaque = produtos.filter(p => p.destaque === true);
    
    container.innerHTML = '';

    if (produtosEmDestaque.length > 0) {
        produtosEmDestaque.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            
            const imagePath = produto.imagem;
            
            card.innerHTML = `
                <a href="pages/cliente/produto-detalhes.html?id=${produto.id}">
                    <img src="${imagePath}" alt="${produto.nome}">
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
        container.innerHTML = "<p>Nenhum produto foi marcado como 'destaque: true' no arquivo gerenciador-produtos.js.</p>";
    }
});