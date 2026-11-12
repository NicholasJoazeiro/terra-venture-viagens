// Auditoria de links internos do blog.
// Mede, por artigo, para onde ele aponta e quem aponta para ele, separando:
//   - links dentro do corpo (CTA, "Para ir alem", "Leia tambem")
//   - links vindos de fora do blog (destinos, home, servicos, melhor-epoca)
// Comentarios HTML e menus/rodape ficam de fora: link de navegacao global nao
// e conexao editorial, todo mundo tem.
const fs = require('fs');
const l = require('./lib.js');

const paginas = fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'));
const slugs = paginas.map(f => f.replace(/\.html$/, ''));
const artigos = slugs.filter(s => s.startsWith('blog-'));
const HUBS = new Set(['index', 'servicos', 'destinos', 'melhor-epoca', 'cruzeiros', 'contato', 'historia', 'blog', 'transfer-executivo']);
const dossies = slugs.filter(s => !s.startsWith('blog-') && !HUBS.has(s) && s !== '404');

function corpo(t) {
    t = t.replace(/<!--[\s\S]*?-->/g, '');
    // so o miolo editorial: tira header, footer e o botao flutuante
    const a = t.indexOf('<section class="article-body"');
    if (a !== -1) {
        const b = t.indexOf('<footer class="footer"', a);
        return t.slice(a, b === -1 ? undefined : b);
    }
    // paginas que nao sao artigo: o <main> aproximado, sem navbar nem footer
    const ini = t.indexOf('</header>');
    const fim = t.indexOf('<footer class="footer"');
    return t.slice(ini === -1 ? 0 : ini, fim === -1 ? undefined : fim);
}
function internos(html) {
    const out = [];
    for (const m of html.matchAll(/href="(\/[a-z0-9-]*)(?:[?#][^"]*)?"/g)) out.push(m[1].replace(/^\//, '') || 'index');
    return out;
}

const saida = {};      // slug -> { para: Set, de: Set, deForaDoBlog: Set }
for (const s of artigos) saida[s] = { para: new Set(), de: new Set(), fora: new Set() };
const dossieDe = {};   // dossie -> artigos que o citam
for (const d of dossies) dossieDe[d] = new Set();

for (const f of paginas) {
    const slug = f.replace(/\.html$/, '');
    const alvos = internos(corpo(l.ler(f)));
    for (const a of alvos) {
        if (a === slug) continue;
        if (saida[slug]) saida[slug].para.add(a);
        if (saida[a]) { if (slug.startsWith('blog-')) saida[a].de.add(slug); else saida[a].fora.add(slug); }
        if (dossieDe[a] && slug.startsWith('blog-')) dossieDe[a].add(slug);
    }
}

const tipo = a => a.startsWith('blog-') ? 'artigo' : HUBS.has(a) ? 'hub' : slugs.includes(a) ? 'dossie' : 'outro';
const linhas = [];
for (const s of artigos) {
    const p = [...saida[s].para];
    linhas.push({
        s,
        art: p.filter(x => tipo(x) === 'artigo').length,
        dos: p.filter(x => tipo(x) === 'dossie').length,
        hub: p.filter(x => tipo(x) === 'hub' && x !== 'blog').length,
        entra: saida[s].de.size,
        entraFora: saida[s].fora.size,
    });
}

console.log('artigos:', artigos.length, '| dossies de destino:', dossies.length);
console.log('');
console.log('=== distribuicao ===');
const cont = (f) => linhas.filter(f).length;
console.log('  sem NENHUM link para outro artigo         :', cont(x => x.art === 0));
console.log('  sem NENHUM link para dossie de destino    :', cont(x => x.dos === 0));
console.log('  sem link para /servicos nem /contato      :', cont(x => !(saida[x.s].para.has('servicos') || saida[x.s].para.has('contato'))));
console.log('  que ninguem aponta (orfaos entre artigos) :', cont(x => x.entra === 0));
console.log('  sem NENHUM link vindo de fora do blog     :', cont(x => x.entraFora === 0));
console.log('');
console.log('=== dossies de destino: quantos recebem link de artigo ===');
const comLink = dossies.filter(d => dossieDe[d].size > 0);
console.log('  recebem :', comLink.length, 'de', dossies.length);
console.log('  nao recebem:', dossies.filter(d => dossieDe[d].size === 0).join(', '));
console.log('');
console.log('=== dossies de destino que linkam de volta para o blog ===');
let voltam = 0;
for (const d of dossies) {
    const alvos = internos(corpo(l.ler(d + '.html')));
    if (alvos.some(a => a.startsWith('blog-'))) voltam++;
}
console.log('  ', voltam, 'de', dossies.length);
console.log('');
console.log('=== as hubs apontam para o blog? ===');
for (const h of ['index', 'servicos', 'destinos', 'melhor-epoca', 'cruzeiros', 'contato', 'historia']) {
    const alvos = internos(corpo(l.ler(h + '.html')));
    const n = new Set(alvos.filter(a => a.startsWith('blog-'))).size;
    console.log('  ' + h.padEnd(16), 'links para artigos:', n, '| para /blog:', alvos.includes('blog') ? 'sim' : 'nao');
}
console.log('');
console.log('=== orfaos (nenhum artigo e nenhuma pagina aponta) ===');
console.log('  ', linhas.filter(x => x.entra === 0 && x.entraFora === 0).map(x => x.s).join(', ') || 'nenhum');

fs.writeFileSync(require('path').resolve(__dirname, 'auditoria-conexoes.json'), JSON.stringify({ linhas, dossieDe: Object.fromEntries(Object.entries(dossieDe).map(([k, v]) => [k, [...v]])) }, null, 1), 'utf8');
