document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario_logado"));
  const saudacao = document.getElementById("saudacaoUsuario");

  if (usuario && usuario.nome && saudacao) {
    saudacao.textContent = `Olá, ${usuario.nome}`;
  }
}); 