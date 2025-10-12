document.addEventListener("DOMContentLoaded", () => {
    renderizarTodosOsProdutos();
});

function renderizarTodosOsProdutos() {
    const container = document.getElementById("lista-produtos");
    if (!container) return;

    const produtos = carregarProdutos();
    container.innerHTML = "";
    if (produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";

       
        card.innerHTML = `
            <a href="produto-detalhes.html?id=${produto.id}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
            </a>
            <button class="adicionar-carrinho-btn" data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
    });
}
