const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const pubSearch = document.getElementById('publication-search');
const pubItems = [...document.querySelectorAll('.publication-item')];
const pubFilters = [...document.querySelectorAll('#publication-filters .filter')];
const emptyState = document.getElementById('empty-state');
let activePubFilter = 'all';
function filterPublications() {
  const query = (pubSearch.value || '').trim().toLowerCase();
  let visible = 0;
  pubItems.forEach(item => {
    const categoryMatch = activePubFilter === 'all' || item.dataset.category === activePubFilter;
    const textMatch = !query || item.dataset.search.includes(query) || item.textContent.toLowerCase().includes(query);
    const show = categoryMatch && textMatch;
    item.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}
pubSearch?.addEventListener('input', filterPublications);
pubFilters.forEach(button => button.addEventListener('click', () => {
  activePubFilter = button.dataset.filter;
  pubFilters.forEach(item => item.classList.toggle('active', item === button));
  filterPublications();
}));

const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-category]')];
projectFilters.forEach(button => button.addEventListener('click', () => {
  projectFilters.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.projectFilter;
  projectCards.forEach(card => card.hidden = filter !== 'all' && card.dataset.projectCategory !== filter);
}));

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 }) : null;
document.querySelectorAll('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('visible');
});


// V8 contact form: Google Apps Script stores enquiries in Google Sheets and emails the owner.
(() => {
  const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycby_PWJalJE1O1ygAth3b0terZCyY00HA5w9jrCrZyHnP805nhAH_tKNMHKZ4OXmaEuT/exec';
  const modal = document.getElementById('contactModal');
  const openButton = document.getElementById('openContactForm');
  const form = document.getElementById('portfolioContactForm');
  const frame = document.getElementById('contactResponseFrame');
  if (!modal || !openButton || !form || !frame) return;
  const status = document.getElementById('contactFormStatus');
  const submitButton = document.getElementById('contactSubmit');
  let pendingSubmission = false;
  let pendingNonce = '';
  const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); openButton.focus(); };
  openButton.addEventListener('click', () => { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); document.getElementById('contactName').focus(); });
  modal.querySelectorAll('[data-close-contact]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  window.addEventListener('message', event => {
    if (!event.data || event.data.type !== 'portfolio-contact-result' || !pendingSubmission || event.data.nonce !== pendingNonce) return;
    pendingSubmission = false; pendingNonce = '';
    status.textContent = event.data.message || (event.data.ok ? 'Your enquiry was submitted.' : 'Unable to submit your enquiry.');
    status.classList.toggle('error', !event.data.ok);
    if (event.data.ok) form.reset();
    submitButton.disabled = false; submitButton.innerHTML = 'Send message <span>↗</span>';
  });
  form.addEventListener('submit', e => {
    if (!form.reportValidity()) { e.preventDefault(); return; }
    if (CONTACT_ENDPOINT.includes('PASTE_YOUR_')) { e.preventDefault(); status.textContent = 'The contact form is not connected yet. Follow the Google Sheets setup guide included with this website.'; status.classList.add('error'); return; }
    const data = new FormData(form); if (data.get('website')) { e.preventDefault(); return; }
    document.getElementById('contactFormTimestamp').value = new Date().toISOString();
    pendingNonce = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2));
    document.getElementById('contactNonce').value = pendingNonce;
    form.action = CONTACT_ENDPOINT; pendingSubmission = true; status.textContent = 'Sending your enquiry…'; status.classList.remove('error'); submitButton.disabled = true; submitButton.textContent = 'Sending…';
  });
})();
