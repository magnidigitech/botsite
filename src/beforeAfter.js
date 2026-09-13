/**
 * Interactive Before & After Comparison Slider for Featured Concept Project
 */

export function initBeforeAfter() {
  const container = document.getElementById('before-after-container');
  const sliderInput = document.getElementById('before-after-slider');
  const afterLayer = document.getElementById('before-after-layer');

  if (!container || !sliderInput || !afterLayer) return;

  const updatePosition = (value) => {
    afterLayer.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
  };

  sliderInput.addEventListener('input', (e) => {
    updatePosition(e.target.value);
  });

  // Initial position at 50%
  updatePosition(50);
}
