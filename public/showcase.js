/* ── Showcase global vars + goToStep (click-only, no auto-rotate) ── */
const TOTAL=5;
var cur=0, showcaseStarted=false;

function stopAllDemos(){
  if(typeof p0stopDemo==='function') p0stopDemo();
  if(typeof p1_chain!=='undefined') p1_chain.forEach(id=>clearTimeout(id));
  if(typeof p2_chain!=='undefined') p2_chain.forEach(id=>clearTimeout(id));
  if(typeof p3_chain!=='undefined') p3_chain.forEach(clearTimeout);
  if(typeof p4_chain!=='undefined') p4_chain.forEach(clearTimeout);
}
function goToStep(n){
  stopAllDemos();
  document.querySelectorAll('.sc-step').forEach((el,i)=>{
    el.classList.toggle('active',i===n);
  });
  document.querySelectorAll('.sc-panel').forEach((p,i)=>{
    p.classList.remove('active');
    if(i===n){
      // p0 has interactive sub-screens — never clone it, just activate
      if(i===0){
        if(typeof p1_chain!=='undefined') p1_chain.forEach(id=>clearTimeout(id));
        p0stopDemo();
        p0reset(); // synchronous reset before panel visible
        requestAnimationFrame(()=>{ p.classList.add('active'); });
        if(typeof p0startDemo==='function') setTimeout(p0startDemo, 300);
      } else if(i===1){
        p0stopDemo();
        // reset p1 cursor instantly
        const _p1cur=document.getElementById('p1cursor');if(_p1cur)_p1cur.style.display='none';
        requestAnimationFrame(()=>p.classList.add('active'));
        if(typeof p1Init==='function') setTimeout(p1Init, 100);
      } else if(i===2){
        p2_chain.forEach(id=>clearTimeout(id));
        // reset p2 state instantly before panel becomes visible
        document.getElementById('p2chat').innerHTML='';
        document.getElementById('p2typed').textContent='';
        document.getElementById('p2token').style.display='none';
        document.getElementById('p2cursor').style.display='none';
        requestAnimationFrame(()=>p.classList.add('active'));
        if(typeof p2Init==='function') setTimeout(p2Init,100);
      } else if(i===3){
        if(typeof p3_chain!=='undefined') p3_chain.forEach(id=>clearTimeout(id));
        // reset p3 state instantly before panel becomes visible
        const _sA=document.getElementById('p3screenA'),_sB=document.getElementById('p3screenB'),_sC=document.getElementById('p3screenC'),_mo=document.getElementById('p3modal'),_to=document.getElementById('p3successToast');
        if(_sA){_sA.style.cssText='display:flex;opacity:1';}
        if(_sB){_sB.style.cssText='display:none;opacity:0';}
        if(_sC){_sC.style.cssText='display:none;opacity:0';}
        if(_mo){_mo.style.cssText='display:none;opacity:0';}
        if(_to){_to.style.cssText='display:none;opacity:0';}
        const _sb=document.getElementById('p3saveBtn');
        if(_sb){_sb.classList.remove('saved');_sb.innerHTML='<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2h6l2 2v6a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3"/><path d="M4 12V7h4v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Save as Report';}
        const _te=document.getElementById('p3typedEmail');if(_te)_te.textContent='';
        const _tx2=document.getElementById('p3tagX');if(_tx2)_tx2.style.opacity='0';
        const _tt2=document.getElementById('p3tagTyping');if(_tt2)_tt2.style.display='none';
        const _ar2=document.getElementById('p3addRecipient');if(_ar2)_ar2.style.display='none';
        const _cu=document.getElementById('p3cursor');if(_cu)_cu.style.display='none';

        requestAnimationFrame(()=>p.classList.add('active'));
        if(typeof p3Init==='function') setTimeout(p3Init,100);
      } else if(i===4){
        if(typeof p4_chain!=='undefined') p4_chain.forEach(clearTimeout);
        // ── full reset BEFORE panel becomes visible ──
        const _p4sA=document.getElementById('p4screenA');
        const _p4sB=document.getElementById('p4screenB');
        const _p4jm=document.getElementById('p4jiraModal');
        const _p4t=document.getElementById('p4successToast');
        const _p4c=document.getElementById('p4cursor');
        const _p4sm=document.getElementById('p4jmSummary');
        if(_p4sA){_p4sA.style.cssText='display:flex;flex-direction:column;flex:1;overflow:hidden;opacity:1';}
        if(_p4sB){_p4sB.style.cssText='display:none;visibility:hidden;opacity:0;flex-direction:column;flex:1;overflow:hidden';}
        if(_p4jm){_p4jm.style.cssText='display:none;opacity:0';}
        if(_p4t){_p4t.style.cssText='display:none;opacity:0';}
        if(_p4c){_p4c.style.cssText='display:none;position:absolute;z-index:999;pointer-events:none';}
        if(_p4sm) _p4sm.textContent='';
        const _p4db=document.getElementById('p4detailBody');if(_p4db) _p4db.scrollTop=0;
        document.querySelectorAll('.p4-insight-row').forEach(r=>r.classList.remove('p4-row-active'));
        // Force panel invisible, disable transition, reset, then show
        p.style.transition='none';
        p.style.opacity='0';
        p.style.transform='translateY(0) scale(1)';
        p.classList.add('active');
        // After one frame, re-enable transition and fade in
        requestAnimationFrame(()=>requestAnimationFrame(()=>{
          p.style.transition='';
          p.style.opacity='';
          p.style.transform='';
        }));
        if(typeof p4Init==='function') setTimeout(p4Init, 150);
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
  const el=document.getElementById('p0iStripe');
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
  p0clearInputs();
}

function p0showModal(){
  const s2=document.getElementById('p0s2');
  const modal=document.getElementById('p0modal');
  const lbl=document.getElementById('p0-lbl');
  if(lbl) lbl.textContent='Connect PostgreSQL';
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

// Full 11-second demo:
// 0.2  cursor appears
// 0.7  moves to PostgreSQL card
// 1.4  clicks → modal opens
// 2.1  cursor moves to Display Name
// 2.6  types "Production DB"
// 3.8  moves to Host, types "db.example.com"
// 5.2  moves to Username, types "analytics_prod"
// 7.0  moves to Connect button
// 7.6  clicks → spinner
// 8.3  success screen
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

  // Move to Stripe card
  _p0T(()=>{ _p0mov(document.getElementById('p0stripe')); }, 700);

  // Hover: darken + show Connect button
  _p0T(()=>{
    const bg=document.getElementById('p0stripe-bg');
    const sb=document.getElementById('p0stripe-btn');
    if(bg) bg.style.background='rgba(0,0,0,.75)';
    if(sb) sb.style.opacity='1';
  }, 1200);

  // Move cursor onto the Connect pill
  _p0T(()=>{
    const sb=document.getElementById('p0stripe-btn');
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
    const bg=document.getElementById('p0stripe-bg');
    const sb=document.getElementById('p0stripe-btn');
    if(bg) bg.style.background='rgba(0,0,0,0)';
    if(sb) sb.style.opacity='0';
    p0showModal();
  }, 2000);

  // Move to account field & type email
  _p0T(()=>{ _p0mov(document.getElementById('p0iStripe')); }, 2700);
  _p0T(()=>{
    const el=document.getElementById('p0iStripe');
    if(!el) return;
    el.classList.add('p0-focus');
    const txt='acme-corp@stripe.com'; let i=0;
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
  _p0T(()=>{ if(cur === 0) p0startDemo(); }, 10000);
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

// p1 metrics panel vars — resolved lazily
let p1WIN, p1cur;
let p1_loopCount = 0;
let p1_chain = [];

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

// typing into input
async function p1_typeInto(el, text, speed=55){
  el.classList.add('focused');
  el.value = '';
  for(let ch of text){
    el.value += ch;
    await p1_t(speed);
  }
  el.classList.remove('focused');
}

// typing into textarea
async function p1_typeArea(el, text, speed=40){
  el.classList.add('focused');
  el.value = '';
  for(let ch of text){
    el.value += ch;
    await p1_t(speed);
  }
  el.classList.remove('focused');
}

function p1_fillSelect(id, valId, text){
  document.getElementById(id).classList.add('filled');
  document.getElementById(valId).textContent = text;
}

// Interactive dropdown toggle (for manual use)
function p1_closeAllDrops(){
  document.querySelectorAll('#p1 .ds-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('#p1 .ds-sel').forEach(s => s.classList.remove('open'));
}

function p1_toggleDrop(ddId){
  const dd = document.getElementById(ddId);
  const isOpen = dd.classList.contains('open');
  p1_closeAllDrops();
  if(!isOpen){
    dd.classList.add('open');
    dd.previousElementSibling.classList.add('open');
  }
}

function p1_pickDrop(selId, valId, ddId, label, value){
  const sel = document.getElementById(selId);
  const dd = document.getElementById(ddId);
  sel.classList.remove('open');
  sel.classList.add('filled');
  document.getElementById(valId).textContent = label;
  dd.classList.remove('open');
  dd.querySelectorAll('.dd-item').forEach(i => {
    i.classList.toggle('selected', i.textContent.trim().includes(value));
  });
}

// Close dropdowns on outside click
document.addEventListener('click', e => {
  if(!e.target.closest('#p1 .ds-col') && !e.target.closest('#p1')) p1_closeAllDrops();
});

// Animation: move cursor to sel, click to open, move to item, click to pick
async function p1_animPick(selId, ddId, valId, label, value){
  const sel = document.getElementById(selId);
  const dd  = document.getElementById(ddId);
  p1_closeAllDrops();
  await p1_moveCursor(sel);
  await p1_t(100);
  p1cur.classList.add('clicking'); await p1_t(120); p1cur.classList.remove('clicking');
  dd.classList.add('open');
  sel.classList.add('open');
  await p1_t(150);
  let target = null;
  dd.querySelectorAll('.dd-item').forEach(i => {
    if(i.textContent.trim().includes(value)) target = i;
  });
  if(target){
    await p1_moveCursor(target);
    await p1_t(80);
    p1cur.classList.add('clicking'); await p1_t(100); p1cur.classList.remove('clicking');
    dd.classList.remove('open');
    sel.classList.remove('open');
    sel.classList.add('filled');
    document.getElementById(valId).textContent = label;
    dd.querySelectorAll('.dd-item').forEach(i => {
      i.classList.toggle('selected', i.textContent.trim().includes(value));
    });
  }
  await p1_t(100);
}

function p1_closeModal(){
  document.getElementById('p1ModalOverlay').classList.remove('show');
}

async function p1_runDemo(){
  // resolve DOM refs fresh each run (panel may have been re-rendered)
  p1WIN = document.querySelector('#p1 .aw');
  p1cur = document.getElementById('p1cursor');
  if(!p1WIN || !p1cur){ console.warn('p1: DOM not ready'); return; }
  p1_chain = [];
  // sync progress bar to actual animation duration
  if(p1_loopCount === 0){
    const bar = document.querySelectorAll('.sc-bar-fill')[1];
    if(bar){ bar.style.transition='none'; bar.style.width='0%';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        bar.style.transition=`width ${P1_DUR}ms linear`;
        bar.style.width='100%';
      }));
    }
  }
  // reset state
  document.getElementById('p1ctxMenu').classList.remove('show');
  document.getElementById('p1ModalOverlay').classList.remove('show');
  document.getElementById('p1SuccessToast').classList.remove('show');
  document.getElementById('p1cacToggle').classList.remove('on');
  document.getElementById('p1cacToggle').classList.add('off');
  // Move CAC row back to draft group
  const rowCACel = document.getElementById('p1rowCAC');
  const draftGrp = document.getElementById('p1draftGroup');
  if(draftGrp && rowCACel && rowCACel.previousElementSibling !== draftGrp){
    draftGrp.parentNode.insertBefore(rowCACel, draftGrp.nextSibling);
  }
  rowCACel.style.opacity = '';
  rowCACel.style.transform = '';
  rowCACel.style.transition = '';
  document.getElementById('p1liveCount').textContent = '3';
  document.getElementById('p1draftCount').textContent = '3';
  document.getElementById('p1rowCAC').classList.remove('highlighted','flash-success');
  let cacName = document.querySelector('#p1rowCAC .metric-name');
  cacName.classList.add('draft');
  document.querySelector('#p1rowCAC .draft-badge').style.display='';
  let cacSrc = document.querySelector('#p1rowCAC .source-cell');
  cacSrc.innerHTML=`<div class="src-icon" style="background:rgba(255,255,255,.07)"><span style="color:var(--ins-text-inactive);font-size:8px">?</span></div>Not configured`;
  const cacShortReset = document.getElementById('p1cacShortName');
  if(cacShortReset){ cacShortReset.style.color='var(--ins-text-inactive)'; cacShortReset.style.background='rgba(255,255,255,.05)'; }
  cacSrc.style.color='var(--ins-text-inactive)';
  // reset modal fields
  document.getElementById('p1fShort').value = '';
  ['p1fSource','p1fTable','p1fField','p1fAggr'].forEach(id => {
    const el = document.getElementById(id); if(el) el.classList.remove('filled');
  });
  document.getElementById('p1fSourceVal').textContent='Select source…';
  document.getElementById('p1fTableVal').textContent='Select table…';
  document.getElementById('p1fFieldVal').textContent='Select field…';
  document.getElementById('p1fAggrVal').textContent='Select…';
  p1_closeAllDrops();
  document.getElementById('p1btnSave').classList.remove('loading');

  await p1_t(300);

  // 1. Show cursor at top
  p1_showCursor();
  await p1_t(200);

  // 2. Move to CAC row more button
  const moreBtn = document.getElementById('p1cacMoreBtn');
  await p1_moveCursor(moreBtn, 0, 0);
  await p1_t(150);

  // 3. Click more
  await p1_click(moreBtn);
  document.getElementById('p1ctxMenu').classList.add('show');
  await p1_t(280);

  // 4. Move to Edit option
  const editItem = document.getElementById('p1ctxEdit');
  await p1_moveCursor(editItem, 0, 0);
  await p1_t(200);

  // 5. Click Edit
  await p1_click(editItem);
  document.getElementById('p1ctxMenu').classList.remove('show');
  document.getElementById('p1ModalOverlay').classList.add('show');
  await p1_t(220);

  // 6. Move to short name field and type
  const fShort = document.getElementById('p1fShort');
  await p1_moveCursor(fShort);
  await p1_t(100);
  await p1_typeInto(fShort, '@cac', 60);
  await p1_t(150);

  // 8. Fill Source — open dropdown, pick item
  await p1_animPick('p1fSource','p1ddSource','p1fSourceVal','📊 Google Ads','Google Ads');
  await p1_t(200);

  // 9. Fill Table
  await p1_animPick('p1fTable','p1ddTable','p1fTableVal','campaigns','campaigns');
  await p1_t(200);

  // 10. Fill Field
  await p1_animPick('p1fField','p1ddField','p1fFieldVal','cost','cost');
  await p1_t(200);

  // 11. Fill Aggregation
  await p1_animPick('p1fAggr','p1ddAggr','p1fAggrVal','SUM','SUM');
  await p1_t(200);

  // 12. Click Save
  const btnSave = document.getElementById('p1btnSave');
  await p1_moveCursor(btnSave);
  await p1_t(150);
  await p1_click(btnSave);
  btnSave.classList.add('loading');
  await p1_t(700);

  // 13. Close modal
  btnSave.classList.remove('loading');
  document.getElementById('p1ModalOverlay').classList.remove('show');
  await p1_t(150);

  // 14. Highlight CAC row
  document.getElementById('p1rowCAC').classList.add('highlighted');

  // 15. Move cursor to toggle
  const tog = document.getElementById('p1cacToggle');
  await p1_moveCursor(tog);
  await p1_t(200);

  // 16. Click toggle - activate
  await p1_click(tog);
  tog.classList.remove('off');
  tog.classList.add('on');
  // Update row visuals
  cacName.classList.remove('draft');
  document.querySelector('#p1rowCAC .draft-badge').style.display='none';
  const cacShort = document.getElementById('p1cacShortName');
  cacShort.style.color = 'var(--ins-text-highlight)';
  cacShort.style.background = 'rgba(10,152,150,.1)';
  cacSrc.style.color='var(--ins-text-body)';
  cacSrc.innerHTML=`<div class="src-icon" style="background:#4285F4"><span style="color:#fff;font-weight:500;font-size:7px">GA</span></div>Google Ads`;

  await p1_t(300);
  document.getElementById('p1rowCAC').classList.remove('highlighted');

  // Animate row moving to Live group
  const rowEl = document.getElementById('p1rowCAC');
  rowEl.style.transition = 'opacity .3s, transform .3s';
  rowEl.style.opacity = '0';
  rowEl.style.transform = 'translateY(-6px)';
  await p1_t(300);

  // Move row DOM to before draftGroup (into Live section)
  const liveGroup = document.getElementById('p1liveGroup');
  const draftGroup = document.getElementById('p1draftGroup');
  rowEl.style.transition = 'none';
  rowEl.style.opacity = '0';
  rowEl.style.transform = 'translateY(6px)';
  draftGroup.parentNode.insertBefore(rowEl, draftGroup);

  // Update counters
  document.getElementById('p1liveCount').textContent = '4';
  document.getElementById('p1draftCount').textContent = '2';

  // Fade in at new position
  requestAnimationFrame(() => {
    rowEl.style.transition = 'opacity .35s, transform .35s';
    rowEl.style.opacity = '1';
    rowEl.style.transform = 'translateY(0)';
  });
  await p1_t(500);
  rowEl.classList.add('flash-success');

  // 17. Show toast
  await p1_t(200);
  document.getElementById('p1SuccessToast').classList.add('show');

  // 18. Move cursor away — pause so user sees the result
  p1_moveTo(400, 120);
  await p1_t(1500);

  // 19. Hide toast + cursor
  document.getElementById('p1SuccessToast').classList.remove('show');
  p1cur.style.display = 'none';

  // After 1 loop, advance showcase; otherwise loop
  p1_loopCount++;
  await p1_t(800);
  if(p1_loopCount >= 1){
    p1_loopCount = 0;
    // loop: restart animation if still on this step
    if(cur === 1) p1_runDemo();
  } else {
    p1_runDemo();
  }
}

// p1 demo started via p1Init() from goToStep

function p1Init(){
  p1_chain.forEach(id=>clearTimeout(id));
  p1_chain = [];
  p1_loopCount = 0;
  setTimeout(p1_runDemo, 300);
}
/* ── P2 CHAT PANEL JS ── */
let p2WIN, p2cur2;
let p2_chain = [];

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
async function p2_type(elId, text, speed=55){
  const el = document.getElementById(elId);
  for(let i=0;i<text.length;i++){
    el.textContent += text[i];
    await p2_t(speed + Math.random()*30);
  }
}

async function p2_runDemo(){
  p2WIN  = document.querySelector('#p2 .aw');
  p2cur2 = document.getElementById('p2cursor');
  if(!p2WIN||!p2cur2) return;
  p2_chain = [];

  // helper — append element with fade-in
  function p2add(html, cls='cs-ai'){
    const el = document.createElement('div');
    el.className = cls;
    el.style.cssText = 'opacity:0;transition:opacity .3s ease';
    el.innerHTML = html;
    chat.appendChild(el);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.opacity='1'; }));
    return el;
  }

  // ── RESET ──
  const chat = document.getElementById('p2chat');
  chat.innerHTML = '';
  document.getElementById('p2typed').textContent='';
  document.getElementById('p2token').style.display='none';
  document.getElementById('p2typed2').textContent='';
  p2cur2.style.display='none';

  const typedEl = document.getElementById('p2typed');
  const tokenEl = document.getElementById('p2token');
  const inputEl = document.getElementById('p2input');
  const sendBtn = document.getElementById('p2sendBtn');

  await p2_t(300);

  // ── STEP 1: cursor appears, types @cac ──
  p2cur2.style.display='block';
  p2cur2.style.transition='none';
  p2_moveTo(60, p2WIN.getBoundingClientRect().height - 25);
  requestAnimationFrame(()=>{
    p2cur2.style.transition='left .4s cubic-bezier(.4,0,.2,1),top .4s cubic-bezier(.4,0,.2,1)';
  });
  await p2_moveCursor(inputEl);
  await p2_t(200);

  for(let ch of '@cac'){ typedEl.textContent+=ch; await p2_t(80+Math.random()*30); }
  await p2_t(200);
  typedEl.textContent='';
  tokenEl.style.display='inline';
  await p2_t(350);

  // ── STEP 2: Send → user bubble appended ──
  await p2_click(sendBtn);
  tokenEl.style.display='none';
  await p2_t(60);
  p2add('<div class="bubble-u"><span class="p2-token-bubble">@cac</span></div>', 'cs-u');
  await p2_t(400);

  // ── STEP 3: AI typing dots ──
  const typingEl = p2add('<div class="ai-badge">In</div><div class="p2-typing"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>');
  await p2_t(1800);

  // ── STEP 4: replace typing with AI question ──
  typingEl.style.transition='opacity .2s ease';
  typingEl.style.opacity='0';
  await p2_t(220);
  typingEl.innerHTML='<div class="ai-badge">In</div><div class="bubble-ai" style="font-size:12px">Sure! What time period should I use, and would you like a breakdown by channel?</div>';
  typingEl.style.transition='opacity .3s ease';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ typingEl.style.opacity='1'; }));
  await p2_t(2400);

  // ── STEP 5: cursor back to input, type answer ──
  await p2_moveCursor(inputEl);
  await p2_t(250);
  const q2 = 'Last month, top 3 channels';
  for(let ch of q2){ typedEl.textContent+=ch; await p2_t(52+Math.random()*25); }
  await p2_t(400);

  // ── STEP 6: Send → q2 bubble ──
  await p2_click(sendBtn);
  typedEl.textContent='';
  await p2_t(60);
  p2add('<div class="bubble-u">'+q2+'</div>', 'cs-u');
  await p2_t(350);

  // ── STEP 7: AI typing ──
  const typing2El = p2add('<div class="ai-badge">In</div><div class="p2-typing"><div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div></div>');
  await p2_t(1300);

  // ── STEP 8: replace typing with chart answer ──
  typing2El.style.transition='opacity .2s ease';
  typing2El.style.opacity='0';
  await p2_t(220);
  typing2El.innerHTML=`<div class="ai-badge">In</div>
    <div class="bubble-ai p2-chart-bubble">
      <div style="font-size:12px;color:var(--ins-text-body);margin-bottom:8px">CAC for the last 30 days by channel. <strong style="color:var(--ins-text-heading)">Avg: $184</strong> — down <strong style="color:var(--ins-status-success-fg)">−12%</strong> vs prior month.</div>
      <div class="p2-chart">
        <div class="p2-chart-title">CAC by Channel — Last 30 Days</div>
        <!-- 4 metric cards -->
        <div class="p2-cards">
          <div class="p2-card">
            <div class="p2-card-lbl">Total CAC</div>
            <div class="p2-card-val" style="color:var(--ins-text-heading)">$87.65</div>
          </div>
          <div class="p2-card">
            <div class="p2-card-lbl">Google Ads</div>
            <div class="p2-card-val" style="color:var(--ins-status-error-fg)">$135.67 ↑</div>
          </div>
          <div class="p2-card">
            <div class="p2-card-lbl">Organic</div>
            <div class="p2-card-val" style="color:var(--ins-status-success-fg)">$54.31 ↓</div>
          </div>
          <div class="p2-card">
            <div class="p2-card-lbl">Meta</div>
            <div class="p2-card-val" style="color:var(--ins-status-success-fg)">$75.45 ↓</div>
          </div>
        </div>
        <!-- Line chart SVG -->
        <svg class="p2-linechart" id="p2lineChart" viewBox="0 0 260 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <!-- grid lines -->
          <line x1="0" y1="17" x2="260" y2="17" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
          <line x1="0" y1="35" x2="260" y2="35" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
          <line x1="0" y1="53" x2="260" y2="53" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
          <!-- Total CAC — white/muted -->
          <polyline class="p2-line" id="pl0" points="0,38 43,35 87,32 130,36 173,30 217,28 260,29" fill="none" stroke="rgba(200,220,230,.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Google Ads — red -->
          <polyline class="p2-line" id="pl1" points="0,22 43,20 87,18 130,25 173,20 217,15 260,14" fill="none" stroke="var(--ins-status-error-fg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Organic — green -->
          <polyline class="p2-line" id="pl2" points="0,55 43,52 87,50 130,54 173,48 217,46 260,44" fill="none" stroke="var(--ins-status-success-fg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Meta — teal -->
          <polyline class="p2-line" id="pl3" points="0,44 43,42 87,45 130,40 173,38 217,36 260,35" fill="none" stroke="var(--ins-text-highlight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="p2-legend">
          <div class="p2-leg"><span style="background:rgba(200,220,230,.6)"></span>Total</div>
          <div class="p2-leg"><span style="background:var(--ins-status-error-fg)"></span>Google Ads</div>
          <div class="p2-leg"><span style="background:var(--ins-status-success-fg)"></span>Organic</div>
          <div class="p2-leg"><span style="background:var(--ins-text-highlight)"></span>Meta</div>
        </div>
      </div>
      <button class="p2-save-btn" id="p2saveBtn">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2h6l2 2v6a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3"/><path d="M4 12V7h4v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        Save as Report
      </button>
    </div>`;
  typing2El.style.transition='opacity .3s ease';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ typing2El.style.opacity='1'; }));
  await p2_t(300);

  // draw lines
  ['pl0','pl1','pl2','pl3'].forEach((id,i)=>{
    setTimeout(()=>{ const l=document.getElementById(id); if(l) l.classList.add('draw'); }, i*150);
  });
  await p2_t(1400);

  // ── STEP 9: pause on chart, no cursor interaction ──
  p2cur2.style.display='none';
  await p2_t(1500);
  // loop: restart animation if still on this step
  if(cur === 2) p2_runDemo();
}

