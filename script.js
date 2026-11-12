const COURSES = [
  { id:'curso-sobrancelhas', area:'Sobrancelhas', title:'Design de sobrancelhas do zero', description:'Curso para conhecer técnicas de design, simetria, mapeamento e atendimento.', level:'Iniciantes', platform:'Hotmart', link:'' },
  { id:'curso-cilios', area:'Cílios', title:'Extensão de cílios: primeiros passos', description:'Formação introdutória sobre materiais, preparação, aplicação e cuidados.', level:'Iniciantes', platform:'Hotmart', link:'' },
  { id:'curso-maquiagem', area:'Maquiagem', title:'Maquiagem profissional para iniciantes', description:'Conteúdos de preparação de pele, técnicas de olhos e maquiagem social.', level:'Iniciantes', link:'' }
];
const KITS = {
  sobrancelhas:[
    {name:'Kit básico para design de sobrancelhas',store:'Shopee',link:''},
    {name:'Pinças e acessórios de precisão',store:'Mercado Livre',link:''},
    {name:'Henna e materiais para treino',store:'Amazon',link:''}
  ],
  cilios:[
    {name:'Kit de cílios para treino',store:'Shopee',link:''},
    {name:'Pinças para extensão de cílios',store:'Mercado Livre',link:''},
    {name:'Fios e acessórios para aplicação',store:'Amazon',link:''}
  ],
  maquiagem:[
    {name:'Kit de pincéis e esponjas',store:'Shopee',link:''},
    {name:'Maleta organizadora de maquiagem',store:'Mercado Livre',link:''},
    {name:'Paleta de maquiagem',store:'Amazon',link:''}
  ]
};

const courseList = document.querySelector('#courseList');
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function affiliateAnchor(url, label, className='button button-primary') {
  const safeLabel = escapeHTML(label);
  if (!url) return `<a class="${className}" href="#" data-missing-link>${safeLabel}</a>`;
  return `<a class="${className}" href="${escapeHTML(url)}" target="_blank" rel="sponsored noopener noreferrer">${safeLabel}</a>`;
}

function renderCourses(){
  courseList.innerHTML = COURSES.map(course => `
    <article class="course-card" id="${escapeHTML(course.id)}">
      <span class="course-area">Trilha de ${escapeHTML(course.area)}</span>
      <h3>${escapeHTML(course.title)}</h3>
      <p>${escapeHTML(course.description)}</p>
      <div class="course-meta">${escapeHTML(course.level)} · Plataforma: ${escapeHTML(course.platform)}</div>
      ${affiliateAnchor(course.link,'Conhecer curso →','button button-primary')}
    </article>`).join('');
}

function renderKit(area){
  const list = KITS[area] || [];
  document.querySelector('#kitItems').innerHTML = list.map(item => `
    <div class="kit-item"><div><b>${escapeHTML(item.name)}</b><small>${escapeHTML(item.store)} · vendedor externo</small></div>
    ${affiliateAnchor(item.link,'Ver produto →','kit-link')}</div>`).join('');
}

renderCourses();
renderKit('sobrancelhas');
document.querySelectorAll('.kit-tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.kit-tab').forEach(tab => {tab.classList.remove('active');tab.setAttribute('aria-selected','false');});
    button.classList.add('active');button.setAttribute('aria-selected','true');renderKit(button.dataset.kit);
  });
});

document.addEventListener('click', event => {
  const missing = event.target.closest('[data-missing-link]');
  if(missing){event.preventDefault();alert('Este link ainda não foi configurado. Adicione seu link de afiliado no arquivo script.js.');}
});

const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click',()=>{
  nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');
}));

const header = document.querySelector('#header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});
document.querySelector('#year').textContent = new Date().getFullYear();

// Consentimento simples para cookies não essenciais. Integre analytics somente após consentimento.
const cookieBanner = document.querySelector('#cookieBanner');
try {
  const choice = localStorage.getItem('beauty-cookie-choice');
  if(!choice) cookieBanner.hidden = false;
} catch(error) { cookieBanner.hidden = false; }
function saveCookieChoice(choice){
  try{localStorage.setItem('beauty-cookie-choice',choice);}catch(error){}
  cookieBanner.hidden = true;
  // Adicione aqui a inicialização do Meta Pixel/Google Analytics se houver consentimento.
}
document.querySelector('#acceptCookies').addEventListener('click',()=>saveCookieChoice('accepted'));
document.querySelector('#rejectCookies').addEventListener('click',()=>saveCookieChoice('rejected'));

// Formulário demonstrativo: precisa de um serviço de e-mail para armazenar inscrições reais.
document.querySelector('#newsletterForm').addEventListener('submit',event=>{
  event.preventDefault();
  document.querySelector('#newsletterMessage').textContent='Layout demonstrativo: conecte um serviço de e-mail para receber inscrições.';
});
