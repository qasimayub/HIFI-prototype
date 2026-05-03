const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update Scene 8 text
html = html.replace(
  '<div class="sm-text" style="font-size:14px; color:#3d2314; margin-bottom:30px; text-align:left;">You stopped the river<br>pollution and saved the jobs<br>of all factory workers!</div>',
  '<div class="sm-text" style="font-size:14px; color:#3d2314; margin-bottom:30px; text-align:left;" data-t="fc_s8_text">You fixed the pipes<br>and stopped the toxic leak!</div>'
);

html = html.replace(
  '<div class="lg-title" style="color:#008050; font-size:20px; font-weight:bold; margin-bottom:20px;">Mission Successful</div>',
  '<div class="lg-title" style="color:#008050; font-size:20px; font-weight:bold; margin-bottom:20px;" data-t="fc_s8_title">Mission Successful</div>'
);

// Delete scenes 2 through 6. Scene 8 is at the end.
let s2 = html.indexOf('<!-- Scene 2 -->');
let s8 = html.indexOf('<!-- Scene 8 (Success) -->');
if (s2 !== -1 && s8 !== -1) {
  html = html.substring(0, s2) + html.substring(s8);
  fs.writeFileSync('index.html', html);
  console.log("Deleted intermediate scenes.");
} else {
  console.log("Could not find scenes.");
}
