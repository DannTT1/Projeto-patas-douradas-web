const USUARIO_LOGADO = 'usuario_logado';
const USUARIOS = 'usuarios';

function login(email, senha, tipo) {
    const usuarios = JSON.parse(localStorage.getItem(USUARIOS)) || [];

    const usuario = usuarios.find(
        u => u.email === email && u.senha === senha && u.tipo === tipo
    );

    if (usuario) {
        localStorage.setItem(USUARIO_LOGADO, JSON.stringify(usuario));
        return true;
    }

    return false;
}


function usuarioLogado() {
    return JSON.parse(localStorage.getItem(USUARIO_LOGADO));
}


function logout() {
    localStorage.removeItem(USUARIO_LOGADO);
}

function protegerLogin() {
    if (!usuarioLogado()) {
        alert("Você precisa estar logado");
        window.location.href = '../../login-cadastro/login.html';
    }
}




function cadastrarUsuario(novoUsuario) {
    const usuarios = JSON.parse(localStorage.getItem(USUARIOS)) || [];
    usuarios.push(novoUsuario); 
    localStorage.setItem(USUARIOS, JSON.stringify(usuarios));
}


function verificadorDeEmailExistente(email) {
    const usuarios = JSON.parse(localStorage.getItem(USUARIOS)) || [];
    return usuarios.some(u => u.email === email);
} 