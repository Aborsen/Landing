/* ── Showcase global vars + goToStep (click-only, no auto-rotate) ── */
var cur=0, showcaseStarted=false;

function stopAllDemos(){
  if(typeof p0stopDemo==='function') p0stopDemo();
  if(typeof p1_chain!=='undefined') p1_chain.forEach(id=>clearTimeout(id));
  if(typeof p2_chain!=='undefined') p2_chain.forEach(id=>clearTimeout(id));
}
function goToStep(n){
  stopAllDemos();
  document.querySelectorAll('.sc-step').forEach((el,i)=>{
    el.classList.toggle('active',i===n);
  });
  document.querySelectorAll('.sc-panel').forEach((p,i)=>{
    p.classList.remove('active');
    if(i===n){
      // Branch on the panel's id, not its position: the slide order changes, and an
      // index-keyed branch would hand a panel another panel's reset routine.
      const id = p.id;
      // p0 has interactive sub-screens — never clone it, just activate
      if(id==='p0'){
        if(typeof p1_chain!=='undefined') p1_chain.forEach(id=>clearTimeout(id));
        p0stopDemo();
        p0reset(); // synchronous reset before panel visible
        requestAnimationFrame(()=>{ p.classList.add('active'); });
        if(typeof p0startDemo==='function') setTimeout(p0startDemo, 300);
      } else if(id==='p1'){
        p0stopDemo();
        // reset p1 cursor instantly
        const _p1cur=document.getElementById('p1cursor');if(_p1cur)_p1cur.style.display='none';
        requestAnimationFrame(()=>p.classList.add('active'));
        if(typeof p1Init==='function') setTimeout(p1Init, 100);
      } else if(id==='p2'){
        p2_chain.forEach(id=>clearTimeout(id));
        // reset p2 state instantly before panel becomes visible. Null-guarded so a
        // markup change can never abort goToStep before the panel is activated.
        const _p2 = id => document.getElementById(id);
        ['p2msgUser','p2working','p2reply'].forEach(id=>{ const e=_p2(id); if(e) e.style.display='none'; });
        ['p2typed','p2typed2'].forEach(id=>{ const e=_p2(id); if(e) e.textContent=''; });
        const _ph=_p2('p2ph');      if(_ph) _ph.style.display='';
        const _tk=_p2('p2token');   if(_tk) _tk.style.display='none';
        const _bd=_p2('p2body');    if(_bd) _bd.scrollTop=0;
        const _ti=_p2('p2title');   if(_ti) _ti.textContent='Untitled';
        const _ch=document.querySelector('#p2 .ch-chart'); if(_ch) _ch.classList.remove('drawn');
        const _cu=_p2('p2cursor');  if(_cu) _cu.style.display='none';
        requestAnimationFrame(()=>p.classList.add('active'));
        if(typeof p2Init==='function') setTimeout(p2Init,100);
      } else {
        const clone=p.cloneNode(true);
        p.parentNode.replaceChild(clone,p);
        requestAnimationFrame(()=>clone.classList.add('active'));
      }
    }
  });
  cur=n;
}

/* ── P0 cursor & demo engine ── */
// ── P0 cursor & demo engine ──────────────────────────────

let _p0t = null;
let _p0chain = [];

function p0stopDemo(){
  _p0chain.forEach(id=>clearTimeout(id));
  _p0chain = [];
}

function _p0T(fn, ms){ const id=setTimeout(fn,ms); _p0chain.push(id); }

// Move cursor to element center, relative to the inner container
function _p0mov(el){
  const cursor = document.getElementById('p0cursor');
  const container = document.getElementById('p0inner');
  if(!cursor||!el||!container) return;
  const cr = container.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  cursor.style.left = (er.left - cr.left + er.width/2  - 9) + 'px';
  cursor.style.top  = (er.top  - cr.top  + er.height/2 - 9) + 'px';
}

function _p0clk(el, cb){
  _p0mov(el);
  const cursor = document.getElementById('p0cursor');
  setTimeout(()=>{
    if(cursor){ cursor.classList.add('clicking'); setTimeout(()=>cursor.classList.remove('clicking'),250); }
    if(cb) setTimeout(cb, 150);
  }, 480);
}

function _p0type(inputId, text, speed=58){
  const inp = document.getElementById(inputId);
  if(!inp) return;
  inp.classList.add('p0-focus'); inp.value='';
  let i=0;
  const iv=setInterval(()=>{ inp.value=text.slice(0,++i); if(i>=text.length){clearInterval(iv); inp.classList.remove('p0-focus');} }, speed);
  _p0chain.push(iv);
}

