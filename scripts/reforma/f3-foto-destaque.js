// Fase 3: versao maior da foto da Michele e do Daniel para o depoimento em
// destaque. O original e um retrato de celular (1080x1920); o recorte 4:5
// pega o rotor do Moulin Rouge, o letreiro e o casal inteiro ate a cintura.
// Recorte na mao de proposito: o position "attention" do sharp ja cortou o
// casal fora desta mesma foto uma vez.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../../public');
const SRC = path.join(dir, 'MicheleeDaniel.jpeg');
const OUT = path.join(dir, 'michele-e-daniel-clientes-paris-londres-destaque.webp');

(async () => {
    const m = await sharp(SRC).metadata();
    console.log('origem', m.width + 'x' + m.height);
    const larg = 1080, alt = 1350, topo = 250;
    if (topo + alt > m.height) { console.error('FALHA: recorte fora da imagem'); process.exit(1); }
    await sharp(SRC).extract({ left: 0, top: topo, width: larg, height: alt })
        .webp({ quality: 84 }).toFile(OUT);
    const mm = await sharp(OUT).metadata();
    console.log('destaque ->', mm.width + 'x' + mm.height, (fs.statSync(OUT).size / 1024).toFixed(0) + 'KB');
})();
