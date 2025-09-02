(function(){
  const menuBtn = document.getElementById('botao-menu');
  const menu = document.getElementById('menu-principal');
  const temaBtn = document.getElementById('tema-toggle');
  const anoSpan = document.getElementById('ano');
  const dialog = document.getElementById('dialog-news');
  const abrirContato = document.getElementById('abrir-contato');
  const form = document.getElementById('form-contato');
  const status = document.getElementById('status');

  if (anoSpan) anoSpan.textContent = new Date().getFullYear();

  if (menuBtn && menu){
    menuBtn.addEventListener('click', ()=>{
      const aberto = menu.classList.toggle('aberto');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      if (aberto) menu.querySelector('a')?.focus();
    });
  }

  try{
    const saved = localStorage.getItem('tema');
    if (saved) document.documentElement.dataset.colorScheme = saved;
    temaBtn?.addEventListener('click', ()=>{
      const atual = document.documentElement.dataset.colorScheme || 'auto';
      const proximo = atual === 'dark' ? 'light' : (atual === 'light' ? 'auto' : 'dark');
      document.documentElement.dataset.colorScheme = proximo;
      localStorage.setItem('tema', proximo);
      temaBtn.setAttribute('aria-pressed', String(proximo === 'dark'));
    });
  }catch(e){}

  if (dialog && abrirContato){
    abrirContato.addEventListener('click', (e)=>{
      e.preventDefault();
      if (dialog.showModal){
        dialog.showModal();
        dialog.querySelector('input, button, [href], textarea, select')?.focus();
      }
    });
    dialog.addEventListener('close', ()=>{
      abrirContato.focus();
    });
  }

  function setError(id,msg){
    const el = document.getElementById('erro-' + id);
    if (el) el.textContent = msg || '';
  }

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    let ok = true;
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    if(!nome.value.trim()){ setError('nome','Digite seu nome.'); ok=false;} else setError('nome','');
    if(!email.value.includes('@')){ setError('email','E-mail inválido.'); ok=false;} else setError('email','');
    if(!mensagem.value.trim()){ setError('mensagem','Escreva sua mensagem.'); ok=false;} else setError('mensagem','');

    if(ok){ status.textContent = 'Enviado com sucesso! Simulação.'; form.reset(); } else { status.textContent = 'Verifique os campos destacados.'; }
  });
})();