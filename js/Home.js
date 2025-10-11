
document.addEventListener("DOMContentLoaded", function () {
    renderizarDestaquesNaHome();
});

function renderizarDestaquesNaHome() {
    const container = document.getElementById("produtosDestaque");
    if (!container) {
        console.error("ERRO: Container #produtosDestaque não foi encontrado!");
        return;
    }

    const todosProdutos = carregarProdutos();
    if (!todosProdutos || todosProdutos.length === 0) {
        container.innerHTML = "<p>Nenhum produto para exibir no momento.</p>";
        return;
    }

    const idsDestaque = [7, 5, 9]; 
    const produtosEmDestaque = todosProdutos.filter(p => idsDestaque.includes(p.id));
    
    container.innerHTML = "";

    produtosEmDestaque.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card"; 
        card.innerHTML = `
            <div class="imagem-container" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
                <img src="../../${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque <= 0 ? "disabled" : ""}>
                    ${produto.estoque <= 0 ? "Indisponível" : "Adicionar ao Carrinho"}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function verDetalhes(id) {
    window.location.href = `pages/cliente/produto-detalhes.html?id=${id}`;
}