function p0clearInputs(){
  const el=document.getElementById('p0iAccount');
  if(el) el.textContent='';
}

function p0reset(){
  const s2=document.getElementById('p0s2');
  const s3=document.getElementById('p0s3');
  const modal=document.getElementById('p0modal');
  const success=document.getElementById('p0success');
  const lbl=document.getElementById('p0-lbl');
  const btn=document.getElementById('p0ConnectBtn');
  const sp=document.getElementById('p0Spinner');
  const bl=document.getElementById('p0BtnLbl');
  const cursor=document.getElementById('p0cursor');
  if(s2){s2.style.transition='none';s2.style.opacity='0';s2.style.pointerEvents='none';setTimeout(()=>s2.style.transition='',50);}
  if(s3){s3.style.transition='none';s3.style.opacity='0';s3.style.pointerEvents='none';setTimeout(()=>s3.style.transition='',50);}
  if(modal){modal.style.transition='none';modal.style.transform='scale(.95) translateY(8px)';}
  if(success){success.style.transition='none';success.style.transform='scale(.9) translateY(10px)';}
  setTimeout(()=>{ if(modal) modal.style.transition=''; if(success) success.style.transition=''; }, 50);
  if(lbl) lbl.textContent='Data Sources';
  if(btn) btn.disabled=false;
  if(sp) sp.style.display='none';
  if(bl) bl.style.display='inline';
  if(cursor) cursor.style.display='none';
  // The hover state was only ever undone by the click beat, so a demo interrupted
  // mid-hover left HubSpot dimmed with its Connect pill showing. Clear it here too.
  const hbg=document.getElementById('p0hubspot-bg');
  const hbt=document.getElementById('p0hubspot-btn');
  if(hbg) hbg.style.background='rgba(0,0,0,0)';
  if(hbt) hbt.style.opacity='0';
  p0clearInputs();
}

function p0showModal(){
  const s2=document.getElementById('p0s2');
  const modal=document.getElementById('p0modal');
  const lbl=document.getElementById('p0-lbl');
  if(lbl) lbl.textContent='Connect HubSpot';
  if(s2){s2.style.opacity='1';s2.style.pointerEvents='auto';}
  setTimeout(()=>{ if(modal) modal.style.transform='scale(1) translateY(0)'; },30);
}

function p0showSpinner(){
  const sp=document.getElementById('p0Spinner');
  const bl=document.getElementById('p0BtnLbl');
  const btn=document.getElementById('p0ConnectBtn');
  if(sp) sp.style.display='block';
  if(bl) bl.style.display='none';
  if(btn) btn.disabled=true;
}

function p0showSuccess(){
  const s2=document.getElementById('p0s2');
  const s3=document.getElementById('p0s3');
  const success=document.getElementById('p0success');
  const lbl=document.getElementById('p0-lbl');
  const cursor=document.getElementById('p0cursor');
  if(s2){s2.style.opacity='0';s2.style.pointerEvents='none';}
  if(s3){s3.style.opacity='1';s3.style.pointerEvents='auto';}
  if(lbl) lbl.textContent='Connected!';
  if(cursor) cursor.style.display='none';
  setTimeout(()=>{ if(success) success.style.transform='scale(1) translateY(0)'; },30);
}

