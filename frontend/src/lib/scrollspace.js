// AFScrollSpace — a scroll-driven 3D "flight through space".
// The camera flies forward (−Z) through a corridor of varied 3D objects as
// the user scrolls. Tuned for a light (white / sky-blue) background.
//
//   const ctrl = AFScrollSpace(container);
//   ctrl.setProgress(0..1)   // drive the camera from scroll
//   ctrl.destroy();
//
// Stations (objects placed along the path), front → back:
//   0  torus knot       (sky blue)     — "the spark / the idea"
//   1  icosa crystal    (indigo)       — "validate & refine"
//   2  torus ring       (teal)         — "structure the company"
//   3  cube swarm       (sky)          — "systems & technology"
//   4  big dodecahedron (spectrum)     — "launch & scale"

import * as THREE from 'three';

export function AFScrollSpace(container, opts = {}) {
  if (typeof THREE === 'undefined') { console.warn('AFScrollSpace: THREE missing'); return { setProgress(){}, destroy(){} }; }

  const SKY = 0x2E9FE0, INDIGO = 0x818CF8, TEAL = 0x2DD4BF;
  const w = () => container.clientWidth || window.innerWidth;
  const h = () => container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xEAF2FE, 30, 120);

  const camera = new THREE.PerspectiveCamera(55, w() / h(), 0.1, 400);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w(), h());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';

  // ---- lighting (soft, for light bg) ----
  scene.add(new THREE.AmbientLight(0xCFE3FB, 1.25));
  const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(4, 6, 8); scene.add(key);
  const pSky = new THREE.PointLight(SKY, 34, 60); scene.add(pSky);
  const pInd = new THREE.PointLight(INDIGO, 28, 60); scene.add(pInd);
  const pTeal = new THREE.PointLight(TEAL, 22, 60); scene.add(pTeal);

  // Brighter materials: strong self-emission so each object reads as its true
  // vivid hue (SKY / INDIGO / TEAL) instead of a dark, shaded surface.
  function solid(color) { return new THREE.MeshStandardMaterial({ color, metalness: 0.1, roughness: 0.28, emissive: new THREE.Color(color).multiplyScalar(0.55), emissiveIntensity: 1.0 }); }
  function wire(color, opacity) { return new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity }); }

  // ---- stations ----
  const stations = [];
  function station(z, mesh, shell, spin) {
    const g = new THREE.Group(); g.position.z = z;
    g.add(mesh); if (shell) g.add(shell);
    scene.add(g);
    stations.push({ g, mesh, shell, spin, z });
    return g;
  }

  // 0 — torus knot
  station(0,
    new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32, 2, 3), solid(SKY)),
    new THREE.Mesh(new THREE.IcosahedronGeometry(2.7, 1), wire(INDIGO, 0.22)),
    { x: 0.004, y: 0.006 });

  // 1 — icosahedron crystal
  station(-34,
    new THREE.Mesh(new THREE.IcosahedronGeometry(2.0, 0), solid(INDIGO)),
    new THREE.Mesh(new THREE.IcosahedronGeometry(3.0, 1), wire(SKY, 0.2)),
    { x: 0.006, y: 0.004 });

  // 2 — torus ring (tilted)
  {
    const m = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.42, 24, 90), solid(TEAL));
    m.rotation.x = 1.1;
    station(-70, m,
      new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 8, 90), wire(INDIGO, 0.5)),
      { x: 0.002, y: 0.01 });
  }

  // 3 — cube swarm
  {
    const swarm = new THREE.Group();
    const cgeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cmat = solid(SKY);
    for (let i = 0; i < 26; i++) {
      const c = new THREE.Mesh(cgeo, cmat);
      const r = 1.4 + Math.random() * 2.2, a = Math.random() * Math.PI * 2, yy = (Math.random() - 0.5) * 4;
      c.position.set(Math.cos(a) * r, yy, Math.sin(a) * r);
      c.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      swarm.add(c);
    }
    station(-104, swarm, null, { x: 0.003, y: 0.008 });
  }

  // 4 — big dodecahedron (destination)
  station(-140,
    new THREE.Mesh(new THREE.DodecahedronGeometry(2.6, 0), solid(INDIGO)),
    new THREE.Mesh(new THREE.DodecahedronGeometry(3.4, 0), wire(TEAL, 0.3)),
    { x: 0.004, y: 0.005 });

  // ---- starfield (depth dust spanning the corridor) ----
  const N = 900;
  const sGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    sp[i*3]   = (Math.random() - 0.5) * 36;
    sp[i*3+1] = (Math.random() - 0.5) * 26;
    sp[i*3+2] = 14 - Math.random() * 170;
  }
  sGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0x6FA8DC, size: 0.08, transparent: true, opacity: 0.55, depthWrite: false }));
  scene.add(stars);

  // ---- scroll + interaction state ----
  const Z_START = 14, Z_END = -126;
  let targetProg = 0, curProg = 0;
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  function onMove(e) { tmx = (e.clientX / window.innerWidth - 0.5); tmy = (e.clientY / window.innerHeight - 0.5); }
  window.addEventListener('pointermove', onMove);

  let raf, alive = true;
  function tick() {
    if (!alive) return;
    raf = requestAnimationFrame(tick);
    curProg += (targetProg - curProg) * 0.06;
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;

    camera.position.z = Z_START + (Z_END - Z_START) * curProg;
    camera.position.x = mx * 2.2;
    camera.position.y = -my * 1.6;
    camera.lookAt(0, 0, camera.position.z - 10);

    // colored lights track the camera so whatever object we're at is lit
    pSky.position.set(6, 4, camera.position.z - 6);
    pInd.position.set(-6, -3, camera.position.z - 12);
    pTeal.position.set(0, 6, camera.position.z - 20);

    stations.forEach(s => {
      s.g.rotation.x += s.spin.x;
      s.g.rotation.y += s.spin.y;
      if (s.shell) { s.shell.rotation.y -= s.spin.y * 1.4; s.shell.rotation.x += s.spin.x * 0.6; }
    });
    stars.rotation.z += 0.0004;
    renderer.render(scene, camera);
  }
  tick();

  function onResize() { camera.aspect = w() / h(); camera.updateProjectionMatrix(); renderer.setSize(w(), h()); }
  const ro = new ResizeObserver(onResize); ro.observe(container);
  window.addEventListener('resize', onResize);

  return {
    setProgress(p) { targetProg = Math.max(0, Math.min(1, p)); },
    destroy() {
      alive = false; cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
}
