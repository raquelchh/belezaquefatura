const COURSES = [
  { id:'curso-sobrancelhas', area:'Sobrancelhas', title:'Design de sobrancelhas do zero', description:'Curso para conhecer técnicas de design, simetria, mapeamento e atendimento.', level:'Iniciantes', link:'https://go.hotmart.com/X108541901P?dp=1' },
  { id:'curso-cilios', area:'Cílios', title:'Extensão de cílios: primeiros passos', description:'Formação introdutória sobre materiais, preparação, aplicação e cuidados.', level:'Iniciantes', link:'https://go.hotmart.com/X108542156P?dp=1' },
  { id:'curso-maquiagem', area:'Maquiagem', title:'Maquiagem profissional para iniciantes', description:'Conteúdos de preparação de pele, técnicas de olhos e maquiagem social.', level:'Iniciantes', link:'https://go.hotmart.com/L108542089Y?dp=1' },
  { id:'curso-manicure', area: 'Manicure', title: 'Manicure Profissional do zero', description:'Aprenda técnicas de manicure, preparação das unhas, esmaltação, cuidados e atendimento profissional.', level: 'Iniciantes', link: 'https://go.hotmart.com/I108542127Y?dp=1',}
];

const KITS = {
  sobrancelhas:[
    {name:'Kit básico para design de sobrancelhas', link:'https://meli.la/1qVMS8q'},
    {name:'Pinças e acessórios de precisão',link:'https://meli.la/1VFj17B'},
    {name:'Henna e materiais para treino', link:'https://meli.la/26jnkZ7'}
  ],
  cilios:[
    {name:'Kit de cílios para treino',link:'https://meli.la/1xoo7cK'},
    {name:'Pinças para extensão de cílios',link:'https://meli.la/32whjSL'},
    {name:'Fios e acessórios para aplicação',link:'https://meli.la/2FikTy5'}
  ],
  maquiagem:[
    {name:'Kit de pincéis e esponjas',link:'https://meli.la/23zwzjp'},
    {name:'Maleta organizadora de maquiagem',link:'https://meli.la/1oGUdP1'},
    {name:'Paleta de maquiagem',link:'https://meli.la/2TBuP2Q'}
  ],
  manicure: [
    {name: 'Kit completo de manicure para iniciantes', link: 'https://meli.la/31JAu7a'},
    {name: 'Alicate profissional e espátula para unhas', link: 'https://meli.la/1au4C97'},
    {name: 'Kit de esmaltes e acessórios para manicure', link: 'https://meli.la/1CLTn1v'}
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
      <div class="course-meta">${escapeHTML(course.level)}</div>
      ${affiliateAnchor(course.link,'Começar trilha →','button button-primary')}
    </article>`).join('');
}

function renderKit(area){
  const list = (KITS[area] || []).filter(item => item.link);
  document.querySelector('#kitItems').innerHTML = list.map(item => `
    <div class="kit-item"><div><b>${escapeHTML(item.name)}</b></div>
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
  if(missing){event.preventDefault();alert('Este link ainda não foi configurado.');}
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

     // inicialização do Meta Pixel/Google Analytics se houver consentimento.
    // form: precisa de um serviço de e-mail para armazenar inscrições reais.

const newsletterForm = document.querySelector('#newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async event => {
    event.preventDefault();
    const msg = document.querySelector('#newsletterMessage');
    if (GOOGLE_FORM_URL.includes('SEU_ID')) {
      msg.textContent = 'Formulário ainda não conectado.';
      return;
    }
    const body = new URLSearchParams();
    body.append(GOOGLE_FIELD, document.querySelector('#email').value.trim());
    try {
      await fetch(GOOGLE_FORM_URL, { method: 'POST', mode: 'no-cors', body });
      newsletterForm.reset();
      msg.textContent = 'Pronto! Seu e-mail foi cadastrado.';
    } catch (error) {
      msg.textContent = 'Não foi possível enviar agora. Tente de novo.';
    }  
  });
} 
// Contagem regressiva Black Friday 2026
const countdown = document.querySelector('#countdown');
// Encerramento: 27/11/2026 às 23h59 (horário de Brasília)
const deadline = new Date(2026, 10, 28, 0, 0, 0);

function updateCountdown() {
    const now = new Date();
    const difference = deadline - now;
    if (difference <= 0) {
        countdown.textContent = 'Oferta encerrada';
        return;
    }
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );
    countdown.textContent =
        `${days}d ${String(hours).padStart(2, '0')}h ` +
        `${String(minutes).padStart(2, '0')}min ` +
        `${String(seconds).padStart(2, '0')}s`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

