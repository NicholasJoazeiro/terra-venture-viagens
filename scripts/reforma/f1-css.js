// Fase 1 (CSS): degrade so atras do texto, titulo sem italico e dimensionado
// para a frase nova, e a foto do hero nitida no resto do quadro.
const fs = require('fs');
const path = require('path');
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const cr = s => s.split('\n').join(QB);
let n = 0;
function troca(de, para, rotulo) {
    const d = cr(de), p = cr(para);
    if (!c.includes(d)) { console.error('FALHA:', rotulo); process.exit(1); }
    c = c.replace(d, p); n++;
}

// 1. scrim: antes cobria a foto inteira em dois eixos. Agora e uma mancha no
//    canto de baixo a esquerda, onde o texto vive, mais um fio no topo para a
//    navbar e um pe para emendar com a faixa escura. O meio da foto fica limpo.
troca(`/* dois eixos: escurece embaixo e à esquerda, onde o texto vive, e deixa a
   foto respirar à direita. É isso que dispensa sombra em cada elemento. */
.hero-overlay, .hero::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background:
        /* o scrim horizontal e azulado de proposito: em verde ele reforcava o
           tom que a foto nova veio justamente equilibrar */
        linear-gradient(100deg, rgba(13, 24, 32, 0.74) 0%, rgba(13, 24, 32, 0.40) 38%, rgba(13, 24, 32, 0.04) 70%),
        /* o vertical segue no verde da marca, para emendar sem degrau com a
           faixa escura logo abaixo do hero */
        linear-gradient(180deg, rgba(20, 30, 26, 0.38) 0%, rgba(20, 30, 26, 0) 30%, rgba(20, 30, 26, 0.55) 78%, rgba(26, 38, 33, 0.95) 100%);
}`,
`/* O escurecimento nao cobre mais a foto inteira. Sao tres camadas: uma mancha
   no canto de baixo a esquerda, onde o texto vive; um fio no topo, so para a
   navbar ter contraste; e um pe, para emendar sem degrau com a faixa escura
   logo abaixo. O miolo e a direita da foto ficam limpos. */
.hero-overlay, .hero::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background:
        radial-gradient(135% 88% at 0% 100%, rgba(13, 24, 32, 0.78) 0%, rgba(13, 24, 32, 0.34) 44%, rgba(13, 24, 32, 0) 72%),
        linear-gradient(180deg,
            rgba(13, 24, 32, 0.36) 0%,
            rgba(13, 24, 32, 0) 19%,
            rgba(13, 24, 32, 0) 56%,
            rgba(20, 30, 26, 0.40) 82%,
            rgba(26, 38, 33, 0.93) 100%);
}`, 'scrim do hero');

// 2. titulo: a frase nova e mais longa e descritiva, entao desce de corpo e
//    sobe de medida. O <em> em italico sai de vez.
troca(`.hero-title {
    font-family: var(--serif); font-weight: 400; color: #fff;
    font-size: clamp(2.9rem, 7.4vw, 6.6rem); line-height: 1.0; letter-spacing: -0.025em;
    margin: 20px 0 22px; max-width: 16ch; opacity: 0; animation: rise 1s 0.3s var(--ease) forwards;
}
.hero-title em { font-style: italic; color: inherit; }  /* a palavra colorida em itálico era a assinatura mais tipica de landing gerada */`,
`.hero-title {
    font-family: var(--serif); font-weight: 400; color: #fff;
    font-size: clamp(2.05rem, 4.5vw, 3.9rem); line-height: 1.1; letter-spacing: -0.02em;
    margin: 0 0 22px; max-width: 22ch; opacity: 0; animation: rise 1s 0.3s var(--ease) forwards;
}`, 'hero-title');

// 3. com menos scrim, o texto precisa de sombra propria para manter AA
troca(`.hero-title { text-shadow: 0 2px 24px rgba(12, 20, 16, 0.4); }  /* uma só, discreta; o scrim faz o resto */
.hero-subtitle { color: rgba(238, 233, 222, 0.92); text-shadow: none; }`,
`.hero-title { text-shadow: 0 2px 22px rgba(10, 18, 15, 0.62); }  /* o scrim encolheu, a sombra compensa */
.hero-subtitle { color: rgba(242, 238, 229, 0.95); text-shadow: 0 1px 14px rgba(10, 18, 15, 0.55); }`, 'sombras do hero');

// 4. as fotos de destino vinham de fontes diferentes e cada uma com sua
//    saturacao. Uma normalizacao leve faz o conjunto parecer uma curadoria so.
const ANCORA = '/* ======================= FAIXA DIFERENCIAL ======================= */';
if (!c.includes(ANCORA)) { console.error('FALHA: ancora da faixa'); process.exit(1); }
c = c.replace(ANCORA, cr(`/* Normalizacao de cor das fotos de destino: elas vem de bancos diferentes,
   cada uma com sua saturacao. Um filtro unico faz o conjunto parecer uma
   curadoria so, sem reprocessar arquivo nenhum. */
.dossie-media img, .dest-card img, .comunidade-item img {
    filter: saturate(0.93) contrast(1.05) brightness(0.99);
}

`) + ANCORA);
n++;

fs.writeFileSync(cp, c, 'utf8');
console.log('terra.css: ' + n + ' blocos trocados');
const ab = (c.match(/\{/g) || []).length, fe = (c.match(/\}/g) || []).length;
console.log('chaves:', ab, fe, ab === fe ? 'OK' : 'DESBALANCEADO');
if (ab !== fe) process.exit(1);
