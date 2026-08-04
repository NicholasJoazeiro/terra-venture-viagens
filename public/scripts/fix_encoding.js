const cp1252ToUnicode = {
  128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352,
  139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8212, 148: 8221, 149: 8226, 150: 8211, 151: 8212,
  152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376
};
const unicodeToCp1252 = {};
for (const [k, v] of Object.entries(cp1252ToUnicode)) {
  unicodeToCp1252[v] = parseInt(k);
}

const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Ã³') || content.includes('Ã§') || content.includes('Ã¡') || content.includes('Ã£') || content.includes('Ã©') || content.includes('Ã')) {
    let buf = Buffer.alloc(content.length);
    let i = 0;
    for (let j = 0; j < content.length; j++) {
      let code = content.charCodeAt(j);
      if (unicodeToCp1252[code]) {
        buf[i++] = unicodeToCp1252[code];
      } else if (code <= 255) {
        buf[i++] = code;
      } else {
        buf[i++] = code & 0xFF; // fallback
      }
    }
    const fixed = buf.slice(0, i).toString('utf8');
    fs.writeFileSync(file, fixed, 'utf8');
    console.log('Fixed', file);
  }
}
