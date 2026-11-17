/* Ilustraciones SVG del Módulo 5 · Comportamiento del Fuego (representación ilustrativa). */
(()=>{const V=window.SSOVisual;
const tag=t=>`<span class="scene-tag">${t}</span>`;
const person=(x,y,c='#c8592f',s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="7" cy="-40" fill="#e7c34f"/><rect x="-8" y="-33" width="16" height="26" rx="5" fill="${c}"/><rect x="-7" y="-9" width="5" height="17" fill="#3b3a2e"/><rect x="2" y="-9" width="5" height="17" fill="#3b3a2e"/></g>`;
const flame=(x,y,s=1,k=0)=>`<g transform="translate(${x} ${y}) scale(${s})"><path class="fl" style="--d:-${k*.3}s" d="M0 0q-16-26 0-58q6 22 14 10q10 26-2 48z" fill="#ff7a22"/><path class="fl" style="--d:-${k*.3+.15}s" d="M3 0q-8-14 1-30q4 10 7 6q5 14-1 24z" fill="#ffd36a"/></g>`;

/* ---------- Mapa táctico (slides 02, 03, 04, 05) ---------- */
function tacticalSvg(mode){
 const ok=mode==='ok'||mode==='solved',ko=mode==='review-ko';
 let contours='';for(let i=0;i<10;i++)contours+=`<path d="M-20 ${430-i*40} Q200 ${410-i*40} 400 ${425-i*42} T820 ${415-i*40}" fill="none" stroke="#7ff0d4" stroke-opacity="${.12+i*.04}" stroke-width="1.2"/>`;
 const wind=[0,1,2,3,4].map(i=>`<g class="windvec" style="--d:-${i*.5}s"><path d="M${60+i*20} ${120+i*60}h70" stroke="#5aa9ff" stroke-width="3"/><path d="M${130+i*20} ${114+i*60}l12 6-12 6z" fill="#5aa9ff"/></g>`).join('');
 const perim=`<g transform="translate(400 250) rotate(-38)"><ellipse rx="190" ry="78" fill="${ok?'#3f8f3a55':'#c2322688'}" stroke="${ok?'#9fe27a':ko?'#ffb347':'#ff4d3a'}" stroke-width="4" class="${ok?'':'thermal'}"/><ellipse cx="70" rx="90" ry="45" fill="${ok?'#9fe27a33':'#ff8a2a99'}"/></g>`;
 const arrows=ok?'<g class="route" stroke="#9fe27a" stroke-width="5" fill="none" stroke-dasharray="12 9"><path d="M150 420 Q170 340 240 330 T330 190"/><path d="M150 420 Q260 430 330 390 T560 330"/></g><text x="120" y="445" fill="#d9ffc4" font-size="14">INGRESO SEGURO DESDE LA COLA</text>':'';
 return `<svg viewBox="0 0 800 460" role="img" aria-label="Mapa táctico: pendiente de 35 % ascendente hacia el norte, viento hacia el este y perímetro térmico del incendio"><defs><radialGradient id="tg"><stop stop-color="#1f4a45"/><stop offset="1" stop-color="#0b1d1f"/></radialGradient></defs><rect width="800" height="460" fill="url(#tg)"/><g stroke="#7ff0d4" stroke-opacity=".08">${Array.from({length:17},(_,i)=>`<path d="M${i*50} 0v460"/>`).join('')}${Array.from({length:10},(_,i)=>`<path d="M0 ${i*50}h800"/>`).join('')}</g>${contours}${perim}${wind}${arrows}<g transform="translate(400 32)"><path d="M0 -14l9 22H-9z" fill="#ffe38a"/><text y="28" text-anchor="middle" fill="#ffe38a" font-size="14" font-weight="700">N</text></g><g transform="translate(690 230)"><path d="M0 60V-40" stroke="#ffe38a" stroke-width="4"/><path d="M-10 -36 0 -56 10 -36z" fill="#ffe38a"/><text x="-12" y="84" fill="#ffe8a6" font-size="13" text-anchor="middle">PENDIENTE 35 %</text></g><text x="480" y="448" fill="#9fcbff" font-size="13" font-weight="700">VIENTO → ESTE</text>${mode==='context'?'<rect class="scan" x="0" y="0" width="800" height="6" fill="#7ff0d4" opacity=".6"/>':''}</svg>`}
V.map=(c,mode)=>tacticalSvg(mode);

/* ---------- Cárcava isométrica (slides 07, 08, 09) ---------- */
function gully(opts={}){const {chosen,state='choose',lock}=opts;
 const walls='<path d="M120 460 L330 120 L470 120 L680 460Z" fill="#6b5a3c"/><path d="M330 120 L400 300 L470 120Z" fill="#4c3d27"/><path d="M120 460 L400 300 L680 460Z" fill="#3b2f1f"/><path d="M0 120 H330 L120 460 H0Z" fill="#7d7a52"/><path d="M470 120 H800 V460 H680Z" fill="#8a8a5a"/>';
 const scrub=Array.from({length:14},(_,i)=>`<circle cx="${180+i*32}" cy="${430-(i%3)*12}" r="6" fill="#55502e"/>`).join('');
 const bottomFire=[0,1,2].map(i=>flame(350+i*40,430,state==='ok'||state==='ko'?1.3:.7,i)).join('');
 const torch=state==='ok'||state==='ko'&&chosen==='A'?'<path class="torch" d="M360 420 Q380 260 400 100 Q420 260 440 420Z" fill="url(#torchg)"/>':'';
 const engulf=state==='ko'?`<circle class="engulf" cx="${chosen==='A'?400:chosen==='C'?400:640}" cy="${chosen==='A'?110:chosen==='C'?400:200}" r="70" fill="#ff5a2a" opacity=".55"/>`:'';
 const pos={A:[400,110],B:[650,200],C:[400,395]};
 const marks=Object.entries(pos).map(([k,[x,y]])=>{const safe=k==='B';const cls=lock?(safe?'mk safe':'mk off'):state==='ok'?(safe?'mk safe':'mk off'):chosen===k?'mk chosen':'mk';return `<g class="${cls}" transform="translate(${x} ${y})"><circle r="26"/><text y="8" text-anchor="middle" font-size="22" font-weight="700">${k}</text>${state==='ok'&&safe||lock&&safe?person(0,-34,'#c8592f',.9):''}</g>`}).join('');
 return `<div class="scene-view gully ${state}"><svg viewBox="0 0 800 460" role="img" aria-label="Mapa isométrico de la cárcava con las posiciones A (boca), B (explanada lateral) y C (fondo de la quebrada)"><defs><linearGradient id="torchg" x2="0" y2="1"><stop stop-color="#ffd36a" stop-opacity=".2"/><stop offset=".5" stop-color="#ff7a22" stop-opacity=".9"/><stop offset="1" stop-color="#ff3b1a"/></linearGradient></defs><rect width="800" height="460" fill="#a89e7a"/>${walls}${scrub}${bottomFire}${torch}${engulf}${marks}<text x="400" y="80" fill="#fff3c4" font-size="12" text-anchor="middle">BOCA DE LA CÁRCAVA</text><text x="650" y="150" fill="#fff3c4" font-size="12" text-anchor="middle">EXPLANADA LATERAL</text></svg>${tag('CÁRCAVA · VISTA ISOMÉTRICA')}${state==='ko'?'<div class="mayday">MAYDAY</div>':''}</div>`}
V.cardMap=(c,chosen,lock)=>gully({chosen,lock,state:'choose'});

/* ---------- Línea de control y pavesa (slides 10, 12, 13) ---------- */
function line(state){
 const black='<path d="M0 230 H330 V460 H0Z" fill="#2a2622"/>'+Array.from({length:8},(_,i)=>`<path class="smk" style="--d:-${i*.6}s" d="M${20+i*40} 240 q10 -30 0 -60" stroke="#8a857a" stroke-width="6" fill="none" opacity=".4"/>`).join('');
 const green='<path d="M380 230 H800 V460 H380Z" fill="#7b8a4e"/>'+Array.from({length:12},(_,i)=>`<path d="M${400+i*34} 236l12-40 12 40Z" fill="#35553e"/>`).join('')+Array.from({length:30},(_,i)=>`<path d="M${400+(i*13)%400} ${300+(i*29)%150}l3-14 3 14" stroke="#c9b26a" stroke-width="2" fill="none"/>`).join('');
 const strip='<path d="M330 230 H380 V460 H330Z" fill="#b59a6a"/><text x="355" y="452" fill="#3b2f1f" font-size="11" text-anchor="middle">FAJA</text>';
 const crew=[0,1,2,3,4].map(i=>person(345+(i%2)*14,290+i*32,'#c8592f',.8)).join('');
 const spot=[680,330];
 const ember=state==='context'?`<path d="M300 200 Q480 60 ${spot[0]} ${spot[1]}" stroke="#ffb347" stroke-width="2" stroke-dasharray="4 6" fill="none"/><circle class="ember-fly" r="7" fill="#ffcf5a"><animateMotion dur="2.6s" repeatCount="indefinite" path="M300 200 Q480 60 ${spot[0]} ${spot[1]}"/></circle><text x="560" y="120" fill="#fff3c4" font-size="13">150 m · RETAGUARDIA</text>`:'';
 const ok=state==='ok'?`${person(560,360,'#3f6f9e',.9)}${person(600,350,'#3f6f9e',.9)}<g class="retreat2"><path d="M380 360 Q500 380 650 335" stroke="#9fe27a" stroke-width="4" stroke-dasharray="10 8" fill="none" class="route"/></g><circle cx="${spot[0]}" cy="${spot[1]}" r="16" fill="#8a857a"/><path class="smk" d="M${spot[0]} ${spot[1]-10} q8 -24 0 -46" stroke="#c9c3b6" stroke-width="5" fill="none"/><text x="${spot[0]}" y="${spot[1]+36}" fill="#d9ffc4" font-size="12" text-anchor="middle">PAVESA LIQUIDADA</text>`:'';
 const ko=state==='ko'?`<g class="ring">${Array.from({length:14},(_,i)=>{const a=i/14*Math.PI*2;return flame(spot[0]+Math.cos(a)*90,spot[1]+Math.sin(a)*60+20,.9,i)}).join('')}</g><rect width="800" height="460" fill="#3a2a20" opacity=".35" class="smoke-veil"/>`:`${state==='context'?flame(spot[0],spot[1]+10,.5,1):''}`;
 return `<div class="scene-view fireline ${state}"><svg viewBox="0 0 800 460" role="img" aria-label="Faja de control con zona negra a la izquierda y vegetación intacta a la derecha"><defs><linearGradient id="fsky" x2="0" y2="1"><stop stop-color="${state==='ko'?'#5a2a20':'#8f7f6a'}"/><stop offset="1" stop-color="#cdb791"/></linearGradient></defs><rect width="800" height="460" fill="url(#fsky)"/>${black}${green}${strip}${crew}${ember}${ok}${ko}</svg>${tag('LÍNEA DE CONTROL · SALTO DE FUEGO')}</div>`}

/* ---------- Escenas ---------- */
V.scene=(c,ctx)=>{const {a2,ch,dnd,cards,m}=ctx;
 if(c.type==='intro'){const glow='<rect width="800" height="460" fill="#3a2a22" opacity=".45"/><ellipse cx="620" cy="190" rx="260" ry="120" fill="#ff7a22" opacity=".35" class="glowpulse"/>';
  const truck='<g transform="translate(30 300) scale(.8)"><rect x="0" y="20" width="250" height="78" rx="6" fill="url(#red)"/><rect x="250" y="38" width="88" height="60" rx="8" fill="#b8473a"/><path d="M262 44h52l16 26h-68Z" fill="url(#glass)"/><circle cx="62" cy="104" r="20" fill="#232622"/><circle cx="282" cy="104" r="20" fill="#232622"/></g>';
  return `<div class="visual-wrap pov">${window.RodalVisual('forest',{}).replace(/<span class="scene-tag">[^<]*<\/span>/,tag('PRIMERA FUERZA DE ATAQUE')).replace('</svg>',glow+truck+'</svg>')}<div class="hud-panel"><small>MÓDULO 1 - CONCEPTOS BÁSICOS DE LOS INCENDIOS FORESTALES</small><b>${c.hud}</b></div></div>`}
 if(c.type==='context'){
  if(c.case===1)return `<div class="scene-view holo">${tacticalSvg('context')}${tag('VISTA DE DRON · HUD TÁCTICO')}</div>`;
  if(c.case===2)return `<div class="visual-wrap">${firstPersonGully()}</div>`;
  return `<div class="visual-wrap strobe">${line('context')}</div>`}
 if(c.type==='ok'){
  if(c.case===1)return `<div class="visual-wrap ok-glow">${dnd(ctx.byId(3),'ok')}</div>`;
  if(c.case===2)return gully({state:'ok'});
  return line('ok')}
 if(c.type==='ko'){
  if(c.case===1)return `<div class="visual-wrap ${a2?'':'amber'}">${dnd(m,a2?'solved':'review-ko')}</div>`;
  if(c.case===2)return a2?`<div class="visual-wrap">${cards(m,'B',true)}</div>`:`<div class="visual-wrap red shake">${gully({state:'ko',chosen:ch})}</div>`;
  return a2?`<div class="visual-wrap">${cards(m,'A',true)}</div>`:`<div class="visual-wrap red">${line('ko')}${ch==='T'?'<p class="timeout">TIEMPO AGOTADO</p>':''}</div>`}
 return ''};
function firstPersonGully(){
 return `<div class="scene-view fpgully"><svg viewBox="0 0 800 460" role="img" aria-label="Vista en primera persona hacia el fondo de una cárcava en forma de V con fuego superficial"><rect width="800" height="460" fill="#a08f6c"/><path d="M0 0 H800 V60 L520 420 H280 L0 60Z" fill="#b8a57a"/><path d="M0 60 L280 420 H0Z" fill="#6b5a3c"/><path d="M800 60 L520 420 H800Z" fill="#5d4d33"/><path d="M280 420 L400 300 L520 420Z" fill="#3b2f1f"/>${Array.from({length:16},(_,i)=>`<circle cx="${60+i*45}" cy="${80+((i*53)%300)}" r="${5+i%4}" fill="#55502e"/>`).join('')}${[0,1,2,3].map(i=>flame(330+i*40,425,.6,i)).join('')}<g class="dust">${Array.from({length:10},(_,i)=>`<circle cx="${100+i*60}" cy="${120+(i%4)*50}" r="2" fill="#efe2c0" opacity=".6"/>`).join('')}</g></svg>${tag('CÁRCAVA · PRIMERA PERSONA')}<div class="temp-hud"><small>HUD</small><b>TEMPERATURA AMBIENTE</b><span class="temp-bar"><i></i></span></div></div>`}
})();
