// Rodada de ajustes depois da revisao do Nicholas.
//
// Regra que atravessa quase tudo aqui: espaco reservado sem valor real e pior
// do que espaco nenhum. Saem todos os marcadores entre colchetes que estavam
// visiveis no site. O lembrete fica em comentario no codigo, nao na tela.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);
const q = l.quebra(t);
function troca(de, para, rotulo) {
    const d = cr(de), p = cr(para);
    if (!t.includes(d)) { console.error('FALHA:', rotulo); process.exit(1); }
    t = t.replace(d, p);
}

/* =======================================================================
   1. hero: volta o texto do Nicholas, sem o italico decorativo
   ======================================================================= */
troca(`            <h1 class="hero-title">Nicholas e Giovana montam a sua viagem e cuidam dela até você chegar em casa.</h1>
            <p class="hero-subtitle">Roteiros sob medida, cruzeiros e saídas em grupo. A gente resolve reservas, documentos e seguro, e fica no WhatsApp com você durante a viagem inteira.</p>`,
`            <h1 class="hero-title">Tem lugar no mundo que muda quem volta.</h1>
            <p class="hero-subtitle">Roteiros sob medida e cruzeiros, desenhados um por vez. A gente cuida das reservas, dos documentos e do suporte enquanto você está fora.</p>`, 'texto do hero');

/* =======================================================================
   2. faixa de prova: fora os numeros que nao existem, tres clientes
   ======================================================================= */
{
    const s = l.secao(t, 'faixa-prova');
    if (!s) { console.error('FALHA: faixa de prova'); process.exit(1); }
    // reaproveita foto, nome e destino dos depoimentos que ja estao na pagina
    const dados = [];
    for (const m of t.matchAll(/<article class="testimonial-card">([\s\S]*?)<\/article>/g)) {
        const h = m[1];
        const texto = (h.match(/<blockquote class="testimonial-text"><p>([\s\S]*?)<\/p><\/blockquote>/) || [])[1];
        const nome = (h.match(/<span class="author-name">([\s\S]*?)<\/span>/) || [])[1];
        const destino = (h.match(/<span class="author-destination">([\s\S]*?)<\/span>/) || [])[1];
        const foto = (h.match(/<img class="author-img"[^>]*src="([^"]+)"/) || [])[1];
        if (texto && nome) dados.push({ texto, nome, destino, foto });
    }
    if (dados.length !== 5) { console.error('FALHA: esperava 5 depoimentos, achei', dados.length); process.exit(1); }

    // frases inteiras, cortadas em ponto final, nunca no meio
    function sentenca(texto, i) {
        const limpo = texto.replace(/^"|"$/g, '');
        const partes = limpo.match(/[^.!?]+[.!?]/g) || [limpo];
        return partes[i].trim();
    }
    const escolha = [
        { c: dados.find(d => /Gabriel/.test(d.nome)), i: 2 },
        { c: dados.find(d => /Joice/.test(d.nome)), i: 3 },
        { c: dados.find(d => /Júlia/.test(d.nome)), i: 0 },
    ];
    if (escolha.some(e => !e.c)) { console.error('FALHA: cliente da faixa nao encontrado'); process.exit(1); }

    const FAIXA = `    <section class="faixa-prova" aria-label="O que os clientes dizem">
        <div class="container faixa-prova-grid">
${escolha.map(e => `            <figure class="prova-mini">
                <img width="800" height="800" loading="lazy" decoding="async" src="${e.c.foto}" alt="${e.c.nome}, cliente da Terra Venture">
                <figcaption>
                    <q>${sentenca(e.c.texto, e.i)}</q>
                    <span class="prova-mini-nome">${e.c.nome}, ${e.c.destino}</span>
                </figcaption>
            </figure>`).join('\n')}
        </div>
    </section>`;
    t = l.trocarSecao(t, 'faixa-prova', FAIXA);
    escolha.forEach(e => console.log('faixa:', e.c.nome, '->', JSON.stringify(sentenca(e.c.texto, e.i))));
}

/* =======================================================================
   3. secao de saidas em grupo sai inteira
   ======================================================================= */
t = l.removerSecao(t, 'saidas');
console.log('secao "Proximas saidas em grupo" removida');

/* =======================================================================
   4. linha de cruzeiros do dossie e o chip correspondente saem
   ======================================================================= */
{
    const i = t.indexOf('<a class="dossie-row flip dossie-sem-foto"');
    const i2 = i === -1 ? t.indexOf('<a class="dossie-row dossie-sem-foto"') : i;
    if (i2 === -1) { console.error('FALHA: linha de cruzeiros'); process.exit(1); }
    const fim = l.bloco(t, i2, 'a');
    const iniLinha = t.lastIndexOf('\n', i2) + 1;
    t = t.slice(0, iniLinha) + t.slice(fim).replace(/^\r?\n/, '');
    troca(`                    <button class="vibe-chip" data-vibe="cruzeiros" type="button" aria-pressed="false">Cruzeiros</button>
`, ``, 'chip de cruzeiros');
    console.log('linha e filtro de cruzeiros removidos do dossie');
}

