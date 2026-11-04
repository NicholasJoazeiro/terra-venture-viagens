// Fase 1: hero com <picture>/srcset, degrade so atras do texto, e dimensoes
// explicitas em toda imagem abaixo da dobra (contra salto de layout).
// Os arquivos do projeto usam CRLF, entao os literais em LF passam por cr().
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dir = path.resolve(__dirname, '../../public');

(async () => {
    const hp = path.join(dir, 'index.html');
    let h = fs.readFileSync(hp, 'utf8');
    const antes = h;
    const QB = h.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = s => s.split('\n').join(QB);

    const HERO_DE = cr(`        <div class="hero-bg-image">
            <img src="hero-lago-molveno.webp"
                alt="Lago Molveno visto do alto, com água turquesa entre encostas de floresta e os picos das Dolomitas ao fundo" loading="eager" fetchpriority="high">
        </div>`);
    if (!h.includes(HERO_DE)) { console.error('FALHA: bloco da imagem do hero nao encontrado'); process.exit(1); }

    const HERO_PARA = cr(`        <div class="hero-bg-image">
            <picture>
                <!-- TODO(nicholas): a foto de origem tem 1800px de largura. Para o tamanho
                     2400 e um recorte vertical proprio, mandar um arquivo de 2400px ou mais. -->
                <source media="(max-width: 700px)" srcset="hero-lago-molveno-vertical.webp" width="809" height="1011">
                <source srcset="hero-lago-molveno-800.webp 800w, hero-lago-molveno-1600.webp 1600w, hero-lago-molveno.webp 1800w" sizes="100vw">
                <img src="hero-lago-molveno-1600.webp" width="1800" height="1011"
                    alt="Vista aérea do Lago Molveno, com água turquesa entre encostas de floresta e os picos do Brenta ao fundo, nas Dolomitas italianas"
                    loading="eager" fetchpriority="high" decoding="async">
            </picture>
        </div>`);
    h = h.replace(HERO_DE, HERO_PARA);

    const TXT_DE = cr(`            <span class="eyebrow">Consultoria de viagem · Do sonho ao retorno</span>
            <h1 class="hero-title">Tem lugar no mundo que <em>muda</em> quem volta.</h1>
            <p class="hero-subtitle">A gente desenha à mão a viagem inteira, roteiro, hospedagem, cada detalhe. Você só se preocupa em viver o instante.</p>
            <div class="hero-cta">
                <a class="btn-primary btn-large" href="https://wa.me/5551994596233?text=Olá, gostaria de uma consultoria de viagem!" target="_blank">Começar minha viagem</a>
                <a class="link-plain" href="#destinos">Explorar destinos</a>
            </div>`);
    if (!h.includes(TXT_DE)) { console.error('FALHA: texto do hero nao encontrado'); process.exit(1); }

    const TXT_PARA = cr(`            <h1 class="hero-title">Nicholas e Giovana montam a sua viagem e cuidam dela até você chegar em casa.</h1>
            <p class="hero-subtitle">Roteiros sob medida, cruzeiros e saídas em grupo. A gente resolve reservas, documentos e seguro, e fica no WhatsApp com você durante a viagem inteira.</p>
            <div class="hero-cta">
                <a class="btn-primary btn-large" href="https://wa.me/5551994596233?text=Olá Nicholas e Giovana! Quero conversar sobre uma viagem." target="_blank" rel="noopener">Falar com Nicholas e Giovana</a>
                <a class="link-plain" href="#briefing">Prefiro contar o básico primeiro</a>
            </div>`);
    h = h.replace(TXT_DE, TXT_PARA);

    if (h === antes) { console.error('FALHA: nada mudou no hero'); process.exit(1); }
    fs.writeFileSync(hp, h, 'utf8');
    console.log('hero: <picture> + texto novo OK');

    // ---------------- dimensoes explicitas em todas as paginas ----------------
    const cache = new Map();
    async function dim(src) {
        if (cache.has(src)) return cache.get(src);
        const f = path.join(dir, src);
        let r = null;
        if (fs.existsSync(f)) {
            try { const m = await sharp(f).metadata(); r = { w: m.width, h: m.height }; } catch (e) { r = null; }
        }
        cache.set(src, r);
        return r;
    }

    const arquivos = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    let totalDim = 0, totalLazy = 0;
    const externas = new Set();
    for (const f of arquivos) {
        const fp = path.join(dir, f);
        let t = fs.readFileSync(fp, 'utf8');
        const orig = t;
        const tags = [...new Set(t.match(/<img\b[^>]*>/g) || [])];
        for (const tag of tags) {
            if (/fetchpriority=/.test(tag)) continue;  // hero, ja tratado
            const m = tag.match(/src="([^"]+)"/);
            if (!m) continue;
            const src = m[1];
            if (/^https?:/.test(src)) { externas.add(src.split('?')[0]); continue; }
            let novo = tag;
            if (!/\bwidth=/.test(novo) && !/\bheight=/.test(novo)) {
                const d = await dim(src);
                if (d) { novo = novo.replace(/<img\b/, `<img width="${d.w}" height="${d.h}"`); totalDim++; }
            }
            if (!/loading=/.test(novo)) { novo = novo.replace(/<img\b/, '<img loading="lazy"'); totalLazy++; }
            if (!/decoding=/.test(novo)) novo = novo.replace(/<img\b/, '<img decoding="async"');
            if (novo !== tag) t = t.split(tag).join(novo);
        }
        if (t !== orig) fs.writeFileSync(fp, t, 'utf8');
    }
    console.log('dimensoes adicionadas:', totalDim, '| lazy adicionado:', totalLazy);
    if (externas.size) {
        console.log('imagens externas, sem dimensao local (TODO):', externas.size);
        [...externas].slice(0, 10).forEach(u => console.log('  ', u));
    }
})();