function p2Init(){
  p2_chain.forEach(id=>clearTimeout(id));
  p2_chain=[];
  setTimeout(p2_runDemo, 300);
}

/* ════════════════════════════════
   PANEL 3 — Reports Animation
   ════════════════════════════════ */
let p3_chain = [];
function p3_t(ms){ return new Promise(r=>{ const id=setTimeout(r,ms); p3_chain.push(id); }); }

function p3_pos(el){
  const wr = document.querySelector('#p3').getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return { x: er.left - wr.left + er.width/2, y: er.top - wr.top + er.height/2 };
}
function p3_moveTo(x,y){
  const p3cur = document.getElementById('p3cursor');
  p3cur.style.left = (x-9)+'px'; p3cur.style.top = (y-9)+'px';
}
async function p3_moveCursor(el){
  const p = p3_pos(el);
  p3_moveTo(p.x, p.y);
  await p3_t(450);
}
async function p3_click(el){
  const p3cur = document.getElementById('p3cursor');
  await p3_moveCursor(el);
  p3cur.style.transform='scale(.85)'; await p3_t(100);
  p3cur.style.transform='scale(1)'; await p3_t(130);
}
async function p3_typeEmail(text){
  const el = document.getElementById('p3typedEmail');
  for(let ch of text){ el.textContent+=ch; await p3_t(45+Math.random()*20); }
}
async function p3_fadeIn(el, ms=250, disp='flex'){
  el.style.display=disp; el.style.opacity='0'; el.style.transition=`opacity ${ms}ms ease`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.opacity='1'; }));
  await p3_t(ms);
}
async function p3_fadeOut(el, ms=200){
  el.style.transition=`opacity ${ms}ms ease`; el.style.opacity='0';
  await p3_t(ms);
  el.style.display='none';
}
async function p3_crossfade(outEl, inEl, ms=300){
  outEl.style.transition=`opacity ${ms/2}ms ease`;
  outEl.style.opacity='0';
  await p3_t(ms/2);
  outEl.style.display='none';
  inEl.style.opacity='0'; inEl.style.display='flex';
  inEl.style.transition=`opacity ${ms/2}ms ease`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ inEl.style.opacity='1'; }));
  await p3_t(ms/2);
}

