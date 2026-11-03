// Fase 2 (CSS): estilos do processo editorial, da faixa de foto em tela cheia,
// dos tres diferenciais com prova e da linha de rota que assina a pagina.
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

/* ---------- O Processo: de tres circulos iguais para tres blocos editoriais ---------- */
t(`.como-funciona { padding: 124px 0; background: var(--cream); }
.como-funciona-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
    counter-reset: passo; position: relative;
}
.como-funciona-grid::before {
    content: ''; position: absolute; top: 43px; left: 16%; right: 16%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--terra) 18%, var(--terra) 82%, transparent);
    opacity: 0.35;
}
.como-card {
    position: relative; counter-increment: passo; text-align: center;
    background: none; border: 0; padding: 0;
}`,
`/* Tres circulos numerados, centralizados, de altura igual: era a ilustracao
   mais reconhecivel de secao "como funciona" gerada. No lugar, tres blocos
   alinhados a esquerda, em alturas diferentes, com o numero em tipografia
   grande em vez de dentro de uma bolinha. */
.processo { padding: 118px 0 124px; background: var(--cream); }
.processo-intro { max-width: 46ch; margin-bottom: 64px; }
.processo-intro .section-title { text-align: left; }
.processo-intro .section-desc { text-align: left; margin: 14px 0 0; }
.processo-lista {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px;
    list-style: none; margin: 0; padding: 0; align-items: start;
}
.processo-passo { border-top: 1px solid rgba(42, 35, 27, 0.18); padding-top: 22px; }
/* as alturas diferentes vem do desnivel, nao de preencher com texto a mais */
.processo-passo:nth-child(2) { margin-top: 54px; }
.processo-passo:nth-child(3) { margin-top: 108px; }
.passo-num {
    display: block; font-family: var(--serif); font-weight: 400;
    font-size: clamp(2.6rem, 5vw, 4.1rem); line-height: 1;
    color: rgba(188, 90, 56, 0.34); margin-bottom: 14px;
}
.processo-passo h3 { font-family: var(--serif); font-weight: 400; font-size: 1.5rem; color: var(--moss); margin-bottom: 12px; }
.processo-passo p { color: var(--espresso-soft); font-size: 1rem; line-height: 1.7; text-wrap: pretty; }

/* assinatura discreta: uma rota tracejada a mao. No maximo tres na pagina. */
.rota { display: flex; justify-content: center; color: rgba(188, 90, 56, 0.5); margin: 0 0 58px; }
.rota svg { width: 320px; max-width: 64%; height: auto; }

.como-card {
    position: relative; counter-increment: passo; text-align: center;
    background: none; border: 0; padding: 0;
}`, 'processo');

/* ---------- destinos: fotos maiores, recortes variados, legenda ---------- */
t(`.dossie-row { display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 460px; align-items: stretch; border-top: 1px solid var(--line-dark); color: inherit; }`,
`/* colunas e alturas variam de linha para linha: quatro cards identicos
   empilhados sao a marca registrada de grade gerada */
.dossie-row { display: grid; grid-template-columns: 1.12fr 0.88fr; grid-auto-rows: 520px; align-items: stretch; border-top: 1px solid var(--line-dark); color: inherit; }
.dossie-row:nth-child(2) { grid-template-columns: 0.9fr 1.1fr; grid-auto-rows: 430px; }
.dossie-row:nth-child(3) { grid-template-columns: 1.2fr 0.8fr; grid-auto-rows: 560px; }
.dossie-row:nth-child(4) { grid-template-columns: 0.95fr 1.05fr; grid-auto-rows: 470px; }
.de-sub { color: var(--bone-dim); font-size: 1.05rem; max-width: 46ch; margin-top: 14px; }
.dossie-regiao { font-family: var(--serif); font-style: normal; font-size: 0.95rem; color: rgba(236, 229, 212, 0.58); }
.dossie-media { display: block; }
.dossie-legenda {
    position: absolute; left: 18px; bottom: 16px; z-index: 2;
    font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82); text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
}`, 'dossie');

/* ---------- faixa de foto em tela cheia ---------- */
t(`/* ======================= QUEM SOMOS ======================= */`,
`/* Faixa de foto em tela cheia entre duas secoes de texto. Serve para quebrar
   a cadencia de blocos centralizados de mesma altura. */
.faixa-foto { position: relative; isolation: isolate; min-height: 62vh; display: flex; align-items: flex-end; }
.faixa-foto img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; }
.faixa-foto::after {
    content: ''; position: absolute; inset: 0; z-index: -1;
    background: linear-gradient(180deg, rgba(13, 24, 32, 0.12) 0%, rgba(13, 24, 32, 0) 34%, rgba(13, 24, 32, 0.72) 82%, rgba(13, 24, 32, 0.9) 100%);
}
.faixa-foto-texto { width: 100%; padding: 0 0 64px; color: var(--bone); }
.faixa-foto-texto h2 { font-family: var(--serif); font-weight: 400; color: #fff; font-size: clamp(1.8rem, 3.6vw, 3rem); max-width: 20ch; }
.faixa-foto-texto p { margin-top: 16px; max-width: 48ch; color: rgba(242, 238, 229, 0.94); font-size: 1.08rem; }

/* ======================= QUEM SOMOS ======================= */`, 'faixa de foto');

