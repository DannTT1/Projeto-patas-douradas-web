const Auth = {
    _USUARIOS_KEY: 'usuarios',
    _LOGADO_KEY: 'usuarioLogado',

    _getUsuarios: function() {
        try {
            return JSON.parse(localStorage.getItem(this._USUARIOS_KEY)) || [];
        } catch (e) {
            console.error("Erro ao ler dados de usuários do localStorage.", e);
            return [];
        }
    },

    _salvarUsuarios: function(usuarios) {
        localStorage.setItem(this._USUARIOS_KEY, JSON.stringify(usuarios));
    },

    login: function(email, senha, tipo) {
        const usuarios = this._getUsuarios();
        const usuario = usuarios.find(u => u.email === email && u.senha === senha && u.tipo === tipo);

        if (usuario) {
            localStorage.setItem(this._LOGADO_KEY, JSON.stringify(usuario));
            return true;
        }
        return false;
    },

    logout: function() {
        localStorage.removeItem(this._LOGADO_KEY);
    },

    isLoggedIn: function() {
        return !!this.getUsuarioLogado();
    },

    getUsuarioLogado: function() {
        try {
            return JSON.parse(localStorage.getItem(this._LOGADO_KEY));
        } catch (e) {
            console.error("Erro ao ler dados do usuário logado.", e);
            return null;
        }
    },

    cadastrar: function(novoUsuario) {
        const usuarios = this._getUsuarios();
        usuarios.push(novoUsuario);
        this._salvarUsuarios(usuarios);
    },

    verificarEmailExistente: function(email) {
        const usuarios = this._getUsuarios();
        return usuarios.some(u => u.email === email);
    }
};




function protegerPagina(tiposPermitidos = ['cliente']) {
    const usuario = Auth.getUsuarioLogado();

    if (!usuario || !tiposPermitidos.includes(usuario.tipo)) {
        alert("Acesso negado. Você precisa estar logado com uma conta permitida para ver esta página.");
        window.location.href = '/Projeto-patas-douradas-web/pages/login-cadastro/login.html';
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const usuario = Auth.getUsuarioLogado();
    const cabecalho = document.querySelector('.cabecalho');

    if (cabecalho) {
        const saudacaoEl = document.createElement("div");
        saudacaoEl.className = "saudacao-usuario";
        if (usuario && usuario.nome) {
            saudacaoEl.textContent = `Olá, ${usuario.nome}!`;
        }
        cabecalho.appendChild(saudacaoEl);
    }
    
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function() {
            if (confirm("Tem certeza que deseja sair?")) {
                Auth.logout();
                window.location.href = "/Projeto-patas-douradas-web/pages/login-cadastro/login.html";
            }
        });
    }
});