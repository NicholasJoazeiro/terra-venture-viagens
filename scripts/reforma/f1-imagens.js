// Fase 1: variantes do hero. A origem tem 1800px, abaixo dos 2400 pedidos,
// entao 2400 fica como TODO(nicholas) e nada e ampliado.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../../public');
const SRC = path.join(dir, 'hero-lago-molveno.webp');

(async () => {
    const m = await sharp(SRC).metadata();
    console.log('origem', m.width + 'x' + m.height);
    if (m.width < 2400) console.log('AVISO: origem < 2400px, nao amplio. 2400 fica como TODO.');

    for (const w of [800, 1600]) {
        const out = path.join(dir, `hero-lago-molveno-${w}.webp`);
        await sharp(SRC).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
        const mm = await sharp(out).metadata();
        console.log('horizontal', w, '->', mm.width + 'x' + mm.height, (fs.statSync(out).size / 1024).toFixed(0) + 'KB');
    }

    // recorte vertical para celular: pega os picos (x~480-900) e parte do lago.
    const LARG = 809; // 4:5 a partir dos 1011 de altura
    const vert = path.join(dir, 'hero-lago-molveno-vertical.webp');
    await sharp(SRC).extract({ left: 480, top: 0, width: LARG, height: m.height })
        .webp({ quality: 84 }).toFile(vert);
    const mv = await sharp(vert).metadata();
    console.log('vertical  ->', mv.width + 'x' + mv.height, (fs.statSync(vert).size / 1024).toFixed(0) + 'KB');

    console.log('maior horizontal servido:', m.width + 'px',
        (fs.statSync(SRC).size / 1024).toFixed(0) + 'KB', '(limite 350KB)');
})();
