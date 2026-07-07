(function(){
  const menuToggle=document.getElementById('menuToggle');
  const mainNav=document.getElementById('mainNav');
  if(menuToggle&&mainNav){menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));}
  const sqft=document.getElementById('sqft'),freq=document.getElementById('frequency'),type=document.getElementById('cleanType'),range=document.getElementById('range');
  function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
  function calc(){if(!sqft||!freq||!type||!range)return;const s=Math.max(500,Number(sqft.value)||3000);const base=s*Number(freq.value)*Number(type.value);range.textContent=`${money(base)} - ${money(base*1.3)}`}
  [sqft,freq,type].forEach(el=>el&&el.addEventListener('input',calc));calc();
  const form=document.getElementById('quoteForm'),msg=document.getElementById('formMsg');
  if(form&&msg){form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const subject=encodeURIComponent('Free Quote Request - J&B Elite Commercial Cleaning');const body=encodeURIComponent(`Name: ${data.name||''}\nCompany: ${data.company||''}\nPhone: ${data.phone||''}\nEmail: ${data.email||''}\nService: ${data.service||''}\nMessage: ${data.message||''}`);msg.textContent='Thank you. Your email window will open now.';window.location.href=`mailto:info@jbelitecleaning.com?subject=${subject}&body=${body}`;setTimeout(()=>{msg.textContent='';form.reset();},6000);});}
  const back=document.getElementById('backTop');
  if(back){window.addEventListener('scroll',()=>back.classList.toggle('show',window.scrollY>500));back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));}
  document.getElementById('year').textContent=new Date().getFullYear();
  const navLinks=[...document.querySelectorAll('.main-nav a')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}})},{rootMargin:'-45% 0px -50% 0px',threshold:0});
  sections.forEach(s=>obs.observe(s));
})();
