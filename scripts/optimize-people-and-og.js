// 1) Fotos de clientes/fundadores servem hoje dois papéis com o MESMO arquivo:
//    avatar de 54px e tile de comunidade de ~380px. Gera duas versões certas.
// 2) Cria og-image.jpg (1200x630, JPEG absoluto) para preview de link.
//    WhatsApp e Facebook não renderizam WebP de forma confiável em preview,
//    e og:image exige URL absoluta.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');

const people = [
    'zoraia-joazeiro-depoimento-italia',
    'marcia-reis-cliente-italia',
    'gabriel-dilly-cliente-rio-de-janeiro',
    'julia-e-manuela-clientes-buenos-aires',
    'joice-e-rui-clientes-bonito-ms',
    'nicholas-e-giovana-fundadores-terra-venture',
];

(async () => {
    let saved = 0;
    for (const p of people) {
        const src = path.join(dir, p + '.webp');
        if (!fs.existsSync(src)) { console.log('SKIP (nao existe):', p); continue; }
        const beforeSize = fs.statSync(src).size;

        // sharp no Windows nao le e escreve o mesmo arquivo: passa por buffer
        const original = fs.readFileSync(src);

        // tile de comunidade: 380px de exibição -> 800px cobre retina
        const tileBuf = await sharp(original).resize({ width: 800, height: 800, fit: 'cover' }).webp({ quality: 80 }).toBuffer();
        fs.writeFileSync(src, tileBuf);

        // avatar: 54px (92px no destaque) -> 200px cobre retina
        const avatarOut = path.join(dir, p + '-avatar.webp');
        const avatarBuf = await sharp(original).resize({ width: 200, height: 200, fit: 'cover' }).webp({ quality: 82 }).toBuffer();
        fs.writeFileSync(avatarOut, avatarBuf);

        const afterSize = fs.statSync(src).size + fs.statSync(avatarOut).size;
        saved += beforeSize - afterSize;
        console.log(p, Math.round(beforeSize / 1024) + 'KB -> tile ' + Math.round(fs.statSync(src).size / 1024) + 'KB + avatar ' + Math.round(fs.statSync(avatarOut).size / 1024) + 'KB');
    }
    console.log('--- economia total nas fotos de pessoas:', Math.round(saved / 1024) + 'KB');

    // og-image.jpg 1200x630 a partir do hero da Patagonia
    const ogSrc = path.join(dir, 'patagonia-torres-del-paine.webp');
    const ogOut = path.join(dir, 'og-image.jpg');
    await sharp(ogSrc).resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' }).jpeg({ quality: 84 }).toFile(ogOut);
    console.log('og-image.jpg criado:', Math.round(fs.statSync(ogOut).size / 1024) + 'KB (1200x630 JPEG)');
})();