async function p3_runDemo(){
  p3_chain.forEach(clearTimeout); p3_chain=[];

  const awEl  = document.querySelector('#p3');
  const p3cur = document.getElementById('p3cursor');
  const screenA = document.getElementById('p3screenA');
  const screenB = document.getElementById('p3screenB');
  const screenC = document.getElementById('p3screenC');
  const modal   = document.getElementById('p3modal');
  const toast   = document.getElementById('p3successToast');

  // reset
  [screenB,screenC,modal,toast].forEach(el=>{ el.style.display='none'; el.style.opacity='0'; el.style.transition=''; });
  screenA.style.display='flex'; screenA.style.opacity='1';
  p3cur.style.display='none'; p3cur.style.transition='';
  document.getElementById('p3typedEmail').textContent='';
  const saveBtn = document.getElementById('p3saveBtn');
  if(saveBtn){ saveBtn.classList.remove('saved'); saveBtn.innerHTML='<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2h6l2 2v6a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3"/><path d="M4 12V7h4v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg> Save as Report'; }
  document.getElementById('p3shareBtn').classList.remove('hovered');
  document.getElementById('p3awlbl').textContent='AI Chat';

  await p3_t(1000);

  // ── STEP 1: cursor appears → moves to Save as Report ──
  const awRect = awEl.getBoundingClientRect();
  p3cur.style.cssText = `display:block;transition:none;left:${awRect.width*0.4-9}px;top:${awRect.height*0.6-9}px;width:18px;height:18px;position:absolute;z-index:999;pointer-events:none`;
  requestAnimationFrame(()=>{ p3cur.style.transition='left .5s cubic-bezier(.4,0,.2,1),top .5s cubic-bezier(.4,0,.2,1)'; });
  await p3_click(saveBtn);

  // ── STEP 2: button becomes success ──
  saveBtn.classList.add('saved');
  saveBtn.innerHTML='<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="var(--ins-status-success-fg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Saved! View Reports →';
  await p3_t(1500);

  // ── STEP 3: crossfade to reports list (no second click) ──

  await p3_crossfade(screenA, screenB, 280);
  await p3_t(1800);



  // ── STEP 5: cursor → new report row ──
  const newReport = document.getElementById('p3newReport');
  await p3_click(newReport);
  await p3_t(200);

  // ── STEP 6: to report detail ──

  await p3_crossfade(screenB, screenC, 280);
  await p3_t(1500);
  // slow scroll to reveal takeaways
  const rv = screenC.querySelector('.p3-report-view');
  if(rv){ rv.scrollTo({top:120, behavior:'smooth'}); }
  await p3_t(1200);

  // ── STEP 7: cursor → Share ──
  const shareBtn = document.getElementById('p3shareBtn');
  await p3_click(shareBtn);
  shareBtn.classList.add('hovered');
  await p3_t(300);

  // ── STEP 8: modal appears ──
  await p3_fadeIn(modal, 280, 'flex');
  await p3_t(700);

  // ── STEP 9: type recipient email ──
  const _tt=document.getElementById('p3tagTyping'); if(_tt) _tt.style.display='inline-flex';
  await p3_typeEmail('michael.torres@company.com');
  const _tx=document.getElementById('p3tagX'); if(_tx) _tx.style.opacity='1';
  const _ar=document.getElementById('p3addRecipient'); if(_ar) _ar.style.display='block';
  await p3_t(700);

  // ── STEP 10: cursor → Send Email ──
  const sendEmailBtn = document.getElementById('p3sendEmailBtn');
  await p3_moveCursor(sendEmailBtn);
  sendEmailBtn.classList.add('hovered');
  await p3_t(300);

  // ── STEP 11: modal out → success toast ──
  await p3_fadeOut(modal, 220);
  await p3_fadeIn(toast, 280, 'flex');
  await p3_t(1000);

  p3cur.style.display='none';
  await p3_t(1500);
  // loop: restart animation if still on this step
  if(cur === 3) p3_runDemo();
}

