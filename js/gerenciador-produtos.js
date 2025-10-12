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
];

function carregarProdutos() {
    const produtosSalvos = localStorage.getItem("produtosDisponiveis");
    if (!produtosSalvos) {
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
    try {
        const produtosDoStorage = JSON.parse(produtosSalvos);
        const produtosAtualizados = produtosIniciais.map(pInicial => {
            const pStorage = produtosDoStorage.find(p => p.id === pInicial.id);
            return pStorage ? {...pInicial, ...pStorage} : pInicial;
        });
        return produtosAtualizados;
    } catch (e) {
        console.error("Erro ao ler produtos. Resetando para a lista inicial.", e);
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
}
function salvarProdutos(listaDeProdutos) {
    localStorage.setItem("produtosDisponiveis", JSON.stringify(listaDeProdutos));
}