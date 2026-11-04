// CSS da rodada de ajustes.
//
// A remocao das regras mortas e feita por varredura de blocos, nao por regex
// solta em cima do texto: um seletor morto citado DENTRO de uma lista agrupada
// (o :is(...) do scroll-reveal cita .saida-card) deve perder so o seu nome na
// lista, nunca levar a regra inteira junto. Foi exatamente assim que a regra do
// scroll-reveal sumiu na primeira tentativa.
const fs = require('fs');
const path = require('path');
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const cr = s => s.split('\n').join(QB);
function t(de, para, rotulo) {
    const d = cr(de), p = cr(para);
    if (!c.includes(d)) { console.error('FALHA:', rotulo); process.exit(1); }
    c = c.replace(d, p);
}

/* ---------- 1. O Processo: os tres blocos voltam a alinhar ---------- */
t(`/* as alturas diferentes vem do desnivel, nao de preencher com texto a mais */
.processo-passo:nth-child(2) { margin-top: 54px; }
.processo-passo:nth-child(3) { margin-top: 108px; }`,
`/* O desnivel entre os tres passos lia como defeito de alinhamento, nao como
   escolha. Os tres partem da mesma linha; o que varia e o conteudo. */`, 'desnivel do processo');

/* ---------- 2. depoimentos: o card volta a ser um card ---------- */
t(`.testimonials-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
.testimonial-card {
    grid-column: span 2; display: flex; flex-direction: column; justify-content: space-between; gap: 26px;
    background: none; border: 0; border-top: 1px solid var(--line-dark); border-radius: 0; padding: 26px 0 0;
}`,
`.testimonials-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 22px; }
/* Sem caixa, os cards ficavam soltos no verde e o nome do cliente flutuava
   longe do texto, porque cada depoimento tem um comprimento. A caixa volta, o
   texto ocupa o espaco que sobra e a assinatura encosta no pe de todos. */
.testimonial-card {
    grid-column: span 2; display: flex; flex-direction: column; gap: 22px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid var(--line-dark);
    border-radius: 10px;
    padding: 30px;
}`, 'card dos depoimentos');

t(`.testimonial-text { margin: 0; }`, `.testimonial-text { margin: 0; flex: 1; }`, 'texto do depoimento');

t(`.testimonial-author { display: flex; align-items: center; gap: 14px; }
/* a foto deixa de ser um disquinho de 54px: quadrado de 76px, foto inteira */
.author-img { width: 76px; height: 76px; border-radius: 8px; object-fit: cover; flex: none; }`,
`.testimonial-author {
    display: flex; align-items: center; gap: 14px;
    margin-top: auto; padding-top: 20px; border-top: 1px solid var(--line-dark);
}
/* quadrado de 60px, foto inteira, no lugar do disquinho de 54 */
.author-img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; flex: none; }`, 'assinatura do depoimento');

/* ---------- 3. faixa de prova: tres colunas iguais ---------- */
t(`.faixa-prova { background: var(--bone); border-bottom: 1px solid var(--line-light); padding: 30px 0; }
.faixa-prova-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 34px; align-items: center; }`,
`.faixa-prova { background: var(--bone); border-bottom: 1px solid var(--line-light); padding: 40px 0; }
/* Eram quatro colunas desiguais, duas delas so com colchete vazio no lugar de
   numero. Agora sao tres clientes de verdade, em colunas iguais. */
.faixa-prova-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px; align-items: start; }`, 'grade da faixa');

t(`.prova-mini { display: flex; align-items: center; gap: 14px; margin: 0; }
.prova-mini img { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; flex: none; }
.prova-mini figcaption { display: flex; flex-direction: column; gap: 4px; }
.prova-mini q { font-family: var(--serif); font-size: 0.96rem; line-height: 1.4; color: var(--espresso); }
.prova-mini-nome { font-size: 0.75rem; letter-spacing: 0.04em; color: var(--espresso-soft); }`,
`.prova-mini { display: flex; align-items: flex-start; gap: 16px; margin: 0; }
.prova-mini img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; flex: none; }
.prova-mini figcaption { display: flex; flex-direction: column; gap: 7px; }
.prova-mini q { font-family: var(--serif); font-size: 1.02rem; line-height: 1.45; color: var(--espresso); text-wrap: pretty; }
.prova-mini-nome { font-size: 0.78rem; letter-spacing: 0.04em; color: var(--espresso-soft); }`, 'mini depoimento');

t(`.depo-assinatura { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; margin-top: 26px; }`,
`.depo-assinatura { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 18px; margin-top: 28px; }`, 'assinatura do destaque');

/* =======================================================================
   4. regras que ficaram sem dono
   ======================================================================= */
