(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'inquiry-dialog';
  dialog.setAttribute('aria-labelledby', 'inquiry-title');
  dialog.setAttribute('aria-describedby', 'inquiry-subtitle');
  dialog.innerHTML = `<button type="button" class="inquiry-close" aria-label="Close contact form">×</button>
    <div class="inquiry-content"><div class="inquiry-heading"><h2 id="inquiry-title">Let's talk about your project.</h2><p id="inquiry-subtitle">Tell me a little about your idea.</p></div>
    <form id="inquiry-form">
      <div class="inquiry-field"><label for="inquiry-name">Full Name <span aria-hidden="true">*</span></label><input id="inquiry-name" name="fullName" autocomplete="name" required minlength="2" maxlength="100"></div>
      <div class="inquiry-field"><label for="inquiry-phone">Phone / WhatsApp Number <span aria-hidden="true">*</span></label><input id="inquiry-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="24" title="Enter 8–24 characters using digits, spaces, +, parentheses, or hyphens."></div>
      <div class="inquiry-field"><label for="inquiry-email">Email Address <span aria-hidden="true">*</span></label><input id="inquiry-email" name="email" type="email" autocomplete="email" required maxlength="200"></div>
      <div class="inquiry-field"><label for="inquiry-project">Project Description <span aria-hidden="true">*</span></label><textarea id="inquiry-project" name="project" required minlength="10" maxlength="4000" rows="3"></textarea></div>
      <p class="inquiry-handoff">Opens WhatsApp with your inquiry. You review and send the message there.</p>
      <button class="glass-button inquiry-send" type="submit">Send Inquiry <span aria-hidden="true">↗</span></button>
      <p class="inquiry-status" role="status" aria-live="polite"></p>
    </form></div>`;
  document.body.append(dialog);
  const form = dialog.querySelector('form');
  const content = dialog.querySelector('.inquiry-content');
  const status = dialog.querySelector('.inquiry-status');
  let origin = null, busy = false, pendingClose = false, priorOverflow = '', priorPadding = '';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const waitAnimation = animation => animation.finished.catch(() => {});
  const pillTransform = (from, to) => `translate(-50%, -50%) translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${from.top + from.height / 2 - (to.top + to.height / 2)}px) scale(${from.width / to.width}, ${from.height / to.height})`;

  async function open(trigger) {
    if (dialog.open || busy) return;
    busy = true; origin = trigger; status.textContent = '';
    if (!reduced()) await waitAnimation(trigger.animate([{transform:'scale(1)'},{transform:'scale(.97)'},{transform:'scale(1)'}], {duration:150,easing:'ease-out'}));
    const from = trigger.getBoundingClientRect();
    priorOverflow = document.body.style.overflow;
    priorPadding = document.body.style.paddingRight;
    const gutter = innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gutter) document.body.style.paddingRight = gutter + 'px';
    dialog.classList.remove('is-closing', 'content-visible');
    dialog.showModal();
    const to = dialog.getBoundingClientRect();
    trigger.classList.add('inquiry-origin-hidden');
    const animation = dialog.animate([
      {transform:pillTransform(from,to),borderRadius:'999px',opacity:1,filter:'blur(0px)'},
      {transform:'translate(-50%, -50%) translate(0, 0) scale(1)',borderRadius:'32px',opacity:1,filter:'blur(0px)'}
    ], {duration:reduced()?0:500,easing:'cubic-bezier(.2,.65,.3,1)',fill:'both'});
    // Reveal the content gradually as the glass shell settles.
    setTimeout(() => { if (dialog.open && !dialog.classList.contains('is-closing')) dialog.classList.add('content-visible'); }, reduced()?0:250);
    await waitAnimation(animation); animation.cancel();
    dialog.querySelector('#inquiry-name').focus({preventScroll:true});
    busy = false;
    if (pendingClose) { pendingClose = false; close(); }
  }

  async function close() {
    if (!dialog.open) return;
    if (busy) { if (!dialog.classList.contains("is-closing")) pendingClose = true; return; }
    busy = true; dialog.classList.add('is-closing'); dialog.classList.remove('content-visible');
    const to = origin?.isConnected ? origin.getBoundingClientRect() : null;
    const from = dialog.getBoundingClientRect();
    const animation = dialog.animate([
      {transform:'translate(-50%, -50%) translate(0, 0) scale(1)',borderRadius:'32px',opacity:1,filter:'blur(0px)'},
      to ? {transform:pillTransform(to,from),borderRadius:'999px',opacity:1,filter:'blur(0px)'} : {transform:'translate(-50%, -50%) scale(.96)',opacity:0,filter:'blur(9px)'}
    ], {duration:reduced()?0:400,easing:'cubic-bezier(.4,0,.25,1)',fill:'both'});
    await waitAnimation(animation);
    dialog.close(); animation.cancel();
    document.body.style.overflow = priorOverflow;
    document.body.style.paddingRight = priorPadding;
    origin?.classList.remove('inquiry-origin-hidden');
    origin?.focus({preventScroll:true}); busy = false;
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-open-inquiry]');
    if (trigger) { e.preventDefault(); open(trigger); }
  });
  dialog.querySelector('.inquiry-close').addEventListener('click', close);
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) close();
  });
  form.addEventListener('input', e => { if (typeof e.target.setCustomValidity === 'function') e.target.setCustomValidity(''); });
  // Native dialog makes the background inert and traps keyboard focus.
  form.addEventListener('submit', e => {
    e.preventDefault();
    for (const field of form.querySelectorAll('input, textarea')) {
      field.value = field.value.trim(); field.setCustomValidity('');
      if (!field.value) field.setCustomValidity('Please fill in this field.');
    }
    const phone = form.elements.phone;
    const digits = phone.value.replace(/\D/g, '');
    if (!/^\+?[0-9 ().-]+$/.test(phone.value) || digits.length < 8 || digits.length > 15) phone.setCustomValidity('Enter a valid phone number with 8–15 digits.');
    if (!form.reportValidity()) return;
    const config = typeof data !== 'undefined' ? data : window.PORTFOLIO;
    const destination = String(config.whatsapp || config.phone || '').replace(/\D/g, '');
    if (!/^[1-9]\d{7,14}$/.test(destination)) {
      status.textContent = 'Nomor tujuan WhatsApp belum dikonfigurasi. Isi whatsapp atau phone pada content.js.'; return;
    }
    const message = `New Project Inquiry — Ary Noor Works\n\nName: ${form.elements.fullName.value}\nPhone: ${phone.value}\nEmail: ${form.elements.email.value}\n\nProject Description:\n${form.elements.project.value}`;
    const url = `https://wa.me/${destination}?text=${encodeURIComponent(message)}`;
    const handoff = window.open(url, '_blank');
    if (handoff) handoff.opener = null;
    status.textContent = handoff ? 'WhatsApp dibuka. Pesan belum dikirim; tinjau dan tekan Kirim di WhatsApp.' : 'Browser mungkin memblokir tab WhatsApp. Gunakan tautan di bawah untuk melanjutkan; pesan belum dikirim.';
    const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Lanjutkan ke WhatsApp ↗';
    status.append(document.createElement('br'), link);
  });
})();
