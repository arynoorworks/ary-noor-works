history.scrollRestoration='manual';
let roleMotionState=null,disposeRoleGlass=()=>{};
let disposeProjectShowcase=()=>{};
let disposeFilmParallax=()=>{};
let disposeLandingMedia=()=>{};
const showcaseSelections={};
function categoryBtsPage(slug){
 const cat=categories.find(c=>c[0]===slug);if(!cat)return notFound();
 const [id,name]=cat,ps=projectsFor(name);
 requestAnimationFrame(()=>{setupRoleTabs();setupProjectShowcase(id,ps)});
 return `<section class="catalog showcase-catalog"><nav class="role-tabs" aria-label="Kategori peran"><span class="role-glass" aria-hidden="true"></span>${categories.map(c=>`<a href="#/category/${c[0]}" ${c[0]===id?'aria-current="page"':''}><span class="role-label" data-label="${c[1]}">${c[1]}</span></a>`).join('')}</nav><section class="project-showcase" aria-label="${esc(name)} projects"><div class="showcase-projects" aria-label="Pilih proyek">${ps.map(p=>`<button type="button" data-showcase-project="${esc(p.id)}" aria-pressed="false">${esc(p.title)}</button>`).join('')}</div><a class="showcase-stage" href="#" aria-label="Buka detail proyek"><div class="showcase-images"></div><span class="showcase-caption" aria-live="polite"></span></a>${!ps.length?'<p class="showcase-empty">Belum ada proyek dalam kategori ini.</p>':''}</section></section>`;
}
function setupRoleTabs(){
 disposeRoleGlass();
 const nav=main.querySelector(".role-tabs");if(!nav)return;
 nav.querySelector(".role-glass")?.remove();
 nav.querySelectorAll("a").forEach(a=>{const label=a.textContent.trim();a.setAttribute("aria-label",label);a.replaceChildren(document.createTextNode(label));});
}
let introTimers=[];let introAnimation=0;let introPlayed=false;
const base=window.PORTFOLIO;let data=base;
if(new URLSearchParams(location.search).has('preview')){try{const saved=JSON.parse(localStorage.getItem('ary-noor-draft'));if(saved?.contentVersion===base.contentVersion)data=saved;document.body.insertAdjacentHTML('beforeend','<a class="preview-badge" href="editor.html">Preview lokal · Edit draft ↗</a>')}catch{}}
const main=document.querySelector('main');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function media(s){if(!s)return '';try{let u=new URL(s,location.href);return ['http:','https:'].includes(u.protocol)?esc(u.href):''}catch{return ''}}
const categories=[['director','Director','Stories, from the first idea to the final frame.','arrow'],['dop','Director of Photography','Finding the feeling in light, colour, and movement.','ring'],['producer','Producer','Bringing the people and the pieces together.','square'],['videographer','Videographer','Small moments. A closer look.','pill']];
const categoryPhotos={director:'assets/category-director.png',dop:'assets/category-dop.png',producer:'assets/category-producer.png',videographer:'assets/category-videographer.png'};
const projectsFor=role=>data.projects.filter(p=>(p.roles||[p.role]).includes(role));
function shape(kind,extra=''){return `<span class="liquid-shape ${kind} ${extra}" aria-hidden="true">${kind==='arrow'?'↗':''}</span>`}
function categoryCards(){return `<section class="portfolio-section" id="portfolio"><div class="section-heading"><div><p class="eyebrow">A few ways I tell stories</p><h2>Explore my work.</h2></div><span>Choose a role to look around</span></div><div class="category-grid">${categories.map(([slug,name,desc,kind],i)=>`<a class="category-card liquid-panel" href="#/category/${slug}"><div class="category-art"><img src="${media(data.categoryPhotos?.[slug]||categoryPhotos[slug])}" alt="Ary Noor — ${esc(name)}" loading="lazy"></div><div class="category-copy"><h3>${name}</h3><p>${desc}</p></div><span class="round-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>`}
function profile(){return `<section class="profile-section" id="profile"><div class="portrait-wrap"><img src="${media(data.portrait)}" alt="Ary Noor" class="profile-photo"><span class="portrait-caption">Ary Noor / Behind the frame</span></div><div class="profile-copy"><p class="eyebrow">A little about me</p><h2>Curious by nature.<br>Filmmaker by heart.</h2><p>${esc(data.about)}</p><a href="#/contact" class="glass-button">Let’s talk <span>↗</span></a></div></section>`}
function thumb(p,i){return `<a class="project-tile" href="${projectHref(p)}"><div class="tile-image visual-${i%4}">${media(p.cover)?`<img src="${media(p.cover)}" alt="${esc(p.title)}" loading="lazy">`:shape(['ring','arrow','square','pill'][i%4])}<span class="tile-tag">${p.dummy?'Dummy project':esc(p.year)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.category)} · ${esc(p.role)}</p></a>`}
function shelf(title,ps,id){return `<section class="shelf"><div class="shelf-heading"><h2>${esc(title)}</h2></div><div class="shelf-track" id="${id}" tabindex="0" aria-label="${esc(title)} — swipe atau gunakan tombol panah keyboard">${ps.map(thumb).join('')}</div></section>`}
function detail(p){const role=categories.find(c=>(p.roles||[p.role]).includes(c[1]));return `<article class="page project-detail"><a class="back-link glass-button" href="#/category/${role?.[0]||'director'}">Back</a><p class="eyebrow">${esc(p.role)} · ${esc(p.year)}${p.dummy?' · Dummy project':''}</p><h1>${esc(p.title)}</h1><div class="detail-visual visual-1">${media(p.cover)?`<img src="${media(p.cover)}" alt="${esc(p.title)}">`:shape('ring')}</div><div class="detail-info"><div><p class="eyebrow">The project</p><p>${esc(p.description)}</p></div><div><p class="eyebrow">The process</p><p>${esc(p.craft)}</p></div></div>${p.video?`<video src="${media(p.video)}" controls playsinline preload="none"></video>`:media(p.watchUrl)?`<a class="glass-button" href="${media(p.watchUrl)}" target="_blank" rel="noopener">Watch the work <span>↗</span></a>`:'<p class="note">Video belum tersedia untuk draft ini.</p>'}${p.stills?.length?`<h2>Selected frames</h2><div class="still-grid">${p.stills.map(s=>`<img src="${media(s)}" alt="Film frame ${esc(p.title)}" loading="lazy">`).join('')}</div>`:''}<h2>Selected credits</h2>${p.credits?.length?`<ul>${p.credits.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:'<p class="note">Dummy — kredit asli belum diberikan.</p>'}</article>`}
function notFound(){return '<section class="page"><h1>Nothing here yet.</h1><a href="#/">Kembali ke home ↗</a></section>'}
function render(){let path;try{path=decodeURIComponent(location.hash.slice(1)||'/')}catch{path='/404'}document.body.classList.toggle('portfolio-view',path.startsWith('/category/'));document.body.classList.remove('light');document.body.classList.toggle('welcome-home',path==='/');let title='Ary Noor';if(path==='/'){main.innerHTML=`<section class="welcome" aria-label="Welcome to Ary Noor Works"><div class="welcome-ambient" aria-hidden="true"><div class="glass-depth-scene"><img class="glass-depth-image" src="assets/welcome-glass-reference.webp" alt=""><span class="glass-depth-light"></span></div><span class="ambient-glow"></span></div><p class="welcome-title">WELCOME TO</p><button class="welcome-enter glass-button" data-scroll="profile">Scroll to discover <span>↓</span></button></section><section class="home-hero profile-hero" id="profile"><div class="hero-copy"><p class="eyebrow">Ary Noor Works</p><h1>${esc(data.tagline||'Hi, Ary is here').replace('Ary is here','<br>Ary is here<span class="hello-dot">.</span>')}</h1><p class="hero-roles">${esc(data.intro)}</p><div class="hero-bio"><h2>Curious by nature.<br>Filmmaker by heart.</h2><p>${esc(data.about)}</p></div><a class="glass-button" href="#featured-works" data-scroll="featured-works">Explore project <span>↓</span></a></div><div class="hero-portrait"><img src="${media(data.portrait)}" alt="Portrait Ary Noor"></div></section>${homeFeaturedWorks()}<section class="closing"><p class="eyebrow">Got a story in mind?</p><h2>Let’s bring it to life.</h2><button type="button" class="glass-button inquiry-trigger" data-open-inquiry>Start a conversation <span data-chat-icon>chat</span></button></section>`}else if(path==='/works'){title='Portfolio';main.innerHTML=categoryCards()}else if(path.startsWith('/category/')){title=categories.find(c=>c[0]===path.slice(10))?.[1]||'Portfolio';main.innerHTML=categoryPage(path.slice(10))}else if(path.startsWith('/work/')){const p=data.projects.find(p=>p.id===path.slice(6));title=p?.title||'Project';main.innerHTML=p?detail(p):notFound()}else if(path==='/about'){title='About';main.innerHTML=profile()+categoryCards()}else if(path==='/contact'){title='Contact';main.innerHTML=`<section class="page contact-page"><p class="eyebrow">A new conversation</p><h1>Let’s make<br>something move.</h1><div class="contact-links">${data.email?`<a href="mailto:${esc(data.email)}">${esc(data.email)} ↗</a>`:''}${media(data.instagram)?`<a href="${media(data.instagram)}" target="_blank" rel="noopener">Instagram ↗</a>`:''}${/^\+?[0-9]{8,15}$/.test(data.phone||'')?`<a href="tel:${esc(data.phone)}">${esc(data.phone)} ↗</a>`:''}</div>${shape('arrow')}</section>`}else main.innerHTML=notFound();document.title=title+' — ARY NOOR';closeMenu();window.scrollTo({top:0,left:0,behavior:'instant'});beginIntro(path==='/');updateWelcome();styleButtonIcons();setupReveals();setupCategoryGlass();main.querySelectorAll('[data-scroll]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});main.querySelectorAll('[data-shelf]').forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.shelf);el.scrollBy({left:Number(b.dataset.step)*el.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})})}
const menu=document.querySelector('#menu'),links=document.querySelector('#links');function closeMenu(){links.hidden=true;menu.setAttribute('aria-expanded','false')}menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')==='true';links.hidden=open;menu.setAttribute('aria-expanded',!open)};document.querySelector('.skip').onclick=e=>{e.preventDefault();main.focus();main.scrollIntoView()};document.addEventListener('click',e=>{if(!e.target.closest('header nav'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!links.hidden){closeMenu();menu.focus()}});document.querySelector('#year').textContent=new Date().getFullYear();window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true})});render();

function styleButtonIcons(){document.querySelectorAll('.round-arrow,.glass-button>span,#menu>span').forEach(el=>{if(!el.querySelector('svg')){const down=el.textContent.trim()==='↓',plus=el.textContent.trim()==='＋',chat=el.hasAttribute('data-chat-icon');if(chat){el.innerHTML='<svg class="glass-icon chat-icon" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="chat-glass" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".45" stop-color="#91b8d6"/><stop offset=".6" stop-color="#edfaff"/><stop offset="1" stop-color="#6596bc"/></linearGradient></defs><path d="M7 5h18a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4H14l-8 5v-5a4 4 0 0 1-3-4V9a4 4 0 0 1 4-4Z" fill="url(#chat-glass)" stroke="#eaf8ff" stroke-width="1.2"/><path d="M10 13h12M10 18h7" stroke="#456c91" stroke-width="2.5" stroke-linecap="round"/></svg>';return}el.innerHTML=`<svg class="glass-icon" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="glass-${down?'down':plus?'plus':'up'}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".38" stop-color="#a7c9e8"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#6b9fc8"/></linearGradient></defs><path d="${down?'M16 5v22M6 17l10 10 10-10':plus?'M16 6v20M6 16h20':'M7 25L25 7M8 7h17v17'}" fill="none" stroke="url(#glass-${down?'down':plus?'plus':'up'})" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}})}
let welcomeFrame=false;
function updateWelcome(){const logo=document.querySelector('.brand');if(!logo)return;const home=document.body.classList.contains('welcome-home');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const maxWidth=Math.min(innerWidth*.41,400);const small=innerWidth<700?88:104;const progress=home?Math.min(1,Math.max(0,scrollY/(innerHeight*.8))):1;const t=reduced?(progress>.15?1:0):progress*progress*(3-2*progress);const width=maxWidth+(small-maxWidth)*t;const contentLeft=document.querySelector('.profile-hero .hero-copy')?.getBoundingClientRect().left??innerWidth*.06;const dockLeft=contentLeft+small*(.5-2*375/2048);const left=(innerWidth-maxWidth)/2+(dockLeft-(innerWidth-maxWidth)/2)*t;const startTop=innerHeight*.48-maxWidth/6;const dockCenter=innerWidth<700?44:47;const dockTop=dockCenter-small/6;const top=startTop+(dockTop-startTop)*t;logo.style.width=width+'px';logo.style.height=width/3+'px';logo.style.left=left+'px';logo.style.top=top+'px';logo.style.margin='0';logo.classList.toggle('logo-docked',progress>=1);document.body.style.setProperty('--welcome-progress',progress);document.body.style.setProperty('--header-frost',home?Math.max(0,Math.min(1,(progress-.3)/.55)):1);}
window.addEventListener('scroll',()=>{if(!welcomeFrame){welcomeFrame=true;requestAnimationFrame(()=>{updateWelcome();welcomeFrame=false})}},{passive:true});window.addEventListener('resize',updateWelcome);updateWelcome();styleButtonIcons();

function beginIntro(home){
 introTimers.forEach(clearTimeout);introTimers=[];cancelAnimationFrame(introAnimation);
 document.body.classList.remove('intro-running','intro-hold','intro-dissolve','intro-reform','intro-ready');document.querySelector('header nav').inert=false;
 if(!home||introPlayed){document.body.classList.add('intro-ready');return}
 introPlayed=true;window.scrollTo({top:0,left:0,behavior:'instant'});document.body.classList.add('intro-running','intro-hold');document.querySelector('header nav').inert=true;
 introTimers.push(setTimeout(()=>document.body.classList.replace('intro-hold','intro-dissolve'),2000));
 introTimers.push(setTimeout(()=>document.body.classList.replace('intro-dissolve','intro-reform'),4000));
 introTimers.push(setTimeout(()=>{document.body.classList.remove('intro-running','intro-reform');document.body.classList.add('intro-ready');document.querySelector('header nav').inert=false;window.scrollTo({top:0,left:0,behavior:'instant'});requestAnimationFrame(()=>{window.scrollTo({top:0,left:0,behavior:'instant'});updateWelcome()})},5600));
}
function setupReveals(){
 if(window.profileRevealObserver)window.profileRevealObserver.disconnect();
 const els=main.querySelectorAll('#profile .eyebrow,#profile h1,#profile .hero-roles,#profile .hero-bio h2,#profile .hero-bio>p,#profile .glass-button,#profile .hero-portrait,.closing .eyebrow,.closing h2,.closing .glass-button');
 els.forEach((el,i)=>{el.classList.add('reveal-glass');el.style.setProperty('--reveal-delay',(i%7)*90+'ms')});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){els.forEach(el=>el.classList.add('is-revealed'));return}
 window.profileRevealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');window.profileRevealObserver.unobserve(entry.target)}})},{threshold:.12});
 els.forEach(el=>window.profileRevealObserver.observe(el));
}

function setupCategoryGlass(){
 if(!main.querySelector('.showcase-stage'))disposeProjectShowcase();
 setupFilmParallax();
 main.querySelectorAll('[data-featured-video]').forEach(button=>button.onclick=()=>openProjectVideo(data.projects.find(p=>p.id===button.dataset.featuredVideo)));
 if(!matchMedia('(hover: hover) and (pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 main.querySelectorAll('.category-card,.project-tile').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;card.style.setProperty('--shine-x',x*100+'%');card.style.setProperty('--shine-y',y*100+'%');card.style.setProperty('--tilt-x',(y-.5)*-4+'deg');card.style.setProperty('--tilt-y',(x-.5)*4+'deg')});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
 });
}
function categoryPage(slug){return categoryBtsPage(slug)}
function setupFilmParallax(){
 disposeFilmParallax();
 setupLandingMedia();
 const panels=[...main.querySelectorAll('.home-film-panel')];
 if(!panels.length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let frame=0;
 const update=()=>{frame=0;const height=innerHeight,rects=panels.map(p=>p.getBoundingClientRect()),category=main.querySelector('.home-film-sequence>.portfolio-section'),categoryRect=category?.getBoundingClientRect();
  if(category)category.style.setProperty('--shadow-opacity',Math.max(0,Math.min(.6,(height-categoryRect.top)/height*.6)));
  panels.forEach((panel,i)=>{
   const rect=rects[i],next=rects[i+1]||categoryRect;
   const covered=!!next&&next.top<=0;
   panel.classList.toggle('is-covered',covered);
   panel.classList.toggle('is-active',!covered&&rect.top<height&&rect.bottom>0);
   if(covered||rect.top>height*1.1)return;
   const raw=next?Math.max(0,Math.min(1,(height-next.top)/height)):0;
   const overlap=raw*raw*(3-2*raw);
   const entering=Math.max(0,Math.min(1,(height-rect.top)/height));
   panel.style.setProperty('--image-y',((1-entering)*-rect.height*.0525-overlap*rect.height*.0225)+'px');
   panel.style.setProperty('--text-y',((1-entering)*24-overlap*75)+'px');
   panel.style.setProperty('--overlap-blur',(overlap*(innerWidth<700?3:5))+'px');
   panel.style.setProperty('--overlap-dim',1-overlap*.24);
   const incoming=Math.max(0,Math.min(1,(height-rect.top)/height));
   panel.style.setProperty('--shadow-opacity',i?incoming*.5:0);
  });
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
 disposeFilmParallax=()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
}
function featuredSrcset(project){
 const cover=media(project.cover||project.stills?.[0]);
 if(!cover.includes('portfolio-v11/')||!cover.endsWith('/01.webp'))return '';
 return `${cover.replace('/01.webp','/01-960.webp')} 960w, ${cover.replace('/01.webp','/01-1600.webp')} 1600w, ${cover} ${project.id==='lempar-bola-disko'?1920:2560}w`;
}
function setupLandingMedia(){
 disposeLandingMedia();
 const images=[...main.querySelectorAll('.home-film-image[data-src]')];
 const opening=main.querySelector('.welcome');
 if(!images.length)return;
 const load=image=>{
  if(image.dataset.requested)return;image.dataset.requested='true';
  image.onload=async()=>{try{await image.decode()}catch{}if(image.isConnected)image.classList.add('is-decoded')};
  if(image.dataset.srcset)image.srcset=image.dataset.srcset;
  image.src=image.dataset.src;
 };
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target)}});
 },{rootMargin:'100% 0px'});
 images.forEach(image=>observer.observe(image));
 const ambient=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-outside',!entry.isIntersecting)));
 if(opening)ambient.observe(opening);
 disposeLandingMedia=()=>{observer.disconnect();ambient.disconnect();images.forEach(image=>image.onload=null)};
}
function homeFeaturedWorks(){
 const ids=data.featuredProjectIds||['let-it-stay-with-you','marongan','maafkan-aku-shifu'];
 const projects=ids.map(id=>data.projects.find(p=>p.id===id)).filter(Boolean);
 return `<section id="featured-works" class="home-film-sequence" aria-label="Selected films">${projects.map((p,i)=>`<article class="home-film-panel" style="--film-focal:${esc(p.focalPoint||'right center')}"><img class="home-film-image" data-src="${media(p.cover||p.stills?.[0])}" data-srcset="${featuredSrcset(p)}" sizes="(max-width:700px) 94vw, 78vw" width="2560" height="1440" alt="${esc(p.title)} — film still" decoding="async" fetchpriority="low"><div class="home-film-shade" aria-hidden="true"></div><div class="home-film-top"><span class="home-film-role">${esc(p.role)}</span><a href="#/category/${categories.find(c=>c[1]===p.role)?.[0]||'director'}">Explore category</a></div><div class="home-film-bottom"><div class="home-film-actions"><span>${esc(p.category)}${p.year&&p.year!=='—'?' · '+esc(p.year):''}</span><button class="glass-button" data-featured-video="${esc(p.id)}">Watch preview</button></div><h2><a href="${projectHref(p)}">${esc(p.title)}</a></h2></div></article>`).join('')}${categoryCards()}</section>`;
}
function setupProjectShowcase(slug,projects){
 disposeProjectShowcase();if(!projects.length)return;
 const stage=main.querySelector('.showcase-stage'),images=stage.querySelector('.showcase-images'),caption=stage.querySelector('.showcase-caption');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let project,stills=[],index=0,timer=0,revision=0;
 const show=()=>{
  const src=stills[index],token=++revision;
  if(!src){images.replaceChildren();caption.textContent='Grabstills belum tersedia';return}
  const image=new Image();image.alt=`${project.title} — grabstill ${index+1}`;image.className='project-grab';image.decoding='async';image.style.objectPosition='right center';
  image.onload=async()=>{
   try{await image.decode()}catch{}
   if(token!==revision||!stage.isConnected)return;
   const old=[...images.children];images.append(image);
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
    if(token===revision&&stage.isConnected)image.classList.add('is-visible');
   }));
   // Keep the outgoing frame opaque beneath the incoming frame: no black dip.
   setTimeout(()=>old.forEach(el=>el.remove()),reduced?0:2100);
   if(stills.length>1){const next=new Image();next.decoding='async';next.src=stills[(index+1)%stills.length]}
  };
  image.onerror=()=>{if(token===revision)caption.textContent='Grabstill belum tersedia'};image.src=src;
 };
 const select=id=>{project=projects.find(p=>p.id===id)||projects[0];showcaseSelections[slug]=project.id;index=0;
  stills=[...new Set([...(project.stills||[]),project.cover].filter(Boolean))];
  stage.href=projectHref(project);stage.setAttribute('aria-label','Preview video '+project.title);caption.textContent=project.dummy?'Dummy project':'';
  main.querySelectorAll('[data-showcase-project]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.showcaseProject===project.id));show();clearInterval(timer);
  if(stills.length>1&&!reduced)timer=setInterval(()=>{if(!stage.isConnected){clearInterval(timer);return}const r=stage.getBoundingClientRect();if(document.hidden||r.bottom<0||r.top>innerHeight)return;index=(index+1)%stills.length;show()},5000);
 };
 main.querySelectorAll('[data-showcase-project]').forEach(b=>{
  b.onpointerenter=()=>{if(project?.id!==b.dataset.showcaseProject)select(b.dataset.showcaseProject)};
  b.onfocus=()=>{if(project?.id!==b.dataset.showcaseProject)select(b.dataset.showcaseProject)};
  b.onclick=()=>{select(b.dataset.showcaseProject);openProjectVideo(project)};
 });
 stage.onclick=e=>{e.preventDefault();openProjectVideo(project)};
 select(showcaseSelections[slug]);disposeProjectShowcase=()=>{clearInterval(timer);revision++};
}
function openProjectVideo(project){
 if(!project)return;
 if(media(project.watchUrl)){location.assign(project.watchUrl);return;}
 document.querySelector('.video-preview-dialog')?.remove();
 const dialog=document.createElement('dialog');dialog.className='video-preview-dialog';dialog.setAttribute('aria-label','Video preview — '+project.title);
 dialog.innerHTML=`<button class="video-preview-close glass-button" type="button" aria-label="Close video preview">Close</button><div class="video-preview-content"><h2>${esc(project.title)}</h2>${media(project.video)?`<video controls playsinline autoplay preload="metadata" src="${media(project.video)}"></video>`:'<p>Video preview akan segera ditambahkan.</p>'}</div>`;
 document.body.append(dialog);const previous=document.activeElement;document.body.classList.add('video-preview-open');
 const cleanup=()=>{dialog.querySelector('video')?.pause();document.body.classList.remove('video-preview-open');if(document.fullscreenElement===dialog)document.exitFullscreen().catch(()=>{});dialog.remove();previous?.focus({preventScroll:true})};
 dialog.addEventListener('close',cleanup,{once:true});dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&dialog.open)dialog.close()});
 dialog.showModal();dialog.requestFullscreen?.().catch(()=>{});
}
function projectHref(project){return media(project.watchUrl)||'#/work/'+encodeURIComponent(project.id)}
function setupBtsShowcase(){
 const hero=main.querySelector('.bts-hero');if(!hero)return;
 hero.setAttribute('aria-label','Behind the scenes — Ary Noor');
 const frames=[...hero.querySelectorAll('.bts-frame')],n=frames.length,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const duration=n*5000,elapsed=(performance.now()+1500)%duration;
 frames.forEach((image,i)=>{image.alt=`Ary Noor behind the scenes — ${i+1}`;image.style.animation='none';image.style.opacity=i===0?'1':'0';if(reduced||n<2)return;
 image.animate([{opacity:0,transform:'scale(1.015)',offset:0},{opacity:1,transform:'scale(1.008)',offset:.05},{opacity:1,transform:'scale(1.02)',offset:1/n},{opacity:0,transform:'scale(1.025)',offset:Math.min(1,1/n+.06)},{opacity:0,transform:'scale(1.025)',offset:1}],{duration,delay:i*5000-elapsed,iterations:Infinity,easing:'linear'});
 });
}
