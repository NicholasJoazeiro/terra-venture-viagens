// Fase 7: 20 artigos do diario e a 404 estavam sem meta description.
// O texto NAO e inventado: sai do proprio paragrafo de abertura do artigo,
// cortado no fim de uma frase, nunca no meio de uma palavra.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

function limpar(html) {
    return html.replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ').trim();
}

// corta no fim da ultima frase que couber; se nenhuma couber, no ultimo espaco
function resumir(texto, max) {
    if (texto.length <= max) return texto;
    const corte = texto.slice(0, max);
    const ponto = Math.max(corte.lastIndexOf('. '), corte.lastIndexOf('! '), corte.lastIndexOf('? '));
    if (ponto > max * 0.5) return corte.slice(0, ponto + 1);
    return corte.slice(0, corte.lastIndexOf(' ')).replace(/[,;:]$/, '') + '.';
}

let feitas = 0;
const relatorio = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    if (/<meta name="description"/.test(t)) continue;

    const corpo = t.replace(/<!--[\s\S]*?-->/g, '');
    // o lead do artigo primeiro; se nao houver, o primeiro paragrafo do conteudo
    let fonte = (corpo.match(/<p class="lead[^"]*">([\s\S]*?)<\/p>/) || [])[1];
    if (!fonte) {
        const m = corpo.match(/<div class="article-content">([\s\S]*?)<\/div>/);
        if (m) fonte = (m[1].match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];
    }
    if (!fonte) fonte = (corpo.match(/<section[^>]*class="[^"]*article[^"]*"[\s\S]{0,4000}?<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];

    if (!fonte) { relatorio.push([f, 'sem paragrafo de onde tirar']); continue; }

    const desc = resumir(limpar(fonte), 158).replace(/"/g, '&quot;');
    if (desc.length < 50) { relatorio.push([f, 'paragrafo curto demais: ' + desc]); continue; }

    const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const ANCORA = '<link rel="canonical"';
    const i = t.indexOf(ANCORA);
    if (i === -1) { relatorio.push([f, 'sem canonical para ancorar']); continue; }
    const fimLinha = t.indexOf('>', i) + 1;
    t = t.slice(0, fimLinha) + q + '    <meta name="description" content="' + desc + '">' + t.slice(fimLinha);
    fs.writeFileSync(fp, t, 'utf8');
    feitas++;
}
console.log('descriptions geradas a partir do proprio texto:', feitas);
if (relatorio.length) {
    console.log('sem gerar:');
    relatorio.forEach(x => console.log('   ', x.join(' | ')));
}
