// Utilidades compartilhadas pelas fases da reforma.
// Os arquivos do projeto usam CRLF, entao todo literal escrito em LF passa por
// cr() antes de casar ou de ser inserido.
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '../../public');

function ler(f) { return fs.readFileSync(path.join(DIR, f), 'utf8'); }
function gravar(f, t) { fs.writeFileSync(path.join(DIR, f), t, 'utf8'); }
function quebra(t) { return t.indexOf('\r\n') !== -1 ? '\r\n' : '\n'; }
function crlf(t) { const q = quebra(t); return s => s.split('\n').join(q); }

// acha o fim de um <tag ...> ... </tag> a partir da abertura, contando
// profundidade. Sem \b nos padroes: o lookahead por caractere nao-nome faz o
// mesmo papel e nao depende de escape.
function bloco(texto, iAbre, tag) {
    const re = new RegExp('<' + tag + '(?=[^a-zA-Z0-9-])|</' + tag + '>', 'g');
    re.lastIndex = iAbre;
    let prof = 0, m;
    while ((m = re.exec(texto)) !== null) {
        if (m[0][1] === '/') { prof--; if (prof === 0) return m.index + m[0].length; }
        else prof++;
    }
    return -1;
}

// localiza uma <section> pela classe e devolve {ini, fim, html}
function secao(texto, classe) {
    const re = new RegExp('<section[^>]*class="[^"]*' + classe + '(?=[" ])[^"]*"[^>]*>');
    const m = re.exec(texto);
    if (!m) return null;
    const fim = bloco(texto, m.index, 'section');
    if (fim === -1) return null;
    const iniLinha = texto.lastIndexOf('\n', m.index) + 1;
    return { ini: iniLinha, fim, html: texto.slice(iniLinha, fim) };
}

// troca uma secao inteira. Falha ruidosamente se nao achar.
function trocarSecao(texto, classe, novoHtml) {
    const s = secao(texto, classe);
    if (!s) throw new Error('secao nao encontrada: ' + classe);
    return texto.slice(0, s.ini) + crlf(texto)(novoHtml) + texto.slice(s.fim);
}

function removerSecao(texto, classe) {
    const s = secao(texto, classe);
    if (!s) throw new Error('secao nao encontrada: ' + classe);
    let fim = s.fim;
    while (texto[fim] === '\r' || texto[fim] === '\n') fim++;
    return texto.slice(0, s.ini) + texto.slice(fim);
}

// contagem de tags: primeira peneira apenas. Nao prova aninhamento.
function conferir(f) {
    // comentarios saem antes da contagem: um <figure> citado dentro de um
    // TODO contava como tag aberta e gerava alarme falso.
    const t = ler(f).replace(/<!--[\s\S]*?-->/g, '');
    const c = (s) => t.split(s).length - 1;
    const problemas = [];
    const pares = [['<div', '</div>'], ['<section', '</section>'], ['<ol', '</ol>'],
        ['<ul', '</ul>'], ['<picture', '</picture>'], ['<figure', '</figure>'],
        ['<svg', '</svg>'], ['<form', '</form>']];
    for (const [a, b] of pares) if (c(a) !== c(b)) problemas.push(a + ' ' + c(a) + ' vs ' + c(b));
    if (problemas.length) console.error('ESTRUTURA', f, problemas.join(' | '));
    else console.log('estrutura ok:', f);
    return problemas.length === 0;
}

module.exports = { DIR, ler, gravar, quebra, crlf, bloco, secao, trocarSecao, removerSecao, conferir };
