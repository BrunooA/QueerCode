document.addEventListener("DOMContentLoaded", () => {
  carregarPerfil();
  atualizarAvaliacao();
  configurarBotaoSair();
});

/* ===============================
   🧍 Carrega dados do candidato
================================ */
function carregarPerfil() {
  const dados = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");

  // Foto
  const perfilFoto = document.getElementById("perfilFoto");
  const menuFoto = document.getElementById("menuFoto");
  if (dados.foto) {
    perfilFoto.src = dados.foto;
    menuFoto.src = dados.foto;
  }

  // Nome e gênero
  document.getElementById("perfilNome").textContent = `Nome: ${dados.nome || "Usuário"}`;
  document.getElementById("perfilGenero").textContent = `Gênero: ${dados.genero || "-"}`;
  document.getElementById("menuNome").textContent = dados.nome || "Usuário";
  document.getElementById("menuPerfil").textContent = "Candidato(a)";

  // Modais
  document.getElementById("sobreMimConteudo").textContent = dados.sobreMim || "Nenhuma informação adicionada.";
  document.getElementById("experienciasConteudo").textContent = dados.experiencias || "Nenhuma experiência adicionada.";
  document.getElementById("formacaoConteudo").textContent = dados.formacao || "Nenhuma formação informada.";
  document.getElementById("jornadaConteudo").textContent = dados.jornada || "Nenhuma jornada registrada.";
}

/* ===============================
   ⭐ Avaliação dinâmica (0 a 5)
================================ */
function atualizarAvaliacao() {
  const avaliacaoDiv = document.getElementById("avaliacaoPerfil");
  if (!avaliacaoDiv) return;

  const dados = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");
  const nota = parseFloat(dados.nota || 0);

  avaliacaoDiv.innerHTML = ""; // limpa conteúdo antigo

  // Gera as 5 estrelas
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.classList.add("estrela");
    if (i <= Math.floor(nota)) {
      span.classList.add("cheia");
      span.textContent = "★";
    } else {
      span.classList.add("vazia");
      span.textContent = "★";
    }
    avaliacaoDiv.appendChild(span);
  }

  // Adiciona a nota numérica
  const notaSpan = document.createElement("span");
  notaSpan.classList.add("nota");
  notaSpan.textContent = nota.toFixed(1);
  avaliacaoDiv.appendChild(notaSpan);
}

/* ===============================
   🖼️ Edição da foto do perfil
================================ */
const editarFotoBtn = document.getElementById("editarFotoBtn");
if (editarFotoBtn) {
  const fotoInput = document.createElement("input");
  fotoInput.type = "file";
  fotoInput.accept = "image/*";
  fotoInput.style.display = "none";
  document.body.appendChild(fotoInput);

  editarFotoBtn.addEventListener("click", () => fotoInput.click());

  fotoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const perfilFoto = document.getElementById("perfilFoto");
        perfilFoto.src = reader.result;

        const dados = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");
        dados.foto = reader.result;
        localStorage.setItem("dadosCadastro", JSON.stringify(dados));
      };
      reader.readAsDataURL(file);
    }
  });
}

/* ===============================
   🚪 Botão "Sair"
================================ */
function configurarBotaoSair() {
  const btnSair = document.getElementById("btnSair");
  if (btnSair) {
    btnSair.addEventListener("click", e => {
      e.preventDefault();
      if (confirm("Deseja realmente sair da conta?")) {
        localStorage.removeItem("dadosCadastro");
        window.location.href = "index.html";
      }
    });
  }
}

/* ===============================
   🏢 Função exemplo: avaliação pela empresa
   (chamar em outro lugar, ex: página da empresa)
================================ */
function avaliarCandidato(nota) {
  const dados = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");
  dados.nota = nota; // valor entre 0 e 5
  localStorage.setItem("dadosCadastro", JSON.stringify(dados));
  atualizarAvaliacao();
}
