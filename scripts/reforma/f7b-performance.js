// Fase 7: desempenho.
//
// O LCP de 9,0s no celular vinha de tres coisas: a foto do hero era servida em
// 1800px para todo mundo (ja resolvido na fase 1, com srcset), e duas folhas de
// estilo de terceiros bloqueando a renderizacao antes de qualquer pixel
// aparecer: Font Awesome (102 KB, em 75 paginas) e Leaflet (15 KB, so na home).
//
// Nenhuma das duas precisa bloquear. Carregam com media="print" e trocam para
// "all" no onload, que e a forma padrao de tirar uma folha do caminho critico.
// O <noscript> cobre quem roda sem JS: nesse caso ela volta a ser bloqueante,
// que e o certo, porque sem JS o onload nunca dispara.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const FA_ANTES = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';
const FA_DEPOIS = [
    '<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>',
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media=\'all\';this.onload=null">',
    '<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>',
].join('\n    ');

const LEAFLET_ANTES = '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />';
const LEAFLET_DEPOIS = [
    '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" media="print" onload="this.media=\'all\';this.onload=null" />',
    '<noscript><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" /></noscript>',
].join('\n    ');

let fa = 0, leaflet = 0, defer = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const o = t;
    const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

    if (t.includes(FA_ANTES)) { t = t.replace(FA_ANTES, FA_DEPOIS.split('\n').join(q)); fa++; }
    if (t.includes(LEAFLET_ANTES)) { t = t.replace(LEAFLET_ANTES, LEAFLET_DEPOIS.split('\n').join(q)); leaflet++; }
    // o leaflet.js esta no fim do body, mas sem defer ele ainda executa antes
    // do parse terminar de assentar
    if (t.includes('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>')) {
        t = t.replace('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>',
            '<script defer src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>');
        defer++;
    }
    if (t !== o) fs.writeFileSync(fp, t, 'utf8');
}
console.log('font awesome fora do caminho critico:', fa, 'paginas');
console.log('leaflet css fora do caminho critico:', leaflet, '| leaflet js com defer:', defer);

/* ---------- preload da imagem do hero da home ---------- */
{
    let t = l.ler('index.html');
    if (!t.includes('rel="preload" as="image"')) {
        const q = l.quebra(t);
        const ANCORA = '    <!-- Estilo Terra Venture -->';
        if (!t.includes(ANCORA)) { console.error('FALHA: ancora do css'); process.exit(1); }
        const PRELOAD = [
            '<!-- O hero e o LCP da home. Dois preloads com media para o navegador',
            '         pedir o recorte certo antes de descobrir a <picture>. -->',
            '    <link rel="preload" as="image" media="(max-width: 700px)" href="hero-lago-molveno-vertical.webp" fetchpriority="high">',
            '    <link rel="preload" as="image" media="(min-width: 701px)"',
            '          imagesrcset="hero-lago-molveno-800.webp 800w, hero-lago-molveno-1600.webp 1600w, hero-lago-molveno.webp 1800w"',
            '          imagesizes="100vw" href="hero-lago-molveno-1600.webp" fetchpriority="high">',
            '',
        ].join('\n    ');
        t = t.replace(ANCORA, '    ' + PRELOAD.split('\n').join(q) + ANCORA);
        l.gravar('index.html', t);
        console.log('preload do hero adicionado');
    }
}

/* ---------- preload da imagem de abertura das subpaginas ---------- */
{
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        if (t.includes('rel="preload" as="image"')) continue;
        const m = t.match(/<img[^>]*src="([^"]+\.webp)"[^>]*fetchpriority="high"/);
        if (!m) continue;
        const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
        const ANCORA = '    <!-- Estilo Terra Venture -->';
        if (!t.includes(ANCORA)) continue;
        t = t.replace(ANCORA,
            '    <link rel="preload" as="image" href="' + m[1] + '" fetchpriority="high">' + q + q + ANCORA);
        fs.writeFileSync(fp, t, 'utf8');
        n++;
    }
    console.log('subpaginas com preload da abertura:', n);
}
