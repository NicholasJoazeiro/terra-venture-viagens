// Fase 7: links, ancoras e metadados.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const paginas = fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'));
const existe = new Set(paginas.map(f => '/' + f.replace(/\.html$/, '')));
existe.add('/');

// ids de cada pagina, para conferir as ancoras
const ids = {};
for (const f of paginas) {
    const rota = '/' + f.replace(/\.html$/, '');
    ids[rota] = new Set([...l.ler(f).matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
}
ids['/'] = ids['/index'];

/* ---------------- links quebrados ---------------- */
const quebrados = [];
for (const f of paginas) {
    // os blocos opcionais de prova social moram comentados no HTML; os
    // arquivos que eles citam ainda nao existem, e tudo bem
    const t = l.ler(f).replace(/<!--[\s\S]*?-->/g, '');
    const rotaDaPagina = '/' + f.replace(/\.html$/, '');
    for (const m of t.matchAll(/href="([^"]+)"/g)) {
        const href = m[1];
        if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) {
            if (href.startsWith('#')) {
                const id = href.slice(1);
                if (id && !ids[rotaDaPagina].has(id)) quebrados.push([f, href, 'ancora inexistente na propria pagina']);
            }
            continue;
        }
        const [caminho, ancora] = href.split('#');
        // a query do cache-busting sai antes do teste de extensao: senao
        // terra.css?v=abc parece uma rota e e contado como link quebrado
        const limpo = caminho.split('?')[0].replace(/\/$/, '') || '/';
        if (/\.(css|js|xml|webp|jpg|jpeg|png|mp4|txt|md)$/.test(limpo)) {
            if (!fs.existsSync(path.join(l.DIR, limpo.replace(/^\//, '')))) quebrados.push([f, href, 'arquivo inexistente']);
            continue;
        }
        if (!existe.has(limpo)) { quebrados.push([f, href, 'pagina inexistente']); continue; }
        if (ancora && ids[limpo] && !ids[limpo].has(ancora)) quebrados.push([f, href, 'ancora inexistente em ' + limpo]);
    }
}
console.log('=== links internos quebrados:', quebrados.length);
quebrados.slice(0, 30).forEach(x => console.log('   ', x.join('  |  ')));

/* ---------------- metadados ---------------- */
const semTitulo = [], semDesc = [], descLongas = [], titulosLongos = [];
const titulos = {}, descs = {};
for (const f of paginas) {
    const t = l.ler(f);
    const ti = (t.match(/<title>([^<]*)<\/title>/) || [])[1];
    // a tag pode estar quebrada em duas linhas, com o content na segunda
    const tagDesc = (t.match(/<meta name="description"[\s\S]{0,400}?>/) || [])[0] || '';
    const de = (tagDesc.match(/content="([^"]*)"/) || [])[1];
    if (!ti) semTitulo.push(f); else { titulos[ti] = (titulos[ti] || 0) + 1; if (ti.length > 60) titulosLongos.push(f + ' (' + ti.length + ')'); }
    if (!de) semDesc.push(f); else { descs[de] = (descs[de] || 0) + 1; if (de.length > 160) descLongas.push(f + ' (' + de.length + ')'); }
}
console.log('\n=== metadados ===');
console.log('sem <title>:', semTitulo.length ? semTitulo.join(', ') : 'nenhuma');
console.log('sem description:', semDesc.length ? semDesc.join(', ') : 'nenhuma');
console.log('titulos repetidos:', Object.entries(titulos).filter(([, n]) => n > 1).map(([k, n]) => k + ' x' + n).join(' | ') || 'nenhum');
console.log('descriptions repetidas:', Object.entries(descs).filter(([, n]) => n > 1).length);
console.log('titulos acima de 60 caracteres:', titulosLongos.length);
console.log('descriptions acima de 160 caracteres:', descLongas.length);

/* ---------------- dados estruturados ---------------- */
const comRating = paginas.filter(f => /aggregateRating|ratingValue|reviewCount/.test(l.ler(f)));
console.log('\n=== dados estruturados ===');
console.log('paginas com nota de avaliacao no schema:', comRating.length ? comRating.join(', ') : 'nenhuma (correto, nao ha nota real)');
const comOrg = paginas.filter(f => /"@type":\s*"TravelAgency"/.test(l.ler(f)));
console.log('paginas com schema de organizacao:', comOrg.length, comOrg.slice(0, 5).join(', '));

/* ---------------- og-image ---------------- */
const og = path.join(l.DIR, 'og-image.jpg');
if (fs.existsSync(og)) {
    const sharp = require('sharp');
    sharp(og).metadata().then(m => {
        console.log('\nog-image.jpg:', m.width + 'x' + m.height, m.width === 1200 && m.height === 630 ? 'OK (1200x630)' : 'FORA DO PADRAO');
    });
}
