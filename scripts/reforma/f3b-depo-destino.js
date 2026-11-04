// Fase 3 (final): bloco de depoimento especifico do destino. Entra em
// paris.html, que e a unica pagina de destino com depoimento correspondente
// hoje. Italia, Bonito, Rio e Buenos Aires ainda nao tem pagina propria.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* ---------- texto da Michele, lido da home para nao redigitar ---------- */
const home = l.ler('index.html');
const texto = (home.match(/<div class="depo-destaque-texto">\s*<blockquote><p>([\s\S]*?)<\/p><\/blockquote>/) || [])[1];
if (!texto) { console.error('FALHA: nao consegui ler o depoimento da home'); process.exit(1); }

const BLOCO = `    <section class="depoimento-do-destino">
        <div class="container">
            <blockquote>
                <p>${texto}</p>
                <footer>
                    <img width="800" height="800" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres.webp" alt="Michele e Daniel, clientes da Terra Venture, em frente ao Moulin Rouge">
                    <span class="depoimento-do-destino-quem">
                        <strong>Michele e Daniel</strong>
                        <span>Paris e Londres</span>
                    </span>
                </footer>
            </blockquote>
        </div>
    </section>

`;

let p = l.ler('paris.html');
if (p.includes('depo-destino')) { console.error('ja aplicado'); process.exit(1); }
const cr = l.crlf(p);

// entra antes do rodape
const ANCORA = '        <footer class="footer">';
if (!p.includes(ANCORA)) { console.error('FALHA: rodape nao encontrado em paris.html'); process.exit(1); }
p = p.replace(ANCORA, cr(BLOCO) + ANCORA);
l.gravar('paris.html', p);
console.log('bloco de depoimento inserido em paris.html');

/* ---------- css ---------- */
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
c += (s => s.split('\n').join(QB))(`

/* ======================= DEPOIMENTO NA PAGINA DE DESTINO ======================= */
/* Serve para qualquer pagina de destino. Como colar em outra: ver
   README-prova-social.md, item 4. */
.depoimento-do-destino { padding: 90px 0; background: var(--bone); }
.depo-destino blockquote { max-width: 760px; margin: 0 auto; }
.depo-destino blockquote p {
    font-family: var(--serif); font-weight: 400; font-size: clamp(1.15rem, 2.2vw, 1.6rem);
    line-height: 1.5; color: var(--espresso); text-wrap: pretty;
}
.depo-destino footer { display: flex; align-items: center; gap: 16px; margin-top: 26px; }
.depo-destino footer img { width: 72px; height: 72px; border-radius: 8px; object-fit: cover; flex: none; }
.depoimento-do-destino-quem { display: flex; flex-direction: column; gap: 2px; }
.depoimento-do-destino-quem strong { font-family: var(--serif); font-weight: 400; font-size: 1.05rem; color: var(--espresso); }
.depoimento-do-destino-quem span { font-size: 0.85rem; color: var(--terra-deep); }
`);
fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
l.conferir('paris.html');
