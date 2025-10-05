document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // CADASTRO
  // -----------------------
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");

  let formData = {
    nome: "",
    perfil: "",
    genero: "",
    orientacao: "",
    experiencia: "",
    especializacoes: [],
    foto: ""
  };

  if (steps.length > 0) steps[currentStep].style.display = "block";

  function nextStep() {
    if (steps.length === 0) return;
    steps[currentStep].style.display = "none";
    currentStep++;
    if (currentStep < steps.length) {
      steps[currentStep].style.display = "block";
    }
  }

  function setupOptionButtons(selector, key, multiple = false) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (multiple) {
          btn.classList.toggle("active");
          const value = btn.getAttribute("data-value");
          if (btn.classList.contains("active")) {
            formData[key].push(value);
          } else {
            formData[key] = formData[key].filter(v => v !== value);
          }
        } else {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          formData[key] = btn.getAttribute("data-value");

          if (key === "orientacao" &&
            formData.genero.toLowerCase().includes("homem") &&
            formData.orientacao.toLowerCase().includes("hetero")) {
            alert("Este site é exclusivo para mulheres e pessoas da comunidade LGBT+.");
          }
        }

        const stepNextBtn = steps[currentStep]?.querySelector(".next-btn");
        if (stepNextBtn) stepNextBtn.disabled = false;
      });
    });
  }

  setupOptionButtons(".perfil-btn", "perfil");
  setupOptionButtons(".genero-btn", "genero");
  setupOptionButtons(".orientacao-btn", "orientacao");
  setupOptionButtons(".experiencia-btn", "experiencia");
  setupOptionButtons(".espec-btn", "especializacoes", true);

  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const inputs = steps[currentStep].querySelectorAll("input, select, textarea");
      inputs.forEach(input => {
        if (input.type === "checkbox" || input.classList.contains("option-btn")) return;
        formData[input.id] = input.value;
      });
      nextStep();
    });
  });

  // Upload de foto e finalizar cadastro
  const fotoInput = document.getElementById("fotoInput");
  const fotoPreview = document.getElementById("fotoPreview");
  const finalizarBtn = document.getElementById("finalizarBtn");

  if (fotoInput && fotoPreview && finalizarBtn) {
    fotoInput
  }
});
