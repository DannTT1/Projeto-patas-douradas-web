

document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
    if (usuarioLogado && usuarioLogado.nome) {
        const saudacao = document.getElementById("saudacaoUsuario");
        if (saudacao) {
            saudacao.textContent = `Olá, ${usuarioLogado.nome}!`;
        }
    }

    renderizarDestaquesNaHome();
});

function renderizarDestaquesNaHome() {
    const container = document.getElementById("produtosDestaque");
    if (!container) return;

    const todosProdutos = carregarProdutos(); 
    if (todosProdutos.length === 0) {
        container.innerHTML = "<p>Nenhum produto para exibir no momento.</p>";
        return;
    }

    const idsDestaque = [7, 2, 9]; 
    const produtosEmDestaque = todosProdutos.filter(p => idsDestaque.includes(p.id));
    
    container.innerHTML = "";

    produtosEmDestaque.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card"; 
        card.innerHTML = `
            <div class="imagem-container" style="cursor:pointer" onclick="verDetalhes(${produto.id})">
                <img src="${produto.imagem}" alt="${produto.nome}">
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


function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produtoId) {
    const produtos = carregarProdutos();
    const produtoParaAdicionar = produtos.find(p => p.id === produtoId);

    if (!produtoParaAdicionar || produtoParaAdicionar.estoque <= 0) {
        alert("Produto indisponível no momento!");
        return;
    }

    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(item => item.id === produtoId);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produtoParaAdicionar, quantidade: 1 });
    }

    salvarCarrinho(carrinho);
    alert(`"${produtoParaAdicionar.nome}" foi adicionado ao carrinho!`);
}

function verDetalhes(id) {
    window.location.href = `/Projeto-patas-douradas-web/pages/cliente/produto-detalhes.html?id=${id}`;
}