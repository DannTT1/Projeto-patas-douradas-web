const produtosIniciais = [
    { 
        id: 1, 
        nome: "Areia Higiênica para Gatos", 
        preco: 29.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/areiahigienicafelina.png", 
        estoque: 24,
        descricao: "Areia sanitária de alta absorção que forma torrões firmes.",
        destaque: true
    },
    { 
        id: 2, 
        nome: "Arranhador Felino", 
        preco: 89.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/arranhadorfelino.png", 
        estoque: 15,
        descricao: "Arranhador resistente para gatos, para afiar as unhas e aliviar o estresse.",
        destaque: true
    },
    { 
        id: 3, 
        nome: "Caixa de Transporte", 
        preco: 129.50, 
        imagem: "/Projeto-patas-douradas-web/assets/img/caixadetransporteparagatos.png", 
        estoque: 12,
        descricao: "Caixa de transporte segura e ventilada, ideal para viagens.",
        destaque: true
    },
    { 
        id: 4, 
        nome: "Coleira Antipulgas", 
        preco: 59.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/coleiraantipulgascaesegatos.png", 
        estoque: 30,
        descricao: "Coleira eficaz contra pulgas e carrapatos para cães e gatos.",
        destaque: false
    },
    { 
        id: 5, 
        nome: "Frisbee para Cães", 
        preco: 25.00, 
        imagem: "/Projeto-patas-douradas-web/assets/img/frisbeeparacaes.png", 
        estoque: 40,
        descricao: "Disco de frisbee flexível e seguro para brincadeiras de arremesso.",
        destaque: false
    },
    { 
        id: 6, 
        nome: "Mordedor Pequeno Canino", 
        preco: 19.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/mordedorpequenocanino.png", 
        estoque: 50,
        descricao: "Brinquedo mordedor para cães de porte pequeno, ajuda na saúde bucal.",
        destaque: false
    },
    { 
        id: 7, 
        nome: "Ração Premium para Cães", 
        preco: 199.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/raçaopremiumcanina15kg.png", 
        estoque: 18,
        descricao: "Alimento completo e balanceado para cães de porte médio e grande.",
        destaque: false
    },
    { 
        id: 8, 
        nome: "Rosquinha para Gatos", 
        preco: 15.50, 
        imagem: "/Projeto-patas-douradas-web/assets/img/rosquinhaparagatos.png", 
        estoque: 35,
        descricao: "Brinquedo em formato de rosquinha com catnip para entreter seu gato.",
        destaque: false
    },
    { 
        id: 9, 
        nome: "Casinha de Madeira para Cães", 
        preco: 349.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/casinhaparacaes.png", 
        estoque: 10,
        descricao: "Casinha de madeira resistente e confortável para seu cão.",
        destaque: false
    }
];

function carregarProdutos() {
    const produtosSalvos = localStorage.getItem("produtosDisponiveis");
    if (!produtosSalvos) {
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
    try {
        return JSON.parse(produtosSalvos);
    } catch (e) {
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
}

function salvarProdutos(listaDeProdutos) {
    localStorage.setItem("produtosDisponiveis", JSON.stringify(listaDeProdutos));
}




function renderizarProdutosDaHomePage() {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('produtos-destaque-lista');
        if (!container) {
            console.error("ERRO: A div #produtos-destaque-lista não foi encontrada no index.html.");
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
            container.innerHTML = "<p>Nenhum produto foi marcado como 'destaque: true'.</p>";
        }
    });
}

renderizarProdutosDaHomePage();