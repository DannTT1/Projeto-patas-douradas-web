
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
            <div class="imagem-container" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
                <img src="../../${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="produto-info">
                </div>
        `;
        container.appendChild(card);
    });
}

function verDetalhes(id) {
    window.location.href = `produto-detalhes.html?id=${id}`;
}