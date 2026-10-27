/* Mobile-first navigation for the autonomous life simulator.
 * Reuses existing game DOM and controls; never adds movement/combat commands. */
(()=>{'use strict';
const $=id=>document.getElementById(id),all=s=>[...document.querySelectorAll(s)];
const shell=$('lifeUiShell'),host=$('lifeViewHost');if(!shell||!host)return;
const views={life:document.createElement('div'),character:document.createElement('div'),world:document.createElement('div'),events:document.createElement('div'),more:document.createElement('div')};
Object.entries(views).forEach(([id,node])=>{node.className='life-view';node.dataset.view=id;host.appendChild(node)});
function move(id,view){const el=$(id)||document.querySelector('.'+id);if(el)views[view].appendChild(el)}
// The game scene and existing state-backed sections are moved, not duplicated.
move('scene','life');move('decision','events');move('events-panel','life');
move('profile-strip','character');move('life-system','character');move('combatPanel','character');move('skillsPanel','character');move('inventoryPanel','character');move('legacyPanel','character');
move('location-history-panel','world');
const more=document.createElement('section');more.className='panel detail-panel more-links';more.innerHTML='<div class="section-heading"><div><p class="eyebrow">MORE</p><h2>เมนูเพิ่มเติม</h2></div></div><p class="muted">เปิดดูข้อมูลที่มีอยู่ในเกมและตั้งค่าการจำลอง</p><div class="more-grid"><button type="button" data-more-target="inventoryPanel">กระเป๋าและอุปกรณ์</button><button type="button" data-more-target="skillsPanel">สกิล</button><button type="button" data-more-target="legacyPanel">ประวัติชีวิตเก่า</button><button type="button" id="lifeNew">เริ่มชีวิตใหม่</button><button type="button" id="lifeReset">ล้างข้อมูล</button></div><p class="muted">การบันทึกใช้ระบบเดิมของเกมบนอุปกรณ์นี้ หากต้องการเริ่มใหม่จะมีการยืนยันจากระบบเดิม</p>';
views.more.appendChild(more);
const controls=$('sim-controls');if(controls){const strip=document.createElement('div');strip.className='panel life-activity-card';strip.innerHTML='<div><p class="eyebrow">กำลังเกิดขึ้น</p><strong id="lifeActivity">กำลังจำลองชีวิต</strong><small id="lifeActivityHint">กิจกรรมเปลี่ยนไปตามช่วงวัยและสถานะ</small></div><span class="activity-dot">●</span>';views.life.insertBefore(strip,views.life.firstChild);views.life.insertBefore(controls,strip.nextSibling)}
const oldnav=document.querySelector('.game-nav');if(oldnav)oldnav.hidden=true;
const oldbar=document.querySelector('.worldbar');if(oldbar)oldbar.hidden=true;
const oldhud=document.querySelector('.hero-hud');if(oldhud)oldhud.hidden=true;
const simDate=$('simDate'),act=$('activity'),sceneSub=$('sceneSubcaption'),country=$('country');
function setView(id){Object.entries(views).forEach(([key,node])=>node.classList.toggle('active',key===id));all('[data-life-view]').forEach(b=>b.classList.toggle('active',b.dataset.lifeView===id));if(id==='life')window.scrollTo({top:0,behavior:'smooth'});else host.scrollIntoView({behavior:'smooth',block:'start'})}
all('[data-life-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.lifeView)));
all('[data-more-target]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.moreTarget;setView(id==='inventoryPanel'||id==='skillsPanel'||id==='legacyPanel'?'character':'more');const el=$(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}));
$('lifeNew')?.addEventListener('click',()=>{if($('newBtn'))$('newBtn').click()});
$('lifeReset')?.addEventListener('click',()=>{if($('resetBtn'))$('resetBtn').click()});
$('lifePause')?.addEventListener('click',()=>{if($('runBtn'))$('runBtn').click();syncPause()});
function syncPause(){const b=$('runBtn'),out=$('lifePause');if(!b||!out)return;const paused=(b.textContent||'').includes('เล่นต่อ');out.textContent=paused?'▶ เล่น':'Ⅱ หยุด';out.setAttribute('aria-label',paused?'เริ่มจำลองต่อ':'หยุดจำลอง')}
all('[data-life-speed]').forEach(b=>b.addEventListener('click',()=>{const speed=b.dataset.lifeSpeed;const target=all('[data-speed]').find(x=>x.dataset.speed===speed);if(target)target.click();all('[data-life-speed]').forEach(x=>x.classList.toggle('active',x===b))}));
function setText(id,value,fallback='—'){const el=$(id);if(el)el.textContent=value==null||value===''?fallback:value}
function update(d={}){const age=Number(d.age)||0;setText('lifeName',d.name||$('hudName')?.textContent||'ชีวิตใหม่');setText('lifeMeta','อายุ '+age+' ปี · '+(age<1?'ทารก':age<4?'วัยเตาะแตะ':age<7?'เด็กเล็ก':age<13?'เด็ก':age<18?'วัยรุ่น':age<41?'วัยผู้ใหญ่':age<61?'วัยกลางคน':'ผู้สูงอายุ'));setText('lifeLocation',[d.location?.city,d.location?.country].filter(Boolean).join(' · ')||country?.textContent);setText('lifeHealth',d.health??$('health')?.textContent);setText('lifeMoney',Number((d.money??$('money')?.textContent) || 0).toLocaleString('th-TH'));setText('lifeDate',simDate?.textContent||('อายุ '+age+' ปี'));setText('lifeActivity',act?.textContent||'กำลังดำเนินชีวิต');setText('lifeActivityHint',sceneSub?.textContent||'กิจกรรมอัตโนมัติ');setText('lifePortrait',age<1?'👶':age<13?'🧒':age<60?'🧑':'👴');syncPause()}
window.addEventListener('life-sim-update',e=>update(e.detail||{}));
const observer=new MutationObserver(()=>{update({});syncPause()});['activity','sceneSubcaption','simDate','country','runBtn','health','money'].forEach(id=>{const el=$(id);if(el)observer.observe(el,{childList:true,subtree:true,characterData:true,attributes:true})});
update({});setView('life');
})();