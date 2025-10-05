document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // CADASTRO
  // -----------------------
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");

  let formData = {
    nome: "",
    sobrenome: "",
    nomeSocial: "",
    telefone: "",
    dataNasc: "",
    cpf: "",
    cidade: "",
    estado: "",
    senha: "",
    senha2: "",
    email: "",
    perfil: "",
    genero: "",
    orientacao: "",
    experiencia: "",
    especializacoes: [],
    estiloTrabalho: "",
    ganhosProjetados: "",
    razaoTrabalhoExtra: "",
    disposicao: "",
    oportunidadesRemotas: "",
    contatoPreferido: "",
    concordo: false,
    foto: ""
  };

  // Mostrar primeiro step
  if(steps.length > 0) steps[currentStep].style.display = "block";

  // Função para avançar step
  function nextStep() {
    steps[currentStep].style.display = "none";
    currentStep++;
    if(currentStep < steps.length){
      steps[currentStep].style.display = "block";
    }
  }

  // -----------------------
  // Função para configurar botões de seleção
  // -----------------------
  function setupOptionButtons(selector, key, multiple=false){
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        if(multiple){
          btn.classList.toggle("active");
          const value = btn.getAttribute("data-value");
          if(btn.classList.contains("active")){
            formData[key].push(value);
          } else {
            formData[key] = formData[key].filter(v => v !== value);
          }
        } else {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          formData[key] = btn.getAttribute("data-value");

          // Alerta exclusividade
          if(key === "orientacao" &&
             formData.genero.toLowerCase().includes("homem") &&
             formData.orientacao.toLowerCase().includes("hetero")){
            alert("Este site é exclusivo para mulheres e pessoas da comunidade LGBT+.");
          }
        }

        // Habilitar botão próximo
        const stepNextBtn = steps[currentStep]?.querySelector(".next-btn");
        if(stepNextBtn) stepNextBtn.disabled = false;

        // Salvar automaticamente
        localStorage.setItem("dadosCadastro", JSON.stringify(formData));
      });
    });
  }

  // -----------------------
  // Configuração dos botões
  // -----------------------
  setupOptionButtons(".perfil-btn", "perfil");
  setupOptionButtons(".genero-btn", "genero");
  setupOptionButtons(".orientacao-btn", "orientacao");
  setupOptionButtons(".experiencia-btn", "experiencia");
  setupOptionButtons(".espec-btn", "especializacoes", true);
  setupOptionButtons(".option-box", "estiloTrabalho");
  setupOptionButtons(".ganhos-btn", "ganhosProjetados");
  setupOptionButtons(".razao-btn", "razaoTrabalhoExtra");
  setupOptionButtons(".disposicao-btn", "disposicao");
  setupOptionButtons(".oportunidades-btn", "oportunidadesRemotas");
  setupOptionButtons(".contato-btn", "contatoPreferido");

  // -----------------------
  // Botões "Próximo"
  // -----------------------
  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const inputs = steps[currentStep].querySelectorAll("input, select, textarea");
      inputs.forEach(input => {
        if(input.type === "checkbox"){
          formData[input.id] = input.checked;
        } else {
          formData[input.id] = input.value;
        }
      });

      nextStep();
      localStorage.setItem("dadosCadastro", JSON.stringify(formData));
    });
  });

  // -----------------------
  // Foto de perfil
  // -----------------------
  const fotoInput = document.getElementById("fotoInput");
  const fotoPreview = document.getElementById("fotoPreview");
  const finalizarBtn = document.getElementById("finalizarBtn");

  if(fotoInput && fotoPreview && finalizarBtn){
    fotoInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () => {
          fotoPreview.style.backgroundImage = `url(${reader.result})`;
          fotoPreview.style.backgroundSize = "cover";
          fotoPreview.innerHTML = "";
          formData.foto = reader.result;
          localStorage.setItem("dadosCadastro", JSON.stringify(formData));
        };
        reader.readAsDataURL(file);
      }
    });

    finalizarBtn.addEventListener("click", () => {
      localStorage.setItem("dadosCadastro", JSON.stringify(formData));
      alert("Cadastro finalizado com sucesso!");
      window.location.href = "login.html";
    });
  }

  // -----------------------
  // Função para aplicar seleções salvas
  // -----------------------
  function applySavedSelections(){
    const savedData = JSON.parse(localStorage.getItem("dadosCadastro") || "{}");
    if(!savedData) return;

    // Botões
    const map = {
      perfil: ".perfil-btn",
      genero: ".genero-btn",
      orientacao: ".orientacao-btn",
      experiencia: ".experiencia-btn",
      especializacoes: ".espec-btn",
      estiloTrabalho: ".option-box",
      ganhosProjetados: ".ganhos-btn",
      razaoTrabalhoExtra: ".razao-btn",
      disposicao: ".disposicao-btn",
      oportunidadesRemotas: ".oportunidades-btn",
      contatoPreferido: ".contato-btn"
    };

    for(const key in map){
      const selector = map[key];
      const buttons = document.querySelectorAll(selector);
      if(!buttons) continue;

      if(Array.isArray(savedData[key])){
        buttons.forEach(btn => {
          const value = btn.getAttribute("data-value");
          if(savedData[key].includes(value)) btn.classList.add("active");
        });
      } else {
        buttons.forEach(btn => {
          const value = btn.getAttribute("data-value");
          if(savedData[key] === value) btn.classList.add("active");
        });
      }
    }

    // Inputs de texto
    ["nome","sobrenome","nomeSocial","telefone","dataNasc","cpf","cidade","estado","email","senha","senha2"].forEach(id => {
      const input = document.getElementById(id);
      if(input && savedData[id]) input.value = savedData[id];
    });

    // Select
    const selectDisposicao = document.getElementById("disposicaoSelect");
    if(selectDisposicao && savedData.disposicao){
      selectDisposicao.value = savedData.disposicao;
    }

    // Checkbox
    const termos = document.getElementById("concordo");
    if(termos && savedData.concordo) termos.checked = true;

    // Foto
    if(fotoPreview && savedData.foto){
      fotoPreview.style.backgroundImage = `url(${savedData.foto})`;
      fotoPreview.style.backgroundSize = "cover";
      fotoPreview.innerHTML = "";
    }

    // Atualiza o formData com o salvo
    formData = {...formData, ...savedData};
  }

  // Chamar função para carregar valores salvos
  applySavedSelections();
});
