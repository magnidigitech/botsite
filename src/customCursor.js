/**
 * Custom Cursor Module for Botsite
 * Electric blue dot with smooth lerp trailing ring and contextual hover states.
 */

export function initCustomCursor() {
  // Check browser fine pointer and reduced motion preference
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) {
    return; // Preserve native cursor on touch or reduced motion
  }

  // Create cursor DOM elements
  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  dot.className = 'cursor-dot';

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.className = 'cursor-ring';
  ring.innerHTML = '<span class="cursor-label">View ↗</span>';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  // Mark body as active only after DOM append succeeds
  document.body.classList.add('custom-cursor-active');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isHovering = false;
  let isViewing = false;
  let isHidden = false;

  // Pointer position tracker
  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Immediate positioning for the precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Check if hovering text inputs or editable elements
    const target = e.target;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable
    ) {
      if (!isHidden) {
        isHidden = true;
        dot.classList.add('is-hidden');
        ring.classList.add('is-hidden');
      }
    } else {
      if (isHidden) {
        isHidden = false;
        dot.classList.remove('is-hidden');
        ring.classList.remove('is-hidden');
      }
    }

    // Check hover states over interactive elements
    const interactiveEl = target.closest('a, button, .btn-primary, .btn-secondary, .concept-selector-btn, .service-header');
    const workCardEl = target.closest('.work-card');

    if (workCardEl) {
      isViewing = true;
      isHovering = false;
      ring.classList.add('is-viewing');
      ring.classList.remove('is-hovering');
    } else if (interactiveEl) {
      isHovering = true;
      isViewing = false;
      ring.classList.add('is-hovering');
      ring.classList.remove('is-viewing');
    } else {
      isHovering = false;
      isViewing = false;
      ring.classList.remove('is-hovering');
      ring.classList.remove('is-viewing');
    }
  }, { passive: true });

  // Click Feedback
  window.addEventListener('mousedown', () => {
    dot.classList.add('is-active');
    ring.classList.add('is-active');
  });

  window.addEventListener('mouseup', () => {
    dot.classList.remove('is-active');
    ring.classList.remove('is-active');
  });

  // Smooth Lerp Animation Loop for Trailing Ring
  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(renderRing);
  };

  requestAnimationFrame(renderRing);
}
