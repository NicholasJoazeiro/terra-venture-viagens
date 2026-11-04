// Segunda rodada de ajustes.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);
function troca(de, para, rotulo) {
    const d = cr(de), p = cr(para);
    if (!t.includes(d)) { console.error('FALHA:', rotulo); process.exit(1); }
    t = t.replace(d, p);
}

/* =======================================================================
   1. faixa de prova: Gabriel sai, Michele e Daniel entram
   ======================================================================= */
{
    const s = l.secao(t, 'faixa-prova');
    if (!s) { console.error('FALHA: faixa de prova'); process.exit(1); }
    // texto da Michele lido do destaque, para nao redigitar
    const completo = (t.match(/<div class="depo-destaque-texto">\s*<blockquote><p>([\s\S]*?)<\/p><\/blockquote>/) || [])[1];
    if (!completo) { console.error('FALHA: depoimento da Michele'); process.exit(1); }
    const primeira = completo.replace(/^"|"$/g, '').match(/[^.!?]+[.!?]/)[0].trim();
    console.log('faixa, trecho da Michele:', JSON.stringify(primeira));

    const MICHELE = `            <figure class="prova-mini">
                <img width="200" height="200" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres-avatar.webp" alt="Michele e Daniel, clientes da Terra Venture">
                <figcaption>
                    <q>${primeira}</q>
                    <span class="prova-mini-nome">Michele e Daniel, Paris e Londres</span>
                </figcaption>
            </figure>`;

    // o card do Gabriel sai inteiro e o da Michele entra no lugar
    const iG = s.html.indexOf('gabriel-dilly');
    if (iG === -1) { console.error('FALHA: Gabriel na faixa'); process.exit(1); }
    const iAbre = s.html.lastIndexOf('<figure class="prova-mini">', iG);
    const iFecha = s.html.indexOf('</figure>', iG) + '</figure>'.length;
    const iniLinha = s.html.lastIndexOf('\n', iAbre) + 1;
    const novoBloco = s.html.slice(0, iniLinha) + cr(MICHELE) + s.html.slice(iFecha);
    t = t.slice(0, s.ini) + novoBloco + t.slice(s.fim);

    // os outros dois passam a usar o avatar: em 60x60 o recorte quadrado
    // grande cortava o rosto
    t = t.replace(/(<figure class="prova-mini">\s*<img[^>]*src=")([a-z0-9-]+)\.webp"/g,
        (m, pre, nome) => nome.endsWith('-avatar') ? m : pre + nome + '-avatar.webp"');
    t = t.replace(/(<figure class="prova-mini">\s*<img )width="800" height="800"/g, '$1width="200" height="200"');
}

/* =======================================================================
   2. cards de depoimento tambem passam a usar o avatar (60x60)
   ======================================================================= */
{
    const antes = (t.match(/<img class="author-img"[^>]*src="([a-z0-9-]+)\.webp"/g) || []).length;
    t = t.replace(/(<img class="author-img" )width="800" height="800"([^>]*src=")([a-z0-9-]+)\.webp"/g,
        (m, a, b, nome) => nome.endsWith('-avatar') ? m : a + 'width="200" height="200"' + b + nome + '-avatar.webp"');
    console.log('fotos dos cards de depoimento trocadas pelo avatar:', antes);
}

/* =======================================================================
   3. colagem: recorte horizontal para a Michele, que ocupa cela larga
   ======================================================================= */
troca(`                <figure class="comunidade-item">
                    <img width="800" height="800" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres.webp" alt="Michele e Daniel em frente ao Moulin Rouge, em Paris">
                </figure>`,
`                <figure class="comunidade-item">
                    <!-- cela larga: o recorte quadrado cortava o rosto dos dois -->
                    <img width="1080" height="591" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres-larga.webp" alt="Michele e Daniel em frente ao Moulin Rouge, em Paris">
                </figure>`, 'colagem da Michele');

l.gravar('index.html', t);
l.conferir('index.html');

/* =======================================================================
   4. CSS
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

// 4.1 foto dos fundadores esticada
// A imagem e 800x800 e rendeizava 527x800. O atributo height="800" do HTML
// vira uma dica de estilo; como o CSS so definia width, a altura ficou presa
// em 800px e a foto esticou 34%. height: auto devolve a proporcao.
tc(`.quem-somos-img img { width: 100%; border-radius: 24px; box-shadow: var(--shadow); }`,
   `.quem-somos-img img { width: 100%; height: auto; border-radius: 24px; box-shadow: var(--shadow); }`, 'foto dos fundadores');

// rede para o mesmo erro em qualquer outra imagem: so vale quando o CSS nao
// definiu altura nenhuma, entao nao atropela quem usa height:100% + object-fit
tc(`/* ======================= BOTÕES ======================= */`,
`/* Imagem com width e height no HTML e largura fluida no CSS: sem height:auto
   a altura fica presa no valor do atributo e a foto estica. Aconteceu com a
   foto dos fundadores (800x800 renderizando 527x800). */
img[width][height]:not([class]) { height: auto; }

/* ======================= BOTÕES ======================= */`, 'rede das imagens');

// 4.2 faixa de foto: texto centralizado, nao encolhido num canto
tc(`.faixa-foto { position: relative; isolation: isolate; min-height: 62vh; display: flex; align-items: flex-end; }`,
   `.faixa-foto { position: relative; isolation: isolate; min-height: 66vh; display: flex; align-items: center; }`, 'faixa: alinhamento');

tc(`.faixa-foto::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(180deg, rgba(13, 24, 32, 0.12) 0%, rgba(13, 24, 32, 0) 34%, rgba(13, 24, 32, 0.72) 82%, rgba(13, 24, 32, 0.9) 100%);
}
.faixa-foto-texto { width: 100%; padding: 0 0 64px; color: var(--bone); }
.faixa-foto-texto h2 { font-family: var(--serif); font-weight: 400; color: #fff; font-size: clamp(1.8rem, 3.6vw, 3rem); max-width: 20ch; }
.faixa-foto-texto p { margin-top: 16px; max-width: 48ch; color: rgba(242, 238, 229, 0.94); font-size: 1.08rem; }`,
`/* O texto estava empurrado para o canto de baixo a esquerda e quebrava em
   pedacos curtos. Centralizado, com medida maior, ele respira e as linhas
   fecham inteiras. O escurecimento acompanhou: mancha no meio, nao no pe. */
.faixa-foto::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background:
        radial-gradient(75% 95% at 50% 50%, rgba(13, 24, 32, 0.74) 0%, rgba(13, 24, 32, 0.40) 52%, rgba(13, 24, 32, 0.06) 84%),
        linear-gradient(180deg, rgba(13, 24, 32, 0.28) 0%, rgba(13, 24, 32, 0) 24%, rgba(13, 24, 32, 0) 72%, rgba(26, 38, 33, 0.86) 100%);
}
.faixa-foto-texto { width: 100%; padding: 56px 0; color: var(--bone); text-align: center; }
.faixa-foto-texto h2 {
    font-family: var(--serif); font-weight: 400; color: #fff;
    font-size: clamp(1.85rem, 3.8vw, 3.1rem); max-width: 30ch; margin: 0 auto;
}
.faixa-foto-texto p { margin: 18px auto 0; max-width: 56ch; color: rgba(242, 238, 229, 0.94); font-size: 1.08rem; text-wrap: pretty; }`, 'faixa: texto');

// 4.3 briefing em duas colunas: a caixa de 720px deixava 520px vazios a direita
tc(`.briefing-intro { max-width: 46ch; margin-bottom: 46px; }
.briefing-intro .section-title, .briefing-intro .section-desc { text-align: left; }`,
`/* A caixa tinha 720px dentro de um container de 1240 e sobrava meia tela
   vazia a direita, que era o "nao encaixa". Duas colunas: o texto a esquerda,
   o formulario a direita, ocupando a altura toda. */
.briefing .container { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 56px; align-items: start; }
.briefing-intro { max-width: 34ch; margin-bottom: 0; grid-column: 1; grid-row: 1; }
.briefing-intro .section-title, .briefing-intro .section-desc { text-align: left; }
.briefing-caixa { grid-column: 2; grid-row: 1 / span 2; }
.briefing-alternativa { grid-column: 1; grid-row: 2; }`, 'briefing em duas colunas');

tc(`.briefing-caixa {
    max-width: 720px; border: 1px solid var(--line-dark); border-radius: 10px;
    padding: 40px;`,
`.briefing-caixa {
    width: 100%; border: 1px solid var(--line-dark); border-radius: 10px;
    padding: 40px;`, 'largura da caixa');

tc(`.briefing-alternativa { margin-top: 28px; max-width: 720px; font-size: 0.92rem; color: var(--bone-dim); }`,
   `.briefing-alternativa { margin-top: 30px; max-width: 38ch; font-size: 0.92rem; color: var(--bone-dim); text-wrap: pretty; }`, 'alternativa');

c += crc(`

/* ======================= AJUSTES: BRIEFING E FAIXA NO CELULAR ======================= */
@media (max-width: 1000px) {
    .briefing .container { grid-template-columns: 1fr; gap: 34px; }
    .briefing-intro, .briefing-caixa, .briefing-alternativa { grid-column: 1; grid-row: auto; }
    .briefing-intro { max-width: none; }
    .briefing-alternativa { max-width: none; }
    .faixa-foto { min-height: 58vh; }
    .faixa-foto-texto { padding: 44px 0; }
}
`);

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
