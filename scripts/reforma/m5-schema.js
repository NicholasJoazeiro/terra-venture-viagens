// Schema: TravelAgency da home e BreadcrumbList nos artigos e destinos.
//
// Sem aggregateRating, por decisao do Nicholas: avaliacao declarada pela
// propria empresa nao gera rich result e pode ser penalizada.
// Sem endereco de rua: so a localidade.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const BASE = 'https://terraventureviagens.com.br';

/* =======================================================================
   1. TravelAgency da home
   ======================================================================= */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    const i = t.indexOf('"@type": "TravelAgency"');
    if (i === -1) { console.error('FALHA: schema da home'); process.exit(1); }
    const ini = t.lastIndexOf('<script type="application/ld+json">', i);
    const fim = t.indexOf('</script>', i) + '</script>'.length;

    const NOVO = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": "${BASE}/#organizacao",
      "name": "Terra Venture Viagens",
      "legalName": "Terra Venture Agência de Viagens Ltda",
      "url": "${BASE}/",
      "logo": "${BASE}/icon.webp",
      "image": "${BASE}/og-image.jpg",
      "telephone": "+5551994596233",
      "email": "contato@terraventureviagens.com.br",
      "foundingDate": "2025-11",
      "taxID": "63.865.418/0001-81",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ivoti",
        "addressRegion": "RS",
        "addressCountry": "BR"
      },
      "areaServed": { "@type": "Country", "name": "Brasil" },
      "description": "Consultoria de viagem sob medida e cruzeiros, de Ivoti, RS, para clientes de todo o Brasil.",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00", "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:30", "closes": "12:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/terraventureviagens/",
        "https://www.facebook.com/terraventureviagens",
        "https://maps.app.goo.gl/fRx9mZDwVB4Kp1466"
      ]
    }
    </script>`;
    t = t.slice(0, ini) + cr(NOVO) + t.slice(fim);
    l.gravar('index.html', t);
    console.log('TravelAgency da home: dominio canonico, URLs absolutas, horario e sameAs');
}

/* =======================================================================
   2. @id e url com www nas outras paginas
   ======================================================================= */
{
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        const o = t;
        t = t.split('https://www.terraventureviagens.com.br').join(BASE);
        if (t !== o) { fs.writeFileSync(fp, t, 'utf8'); n++; }
    }
    console.log('paginas com www trocado pelo dominio canonico:', n);
}

/* =======================================================================
   3. BreadcrumbList em artigos e destinos
   ======================================================================= */
{
    const NOME_SECAO = { blog: ['Diário', '/blog'], destino: ['Destinos', '/destinos'] };
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        if (t.includes('BreadcrumbList')) continue;

        const ehArtigo = f.startsWith('blog-');
        const ehDestino = /"@type":\s*"TouristDestination"/.test(t);
        if (!ehArtigo && !ehDestino) continue;

        const [secao, rota] = NOME_SECAO[ehArtigo ? 'blog' : 'destino'];
        const h1 = (t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
        if (!h1) continue;
        const titulo = h1.replace(/<[^>]+>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim().replace(/"/g, '\\"');
        const url = BASE + '/' + f.replace(/\.html$/, '');
        const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

        const BC = ['    <script type="application/ld+json">',
            '    {',
            '      "@context": "https://schema.org",',
            '      "@type": "BreadcrumbList",',
            '      "itemListElement": [',
            `        { "@type": "ListItem", "position": 1, "name": "Início", "item": "${BASE}/" },`,
            `        { "@type": "ListItem", "position": 2, "name": "${secao}", "item": "${BASE}${rota}" },`,
            `        { "@type": "ListItem", "position": 3, "name": "${titulo}", "item": "${url}" }`,
            '      ]',
            '    }',
            '    </script>', ''].join(q);

        const ANC = '</head>';
        if (!t.includes(ANC)) continue;
        t = t.replace(ANC, BC + ANC);
        fs.writeFileSync(fp, t, 'utf8');
        n++;
    }
    console.log('paginas com BreadcrumbList:', n);
}

/* ---------- conferencia: todo JSON-LD continua valido ---------- */
{
    let erros = 0, blocos = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const t = l.ler(f);
        for (const m of t.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
            blocos++;
            try { JSON.parse(m[1]); } catch (e) { console.log('  JSON invalido em', f, ':', e.message.slice(0, 70)); erros++; }
        }
    }
    console.log('blocos JSON-LD:', blocos, '| invalidos:', erros);
    if (erros) process.exit(1);
}
