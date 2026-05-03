const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const ids = html.match(/id="[^"]+"/g);
const counts = {};
ids.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
});
const duplicates = Object.keys(counts).filter(id => counts[id] > 1);
if (duplicates.length > 0) {
    console.log('Duplicates found:', duplicates.map(id => `${id} (${counts[id]})`));
} else {
    console.log('No duplicate IDs found');
}
