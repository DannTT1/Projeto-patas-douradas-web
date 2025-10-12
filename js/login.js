
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
        alert("Por favor, selecione se você é um Cliente ou Vendedor.");
        return;
    }
    const tipo = tipoUsuarioEl.value;

    const sucesso = Auth.login(email, senha, tipo);

    if (sucesso) {
        alert("Login realizado com sucesso!");
        
        if (tipo === 'cliente') {
            window.location.href = "../../index.html"; 
        } else if (tipo === 'vendedor') {
            window.location.href = "../vendedor/painel-vendedor.html"; 
        }
    } else {
        alert("Falha no login. Verifique seu e-mail, senha e tipo de conta.");
    }
}