// Full 10-second demo:
// 0.3  cursor appears
// 0.7  moves to the HubSpot catalog card
// 1.2  hover → card darkens, "Connect" pill fades in
// 2.0  clicks → OAuth consent modal opens
// 2.7  moves to the account field
// 3.1  types the HubSpot account
// 5.2  moves to "Allow access"
// 5.7  clicks → spinner
// 7.7  success screen
// 18.7 loop — 11s hold on the success screen
function p0startDemo(){
  p0stopDemo();
  p0reset();

  const cursor=document.getElementById('p0cursor');

  // Show cursor
  _p0T(()=>{
    if(!cursor) return;
    cursor.style.transition='none';
    cursor.style.left='55px'; cursor.style.top='40px';
    cursor.style.display='block';
    setTimeout(()=>{ cursor.style.transition='left .45s cubic-bezier(.4,0,.2,1),top .45s cubic-bezier(.4,0,.2,1)'; },30);
  }, 300);

  // Move to HubSpot card
  _p0T(()=>{ _p0mov(document.getElementById('p0hubspot')); }, 700);

  // Hover: darken + show Connect button
  _p0T(()=>{
    const bg=document.getElementById('p0hubspot-bg');
    const sb=document.getElementById('p0hubspot-btn');
    if(bg) bg.style.background='rgba(0,0,0,.75)';
    if(sb) sb.style.opacity='1';
  }, 1200);

  // Move cursor onto the Connect pill
  _p0T(()=>{
    const sb=document.getElementById('p0hubspot-btn');
    if(sb&&cursor){
      const cont=document.getElementById('p0inner').getBoundingClientRect();
      const er=sb.getBoundingClientRect();
      cursor.style.left=(er.left-cont.left+er.width/2-9)+'px';
      cursor.style.top=(er.top-cont.top+er.height/2-9)+'px';
    }
  }, 1600);

  // Click → open OAuth
  _p0T(()=>{
    cursor.classList.add('clicking');
    setTimeout(()=>cursor.classList.remove('clicking'),250);
    const bg=document.getElementById('p0hubspot-bg');
    const sb=document.getElementById('p0hubspot-btn');
    if(bg) bg.style.background='rgba(0,0,0,0)';
    if(sb) sb.style.opacity='0';
    p0showModal();
  }, 2000);

  // Move to account field & type email
  _p0T(()=>{ _p0mov(document.getElementById('p0iAccount')); }, 2700);
  _p0T(()=>{
    const el=document.getElementById('p0iAccount');
    if(!el) return;
    el.classList.add('p0-focus');
    const txt='revops@acme-corp.com'; let i=0;
    const iv=setInterval(()=>{
      el.textContent=txt.slice(0,++i);
      if(i>=txt.length){ clearInterval(iv); el.classList.remove('p0-focus'); }
    }, 60);
    _p0chain.push(iv);
  }, 3100);

  // Move to Allow access
  _p0T(()=>{ _p0mov(document.getElementById('p0ConnectBtn')); }, 5200);
  _p0T(()=>{ _p0clk(document.getElementById('p0ConnectBtn'), ()=>p0showSpinner()); }, 5700);
  _p0T(()=>{ p0showSuccess(); }, 7700);
  // loop: restart after showing success
  // 11s on the success screen, matching steps 2 and 3
  _p0T(()=>{ if(cur === 0) p0startDemo(); }, 18700);
}

// Manual click handlers
function p0go(n){
  p0stopDemo();
  if(n===1){ p0reset(); }
  if(n===2){ p0showModal(); }
  if(n===3){ p0showSuccess(); }
}

function p0connect(){
  p0stopDemo();
  p0showSpinner();
  const cursor=document.getElementById('p0cursor');
  if(cursor) cursor.style.display='none';
  setTimeout(()=>p0showSuccess(), 1800);
}

/* ── P1/P2/P3/P4 JS engines ── */
/* ── P1 METRICS PANEL JS ── */
/* Mirrors the app's /metrics page: browse the built-in library by category, then
   define a custom metric. Beats (≈21.6s, loops while step 2 is on screen):
   0.4  cursor in — banner reads, Business Intelligence selected
   1.6  click "Marketing"          → heading + card grid swap
   3.3  click "+ Create metric"    → modal
   4.1  type Name                  → Alias auto-derives (slugified)
   5.4  type Definition            → char counter tracks
   7.3  click "Connection"         → field label + placeholder swap
   8.0  open the select            → pick "Google Ads (Google Ads)"
   9.4  click Save                 → spinner → modal closes → toast
  10.6  ~11s hold on the saved library (toast for the first 2.6s), then loop */

// p1 metrics panel vars — resolved lazily
let p1WIN, p1cur;
let p1_loopCount = 0;
let p1_chain = [];

const P1_NAME = 'Return on ad spend';
const P1_DEF  = 'Conversion value divided by ad spend, by campaign and month.';

function p1_t(ms){ return new Promise(r => { const id = setTimeout(r, ms); p1_chain.push(id); }); }

function p1_pos(el){
  const wr = p1WIN.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return {
    x: er.left - wr.left + er.width/2,
    y: er.top - wr.top + er.height/2
  };
}

function p1_moveTo(x, y){
  p1cur.style.left = (x-2)+'px';
  p1cur.style.top = (y-2)+'px';
}

async function p1_moveCursor(el, ox=0, oy=0){
  const p = p1_pos(el);
  p1_moveTo(p.x+ox, p.y+oy);
  await p1_t(200);
}

