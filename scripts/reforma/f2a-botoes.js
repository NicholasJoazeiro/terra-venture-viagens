// Fase 2a: botao de cantos pouco arredondados, chapado, sem seta e sem brilho.
// O botao da navbar deixa de ser preenchido, senao a primeira tela teria dois
// botoes de destaque competindo com o do hero.
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

t(`.btn-primary, .btn-ghost, .btn-outline, .btn-outline-white {
    display: inline-flex; align-items: center; justify-content: center; gap: 11px;
    font-family: var(--sans); font-weight: 600; font-size: 0.95rem; letter-spacing: 0.01em;
    border-radius: 100px; cursor: pointer; border: none;
    transition: transform 0.4s var(--ease), box-shadow 0.4s ease, background 0.35s ease, color 0.35s ease;
}
.btn-primary {
    background: linear-gradient(135deg, #DE7B52, var(--terra-deep));
    color: #fff; padding: 16px 32px;
    box-shadow: 0 12px 30px rgba(217, 116, 78, 0.32);
}`,
`/* Pilula com gradiente, brilho e seta era a receita de botao de landing
   gerada. Agora e um retangulo de cantos quase retos, cor chapada, sem seta.
   O tom e o --terra-deep: o claro nao batia 4,5:1 com texto branco. */
.btn-primary, .btn-ghost, .btn-outline, .btn-outline-white {
    display: inline-flex; align-items: center; justify-content: center; gap: 11px;
    font-family: var(--sans); font-weight: 600; font-size: 0.95rem; letter-spacing: 0.01em;
    border-radius: 6px; cursor: pointer; border: none;
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.btn-primary {
    background: var(--terra-deep);
    color: #fff; padding: 17px 30px;
}`, 'base do botao');

// a linha da seta tem escape CSS; sai por regex para nao mexer no escape aqui
const antesSeta = c.length;
c = c.replace(/^\.btn-primary::after \{[^\n]*\r?\n/m, '');
c = c.replace(/^\.btn-primary:hover::after \{[^\n]*\r?\n/m, '');
if (c.length === antesSeta) { console.error('FALHA: seta do botao nao removida'); process.exit(1); }

t(`.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 44px rgba(217, 116, 78, 0.46); }
.btn-primary.btn-large { padding: 19px 40px; font-size: 1.05rem; }`,
`.btn-primary:hover { background: #A64B2C; }
.btn-primary.btn-large { padding: 20px 38px; font-size: 1.02rem; }

/* foco visivel em tudo que e clicavel, nos dois fundos */
:is(a, button, input, textarea, select, [tabindex]):focus-visible {
    outline: 2px solid var(--terra);
    outline-offset: 3px;
    border-radius: 4px;
}
.destinos-editorial :is(a, button):focus-visible,
.navbar :is(a, button):focus-visible,
.hero :is(a, button):focus-visible { outline-color: #F0A98B; }`, 'hover e large');

t(`.btn-outline {
    background: transparent; color: var(--espresso); padding: 15px 30px;
    border: 1.5px solid var(--espresso);
}
.btn-outline:hover { background: var(--espresso); color: var(--cream); transform: translateY(-3px); }

.btn-outline-white {
    background: rgba(255, 255, 255, 0.06); color: var(--bone); padding: 15px 30px;
    border: 1.5px solid rgba(236, 229, 212, 0.4); backdrop-filter: blur(4px);
}
.btn-outline-white:hover { background: var(--bone); color: var(--ink); transform: translateY(-3px); }`,
`.btn-outline {
    background: transparent; color: var(--espresso); padding: 16px 28px;
    border: 1.5px solid rgba(42, 35, 27, 0.4);
}
.btn-outline:hover { background: var(--espresso); color: var(--cream); border-color: var(--espresso); }

.btn-outline-white {
    background: transparent; color: var(--bone); padding: 16px 28px;
    border: 1.5px solid rgba(236, 229, 212, 0.42);
}
.btn-outline-white:hover { background: var(--bone); color: var(--ink); border-color: var(--bone); }`, 'botoes de contorno');

t(`.nav-btn { color: #fff !important; padding: 11px 24px !important; font-size: 0.92rem !important; }`,
`/* na primeira tela so pode haver um botao de destaque, e ele e o do hero */
.nav-btn {
    background: transparent !important; color: #fff !important;
    border: 1px solid rgba(255, 255, 255, 0.42) !important;
    padding: 10px 20px !important; font-size: 0.92rem !important; font-weight: 500 !important;
}
.nav-btn:hover { background: rgba(255, 255, 255, 0.12) !important; border-color: #fff !important; }
.nav-links .nav-btn::after { display: none; }`, 'botao da navbar');

t(`.vibe-chip {
    min-height: 46px; padding: 0 22px; border-radius: 100px; cursor: pointer;`,
`.vibe-chip {
    min-height: 46px; padding: 0 22px; border-radius: 6px; cursor: pointer;`, 'chips de vibe');

fs.writeFileSync(cp, c, 'utf8');
const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
console.log('botoes reescritos | chaves', a, b, a === b ? 'OK' : 'ERRO');
console.log('seta restante:', (c.match(/btn-primary::after/g) || []).length);
if (a !== b) process.exit(1);
