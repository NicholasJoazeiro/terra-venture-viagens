// Fotos de banco de imagem em destaque na home.
//
// O brief dá duas saidas: trocar por foto propria ou de cliente, ou remover.
// Paris tem foto de cliente: a Michele e o Daniel viajaram para la com a
// agencia e o depoimento deles ja abre a secao de depoimentos. Japao nao tem,
// entao sai da home. A pagina /japao continua existindo, com a foto dela.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);

/* ---------- 1. Paris passa a usar a foto dos clientes ---------- */
{
    const i = t.indexOf('pexels-photo-338515');
    if (i === -1) { console.error('FALHA: foto de banco de Paris'); process.exit(1); }
    const iFig = t.lastIndexOf('<figure class="dossie-media">', i);
    const fFig = t.indexOf('</figure>', i) + '</figure>'.length;
    if (iFig === -1 || fFig < iFig) { console.error('FALHA: figure de Paris'); process.exit(1); }
    const NOVO = cr(`<figure class="dossie-media">
                        <img width="800" height="800" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres.webp" alt="Michele e Daniel, clientes da Terra Venture, em frente ao Moulin Rouge, em Paris">
                        <figcaption class="dossie-legenda">Michele e Daniel, clientes, em Paris</figcaption>
                    </figure>`);
    t = t.slice(0, iFig) + NOVO + t.slice(fFig);
    console.log('Paris: foto de banco trocada pela foto dos clientes');
}

/* ---------- 2. a linha do Japao sai da home ---------- */
{
    const i = t.indexOf('pexels-photo-3408353');
    if (i === -1) { console.error('FALHA: foto de banco do Japao'); process.exit(1); }
    const iRow = t.lastIndexOf('<a class="dossie-row', i);
    if (iRow === -1) { console.error('FALHA: linha do Japao'); process.exit(1); }
    const fRow = l.bloco(t, iRow, 'a');
    const iniLinha = t.lastIndexOf('\n', iRow) + 1;
    const TODO = cr(`                <!-- TODO(nicholas): a linha do Japão saiu daqui porque a foto era de
                     banco de imagem, e o brief pede nada de banco em destaque. A
                     página /japao continua no ar. Me manda uma foto sua ou de
                     cliente no Japão e eu devolvo a linha. -->
`);
    t = t.slice(0, iniLinha) + TODO + t.slice(fRow).replace(/^\r?\n/, '');
    console.log('Japão: linha removida da home');
}

/* ---------- 3. a contagem no titulo acompanha ---------- */
{
    const n = (t.match(/<a class="dossie-row/g) || []).length;
    const NOMES = { 1: 'Um destino', 2: 'Dois destinos', 3: 'Três destinos', 4: 'Quatro destinos', 5: 'Cinco destinos', 6: 'Seis destinos' };
    const m = t.match(/<h2 class="de-title">([^<]*)<\/h2>/);
    if (!m) { console.error('FALHA: titulo dos destinos'); process.exit(1); }
    const novo = (NOMES[n] || n + ' destinos') + ' com dossiê pronto';
    t = t.replace(m[0], '<h2 class="de-title">' + novo + '</h2>');
    console.log('linhas no dossiê:', n, '| titulo:', novo);
}

/* ---------- 4. a alternancia de lado e as alturas acompanham ---------- */
{
    const iLista = t.indexOf('<div class="dossie-list">');
    const fimLista = l.bloco(t, iLista, 'div');
    let lista = t.slice(iLista, fimLista);
    let k = 0;
    lista = lista.replace(/class="dossie-row[^"]*"/g, () => 'class="dossie-row' + ((k++ % 2) ? ' flip' : '') + '"');
    t = t.slice(0, iLista) + lista + t.slice(fimLista);
}

l.gravar('index.html', t);
const sobra = (l.ler('index.html').replace(/<!--[\s\S]*?-->/g, '').match(/images\.(pexels|unsplash)\.com/g) || []).length;
console.log('imagens de banco restantes na home:', sobra);
l.conferir('index.html');
