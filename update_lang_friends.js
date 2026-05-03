const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const enFriends = "fr_title: 'Play with Friends', fr_online: 'Online Now', fr_offline: 'Offline', fr_no_online: 'No friends online.',";
const urFriends = "fr_title: 'دوستوں کے ساتھ کھیلیں', fr_online: 'آن لائن دوست', fr_offline: 'آف لائن', fr_no_online: 'کوئی دوست آن لائن نہیں۔',";

html = html.replace("badge_reef: 'Reef Protector',", `badge_reef: 'Reef Protector', ${enFriends}`);
html = html.replace("badge_reef: 'مرجان محافظ',", `badge_reef: 'مرجان محافظ', ${urFriends}`);

fs.writeFileSync('index.html', html);
console.log('Updated LANG with friends keys');
