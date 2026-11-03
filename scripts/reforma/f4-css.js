// Fase 4 (CSS): some o bloco do quiz e entra o do briefing.
const fs = require('fs');
const path = require('path');
const cp = path.resolve(__dirname, '../../public/terra.css');
let c = fs.readFileSync(cp, 'utf8');
const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const cr = s => s.split('\n').join(QB);

/* ---------- fora o quiz ---------- */
const INI = cr('/* ======================= QUIZ (dark, cinematográfico) ======================= */');
const i = c.indexOf(INI);
if (i === -1) { console.error('FALHA: inicio do bloco do quiz'); process.exit(1); }
// o proximo cabecalho de secao depois dele
const resto = c.slice(i + INI.length);
const mFim = resto.match(/\/\* =+ [A-ZÁÊÇÕ][^\n]*=+ \*\//);
if (!mFim) { console.error('FALHA: fim do bloco do quiz'); process.exit(1); }
const j = i + INI.length + resto.indexOf(mFim[0]);
console.log('bloco do quiz removido:', (j - i), 'caracteres, ate', mFim[0].trim().slice(0, 50));
c = c.slice(0, i) + c.slice(j);

// regras soltas do quiz em media queries
const antesSolto = (c.match(/quiz/gi) || []).length;
c = c.split(QB).filter(linha => !/\.quiz-/.test(linha)).join(QB);
console.log('linhas soltas com .quiz- removidas | restante:', (c.match(/quiz/gi) || []).length, 'de', antesSolto);

/* ---------- briefing ---------- */
c += cr(`

/* ======================= BRIEFING ======================= */
/* Cinco perguntas, uma por tela. Fundo chapado de proposito: a faixa de foto
   vem logo antes, e duas imagens grandes seguidas cansam. */
.briefing { padding: 118px 0; background: var(--ink); color: var(--bone); }
.briefing .section-title { color: #fff; }
.briefing .section-desc { color: var(--bone-dim); }
.briefing-intro { max-width: 46ch; margin-bottom: 46px; }
.briefing-intro .section-title, .briefing-intro .section-desc { text-align: left; }

.briefing-caixa {
    max-width: 720px; border: 1px solid var(--line-dark); border-radius: 10px;
    padding: 40px; background: rgba(255, 255, 255, 0.03);
}
.briefing-progresso { height: 3px; background: rgba(236, 229, 212, 0.16); border-radius: 2px; overflow: hidden; }
.briefing-barra { display: block; height: 100%; width: 20%; background: var(--terra); transition: width 0.4s var(--ease); }
.briefing-contador { margin-top: 12px; font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(236, 229, 212, 0.52); }

.briefing-passo { border: 0; padding: 0; margin: 28px 0 0; min-height: 200px; }
.briefing-passo[hidden] { display: none; }
.briefing-pergunta {
    font-family: var(--serif); font-weight: 400; font-size: clamp(1.3rem, 2.6vw, 1.85rem);
    color: #fff; padding: 0; margin-bottom: 22px;
}
.briefing-pergunta:focus { outline: none; }
.briefing-pergunta:focus-visible { outline: 2px solid var(--terra); outline-offset: 4px; }

.briefing-opcoes { display: flex; flex-wrap: wrap; gap: 10px; }
.briefing-opcao {
    display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
    min-height: 48px; padding: 0 18px; border-radius: 6px;
    border: 1px solid rgba(236, 229, 212, 0.26); background: transparent;
    color: var(--bone); font-size: 0.95rem;
    transition: border-color 0.25s ease, background 0.25s ease;
}
.briefing-opcao-larga { margin-top: 16px; }
.briefing-opcao:hover { border-color: rgba(236, 229, 212, 0.6); background: rgba(255, 255, 255, 0.05); }
/* o input continua no fluxo e focavel: esconde-lo com display:none tiraria o
   elemento da navegacao por teclado e do leitor de tela */
.briefing-opcao input { width: 16px; height: 16px; accent-color: var(--terra); flex: none; }
.briefing-opcao:has(input:checked) { border-color: var(--terra); background: rgba(188, 90, 56, 0.2); }
.briefing-opcao:has(input:focus-visible) { outline: 2px solid var(--terra); outline-offset: 3px; }

.briefing-quando { display: flex; flex-wrap: wrap; gap: 18px; }
.briefing-campo { display: flex; flex-direction: column; gap: 7px; flex: 1 1 190px; }
.briefing-campo label { font-size: 0.82rem; letter-spacing: 0.04em; color: rgba(236, 229, 212, 0.72); }
.briefing-campo select, .briefing-campo input {
    min-height: 48px; padding: 0 14px; border-radius: 6px;
    border: 1px solid rgba(236, 229, 212, 0.26); background: rgba(13, 24, 32, 0.4);
    color: var(--bone); font-family: var(--sans); font-size: 0.95rem;
}
.briefing-campo select option { color: #15201c; background: #fff; }
.briefing-campo-livre { margin-top: 22px; flex-basis: 100%; }

.briefing-nav { display: flex; align-items: center; gap: 16px; margin-top: 30px; flex-wrap: wrap; }
.briefing-voltar {
    background: none; border: 0; cursor: pointer; min-height: 44px; padding: 0 4px;
    color: rgba(236, 229, 212, 0.74); font-family: var(--sans); font-size: 0.9rem;
    border-bottom: 1px solid rgba(236, 229, 212, 0.3);
}
.briefing-voltar:hover { color: #fff; border-color: #fff; }
.briefing-voltar[hidden], .btn-primary[hidden] { display: none; }

.briefing-alternativa { margin-top: 28px; max-width: 720px; font-size: 0.92rem; color: var(--bone-dim); }
.briefing-alternativa a { color: var(--bone); border-bottom: 1px solid rgba(236, 229, 212, 0.4); }
.briefing-alternativa a:hover { border-color: var(--terra); }

@media (max-width: 640px) {
    .briefing-caixa { padding: 26px 20px; }
    .briefing-opcao { width: 100%; }
    .briefing-nav { gap: 12px; }
    .briefing-nav .btn-primary { width: 100%; }
}
`);

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('css da fase 4 | chaves', a, b, a === b ? 'OK' : 'ERRO');
if (a !== b) process.exit(1);
