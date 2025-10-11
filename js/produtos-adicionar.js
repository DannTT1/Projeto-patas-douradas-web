protegerPagina(['vendedor']);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formProduto");
    if (form) {
        form.addEventListener("submit", adicionarNovoProduto);
    }
});

function adicionarNovoProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value, 10);
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !imagem || !descricao) {
        alert("Por favor, preencha todos os campos de texto.");
        return;
    }
    if (isNaN(preco) || isNaN(estoque) || preco < 0 || estoque < 0) {
        alert("O preço e o estoque devem ser números positivos.");
        return;
    }

    const produtosAtuais = carregarProdutos();
    const novoProduto = {
        id: Date.now(),
        nome: nome,
        preco: preco,
        estoque: estoque,
        imagem: imagem,
        descricao: descricao
    };

    produtosAtuais.push(novoProduto);
    salvarProdutos(produtosAtuais);

    alert("Produto cadastrado com sucesso!");
    event.target.reset();
    window.location.href = "gerenciar-produtos.html";
}