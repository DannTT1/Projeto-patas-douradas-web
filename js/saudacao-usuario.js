document.addEventListener("DOMContentLoaded", () => {
  let nome = "visitante";

  try {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));
    if (usuario && usuario.nome) {
      nome = usuario.nome;
    }
  } catch (erro) {
    console.warn("Erro ao recuperar usuário:", erro);
  }

  const mensagem = `Olá, ${nome}!`;

  const saudacaoTopo = document.getElementById("saudacaoUsuario");
  if (saudacaoTopo) {
    saudacaoTopo.textContent = mensagem;
  }

  const saudacoesExtras = document.querySelectorAll(".saudacao-inferior");
  saudacoesExtras.forEach(el => {
    el.textContent = mensagem;
  });
});
