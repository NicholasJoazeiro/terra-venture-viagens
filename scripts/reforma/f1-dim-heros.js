// As imagens de hero das subpaginas tinham ficado de fora porque o passo
// anterior pulava tudo com fetchpriority. Elas continuam eager, mas tambem
// precisam de dimensao: sem isso o salto de layout acontece justo no LCP.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dir = path.resolve(__dirname, '../../public');
(async () => {
    const cache = new Map();
    let n = 0;
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
        const fp = path.join(dir, f);
        let t = fs.readFileSync(fp, 'utf8');
        const orig = t;
        for (const tag of [...new Set(t.match(/<img\b[^>]*>/g) || [])]) {
            if (/\bwidth=/.test(tag) || /\bheight=/.test(tag)) continue;
            const m = tag.match(/src="([^"]+)"/);
            if (!m || /^https?:/.test(m[1])) continue;
            const src = m[1];
            if (!cache.has(src)) {
                const file = path.join(dir, src);
                let d = null;
                if (fs.existsSync(file)) { try { const mm = await sharp(file).metadata(); d = { w: mm.width, h: mm.height }; } catch (e) {} }
                cache.set(src, d);
            }
            const d = cache.get(src);
            if (!d) continue;
            t = t.split(tag).join(tag.replace(/<img\b/, `<img width="${d.w}" height="${d.h}"`));
            n++;
        }
        if (t !== orig) fs.writeFileSync(fp, t, 'utf8');
    }
    console.log('heros de subpagina com dimensao:', n);
})();
