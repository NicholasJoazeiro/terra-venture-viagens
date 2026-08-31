// Troca referências de .jpg/.jpeg/.png para .webp em HTML, CSS e JS,
// mas SÓ quando o .webp correspondente existe de fato em public/.
// Rodar: node scripts/swap-image-refs.js
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');

// Mapa: nome original -> nome webp (apenas os que realmente existem)
const webpSet = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.webp')));
const originals = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
const map = new Map();
for (const o of originals) {
    const w = o.replace(/\.(jpe?g|png)$/i, '.webp');
    if (webpSet.has(w)) map.set(o, w);
}

const targets = [];
function walk(d) {
    for (const f of fs.readdirSync(d)) {
        const full = path.join(d, f);
        const st = fs.statSync(full);
        if (st.isDirectory()) { if (f !== 'scripts' && f !== 'node_modules') walk(full); }
        else if (/\.(html|css|js)$/i.test(f)) targets.push(full);
    }
}
walk(dir);

let totalRefs = 0;
const touched = [];
for (const file of targets) {
    let s = fs.readFileSync(file, 'utf8');
    const before = s;
    let n = 0;
    for (const [orig, webp] of map) {
        // escapa caracteres especiais de regex no nome do arquivo
        const esc = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(esc, 'g');
        const hits = (s.match(re) || []).length;
        if (hits) { s = s.replace(re, webp); n += hits; }
    }
    if (s !== before) {
        fs.writeFileSync(file, s, 'utf8');
        totalRefs += n;
        touched.push(path.basename(file) + ':' + n);
    }
}

console.log('arquivos alterados:', touched.length);
console.log('referencias trocadas:', totalRefs);
