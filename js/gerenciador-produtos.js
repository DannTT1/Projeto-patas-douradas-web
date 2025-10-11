
const produtosIniciais = [
    { 
        id: 1, 
        nome: "Areia Higiênica para Gatos", 
        preco: 29.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/areiahigienicafelina.png", 
        estoque: 24,
        descricao: "Areia sanitária de alta absorção que forma torrões firmes."
    },
    { 
        id: 2, 
        nome: "Arranhador Felino", 
        preco: 89.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/arranhadorfelino.png", 
        estoque: 15,
        descricao: "Arranhador resistente para gatos, para afiar as unhas e aliviar o estresse."
    },
    { 
        id: 3, 
        nome: "Caixa de Transporte", 
        preco: 129.50, 
        imagem: "/Projeto-patas-douradas-web/assets/img/caixadetransporteparagatos.png", 
        estoque: 12,
        descricao: "Caixa de transporte segura e ventilada, ideal para viagens."
    },
    { 
        id: 4, 
        nome: "Coleira Antipulgas", 
        preco: 59.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/coleiraantipulgascaesegatos.png", 
        estoque: 30,
        descricao: "Coleira eficaz contra pulgas e carrapatos para cães e gatos."
    },
    { 
        id: 5, 
        nome: "Frisbee para Cães", 
        preco: 25.00, 
        imagem: "/Projeto-patas-douradas-web/assets/img/frisbeeparacaes.png", 
        estoque: 40,
        descricao: "Disco de frisbee flexível e seguro para brincadeiras de arremesso."
    },
    { 
        id: 6, 
        nome: "Mordedor Pequeno Canino", 
        preco: 19.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/mordedorpequenocanino.png", 
        estoque: 50,
        descricao: "Brinquedo mordedor para cães de porte pequeno, ajuda na saúde bucal."
    },
    { 
        id: 7, 
        nome: "Ração Premium para Cães", 
        preco: 199.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/raçaopremiumcanina15kg.png", 
        estoque: 18,
        descricao: "Alimento completo e balanceado para cães de porte médio e grande."
    },
    { 
        id: 8, 
        nome: "Rosquinha para Gatos", 
        preco: 15.50, 
        imagem: "/Projeto-patas-douradas-web/assets/img/rosquinhaparagatos.png", 
        estoque: 35,
        descricao: "Brinquedo em formato de rosquinha com catnip para entreter seu gato."
    },
    { 
        id: 9, 
        nome: "Casinha de Madeira para Cães", 
        preco: 349.90, 
        imagem: "/Projeto-patas-douradas-web/assets/img/casinhaparacaes.png", 
        estoque: 10,
        descricao: "Casinha de madeira resistente e confortável para seu cão."
    }
];

function carregarProdutos() {
    const produtosSalvos = localStorage.getItem("produtosDisponiveis");
    if (!produtosSalvos) {
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
    try { return JSON.parse(produtosSalvos); }
    catch (e) {
        console.error("Erro ao ler produtos. Resetando para a lista inicial.", e);
        localStorage.setItem("produtosDisponiveis", JSON.stringify(produtosIniciais));
        return produtosIniciais;
    }
}
function salvarProdutos(listaDeProdutos) {
    localStorage.setItem("produtosDisponiveis", JSON.stringify(listaDeProdutos));
}