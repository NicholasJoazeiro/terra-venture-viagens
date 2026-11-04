// Fase 5 (CSS): proximas saidas, cartao de cruzeiros, pagina /cruzeiros e a
// linha de dossie sem foto.
const fs = require('fs');
const path = require('path');
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const cr = s => s.split('\n').join(QB);

// a quinta linha do dossie precisa de uma proporcao propria na alternancia
if (!c.includes('.dossie-row:nth-child(4)')) { console.error('FALHA: regras do dossie'); process.exit(1); }
c = c.replace(cr('.dossie-row:nth-child(4) { grid-template-columns: 0.95fr 1.05fr; grid-auto-rows: 470px; }'),
    cr(`.dossie-row:nth-child(4) { grid-template-columns: 0.95fr 1.05fr; grid-auto-rows: 470px; }
.dossie-row:nth-child(5) { grid-template-columns: 1.05fr 0.95fr; grid-auto-rows: 420px; }`));

c += cr(`

/* ======================= PROXIMAS SAIDAS ======================= */
.saidas { padding: 110px 0; background: var(--cream-deep); }
.saidas-intro { max-width: 52ch; margin-bottom: 46px; }
.saidas-intro .section-title, .saidas-intro .section-desc { text-align: left; }
.saidas-intro .section-title { max-width: 16ch; }
.saidas-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
.saida-card {
    display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
    background: #fff; border: 1px solid var(--line-light); border-radius: 10px; padding: 34px;
}
.saida-selo {
    font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600;
    color: var(--terra-deep); border: 1px solid rgba(188, 90, 56, 0.4); border-radius: 4px; padding: 5px 10px;
}
.saida-card h3 { font-family: var(--serif); font-weight: 400; font-size: 1.6rem; color: var(--moss); }
.saida-destinos { font-size: 0.95rem; color: var(--espresso); font-weight: 500; }
.saida-texto { color: var(--espresso-soft); line-height: 1.65; }
/* o <dl> de duas colunas mantem rotulo e valor alinhados mesmo com o valor
   ainda em marcador */
.saida-dados {
    display: grid; grid-template-columns: auto 1fr; gap: 8px 18px;
    width: 100%; margin: 10px 0 8px; padding-top: 16px; border-top: 1px solid var(--line-light);
    font-size: 0.88rem;
}
.saida-dados dt { color: var(--espresso-soft); }
.saida-dados dd { margin: 0; color: var(--espresso); font-weight: 500; }

/* ======================= CARTAO DE CRUZEIROS ======================= */
.cartao-cruzeiros {
    display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap;
    margin-top: 40px; padding: 32px 34px; background: var(--ink); color: var(--bone);
    border-radius: 10px;
}
.cartao-cruzeiros h3 { font-family: var(--serif); font-weight: 400; font-size: 1.5rem; color: #fff; margin-bottom: 8px; }
.cartao-cruzeiros p { color: var(--bone-dim); max-width: 60ch; line-height: 1.6; }
.cartao-cruzeiros-link {
    flex: none; font-size: 0.86rem; font-weight: 600; letter-spacing: 0.04em;
    color: var(--bone); border-bottom: 1px solid rgba(236, 229, 212, 0.45); padding-bottom: 4px;
}
.cartao-cruzeiros:hover .cartao-cruzeiros-link { border-color: var(--terra); }

/* ======================= DOSSIE SEM FOTO ======================= */
/* Ate existir foto de navio, a linha de cruzeiros usa um bloco tipografico em
   vez de uma foto de banco de imagens que nao diz nada. */
.dossie-media-vazia {
    display: grid; place-items: center;
    background: var(--ink-soft); border: 1px solid var(--line-dark);
    color: rgba(236, 229, 212, 0.42);
}
.dossie-media-vazia svg { width: 70%; max-width: 320px; height: auto; }

/* ======================= PAGINA DE CRUZEIROS ======================= */
.cruz-quando { padding: 100px 0 20px; background: var(--cream); }
.cruz-quando .section-title, .cruz-resolve .section-title, .cruz-roteiros .section-title { text-align: left; }
.cruz-temporadas { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 40px; }
.cruz-temporada { border-top: 1px solid rgba(42, 35, 27, 0.2); padding-top: 22px; }
.cruz-temporada h3 { font-family: var(--serif); font-weight: 400; font-size: 1.4rem; color: var(--moss); margin-bottom: 12px; }
.cruz-temporada p { color: var(--espresso-soft); line-height: 1.7; }
/* os marcadores ficam a vista de proposito, para ninguem publicar com eles */
.cruz-todo {
    margin-top: 12px; font-size: 0.86rem; color: var(--terra-deep);
    background: rgba(188, 90, 56, 0.09); border-left: 2px solid var(--terra-deep);
    padding: 7px 12px; border-radius: 0 4px 4px 0;
}

.cruz-resolve { padding: 80px 0; background: var(--cream); }
.cruz-lista { list-style: none; margin: 36px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px 40px; }
.cruz-lista li { border-top: 1px solid rgba(42, 35, 27, 0.16); padding-top: 16px; color: var(--espresso-soft); line-height: 1.65; }
.cruz-lista strong { display: block; font-family: var(--serif); font-weight: 400; font-size: 1.12rem; color: var(--espresso); margin-bottom: 6px; }

.cruz-roteiros { padding: 80px 0 100px; background: var(--bone); }
.cruz-roteiros .section-desc { text-align: left; margin-top: 12px; }
.cruz-roteiros-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 38px; }
.cruz-roteiro { background: #fff; border: 1px dashed rgba(188, 90, 56, 0.5); border-radius: 10px; padding: 28px; }
.cruz-roteiro h3 { font-family: var(--serif); font-weight: 400; font-size: 1.25rem; color: var(--terra-deep); margin-bottom: 8px; }
.cruz-roteiro p { color: var(--espresso-soft); font-size: 0.92rem; }

@media (max-width: 1000px) {
    .saidas-grid { grid-template-columns: 1fr; }
    .cruz-temporadas, .cruz-roteiros-grid { grid-template-columns: 1fr; }
    .cruz-lista { grid-template-columns: 1fr; }
    .cartao-cruzeiros { flex-direction: column; align-items: flex-start; gap: 18px; }
    .saidas, .cruz-quando, .cruz-resolve, .cruz-roteiros { padding-left: 0; padding-right: 0; }
}
@media (max-width: 640px) {
    .saida-card { padding: 26px 22px; }
    .saida-dados { grid-template-columns: 1fr; gap: 2px 0; }
    .saida-dados dd { margin-bottom: 10px; }
}
`);

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css da fase 5 | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
