// Montagem de um artigo do diario a partir de um artigo existente.
//
// Se o arquivo da foto nao existir em public/, o artigo sai sem foto, com uma
// abertura tipografica, e o og:image cai na imagem padrao. Assim o conteudo
// pode ser escrito e revisado antes de a foto chegar; quando ela chegar,
// rodar o gerador de novo troca tudo sozinho.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const BASE = 'https://terraventureviagens.com.br';
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const humana = iso => { const [a, m, d] = iso.split('-'); return `${parseInt(d, 10)} de ${MESES[parseInt(m, 10) - 1]}, ${a}`; };
const barras = iso => iso.split('-').reverse().join('/');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const WA = (msg) => 'https://wa.me/5551994596233?text=' + encodeURIComponent('Olá, Nicholas e Giovana! ' + msg);

const temFoto = a => !!a.img && fs.existsSync(path.join(l.DIR, a.img));

function montar(a, dataIso) {
    const molde = l.ler('blog-voos-longos.html');
    const q = l.quebra(molde);
    const cr = l.crlf(molde);
    let h = molde;
    const url = BASE + '/' + a.slug;
    const foto = temFoto(a);
    const imgAbs = foto ? BASE + '/' + a.img : BASE + '/og-image.jpg';

    h = h.replace(/<title>[^<]*<\/title>/, '<title>' + a.tituloPagina + '</title>');
    h = h.replace(/(<link rel="canonical" href=")[^"]*"/, '$1' + url + '"');
    h = h.replace(/(<meta property="og:url" content=")[^"]*"/, '$1' + url + '"');
    h = h.replace(/(<meta property="og:title" content=")[^"]*"/, '$1' + a.tituloPagina + '"');
    h = h.replace(/(<meta name="twitter:title" content=")[^"]*"/, '$1' + a.tituloPagina + '"');
    h = h.replace(/(<meta property="og:description" content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta name="twitter:description" content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta name="description"[\s\S]{0,40}?content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta property="og:image" content=")[^"]*"/, '$1' + imgAbs + '"');
    h = h.replace(/(<meta name="twitter:image" content=")[^"]*"/, '$1' + imgAbs + '"');

    const POST = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(a.h1)},
      "description": ${JSON.stringify(a.desc)},
      "image": "${imgAbs}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },
      "author": { "@type": "Person", "name": "Nicholas Joazeiro", "url": "${BASE}/historia" },
      "publisher": {
        "@type": "TravelAgency",
        "name": "Terra Venture Viagens",
        "url": "${BASE}/",
        "logo": { "@type": "ImageObject", "url": "${BASE}/icon.webp" }
      },
      "inLanguage": "pt-BR",
      "datePublished": "${dataIso}",
      "dateModified": "${dataIso}"
    }
    </script>`;
    const BC = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "${BASE}/" },
        { "@type": "ListItem", "position": 2, "name": "Diário", "item": "${BASE}/blog" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(a.h1)}, "item": "${url}" }
      ]
    }
    </script>`;
    h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (m) => {
        if (m.includes('"BlogPosting"')) return cr(POST);
        if (m.includes('"BreadcrumbList"')) return cr(BC);
        return m;
    });

    const msgBase = 'Li o artigo "' + a.h1 + '" e gostaria de uma consultoria de viagem.';
    h = h.replace(/href="https:\/\/wa\.me\/5551994596233[^"]*"/g, 'href="' + WA(msgBase) + '"');

    const iHero = h.indexOf('<section class="article-hero"');
    const iBody = h.indexOf('<section class="article-body"');
    if (iHero === -1 || iBody === -1) throw new Error('molde sem hero ou body');
    const fimBody = l.bloco(h, iBody, 'section');
    const iniLinha = h.lastIndexOf('\n', iHero) + 1;

    const miolo = a.corpo.map(([t, x]) => t === 'h2' ? '                <h2>' + x + '</h2>' : '                <p>' + x + '</p>').join(q);
    const heroAbre = foto
        ? `<section class="article-hero" style="background-image: url('${a.img}');">`
        : '<section class="article-hero article-hero-sem-foto">';
    const SECOES = `    ${heroAbre}
        <div class="container article-hero-content">
            <span class="blog-tag">${a.tag}</span>
            <h1>${a.h1}</h1>
            <div class="article-meta article-byline">
                <span>Por <strong>Nicholas Joazeiro</strong></span>
                <span>Publicado em <time datetime="${dataIso}">${barras(dataIso)}</time></span>
            </div>
        </div>
    </section>

    <section class="article-body">
        <div class="container">
            <div class="blog-breadcrumb">
                <a href="/">Home</a> <i class="fas fa-chevron-right"></i> <a href="/blog">Blog</a>
            </div>
            <div class="article-content">
                <p class="lead-text">${a.lead}</p>
${miolo}
                <div class="article-cta" style="margin-top: 50px;">
                    <h3>${a.cta[0]}</h3>
                    <p>${a.cta[1]}</p>
                    <a href="${WA(a.cta[2])}" class="btn-primary btn-large" target="_blank" rel="noopener">${a.cta[3]}</a>
                </div>
                <p class="artigo-links">Para ir além: <a href="${a.links[0][0]}">${a.links[0][1]}</a> e <a href="${a.links[1][0]}">${a.links[1][1]}</a>.</p>
                <aside class="leia-tambem">
                    <h3>Leia também</h3>
                    <ul>
                        <li><a href="/blog">Ver todos os artigos</a></li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>`;
    return h.slice(0, iniLinha) + cr(SECOES) + h.slice(fimBody);
}

// card da listagem; sem foto, entra um bloco tipografico no lugar da imagem
function card(a, dataIso, q) {
    const cr = s => s.split('\n').join(q);
    const imgBloco = temFoto(a)
        ? `<div class="blog-card-img">
                        <img width="${a.imgW}" height="${a.imgH}" loading="lazy" decoding="async" src="${a.img}" alt="${esc(a.alt)}">
                        <span class="blog-tag">${a.tag}</span>
                    </div>`
        : `<div class="blog-card-img blog-card-img-vazio">
                        <span class="blog-card-img-nome">${a.local || ''}</span>
                        <span class="blog-tag">${a.tag}</span>
                    </div>`;
    return cr(`                <a href="/${a.slug}" class="blog-card" data-category="${a.categoria}">
                    ${imgBloco}
                    <div class="blog-card-body">
                        <span class="blog-card-date"><i class="far fa-calendar-alt"></i> ${humana(dataIso)}</span>
                        <h3>${a.h1}</h3>
                        <p>${a.card}</p>
                        <span class="blog-read-more">Leia mais <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`);
}

module.exports = { montar, card, temFoto, humana, barras, esc, WA, BASE };
