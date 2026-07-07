const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.page-link');
const navBtns = document.querySelectorAll('.main-nav .page-link');
const menu = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
function showPage(page){
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`) || document.getElementById('page-home');
  target.classList.add('active');
  navBtns.forEach(b => b.classList.toggle('active', b.dataset.page === page));
  menu.classList.remove('open');
  window.scrollTo({top:0,left:0,behavior:'instant'});
}
links.forEach(link => link.addEventListener('click', e => { e.preventDefault(); showPage(link.dataset.page || 'home'); }));
menuToggle.addEventListener('click', () => menu.classList.toggle('open'));
document.getElementById('year').textContent = new Date().getFullYear();
function calculate(sqftId, freqId, typeId, resultId){
  const sqft = Math.max(300, Number(document.getElementById(sqftId)?.value || 3000));
  const frequency = Number(document.getElementById(freqId)?.value || 1);
  const type = Number(document.getElementById(typeId)?.value || 1);
  let base = Math.max(180, sqft * 0.10 * frequency * type);
  if(frequency >= 8) base *= .90;
  if(frequency >= 20) base *= .82;
  const low = Math.round(base / 10) * 10;
  const high = Math.round(base * 1.30 / 10) * 10;
  const el = document.getElementById(resultId);
  if(el) el.textContent = `$${low.toLocaleString()} - $${high.toLocaleString()}`;
}
[['sqft','frequency','cleanType','estimateResult'],['sqft2','frequency2','cleanType2','estimateResult2']].forEach(ids=>{
  ids.slice(0,3).forEach(id=>document.getElementById(id)?.addEventListener('input',()=>calculate(...ids)));
  calculate(...ids);
});
