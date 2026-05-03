const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  try {
    new Function(scriptMatch[1]);
    console.log("Syntax is valid!");
  } catch(e) {
    console.error("Syntax Error:", e.message);
  }
} else {
  console.log("No script found");
}
