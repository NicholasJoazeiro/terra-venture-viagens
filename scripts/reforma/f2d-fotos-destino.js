// Fase 2 (continuacao): as quatro fotos de destino viram <figure> com legenda
// de lugar, e os alt saem de uma palavra para uma descricao do que esta na
// imagem. Cada lugar abaixo foi conferido olhando a propria foto.
// O ano fica como TODO: nenhuma das fotos traz essa informacao.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);

const CARDS = [
    {
        src: 'patagonia-torres-del-paine.webp',
        alt: 'As três torres de granito do Paine erguidas acima de um lago glacial turquesa, no sul do Chile',
        legenda: 'Torres del Paine, Chile',
    },
    {
        src: 'dest_santiago_skycostanera.webp',
        alt: 'A torre de vidro do Costanera Center sobre os prédios de Santiago, com a Cordilheira dos Andes atrás',
        legenda: 'Sky Costanera, Santiago',
    },
    {
        src: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'A Torre Eiffel vista dos jardins do Trocadéro, num dia de céu azul com nuvens altas',
        legenda: 'Torre Eiffel, Paris',
    },
    {
        src: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800',
        alt: 'Pagode vermelho de cinco andares em primeiro plano e o monte Fuji coberto de neve ao fundo',
        legenda: 'Monte Fuji, Japão',
    },
];

let trocados = 0;
for (const c of CARDS) {
    // acha a <div class="dossie-media"> que contem esta src, qualquer que seja
    // a ordem dos atributos
    const iSrc = t.indexOf('src="' + c.src + '"');
    if (iSrc === -1) { console.error('FALHA: src nao encontrada:', c.src.slice(0, 50)); process.exit(1); }
    const iAbre = t.lastIndexOf('<div class="dossie-media">', iSrc);
    if (iAbre === -1) { console.error('FALHA: abertura nao encontrada para', c.src.slice(0, 40)); process.exit(1); }
    const iFecha = l.bloco(t, iAbre, 'div');
    if (iFecha === -1) { console.error('FALHA: fechamento nao encontrado'); process.exit(1); }

    let img = t.slice(iAbre, iFecha).match(/<img\b[^>]*>/)[0];
    img = img.replace(/alt="[^"]*"/, 'alt="' + c.alt + '"');

    const novo = cr(`<figure class="dossie-media">
                        ` + img + `
                        <figcaption class="dossie-legenda">` + c.legenda + ` <!-- TODO(nicholas): ano da foto, se souber --></figcaption>
                    </figure>`);
    t = t.slice(0, iAbre) + novo + t.slice(iFecha);
    trocados++;
}

l.gravar('index.html', t);
console.log('cards virados figure com legenda:', trocados);
console.log('figure/figcaption:', (t.match(/<figure/g) || []).length, (t.match(/<figcaption/g) || []).length);
l.conferir('index.html');