function p3Init(){
  p3_chain.forEach(clearTimeout); p3_chain=[];
  setTimeout(p3_runDemo, 100);
}


/* ════════════════════════════════
   PANEL 4 — Act on Insights
   ════════════════════════════════ */
let p4_chain = [];
function p4_t(ms){ return new Promise(r=>{ const id=setTimeout(r,ms); p4_chain.push(id); }); }

function p4_getEl(id){ return document.getElementById(id); }

async function p4_fade(el, toOpacity, ms=250, display=''){
  if(toOpacity===1 && display) { el.style.display=display; el.style.opacity='0'; }
  el.style.transition=`opacity ${ms}ms ease`;
  await p4_t(20);
  el.style.opacity = String(toOpacity);
  await p4_t(ms);
  if(toOpacity===0) el.style.display='none';
}

function p4_cursorPos(el){
  // Walk offsetParent chain to get position relative to sc-panel
  let x = el.offsetLeft + el.offsetWidth/2 - 9;
  let y = el.offsetTop + el.offsetHeight/2 - 9;
  let node = el.offsetParent;
  while(node && !node.classList.contains('sc-panel')){
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return {x, y};
}

async function p4_moveCursor(cur, panelEl, el, ms=450){
  const {x,y} = p4_cursorPos(el);
  cur.style.transition=`left ${ms}ms cubic-bezier(.4,0,.2,1),top ${ms}ms cubic-bezier(.4,0,.2,1)`;
  cur.style.left = x+'px'; cur.style.top = y+'px';
  await p4_t(ms);
}

async function p4_click(cur, panelEl, el){
  await p4_moveCursor(cur, null, el);
  cur.style.transform='scale(.8)'; await p4_t(100); cur.style.transform='scale(1)'; await p4_t(120);
}

async function p4_typeText(elId, text, speed=38){
  const el = p4_getEl(elId); if(!el) return;
  el.textContent='';
  for(const ch of text){
    el.textContent += ch;
    await p4_t(speed);
  }
}

async function p4_runDemo(){
  p4_chain.forEach(clearTimeout); p4_chain=[];

  const panel   = p4_getEl('p4');
  const cur     = p4_getEl('p4cursor');
  const screenA = p4_getEl('p4screenA');
  const screenB = p4_getEl('p4screenB');
  const jiraModal = p4_getEl('p4jiraModal');
  const toast   = p4_getEl('p4successToast');
  const row0    = p4_getEl('p4row0');
  const jiraBtn = p4_getEl('p4jiraBtn');
  const jmCreate= p4_getEl('p4jmCreate');
  const detailBody = p4_getEl('p4detailBody');
  const summary = p4_getEl('p4jmSummary');
  if(!panel||!cur||!screenA) return;

  // ── reset ──
  screenA.style.display='flex'; screenA.style.opacity='1';
  screenB.style.display='none'; screenB.style.opacility='hidden'; screenB.style.opacity='0';
  jiraModal.style.display='none'; jiraModal.style.opacity='0';
  toast.style.display='none'; toast.style.opacity='0';
  if(summary) summary.textContent='';
  if(jiraBtn) jiraBtn.classList.remove('hovered');
  if(jmCreate) jmCreate.classList.remove('hovered');
  // remove any active row highlight
  document.querySelectorAll('.p4-insight-row').forEach(r=>r.classList.remove('p4-row-active'));
  cur.style.display='none'; cur.style.transition='none';

  await p4_t(600);

  // ── STEP 1: cursor appears, hovers over first row (CAC) ──
  // Use offsetTop relative to panel — works even if panel is off-screen
  let r0top = row0.offsetTop + row0.offsetHeight/2 - 9;
  let r0left = row0.offsetLeft + 20;
  cur.style.cssText = `display:block;transition:none;left:${r0left}px;top:${r0top}px;position:absolute;z-index:999;pointer-events:none`;
  await p4_t(50);
  requestAnimationFrame(()=>{ cur.style.transition='left .5s cubic-bezier(.4,0,.2,1),top .5s cubic-bezier(.4,0,.2,1)'; });
  await p4_t(500);

  // hover row0
  row0.classList.add('p4-row-active');
  await p4_t(800);

  // ── STEP 2: click → crossfade to detail screen ──
  await p4_click(cur, null, row0);

  // overlap both screens, fade A out while B fades in
  const awEl4 = p4_getEl('p4aw');
  const awH = awEl4 ? awEl4.clientHeight - 32 : 200; // minus aw-bar
  screenB.style.cssText = `display:flex;flex-direction:column;opacity:0;position:absolute;inset:32px 0 0 0;background:var(--ins-surface-container);z-index:10;transition:opacity .4s ease`;
  screenA.style.transition='opacity .4s ease';
  await p4_t(30);
  screenA.style.opacity='0';
  screenB.style.opacity='1';
  await p4_t(420);
  screenA.style.display='none';
  screenB.style.cssText = `display:flex;flex-direction:column;overflow:hidden;opacity:1;position:absolute;inset:32px 0 0 0`;

  // ── STEP 3: wait for screenB to render ──
  await p4_t(1200);

  // ── STEP 5: cursor → Jira button ──
  await p4_click(cur, null, jiraBtn);
  jiraBtn.classList.add('hovered');
  await p4_t(200);
  jiraBtn.classList.remove('hovered');

  // ── STEP 6: Jira modal fades in ──
  await p4_fade(jiraModal, 1, 280, 'flex');
  await p4_t(500);

  // ── STEP 7: type summary ──
  await p4_typeText('p4jmSummary', 'Investigate CAC spike — Google Ads channel', 40);
  await p4_t(700);

  // ── STEP 8: cursor → Create Issue button ──
  await p4_click(cur, null, jmCreate);
  jmCreate.classList.add('hovered');
  await p4_t(300);
  jmCreate.classList.remove('hovered');

  // ── STEP 9: modal out, toast in ──
  await p4_fade(jiraModal, 0, 200);
  await p4_t(100);
  await p4_fade(toast, 1, 300, 'flex');
  cur.style.display='none';
  await p4_t(2200);

  // loop: restart animation if still on this step
  if(window.cur === 4) p4_runDemo();
}

function p4Init(){
  p4_chain.forEach(clearTimeout); p4_chain=[];
  setTimeout(p4_runDemo, 100);
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
    if(!e.target.closest('#p1 .ds-col') && !e.target.closest('#p1')) {
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

if (document.readyState === 'complete') {
  setTimeout(initShowcase, 0);
} else {
  window.addEventListener('load', () => setTimeout(initShowcase, 0));
}
