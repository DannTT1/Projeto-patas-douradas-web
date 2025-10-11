document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formularioCadastro");
    if (form) {
        form.addEventListener("submit", handleCadastroSubmit);
    }
});

function handleCadastroSubmit(event) {
    event.preventDefault();

    const nomeCompleto = document.getElementById("nomeUsuario").value.trim();
    const email = document.getElementById("emailUsuario").value.trim();
    const senha = document.getElementById("senhaUsuario").value;
    const tipoUsuarioEl = document.querySelector("input[name='opcaoLoginCadastro']:checked");

    if (!nomeCompleto || !email || !senha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    if (senha.length < 6) {
        alert("A senha deve ter no mínimo 6 caracteres.");
        return;
    }
    if (!tipoUsuarioEl) {
        alert("Por favor, selecione se você é um Cliente ou Vendedor.");
        return;
    }

    const tipoUsuario = tipoUsuarioEl.value;

    if (Auth.verificarEmailExistente(email)) {
        alert('Este e-mail já está cadastrado. Por favor, tente outro ou faça login.');
        return;
    }

    const novoUsuario = {
        nome: nomeCompleto,
        email: email,
        senha: senha, 
        tipo: tipoUsuario
    };

    Auth.cadastrar(novoUsuario);

    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    window.location.href = "login.html";
}