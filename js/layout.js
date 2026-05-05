// Shared navigation HTML
function getNav(activePage) {
  const pages = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'particuliers.html', label: 'Particuliers' },
    { href: 'professionnels.html', label: 'Professionnels' },
    { href: 'qui-sommes-nous.html', label: 'Qui sommes-nous' },
    { href: 'blog.html', label: 'Blog' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="nav__link${p.href === activePage ? ' active' : ''}">${p.label}</a>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="nav__link${p.href === activePage ? ' active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="nav">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <div class="nav__logo-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <span class="nav__logo-text">HDI <span>COMPAGNIE</span></span>
      </a>
      <div class="nav__links">
        ${links}
        <a href="contact.html" class="nav__link nav__link--cta">Demander un devis</a>
      </div>
      <button class="nav__burger" id="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav__mobile" id="nav-mobile">
      ${mobileLinks}
      <a href="contact.html" class="nav__link nav__link--cta">Demander un devis</a>
    </div>
  </nav>`;
}

function getFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand-name">HDI <span>COMPAGNIE</span></div>
          <p class="footer__brand-desc">Solutions thermiques et énergétiques pour particuliers et professionnels. Basés à Villeurbanne, nous intervenons sur Lyon et le Rhône.</p>
          <div class="footer__brand-info">
            EURL au capital de 1 000 €<br>
            SIREN : 929 400 588<br>
            RCS Lyon — TVA : FR20929400588<br>
            APE : 43.22B
          </div>
        </div>
        <div>
          <div class="footer__col-titre">Services</div>
          <a href="particuliers.html" class="footer__link">Pompe à chaleur</a>
          <a href="particuliers.html" class="footer__link">Photovoltaïque</a>
          <a href="particuliers.html" class="footer__link">Climatisation</a>
          <a href="particuliers.html" class="footer__link">VMC</a>
          <a href="professionnels.html" class="footer__link">Solutions CEE pro</a>
        </div>
        <div>
          <div class="footer__col-titre">Entreprise</div>
          <a href="qui-sommes-nous.html" class="footer__link">Qui sommes-nous</a>
          <a href="blog.html" class="footer__link">Blog</a>
          <a href="contact.html" class="footer__link">Contact</a>
          <a href="mentions-legales.html" class="footer__link">Mentions légales</a>
        </div>
        <div>
          <div class="footer__col-titre">Contact</div>
          <p class="footer__link" style="cursor:default;">72 Rue du 4 Août 1789<br>69100 Villeurbanne</p>
          <a href="mailto:contact@hdi-compagnie.fr" class="footer__link">contact@hdi-compagnie.fr</a>
          <a href="contact.html" class="footer__link" style="margin-top:16px; display:inline-flex; align-items:center; gap:6px; color:var(--vert-energie); font-weight:600;">
            → Demander un devis
          </a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2024 HDI Compagnie — Tous droits réservés</span>
        <div style="display:flex;gap:20px;">
          <a href="mentions-legales.html">Mentions légales</a>
          <a href="mentions-legales.html#confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>`;
}