/* ---------- diferenciais: de quatro listas de check para tres com prova ---------- */
t(`.sectionenciais { padding: 120px 0; background: var(--cream); }
.diferenciais-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; counter-reset: incl; }
.diferencial-card { position: relative; counter-increment: incl; background: #fff; border: 1px solid var(--line-light); border-radius: 24px; padding: 38px 30px; overflow: hidden; transition: transform 0.45s var(--ease), box-shadow 0.45s ease; }
.diferencial-card::before { content: counter(incl, decimal-leading-zero); position: absolute; top: 18px; right: 24px; font-family: var(--serif); font-weight: 500; font-size: 2.6rem; color: rgba(217, 116, 78, 0.16); }
.diferencial-card::after { content: ''; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: linear-gradient(var(--terra), var(--terra-deep)); transform: scaleY(0); transform-origin: top; transition: transform 0.45s var(--ease); }
.diferencial-card:hover { transform: translateY(-8px); box-shadow: var(--shadow); }
.diferencial-card:hover::after { transform: scaleY(1); }
.diferencial-card h3 { color: var(--moss); font-size: 1.3rem; margin-bottom: 18px; padding-right: 40px; }
.diferencial-card ul li { padding: 7px 0; color: var(--espresso-soft); font-size: 0.92rem; }`,
`/* Quatro cartoes brancos iguais com listas de check e numero d'agua no canto
   era o bloco mais generico da pagina. Agora sao tres, cada um com a frase de
   um cliente como prova do que esta escrito logo acima. */
.diferenciais { padding: 118px 0; background: var(--cream); }
.diferenciais-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 54px; }
.diferencial-card {
    display: flex; flex-direction: column; gap: 14px;
    background: none; border: 0; border-top: 1px solid rgba(42, 35, 27, 0.2);
    border-radius: 0; padding: 26px 0 0;
}
.diferencial-card h3 { color: var(--moss); font-size: 1.3rem; font-weight: 400; }
.diferencial-card > p { color: var(--espresso-soft); font-size: 1rem; line-height: 1.7; text-wrap: pretty; }
.prova { margin: 6px 0 0; padding: 20px 22px; background: var(--bone); border-left: 3px solid var(--terra-deep); border-radius: 0 8px 8px 0; }
.prova p { font-family: var(--serif); font-size: 1rem; line-height: 1.55; color: var(--espresso); text-wrap: pretty; }
.prova cite { display: block; margin-top: 10px; font-style: normal; font-size: 0.8rem; letter-spacing: 0.04em; color: var(--espresso-soft); }
.incl-cta { margin-top: 48px; }`, 'diferenciais');

// a lista de paddings do celular ainda cita as classes antigas
t(`    .como-funciona, .destinos-editorial, .quiz-section, .map-explorer-section, .sectionenciais, .quem-somos, .testimonials, .comunidade, .faq-section, .contato { padding: 70px 0; }`,
`    .processo, .destinos-editorial, .quiz-section, .map-explorer-section, .diferenciais, .quem-somos, .testimonials, .comunidade, .faq-section, .contato { padding: 70px 0; }`, 'paddings do celular');

/* ---------- responsivo do que entrou agora ---------- */
const ANCORA = '/* ======================= FAIXA DIFERENCIAL ======================= */';
if (!c.includes(ANCORA)) { console.error('FALHA: ancora'); process.exit(1); }

c += cr(`

/* ======================= FASE 2: RESPONSIVO DO QUE ENTROU ======================= */
@media (max-width: 1000px) {
    .processo-lista { grid-template-columns: 1fr; gap: 34px; }
    .processo-passo:nth-child(2), .processo-passo:nth-child(3) { margin-top: 0; }
    .diferenciais-grid { grid-template-columns: 1fr; gap: 26px; }
    .faixa-foto { min-height: 54vh; }
}
@media (max-width: 760px) {
    .rota svg { width: 220px; }
    .rota { margin-bottom: 40px; }
    .faixa-foto-texto { padding-bottom: 44px; }
    .dossie-legenda { left: 14px; bottom: 12px; }
}
`);

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css da fase 2 aplicado | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