/* =======================================================================
   5. marcadores sem valor real saem da ficha dos destinos
   ======================================================================= */
{
    const antes = (t.match(/\[__ dias\]|\[R\$ ___\]/g) || []).length;
    t = t.replace(/\s*<span>Dias ideais<b>\[__ dias\]<\/b><\/span>/g, '');
    t = t.replace(/\s*<span>A partir de<b>\[R\$ ___\]<\/b><\/span>/g, '');
    // o lembrete vai para comentario, uma vez so
    troca(`            <div class="dossie-list">`,
`            <!-- TODO(nicholas): quando tiver "dias ideais" e "a partir de" de
                 verdade, eles voltam para dentro de .dossie-meta, junto de Vibe e
                 Melhor época. Tirei os campos vazios porque espaço reservado sem
                 valor parece defeito, nao promessa. -->
            <div class="dossie-list">`, 'lembrete do dossie');
    console.log('marcadores vazios na ficha dos destinos:', antes, '-> 0');
}

/* =======================================================================
   6. [mes/ano] sai dos depoimentos
   ======================================================================= */
{
    const antes = (t.match(/\[mês\/ano\]/g) || []).length;
    t = t.replace(/\s*<span class="depo-data">\[mês\/ano\]<\/span>/g, '');
    t = t.replace(/\s*<span class="author-data">\[mês\/ano\]<\/span>/g, '');
    console.log('marcadores [mês/ano]:', antes, '-> ', (t.match(/\[mês\/ano\]/g) || []).length);
}

/* =======================================================================
   7. copia: a Terra Venture nao faz saida em grupo programada
   ======================================================================= */
troca(`<div class="faq-content"><p>Fazemos roteiros sob medida e também cruzeiros e saídas em grupo com data marcada. Em todos os casos, a gente cuida do planejamento e do suporte.</p></div>`,
`<div class="faq-content"><p>Fazemos roteiros sob medida e também cruzeiros. Em todos os casos, a viagem é montada para quem vai, e a gente cuida do planejamento e do suporte.</p></div>`, 'resposta do FAQ');

l.gravar('index.html', t);

/* =======================================================================
   8. "saidas em grupo" sai das 75 paginas
   ======================================================================= */
{
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let h = fs.readFileSync(fp, 'utf8');
        const o = h;
        h = h.split('Consultoria de viagem sob medida, cruzeiros e saídas em grupo.')
            .join('Consultoria de viagem sob medida e cruzeiros.');
        h = h.split('Consultoria de viagem sob medida, cruzeiros e saídas em grupo, de Ivoti, RS, para clientes de todo o Brasil.')
            .join('Consultoria de viagem sob medida e cruzeiros, de Ivoti, RS, para clientes de todo o Brasil.');
        if (h !== o) { fs.writeFileSync(fp, h, 'utf8'); n++; }
    }
    console.log('paginas sem "saidas em grupo":', n);
}

/* =======================================================================
   9. pagina de cruzeiros: fora os marcadores e os roteiros de exemplo
   ======================================================================= */
{
    let c = l.ler('cruzeiros.html');
    const crc = l.crlf(c);
    const antes = (c.match(/\[__\]|\[R\$ ___\]|\[portos\]|\[Nome do roteiro\]/g) || []).length;
    // as linhas de marcador somem, e o lembrete vira comentario
    c = c.replace(/\s*<p class="cruz-todo">[^<]*<\/p>/g, '');
    c = c.replace(/<!-- TODO\(nicholas\): confirmar os portos de embarque que voce atende -->/,
        '<!-- TODO(nicholas): quando tiver os portos de embarque, acrescente uma frase aqui -->');
    c = c.replace(/<!-- TODO\(nicholas\): confirmar meses e portos de embarque -->/g,
        '<!-- TODO(nicholas): quando tiver meses e portos, acrescente uma frase aqui -->');
    // a secao de roteiros era so marcador
    const s = l.secao(c, 'cruz-roteiros');
    if (!s) { console.error('FALHA: secao de roteiros'); process.exit(1); }
    let fim = s.fim;
    while (c[fim] === '\r' || c[fim] === '\n') fim++;
    c = c.slice(0, s.ini) + crc(`    <!-- TODO(nicholas): aqui ficava uma secao "Exemplos de roteiro" com tres
         cartoes de marcador. Tirei porque so tinha colchete vazio. Me manda
         tres roteiros reais, com noites, portos e o que esta incluso, e eu
         devolvo a secao preenchida. -->

`) + c.slice(fim);
    l.gravar('cruzeiros.html', c);
    console.log('cruzeiros.html: marcadores', antes, '->', (l.ler('cruzeiros.html').match(/\[__\]|\[R\$ ___\]|\[portos\]/g) || []).length);
}

/* =======================================================================
   10. pagina de destinos: fora os 35 "a partir de"
   ======================================================================= */
{
    let d = l.ler('destinos.html');
    const antes = (d.match(/dest-preco/g) || []).length;
    d = d.replace(/\s*<!-- TODO\(nicholas\): os valores de "a partir de" entram aqui, um por\s*\n?\s*destino\. Sao 35 marcadores nesta pagina\. -->/g, '');
    d = d.replace(/\s*<p class="dest-preco">a partir de \[R\$ ___\]<\/p>/g, '');
    l.gravar('destinos.html', d);
    console.log('destinos.html: "a partir de"', antes, '->', (l.ler('destinos.html').match(/dest-preco/g) || []).length);
}

l.conferir('index.html');
l.conferir('cruzeiros.html');
l.conferir('destinos.html');
