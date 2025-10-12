
function inicializarBotoesAdicionar() {
    document.body.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('adicionar-carrinho-btn')) {
            const produtoId = event.target.dataset.id;
            adicionarProdutoAoCarrinho(produtoId);
        }
    });
}

function adicionarProdutoAoCarrinho(produtoId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const todosProdutos = carregarProdutos();
    const produtoParaAdicionar = todosProdutos.find(p => p.id == produtoId);

    if (produtoParaAdicionar) {
        const itemExistente = carrinho.find(item => item.id == produtoId);

        if (itemExistente) {
            if (itemExistente.quantidade < produtoParaAdicionar.estoque) {
                itemExistente.quantidade++;
                alert(`"${produtoParaAdicionar.nome}" teve a quantidade aumentada no carrinho!`);
            } else {
                alert(`Estoque máximo para "${produtoParaAdicionar.nome}" atingido!`);
                return;
            }
        } else {
            if (produtoParaAdicionar.estoque > 0) {
                carrinho.push({ ...produtoParaAdicionar, quantidade: 1 });
                alert(`"${produtoParaAdicionar.nome}" foi adicionado ao carrinho!`);
            } else {
                alert(`Desculpe, "${produtoParaAdicionar.nome}" está fora de estoque.`);
                return;
            }
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
}

document.addEventListener('DOMContentLoaded', inicializarBotoesAdicionar);