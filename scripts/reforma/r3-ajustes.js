// Terceira rodada.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* =======================================================================
   1. colagem: seis quadrados iguais, zero recorte
   =======================================================================
   As celas tinham formatos diferentes (2x2, 1x2, 1x1) e as fotos de cliente
   sao todas quadradas, ja enquadradas no rosto. Qualquer cela que nao fosse
   quadrada cortava cabeca. Com cela quadrada e foto quadrada nao sobra nada
   para cortar. */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    // a Michele volta para o recorte quadrado: a cela deixou de ser larga
    const DE = `                    <!-- cela larga: o recorte quadrado cortava o rosto dos dois -->
                    <img width="1080" height="591" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres-larga.webp" alt="Michele e Daniel em frente ao Moulin Rouge, em Paris">`;
    if (!t.includes(cr(DE))) { console.error('FALHA: Michele na colagem'); process.exit(1); }
    t = t.replace(cr(DE), cr(`                    <img width="800" height="800" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres.webp" alt="Michele e Daniel em frente ao Moulin Rouge, em Paris">`));
    l.gravar('index.html', t);
    console.log('colagem: Michele volta ao recorte quadrado');
}

/* =======================================================================
   2. abertura da pagina Melhor Epoca
   ======================================================================= */
{
    let m = l.ler('melhor-epoca.html');
    const cr = l.crlf(m);
    if (m.includes('epoca-hero-bg')) { console.error('ja aplicado'); process.exit(1); }
    const DE = `    <section class="epoca-hero">
        <div class="container">`;
    if (!m.includes(cr(DE))) { console.error('FALHA: abertura de melhor-epoca'); process.exit(1); }
    m = m.replace(cr(DE), cr(`    <section class="epoca-hero">
        <div class="epoca-hero-bg"><img width="1400" height="933" src="dest_alpes.webp" alt="O Matterhorn refletido num lago alpino de águas paradas, com pedras na margem em primeiro plano" loading="eager" fetchpriority="high" decoding="async"></div>
        <div class="container">`));
    // preload da abertura, como nas outras paginas
    const ANC = '    <!-- Estilo Terra Venture -->';
    if (m.includes(ANC) && !m.includes('rel="preload" as="image"')) {
        const q = l.quebra(m);
        m = m.replace(ANC, '    <link rel="preload" as="image" href="dest_alpes.webp" fetchpriority="high">' + q + q + ANC);
    }
    l.gravar('melhor-epoca.html', m);
    console.log('melhor-epoca: abertura com foto');
}

/* =======================================================================
   3. CSS
   ======================================================================= */
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const crc = s => s.split('\n').join(QB);
function tc(de, para, rotulo) {
    const d = crc(de), p = crc(para);
    if (!c.includes(d)) { console.error('FALHA (css):', rotulo); process.exit(1); }
    c = c.replace(d, p);
}

tc(`.comunidade-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 152px; gap: 14px; margin-top: 50px; }
.comunidade-item { position: relative; margin: 0; border-radius: 10px; overflow: hidden; }
.comunidade-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
.comunidade-item:hover img { transform: scale(1.06); }
.comunidade-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.comunidade-item:nth-child(2) { grid-column: span 1; grid-row: span 2; }
.comunidade-item:nth-child(3) { grid-column: span 1; grid-row: span 1; }
.comunidade-item:nth-child(4) { grid-column: span 1; grid-row: span 1; }
.comunidade-item:nth-child(5) { grid-column: span 2; grid-row: span 2; }
.comunidade-item:nth-child(6) { grid-column: span 2; grid-row: span 2; }`,
`/* Celas de formatos diferentes cortavam cabeca: as fotos de cliente sao todas
   quadradas e ja enquadradas no rosto, entao qualquer cela que nao fosse
   quadrada comia alguem. Cela quadrada e foto quadrada: nada a cortar. */
.comunidade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 50px; }
.comunidade-item { position: relative; margin: 0; border-radius: 10px; overflow: hidden; aspect-ratio: 1 / 1; }
.comunidade-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
.comunidade-item:hover img { transform: scale(1.06); }`, 'colagem em quadrados');

// o bloco de celular ja empilha em 2 colunas; so limpa o que sobrou
tc(`    /* Em duas colunas os spans 2x2 nao fecham e sobram buracos. No celular as
       seis fotos viram seis quadrados iguais, tres linhas cheias. */
    .comunidade-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: auto; }
    .comunidade-item,
    .comunidade-item:nth-child(1), .comunidade-item:nth-child(2),
    .comunidade-item:nth-child(3), .comunidade-item:nth-child(4),
    .comunidade-item:nth-child(5), .comunidade-item:nth-child(6) {
        grid-column: span 1; grid-row: span 1; aspect-ratio: 1 / 1;
    }`,
`    .comunidade-grid { grid-template-columns: repeat(2, 1fr); }`, 'colagem no celular');

// abertura da Melhor Epoca com foto
tc(`.epoca-hero {
    background: var(--ink);
    color: var(--bone);
    padding: 170px 0 70px;
    text-align: center;
}`,
`.epoca-hero {
    position: relative; isolation: isolate; overflow: hidden;
    background: var(--ink);
    color: var(--bone);
    padding: 170px 0 70px;
    text-align: center;
}
.epoca-hero-bg { position: absolute; inset: 0; z-index: -2; }
.epoca-hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 58%; }
.epoca-hero::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background:
        radial-gradient(64% 82% at 50% 46%, rgba(13, 24, 32, 0.72) 0%, rgba(13, 24, 32, 0.34) 56%, rgba(13, 24, 32, 0.06) 90%),
        linear-gradient(180deg, rgba(13, 24, 32, 0.46) 0%, rgba(13, 24, 32, 0.08) 30%, rgba(13, 24, 32, 0.08) 68%, rgba(26, 38, 33, 0.72) 100%);
}`, 'abertura da melhor epoca');

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
l.conferir('index.html');
l.conferir('melhor-epoca.html');
