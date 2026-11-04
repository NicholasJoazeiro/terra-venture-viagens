// Fase 7: peso das fontes.
//
// O pedido ao Google Fonts trazia o eixo italico da Fraunces (um arquivo de
// ~80 KB), o peso 600 da Fraunces (que nenhuma regra usa) e o peso 300 da
// Inter (idem). O italico so aparecia nos paragrafos de abertura em terracota,
// que sao justamente um dos tiques de landing gerada que esta reforma tirou do
// resto do site. Saem os tres.
//
// O <em> da pagina de historia continua italico, sintetizado pelo navegador.
// E uma palavra.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const ANTES = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&display=swap';
const DEPOIS = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500;600&display=swap';

let n = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    if (!t.includes(ANTES)) continue;
    fs.writeFileSync(fp, t.split(ANTES).join(DEPOIS), 'utf8');
    n++;
}
console.log('paginas com o pedido de fonte enxuto:', n);

const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

// os paragrafos de abertura em serifa italica terracota perdem o italico
const alvos = [
    '.quem-somos-content .lead-text { font-family: var(--serif); font-size: 1.4rem; font-style: italic; color: var(--terra);',
    '.quem-somos-content .signature { font-family: var(--serif); font-style: italic; font-size: 1.15rem; color: var(--moss);',
    '.transfer-story-text .lead-text { font-family: var(--serif); font-size: 1.4rem; font-style: italic; color: var(--terra);',
];
let trocas = 0;
for (const a of alvos) {
    if (!c.includes(a)) { console.error('FALHA:', a.slice(0, 40)); process.exit(1); }
    c = c.replace(a, a.replace(' font-style: italic;', ''));
    trocas++;
}
// os de varias linhas
const multi = ['.subpage .storytelling .lead', '.historia-lead', '.historia-fecho p', '.article-content .lead-text'];
for (const sel of multi) {
    const i = c.indexOf(sel + ' {');
    if (i === -1) { console.error('FALHA: seletor', sel); process.exit(1); }
    const fim = c.indexOf('}', i);
    const bloco = c.slice(i, fim);
    if (!bloco.includes('font-style: italic;')) { console.error('FALHA: sem italico em', sel); process.exit(1); }
    c = c.slice(0, i) + bloco.replace(/\s*font-style: italic;/, '') + c.slice(fim);
    trocas++;
}
fs.writeFileSync(cp, c, 'utf8');
console.log('paragrafos de abertura sem italico:', trocas);
console.log('font-style: italic restante:', (c.match(/font-style: italic/g) || []).length, '(esperado 1, o <em> da historia)');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('chaves', a, b, a === b ? 'OK' : 'ERRO');
