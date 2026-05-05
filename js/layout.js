/* ======================================================
   HDI COMPAGNIE v2 — Layout (nav + footer partagés)
   ====================================================== */

const HDI_PAGES = [
  { href: 'index.html',          label: 'Accueil' },
  { href: 'particuliers.html',   label: 'Particuliers' },
  { href: 'professionnels.html', label: 'Professionnels' },
  { href: 'qui-sommes-nous.html',label: 'Qui sommes-nous' },
  { href: 'blog.html',           label: 'Blog' },
];

function buildNav(active) {
  const links = HDI_PAGES.map(p =>
    `<a href="${p.href}" class="nav__link${p.href === active ? ' active' : ''}">${p.label}</a>`
  ).join('');
  const mobileLinks = HDI_PAGES.map(p =>
    `<a href="${p.href}" class="nav__link${p.href === active ? ' active' : ''}">${p.label}</a>`
  ).join('');

  return `
<nav class="nav" id="main-nav">
  <div class="container">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <div class="nav__logo-mark">
          <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="nav__logo-name">
          HDI Compagnie
          <small>Villeurbanne · Rhône-Alpes</small>
        </div>
      </a>
      <div class="nav__links">
        ${links}
      </div>
      <div class="nav__phone">
        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
        <div>
          <span>Nous appeler</span>
          04 XX XX XX XX
        </div>
      </div>
      <a href="contact.html" class="btn btn--fire btn--sm" style="flex-shrink:0;">Devis gratuit</a>
      <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav__mobile" id="nav-mobile">
    ${mobileLinks}
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;" class="nav__mobile-cta">
      <a href="contact.html" class="btn btn--fire">Demander un devis</a>
    </div>
  </div>
</nav>`;
}

function buildFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="footer__brand-name">HDI <span>Compagnie</span></div>
        <p class="footer__brand-desc">Solutions thermiques et énergétiques pour particuliers et professionnels. Basés à Villeurbanne, nous intervenons dans tout le Rhône et la région Auvergne-Rhône-Alpes.</p>
        <div class="footer__brand-legal">
          EURL — Capital 1 000 €<br>
          SIREN : 929 400 588<br>
          RCS Lyon · TVA : FR20929400588<br>
          APE : 43.22B<br>
          72 Rue du 4 Août 1789, 69100 Villeurbanne
        </div>
      </div>
      <div>
        <div class="footer__col-title">Services</div>
        <a href="particuliers.html" class="footer__link">Pompe à chaleur</a>
        <a href="particuliers.html" class="footer__link">Photovoltaïque</a>
        <a href="particuliers.html" class="footer__link">Climatisation</a>
        <a href="particuliers.html" class="footer__link">VMC / Ventilation</a>
        <a href="professionnels.html" class="footer__link">Solutions CEE Pro</a>
        <a href="professionnels.html" class="footer__link">Déstratification d'air</a>
      </div>
      <div>
        <div class="footer__col-title">Entreprise</div>
        <a href="qui-sommes-nous.html" class="footer__link">Qui sommes-nous</a>
        <a href="blog.html" class="footer__link">Blog</a>
        <a href="contact.html" class="footer__link">Contact</a>
        <a href="mentions-legales.html" class="footer__link">Mentions légales</a>
        <a href="mentions-legales.html#confidentialite" class="footer__link">Politique de confidentialité</a>
      </div>
      <div>
        <div class="footer__col-title">Contact</div>
        <p class="footer__link" style="cursor:default;color:rgba(255,255,255,0.5);">72 Rue du 4 Août 1789<br>69100 Villeurbanne</p>
        <a href="mailto:contact@hdi-compagnie.fr" class="footer__link" style="margin-top:8px;">contact@hdi-compagnie.fr</a>
        <a href="tel:0400000000" class="footer__link">04 XX XX XX XX</a>
        <a href="contact.html" class="btn btn--fire btn--sm" style="margin-top:18px;display:inline-flex;">Demander un devis →</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2024 HDI Compagnie — Tous droits réservés</span>
      <div style="display:flex;gap:20px;">
        <a href="mentions-legales.html">Mentions légales</a>
        <a href="mentions-legales.html#confidentialite">Confidentialité</a>
      </div>
    </div>
  </div>
</footer>`;
}

// Inject nav + footer
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.getElementById('nav-root').innerHTML = buildNav(currentPage);
  document.getElementById('footer-root').innerHTML = buildFooter();

  // Mobile menu
  document.addEventListener('click', e => {
    const burger = document.getElementById('burger');
    const mobile = document.getElementById('nav-mobile');
    if (burger && e.target.closest('#burger')) {
      mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', mobile.classList.contains('open'));
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  // Contact form
  const form = document.getElementById('main-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const s = document.getElementById('form-success');
      if (s) { s.classList.add('show'); form.reset(); s.scrollIntoView({ behavior:'smooth', block:'nearest' }); }
    });
  }

  // Hero form quick submit
  const heroForm = document.getElementById('hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      window.location.href = 'contact.html?source=hero';
    });
  }

  // Pre-fill contact selects from URL params
  const params = new URLSearchParams(location.search);
  ['projet','type'].forEach(k => {
    const el = document.getElementById(k);
    if (el && params.get(k)) el.value = params.get(k);
  });
});
