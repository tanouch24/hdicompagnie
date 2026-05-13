const HDI_PAGES = [
  { href: 'index.html', label: 'Accueil' },
  { href: 'particuliers.html', label: 'Particuliers' },
  { href: 'professionnels.html', label: 'Professionnels' },
  { href: 'solutions.html', label: 'Solutions' },
  { href: 'qui-sommes-nous.html', label: 'À propos' },
  { href: 'blog.html', label: 'Blog' },
  { href: 'contact.html', label: 'Contact' }
];

const HDI_PHONE_DISPLAY = '+33 7 56 99 99 56';
const HDI_PHONE_HREF = 'tel:+33756999956';
const HDI_EMAIL = 'contact@hdi-cie.fr';
const SUPABASE_URL = 'https://qxbxfmmsdmdrqyidotli.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YnhmbW1zZG1kcnF5aWRvdGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzg4NDMsImV4cCI6MjA5MzY1NDg0M30.YTZ4wnRGuQcEt2iz2jRM-QmTJnMQeQI07wHAKtAJ5n8';
const SUPABASE_CONTACT_TABLE = 'contact_requests';

function navLinks(active) {
  return HDI_PAGES.map(page => (
    `<a class="nav__link${page.href === active ? ' active' : ''}" href="${page.href}">${page.label}</a>`
  )).join('');
}

function buildNav(active) {
  return `
    <nav class="nav">
      <div class="container">
        <div class="nav__inner">
          <a class="brand" href="index.html" aria-label="HDI Compagnie - Accueil">
            <span class="brand__mark">HDI</span>
            <span class="brand__text">HDI COMPAGNIE<span>Solutions energetiques</span></span>
          </a>
          <div class="nav__links">${navLinks(active)}</div>
          <a class="nav__phone" href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a>
          <a class="btn btn--blue nav__cta" href="contact.html">Demander une étude</a>
          <button class="nav__burger" id="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-panel" id="mobile-panel">${navLinks(active)}<a class="nav__phone" href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a><a class="nav__phone" href="mailto:${HDI_EMAIL}">${HDI_EMAIL}</a><a class="btn btn--blue" href="contact.html">Demander une étude</a></div>
    </nav>
  `;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">HDI COMPAGNIE</div>
            <p>Equipements thermiques, climatisation, ventilation, photovoltaique et solutions energetiques pour particuliers et professionnels.</p>
            <p class="footer__legal">SIREN : 929 400 588<br>TVA : FR20929400588</p>
          </div>
          <div>
            <h3>Navigation</h3>
            <a href="index.html">Accueil</a>
            <a href="particuliers.html">Particuliers</a>
            <a href="professionnels.html">Professionnels</a>
            <a href="solutions.html">Solutions</a>
            <a href="qui-sommes-nous.html">Qui sommes-nous</a>
            <a href="blog.html">Blog</a>
          </div>
          <div>
            <h3>Solutions</h3>
            <a href="solutions.html">Pompe a chaleur</a>
            <a href="solutions.html">Photovoltaique</a>
            <a href="solutions.html">Climatisation</a>
            <a href="solutions.html">VMC</a>
            <a href="solutions.html">Deshumidification technique</a>
            <a href="solutions.html">Destratification d'air</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p>HDI COMPAGNIE<br>Etude de projets energetiques et professionnels<br><a href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a><a href="mailto:${HDI_EMAIL}">${HDI_EMAIL}</a>SIREN : 929 400 588<br>TVA : FR20929400588</p>
            <a href="contact.html">Formulaire de contact</a>
            <a href="mentions-legales.html">Mentions legales</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 HDI COMPAGNIE - Tous droits reserves</span>
          <span>SIREN : 929 400 588 - TVA : FR20929400588</span>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navRoot = document.getElementById('nav-root');
  const footerRoot = document.getElementById('footer-root');
  if (navRoot) navRoot.innerHTML = buildNav(currentPage);
  if (footerRoot) footerRoot.innerHTML = buildFooter();

  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', panel.classList.contains('open') ? 'true' : 'false');
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));

  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const error = document.getElementById('form-error');
  if (form && success) {
    const initialSubmitText = form.querySelector('button[type="submit"]')?.textContent || 'Demander mon audit';

    const insertContactRequest = payload => fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_CONTACT_TABLE}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      success.hidden = true;
      if (error) error.hidden = true;

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
      }

      const formData = new FormData(form);
      const basePayload = {
        nom: formData.get('nom'),
        telephone: formData.get('telephone'),
        email: formData.get('email'),
        client: formData.get('client'),
        projet: formData.get('projet'),
        message: formData.get('message'),
        source: 'site_hdi_compagnie'
      };
      const extendedPayload = {
        ...basePayload,
        code_postal: formData.get('code_postal') || null,
        consentement: formData.get('consentement') === 'on'
      };

      try {
        let response = await insertContactRequest(extendedPayload);

        if (!response.ok && response.status === 400) {
          response = await insertContactRequest(basePayload);
        }

        if (!response.ok) throw new Error(`Supabase insert failed: ${response.status}`);

        success.hidden = false;
        form.reset();
        window.location.href = '/merci.html';
      } catch (insertError) {
        console.error(insertError);
        if (error) {
          error.hidden = false;
          error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = initialSubmitText;
        }
      }
    });
  }
});
