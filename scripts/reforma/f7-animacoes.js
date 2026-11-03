// Fase 7: animacoes de entrada.
//
// Dois problemas:
// 1. Rolagem rapida deixava secoes em branco. O IntersectionObserver entrega os
//    callbacks em lote e, quando a rolagem e rapida, o elemento ja passou pelo
//    viewport antes do lote chegar. A rede de seguranca de 2,5s so disparava se
//    NADA tivesse sido revelado, entao nao cobria o caso de "alguns revelados,
//    um no meio em branco".
// 2. A lista de alvos estava desatualizada: citava .como-card, que nao existe
//    mais, e nao citava .processo-passo, .saida-card nem as da pagina de
//    cruzeiros.
//
// A correcao: alem do observer, uma varredura a cada rolagem que revela tudo
// que ja passou pela linha de baixo da tela. Custa um getBoundingClientRect por
// elemento ainda escondido, e a lista encolhe sozinha ate zero.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const ALVOS = '.section-header, .processo-passo, .diferencial-card, .dossie-row, ' +
    '.serv-card, .serv-passo, .epoca-card, .testimonial-card, .depo-destaque, ' +
    '.comunidade-item, .faq-item, .blog-card, .dest-card, .saida-card, ' +
    '.cruz-temporada, .cruz-roteiro, .quem-somos-img, .quem-somos-text';

/* ---------------- script.js ---------------- */
{
    const sp = path.resolve(__dirname, '../../public/script.js');
    let s = fs.readFileSync(sp, 'utf8');
    const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);

    const ini = s.indexOf(cr('    const revealElements = document.querySelectorAll(\'.scroll-reveal\');'));
    const fimMarca = cr('    }, 2500);');
    const fim = s.indexOf(fimMarca);
    if (ini === -1 || fim === -1) { console.error('FALHA: limites do bloco de reveal'); process.exit(1); }

    const NOVO = cr(`    // Lista unica de alvos. Ela tambem existe no terra.css, nas duas regras que
    // escondem e revelam; se mudar aqui, mudar la.
    const ALVOS_REVEAL = '${ALVOS}';
    const LEGADO = '.scroll-reveal';
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function revelar(el) {
        el.classList.add(el.matches(LEGADO) ? 'active' : 'revelado');
    }
    function aindaEscondidos() {
        return [
            ...document.querySelectorAll(ALVOS_REVEAL + ':not(.revelado)'),
            ...document.querySelectorAll(LEGADO + ':not(.active)'),
        ];
    }

    if (semMovimento) {
        // quem pediu menos movimento ve a pagina inteira de uma vez
        aindaEscondidos().forEach(revelar);
    } else {
        // escalona o atraso dentro de cada grupo, para os cards entrarem em cascata
        document.querySelectorAll(ALVOS_REVEAL).forEach(el => {
            const irmaos = el.parentElement
                ? [...el.parentElement.children].filter(x => x.matches(ALVOS_REVEAL)) : [];
            const i = irmaos.indexOf(el);
            if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
        });

        const observador = new IntersectionObserver((entradas, o) => {
            entradas.forEach(e => {
                if (!e.isIntersecting) return;
                revelar(e.target);
                o.unobserve(e.target);
            });
        }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0 });
        aindaEscondidos().forEach(el => observador.observe(el));

        // Varredura: revela tudo que ja cruzou a linha de baixo da tela. E ela
        // que garante que rolagem rapida nao deixe buraco, porque nao depende
        // do lote do observer chegar a tempo.
        let agendado = false;
        function varrer() {
            agendado = false;
            const limite = window.innerHeight + 120;
            for (const el of aindaEscondidos()) {
                if (el.getBoundingClientRect().top < limite) revelar(el);
            }
        }
        function agendarVarredura() {
            if (agendado) return;
            agendado = true;
            requestAnimationFrame(varrer);
        }
        window.addEventListener('scroll', agendarVarredura, { passive: true });
        window.addEventListener('resize', agendarVarredura, { passive: true });
        varrer();

        // Rede de seguranca: se em 2,5s ainda houver algo escondido acima do fim
        // da pagina, revela. Perde-se a animacao, nunca o conteudo.
        setTimeout(() => {
            if (aindaEscondidos().length) varrer();
        }, 2500);
    }
`);

    s = s.slice(0, ini) + NOVO + s.slice(fim + fimMarca.length + QB.length);
    fs.writeFileSync(sp, s, 'utf8');
    console.log('script.js: bloco de reveal reescrito');
}

/* ---------------- terra.css ---------------- */
{
    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);

    const LISTA_ANTIGA = '.section-header, .como-card, .diferencial-card, .dossie-row, .serv-card, .serv-passo, .epoca-card, .testimonial-card, .comunidade-item, .faq-item, .blog-card, .dest-card, .quem-somos-img, .quem-somos-text';
    const n = (c.match(new RegExp(LISTA_ANTIGA.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (n === 0) { console.error('FALHA: lista de alvos nao encontrada no css'); process.exit(1); }
    c = c.split(LISTA_ANTIGA).join(ALVOS);
    console.log('terra.css: lista de alvos atualizada em', n, 'regras');

    // o bloco de movimento reduzido ganha a regra global: animacao com duracao
    // quase zero chega ao estado final na hora, o que "animation: none" nao faz
    // quando a regra comeca em opacity: 0
    const DE = cr(`@media (prefers-reduced-motion: reduce) {
    .hero-bg-image img { animation: none; }
    .hero-content .eyebrow, .hero-title, .hero-subtitle, .hero-cta { animation: none; opacity: 1; }
    .custom-marker { animation: none; }
}`);
    if (!c.includes(DE)) { console.error('FALHA: bloco de movimento reduzido'); process.exit(1); }
    c = c.replace(DE, cr(`@media (prefers-reduced-motion: reduce) {
    /* duracao quase zero em vez de "animation: none": a regra que anima comeca
       em opacity 0, entao desligar a animacao deixaria o elemento invisivel.
       Com duracao de 0,01ms a animacao roda e chega ao estado final na hora. */
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    .hero-bg-image img { animation: none; }
    .hero-content .eyebrow, .hero-title, .hero-subtitle, .hero-cta, .hero-rodape { opacity: 1; }
    .custom-marker { animation: none; }
}`));

    fs.writeFileSync(cp, c, 'utf8');
    const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
    console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
    if (a !== b) process.exit(1);
}
