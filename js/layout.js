const HDI_PAGES = [
  { href: 'index.html', label: 'Accueil' },
  { href: 'particuliers.html', label: 'Particuliers' },
  { href: 'professionnels.html', label: 'Professionnels' },
  { href: 'solutions.html', label: 'Solutions' },
  { href: 'audit-aides-energetiques.html', label: 'Audit CEE' },
  { href: 'qui-sommes-nous.html', label: 'À propos' },
  { href: 'blog.html', label: 'Blog' },
  { href: 'contact.html', label: 'Contact' }
];

const HDI_PHONE_DISPLAY = '+33 7 56 99 99 56';
const HDI_PHONE_HREF = 'tel:+33756999956';
const HDI_EMAIL = 'contact@hdi-cie.fr';
const LEAD_ENDPOINT = '/.netlify/functions/lead';

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
            <span class="brand__text">HDI COMPAGNIE<span>Solutions énergétiques</span></span>
          </a>
          <div class="nav__links">${navLinks(active)}</div>
          <a class="nav__phone" href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a>
          <a class="btn btn--blue nav__cta" href="/audit-aides-energetiques.html">Demander mon audit</a>
          <button class="nav__burger" id="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-panel" id="mobile-panel">${navLinks(active)}<a class="nav__phone" href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a><a class="nav__phone" href="mailto:${HDI_EMAIL}">${HDI_EMAIL}</a><a class="btn btn--blue" href="/audit-aides-energetiques.html">Demander mon audit</a></div>
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
            <p>Cabinet d’accompagnement énergétique : audit projet, aides CEE, qualification technique et suivi administratif.</p>
            <p class="footer__legal">SIREN : 929 400 588<br>TVA : FR20929400588</p>
          </div>
          <div>
            <h3>Navigation</h3>
            <a href="index.html">Accueil</a>
            <a href="particuliers.html">Particuliers</a>
            <a href="professionnels.html">Professionnels</a>
            <a href="solutions.html">Solutions</a>
            <a href="audit-aides-energetiques.html">Audit CEE</a>
            <a href="qui-sommes-nous.html">Qui sommes-nous</a>
            <a href="blog.html">Blog</a>
          </div>
          <div>
            <h3>Accompagnement</h3>
            <a href="/audit-aides-energetiques.html">Audit d’éligibilité</a>
            <a href="/chauffage-collectif-coproprietes.html">Chauffage collectif</a>
            <a href="/deshumidification-professionnelle.html">Déshumidification pro</a>
            <a href="professionnels.html#cee">Analyse CEE</a>
            <a href="contact.html">Qualification projet</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p>HDI COMPAGNIE<br>Audit, étude d’éligibilité et accompagnement administratif<br><a href="${HDI_PHONE_HREF}">${HDI_PHONE_DISPLAY}</a><a href="mailto:${HDI_EMAIL}">${HDI_EMAIL}</a>SIREN : 929 400 588<br>TVA : FR20929400588</p>
            <a href="/audit-aides-energetiques.html">Demander mon audit</a>
            <a href="mentions-legales.html">Mentions légales</a>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 HDI COMPAGNIE - Tous droits réservés</span>
          <span>SIREN : 929 400 588 - TVA : FR20929400588</span>
        </div>
      </div>
    </footer>
  `;
}

function injectJsonLd(data) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function injectStructuredData() {
  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'HDI Compagnie',
    url: 'https://www.dyleth.com/',
    telephone: HDI_PHONE_DISPLAY.replace(/\s/g, ''),
    email: HDI_EMAIL,
    identifier: 'SIREN 929 400 588',
    vatID: 'FR20929400588',
    areaServed: 'FR',
    description: 'Cabinet d’accompagnement énergétique, audit projet, aides CEE, qualification technique et suivi administratif.'
  });

  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    const parts = breadcrumb.textContent.split('/').map(item => item.trim()).filter(Boolean);
    injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: parts.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: index === parts.length - 1 ? location.href : new URL(index === 0 ? 'index.html' : '#', location.href).href
      }))
    });
  }

  const faqTitle = Array.from(document.querySelectorAll('h2')).find(title => title.textContent.trim().toLowerCase() === 'faq');
  if (faqTitle) {
    const questions = [];
    let node = faqTitle.nextElementSibling;
    while (node) {
      if (node.tagName === 'H2') break;
      if (node.tagName === 'H3' && node.nextElementSibling) {
        questions.push({
          '@type': 'Question',
          name: node.textContent.trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            text: node.nextElementSibling.textContent.trim()
          }
        });
      }
      node = node.nextElementSibling;
    }
    if (questions.length) {
      injectJsonLd({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navRoot = document.getElementById('nav-root');
  const footerRoot = document.getElementById('footer-root');
  if (navRoot) navRoot.innerHTML = buildNav(currentPage);
  if (footerRoot) footerRoot.innerHTML = buildFooter();
  injectStructuredData();
  document.querySelectorAll('img:not([loading])').forEach(image => image.loading = 'lazy');

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

    const insertContactRequest = payload => fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...payload, table: 'contact_requests' })
    });

    const submitNetlifyForm = payload => {
      const body = new URLSearchParams();
      body.append('form-name', 'contact_requests');

      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined && payload[key] !== null) {
          body.append(key, String(payload[key]));
        }
      });

      return fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
    };

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

        if (!response.ok) throw new Error(`Lead insert failed: ${response.status}`);

        submitNetlifyForm(extendedPayload).catch(err => {
          console.warn('[netlify_forms] notification error:', err);
        });

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
