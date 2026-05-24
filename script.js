/* ===========================
   CHURRERÍA FREITAS — script.js
   =========================== */

// ── Navbar scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ── Menú móvil ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

// Overlay para cerrar al pulsar fuera
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function openMenu() {
  navMenu.classList.add('open');
  navToggle.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Cerrar al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ── Tabla de cantidades churros/porras ─────────────────
const precios = {
  porras:  0.60,
  churros: 0.40,
};

const tabla = document.getElementById('churrosTabla');

if (tabla) {
  for (let i = 1; i <= 20; i++) {
    const fila = document.createElement('div');
    fila.classList.add('churros-fila');

    const precioP = (i * precios.porras).toFixed(2).replace('.', ',');
    const precioC = (i * precios.churros).toFixed(2).replace('.', ',');

    fila.innerHTML = `
      <span>${i}</span>
      <span>${precioP} €</span>
      <span>${precioC} €</span>
    `;
    tabla.appendChild(fila);
  }
}


// ── Scroll reveal ───────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.carta-bloque, .nosotros-text, .nosotros-img-wrap, .horarios-info, .horarios-mapa, .contacto-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Escalonado suave para grupos de cards
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


// ── Active nav link al hacer scroll ────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--naranja)'
          : '';
      });
    }
  });
}, {
  threshold: 0.4,
});

sections.forEach(s => sectionObserver.observe(s));


// ── Imágenes de producto: fallback si no carga ──────────
document.querySelectorAll('.carta-item-img img').forEach(img => {
  img.addEventListener('error', function () {
    // Mostrar placeholder con las iniciales del producto
    const nombre = this.closest('.carta-item')
      ?.querySelector('.carta-item-nombre')?.textContent || '?';
    const iniciales = nombre.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; height:100%;
      display:flex; align-items:center; justify-content:center;
      background:#1e1e1e;
      color:rgba(255,255,255,0.2);
      font-family:var(--font-display);
      font-size:1.4rem;
      letter-spacing:0.05em;
    `;
    placeholder.textContent = iniciales;

    this.parentNode.replaceChild(placeholder, this);
  });
});