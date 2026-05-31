// AFScene3D — reusable animated 3D object for AXIONFORGE OS surfaces.
// Vanilla Three.js (global THREE from CDN). Mounts into a container element.
// Returns a controller with .destroy(). Exposed on window for React/Babel use.
//
//   const ctrl = AFScene3D(el, { shape: 'knot' | 'crystal' | 'sphere', accent, accent2 });
//
// Renders a chrome/holographic mesh lit by two colored rim lights (cyan +
// violet) to fake iridescence, a slowly-rotating wireframe shell, and a
// drifting particle field. Reacts subtly to pointer movement.

import * as THREE from 'three';

export function AFScene3D(container, opts = {}) {
  if (typeof THREE === 'undefined') {
    console.warn('AFScene3D: THREE not loaded');
    return { destroy() {} };
  }
  const accent  = new THREE.Color(opts.accent  || '#38BDF8'); // sky blue
  const accent2 = new THREE.Color(opts.accent2 || '#818CF8'); // indigo
  const accent3 = new THREE.Color(opts.accent3 || '#2DD4BF'); // teal
  const shape   = opts.shape || 'knot';

  const w = () => container.clientWidth || 600;
  const h = () => container.clientHeight || 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w(), h());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';

  // ---- main mesh ----
  let geo;
  if (shape === 'crystal') geo = new THREE.IcosahedronGeometry(1.7, 0);
  else if (shape === 'sphere') geo = new THREE.IcosahedronGeometry(1.7, 4);
  else geo = new THREE.TorusKnotGeometry(1.25, 0.42, 220, 32, 2, 3);

  const mat = new THREE.MeshStandardMaterial({
    color: 0x2E9FE0,
    metalness: 0.15,
    roughness: 0.42,
    emissive: new THREE.Color(0x0B3D66),
    emissiveIntensity: 0.25,
  });
  const mesh = new THREE.Mesh(geo, mat);

  // wireframe shell
  const shellGeo = new THREE.IcosahedronGeometry(2.55, 1);
  const shellMat = new THREE.MeshBasicMaterial({
    color: accent2, wireframe: true, transparent: true, opacity: 0.3,
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(shell);
  scene.add(group);

  // ---- lights ----
  scene.add(new THREE.AmbientLight(0x9fc4ef, 0.95));
  const l1 = new THREE.PointLight(accent.getHex(), 26, 40);
  l1.position.set(5, 3, 5);
  const l2 = new THREE.PointLight(accent2.getHex(), 20, 40);
  l2.position.set(-5, -2, 4);
  const l3 = new THREE.PointLight(accent3.getHex(), 14, 40);
  l3.position.set(0, 5, -4);
  const rim = new THREE.DirectionalLight(0xffffff, 0.5);
  rim.position.set(2, 4, 6);
  scene.add(l1, l2, l3, rim);

  // ---- particles ----
  const COUNT = 320;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 4 + Math.random() * 7;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
    pos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
    pos[i*3+2] = r * Math.cos(ph);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({
    color: accent, size: 0.05, transparent: true, opacity: 0.55,
    depthWrite: false,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ---- interaction ----
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  function onMove(e) {
    const rect = container.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = px * 0.6;
    targetY = py * 0.6;
  }
  window.addEventListener('pointermove', onMove);

  // ---- loop ----
  let raf, t = 0, alive = true;
  function tick() {
    if (!alive) return;
    raf = requestAnimationFrame(tick);
    t += 0.01;
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    group.rotation.y += 0.004;
    group.rotation.x = curY * 0.5 + Math.sin(t * 0.5) * 0.05;
    group.rotation.z += 0.0008;
    group.position.y = Math.sin(t * 0.8) * 0.12;
    shell.rotation.y -= 0.006;
    shell.rotation.x += 0.002;
    particles.rotation.y += 0.0006;
    camera.position.x += (curX * 1.4 - camera.position.x) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  tick();

  // ---- resize ----
  function onResize() {
    camera.aspect = w() / h();
    camera.updateProjectionMatrix();
    renderer.setSize(w(), h());
  }
  const ro = new ResizeObserver(onResize);
  ro.observe(container);

  return {
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      geo.dispose(); mat.dispose(); shellGeo.dispose(); shellMat.dispose();
      pGeo.dispose(); pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
}
