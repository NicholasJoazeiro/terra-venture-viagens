// Palavra de uma ou duas letras nunca deve terminar uma linha, e nenhuma linha
// deve ficar com uma palavra so. O navegador resolve a segunda parte com
// text-wrap: pretty; a primeira depende de espaco inquebravel.
//
// So mexe em NO DE TEXTO: o que esta entre ">" e "<", depois do <body>, fora de
// <script>, <style> e comentario. Atributo, URL e JSON-LD nao sao tocados.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const CURTAS = /(^|[\s(“"'—–])([A-Za-zÀ-ÿ]{1,2}|\d{1,2})[ \t]+(?=[A-Za-zÀ-ÿ0-9“"'(])/g;

function colar(texto) {
    let antes;
    do { antes = texto; texto = texto.replace(CURTAS, '$1$2 '); } while (texto !== antes);
    return texto;
}

// percorre o HTML trocando so os nos de texto
function processar(html) {
    const iBody = html.indexOf('<body');
    if (iBody === -1) return { html, n: 0 };
    let out = html.slice(0, iBody);
    let i = iBody, n = 0;

    while (i < html.length) {
        // pula comentario inteiro
        if (html.startsWith('<!--', i)) {
            const fim = html.indexOf('-->', i);
            const ate = fim === -1 ? html.length : fim + 3;
            out += html.slice(i, ate); i = ate; continue;
        }
        // pula script e style inteiros
        const mTag = /^<(script|style)\b/i.exec(html.slice(i, i + 10));
        if (mTag) {
            const fecha = html.toLowerCase().indexOf('</' + mTag[1].toLowerCase() + '>', i);
            const ate = fecha === -1 ? html.length : fecha + mTag[1].length + 3;
            out += html.slice(i, ate); i = ate; continue;
        }
        if (html[i] === '<') {
            const fim = html.indexOf('>', i);
            const ate = fim === -1 ? html.length : fim + 1;
            out += html.slice(i, ate); i = ate; continue;
        }
        // no de texto
        const prox = html.indexOf('<', i);
        const ate = prox === -1 ? html.length : prox;
        const bruto = html.slice(i, ate);
        const novo = colar(bruto);
        if (novo !== bruto) n += (novo.match(/ /g) || []).length - (bruto.match(/ /g) || []).length;
        out += novo;
        i = ate;
    }
    return { html: out, n };
}

let paginas = 0, total = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    const antes = fs.readFileSync(fp, 'utf8');
    const { html, n } = processar(antes);
    if (html !== antes) { fs.writeFileSync(fp, html, 'utf8'); paginas++; total += n; }
}
console.log('paginas tratadas:', paginas, '| espacos inquebraveis inseridos:', total);

/* ---------- confere que nada fora de texto foi tocado ---------- */
let erros = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const t = l.ler(f);
    // nenhum nbsp pode ter entrado dentro de uma tag
    for (const tag of t.match(/<[^>]*>/g) || []) {
        if (tag.includes(' ')) { console.log('NBSP DENTRO DE TAG:', f, tag.slice(0, 80)); erros++; }
    }
    // nem dentro de script/style
    for (const m of t.matchAll(/<(script|style)\b[\s\S]*?<\/\1>/gi)) {
        if (m[0].includes(' ')) { console.log('NBSP DENTRO DE', m[1], 'em', f); erros++; }
    }
}
console.log(erros ? erros + ' problema(s)' : 'nenhum nbsp fora de texto visivel');
process.exit(erros ? 1 : 0);
