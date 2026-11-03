// Conferencia estrutural de todas as paginas. Contar tags NAO prova
// aninhamento correto, entao isto e so a primeira peneira; a verificacao de
// verdade e no navegador, comparando o que o DOM realmente montou.
const fs = require('fs');
const l = require('./lib.js');

let erros = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    if (!l.conferirSilencioso(f)) erros++;
    const t = l.ler(f);
    if (!/<\/html>\s*$/.test(t)) { console.log('SEM FECHAMENTO </html>:', f); erros++; }
}
console.log(erros ? erros + ' problema(s)' : 'todas as paginas: tags balanceadas e </html> no fim');
process.exit(erros ? 1 : 0);
