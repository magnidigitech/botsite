import * as THREE from 'three';

/**
 * Custom 3D Sculpture Centerpiece for Botsite
 * Features interlocking forms forming an abstract "B",
 * brushed graphite metal, translucent glass, and an electric blue accent core.
 */
export function initSculpture(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check for WebGL capability and reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer, scene, camera, sculptureGroup;
  let animationFrameId;
  let isVisible = true;

  // Mouse interaction targets
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  try {
    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas if any
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting Environment (Quiet, Soft Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xf5f4f0, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x345cff, 3.0); // Electric Blue Rim Light
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 1.0, 20);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // 5. Build Sculptural Interlocking "B" Geometry
    sculptureGroup = new THREE.Group();

    // Material 1: Brushed Metallic Graphite
    const graphiteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x17191c,
      metalness: 0.88,
      roughness: 0.28,
      clearcoat: 0.4,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9
    });

    // Material 2: Translucent Smoked Glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0f2f5,
      transmission: 0.88,
      opacity: 0.85,
      transparent: true,
      roughness: 0.18,
      ior: 1.52,
      thickness: 1.4,
      reflectivity: 0.95
    });

    // Material 3: Electric Blue Core Accent
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x345cff,
      emissive: 0x345cff,
      emissiveIntensity: 0.75,
      roughness: 0.2
    });

    // Form A: Upper Loop & Spine (Brushed Graphite Torus Curve)
    const upperLoopGeo = new THREE.TorusGeometry(1.05, 0.32, 32, 100, Math.PI * 1.5);
    const upperMesh = new THREE.Mesh(upperLoopGeo, graphiteMaterial);
    upperMesh.position.set(-0.25, 0.75, 0);
    upperMesh.rotation.x = Math.PI * 0.15;
    upperMesh.rotation.y = Math.PI * 0.2;
    sculptureGroup.add(upperMesh);

    // Form B: Lower Interlocking Loop (Smoked Glass Torus Curve)
    const lowerLoopGeo = new THREE.TorusGeometry(1.25, 0.34, 32, 100, Math.PI * 1.6);
    const lowerMesh = new THREE.Mesh(lowerLoopGeo, glassMaterial);
    lowerMesh.position.set(0.15, -0.65, 0.25);
    lowerMesh.rotation.x = -Math.PI * 0.25;
    lowerMesh.rotation.y = -Math.PI * 0.35;
    lowerMesh.rotation.z = Math.PI * 0.4;
    sculptureGroup.add(lowerMesh);

    // Form C: Interlocking Connecting Node
    const spineGeo = new THREE.CylinderGeometry(0.32, 0.32, 2.4, 32);
    const spineMesh = new THREE.Mesh(spineGeo, graphiteMaterial);
    spineMesh.position.set(-0.85, 0.05, -0.1);
    spineMesh.rotation.z = Math.PI * 0.05;
    sculptureGroup.add(spineMesh);

    // Form D: Electric Blue Core Accent Ring
    const coreAccentGeo = new THREE.TorusGeometry(0.45, 0.08, 24, 64);
    const coreAccentMesh = new THREE.Mesh(coreAccentGeo, accentMaterial);
    coreAccentMesh.position.set(-0.15, 0.1, 0.3);
    coreAccentMesh.rotation.x = Math.PI * 0.5;
    sculptureGroup.add(coreAccentMesh);

    scene.add(sculptureGroup);

    // 6. Interaction Event Handlers
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 0.6;
      mouseY = (y / rect.height - 0.5) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Responsive Resize Observer
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 8. Intersection Observer to Pause Rendering When Offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 9. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (!prefersReducedMotion) {
        // Slow perpetual autorotation
        sculptureGroup.rotation.y += 0.0035;

        // Smooth spring-dampened mouse parallax response
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        sculptureGroup.rotation.x = targetY * 0.4;
        sculptureGroup.position.y = Math.sin(Date.now() * 0.001) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

  } catch (err) {
    console.warn('WebGL initialization failed, falling back to static visual:', err);
    renderFallbackSculpture(container);
  }
}

/**
 * Fallback static vector representation if WebGL is unavailable
 */
function renderFallbackSculpture(container) {
  container.innerHTML = `
    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #edece6; border-radius: 20px;">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 40 H110 C135 40 155 55 155 80 C155 98 142 112 125 117 C148 123 162 140 162 162 C162 190 138 200 110 200 H60 V40 Z" fill="#17191C" opacity="0.9"/>
        <circle cx="110" cy="80" r="18" fill="#F5F4F0"/>
        <circle cx="110" cy="155" r="22" fill="#345CFF"/>
      </svg>
    </div>
  `;
}
