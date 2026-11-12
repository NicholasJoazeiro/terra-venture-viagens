// Conexoes do diario com o resto do site.
//
// 1. "Leia tambem" por TEMA, nao so por etiqueta. A etiqueta ("Dicas para
//    Viajantes") agrupa 20 artigos sem relacao entre si; o tema agrupa o que
//    um leitor realmente le em sequencia.
// 2. "Para ir alem" com tres links (os dois que ja existiam mais o artigo mais
//    proximo) e a saida para /contato.
// 3. Caminho de VOLTA: as paginas de destino, a home e as hubs passam a apontar
//    para os artigos. Antes nenhuma apontava (0 de 35 destinos, 0 de 7 hubs).
//
// Idempotente: pode rodar de novo depois de criar artigos ou de a foto chegar.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* ---------- temas: o que cada artigo e, alem da etiqueta ---------- */
const GRUPOS = {
    'blog-amalfitana-de-barco': ['italia', 'europa', 'mar'],
    'blog-arrumar-mala-inverno': ['frio', 'mala'],
    'blog-aurora-boreal-islandia': ['frio', 'epoca', 'natureza'],
    'blog-balao-capadocia': ['experiencia', 'epoca'],
    'blog-chapada-dos-veadeiros': ['natureza-br', 'trilha', 'mala'],
    'blog-dinheiro-na-viagem': ['logistica'],
    'blog-documentos-para-viajar': ['logistica'],
    'blog-esqui-courchevel': ['frio', 'europa'],
    'blog-expresso-do-oriente': ['experiencia', 'europa'],
    'blog-gastronomia-san-sebastian': ['europa', 'gastronomia'],
    'blog-glamping-atacama': ['experiencia', 'natureza'],
    'blog-japao-tradicao-futuro': ['asia', 'epoca'],
    'blog-lua-de-mel-exclusiva': ['praia', 'romance'],
    'blog-mala-viagem-internacional': ['logistica', 'mala'],
    'blog-malas-safari': ['safari', 'mala'],
    'blog-maldivas-vs-seychelles': ['praia', 'romance'],
    'blog-marrocos-alem-marrakech': ['africa', 'experiencia'],
    'blog-melhor-epoca-viajar': ['epoca'],
    'blog-patagonia-quando-ir': ['epoca', 'trilha', 'natureza', 'frio'],
    'blog-petra-amanhecer': ['experiencia', 'oriente'],
    'blog-primeira-trilha': ['trilha', 'natureza'],
    'blog-quando-algo-da-errado': ['logistica'],
    'blog-retiros-wellness-suica': ['frio', 'bem-estar'],
    'blog-rota-da-seda-uzbequistao': ['asia', 'experiencia'],
    'blog-rota-do-vinho-mendocina': ['vinho', 'gastronomia'],
    'blog-safari-fotografico': ['safari'],
    'blog-seguro-viagem': ['logistica'],
    'blog-slow-travel-europa': ['europa', 'italia'],
    'blog-turismo-sustentavel': ['natureza'],
    'blog-viagem-multigeracional': ['familia', 'logistica'],
    'blog-viajar-com-criancas-pequenas': ['familia', 'logistica'],
    'blog-voos-longos': ['logistica'],
    'blog-passagem-aerea-o-que-conferir': ['logistica'],
    'blog-viajar-sozinho': ['logistica', 'solo'],
    'blog-italia-10-dias-roteiro': ['italia', 'europa'],
    'blog-banff-quando-ir': ['natureza', 'epoca', 'trilha', 'frio'],
    'blog-noronha-como-planejar': ['natureza-br', 'praia', 'epoca'],
    // Sul e Brasil
    'blog-gramado-canela-como-planejar': ['sul', 'serra', 'frio'],
    'blog-vale-dos-vinhedos-bento-goncalves': ['sul', 'serra', 'vinho', 'gastronomia'],
    'blog-canions-aparados-da-serra': ['sul', 'serra', 'natureza-br', 'trilha'],
    'blog-rota-romantica-vale-dos-sinos': ['sul', 'serra'],
    'blog-serra-catarinense-urubici-sao-joaquim': ['sul', 'frio', 'natureza-br'],
    'blog-florianopolis-qual-praia': ['sul', 'praia'],
    'blog-bonito-ms-como-planejar': ['natureza-br', 'epoca'],
    'blog-foz-do-iguacu-cataratas': ['natureza-br', 'logistica'],
    'blog-lencois-maranhenses-quando-ir': ['natureza-br', 'praia', 'epoca'],
};

