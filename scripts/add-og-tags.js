// Open Graph em todas as páginas.
// og:image PRECISA ser URL absoluta (relativa não funciona em preview de link)
// e em JPEG, porque WhatsApp/Facebook não renderizam WebP de forma confiável.
// O negócio roda no WhatsApp, então preview quebrado é perda direta.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';
const OG_IMAGE = base + '/og-image.jpg';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== '404.html');

let done = 0, skipped = [];
for (const f of files) {
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');

    const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1];
    const desc = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    const canonical = (s.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];

    if (!title || !canonical) { skipped.push(f + ' (sem title/canonical)'); continue; }

    // remove qualquer og/twitter antigo para não duplicar
    s = s.replace(/\s*<meta property="og:[^"]*" content="[^"]*">/g, '');
    s = s.replace(/\s*<meta name="twitter:[^"]*" content="[^"]*">/g, '');

    const esc = t => String(t).replace(/"/g, '&quot;');
    const block = [
        `    <meta property="og:type" content="website">`,
        `    <meta property="og:url" content="${canonical}">`,
        `    <meta property="og:title" content="${esc(title)}">`,
        desc ? `    <meta property="og:description" content="${esc(desc)}">` : null,
        `    <meta property="og:image" content="${OG_IMAGE}">`,
        `    <meta property="og:locale" content="pt_BR">`,
        `    <meta property="og:site_name" content="Terra Venture Viagens">`,
        `    <meta name="twitter:card" content="summary_large_image">`,
        `    <meta name="twitter:title" content="${esc(title)}">`,
        desc ? `    <meta name="twitter:description" content="${esc(desc)}">` : null,
        `    <meta name="twitter:image" content="${OG_IMAGE}">`,
    ].filter(Boolean).join('\n');

    // insere logo depois da canonical
    s = s.replace(/(<link rel="canonical" href="[^"]*">)/, `$1\n${block}`);
    fs.writeFileSync(fp, s, 'utf8');
    done++;
}

console.log('Open Graph aplicado em', done, 'paginas');
if (skipped.length) console.log('puladas:', skipped.join(', '));
