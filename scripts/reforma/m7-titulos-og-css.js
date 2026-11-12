// Titulos encurtados, og:image por pagina e o CSS do que entrou no blog.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const BASE = 'https://terraventureviagens.com.br';

/* =======================================================================
   1. titulos acima de 60 caracteres
   =======================================================================
   Regra: o sufixo encolhe de " | Blog Terra Venture" para " | Terra Venture".
   Se ainda passar de 60, corta no dois-pontos quando a primeira parte tem
   corpo, senao corta em limite de palavra. Encurtar titulo e trabalho
   editorial, entao sai a lista de antes e depois para o Nicholas vetar o que
   nao gostar. */
{
    const SUF = ' | Terra Venture';
    const LIM = 60;
    const mudancas = [];
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        const m = t.match(/<title>([^<]*)<\/title>/);
        if (!m) continue;
        const antes = m[1];
        if (antes.length <= LIM) continue;

        let cabeca = antes.split(' | ')[0].trim();
        let novo = cabeca + SUF;
        if (novo.length > LIM) {
            const dp = cabeca.indexOf(':');
            if (dp >= 18 && dp + SUF.length <= LIM) {
                cabeca = cabeca.slice(0, dp).trim();
            } else {
                const max = LIM - SUF.length;
                cabeca = cabeca.slice(0, max);
                cabeca = cabeca.slice(0, cabeca.lastIndexOf(' ')).replace(/[,:;.\-–—]$/, '').trim();
            }
            novo = cabeca + SUF;
        }
        if (novo === antes) continue;
        t = t.replace('<title>' + antes + '</title>', '<title>' + novo + '</title>');
        fs.writeFileSync(fp, t, 'utf8');
        mudancas.push([f, antes.length, antes, novo.length, novo]);
    }
    console.log('titulos encurtados:', mudancas.length);
    mudancas.slice(0, 32).forEach(x => console.log('   ' + String(x[1]).padStart(3) + ' -> ' + String(x[3]).padStart(2) + '  ' + x[4]));
    const ainda = [];
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const m = l.ler(f).match(/<title>([^<]*)<\/title>/);
        if (m && m[1].length > LIM) ainda.push(f + ' (' + m[1].length + ')');
    }
    console.log('ainda acima de 60:', ainda.length ? ainda.join(', ') : 'nenhum');
}

/* =======================================================================
   2. og:image por pagina
   =======================================================================
   As 76 paginas compartilhavam a mesma og-image.jpg. Cada destino e cada
   artigo ja declaram a propria imagem no schema; e so usar. */
{
    let n = 0;
    const PADRAO = BASE + '/og-image.jpg';
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        if (!t.includes('content="' + PADRAO + '"')) continue;

        // imagem declarada no schema do proprio conteudo
        let img = null;
        const doSchema = [...t.matchAll(/"@type":\s*"(?:BlogPosting|TouristDestination)"[\s\S]{0,600}?"image":\s*"([^"]+)"/g)];
        if (doSchema.length) img = doSchema[0][1];
        if (!img) {
            const hero = t.match(/page-hero-bg"><img[^>]*src="([^"]+\.webp)"/);
            if (hero) img = BASE + '/' + hero[1];
        }
        if (!img || !/^https?:/.test(img)) continue;
        if (img === PADRAO) continue;
        // so vale se o arquivo existir mesmo
        const local = img.replace(BASE + '/', '');
        if (!fs.existsSync(path.join(l.DIR, local))) continue;

        t = t.split('content="' + PADRAO + '"').join('content="' + img + '"');
        fs.writeFileSync(fp, t, 'utf8');
        n++;
    }
    console.log('paginas com og:image proprio:', n);
    const restam = fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))
        .filter(f => l.ler(f).includes('content="' + PADRAO + '"')).length;
    console.log('paginas ainda na imagem padrao:', restam);
}

/* =======================================================================
   3. meta description da home com a cidade
   ======================================================================= */
{
    let t = l.ler('index.html');
    const m = t.match(/<meta name="description" content="([^"]*)"/);
    if (m && !/Ivoti/.test(m[1])) {
        const nova = 'Consultoria de viagem sob medida, de Ivoti, RS, para clientes de todo o Brasil. Roteiros desenhados um por vez, cruzeiros e suporte no WhatsApp durante a viagem.';
        t = t.replace(m[0], '<meta name="description" content="' + nova + '"');
        l.gravar('index.html', t);
        console.log('description da home (' + nova.length + ' caracteres): cita Ivoti, RS');
    } else {
        console.log('description da home: ja cita Ivoti');
    }
}

/* =======================================================================
   4. CSS do que entrou no blog
   ======================================================================= */
{
    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    if (c.includes('.leia-tambem')) { console.log('css do blog ja aplicado'); }
    else {
        c += (s => s.split('\n').join(QB))(`

/* ======================= ARTIGO: ASSINATURA, LINKS E LEIA TAMBEM ======================= */
.article-byline { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 22px; font-size: 0.88rem; }
.article-byline strong { font-weight: 600; }

/* dois links internos, com ancora que diz para onde vai */
.artigo-links {
    margin: 26px 0 0; padding: 16px 20px; border-left: 3px solid var(--terra-deep);
    background: var(--bone); border-radius: 0 8px 8px 0;
    font-size: 0.95rem; color: var(--espresso-soft);
}
.artigo-links a { color: var(--terra-texto); border-bottom: 1px solid rgba(160, 74, 46, 0.35); }
.artigo-links a:hover { border-color: var(--terra-texto); }

.leia-tambem { margin-top: 44px; padding-top: 26px; border-top: 1px solid var(--line-light); }
.leia-tambem h3 {
    font-family: var(--sans); font-size: 0.74rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--espresso-soft); margin-bottom: 16px;
}
.leia-tambem ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.leia-tambem a {
    font-family: var(--serif); font-size: 1.08rem; color: var(--moss); line-height: 1.4;
    border-bottom: 1px solid transparent; transition: border-color 0.3s;
}
.leia-tambem a:hover { border-color: var(--moss); }
`);
        fs.writeFileSync(cp, c, 'utf8');
        const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
        console.log('css do blog | chaves', a, b, a === b ? 'OK' : 'ERRO');
    }
}
