const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add fr-ov HTML before Joystick
const frHtml = `
  <!-- Friends Overlay -->
  <div class="ov h" id="fr-ov">
    <div class="bp-card" style="max-width:500px; padding:0;">
      <div class="bp-header" style="justify-content:space-between; padding:20px; border-bottom:4px solid #3d2314;">
        <div class="ls-title" style="margin:0;">Friends<span style="font-family:sans-serif;font-size:0.7em;">/دوست</span></div>
        <button class="bp-back" onclick="closeFriends()" style="position:static; margin:0;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a3e1b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div style="padding:20px; max-height:60vh; overflow-y:auto; background:#fdf4da;">
        <div style="display:flex; align-items:center; gap:15px; padding:15px; background:rgba(61,35,20,.05); border:2px dashed rgba(61,35,20,.3); border-radius:8px; margin-bottom:10px;">
          <div style="width:40px; height:40px; border-radius:50%; background:#d0e0d0; border:2px solid #3d2314; display:flex; justify-content:center; align-items:center; font-size:20px;">👦</div>
          <div style="flex:1;">
            <div style="font:bold 18px 'Courier New',mono; color:#3d2314;">Ali</div>
            <div style="font-size:12px; color:#666;">Offline</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:15px; padding:15px; background:rgba(61,35,20,.05); border:2px dashed rgba(61,35,20,.3); border-radius:8px; margin-bottom:10px;">
          <div style="width:40px; height:40px; border-radius:50%; background:#e0d0e0; border:2px solid #3d2314; display:flex; justify-content:center; align-items:center; font-size:20px;">👧</div>
          <div style="flex:1;">
            <div style="font:bold 18px 'Courier New',mono; color:#3d2314;">Sara</div>
            <div style="font-size:12px; color:#666;">Offline</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:15px; padding:15px; background:rgba(61,35,20,.05); border:2px dashed rgba(61,35,20,.3); border-radius:8px; margin-bottom:10px;">
          <div style="width:40px; height:40px; border-radius:50%; background:#d0d0e0; border:2px solid #3d2314; display:flex; justify-content:center; align-items:center; font-size:20px;">👦</div>
          <div style="flex:1;">
            <div style="font:bold 18px 'Courier New',mono; color:#3d2314;">Omar</div>
            <div style="font-size:12px; color:#666;">Offline</div>
          </div>
        </div>
      </div>
    </div>
  </div>

`;
html = html.replace('<!-- Virtual Joystick (bottom-left) -->', frHtml + '  <!-- Virtual Joystick (bottom-left) -->');

// 2. Change onclick
html = html.replace(
  '<div class="menu-btn" title="Missions" onclick="notify(t(\'notify_explore\'))"><img src="group.svg" alt="Group"></div>',
  '<div class="menu-btn" title="Friends" onclick="openFriends()"><img src="group.svg" alt="Friends"></div>'
);

// 3. Add JS functions
const jsToAdd = `
function openFriends() {
  document.getElementById('fr-ov').classList.remove('h');
  document.getElementById('menu').classList.add('h');
  document.getElementById('hud').classList.add('h');
}
function closeFriends() {
  document.getElementById('fr-ov').classList.add('h');
  if(!document.getElementById('bp-ov').classList.contains('h')) return;
  document.getElementById('menu').classList.remove('h');
  document.getElementById('hud').classList.remove('h');
}
`;
html = html.replace('function openBP() {', jsToAdd + '\nfunction openBP() {');

// 4. Update blocking arrays
html = html.replace(
  "['sb-ov','dg-ov','fc-ov','fc-pipes','rr-ov','bf-ov','lf-ov','qz-ov']",
  "['sb-ov','dg-ov','fc-ov','fc-pipes','rr-ov','bf-ov','lf-ov','qz-ov','fr-ov']"
);
html = html.replace(
  "['ss','lang','mdo','mo','bp-ov','map-ov','sb-ov','dg-ov','fc-ov','fc-pipes','rr-ov','bf-ov','lf-ov','qz-ov']",
  "['ss','lang','mdo','mo','bp-ov','fr-ov','map-ov','sb-ov','dg-ov','fc-ov','fc-pipes','rr-ov','bf-ov','lf-ov','qz-ov']"
);

fs.writeFileSync('index.html', html);
console.log('Applied friends overlay');
