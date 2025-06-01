  document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
    if (usuarioLogado && usuarioLogado.nome) {
      const saudacao = document.getElementById("saudacaoUsuario");
      if (saudacao) {
        saudacao.textContent = `Olá, ${usuarioLogado.nome} 👤`;
      }
    }
  });