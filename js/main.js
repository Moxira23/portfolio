const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const store = (k, v) => { try { if (v !== undefined) localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } };

/* Language */
function setLang(l) {
  const d = I18N[l] || I18N.uz;
  root.lang = l;
  $$('[data-i18n]').forEach(el => el.textContent = d[el.dataset.i18n]);
  $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
  document.title = d.brand + ' — ' + d.h1;
  buildTicker(l);
  store('lang', l);
}
function buildTicker(l) {
  const w = l === 'uz'
    ? ['Veb-dizayn', 'Frontend', 'HTML', 'CSS', 'JavaScript', 'Moslashuvchan sahifa', 'Animatsiya', 'UX']
    : ['Web design', 'Frontend', 'HTML', 'CSS', 'JavaScript', 'Responsive', 'Animation', 'UX'];
  const row = w.map(x => `<span>${x}</span>`).join('');
  $('#track').innerHTML = row + row;
}
$$('.seg button').forEach(b => b.onclick = () => setLang(b.dataset.lang));

/* Theme */
$('#theme').onclick = () => {
  const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = t; store('theme', t);
};

/* Parallax on the hero stage */
const stage = $('#stage');
const chips = $$('.chip', stage);
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    chips.forEach(c => { const d = +c.dataset.depth; c.style.translate = `${x * d}px ${y * d}px`; });
    $('.arch', stage).style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  stage.addEventListener('pointerleave', () => {
    chips.forEach(c => c.style.translate = '');
    $('.arch', stage).style.transform = '';
  });
}

setLang(store('lang') || ((navigator.language || '').startsWith('en') ? 'en' : 'uz'));
