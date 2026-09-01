// Dois ajustes visuais pedidos:
// 1) Verde escuro menos denso  -> --ink sai de #0E1712 para #1A2621
//    (mesmo matiz, mais claro e um pouco menos saturado: respira mais).
//    Os rgba() hardcoded do verde antigo precisam andar junto, senão o
//    fundo do token e os scrims/sombras ficam de tons diferentes.
// 2) Cantos menos "quadradões" -> border-radius >= 16px sobe um degrau.
//    Substituição em passada única com callback, senão 16->22 e depois
//    22->28 fariam o mesmo valor pular duas vezes.
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'public', 'terra.css');
let css = fs.readFileSync(cssPath, 'utf8');

// ---------- 1. verde ----------
const antes = {
    ink: (css.match(/--ink: #0E1712;/) || []).length,
    inkSoft: (css.match(/--ink-soft: #14201A;/) || []).length,
    rgba1418: (css.match(/rgba\(14, 23, 18,/g) || []).length,
    rgba1118: (css.match(/rgba\(11, 18, 14,/g) || []).length,
};

css = css.replace('--ink: #0E1712;', '--ink: #1A2621;');
css = css.replace('--ink-soft: #14201A;', '--ink-soft: #212E28;');
css = css.replace(/rgba\(14, 23, 18,/g, 'rgba(26, 38, 33,');
css = css.replace(/rgba\(11, 18, 14,/g, 'rgba(22, 33, 28,');

// ---------- 2. cantos ----------
const MAPA = { 16: 22, 18: 24, 20: 26, 22: 28, 24: 30, 26: 32 };
let bumps = 0;
const contagem = {};
css = css.replace(/border-radius: (\d+)px/g, (m, n) => {
    const v = Number(n);
    if (!MAPA[v]) return m;               // deixa 3,4,6,8,12,14px em paz
    bumps++;
    contagem[v + '->' + MAPA[v]] = (contagem[v + '->' + MAPA[v]] || 0) + 1;
    return 'border-radius: ' + MAPA[v] + 'px';
});

fs.writeFileSync(cssPath, css, 'utf8');

console.log('VERDE');
console.log('  --ink #0E1712 -> #1A2621   (', antes.ink, 'token )');
console.log('  --ink-soft #14201A -> #212E28   (', antes.inkSoft, 'token )');
console.log('  rgba(14,23,18) -> rgba(26,38,33):', antes.rgba1418);
console.log('  rgba(11,18,14) -> rgba(22,33,28):', antes.rgba1118);
console.log('CANTOS');
console.log('  arredondamentos ajustados:', bumps);
Object.entries(contagem).sort().forEach(([k, v]) => console.log('   ', k + 'px  x' + v));
