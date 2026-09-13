/**
 * Real-World Business Scenarios for Hero Showcase — One Brand, Three Possibilities
 * Fictional Real-World Client Brand: VALO LIGHTING (Architectural Lighting & Fixtures)
 * Demonstrates 3 realistic, highly relatable design directions for a real business product.
 */

export function initHeroShowcase() {
  const card = document.getElementById('hero-showcase-card');
  const desktopViewport = document.getElementById('showcase-desktop-viewport');
  const mobileViewport = document.getElementById('showcase-mobile-viewport');
  const selectorBtns = document.querySelectorAll('.concept-selector-btn');
  const styleCTALink = document.getElementById('showcase-cta-link');
  const directionInput = document.getElementById('input-direction');

  if (!card || !desktopViewport || !mobileViewport) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Real-world client scenario: VALO LIGHTING across 3 distinct understandable website styles
  const styles = {
    minimal: {
      name: 'Minimal',
      url: 'valo-lighting.com/minimal-store',
      desktop: `
        <div class="brand-style-view style-minimal">
          <header class="min-nav">
            <span class="min-logo">VALO LIGHTING</span>
            <div class="min-menu">
              <span>Fixtures</span>
              <span>Projects</span>
              <span>About</span>
              <span>Cart (0)</span>
            </div>
          </header>
          
          <div class="min-hero">
            <span class="min-tag">ARCHITECTURAL COLLECTION</span>
            <h2 class="min-heading">Architectural lighting for modern spaces.</h2>
            <p class="min-sub">Handcrafted brass pendants, linear recessed fixtures, and intelligent dimming controls.</p>
            
            <div class="min-grid">
              <div class="min-card">
                <div class="min-img-placeholder">
                  <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
                    <!-- Lamp Pendant Illustration -->
                    <line x1="100" y1="10" x2="100" y2="55" stroke="#17191C" stroke-width="2"/>
                    <path d="M 70 55 Q 100 35 130 55 Z" fill="#345CFF"/>
                    <ellipse cx="100" cy="55" rx="30" ry="6" fill="#17191C"/>
                    <path d="M 80 61 L 60 100 L 140 100 L 120 61 Z" fill="rgba(52,92,255,0.12)"/>
                  </svg>
                </div>
                <div class="min-card-info">
                  <span>KOBE BRASS PENDANT</span>
                  <span class="min-val">$480.00</span>
                </div>
              </div>
              
              <div class="min-card">
                <div class="min-img-placeholder">
                  <svg width="100%" height="100%" viewBox="0 0 200 120" fill="none">
                    <!-- Linear Bar Light Illustration -->
                    <rect x="30" y="45" width="140" height="12" rx="6" fill="#17191C"/>
                    <rect x="40" y="47" width="120" height="8" rx="4" fill="#345CFF"/>
                    <line x1="60" y1="10" x2="60" y2="45" stroke="#17191C" stroke-width="1.5"/>
                    <line x1="140" y1="10" x2="140" y2="45" stroke="#17191C" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="min-card-info">
                  <span>SLIM LINEAR FIXTURE</span>
                  <span class="min-val">$620.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      mobile: `
        <div class="brand-style-view style-minimal">
          <span class="min-logo">VALO</span>
          <h3 class="min-heading" style="font-size: 1.05rem; margin-top: 6px;">Architectural Lighting</h3>
          <div class="min-img-placeholder" style="height: 110px; margin-top: 8px;">
            <svg width="100%" height="100%" viewBox="0 0 140 100" fill="none">
              <line x1="70" y1="10" x2="70" y2="45" stroke="#17191C" stroke-width="2"/>
              <path d="M 45 45 Q 70 30 95 45 Z" fill="#345CFF"/>
            </svg>
          </div>
          <div style="font-size: 0.65rem; font-weight: 700; color: #17191C; margin-top: 4px;">Kobe Brass — $480</div>
        </div>
      `
    },
    bold: {
      name: 'Bold',
      url: 'valo-lighting.com/bold-storefront',
      desktop: `
        <div class="brand-style-view style-bold">
          <header class="bold-nav">
            <span class="bold-logo">VALO LIGHTING //</span>
            <div class="bold-menu">
              <span>Catalog</span>
              <span>Commercial</span>
              <span class="bold-cart-badge">Cart [2]</span>
            </div>
          </header>
          
          <div class="bold-hero">
            <div class="bold-hero-header">
              <span class="bold-badge">NEW ARRIVAL</span>
              <span class="bold-glow-tag">2026 DESIGN AWARD WINNER</span>
            </div>
            <h2 class="bold-heading">LIGHT THAT TRANSFORMS SPACES.</h2>
            <p class="bold-sub">Precision-engineered architectural LED fixtures built for modern residences, offices, and art galleries.</p>
            
            <div class="bold-visual-container" style="justify-content: space-around; padding: 0 16px;">
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 0.65rem; color: #9DA4B0; font-weight: 700;">FEATURED FIXTURE</span>
                <span style="font-size: 0.95rem; font-weight: 800; color: #ffffff;">APEX LINEAR SYSTEM</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: #345CFF;">3000K WARM WHITE</span>
                <span class="bold-price">$850.00</span>
              </div>
            </div>

            <div class="bold-actions">
              <span class="bold-btn">SHOP COLLECTION &rarr;</span>
              <span style="font-size: 0.7rem; color: #9DA4B0; font-weight: 600;">FREE SHIPPING WORLDWIDE</span>
            </div>
          </div>
        </div>
      `,
      mobile: `
        <div class="brand-style-view style-bold">
          <span class="bold-logo">VALO ARCHITECTURAL</span>
          <h3 class="bold-heading" style="font-size: 1.15rem; margin-top: 6px;">LIGHT TRANSFORMS</h3>
          <p style="font-size: 0.65rem; color: #9DA4B0;">Apex Linear Fixture System</p>
          <span class="bold-btn" style="margin-top: 8px; font-size: 0.7rem;">SHOP $850 &rarr;</span>
        </div>
      `
    },
    editorial: {
      name: 'Editorial',
      url: 'valo-lighting.com/editorial-journal',
      desktop: `
        <div class="brand-style-view style-editorial">
          <header class="edit-nav">
            <span class="edit-logo">Valo Journal</span>
            <div class="edit-menu">
              <span>Stories</span>
              <span>Projects</span>
              <span>Catalog</span>
            </div>
          </header>
          
          <div class="edit-hero">
            <div class="edit-meta-row">
              <span class="edit-issue">CASE STUDY // STOCKHOLM LOFT</span>
              <span class="edit-date">INTERIOR ARCHITECTURE</span>
            </div>
            <h2 class="edit-heading">Designing with Light and Shadow.</h2>
            <p class="edit-sub">How recessed warm LED channels and hand-spun brass pendants transformed a 1920s warehouse into a calm residential loft.</p>
            
            <div class="edit-feature-card">
              <div class="edit-img-placeholder" style="background: linear-gradient(135deg, #17191C 0%, #345CFF 100%); display: flex; align-items: center; justify-content: center;">
                <span style="font-family: Georgia, serif; font-style: italic; color: #ffffff; font-size: 0.85rem;">Stockholm Residence Project — Valo Custom Lighting</span>
              </div>
              <p class="edit-caption">Interior Architecture by Studio NORD — Lighting Fixtures by Valo.</p>
            </div>
          </div>
        </div>
      `,
      mobile: `
        <div class="brand-style-view style-editorial">
          <span class="edit-logo">Valo Journal</span>
          <h3 class="edit-heading" style="font-size: 1.1rem; margin-top: 6px;">Light &amp; Shadow</h3>
          <p style="font-size: 0.65rem; color: #5A606C;">Stockholm Loft Case Study</p>
          <div class="edit-img-placeholder" style="height: 70px; margin-top: 6px; background: #17191C;"></div>
        </div>
      `
    }
  };

  let currentStyle = 'minimal';

  // Apply style switch
  function switchStyle(key) {
    const styleData = styles[key];
    if (!styleData) return;

    currentStyle = key;

    // Crossfade effect
    desktopViewport.style.opacity = '0';
    mobileViewport.style.opacity = '0';

    setTimeout(() => {
      desktopViewport.innerHTML = styleData.desktop;
      mobileViewport.innerHTML = styleData.mobile;

      const urlBar = document.getElementById('showcase-url-bar');
      if (urlBar) urlBar.textContent = styleData.url;

      desktopViewport.style.opacity = '1';
      mobileViewport.style.opacity = '1';
    }, 180);

    // Sync direction to inquiry form
    if (directionInput) {
      directionInput.value = `${styleData.name} Style Direction (VALO Scenario)`;
    }
  }

  // Initial render
  switchStyle('minimal');

  // Handle Selector Clicks
  selectorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-style');
      if (key && styles[key]) {
        selectorBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        switchStyle(key);
      }
    });
  });

  // CTA link below canvas connects to inquiry modal with pre-selected style
  if (styleCTALink) {
    styleCTALink.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('inquiry-modal');
      if (directionInput) {
        directionInput.value = `${styles[currentStyle].name} Style Direction`;
      }
      if (modal) {
        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', 'true');
        }
      }
    });
  }

  // 3D Perspective Tilt on Pointer Move
  if (!prefersReducedMotion) {
    const heroSection = document.getElementById('hero');
    let mouseX = 0, mouseY = 0;
    let currentTiltX = 0, currentTiltY = 0;

    const handlePointerMove = (e) => {
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 8;
      mouseY = -y * 8;
    };

    const handlePointerLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    if (heroSection) {
      heroSection.addEventListener('mousemove', handlePointerMove, { passive: true });
      heroSection.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    }

    const updateTilt = () => {
      currentTiltX += (mouseX - currentTiltX) * 0.08;
      currentTiltY += (mouseY - currentTiltY) * 0.08;

      if (card) {
        card.style.transform = `perspective(1000px) rotateY(${currentTiltX}deg) rotateX(${currentTiltY}deg)`;
      }

      requestAnimationFrame(updateTilt);
    };

    requestAnimationFrame(updateTilt);
  }
}
