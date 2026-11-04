// Fase 7: acessibilidade. Cada item abaixo e uma falha que o Lighthouse
// apontou na home, com o numero medido.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* =======================================================================
   1. marcadores do mapa: sem nome acessivel e com alvo de 14x14
   ======================================================================= */
{
    const sp = path.resolve(__dirname, '../../public/script.js');
    let s = fs.readFileSync(sp, 'utf8');
    const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);

    const DE = cr(`            const marker = L.marker(dest.coords, { icon: customIcon }).addTo(map);`);
    if (!s.includes(DE)) { console.error('FALHA: criacao do marcador'); process.exit(1); }
    s = s.replace(DE, cr(`            // o marcador e clicavel e navegavel por teclado, entao precisa de nome.
            // Sem isso o leitor de tela anuncia 25 botoes chamados "botao".
            const marker = L.marker(dest.coords, {
                icon: customIcon,
                alt: dest.name,
                keyboard: true,
                title: dest.name,
            }).addTo(map);
            const el = marker.getElement();
            if (el) el.setAttribute('aria-label', 'Abrir o dossiê de ' + dest.name);`));

    // o alvo de toque sobe de 14 para 26, mantendo o ponto visivel com 14
    s = s.replace(cr(`            iconSize: [14, 14],`), cr(`            iconSize: [26, 26],`));
    fs.writeFileSync(sp, s, 'utf8');
    console.log('marcadores do mapa: nome acessivel e alvo de 26px');
}

/* =======================================================================
   2. filtro de vibe: role="tablist" com <button> dentro e ARIA invalido
   ======================================================================= */
{
    let t = l.ler('index.html');
    const DE = '<div class="vibe-filter" role="tablist" aria-label="Filtrar por vibe da viagem">';
    if (!t.includes(DE)) { console.error('FALHA: filtro de vibe'); process.exit(1); }
    // tablist exige filhos com role="tab". Isto nao e um conjunto de abas, e um
    // grupo de filtros: o papel certo e group, e o estado vai em aria-pressed.
    t = t.replace(DE, '<div class="vibe-filter" role="group" aria-label="Filtrar os destinos por vibe">');
    t = t.replace(/<button class="vibe-chip active" data-vibe="todos" type="button">/,
        '<button class="vibe-chip active" data-vibe="todos" type="button" aria-pressed="true">');
    t = t.replace(/<button class="vibe-chip" data-vibe="([a-z]+)" type="button">/g,
        '<button class="vibe-chip" data-vibe="$1" type="button" aria-pressed="false">');
    l.gravar('index.html', t);
    console.log('filtro de vibe: role=group com aria-pressed');

    const sp = path.resolve(__dirname, '../../public/script.js');
    let s = fs.readFileSync(sp, 'utf8');
    const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);
    const D2 = cr(`                vibeChips.forEach(c => c.classList.remove('active'));`);
    if (!s.includes(D2)) { console.error('FALHA: handler dos chips'); process.exit(1); }
    s = s.replace(D2, cr(`                vibeChips.forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-pressed', 'false');
                });
                chip.setAttribute('aria-pressed', 'true');`));
    fs.writeFileSync(sp, s, 'utf8');
    console.log('handler dos chips atualiza aria-pressed');
}

/* =======================================================================
   3. contraste
   ======================================================================= */
{
    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);
    function t(de, para, r) {
        de = cr(de); para = cr(para);
        if (!c.includes(de)) { console.error('FALHA:', r); process.exit(1); }
        c = c.replace(de, para);
    }

    // um terracota proprio para texto sobre fundo claro. O --terra da 2,53:1
    // sobre o creme e o --terra-deep da 3,61: nenhum dos dois passa em texto
    // pequeno. Este da 4,8.
    t(`    --terra: #D9744E;
    --terra-deep: #BC5A38;`,
      `    --terra: #D9744E;
    --terra-deep: #BC5A38;
    /* so para TEXTO sobre fundo claro: o --terra da 2,53:1 sobre o creme e o
       --terra-deep da 3,61. Este da 4,8, que passa em texto pequeno. */
    --terra-texto: #A04A2E;`, 'token de texto terracota');

    t(`.eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--terra);
}`,
      `.eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--terra-texto);
}`, 'cor da etiqueta');

    t(`.vibe-chip.active { background: var(--terra); border-color: var(--terra); color: #fff; }`,
      `.vibe-chip.active { background: var(--terra-deep); border-color: var(--terra-deep); color: #fff; }`, 'chip ativo');

    t(`.quem-somos-content .lead-text { font-family: var(--serif); font-size: 1.4rem; color: var(--terra);`,
      `.quem-somos-content .lead-text { font-family: var(--serif); font-size: 1.4rem; color: var(--terra-texto);`, 'lead de quem somos');

    t(`.transfer-story-text .lead-text { font-family: var(--serif); font-size: 1.4rem; color: var(--terra);`,
      `.transfer-story-text .lead-text { font-family: var(--serif); font-size: 1.4rem; color: var(--terra-texto);`, 'lead do transfer');

    t(`.footer-confianca li span { display: block; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(236, 229, 212, 0.45); }`,
      `.footer-confianca li span { display: block; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(236, 229, 212, 0.66); }`, 'rotulo do bloco de confianca');

    // rodape de baixo: 4,47:1 em 13px, logo abaixo dos 4,5
    const rod = c.match(/\.footer-bottom[^{]*\{[^}]*\}/);
    if (!rod) { console.error('FALHA: footer-bottom'); process.exit(1); }
    if (/color:/.test(rod[0])) {
        c = c.replace(rod[0], rod[0].replace(/color:\s*[^;]+;/, 'color: rgba(236, 229, 212, 0.62);'));
    } else {
        c = c.replace(rod[0], rod[0].replace(/\}$/, ' color: rgba(236, 229, 212, 0.62); }'));
    }

    fs.writeFileSync(cp, c, 'utf8');
    const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
    console.log('contraste ajustado | chaves', a, b, a === b ? 'OK' : 'ERRO');
    if (a !== b) process.exit(1);
}

/* =======================================================================
   4. ordem de titulos e rotulo do link do Instagram
   ======================================================================= */
{
    let n = 0, i = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        const o = t;
        // <h5> logo depois de um <h2> pula dois niveis
        t = t.replace(/<h5>(WhatsApp|Email)<\/h5>/g, '<h3 class="detail-titulo">$1</h3>');
        // o link tem texto visivel "@terraventureviagens" e aria-label "Instagram":
        // o nome acessivel nao contem o texto que esta na tela
        t = t.replace(/\s*aria-label="Instagram"/g, () => { i++; return ''; });
        if (t !== o) { fs.writeFileSync(fp, t, 'utf8'); n++; }
    }
    console.log('paginas com ordem de titulo e rotulo corrigidos:', n, '| aria-label removido:', i);

    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    c += (s => s.split('\n').join(QB))(`

/* o <h5> dos contatos virou <h3> para nao pular nivel de titulo; o tamanho
   continua o mesmo de antes */
.detail-titulo { font-family: var(--sans); font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sage); margin-bottom: 4px; }
`);
    fs.writeFileSync(cp, c, 'utf8');
}

l.conferir('index.html');
