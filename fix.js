const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let oldHtml = fs.readFileSync('/tmp/old_index.html', 'utf8');

let goodStart = oldHtml.indexOf(' [0,3,2,2,3,3,3,3,3,3,2,2,3,0,0,0],');
let goodEnd = oldHtml.indexOf('const ANIMAL_DATA');
let goodBlock = oldHtml.substring(goodStart, goodEnd);

goodBlock = goodBlock.replace(
  /{id:'polarbear'[\s\S]*?(?=\s*\{id:'dolphin')/,
  `{id:'snowleopard',title:'SNOW LEOPARD RESCUE',desc:'Habitat loss!\\nAnswer to save it.',
   title_ur:'برفانی چیتے کو بچائیں', desc_ur:'رہائش گاہ ختم ہو رہی ہے!\\nجواب دے کر بچائیں۔',
   icon:'🐆',tx:220,ty:175,tw:80,th:80,type:'quiz',coins:60,xp:120,color:'#d0e0d0',
   animal:'Snow Leopard',animal_ur:'برفانی چیتا',qs:[
    {q:'Where do snow leopards live in Pakistan?',opts:['Northern mountains','Sindh deserts','Punjab plains','Makran coast'],a:0,f:'Snow leopards live in the high mountains of Gilgit-Baltistan and Khyber Pakhtunkhwa.',
     q_ur:'پاکستان میں برفانی چیتے کہاں رہتے ہیں؟',opts_ur:['شمالی پہاڑوں میں','سندھ کے صحرا میں','پنجاب کے میدانوں میں','مکران کے ساحل پر'],f_ur:'برفانی چیتے گلگت بلتستان اور خیبر پختونخوا کے اونچے پہاڑوں میں رہتے ہیں۔'},
    {q:'What mainly threatens snow leopards?',opts:['Habitat loss & poaching','Too much snow','Lions','Floods'],a:0,f:'Habitat destruction and illegal hunting are their biggest threats.',
     q_ur:'برفانی چیتے کو سب سے بڑا خطرہ کیا ہے؟',opts_ur:['رہائش کی تباہی اور شکار','بہت زیادہ برف','شیر','سیلاب'],f_ur:'ان کی رہائش گاہوں کی تباہی اور غیر قانونی شکار سب سے بڑے خطرات ہیں۔'},
    {q:'How many snow leopards are left in Pakistan?',opts:['Thousands','Around 200-400','Millions','None'],a:1,f:'They are endangered, with only an estimated 200 to 400 left in Pakistan.',
     q_ur:'پاکستان میں کتنے برفانی چیتے باقی ہیں؟',opts_ur:['ہزاروں','تقریباً 200-400','لاکھوں','کوئی نہیں'],f_ur:'یہ خطرے میں ہیں، پاکستان میں صرف 200 سے 400 باقی ہیں۔'},
    {q:'How can we protect them?',opts:['Stop illegal hunting','Keep them as pets','Cut mountain trees','Build roads'],a:0,f:'Stopping poaching and protecting their mountain habitats helps them survive.',
     q_ur:'ہم انہیں کیسے بچا سکتے ہیں؟',opts_ur:['غیر قانونی شکار روکیں','پالتو جانور بنائیں','پہاڑی درخت کاٹیں','سڑکیں بنائیں'],f_ur:'شکار روکنے اور ان کی پہاڑی رہائش گاہوں کو بچانے سے ان کی بقا ممکن ہے۔'},
  ]},
  `
);

goodBlock = goodBlock.replace(
  /{id:'coral'[\s\S]*?(?=];)/,
  `{id:'indus_dolphin',title:'INDUS RIVER RESCUE',desc:'Water pollution!\\nAnswer to save it.',
   title_ur:'دریائے سندھ بچائیں', desc_ur:'پانی کی آلودگی!\\nجواب دے کر بچائیں۔',
   icon:'🐟',tx:1200,ty:180,tw:200,th:200,type:'quiz',coins:65,xp:130,color:'#e09070',
   animal:'Indus Blind Dolphin', animal_ur:'سندھ کی اندھی ڈولفن', reqTools:['scissors'], qs:[
    {q:'Where is the blind dolphin found?',opts:['Only in Indus River','Arabian Sea','Atlantic Ocean','African rivers'],a:0,f:'The Indus River blind dolphin is endemic to Pakistan and found nowhere else.',
     q_ur:'اندھی ڈولفن کہاں پائی جاتی ہے؟',opts_ur:['صرف دریائے سندھ میں','بحیرہ عرب میں','بحر اوقیانوس میں','افریقی دریاؤں میں'],f_ur:'یہ ڈولفن صرف پاکستان کے دریائے سندھ میں پائی جاتی ہے۔'},
    {q:'Why is the Indus dolphin blind?',opts:['Muddy water adaptation','Sunlight','Disease','Genetics'],a:0,f:'They adapted to the muddy river waters and rely on echolocation instead of sight.',
     q_ur:'سندھ کی ڈولفن اندھی کیوں ہے؟',opts_ur:['گندلے پانی کے باعث','سورج کی روشنی','بیماری','جینز'],f_ur:'یہ گندلے پانی کی عادی ہو چکی ہے اور دیکھنے کے بجائے آواز سے راستہ تلاش کرتی ہے۔'},
    {q:'What threatens the Indus dolphin?',opts:['Water pollution & nets','Sharks','Cold weather','Crocodiles'],a:0,f:'Toxic chemicals from factories and fishing nets are their biggest threats.',
     q_ur:'سندھ کی ڈولفن کو کیا خطرہ ہے؟',opts_ur:['پانی کی آلودگی اور جال','شارک','سرد موسم','مگرمچھ'],f_ur:'کارخانوں کا کیمیکل اور مچھلی پکڑنے کے جال ان کے لیے سب سے بڑا خطرہ ہیں۔'},
    {q:'How to protect our rivers?',opts:['Stop dumping waste','Throw more plastic','Use more water','Ignore it'],a:0,f:'Keeping factory waste and plastic out of rivers saves marine life.',
     q_ur:'دریاؤں کو کیسے بچائیں؟',opts_ur:['کچرا پھینکنا بند کریں','مزید پلاسٹک پھینکیں','زیادہ پانی استعمال کریں','نظرانداز کریں'],f_ur:'کارخانوں کے کیمیکل اور پلاسٹک کو دریاؤں سے دور رکھ کر جانوروں کو بچایا جا سکتا ہے۔'},
  ]}
`
);

let badStart = html.indexOf(" [0,3,2,2,3,3,3,3,3,3,2,2,3  {id:'snowleopard'");
let badEnd = html.indexOf('const ANIMAL_DATA');
if(badStart !== -1 && badEnd !== -1) {
  html = html.substring(0, badStart) + goodBlock + html.substring(badEnd);
  fs.writeFileSync('index.html', html);
  console.log('Fixed');
} else {
  console.log('Could not find bad block boundaries', badStart, badEnd);
}
