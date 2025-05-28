document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault(); // aqui inpede de enviar o formulario padrao

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const tipoUsuario = document.querySelector("input[name='opcaoLogin']:checked").value;

    const logou = login(email,senha, tipoUsuario);

    if(logou) {
        alert('Login realizado com sucesso!!');

        if(tipoUsuario === 'cliente') {
            window.location.href = 'loja.html';
        } else {
            window.location.href = 'painel-vendedor.html';
        }
    } else {
        alert("Usuário ou senha estão incorretos!.");
    }
});