document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");
    if (form) {
        form.addEventListener("submit", handleLoginSubmit);
    }
});

function handleLoginSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const tipoUsuarioEl = document.querySelector("input[name='opcaoLogin']:checked");

    if (!tipoUsuarioEl) {
        alert("Por favor, selecione o tipo de usuário (Cliente ou Vendedor).");
        return;
    }

    const tipoUsuario = tipoUsuarioEl.value;
    const isSuccess = Auth.login(email, senha, tipoUsuario);

    if (isSuccess) {
        alert('Login realizado com sucesso! Redirecionando...');
        
        if (tipoUsuario === 'cliente') {
            window.location.href = "/Projeto-patas-douradas-web/index.html"; 
        } else {
            window.location.href = "/Projeto-patas-douradas-web/pages/vendedor/painel-vendedor.html"; 
        }
    } else {
        alert("E-mail, senha ou tipo de usuário incorretos.");
    }
}