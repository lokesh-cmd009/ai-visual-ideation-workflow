// AI-Driven Visual Ideation & Design Workflow Studio Logic

document.addEventListener('DOMContentLoaded', () => {
  initNavTabs();
  initPromptCompiler();
  initMoodboardFilters();
  initAspectRatioSelector();
  initABTestingSimulator();
});

// 1. Navigation Tab Switching
function initNavTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// 2. Interactive Prompt Compiler
function initPromptCompiler() {
  const subjectInput = document.getElementById('prompt-subject');
  const styleSelect = document.getElementById('prompt-style');
  const lightingSelect = document.getElementById('prompt-lighting');
  const cameraSelect = document.getElementById('prompt-camera');
  const moodSelect = document.getElementById('prompt-mood');
  const cfgSlider = document.getElementById('cfg-slider');
  const cfgVal = document.getElementById('cfg-val');
  const compiledDisplay = document.getElementById('compiled-prompt-text');
  const copyBtn = document.getElementById('btn-copy-prompt');

  let currentRatio = '1:1';

  function updateCompiledPrompt() {
    const subject = subjectInput ? subjectInput.value.trim() : 'Smart energy hub charging station';
    const style = styleSelect ? styleSelect.value : 'Hyper-detailed 3D octane render';
    const lighting = lightingSelect ? lightingSelect.value : 'Dramatic volumetric neon rim lighting';
    const camera = cameraSelect ? cameraSelect.value : '85mm lens, f/1.8, cinematic macro angle';
    const mood = moodSelect ? moodSelect.value : 'Electric Cyan and Deep Obsidian palette';
    const cfg = cfgSlider ? cfgSlider.value : '7.5';

    const fullPrompt = `${subject}, ${style}, ${lighting}, ${camera}, ${mood}, 8k resolution, photorealistic textures, clean isolated composition --ar ${currentRatio} --cfg ${cfg} --seed 849204`;

    if (compiledDisplay) {
      compiledDisplay.textContent = fullPrompt;
    }
  }

  // Event Listeners for inputs
  [subjectInput, styleSelect, lightingSelect, cameraSelect, moodSelect].forEach(el => {
    if (el) el.addEventListener('input', updateCompiledPrompt);
  });

  if (cfgSlider && cfgVal) {
    cfgSlider.addEventListener('input', () => {
      cfgVal.textContent = cfgSlider.value;
      updateCompiledPrompt();
    });
  }

  // Aspect ratio buttons inside prompt builder
  const ratioBtns = document.querySelectorAll('.ratio-btn');
  ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ratioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRatio = btn.getAttribute('data-ratio') || '1:1';
      updateCompiledPrompt();
    });
  });

  // Initial compilation
  updateCompiledPrompt();

  // Copy to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (compiledDisplay) {
        navigator.clipboard.writeText(compiledDisplay.textContent).then(() => {
          showToast('📋 Compiled prompt copied to clipboard!');
        }).catch(() => {
          showToast('Prompt ready for deployment.');
        });
      }
    });
  }
}

// 3. Moodboard Category Filtering
function initMoodboardFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.concept-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Aspect Ratio Layout Switcher
function initAspectRatioSelector() {
  const layoutBtns = document.querySelectorAll('.layout-ratio-btn');
  const layoutContainer = document.getElementById('template-preview-box');

  if (!layoutBtns.length || !layoutContainer) return;

  layoutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const ratio = btn.getAttribute('data-layout');
      if (ratio === '1:1') {
        layoutContainer.style.width = '320px';
        layoutContainer.style.height = '320px';
      } else if (ratio === '9:16') {
        layoutContainer.style.width = '240px';
        layoutContainer.style.height = '426px';
      } else if (ratio === '1.91:1') {
        layoutContainer.style.width = '420px';
        layoutContainer.style.height = '220px';
      }
      showToast(`📐 Switched template to ${ratio} format`);
    });
  });
}

// 5. A/B Testing Simulator Calculation
function initABTestingSimulator() {
  const budgetSlider = document.getElementById('ad-budget-slider');
  const budgetVal = document.getElementById('budget-display');
  const imprA = document.getElementById('impr-a');
  const imprB = document.getElementById('impr-b');
  const clicksA = document.getElementById('clicks-a');
  const clicksB = document.getElementById('clicks-b');
  const convA = document.getElementById('conv-a');
  const convB = document.getElementById('conv-b');

  function calculateMetrics() {
    const budget = budgetSlider ? parseInt(budgetSlider.value) : 10000;
    if (budgetVal) {
      budgetVal.textContent = `₹${budget.toLocaleString()}`;
    }

    // Variant A: Baseline (CTR 2.4%, Conv 4.2%)
    const impressionsA = Math.round(budget * 12.5);
    const cA = Math.round(impressionsA * 0.024);
    const cvA = Math.round(cA * 0.042);

    // Variant B: AI-Optimized CTA & Visual (CTR 4.1%, Conv 6.8%)
    const impressionsB = Math.round(budget * 12.5);
    const cB = Math.round(impressionsB * 0.041);
    const cvB = Math.round(cB * 0.068);

    if (imprA) imprA.textContent = impressionsA.toLocaleString();
    if (imprB) imprB.textContent = impressionsB.toLocaleString();
    if (clicksA) clicksA.textContent = cA.toLocaleString();
    if (clicksB) clicksB.textContent = cB.toLocaleString();
    if (convA) convA.textContent = cvA.toLocaleString();
    if (convB) convB.textContent = cvB.toLocaleString();
  }

  if (budgetSlider) {
    budgetSlider.addEventListener('input', calculateMetrics);
    calculateMetrics();
  }
}

// 6. Global Toast Helper
function showToast(msg) {
  let toast = document.getElementById('workflow-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'workflow-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
