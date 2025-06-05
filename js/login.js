document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipoUsuario = document.querySelector("input[name='opcaoLogin']:checked").value;

  const logou = login(email, senha, tipoUsuario);

// aqui direcionamos o usuario de acordo com o tipo sendo vendedor / cliente
  if (logou) {
    alert('Login realizado com sucesso!!');
    if (tipoUsuario === 'cliente') {
      window.location.href = "../cliente/home.html"; 
    } else {
      window.location.href = "../vendedor/painel-vendedor.html"; 
    }
  } else {
    alert("Usuário ou senha estão incorretos!.");
  }
}); 