async function p1_click(el, ox=0, oy=0){
  await p1_moveCursor(el, ox, oy);
  p1cur.classList.add('clicking');
  await p1_t(100);
  p1cur.classList.remove('clicking');
}

function p1_showCursor(){
  p1cur.style.display = 'block';
  p1cur.style.transition = 'none';
  p1_moveTo(80, 40);
  requestAnimationFrame(()=>{
    p1cur.style.transition = 'left .4s cubic-bezier(.4,0,.2,1), top .4s cubic-bezier(.4,0,.2,1)';
  });
}

// The app derives the alias from the metric name — mirror that slugification.
function p1_alias(name){
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
}

// Type the name; the Alias field fills character-by-character alongside it.
async function p1_typeName(el, text, speed=58){
  const alias = document.getElementById('p1fAlias');
  el.classList.add('focused');
  el.value = '';
  for(const ch of text){
    el.value += ch;
    if(alias) alias.textContent = p1_alias(el.value);
    await p1_t(speed);
  }
  el.classList.remove('focused');
}

// Type the definition; the character counter tracks it.
async function p1_typeDef(el, text, speed=26){
  const count = document.getElementById('p1defCount');
  el.classList.add('focused');
  el.value = '';
  for(const ch of text){
    el.value += ch;
    if(count) count.textContent = el.value.length + ' / 1500 chars';
    await p1_t(speed);
  }
  el.classList.remove('focused');
}

// Category switch: active pill + "Top 5 Data Sources for …" + which card grid shows.
function p1_setCategory(cat){
  const bi = cat === 'bi';
  const pillBI = document.getElementById('p1pillBI');
  const pillMK = document.getElementById('p1pillMK');
  if(pillBI) pillBI.classList.toggle('active', bi);
  if(pillMK) pillMK.classList.toggle('active', !bi);
  const label = document.getElementById('p1catName');
  if(label) label.textContent = bi ? 'Business Intelligence' : 'Marketing';
  const show = document.getElementById(bi ? 'p1gridBI' : 'p1gridMK');
  const hide = document.getElementById(bi ? 'p1gridMK' : 'p1gridBI');
  if(hide) hide.style.display = 'none';
  if(!show) return;
  show.style.display = '';
  show.style.transition = 'none';
  show.style.opacity = '0';
  show.style.transform = 'translateY(4px)';
  requestAnimationFrame(()=>{
    show.style.transition = 'opacity .28s ease, transform .28s ease';
    show.style.opacity = '1';
    show.style.transform = 'translateY(0)';
  });
}

// "Link to" segmented control — swaps the field below between Data Source and Connection.
function p1_setLink(mode){
  const conn = mode === 'conn';
  const segDS = document.getElementById('p1segDS');
  const segConn = document.getElementById('p1segConn');
  if(segDS) segDS.classList.toggle('active', !conn);
  if(segConn) segConn.classList.toggle('active', conn);
  const label = document.getElementById('p1linkLabel');
  if(label) label.textContent = conn ? 'Connection' : 'Data Source';
  const val = document.getElementById('p1selVal');
  if(val){
    val.className = 'mx-sel-ph';
    val.textContent = conn ? 'Select a connection…' : 'Select a data source…';
  }
}

function p1_closeAllDrops(){
  const dd = document.getElementById('p1dd');
  const sel = document.getElementById('p1sel');
  if(dd) dd.classList.remove('open');
  if(sel) sel.classList.remove('open');
}

function p1_closeModal(){
  const ov = document.getElementById('p1ov');
  if(ov) ov.classList.remove('show');
  p1_closeAllDrops();
}