/* ---------- le os artigos ---------- */
const arts = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.startsWith('blog-') && x.endsWith('.html'))) {
    const t = l.ler(f);
    const slug = f.replace(/\.html$/, '');
    arts.push({
        slug, f,
        titulo: ((t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]*>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(),
        curto: '',
        desc: ((t.match(/<meta name="description"[\s\S]{0,40}?content="([^"]*)"/) || [])[1] || '').replace(/ /g, ' '),
        tag: (t.match(/class="blog-tag">([^<]*)/) || [])[1] || '',
        data: (t.match(/"datePublished":\s*"([^"]+)"/) || [])[1] || '',
        grupos: GRUPOS[slug] || [],
    });
}
for (const a of arts) a.curto = a.titulo.includes(':') ? a.titulo.split(':')[0].trim() : a.titulo;
const semGrupo = arts.filter(a => !GRUPOS[a.slug]).map(a => a.slug);
if (semGrupo.length) console.log('ATENCAO, artigos sem tema definido:', semGrupo.join(', '));
const porSlug = Object.fromEntries(arts.map(a => [a.slug, a]));

function pontos(a, b) {
    const comuns = a.grupos.filter(g => b.grupos.includes(g)).length;
    return comuns * 3 + (a.tag === b.tag ? 1 : 0);
}
function relacionados(a, excluir) {
    return arts.filter(x => x.slug !== a.slug && !excluir.includes(x.slug))
        .map(x => ({ x, p: pontos(a, x), d: Math.abs(Date.parse(x.data) - Date.parse(a.data)) }))
        .sort((u, v) => v.p - u.p || u.d - v.d)
        .map(o => o.x);
}

/* =======================================================================
   1 e 2. "Para ir alem" e "Leia tambem"
   ======================================================================= */
let ajustados = 0;
const citacoes = {};            // pagina -> artigos que apontam para ela no corpo

// Passo 1: decide, em memoria, os links de cada artigo.
const plano = {};
for (const a of arts) {
    const t = fs.readFileSync(path.join(l.DIR, a.f), "utf8");
    // o passo das viuvas troca o espaco depois de palavra curta por nbsp, entao
    // o padrao precisa aceitar os dois
    const m = t.match(/<p class="artigo-links">Para[\s\u00a0]ir[\s\u00a0]além:[\s\u00a0]<a href="([^"]+)">([^<]+)<\/a>(?:,[\s\u00a0]|[\s\u00a0]e[\s\u00a0])<a href="([^"]+)">([^<]+)<\/a>/);
    if (!m) { console.log("  sem artigo-links:", a.slug); continue; }
    const l1 = [m[1], m[2]], l2 = [m[3], m[4]];
    const jaUsados = [l1[0], l2[0]].filter(h => h.startsWith("/blog-")).map(h => h.slice(1));
    const rel = relacionados(a, jaUsados);
    plano[a.slug] = { l1, l2, terceiro: rel[0], leia: rel.slice(1, 4) };
}

// Passo 2: nenhum artigo pode ficar sem ninguem que aponte para ele. Quem ficou
// orfao entra no "Leia tambem" do artigo mais proximo, no lugar do ultimo item.
function entradas() {
    const e = Object.fromEntries(arts.map(a => [a.slug, 0]));
    for (const [slug, pl] of Object.entries(plano)) {
        const alvos = new Set([pl.terceiro.slug, ...pl.leia.map(x => x.slug)]);
        [pl.l1[0], pl.l2[0]].forEach(h => { if (h.startsWith("/blog-")) alvos.add(h.slice(1)); });
        alvos.forEach(x => { if (e[x] !== undefined && x !== slug) e[x]++; });
    }
    return e;
}
let orfaos = arts.filter(a => entradas()[a.slug] === 0);
for (const o of orfaos) {
    const candidatos = arts.filter(x => x.slug !== o.slug && plano[x.slug])
        .map(x => ({ x, p: pontos(x, o) })).sort((u, v) => v.p - u.p);
    const alvo = candidatos[0].x;
    plano[alvo.slug].leia[plano[alvo.slug].leia.length - 1] = o;
    console.log("  orfao resolvido:", o.slug, "<- entra no Leia tambem de", alvo.slug);
}
console.log("orfaos antes:", orfaos.length, "| depois:", arts.filter(a => entradas()[a.slug] === 0).length);

// Passo 3: escreve.
for (const a of arts) {
    const pl = plano[a.slug];
    if (!pl) continue;
    const fp = path.join(l.DIR, a.f);
    let t = fs.readFileSync(fp, "utf8");
    const q = l.quebra(t);

    const PARAGRAFO = '<p class="artigo-links">Para ir além: <a href="' + pl.l1[0] + '">' + pl.l1[1] + '</a>, <a href="' + pl.l2[0] + '">' + pl.l2[1] +
        '</a> e <a href="/' + pl.terceiro.slug + '">o texto “' + pl.terceiro.curto + '”</a>. Ficou com dúvida? <a href="/contato">Fale com a gente</a>.</p>';
    t = t.replace(/<p class="artigo-links">[\s\S]*?<\/p>/, PARAGRAFO);

    const iA = t.indexOf('<aside class="leia-tambem">');
    const fA = t.indexOf("</aside>", iA) + "</aside>".length;
    const ASIDE = ['<aside class="leia-tambem">',
        "                    <h3>Leia também</h3>",
        "                    <ul>",
        ...pl.leia.map(r => '                        <li><a href="/' + r.slug + '">' + r.titulo + "</a></li>"),
        "                    </ul>",
        "                </aside>"].join(q);
    t = t.slice(0, iA) + ASIDE + t.slice(fA);
    fs.writeFileSync(fp, t, "utf8");
    ajustados++;

    const corpo = t.slice(t.indexOf('<div class="article-content">'), t.indexOf('<aside class="leia-tambem">'));
    for (const h of corpo.matchAll(/href="\/([a-z0-9-]+)"/g)) {
        const alvo = h[1];
        if (alvo.startsWith("blog-") || ["servicos", "contato", "melhor-epoca", "destinos", "blog", "cruzeiros", "historia"].includes(alvo)) continue;
        (citacoes[alvo] = citacoes[alvo] || new Set()).add(a.slug);
    }
}
console.log('"Para ir alem" e "Leia tambem" refeitos em', ajustados, "artigos");

/* =======================================================================
   3. caminho de volta
   ======================================================================= */
function cartao(a) {
    return '                <li><a href="/' + a.slug + '"><span class="diario-tag">' + a.tag + '</span><strong>' + a.titulo + '</strong><span class="diario-desc">' + a.desc + '</span></a></li>';
}
function bloco(titulo, intro, lista, extra) {
    return ['    <section class="no-diario">',
        '        <div class="container">',
        '            <h2>' + titulo + '</h2>',
        intro ? '            <p class="no-diario-intro">' + intro + '</p>' : '',
        '            <ul class="diario-lista">',
        ...lista.map(cartao),
        '            </ul>',
        extra || '',
        '        </div>',
        '    </section>', ''].filter(x => x !== '').join('\n');
}
function inserir(arquivo, ancora, html) {
    let t = l.ler(arquivo);
    const q = l.quebra(t);
    // tira o bloco anterior, se ja existir
    while (t.includes('<section class="no-diario"')) {
        const i = t.indexOf('<section class="no-diario"');
        const fim = l.bloco(t, i, 'section');
        const ini = t.lastIndexOf('\n', i) + 1;
        t = t.slice(0, ini) + t.slice(fim).replace(/^\r?\n+/, '');
    }
    const i = t.indexOf(ancora);
    if (i === -1) throw new Error('ancora nao encontrada em ' + arquivo + ': ' + ancora);
    const ini = t.lastIndexOf('\n', i) + 1;
    t = t.slice(0, ini) + html.split('\n').join(q) + q + q + t.slice(ini);
    l.gravar(arquivo, t);
}
const pegar = slugs => slugs.map(s => porSlug[s]).filter(Boolean);

// 3.1 paginas de destino
let dossies = 0;
for (const [dossie, set] of Object.entries(citacoes)) {
    if (!fs.existsSync(path.join(l.DIR, dossie + '.html'))) continue;
    const lista = pegar([...set]).sort((a, b) => b.data.localeCompare(a.data));
    const nome = (l.ler(dossie + '.html').match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    inserir(dossie + '.html', '<footer class="footer">',
        bloco('No diário', lista.length > 1 ? 'Textos do diário que falam deste destino.' : 'Um texto do diário que fala deste destino.', lista.slice(0, 3)));
    dossies++;
}
console.log('paginas de destino com bloco "No diario":', dossies);

// 3.2 hubs
const HUBS = [
    ['servicos.html', '<section class="serv-cta">', 'No diário, antes de viajar',
        'O que mais pesa numa viagem bem resolvida não é o destino, é a parte que ninguém vê. Estes textos cobrem as dúvidas mais comuns.',
        ['blog-documentos-para-viajar', 'blog-seguro-viagem', 'blog-dinheiro-na-viagem', 'blog-passagem-aerea-o-que-conferir', 'blog-quando-algo-da-errado', 'blog-viajar-com-criancas-pequenas']],
    ['melhor-epoca.html', '<footer class="footer">', 'Leia no diário',
        'Textos que aprofundam a escolha da época em alguns destinos.',
        ['blog-melhor-epoca-viajar', 'blog-patagonia-quando-ir', 'blog-banff-quando-ir', 'blog-lencois-maranhenses-quando-ir', 'blog-noronha-como-planejar', 'blog-aurora-boreal-islandia']],
    ['destinos.html', '<footer class="footer">', 'Do diário: Sul e resto do Brasil',
        'Os dossiês desta página são de fora do país. Estes textos são sobre o que há de melhor mais perto de casa.',
        arts.filter(a => a.categoria === undefined && a.grupos.includes('sul') || ['blog-bonito-ms-como-planejar', 'blog-foz-do-iguacu-cataratas', 'blog-lencois-maranhenses-quando-ir', 'blog-noronha-como-planejar', 'blog-chapada-dos-veadeiros'].includes(a.slug)).map(a => a.slug)],
    ['cruzeiros.html', '<section class="serv-cta">', 'Leia antes de embarcar',
        'Cruzeiro é viagem com documento, seguro e dinheiro como qualquer outra. Estes textos ajudam a não deixar nada para a véspera.',
        ['blog-documentos-para-viajar', 'blog-seguro-viagem', 'blog-dinheiro-na-viagem']],
];
for (const [arq, ancora, titulo, intro, slugs] of HUBS) {
    inserir(arq, ancora, bloco(titulo, intro, pegar(slugs)));
    console.log(arq.padEnd(18), 'bloco do diario:', pegar(slugs).length, 'artigos');
}

// 3.3 home
{
    const lista = pegar(['blog-gramado-canela-como-planejar', 'blog-documentos-para-viajar', 'blog-melhor-epoca-viajar']);
    inserir('index.html', '<section class="faq-section" id="faq">',
        bloco('Do diário', 'Textos escritos pelo Nicholas sobre planejar, escolher a época e o que olhar antes de viajar.', lista,
            '            <p class="diario-todos"><a href="/blog">Ver todos os artigos do diário</a></p>'));
    console.log('index.html: bloco "Do diario" com', lista.length, 'artigos');
}

/* =======================================================================
   CSS
   ======================================================================= */
{
    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    if (!c.includes('.no-diario')) {
        c += (s => s.split('\n').join(QB))(`

/* ======================= O DIARIO NO RESTO DO SITE ======================= */
.no-diario { padding: 80px 0; background: var(--bone); }
.no-diario h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(1.6rem, 3vw, 2.3rem); color: var(--moss); text-align: left; }
.no-diario-intro { margin-top: 10px; max-width: 60ch; color: var(--espresso-soft); line-height: 1.65; text-wrap: pretty; }
.diario-lista { list-style: none; margin: 34px 0 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 26px 34px; }
.diario-lista a { display: flex; flex-direction: column; gap: 8px; height: 100%; border-top: 1px solid rgba(42, 35, 27, 0.2); padding-top: 16px; color: inherit; }
.diario-tag { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; color: var(--terra-texto); }
.diario-lista strong { font-family: var(--serif); font-weight: 400; font-size: 1.2rem; line-height: 1.3; color: var(--moss); }
.diario-lista a:hover strong { text-decoration: underline; text-decoration-color: rgba(62, 90, 68, 0.4); text-underline-offset: 4px; }
.diario-desc { font-size: 0.92rem; line-height: 1.6; color: var(--espresso-soft); text-wrap: pretty; }
.diario-todos { margin-top: 30px; }
.diario-todos a { color: var(--espresso); border-bottom: 1px solid rgba(42, 35, 27, 0.35); padding-bottom: 3px; font-size: 0.95rem; }
.diario-todos a:hover { border-color: var(--terra-deep); }
@media (max-width: 760px) { .no-diario { padding: 56px 0; } }
`);
        fs.writeFileSync(cp, c, 'utf8');
        const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
        console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
    }
}
