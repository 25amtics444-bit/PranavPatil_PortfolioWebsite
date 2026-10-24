// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
}));

// Photo fallback (shows initials until photo.jpg is added)
const photo = document.getElementById('photo');
const portrait = document.getElementById('portrait');
photo.addEventListener('error', () => portrait.classList.add('empty'));
if (photo.complete && photo.naturalWidth === 0) portrait.classList.add('empty');

// Reveal on scroll + skill meters
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.w) e.target.style.width = e.target.dataset.w + '%';
    io.unobserve(e.target);
  });
}, { threshold: .25 }) : null;
document.querySelectorAll('.head, .proj, .chips li, form, .reach').forEach(el => el.classList.add('fade'));
document.querySelectorAll('.fade, .track i').forEach(el => {
  if (io) io.observe(el);
  else { el.classList.add('in'); if (el.dataset.w) el.style.width = el.dataset.w + '%'; }
});

// Highlight current nav link
const links = menu.querySelectorAll('a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Contact form: validate, then open the email app with the message prefilled
const TO = 'youremail@example.com'; // <-- change to your real email
const form = document.getElementById('cform');
const msg = document.getElementById('msg');
const fn = document.getElementById('n'), fe = document.getElementById('e'), fm = document.getElementById('m');
form.addEventListener('submit', ev => {
  ev.preventDefault();
  [fn, fe, fm].forEach(f => f.classList.remove('bad'));
  msg.className = 'msg';
  let bad = null, text = 'Please fill in this field.';
  if (!fn.value.trim()) bad = fn;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fe.value.trim())) { bad = fe; text = 'Enter a valid email address.'; }
  else if (!fm.value.trim()) bad = fm;
  if (bad) { bad.classList.add('bad'); bad.focus(); msg.textContent = text; msg.classList.add('err'); return; }
  const s = encodeURIComponent('Portfolio message from ' + fn.value.trim());
  const b = encodeURIComponent(fm.value.trim() + '\n\nFrom: ' + fn.value.trim() + ' (' + fe.value.trim() + ')');
  location.href = 'mailto:' + TO + '?subject=' + s + '&body=' + b;
  msg.textContent = 'Opening your email app. Press send there to finish.';
  msg.classList.add('ok'); form.reset();
});

document.getElementById('yr').textContent = new Date().getFullYear();
