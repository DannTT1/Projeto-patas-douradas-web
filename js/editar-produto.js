document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const produtoId = parseInt(params.get("id"));
    
    if (!produtoId || isNaN(produtoId)) {
        alert("ID de produto inválido!");
        window.location.href = "gerenciar-produtos.html";
        return;
    }

    const produtos = carregarProdutos();
    const produtoParaEditar = produtos.find(p => p.id === produtoId);

    if (!produtoParaEditar) {
        alert("Produto não encontrado!");
        window.location.href = "gerenciar-produtos.html";
        return;
    }

    preencherFormulario(produtoParaEditar);
    configurarFormulario(produtoId, produtos);
});

function preencherFormulario(produto) {
    document.getElementById("produtoId").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("estoque").value = produto.estoque;
    document.getElementById("imagem").value = produto.imagem;
    document.getElementById("descricao").value = produto.descricao;
}

function configurarFormulario(produtoId, produtos) {
    const form = document.getElementById("form-editar");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const indexDoProduto = produtos.findIndex(p => p.id === produtoId);
        if (indexDoProduto === -1) {
            alert("Erro ao encontrar o produto para atualizar.");
            return;
        }

        const produtoAtualizado = {
            id: produtoId,
            nome: document.getElementById("nome").value,
            preco: parseFloat(document.getElementById("preco").value),
            estoque: parseInt(document.getElementById("estoque").value, 10),
            imagem: document.getElementById("imagem").value,
            descricao: document.getElementById("descricao").value
        };
        
        produtos[indexDoProduto] = produtoAtualizado;
        
        salvarProdutos(produtos);
        
        alert("Produto atualizado com sucesso!");
        window.location.href = "gerenciar-produtos.html";
    });
}