async function p1_runDemo(){
  // resolve DOM refs fresh each run (panel may have been re-rendered)
  p1WIN = document.querySelector('#p1 .aw');
  p1cur = document.getElementById('p1cursor');
  if(!p1WIN || !p1cur){ console.warn('p1: DOM not ready'); return; }
  p1_chain = [];

  // ── reset ──
  const ov    = document.getElementById('p1ov');
  const name  = document.getElementById('p1fName');
  const def   = document.getElementById('p1fDef');
  const save  = document.getElementById('p1btnSave');
  const toast = document.getElementById('p1SuccessToast');
  ov.classList.remove('show');
  toast.classList.remove('show');
  save.classList.remove('loading');
  name.value = '';
  def.value = '';
  document.getElementById('p1fAlias').textContent = '';
  document.getElementById('p1defCount').textContent = '0 / 1500 chars';
  document.querySelectorAll('#p1dd .mx-dd-i').forEach(i => i.classList.remove('selected'));
  p1_closeAllDrops();
  p1_setLink('ds');
  p1_setCategory('bi');

  await p1_t(400);
  p1_showCursor();
  await p1_t(1200);          // let the library read before anything moves

  // 1. Switch category — the library covers every source, not one vertical
  await p1_click(document.getElementById('p1pillMK'));
  p1_setCategory('mk');
  await p1_t(1400);

  // 2. Open "Create metric"
  await p1_click(document.getElementById('p1btnCreate'));
  ov.classList.add('show');
  await p1_t(450);

  // 3. Name → alias auto-derives
  await p1_moveCursor(name);
  await p1_t(120);
  await p1_typeName(name, P1_NAME);
  await p1_t(320);

  // 4. Definition in plain English
  await p1_moveCursor(def);
  await p1_t(120);
  await p1_typeDef(def, P1_DEF);
  await p1_t(340);

  // 5. Link the metric to a connection instead of a raw data source
  await p1_click(document.getElementById('p1segConn'));
  p1_setLink('conn');
  await p1_t(400);

  // 6. Pick the Google Ads connection
  const sel = document.getElementById('p1sel');
  const dd  = document.getElementById('p1dd');
  await p1_click(sel);
  sel.classList.add('open');
  dd.classList.add('open');
  await p1_t(300);
  const item = document.getElementById('p1ddGoogleAds');
  await p1_click(item);
  item.classList.add('selected');
  dd.classList.remove('open');
  sel.classList.remove('open');
  const val = document.getElementById('p1selVal');
  val.className = '';
  val.textContent = 'Google Ads (Google Ads)';
  await p1_t(420);

  // 7. Save → spinner → toast
  await p1_moveCursor(save);
  await p1_t(140);
  await p1_click(save);
  save.classList.add('loading');
  await p1_t(900);
  save.classList.remove('loading');
  ov.classList.remove('show');
  await p1_t(260);
  toast.classList.add('show');
  p1_moveTo(560, 90);
  await p1_t(2600);
  toast.classList.remove('show');
  p1cur.style.display = 'none';

  // loop while this step is still on screen
  // the rest of the ~11s hold, on the saved metrics list with the toast gone
  p1_loopCount++;
  await p1_t(8140);
  if(cur === 1) p1_runDemo();
}

// p1 demo started via p1Init() from goToStep

function p1Init(){
  p1_chain.forEach(id=>clearTimeout(id));
  p1_chain = [];
  p1_loopCount = 0;
  setTimeout(p1_runDemo, 300);
}
/* ── P2 CHAT PANEL JS ── */
/* Mirrors the app's /chat. Beats (≈23s, loops while step 3 is on screen):
   0.3  cursor to the composer
   0.6  type the question; @return_on_ad_spend lands as a metric token
   3.4  Send → user message; Send button becomes Stop
   4.0  tool calls + interpretation + Google_Ads__Execute + "Thinking…"
   6.6  the answer replaces it — the chart draws inline in the reply body
  19.8  back to Send, hold ~11s on the finished answer, loop. It fits without scrolling. */
let p2WIN, p2cur2;
let p2_chain = [];

const P2_Q1 = 'show me ';
const P2_Q2 = ' by month';

function p2_t(ms){ return new Promise(r=>{ const id=setTimeout(r,ms); p2_chain.push(id); }); }

function p2_pos(el){
  const wr = p2WIN.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return { x: er.left-wr.left+er.width/2, y: er.top-wr.top+er.height/2 };
}
function p2_moveTo(x,y){ p2cur2.style.left=(x-2)+'px'; p2cur2.style.top=(y-2)+'px'; }
async function p2_moveCursor(el,ox=0,oy=0){
  const p=p2_pos(el); p2_moveTo(p.x+ox,p.y+oy); await p2_t(220);
}
async function p2_click(el){
  await p2_moveCursor(el);
  p2cur2.classList.add('clicking'); await p2_t(100); p2cur2.classList.remove('clicking');
}
async function p2_typeInto(el, text, speed=42){
  for(const ch of text){ el.textContent += ch; await p2_t(speed); }
}

