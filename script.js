/* =====================================================
   SIMULACRE script.js
   Snow + lantern particles, typewriter, reveal effects
   ===================================================== */

(function initParticles() {
  const canvas = document.getElementById('bg');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

  const SNOW = 1200;
  const snowPos = new Float32Array(SNOW * 3);
  const snowVel = new Float32Array(SNOW);
  const snowSwg = new Float32Array(SNOW);

  for (let i = 0; i < SNOW; i++) {
    snowPos[i * 3] = (Math.random() - 0.5) * 100;
    snowPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    snowPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    snowVel[i] = 0.008 + Math.random() * 0.014;
    snowSwg[i] = Math.random() * Math.PI * 2;
  }

  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));

  const snowMat = new THREE.PointsMaterial({
    color: 0xd8f0f8,
    size: 0.18,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const snowPoints = new THREE.Points(snowGeo, snowMat);
  scene.add(snowPoints);

  const LANTERN = 45;
  const lanPos = new Float32Array(LANTERN * 3);
  const lanVel = new Float32Array(LANTERN);
  const lanSwg = new Float32Array(LANTERN);

  for (let i = 0; i < LANTERN; i++) {
    lanPos[i * 3] = (Math.random() - 0.5) * 90;
    lanPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    lanPos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    lanVel[i] = 0.015 + Math.random() * 0.02;
    lanSwg[i] = Math.random() * Math.PI * 2;
  }

  const lanGeo = new THREE.BufferGeometry();
  lanGeo.setAttribute('position', new THREE.BufferAttribute(lanPos, 3));

  const lanMat = new THREE.PointsMaterial({
    color: 0xd4922a,
    size: 0.45,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const lanPoints = new THREE.Points(lanGeo, lanMat);
  scene.add(lanPoints);

  let mx = 0;
  let my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / innerWidth - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;
  });

  let t = 0;

  function tick() {
    requestAnimationFrame(tick);
    t += 0.016;

    const sPos = snowGeo.attributes.position.array;
    for (let i = 0; i < SNOW; i++) {
      sPos[i * 3 + 1] -= snowVel[i];
      sPos[i * 3] += Math.sin(t * 0.4 + snowSwg[i]) * 0.003;
      if (sPos[i * 3 + 1] < -40) {
        sPos[i * 3 + 1] = 40;
        sPos[i * 3] = (Math.random() - 0.5) * 100;
      }
    }
    snowGeo.attributes.position.needsUpdate = true;

    const lPos = lanGeo.attributes.position.array;
    for (let i = 0; i < LANTERN; i++) {
      lPos[i * 3 + 1] += lanVel[i];
      lPos[i * 3] += Math.sin(t * 0.5 + lanSwg[i]) * 0.005;
      if (lPos[i * 3 + 1] > 42) {
        lPos[i * 3 + 1] = -42;
        lPos[i * 3] = (Math.random() - 0.5) * 90;
      }
    }
    lanGeo.attributes.position.needsUpdate = true;

    camera.position.x += (mx * 2 - camera.position.x) * 0.01;
    camera.position.y += (-my - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  tick();

  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const text = '세계관 운영 기준 로딩 중';
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i) + (i < text.length ? '|' : '');
      i += 1;
      setTimeout(type, i === 1 ? 800 : 80);
    } else {
      el.textContent = text;
      let vis = true;
      setInterval(() => {
        el.textContent = text + (vis ? '|' : '');
        vis = !vis;
      }, 700);
    }
  }

  setTimeout(type, 400);
})();

(function scrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const singles = document.querySelectorAll(
    '.chayon-portrait, .chayon-info, .spawn-badge, .emptines-screens, .emptines-info, .worlds-header, .creator-inner, .foot-world, .foot-bio'
  );

  singles.forEach((el) => {
    el.classList.add('reveal-up');
    obs.observe(el);
  });

  let cardIdx = 0;
  document.querySelectorAll('.wc').forEach((card) => {
    card.classList.add('reveal-up');
    card.style.transitionDelay = `${(cardIdx % 3) * 0.12}s`;
    cardIdx += 1;
    obs.observe(card);
  });
})();

(function cardHover() {
  document.querySelectorAll('.wc').forEach((card) => {
    const zone = card.querySelector('.wc-zone');
    if (!zone) return;

    card.addEventListener('mouseenter', () => {
      zone.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      zone.style.opacity = '';
    });
  });
})();

(function navHighlight() {
  const sections = document.querySelectorAll('#hero, #chayon, #emptines, #worlds, #creator');
  const logo = document.querySelector('.nav-logo');

  const colors = {
    hero: '#00c4a4',
    chayon: '#00c4a4',
    emptines: '#00c4a4',
    worlds: '#d4922a',
    creator: '#d4922a',
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3 && logo && colors[entry.target.id]) {
          logo.style.color = colors[entry.target.id];
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => obs.observe(section));
})();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
