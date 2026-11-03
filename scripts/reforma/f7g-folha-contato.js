// Monta folhas de contato numeradas com as imagens que ainda tem alt fraco,
// para eu olhar todas e escrever descricoes de verdade sem abrir uma a uma.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const l = require('./lib.js');

const SAIDA = process.argv[2];
if (!SAIDA) { console.error('uso: node f7g-folha-contato.js <pasta de saida>'); process.exit(1); }

function fracos() {
    const mapa = new Map();
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const t = l.ler(f).replace(/<!--[\s\S]*?-->/g, '');
        for (const tag of t.match(/<img\b[^>]*>/g) || []) {
            const src = (tag.match(/src="([^"]+)"/) || [])[1];
            const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
            if (!src || /^https?:/.test(src)) continue;
            if (alt === undefined || alt === '') continue;
            if (alt.trim().split(/\s+/).length > 3) continue;
            if (!mapa.has(src)) mapa.set(src, { alt, paginas: new Set() });
            mapa.get(src).paginas.add(f);
        }
    }
    return [...mapa.entries()].map(([src, v]) => ({ src, alt: v.alt, paginas: [...v.paginas] }));
}

(async () => {
    const lista = fracos();
    fs.mkdirSync(SAIDA, { recursive: true });
    fs.writeFileSync(path.join(SAIDA, 'lista.json'), JSON.stringify(lista, null, 1), 'utf8');

    const COL = 4, CELA_W = 380, CELA_H = 260, POR_FOLHA = 12;
    let folha = 0;
    for (let i = 0; i < lista.length; i += POR_FOLHA) {
        const lote = lista.slice(i, i + POR_FOLHA);
        const linhas = Math.ceil(lote.length / COL);
        const comp = [];
        for (let k = 0; k < lote.length; k++) {
            const buf = await sharp(path.join(l.DIR, lote[k].src))
                .resize({ width: CELA_W - 12, height: CELA_H - 34, fit: 'cover' }).toBuffer();
            comp.push({ input: buf, left: (k % COL) * CELA_W + 6, top: Math.floor(k / COL) * CELA_H + 28 });
            const rotulo = Buffer.from(
                `<svg width="${CELA_W}" height="26"><text x="6" y="19" font-family="monospace" font-size="17" fill="#111">#${i + k} ${lote[k].src.slice(0, 32)}</text></svg>`);
            comp.push({ input: rotulo, left: (k % COL) * CELA_W, top: Math.floor(k / COL) * CELA_H });
        }
        const out = path.join(SAIDA, 'folha-' + folha + '.jpg');
        await sharp({ create: { width: COL * CELA_W, height: linhas * CELA_H, channels: 3, background: '#ffffff' } })
            .composite(comp).jpeg({ quality: 78 }).toFile(out);
        console.log(out, '->', lote.length, 'imagens, de #' + i);
        folha++;
    }
    console.log('total de imagens com alt fraco:', lista.length);
})();
