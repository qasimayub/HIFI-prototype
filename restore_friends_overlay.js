const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Restore CSS
const frCss = `
/* ── FRIENDS OVERLAY ── */
#fr-ov { background: rgba(26,26,26,.72); z-index: 250; font-family: 'Courier New', mono; }
.fr-card { background: #fdf4da; border: 4px dashed #3d2314; border-radius: 12px; padding: 30px 40px; width: 440px; max-width: 92%; position: relative; cursor: default; box-sizing: border-box; display: flex; flex-direction: column; margin: auto; }
.fr-close { position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border: 4px solid #3d2314; border-radius: 50%; display: flex; align-items: center; justify-content: center; font: bold 20px/1 sans-serif; cursor: pointer; color: #3d2314; background: #fdf4da; }
.fr-close:hover { background: #e8d9b0; }
.fr-title { font: 900 22px/1 'Courier New', mono; color: #3d2314; text-align: center; margin-bottom: 25px; letter-spacing: 1px; }
.fr-section { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
.fr-section:last-child { margin-bottom: 0; }
.fr-section-title { font: bold 16px/1 'Courier New', mono; color: #3d2314; }
.fr-list { display: flex; flex-direction: column; gap: 15px; padding-left: 5px; }
.fr-item { display: flex; align-items: center; gap: 15px; }
.fr-avatar { width: 44px; height: 44px; border: 3px dashed #3d2314; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #fff9e6; }
.fr-avatar img { width: 28px; height: 28px; opacity: 0.8; image-rendering: auto; }
.fr-name { font: bold 16px/1 'Courier New', mono; color: #3d2314; }
`;

// Insert CSS before </style>
html = html.replace('</style>', frCss + '</style>');

// 2. Restore HTML
const frHtml = `
  <!-- Friends Overlay -->
  <div class="ov h" id="fr-ov" onclick="closeFriends()">
    <div class="fr-card" onclick="event.stopPropagation()">
      <div class="fr-close" onclick="closeFriends()">×</div>
      <div class="fr-title" data-t="fr_title">Play with Friends</div>
      
      <div class="fr-section">
        <div class="fr-section-title" data-t="fr_online">Online Now</div>
        <div class="fr-list" id="fr-online-list">
          <div style="font-size:12px;opacity:0.6;margin-left:5px" data-t="fr_no_online">No friends online.</div>
        </div>
      </div>

      <div class="fr-section" style="margin-top:10px">
        <div class="fr-section-title" data-t="fr_offline">Offline</div>
        <div class="fr-list">
          <div class="fr-item">
            <div class="fr-avatar"><img src="group.svg" alt=""></div>
            <div class="fr-name">Aleena</div>
          </div>
          <div class="fr-item">
            <div class="fr-avatar"><img src="group.svg" alt=""></div>
            <div class="fr-name">Ali</div>
          </div>
          <div class="fr-item">
            <div class="fr-avatar"><img src="group.svg" alt=""></div>
            <div class="fr-name">Qasim</div>
          </div>
          <div class="fr-item">
            <div class="fr-avatar"><img src="group.svg" alt=""></div>
            <div class="fr-name">Ayesha</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Remove the old fr-ov if it exists and insert the new one
let oldFrOvStart = html.indexOf('<!-- Friends Overlay -->');
let oldFrOvEnd = html.indexOf('<!-- Real World Events Overlay -->');
if (oldFrOvStart !== -1 && oldFrOvEnd !== -1) {
    html = html.substring(0, oldFrOvStart) + frHtml + html.substring(oldFrOvEnd);
} else {
    // If comments are missing, just replace the tag
    html = html.replace(/<div class="ov h" id="fr-ov">[\s\S]*?<\/div>\s*<\/div>/, frHtml);
}

fs.writeFileSync('index.html', html);
console.log('Restored friends overlay to previous design');
