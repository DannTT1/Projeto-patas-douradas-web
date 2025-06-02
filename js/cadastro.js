document.getElementById("formularioCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeCompleto = document.getElementById("nomeUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const senha = document.getElementById("senhaUsuario").value;
    const tipoUsuario = document.querySelector("input[name='opcaoLoginCadastro']:checked").value;

    if(verificadorDeEmailExistente(email)) {
        alert('Email já cadastrado,faça o login utilizando outro e-mail');
        return;
    }   

    const novoUsuario = {
        nome: nomeCompleto,
        email: email,
        senha: senha,
        tipo: tipoUsuario
    };
// aqui estamos salvando no localStorage
    cadastrarUsuario(novoUsuario)

   alert('cadastro realizado com sucesso! faça o login agora.');
window.location.href = "login.html";

}); 