// ===== helpers =====
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function animateCount(el, target, duration = 1600) {
  if (el.__animated) return;         // evita reanimar
  el.__animated = true;

  const start = performance.now();
  const from = 0;

  function frame(now) {
    const p = Math.min(1, (now - start) / duration);
    const value = Math.floor(from + (target - from) * easeOutCubic(p));
    el.textContent = value.toLocaleString();
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(frame);
}

// ===== DOM ready =====
document.addEventListener('DOMContentLoaded', () => {
  // Contadores: observador para iniciar quando aparecer
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.dataset.value || 0);
          animateCount(el, target, 1600);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(el => io.observe(el));
  }

  // Navegação ativa + header shrink (throttle com rAF)
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('nav a.nav-btn')];
  const header = document.querySelector('header');

  let ticking = false;
  function onScroll() {
    const y = window.scrollY + 120;

    // link ativo
    let current = '';
    for (const s of sections) if (y >= s.offsetTop) current = s.id;
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // header shrink
    header.classList.toggle('is-scrolled', window.scrollY > 20);

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  // dispara uma vez no load
  onScroll();
});
