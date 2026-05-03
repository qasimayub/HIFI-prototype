const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    try {
        new Function(scriptMatch[1]);
        console.log('Script syntax is valid');
    } catch (e) {
        console.error('Script syntax error:', e.message);
    }
} else {
    console.log('No script found');
}
