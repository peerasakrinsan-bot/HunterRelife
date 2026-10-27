/* REBORN: HUNTER'S FATE — mobile-first information architecture */
(()=>{'use strict';
const game=document.getElementById('game');if(!game)return;
const get=id=>document.getElementById(id);
const views={life:document.createElement('section'),character:document.createElement('section'),world:document.createElement('section'),events:document.createElement('section'),more:document.createElement('section')};
Object.entries(views).forEach(([id,node])=>{node.className='ui-view'+(id==='life'?' active':'');node.id='view-'+id;node.dataset.view=id;game.insertBefore(node,get('saveStatus'))});
const move=(selector,view)=>{const nodes=game.querySelectorAll(selector);nodes.forEach(n=>views[view].appendChild(n))};
// Keep original DOM IDs intact so the simulation's render/save code continues to update the same nodes.
move('.hero-hud, .worldbar, .sim-controls, .earth-scene, .critical-card, #ending','life');
move('.profile-strip, .life-system, #skillsPanel','character');
move('.location-history-panel','world');
move('.events-panel, #combatPanel','events');
move('#inventoryPanel, #legacyPanel, .source-note','more');
// Use clear tab headings and a five-item navigation bar.
const nav=document.createElement('nav');nav.className='mobile-tabbar';nav.setAttribute('aria-label','หน้าหลัก');
const items=[['life','⌂','ชีวิต'],['character','♙','ตัวละคร'],['world','◎','โลก'],['events','▤','เหตุการณ์'],['more','☷','เพิ่มเติม']];
items.forEach(([id,icon,label],i)=>{const b=document.createElement('button');b.type='button';b.dataset.tab=id;b.className=i===0?'active':'';b.innerHTML='<span class="tab-icon" aria-hidden="true">'+icon+'</span><span>'+label+'</span>';b.addEventListener('click',()=>show(id));nav.appendChild(b)});
game.appendChild(nav);
function show(id){Object.entries(views).forEach(([key,node])=>node.classList.toggle('active',key===id));nav.querySelectorAll('button').forEach(b=>{const active=b.dataset.tab===id;b.classList.toggle('active',active);b.setAttribute('aria-current',active?'page':'false')});try{sessionStorage.setItem('reborn-active-tab',id)}catch(e){}window.dispatchEvent(new CustomEvent('reborn-tab-change',{detail:{tab:id}}));}
nav.querySelectorAll('button').forEach(b=>b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const all=[...nav.querySelectorAll('button')],i=all.indexOf(b),n=all[(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length];n.focus();n.click()}}));
// Move the existing location summary to the top of the world screen; never fabricate map data.
const wh=views.world.querySelector('.location-history-panel');if(wh){const h=wh.querySelector('.section-heading');if(h)h.querySelector('h2').textContent='สถานที่ปัจจุบันและประวัติการเดินทาง'}
const controls=get('autoBtn');if(controls){controls.textContent='เล่นอัตโนมัติ';controls.title='ให้ชีวิตดำเนินต่อโดยไม่ต้องสั่งกิจวัตรรายวัน'}
const feedHeading=views.events.querySelector('.events-panel h2');if(feedHeading)feedHeading.textContent='ไทม์ไลน์ชีวิตและข่าวโลก';
const skillPanel=get('skillsPanel');if(skillPanel){const h=skillPanel.querySelector('h2');if(h)h.textContent='สกิลและเส้นทางอาชีพ'}
const lifeHeading=views.life.querySelector('.scene-caption b');if(lifeHeading)lifeHeading.setAttribute('aria-live','polite');
const hud=get('hudRank');if(hud)hud.title='สถานะพลังและอาชีพจะเปลี่ยนตามข้อมูลจำลอง';
const originalRender=window.render; // the main game renderer owns simulation state and is not replaced.
const activityCard=document.createElement('section');activityCard.className='panel activity-summary';activityCard.innerHTML='<div class="section-heading"><div><p class="eyebrow">CURRENT ACTIVITY</p><h2>กิจวัตรปัจจุบัน</h2></div><span class="rank">AUTO</span></div><p id="activitySummaryText">ตัวละครดำเนินชีวิตตามสถานะจำลอง</p><small id="activitySummaryPlace" class="muted">สถานที่และกิจกรรมอัปเดตตามโลกจำลอง</small>';
const lifeView=views.life;const scene=lifeView.querySelector('.earth-scene');if(scene)scene.after(activityCard);
const mini=document.createElement('section');mini.className='panel mini-timeline';mini.innerHTML='<div class="section-heading"><div><p class="eyebrow">RECENT MOMENTS</p><h2>เหตุการณ์ล่าสุด</h2></div><button type="button" class="text-btn" id="openEventsTab">ดูทั้งหมด</button></div><div id="miniTimelineItems" class="mini-timeline-items"><p class="muted">เหตุการณ์จะปรากฏเมื่อชีวิตเริ่มดำเนินไป</p></div>';
activityCard.after(mini);get('openEventsTab').addEventListener('click',()=>show('events'));
function updateMiniTimeline(){const source=get('feed'),dest=get('miniTimelineItems');if(!source||!dest)return;const children=[...source.children].filter(n=>n.textContent.trim()).slice(0,4);if(!children.length)return;dest.replaceChildren(...children.map(node=>{const item=document.createElement('div');item.className='mini-event';item.textContent=node.textContent.trim().replace(/\\s+/g,' ').slice(0,180);return item}))}
function updateActivity(){const a=get('activitySummaryText'),p=get('activitySummaryPlace'),act=get('activity'),sub=get('sceneSubcaption'),loc=get('currentLocationSummary');if(a&&act&&act.textContent.trim())a.textContent=act.textContent.trim();if(p){const where=loc&&loc.textContent.trim()&&!loc.textContent.includes('รอสร้าง')?loc.textContent.trim():sub&&sub.textContent.trim();if(where)p.textContent=where}}
const feed=get('feed');if(feed&&window.MutationObserver)new MutationObserver(updateMiniTimeline).observe(feed,{childList:true,subtree:true,characterData:true});
window.addEventListener('life-sim-update',updateActivity);window.addEventListener('village-life-event',()=>{updateActivity();updateMiniTimeline()});setInterval(()=>{updateActivity();updateMiniTimeline()},1800);

show('life');
})();
