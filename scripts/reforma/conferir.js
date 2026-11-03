// Conferencia estrutural simples das paginas. Contar tags NAO prova aninhamento
// correto, entao isto e so a primeira peneira; a verificacao de verdade e no
// navegador, comparando o que o DOM realmente montou.
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../../public');
let erros = 0;
const conta = (t, s) => t.split(s).length - 1;
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.html'))) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const [a, b] of [['<div', '</div>'], ['<section', '</section>'], ['<picture', '</picture>'], ['<form', '</form>'], ['<ul', '</ul>']]) {
        const na = conta(t, a), nb = conta(t, b);
        if (na !== nb) { console.log('DESBALANCEADO', f, a, na, nb); erros++; }
    }
    if (!/<\/html>\s*$/.test(t)) { console.log('SEM FECHAMENTO </html>:', f); erros++; }
}
console.log(erros ? erros + ' problema(s)' : 'todas as paginas: tags balanceadas e </html> no fim');
process.exit(erros ? 1 : 0);
