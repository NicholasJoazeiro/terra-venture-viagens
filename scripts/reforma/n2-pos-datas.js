// Tudo que depende das datas novas: "Leia tambem" recalculado, sitemap com a
// data real do artigo e conferencia de consistencia.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* ---------- 1. "Leia tambem": mesma tag primeiro, depois o mais recente ---------- */
const arts = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.startsWith('blog-') && x.endsWith('.html'))) {
    const t = l.ler(f);
    arts.push({
        slug: f.replace(/\.html$/, ''),
        f,
        titulo: ((t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]*>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(),
        tag: (t.match(/class="blog-tag">([^<]*)/) || [])[1] || '',
        data: (t.match(/"datePublished":\s*"([^"]+)"/) || [])[1] || '',
    });
}
arts.sort((a, b) => b.data.localeCompare(a.data) || a.slug.localeCompare(b.slug));

function relacionados(a) {
    const mesma = arts.filter(x => x.slug !== a.slug && x.tag === a.tag);
    const resto = arts.filter(x => x.slug !== a.slug && x.tag !== a.tag);
    // do grupo da mesma tag, os tres mais proximos NO TEMPO: leitor que veio de
    // um texto de marco tende a gostar de algo da mesma epoca do site
    const ordenados = mesma.sort((x, y) => Math.abs(Date.parse(x.data) - Date.parse(a.data)) - Math.abs(Date.parse(y.data) - Date.parse(a.data)));
    return ordenados.concat(resto).slice(0, 3);
}

let leias = 0;
for (const a of arts) {
    const fp = path.join(l.DIR, a.f);
    let t = fs.readFileSync(fp, 'utf8');
    const q = l.quebra(t);
    const i = t.indexOf('<aside class="leia-tambem">');
    if (i === -1) { console.log('  sem leia-tambem:', a.slug); continue; }
    const fim = t.indexOf('</aside>', i) + '</aside>'.length;
    const rel = relacionados(a);
    const NOVO = ['<aside class="leia-tambem">',
        '                    <h3>Leia também</h3>',
        '                    <ul>',
        ...rel.map(r => '                        <li><a href="/' + r.slug + '">' + r.titulo + '</a></li>'),
        '                    </ul>',
        '                </aside>'].join(q);
    t = t.slice(0, i) + NOVO + t.slice(fim);
    fs.writeFileSync(fp, t, 'utf8');
    leias++;
}
console.log('"Leia tambem" recalculado em', leias, 'artigos');

/* ---------- 2. sitemap: lastmod do artigo = dateModified, nao a data do arquivo ---------- */
{
    const sp = path.resolve(__dirname, '../generate-sitemap.js');
    let s = fs.readFileSync(sp, 'utf8');
    if (!s.includes('dateModified')) {
        const DE = "const mtime = fs.statSync(path.join(publicDir, f)).mtime.toISOString().slice(0, 10);";
        if (!s.includes(DE)) { console.error('FALHA: linha do mtime no sitemap'); process.exit(1); }
        s = s.replace(DE, `let mtime = fs.statSync(path.join(publicDir, f)).mtime.toISOString().slice(0, 10);
    // artigo: a data que o proprio artigo declara, nao a do ultimo build. Senao
    // todo o diario aparece como "modificado hoje" a cada deploy.
    if (f.startsWith('blog-')) {
        const m = fs.readFileSync(path.join(publicDir, f), 'utf8').match(/"dateModified":\\s*"(\\d{4}-\\d{2}-\\d{2})"/);
        if (m) mtime = m[1];
    }`);
        fs.writeFileSync(sp, s, 'utf8');
        console.log('generate-sitemap.js: lastmod dos artigos vem do dateModified');
    }
}

/* ---------- 3. consistencia ---------- */
let problemas = 0;
const hoje = '2026-11-12';
for (const a of arts) {
    const t = l.ler(a.f);
    const pub = (t.match(/"datePublished":\s*"([^"]+)"/) || [])[1];
    const mod = (t.match(/"dateModified":\s*"([^"]+)"/) || [])[1];
    const vis = (t.match(/<time datetime="([^"]+)"/) || [])[1];
    const autor = /"author":\s*\{\s*"@type":\s*"Person",\s*"name":\s*"Nicholas Joazeiro"/.test(t);
    const ok = pub && mod && pub === mod && vis === pub && autor && pub <= hoje && pub >= '2026-01-01';
    if (!ok) { problemas++; console.log('  INCONSISTENTE:', a.slug, pub, mod, vis, 'autor ok:', autor); }
}
const bl = l.ler('blog.html');
let cardsFora = 0;
for (const a of arts) {
    const m = bl.match(new RegExp('<a href="/' + a.slug + '" class="blog-card[\\s\\S]*?blog-card-date"><i class="far fa-calendar-alt"></i> ([^<]*)'));
    const [y, mo, d] = a.data.split('-');
    const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const esperado = parseInt(d, 10) + ' de ' + MESES[parseInt(mo, 10) - 1] + ', ' + y;
    if (!m || m[1].trim() !== esperado) { cardsFora++; console.log('  CARD FORA:', a.slug, m && m[1], 'esperado', esperado); }
}
console.log('artigos:', arts.length, '| inconsistentes:', problemas, '| cards com data errada:', cardsFora);
if (problemas || cardsFora) process.exit(1);
