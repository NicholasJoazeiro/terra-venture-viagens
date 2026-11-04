// Fase 6 (continuacao): tira os icones de biblioteca usados como enfeite de
// secao e coloca o bloco de confianca dentro da pagina "A Terra Venture".
//
// Ficam os icones que fazem trabalho: o do WhatsApp, o hamburguer, as setas de
// link, o calendario das fichas de destino, a seta do acordeao do FAQ e as
// marcas do Instagram. Saem os medalhoes decorativos e os marcadores de lista,
// que so repetiam visualmente o que o texto ao lado ja diz.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

let removidos = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const antes = t;

    // medalhoes decorativos
    t = t.replace(/\s*<div class="(?:historia-icon|timeline-icon|benefit-icon)"><i class="[^"]+"><\/i><\/div>/g,
        () => { removidos++; return ''; });
    // marcadores de lista
    t = t.replace(/(<li>)\s*<i class="fa[^"]+"><\/i>\s*/g,
        (m, li) => { removidos++; return li; });

    if (t !== antes) fs.writeFileSync(fp, t, 'utf8');
}
console.log('icones decorativos removidos:', removidos);

/* ---------- bloco de confianca na pagina "A Terra Venture" ---------- */
{
    let h = l.ler('historia.html');
    if (h.includes('confianca-pagina')) { console.error('ja aplicado'); process.exit(1); }
    const cr = l.crlf(h);

    const BLOCO = `    <section class="confianca-pagina">
        <div class="container">
            <h2>A empresa, por escrito</h2>
            <dl class="confianca-lista">
                <dt>Sede</dt>
                <dd>Ivoti, RS, no Vale dos Sinos. Atendemos clientes de todo o Brasil.</dd>
                <dt>Fundação</dt>
                <dd>Novembro de 2025.</dd>
                <!-- TODO(nicholas): descomente cada par assim que tiver o dado.
                     Deixei de fora o que nao existe em vez de publicar marcador.
                <dt>Cadastur</dt>
                <dd>[numero do registro]</dd>
                <dt>CNPJ</dt>
                <dd>[numero]</dd>
                <dt>Parcerias</dt>
                <dd>[operadoras e representacoes com que voce trabalha]</dd>
                -->
            </dl>
        </div>
    </section>

`;
    const ANCORA = '        <footer class="footer">';
    if (!h.includes(ANCORA)) { console.error('FALHA: rodape de historia.html'); process.exit(1); }
    h = h.replace(ANCORA, cr(BLOCO) + ANCORA);
    l.gravar('historia.html', h);
    console.log('bloco de confianca inserido em historia.html');
}

/* ---------- css ---------- */
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
c += (s => s.split('\n').join(QB))(`

/* ======================= A EMPRESA, POR ESCRITO ======================= */
.confianca-pagina { padding: 80px 0 100px; background: var(--bone); }
.confianca-pagina h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(1.5rem, 3vw, 2.2rem); color: var(--moss); margin-bottom: 28px; }
.confianca-lista { display: grid; grid-template-columns: auto 1fr; gap: 14px 28px; max-width: 760px; }
.confianca-lista dt { font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--espresso-soft); padding-top: 4px; }
.confianca-lista dd { margin: 0; color: var(--espresso); line-height: 1.6; }

/* os medalhoes de icone sairam; o espaco que eles ocupavam vai junto */
.historia-icon, .timeline-icon, .benefit-icon { display: none; }

@media (max-width: 560px) {
    .confianca-lista { grid-template-columns: 1fr; gap: 4px 0; }
    .confianca-lista dd { margin-bottom: 14px; }
}
`);
fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
l.conferir('historia.html');
