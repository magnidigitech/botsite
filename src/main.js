import { initHeroShowcase } from './heroShowcase.js';
import { initCustomCursor } from './customCursor.js';
import { initBeforeAfter } from './beforeAfter.js';
import { projectMockups } from './projectPreviews.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Hero Showcase
  initHeroShowcase();

  // 2. Initialize Custom Precision Cursor
  initCustomCursor();

  // 3. Initialize Interactive Before & After Slider
  initBeforeAfter();

  // 4. Load Project Mockup Vector Previews
  loadProjectMockups();

  // 5. Setup Navigation & Mobile Drawer
  setupNavigation();

  // 6. Setup Services Accordion
  setupServicesAccordion();

  // 7. Setup Philosophy Interactive Mockup Tabs
  setupPhilosophyMockup();

  // 8. Setup Project Inquiry Modal ("Start a project" Flow)
  setupInquiryModal();

  // 9. Dynamic Footer Year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Load high-quality vector previews into work cards
 */
function loadProjectMockups() {
  const imgAetheria = document.getElementById('img-mockup-aetheria');
  const imgAetheriaBefore = document.getElementById('img-mockup-aetheria-before');
  const imgLumina = document.getElementById('img-mockup-lumina');
  const imgKineo = document.getElementById('img-mockup-kineo');

  if (imgAetheria) imgAetheria.src = projectMockups.aetheria;
  if (imgAetheriaBefore) imgAetheriaBefore.src = projectMockups.aetheriaBefore;
  if (imgLumina) imgLumina.src = projectMockups.lumina;
  if (imgKineo) imgKineo.src = projectMockups.kineo;
}

/**
 * Mobile Navigation Drawer Toggle & Smooth Scroll
 */
function setupNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const overlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-panel button');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      overlay.classList.toggle('is-active', !isExpanded);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
      });
    });
  }
}

/**
 * Services Accordion Logic
 */
function setupServicesAccordion() {
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    const header = item.querySelector('.service-header');
    if (!header) return;

    const toggle = () => {
      const isCurrentlyExpanded = item.classList.contains('is-expanded');
      
      // Close other items
      serviceItems.forEach((other) => {
        other.classList.remove('is-expanded');
        const otherHeader = other.querySelector('.service-header');
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isCurrentlyExpanded) {
        item.classList.add('is-expanded');
        header.setAttribute('aria-expanded', 'true');
      }
    };

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/**
 * Philosophy Mockup Interactive Tab Switcher
 */
function setupPhilosophyMockup() {
  const btnLayout = document.getElementById('btn-tab-layout');
  const btnTokens = document.getElementById('btn-tab-tokens');
  const btnCode = document.getElementById('btn-tab-code');
  const viewport = document.getElementById('mockup-viewport-content');

  if (!viewport) return;

  const contentViews = {
    layout: `
      <div style="display: flex; flex-direction: column; gap: 12px; height: 100%; justify-content: center;">
        <div style="height: 24px; width: 40%; background: rgba(255,255,255,0.15); border-radius: 6px;"></div>
        <div style="height: 50px; width: 85%; background: rgba(52,92,255,0.2); border: 1px stroke rgba(52,92,255,0.5); border-radius: 8px;"></div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
          <div style="height: 100px; background: rgba(255,255,255,0.06); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.15);"></div>
          <div style="height: 100px; background: rgba(255,255,255,0.06); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.15);"></div>
        </div>
      </div>
    `,
    tokens: `
      <div style="font-family: monospace; font-size: 0.825rem; color: #9DA4B0; display: flex; flex-direction: column; gap: 8px; justify-content: center; height: 100%;">
        <div><span style="color: #345CFF;">--bg-ivory</span>: #F5F4F0;</div>
        <div><span style="color: #345CFF;">--text-graphite</span>: #17191C;</div>
        <div><span style="color: #345CFF;">--accent-blue</span>: #345CFF;</div>
        <div><span style="color: #345CFF;">--font-display</span>: 'Outfit', sans-serif;</div>
        <div><span style="color: #345CFF;">--border-subtle</span>: rgba(23, 25, 28, 0.09);</div>
      </div>
    `,
    code: `
      <div style="font-family: monospace; font-size: 0.8rem; color: #F5F4F0; display: flex; flex-direction: column; gap: 6px; justify-content: center; height: 100%;">
        <div><span style="color: #345CFF;">const</span> studio = <span style="color: #27C93F;">new</span> Studio({</div>
        <div style="padding-left: 16px;">craft: <span style="color: #FFBD2E;">"meticulous"</span>,</div>
        <div style="padding-left: 16px;">performance: <span style="color: #FFBD2E;">"fast"</span>,</div>
        <div style="padding-left: 16px;">sculpture: <span style="color: #FFBD2E;">"WebGL 3D"</span></div>
        <div>});</div>
      </div>
    `
  };

  // Initial render
  viewport.innerHTML = contentViews.layout;

  const setActiveTab = (activeBtn, key) => {
    [btnLayout, btnTokens, btnCode].forEach((btn) => {
      if (btn) btn.classList.remove('is-active');
    });
    if (activeBtn) activeBtn.classList.add('is-active');
    viewport.innerHTML = contentViews[key];
  };

  if (btnLayout) btnLayout.addEventListener('click', () => setActiveTab(btnLayout, 'layout'));
  if (btnTokens) btnTokens.addEventListener('click', () => setActiveTab(btnTokens, 'tokens'));
  if (btnCode) btnCode.addEventListener('click', () => setActiveTab(btnCode, 'code'));
}

/**
 * Project Inquiry Modal Logic & Form Validation
 */
function setupInquiryModal() {
  const dialog = document.getElementById('inquiry-modal');
  const triggerBtns = document.querySelectorAll('.btn-trigger-inquiry');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('inquiry-form');
  const successState = document.getElementById('modal-success-state');
  const resetBtn = document.getElementById('modal-reset-btn');

  if (!dialog) return;

  // Open modal handler
  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', 'true');
      }
    });
  });

  // Close modal handler
  const closeModal = () => {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Fallback for browsers without native `closedby` backdrop light-dismiss
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInsideContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInsideContent) {
        closeModal();
      }
    });
  }

  // Form Validation & Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('input-name');
      const emailInput = document.getElementById('input-email');
      const descInput = document.getElementById('input-desc');

      let isValid = true;

      // Validate Name
      const groupName = document.getElementById('group-name');
      if (!nameInput.value.trim()) {
        groupName.classList.add('has-error');
        isValid = false;
      } else {
        groupName.classList.remove('has-error');
      }

      // Validate Email
      const groupEmail = document.getElementById('group-email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        groupEmail.classList.add('has-error');
        isValid = false;
      } else {
        groupEmail.classList.remove('has-error');
      }

      // Validate Description
      const groupDesc = document.getElementById('group-desc');
      if (!descInput.value.trim()) {
        groupDesc.classList.add('has-error');
        isValid = false;
      } else {
        groupDesc.classList.remove('has-error');
      }

      if (isValid) {
        // Show success state
        form.style.display = 'none';
        if (successState) successState.style.display = 'flex';
      }
    });
  }

  // Reset Modal Form
  if (resetBtn && form && successState) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'flex';
      successState.style.display = 'none';
      closeModal();
    });
  }
}
