// Selo do Cadastur e linha legal no rodape das 76 paginas.
//
// O logo foi recortado com trim() em vez do object-position da instrucao
// original: ali o recorte era no CSS porque nao dava para editar o arquivo.
// Aqui da, entao o webp ja vem sem margem (420x85) e nao precisa de truque.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const CNPJ = '63.865.418/0001-81';
const CADASTUR = '63.865.418/0001-81';
const VALIDADE = '12/01/2028';

const SELO = `            <div class="footer-selo">
                <a class="cadastur-selo" href="https://cadastur.turismo.gov.br" target="_blank" rel="noopener"
                   aria-label="Consultar o cadastro da Terra Venture no Cadastur, site do Ministério do Turismo">
                    <img width="420" height="85" loading="lazy" decoding="async" src="cadastur.webp" alt="Cadastur, fazendo o turismo legal">
                </a>
                <p class="cadastur-texto">
                    <strong>Agência de turismo cadastrada no Ministério do Turismo</strong>
                    <span>Terra Venture Agência de Viagens Ltda &middot; CNPJ ${CNPJ}</span>
                    <span>Cadastur nº ${CADASTUR} &middot; válido até ${VALIDADE} &middot; Ivoti, RS</span>
                </p>
            </div>
`;

/* ---------- 1. selo no footer-bottom de todas as paginas que o tem ---------- */
let selos = 0, confianca = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const o = t;
    const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';

    if (!t.includes('footer-selo')) {
        const ANC = '        <div class="footer-bottom">';
        if (t.includes(ANC)) {
            // o selo entra numa faixa propria, logo acima da linha de copyright
            t = t.replace(ANC, '        <div class="footer-selo-faixa">' + q +
                '            <div class="container">' + q +
                SELO.split('\n').join(q) +
                '            </div>' + q +
                '        </div>' + q + ANC);
            selos++;
        }
    }

    // 2. a coluna "A empresa" tinha os dados comentados esperando os numeros
    const COMENTADO = /\s*<!-- TODO\(nicholas\): descomente cada linha abaixo assim que[\s\S]*?-->/;
    if (COMENTADO.test(t)) {
        t = t.replace(COMENTADO, q +
            '                        <li><span>CNPJ</span> ' + CNPJ + '</li>' + q +
            '                        <li><span>Cadastur</span> nº ' + CADASTUR + ', válido até ' + VALIDADE + '</li>' + q +
            '                        <li><span>Atuação</span> desde novembro de 2025</li>');
        confianca++;
    }

    if (t !== o) fs.writeFileSync(fp, t, 'utf8');
}
console.log('selo do Cadastur no rodape:', selos, 'paginas');
console.log('coluna "A empresa" preenchida:', confianca, 'paginas');

/* ---------- 3. CSS ---------- */
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
if (c.includes('.cadastur-selo')) { console.error('css ja aplicado'); process.exit(1); }
c += (s => s.split('\n').join(QB))(`

/* ======================= SELO DO CADASTUR ======================= */
/* O logo oficial tem letra azul-escura, entao precisa de caixa branca sobre o
   rodape escuro. O arquivo ja vem recortado, sem margem: nada de object-fit. */
.footer-selo-faixa { border-top: 1px solid var(--line-dark); padding: 26px 0; }
.footer-selo { display: flex; align-items: center; justify-content: center; gap: 22px; flex-wrap: wrap; }
.cadastur-selo {
    display: block; flex: none; background: #fff; border-radius: 10px; padding: 10px 16px;
    transition: transform 0.3s var(--ease);
}
.cadastur-selo:hover { transform: translateY(-2px); }
.cadastur-selo img { display: block; width: 180px; height: auto; }
.cadastur-texto { display: grid; gap: 3px; margin: 0; font-size: 0.82rem; color: rgba(236, 229, 212, 0.68); line-height: 1.5; }
.cadastur-texto strong { color: var(--bone); font-size: 0.9rem; font-weight: 600; }

@media (max-width: 620px) {
    .footer-selo { flex-direction: column; gap: 16px; text-align: center; }
    .cadastur-texto { justify-items: center; }
}
`);
fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
