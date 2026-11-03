// Fase 3 (CSS): faixa de prova, depoimento em destaque, cards com foto maior,
// colagem do #ViajeComATerra e os dois blocos opcionais.
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

/* ---------- depoimentos: grade e cards ---------- */
t(`/* 6 colunas com cada card ocupando 2: da a mesma largura que 3 colunas, mas
   permite deslocar o par da ultima linha para o meio em vez de deixa-lo
   encostado na esquerda com a terceira coluna vazia. */
.testimonials-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; margin-top: 50px; }
.testimonial-card { grid-column: span 2; }
/* so vale quando ha exatamente 6 cards: o 5o tambem sendo o penultimo. Se um
   depoimento for adicionado, a regra para de valer sozinha. */
.testimonial-card:nth-child(5):nth-last-child(2) { grid-column: 2 / span 2; }
.testimonial-card { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line-dark); border-radius: 26px; padding: 38px; transition: transform 0.4s var(--ease), border-color 0.4s; }
.testimonial-card:hover { transform: translateY(-6px); border-color: rgba(217, 116, 78, 0.4); }
.testimonial-featured { grid-column: 1 / -1; background: linear-gradient(135deg, rgba(62, 90, 68, 0.25), rgba(217, 116, 78, 0.14)); border-color: rgba(236, 229, 212, 0.2); }
.testimonial-quote i { color: var(--terra); font-size: 1.4rem; margin-bottom: 14px; }
.testimonial-text { font-family: var(--serif); font-size: 1.1rem; line-height: 1.55; color: var(--bone); margin-bottom: 24px; font-style: italic; }
.testimonial-author { display: flex; align-items: center; gap: 14px; }
.author-img img { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(236, 229, 212, 0.3); }
.author-name { font-family: var(--serif); font-size: 1.05rem; color: #fff; }
.author-destination { font-size: 0.82rem; color: var(--gold); }
.author-rating { color: var(--gold); font-size: 0.75rem; margin-top: 3px; }`,
`/* O depoimento em destaque saiu de dentro da grade e virou um bloco proprio,
   em largura total, com a foto grande ao lado. Os cinco restantes ficam numa
   grade de 6 colunas com span 2: mesma largura de 3 colunas, mas permite
   centralizar o par da ultima linha em vez de deixa-lo encostado na esquerda. */
.depo-destaque {
    display: grid; grid-template-columns: 0.78fr 1.22fr; gap: 52px; align-items: center;
    margin: 54px 0 64px; padding-bottom: 60px; border-bottom: 1px solid var(--line-dark);
}
.depo-destaque-foto { margin: 0; border-radius: 10px; overflow: hidden; }
.depo-destaque-foto img { display: block; width: 100%; height: auto; }
.depo-destaque-texto blockquote { margin: 0; }
.depo-destaque-texto blockquote p {
    font-family: var(--serif); font-weight: 400; font-size: clamp(1.25rem, 2.3vw, 1.85rem);
    line-height: 1.45; color: #fff; text-wrap: pretty;
}
.depo-assinatura { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; margin-top: 26px; }
.depo-nome { font-family: var(--serif); font-size: 1.12rem; color: #fff; }
.depo-destino { font-size: 0.9rem; color: var(--gold); }
.depo-data, .author-data { font-size: 0.78rem; color: rgba(236, 229, 212, 0.5); }

.testimonials-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
.testimonial-card {
    grid-column: span 2; display: flex; flex-direction: column; justify-content: space-between; gap: 26px;
    background: none; border: 0; border-top: 1px solid var(--line-dark); border-radius: 0; padding: 26px 0 0;
}
/* vale com exatamente 5 cards: o 4o tambem sendo o penultimo. Se um depoimento
   entrar ou sair, a regra para de valer sozinha. */
.testimonial-card:nth-child(4):nth-last-child(2) { grid-column: 2 / span 2; }
.testimonial-text { margin: 0; }
.testimonial-text p {
    font-family: var(--serif); font-size: 1.04rem; line-height: 1.6; color: var(--bone); text-wrap: pretty;
}
.testimonial-author { display: flex; align-items: center; gap: 14px; }
/* a foto deixa de ser um disquinho de 54px: quadrado de 76px, foto inteira */
.author-img { width: 76px; height: 76px; border-radius: 8px; object-fit: cover; flex: none; }
.author-info { display: flex; flex-direction: column; gap: 2px; }
.author-name { font-family: var(--serif); font-size: 1.05rem; color: #fff; }
.author-destination { font-size: 0.82rem; color: var(--gold); }`, 'depoimentos');

/* ---------- some o bloco morto do destaque antigo ---------- */
const i = c.indexOf(cr('/* ======================= DEPOIMENTOS: destaque editorial ======================= */'));
const j = c.indexOf(cr('/* ======================= SEM ÓRFÃOS'));
if (i === -1 || j === -1 || j < i) { console.error('FALHA: bloco antigo do destaque'); process.exit(1); }
c = c.slice(0, i) + c.slice(j);

