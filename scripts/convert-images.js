// Converte todas as imagens de public/ para WebP.
// Mantém os originais no disco (a troca de referências é feita por outro passo,
// e a remoção dos originais só acontece depois da verificação).
// Rodar: node scripts/convert-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
// Cap no lado MAIS LONGO, não só na largura: as imagens mais pesadas do site
// são retratos (ex: 1600x2842), onde a altura é que estoura o número de pixels.
const MAX_SIDE = 1500;
const QUALITY = 80;

(async () => {
    const imgs = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
    let before = 0, after = 0, done = 0, failed = [];

    for (const f of imgs) {
        const src = path.join(dir, f);
        const out = path.join(dir, f.replace(/\.(jpe?g|png)$/i, '.webp'));
        try {
            const meta = await sharp(src).metadata();
            let pipeline = sharp(src);
            const longest = Math.max(meta.width, meta.height);
            if (longest > MAX_SIDE) {
                const opts = meta.width >= meta.height
                    ? { width: MAX_SIDE }
                    : { height: MAX_SIDE };
                pipeline = pipeline.resize({ ...opts, withoutEnlargement: true });
            }
            await pipeline.webp({ quality: QUALITY }).toFile(out);
            before += fs.statSync(src).size;
            after += fs.statSync(out).size;
            done++;
        } catch (e) {
            failed.push(f + ': ' + e.message.slice(0, 60));
        }
    }

    console.log('convertidas:', done, '/', imgs.length);
    console.log('antes: ', (before / 1024 / 1024).toFixed(1), 'MB');
    console.log('depois:', (after / 1024 / 1024).toFixed(1), 'MB');
    console.log('reducao:', (100 - (after / before * 100)).toFixed(1) + '%');
    if (failed.length) console.log('FALHAS:\n' + failed.join('\n'));
})();
