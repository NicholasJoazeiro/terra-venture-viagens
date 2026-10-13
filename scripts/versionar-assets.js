// Carimba a versão do CSS e do JS nas referências de todas as páginas.
//
// PROBLEMA QUE ISSO RESOLVE
// O Cloudflare serve terra.css e script.js com Cache-Control de 4 horas, e os
// HTML pediam os arquivos sem nenhuma versão. Resultado: depois de um deploy,
// quem tinha visitado o site nas últimas 4 horas continuava com o arquivo
// antigo, vendo o layout velho enquanto o novo já estava no ar.
//
// Com o hash do conteúdo na URL, qualquer alteração gera um endereço novo e o
// navegador busca na hora. Arquivo igual, hash igual, cache aproveitado.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.join(__dirname, '..', 'public');
const ASSETS = ['terra.css', 'script.js'];

const hashes = {};
for (const a of ASSETS) {
    const fp = path.join(dir, a);
    if (!fs.existsSync(fp)) { console.error('FALHA: nao encontrei', a); process.exit(1); }
    hashes[a] = crypto.createHash('sha1').update(fs.readFileSync(fp)).digest('hex').slice(0, 8);
}

let paginas = 0, refs = 0;
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');
    const orig = s;
    for (const a of ASSETS) {
        // pega o arquivo com ou sem ?v= anterior, em href ou src
        const re = new RegExp('((?:href|src)=")(' + a.replace('.', '\\.') + ')(\\?v=[a-f0-9]+)?(")', 'g');
        s = s.replace(re, (m, pre, nome, _ver, pos) => { refs++; return pre + nome + '?v=' + hashes[a] + pos; });
    }
    if (s !== orig) { fs.writeFileSync(fp, s, 'utf8'); paginas++; }
}

console.log('versoes carimbadas:');
for (const a of ASSETS) console.log('  ' + a.padEnd(12) + '?v=' + hashes[a]);
console.log('paginas atualizadas:', paginas, '| referencias:', refs);