/* ---------- comunidade: colagem ---------- */
t(`.comunidade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 50px; }
.comunidade-item { position: relative; aspect-ratio: 1/1; border-radius: 22px; overflow: hidden; }
.comunidade-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
.comunidade-item:hover img { transform: scale(1.08); }
.com-quote { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; color: #fff; background: linear-gradient(to top, rgba(22, 33, 28, 0.92) 0%, rgba(22, 33, 28, 0.5) 50%, transparent 100%); }
.com-text { font-family: var(--serif); font-style: italic; font-size: 1rem; line-height: 1.45; margin-bottom: 10px; text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5); }
.com-name { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600; color: var(--gold); }
.comunidade-cta { text-align: center; margin-top: 40px; }`,
`/* Colagem de proporcoes diferentes. Antes eram seis quadrados iguais com a
   frase do cliente por cima, repetindo o que a secao de depoimentos ja diz. */
.comunidade-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 152px; gap: 14px; margin-top: 50px; }
.comunidade-item { position: relative; margin: 0; border-radius: 10px; overflow: hidden; }
.comunidade-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
.comunidade-item:hover img { transform: scale(1.06); }
.comunidade-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.comunidade-item:nth-child(2) { grid-column: span 1; grid-row: span 2; }
.comunidade-item:nth-child(3) { grid-column: span 1; grid-row: span 1; }
.comunidade-item:nth-child(4) { grid-column: span 1; grid-row: span 1; }
.comunidade-item:nth-child(5) { grid-column: span 2; grid-row: span 2; }
.comunidade-item:nth-child(6) { grid-column: span 2; grid-row: span 2; }
.comunidade-cta { text-align: center; margin-top: 40px; }`, 'comunidade');

/* ---------- faixa de prova e blocos opcionais ---------- */
c += cr(`

/* ======================= FASE 3: FAIXA DE PROVA ======================= */
/* Logo abaixo do hero. Os numeros ficam como marcador visivel ate o Nicholas
   preencher: inventar nota de Google seria exatamente o que nao se pode fazer. */
.faixa-prova { background: var(--bone); border-bottom: 1px solid var(--line-light); padding: 30px 0; }
.faixa-prova-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 34px; align-items: center; }
.prova-numero { display: flex; flex-direction: column; gap: 2px; }
.prova-numero strong { font-family: var(--serif); font-weight: 400; font-size: 2rem; line-height: 1; color: var(--terra-deep); }
.prova-numero span { font-size: 0.86rem; color: var(--espresso-soft); line-height: 1.45; }
.prova-mini { display: flex; align-items: center; gap: 14px; margin: 0; }
.prova-mini img { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; flex: none; }
.prova-mini figcaption { display: flex; flex-direction: column; gap: 4px; }
.prova-mini q { font-family: var(--serif); font-size: 0.96rem; line-height: 1.4; color: var(--espresso); }
.prova-mini-nome { font-size: 0.75rem; letter-spacing: 0.04em; color: var(--espresso-soft); }

/* ======================= FASE 3: BLOCOS OPCIONAIS ======================= */
/* Ficam comentados no HTML ate existir arquivo. Ver README-prova-social.md. */
.prints { padding: 110px 0; background: var(--cream); }
.prints-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 44px; }
.print-item { margin: 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--line-light); background: #fff; }
.print-item img { display: block; width: 100%; height: auto; }
.video-cliente { padding: 110px 0; background: var(--bone); text-align: center; }
.video-cliente-player { width: 100%; max-width: 420px; height: auto; margin-top: 34px; border-radius: 10px; background: #000; }
.video-cliente-legenda { margin-top: 16px; font-size: 0.85rem; color: var(--espresso-soft); }

/* ======================= FASE 3: RESPONSIVO ======================= */
@media (max-width: 1000px) {
    .faixa-prova-grid { grid-template-columns: repeat(2, 1fr); gap: 26px; }
    .depo-destaque { grid-template-columns: 1fr; gap: 28px; }
    .depo-destaque-foto { max-width: 420px; }
    .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
    .testimonial-card { grid-column: span 1; }
    .testimonial-card:nth-child(4):nth-last-child(2) { grid-column: auto; }
    .prints-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
    .faixa-prova-grid { grid-template-columns: 1fr; gap: 20px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .comunidade-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 132px; }
    .comunidade-item:nth-child(1), .comunidade-item:nth-child(5), .comunidade-item:nth-child(6) { grid-column: span 2; grid-row: span 2; }
    .comunidade-item:nth-child(2) { grid-column: span 1; grid-row: span 1; }
    .prints-grid { grid-template-columns: 1fr; }
}
`);

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css da fase 3 aplicado | chaves', a, b, a === b ? 'OK' : 'ERRO');
console.log('sobrou testimonial-featured:', (c.match(/testimonial-featured/g) || []).length);
if (a !== b) process.exit(1);
