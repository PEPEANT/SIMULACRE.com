(function initParticles() {
  const canvas = document.getElementById("bg");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 50);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const particleCount = 520;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);

  for (let index = 0; index < particleCount; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 110;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 95;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities[index] = 0.01 + Math.random() * 0.02;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x7ce1cc,
    size: 0.14,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let pointerX = 0;
  let pointerY = 0;

  window.addEventListener("mousemove", (event) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    const buffer = geometry.attributes.position.array;
    for (let index = 0; index < particleCount; index += 1) {
      buffer[index * 3 + 1] -= velocities[index];
      if (buffer[index * 3 + 1] < -50) {
        buffer[index * 3 + 1] = 50;
      }
    }
    geometry.attributes.position.needsUpdate = true;

    camera.position.x += (pointerX * 1.8 - camera.position.x) * 0.015;
    camera.position.y += (-pointerY * 1.2 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

(function typewriter() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  const text = "2045년, 공과 시뮬라크는 AI와 인간이 공존하는 도시로 진화한다";
  let index = 0;

  function tick() {
    if (index <= text.length) {
      element.textContent = `${text.slice(0, index)}${index < text.length ? "|" : ""}`;
      index += 1;
      window.setTimeout(tick, index === 1 ? 450 : 45);
      return;
    }

    element.textContent = text;
    let visible = true;
    window.setInterval(() => {
      element.textContent = `${text}${visible ? "|" : ""}`;
      visible = !visible;
    }, 650);
  }

  window.setTimeout(tick, 250);
})();

(function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal-up");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
})();

(function navSectionState() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sectionIds = links
    .map((link) => link.getAttribute("href"))
    .filter((href) => href && href.startsWith("#"))
    .map((href) => href.slice(1));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const activeLinkById = new Map(
    links.map((link) => [link.getAttribute("href")?.slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => link.classList.remove("is-active"));
      activeLinkById.get(visible.target.id)?.classList.add("is-active");
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.15, 0.35, 0.6],
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
