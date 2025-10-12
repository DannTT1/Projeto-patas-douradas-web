protegerPagina(['vendedor']);

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutosNoPainel();
});

function renderizarProdutosNoPainel() {
    const container = document.getElementById("lista-produtos");
    if (!container) {
        console.error("Container #lista-produtos não encontrado.");
        return;
    }

    const produtos = carregarProdutos();
    container.innerHTML = "";

    if (produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado. <a href='produtos-adicionar.html'>Adicione o primeiro produto</a>!</p>";
        return;
    }

    produtos.sort((a, b) => a.id - b.id);

    produtos.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "produto-card"; 
        
        const imagePath = produto.imagem;

        card.innerHTML = `
            <img src="${imagePath}" alt="${produto.nome}">
            
            <div class="info-wrapper">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p><strong>Estoque:</strong> ${produto.estoque}</p>
            </div>
            
            <div class="botoes-gerenciamento">
                <button class="btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
                <button class="btn-excluir" onclick="removerProduto(${produto.id})">Remover</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function editarProduto(id) {
    window.location.href = `editar-produto.html?id=${id}`;
}

function removerProduto(id) {
    if (confirm("Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.")) {
        let produtos = carregarProdutos();
        produtos = produtos.filter(p => p.id !== id);
        salvarProdutos(produtos);
        
        alert("Produto removido com sucesso!");
        
        renderizarProdutosNoPainel();
    }
}