const pages = [...document.querySelectorAll('.page')];
const pageTitles = {
  home: 'J&B Elite Commercial Cleaning LLC',
  services: 'Services | J&B Elite Commercial Cleaning LLC',
  why: 'Why Us | J&B Elite Commercial Cleaning LLC',
  process: 'Process | J&B Elite Commercial Cleaning LLC',
  areas: 'Service Areas | J&B Elite Commercial Cleaning LLC',
  estimate: 'Estimate | J&B Elite Commercial Cleaning LLC',
  contact: 'Contact | J&B Elite Commercial Cleaning LLC',
  quote: 'Free Quote | J&B Elite Commercial Cleaning LLC'
};

function showPage(name) {
  const target = pages.some(p => p.dataset.view === name) ? name : 'home';
  pages.forEach(p => p.classList.toggle('active', p.dataset.view === target));
  document.querySelectorAll('[data-page]').forEach(a => a.classList.toggle('current', a.dataset.page === target));
  document.title = pageTitles[target] || pageTitles.home;
  history.replaceState(null, '', target === 'home' ? location.pathname : `#${target}`);
  document.getElementById('mainNav')?.classList.remove('open');
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

document.addEventListener('click', event => {
  const link = event.target.closest('[data-page]');
  if (!link) return;
  event.preventDefault();
  showPage(link.dataset.page);
});

document.getElementById('mobileToggle')?.addEventListener('click', () => {
  document.getElementById('mainNav')?.classList.toggle('open');
});

function updateCalc(box) {
  const sqft = Number(box.querySelector('.sqft')?.value || 3000);
  const freq = box.querySelector('.frequency')?.value || 'one';
  const type = box.querySelector('.type')?.value || 'standard';
  let base = sqft * 0.10;
  if (freq === 'daily') base *= 22;
  else if (freq === 'weekly') base *= 4.2;
  else if (freq === 'biweekly') base *= 2.2;
  else if (freq === 'monthly') base *= 1.15;
  if (type === 'deep') base *= 1.55;
  if (type === 'medical') base *= 1.75;
  if (type === 'post') base *= 2.1;
  base = Math.max(base, 180);
  const low = Math.round(base / 10) * 10;
  const high = Math.round(base * 1.3 / 10) * 10;
  box.querySelector('.price').textContent = `$${low.toLocaleString()} - $${high.toLocaleString()}`;
}

document.querySelectorAll('[data-calculator]').forEach(box => {
  box.addEventListener('input', () => updateCalc(box));
  box.addEventListener('change', () => updateCalc(box));
  updateCalc(box);
});

const cursor = document.getElementById('customCursor');
window.addEventListener('mousemove', event => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.getElementById('topBtn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('quoteForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Free Quote Request - J&B Elite Commercial Cleaning');
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nCompany: ${data.get('company')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nArea: ${data.get('area')}\nFrequency: ${data.get('frequency')}\n\nServices Needed:\n${data.get('message')}`
  );
  document.getElementById('formSuccess')?.classList.add('show');
  window.location.href = `mailto:info@jbelitecleaning.com?subject=${subject}&body=${body}`;
});

const helper = document.getElementById('juanitoHelper');
const helperAnswer = document.getElementById('helperAnswer');
const helperInput = document.getElementById('helperInput');

function openHelper() {
  helper?.classList.add('open');
  helperInput?.focus();
}
function closeHelper() {
  helper?.classList.remove('open');
}
document.querySelectorAll('.helper-trigger').forEach(btn => btn.addEventListener('click', openHelper));
document.getElementById('helperClose')?.addEventListener('click', closeHelper);

document.querySelectorAll('[data-ask]').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.ask;
    helperAnswer.textContent = `Opening the ${btn.textContent.trim()} page for you.`;
    closeHelper();
    showPage(page);
  });
});

const keywordRoutes = [
  { page: 'services', words: ['service', 'services', 'office', 'medical', 'restaurant', 'bank', 'janitorial', 'construction', 'floor', 'deep cleaning'] },
  { page: 'estimate', words: ['price', 'pricing', 'cost', 'estimate', 'calculator', 'how much', 'quote range'] },
  { page: 'areas', words: ['area', 'areas', 'yonkers', 'westchester', 'white plains', 'new rochelle', 'mount vernon', 'bronx', 'manhattan'] },
  { page: 'process', words: ['process', 'how it works', 'walkthrough', 'start', 'schedule'] },
  { page: 'why', words: ['why', 'insured', 'reliable', 'professional', 'trained'] },
  { page: 'contact', words: ['contact', 'phone', 'email', 'call'] },
  { page: 'quote', words: ['free quote', 'request', 'form', 'book'] }
];

helperInput?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const query = helperInput.value.toLowerCase().trim();
  if (!query) return;
  const match = keywordRoutes.find(route => route.words.some(word => query.includes(word)));
  if (match) {
    helperAnswer.textContent = `I found the best page for your question. Opening it now.`;
    closeHelper();
    showPage(match.page);
  } else {
    helperAnswer.textContent = 'I can help with services, pricing, areas, process, contact, or a free quote. Try typing one of those topics.';
  }
});

const initialHash = location.hash.replace('#', '');
if (initialHash) showPage(initialHash);
