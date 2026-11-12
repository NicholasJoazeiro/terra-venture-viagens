// Ordena a listagem do blog por data, do mais novo para o mais antigo.
// O card de abertura (.blog-featured) ocupa a linha toda; a classe passa a
// ser de quem ficar em primeiro, nao de um artigo fixo.
//
// Guarda: se a varredura nao achar card nenhum, o script sai sem gravar. Na
// primeira tentativa o seletor errado devolveu zero e a fatia com indice -1
// zerou o arquivo.
const fs = require('fs');
const l = require('./lib.js');

let t = l.ler('blog.html');
const q = l.quebra(t);

const ABRE = /<a href="\/(blog-[a-z-]+)" class="blog-card/g;
const achados = [...t.matchAll(ABRE)];
if (achados.length < 5) { console.error('FALHA: achei so', achados.length, 'cards; nao vou gravar'); process.exit(1); }

const cards = [];
for (const m of achados) {
    const fim = l.bloco(t, m.index, 'a');
    if (fim === -1) { console.error('FALHA: fechamento do card', m[1]); process.exit(1); }
    const iniLinha = t.lastIndexOf('\n', m.index) + 1;
    cards.push({ slug: m[1], ini: iniLinha, fim, html: t.slice(iniLinha, fim) });
}
// os blocos precisam ser contiguos para a troca ser segura
for (let i = 1; i < cards.length; i++) {
    const entre = t.slice(cards[i - 1].fim, cards[i].ini).trim();
    if (entre) { console.error('FALHA: conteudo entre os cards:', JSON.stringify(entre.slice(0, 60))); process.exit(1); }
}

const data = s => {
    try { return (fs.readFileSync(l.DIR + '/' + s + '.html', 'utf8').match(/"datePublished":\s*"([^"]+)"/) || [])[1] || ''; }
    catch (e) { return ''; }
};
const antes = cards.map(c => data(c.slug));
let foraAntes = 0;
for (let i = 1; i < antes.length; i++) if (antes[i] > antes[i - 1]) foraAntes++;

const ordenados = [...cards].sort((a, b) => {
    const d = data(b.slug).localeCompare(data(a.slug));
    return d !== 0 ? d : a.slug.localeCompare(b.slug);
});

// o destaque vai para quem ficou em primeiro
const html = ordenados.map((c, i) => {
    let h = c.html.replace(/ class="blog-card blog-featured"/, ' class="blog-card"');
    if (i === 0) h = h.replace(/ class="blog-card"/, ' class="blog-card blog-featured"');
    return h;
}).join(q);

const novo = t.slice(0, cards[0].ini) + html + t.slice(cards[cards.length - 1].fim);
if (novo.length < t.length * 0.9) { console.error('FALHA: resultado encolheu demais; nao vou gravar'); process.exit(1); }
l.gravar('blog.html', novo);

const depois = ordenados.map(c => data(c.slug));
let foraDepois = 0;
for (let i = 1; i < depois.length; i++) if (depois[i] > depois[i - 1]) foraDepois++;
console.log('cards:', cards.length, '| pares fora de ordem antes:', foraAntes, '-> depois:', foraDepois);
console.log('abre a lista:', ordenados[0].slug, data(ordenados[0].slug));
console.log('fecha a lista:', ordenados[ordenados.length - 1].slug, data(ordenados[ordenados.length - 1].slug));
console.log('destaques:', (l.ler('blog.html').match(/blog-featured/g) || []).length);
l.conferir('blog.html');
