// Fase 6 (continuacao): a Italia tem dois depoimentos e tem pagina de destino
// no site (Costa Amalfitana). Entra como segunda linha do dossie, logo depois
// de Paris, para a frente da lista ser a que tem prova.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);
const q = l.quebra(t);

if (t.includes('/costa-amalfitana')) { console.error('ja aplicado'); process.exit(1); }

const LINHA = `                <a class="dossie-row flip" href="/costa-amalfitana" data-vibe="cultura romance">
                    <figure class="dossie-media">
                        <img width="1200" height="909" loading="lazy" decoding="async" src="costa-amalfitana-encosta-casas.webp" alt="Casas em tons de rosa, ocre e branco empilhadas na encosta de Positano, com buganvílias em primeiro plano">
                        <figcaption class="dossie-legenda">Positano, Costa Amalfitana <!-- TODO(nicholas): ano da foto, se souber --></figcaption>
                    </figure>
                    <div class="dossie-body">
                        <span class="dossie-regiao">Europa</span>
                        <h3>Costa Amalfitana</h3>
                        <p class="dossie-line">A Itália que a Zoraia e a Márcia conheceram com a gente: limão, encosta e almoço longo.</p>
                        <div class="dossie-meta">
                            <span>Vibe<b>Cultura &amp; romance</b></span>
                            <span>Melhor época<b>Mai a Set</b></span>
                            <span>Dias ideais<b>[__ dias]</b></span>
                            <span>A partir de<b>[R$ ___]</b></span>
                        </div>
                        <span class="dossie-link">Ver o dossiê <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`;

// entra logo depois da linha de Paris
const iParis = t.indexOf('<a class="dossie-row" href="/paris"');
if (iParis === -1) { console.error('FALHA: linha de Paris'); process.exit(1); }
const fimParis = l.bloco(t, iParis, 'a');
if (fimParis === -1) { console.error('FALHA: fim da linha de Paris'); process.exit(1); }
t = t.slice(0, fimParis) + q + cr(LINHA) + t.slice(fimParis);

// com seis linhas a alternancia de lado precisa ser refeita
const iLista = t.indexOf('<div class="dossie-list">');
const fimLista = l.bloco(t, iLista, 'div');
let lista = t.slice(iLista, fimLista);
let k = 0;
lista = lista.replace(/class="dossie-row[^"]*"/g, (m) => {
    const semFoto = /dossie-sem-foto/.test(m) ? ' dossie-sem-foto' : '';
    const flip = (k++ % 2) ? ' flip' : '';
    return 'class="dossie-row' + flip + semFoto + '"';
});
t = t.slice(0, iLista) + lista + t.slice(fimLista);

l.gravar('index.html', t);

const nomes = [...l.ler('index.html').matchAll(/<a class="dossie-row[^"]*" href="([^"]+)"/g)].map(x => x[1]);
console.log('ordem dos dossies:', nomes.join(' > '));
console.log('linhas:', nomes.length);
l.conferir('index.html');