async function p2_runDemo(){
  p2WIN  = document.querySelector('#p2 .aw');
  p2cur2 = document.getElementById('p2cursor');
  if(!p2WIN||!p2cur2) return;
  p2_chain = [];

  const body    = document.getElementById('p2body');
  const ph      = document.getElementById('p2ph');
  const typed   = document.getElementById('p2typed');
  const token   = document.getElementById('p2token');
  const typed2  = document.getElementById('p2typed2');
  const input   = document.getElementById('p2input');
  const sendBtn = document.getElementById('p2sendBtn');
  const sendLbl = document.getElementById('p2sendLbl');
  const sendIco = document.getElementById('p2sendIco');
  const title   = document.getElementById('p2title');
  const msgUser = document.getElementById('p2msgUser');
  const working = document.getElementById('p2working');
  const reply   = document.getElementById('p2reply');
  const chart   = reply.querySelector('.ch-chart');

  // ── reset ──
  ph.style.display='';
  typed.textContent=''; typed2.textContent='';
  token.style.display='none';
  msgUser.style.display='none';
  working.style.display='none';
  reply.style.display='none';
  chart.classList.remove('drawn');
  body.scrollTop=0;
  title.textContent='Untitled';
  sendLbl.textContent='Send';
  sendIco.style.display='';
  sendBtn.classList.remove('stopping');
  p2cur2.style.display='none';

  await p2_t(300);

  // 1. cursor into the composer
  p2cur2.style.display='block';
  p2cur2.style.transition='none';
  p2_moveTo(70, p2WIN.getBoundingClientRect().height - 30);
  requestAnimationFrame(()=>{
    p2cur2.style.transition='left .4s cubic-bezier(.4,0,.2,1),top .4s cubic-bezier(.4,0,.2,1)';
  });
  await p2_moveCursor(input);
  await p2_t(180);

  // 2. type the question — the @alias resolves to a metric token
  ph.style.display='none';
  await p2_typeInto(typed, P2_Q1);
  await p2_t(120);
  token.style.display='inline';
  await p2_t(260);
  await p2_typeInto(typed2, P2_Q2);
  await p2_t(420);

  // 3. Send → the question joins the thread, Send turns into Stop
  await p2_click(sendBtn);
  ph.style.display='';
  typed.textContent=''; typed2.textContent='';
  token.style.display='none';
  msgUser.style.display='';
  title.textContent='Return on Ad Spend';
  sendLbl.textContent='Stop';
  sendIco.style.display='none';
  sendBtn.classList.add('stopping');
  p2cur2.style.display='none';
  await p2_t(450);

  // 4. tool calls + interpretation while it works
  working.style.display='';
  await p2_t(2600);

  // 5. the answer, with the chart inline in the reply body
  working.style.display='none';
  reply.style.display='';
  sendLbl.textContent='Send';
  sendIco.style.display='';
  sendBtn.classList.remove('stopping');
  await p2_t(260);
  chart.classList.add('drawn');
  // Long hold: the finished answer is a chart plus "What I used" and two bullets.
  // 4.2s was enough to see it land but not to read it, and nothing auto-advances
  // off this step — a longer hold only means the demo restarts less often.
  await p2_t(11000);

  // loop while this step is still on screen
  if(cur === 2) p2_runDemo();
}

function p2Init(){
  p2_chain.forEach(id=>clearTimeout(id));
  p2_chain=[];
  setTimeout(p2_runDemo, 300);
}

/* ── initShowcase ── */

function initShowcase() {
  const mount = document.getElementById('showcase-mount');
  if (!mount) return;
  if (mount.children.length > 0) {
    // already mounted — only start first step if scrolled into view
    if (!showcaseStarted) { cur = 0; goToStep(0); showcaseStarted = true; }
    return;
  }
  const tmpl = document.getElementById('showcase-template');
  if (!tmpl) return;
  mount.appendChild(tmpl.content.cloneNode(true));
  // Fade-in observer for general elements
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.07});
  mount.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));
  document.addEventListener('click', e => {
    if(!e.target.closest('#p1 .mx-sel') && !e.target.closest('#p1 .mx-dd')) {
      if(typeof p1_closeAllDrops === 'function') p1_closeAllDrops();
    }
  });
  // Scroll-triggered: start first step animation only when showcase enters viewport
  const scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting && !showcaseStarted){
        showcaseStarted = true;
        cur = 0; goToStep(0);
        scrollObs.disconnect();
      }
    });
  }, {threshold: 0.15});
  const showcase = mount.querySelector('.showcase');
  if(showcase) scrollObs.observe(showcase);
}
window.initShowcase = initShowcase;
// Don't auto-init: the React HowItWorks component calls window.initShowcase
// from a useEffect after hydration. Auto-init on document load races React's
// hydrateRoot on slow networks and causes #418/#423/#425 hydration mismatches.
