// Dados estruturados (JSON-LD) nas páginas internas.
// Hoje só a home tem schema — as 35 páginas de destino e os 27 artigos ficam
// de fora dos rich results do Google.
// Só usa dado que EXISTE na página: título, descrição, imagem, data, canonical.
// Nada de nota de avaliação ou preço inventado.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';

const MESES = {
    'janeiro': '01', 'fevereiro': '02', 'março': '03', 'marco': '03', 'abril': '04',
    'maio': '05', 'junho': '06', 'julho': '07', 'agosto': '08',
    'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12'
};

function parseDataPtBr(txt) {
    // "24 de Julho, 2026" -> "2026-07-24"
    const m = txt.match(/(\d{1,2})\s+de\s+([A-Za-zçÇãÃéÉ]+),?\s+(\d{4})/i);
    if (!m) return null;
    const mes = MESES[m[2].toLowerCase()];
    if (!mes) return null;
    return `${m[3]}-${mes}-${String(m[1]).padStart(2, '0')}`;
}

const PUBLISHER = {
    '@type': 'TravelAgency',
    name: 'Terra Venture Viagens',
    url: base + '/',
    logo: { '@type': 'ImageObject', url: base + '/icon.webp' }
};

const skip = new Set(['index.html', '404.html', 'destinos.html', 'blog.html', 'historia.html', 'transfer-executivo.html']);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !skip.has(f));

let blogN = 0, destN = 0, skipped = [];

for (const f of files) {
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');

    if (/application\/ld\+json/.test(s)) { skipped.push(f + ' (ja tem schema)'); continue; }

    const canonical = (s.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    const desc = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    const h1 = (s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    if (!canonical || !h1) { skipped.push(f + ' (sem canonical/h1)'); continue; }
    const nome = h1.replace(/<[^>]*>/g, '').trim();

    // imagem principal: hero (background-image) ou primeiro <img> de conteudo
    let img = (s.match(/background-image:[^;]*url\('([^']+\.webp)'\)/) || [])[1]
        || (s.match(/article-hero"[^>]*background-image:\s*url\('([^']+\.webp)'\)/) || [])[1]
        || (s.match(/src="([a-zA-Z0-9_.,-]+\.webp)"/) || [])[1];
    const imgAbs = img ? `${base}/${img}` : `${base}/og-image.jpg`;

    let obj;
    if (f.startsWith('blog-')) {
        const dataTxt = (s.match(/far fa-calendar-alt"><\/i>\s*([^<]+)</) || [])[1] || '';
        const iso = parseDataPtBr(dataTxt);
        obj = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: nome,
            description: desc || undefined,
            image: imgAbs,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
            author: { '@type': 'Organization', name: 'Terra Venture Viagens', url: base + '/' },
            publisher: PUBLISHER,
            inLanguage: 'pt-BR'
        };
        if (iso) { obj.datePublished = iso; obj.dateModified = iso; }
        blogN++;
    } else {
        obj = {
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: nome,
            description: desc || undefined,
            image: imgAbs,
            url: canonical,
            inLanguage: 'pt-BR',
            includedInDataCatalog: undefined,
            provider: PUBLISHER
        };
        destN++;
    }

    // remove chaves undefined
    const clean = JSON.parse(JSON.stringify(obj));
    const block = `    <script type="application/ld+json">\n${JSON.stringify(clean, null, 2).split('\n').map(l => '    ' + l).join('\n')}\n    </script>`;

    s = s.replace(/(<link rel="canonical" href="[^"]*">)/, `$1\n${block}`);
    fs.writeFileSync(fp, s, 'utf8');
}

console.log('BlogPosting adicionado:', blogN);
console.log('TouristDestination adicionado:', destN);
if (skipped.length) console.log('pulados:', skipped.length);