const MORTOS = ['saidas', 'saidas-intro', 'saidas-grid', 'saida-card', 'saida-selo',
    'saida-destinos', 'saida-texto', 'saida-dados', 'dossie-sem-foto', 'dossie-media-vazia',
    'cruz-roteiros', 'cruz-roteiros-grid', 'cruz-roteiro', 'cruz-todo',
    'dest-preco', 'prova-numero', 'depo-data', 'author-data'];
const morto = new Set(MORTOS);

// percorre o arquivo bloco a bloco, respeitando aninhamento de @media
function varrer(texto) {
    const saida = [];
    let i = 0, removidas = 0, aparadas = 0;
    while (i < texto.length) {
        const abre = texto.indexOf('{', i);
        if (abre === -1) { saida.push(texto.slice(i)); break; }
        const prefixo = texto.slice(i, abre);
        const ultimoFim = Math.max(prefixo.lastIndexOf('}'), prefixo.lastIndexOf('*/'), prefixo.lastIndexOf('\n'));
        const seletor = prefixo.slice(ultimoFim + 1).trim();

        // @media e companhia: entra e varre o miolo
        if (seletor.startsWith('@')) {
            let prof = 0, j = abre;
            for (; j < texto.length; j++) {
                if (texto[j] === '{') prof++;
                else if (texto[j] === '}') { prof--; if (prof === 0) break; }
            }
            const miolo = texto.slice(abre + 1, j);
            const r = varrer(miolo);
            removidas += r.removidas; aparadas += r.aparadas;
            saida.push(texto.slice(i, abre + 1) + r.texto + '}');
            i = j + 1;
            continue;
        }

        const fecha = texto.indexOf('}', abre);
        if (fecha === -1) { saida.push(texto.slice(i)); break; }
        const regra = texto.slice(i, fecha + 1);

        const partes = seletor.split(',').map(s => s.trim()).filter(Boolean);
        const classesDe = s => [...s.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
        const soMorto = p => { const cl = classesDe(p); return cl.length > 0 && cl.every(x => morto.has(x)); };

        if (partes.length && partes.every(soMorto)) {
            // a regra inteira so serve ao que morreu
            saida.push(texto.slice(i, abre - seletor.length - (prefixo.length - seletor.length - (ultimoFim + 1 - i) >= 0 ? 0 : 0)));
            // reconstroi: mantem tudo antes do seletor (comentarios, quebras)
            const antesDoSeletor = texto.slice(i, i + (ultimoFim + 1 - i));
            saida.pop();
            saida.push(antesDoSeletor);
            removidas++;
            i = fecha + 1;
            continue;
        }
        const vivos = partes.filter(p => !soMorto(p));
        if (vivos.length !== partes.length) {
            // lista agrupada: perde so o nome morto, a regra fica
            const antesDoSeletor = texto.slice(i, i + (ultimoFim + 1 - i));
            saida.push(antesDoSeletor + vivos.join(', ') + texto.slice(abre, fecha + 1));
            aparadas++;
            i = fecha + 1;
            continue;
        }
        saida.push(regra);
        i = fecha + 1;
    }
    return { texto: saida.join(''), removidas, aparadas };
}

// o :is(...) do scroll-reveal cita .saida-card dentro dos parenteses: ali a
// varredura por seletor nao chega, entao o nome sai na mao
const dentroDeIs = (c.match(/\.saida-card, /g) || []).length;
c = c.split('.dest-card, .saida-card, .cruz-temporada, .cruz-roteiro,').join('.dest-card, .cruz-temporada,');

const r = varrer(c);
c = r.texto;
console.log('regras removidas inteiras:', r.removidas, '| listas agrupadas aparadas:', r.aparadas);
console.log('nomes mortos tirados de dentro de :is():', dentroDeIs);

// linhas em branco triplicadas que sobraram
c = c.replace(/(\r?\n){4,}/g, QB + QB);

c += cr(`

/* ======================= AJUSTES DA REVISAO ======================= */
@media (max-width: 1000px) {
    .faixa-prova-grid { grid-template-columns: 1fr; gap: 26px; }
}
@media (max-width: 640px) {
    .testimonial-card { padding: 24px; }
}
`);

fs.writeFileSync(cp, c, 'utf8');

const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('chaves', a, b, a === b ? 'OK' : 'ERRO');
console.log('scroll-reveal intacto:', (c.match(/scroll-reveal/g) || []).length, '| .revelado:', (c.match(/\.revelado|\)\.revelado/g) || []).length);
for (const m of MORTOS) {
    const n = (c.match(new RegExp('\\.' + m + '\\b', 'g')) || []).length;
    if (n) console.log('   ainda citado: .' + m, n + 'x');
}
if (a !== b) process.exit(1);
