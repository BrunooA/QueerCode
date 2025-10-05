document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLogin");
  const emailInput = document.getElementById("emailLogin");
  const senhaInput = document.getElementById("senhaLogin");
  const fotoPreview = document.getElementById("fotoPreview");

  // Carregar dados do localStorage
  const dadosCadastro = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");

  // Mostrar foto se houver
  if (dadosCadastro.foto) {
    fotoPreview.style.backgroundImage = `url(${dadosCadastro.foto})`;
    fotoPreview.style.backgroundSize = "cover";
    fotoPreview.innerHTML = "";
  }

  btnLogin.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Verificar dados
    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    // Comparar com localStorage
    if (email === dadosCadastro.email && senha === dadosCadastro.senha) {
      alert("Login realizado com sucesso!");
      window.location.href = "index.html"; // redirecionar
    } else {
      alert("Email ou senha incorretos!");
    }
  });

  // Aqui você pode implementar recuperação de senha
  document.getElementById("esqueceuSenha").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Funcionalidade de recuperação de senha ainda não implementada.");
  });
});
