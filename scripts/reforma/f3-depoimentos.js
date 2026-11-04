// Fase 3: prova social.
// Os textos dos depoimentos NAO sao redigitados aqui. O script le os que ja
// estao na pagina e so remonta a estrutura em volta, para nao haver risco de
// trocar uma palavra de quem escreveu.
//
// Tres decisoes que valem registro:
// 1. As cinco estrelas de cada card saiam. Eram uma nota numerica que ninguem
//    deu: nenhum cliente avaliou de 1 a 5, foi mensagem de WhatsApp.
// 2. A faixa de prova usa frases inteiras, copiadas sem corte do meio, nao
//    resumos. Encurtar palavra de cliente e reescrever cliente.
// 3. A Zoraia fica de fora da faixa e do destaque, como pedido.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);

/* ---------- 1. extrai os depoimentos que ja estao na pagina ---------- */
const bloco = l.secao(t, 'testimonials');
if (!bloco) throw new Error('secao de depoimentos nao encontrada');

const cards = [];
const reCard = /<div class="testimonial-card[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
let m;
while ((m = reCard.exec(bloco.html)) !== null) {
    const h = m[0];
    const texto = (h.match(/<p class="testimonial-text">([\s\S]*?)<\/p>/) || [])[1];
    const nome = (h.match(/<h4 class="author-name">([\s\S]*?)<\/h4>/) || [])[1];
    const destino = (h.match(/<p class="author-destination">([\s\S]*?)<\/p>/) || [])[1];
    const foto = (h.match(/<img[^>]*src="([^"]+)"/) || [])[1];
    if (texto && nome && destino && foto) cards.push({ texto, nome, destino, foto });
}
if (cards.length !== 6) { console.error('FALHA: esperava 6 depoimentos, achei', cards.length); process.exit(1); }
console.log('depoimentos lidos da pagina:', cards.map(c => c.nome).join(' | '));

const michele = cards.find(c => /Michele/.test(c.nome));
const demais = cards.filter(c => c !== michele);
if (!michele) { console.error('FALHA: depoimento da Michele nao encontrado'); process.exit(1); }

// foto grande (sem "-avatar") para os cards menores
const fotoGrande = f => f.replace('-avatar.webp', '.webp');

/* ---------- 2. secao de depoimentos remontada ---------- */
const cardsHtml = demais.map(c => `                <article class="testimonial-card">
                    <blockquote class="testimonial-text"><p>${c.texto}</p></blockquote>
                    <footer class="testimonial-author">
                        <img class="author-img" width="800" height="800" loading="lazy" decoding="async" src="${fotoGrande(c.foto)}" alt="${c.nome}, cliente da Terra Venture">
                        <span class="author-info">
                            <span class="author-name">${c.nome}</span>
                            <span class="author-destination">${c.destino}</span>
                            <span class="author-data">[mês/ano]</span>
                        </span>
                    </footer>
                </article>`).join('\n');

const DEPOIMENTOS = `    <section class="testimonials" id="depoimentos">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Quem viajou, conta</h2>
                <p class="section-desc">Mensagens que chegaram no WhatsApp depois da volta, publicadas com autorização.</p>
            </div>

            <article class="depo-destaque">
                <figure class="depo-destaque-foto">
                    <img width="1080" height="1350" loading="lazy" decoding="async" src="michele-e-daniel-clientes-paris-londres-destaque.webp" alt="Michele e Daniel lado a lado na calçada em frente ao Moulin Rouge, em Paris">
                </figure>
                <div class="depo-destaque-texto">
                    <blockquote><p>${michele.texto}</p></blockquote>
                    <footer class="depo-assinatura">
                        <span class="depo-nome">${michele.nome}</span>
                        <span class="depo-destino">${michele.destino}</span>
                        <!-- TODO(nicholas): mes e ano da viagem da Michele e do Daniel -->
                        <span class="depo-data">[mês/ano]</span>
                    </footer>
                </div>
            </article>

            <div class="testimonials-grid">
${cardsHtml}
            </div>
        </div>
    </section>`;

t = l.trocarSecao(t, 'testimonials', DEPOIMENTOS);

/* ---------- 3. move a secao para depois de Destinos ---------- */
{
    const s = l.secao(t, 'testimonials');
    let fim = s.fim;
    while (t[fim] === '\r' || t[fim] === '\n') fim++;
    const html = t.slice(s.ini, s.fim);
    t = t.slice(0, s.ini) + t.slice(fim);              // tira de onde estava
    const dest = l.secao(t, 'destinos-editorial');
    if (!dest) throw new Error('destinos nao encontrada');
    let p = dest.fim;
    while (t[p] === '\r' || t[p] === '\n') p++;
    t = t.slice(0, p) + html + cr('\n\n') + t.slice(p);
}

/* ---------- 4. faixa de prova logo abaixo do hero ---------- */
// as frases sao sentencas inteiras, recortadas nos pontos finais, sem edicao
function sentenca(texto, indice) {
    const limpo = texto.replace(/^"|"$/g, '');
    const partes = limpo.match(/[^.!?]+[.!?]/g) || [limpo];
    return partes[indice].trim();
}
const gabriel = demais.find(c => /Gabriel/.test(c.nome));
const joice = demais.find(c => /Joice/.test(c.nome));
if (!gabriel || !joice) { console.error('FALHA: clientes da faixa nao encontrados'); process.exit(1); }
const faixaCards = [
    { c: gabriel, frase: sentenca(gabriel.texto, 2) },
    { c: joice, frase: sentenca(joice.texto, 3) },
];
faixaCards.forEach(f => console.log('faixa:', f.c.nome, '->', JSON.stringify(f.frase)));

const FAIXA_PROVA = `    <section class="faixa-prova" aria-label="Prova social">
        <div class="container faixa-prova-grid">
            <!-- TODO(nicholas): nota e numero de avaliacoes do Google. Nao inventei
                 nenhum dos dois. Enquanto estiverem vazios, o bloco mostra o marcador. -->
            <div class="prova-numero">
                <strong>[_,_]</strong>
                <span>no Google, em [__] avaliações</span>
            </div>
            <!-- TODO(nicholas): quantas viagens a Terra Venture ja atendeu -->
            <div class="prova-numero">
                <strong>[__]</strong>
                <span>viagens atendidas desde novembro de 2025</span>
            </div>
${faixaCards.map(f => `            <figure class="prova-mini">
                <img width="800" height="800" loading="lazy" decoding="async" src="${fotoGrande(f.c.foto)}" alt="${f.c.nome}, cliente da Terra Venture">
                <figcaption>
                    <q>${f.frase}</q>
                    <span class="prova-mini-nome">${f.c.nome}, ${f.c.destino}</span>
                </figcaption>
            </figure>`).join('\n')}
        </div>
    </section>`;

{
    const hero = l.secao(t, 'hero');
    if (!hero) throw new Error('hero nao encontrado');
    let p = hero.fim;
    while (t[p] === '\r' || t[p] === '\n') p++;
    t = t.slice(0, p) + cr(FAIXA_PROVA + '\n\n') + t.slice(p);
}

/* ---------- 5. #ViajeComATerra vira colagem, sem repetir as frases ---------- */
{
    const com = l.secao(t, 'comunidade');
    if (!com) throw new Error('comunidade nao encontrada');
    const itens = [...com.html.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g)]
        .map(x => ({ src: x[1], alt: x[2] }));
    if (itens.length !== 6) { console.error('FALHA: esperava 6 fotos na comunidade, achei', itens.length); process.exit(1); }

    const COMUNIDADE = `    <section class="comunidade" id="comunidade">
        <div class="container">
            <div class="section-header">
                <span class="eyebrow">#ViajeComATerra</span>
                <h2 class="section-title">Quem já foi com a Terra Venture</h2>
                <p class="section-desc">As fotos que os clientes mandaram da viagem. Os depoimentos completos estão logo acima.</p>
            </div>
            <div class="comunidade-grid">
${itens.map(i => `                <figure class="comunidade-item">
                    <img width="800" height="800" loading="lazy" decoding="async" src="${i.src}" alt="${i.alt}">
                </figure>`).join('\n')}
            </div>
            <div class="comunidade-cta">
                <a href="https://instagram.com/terraventureviagens" target="_blank" rel="noopener" class="btn-outline-white">Ver mais no Instagram, @terraventureviagens</a>
            </div>
        </div>
    </section>`;
    t = l.trocarSecao(t, 'comunidade', COMUNIDADE);
}

/* ---------- 6. blocos opcionais, prontos e desligados ---------- */
const OPCIONAIS = `    <!-- ===================================================================
         BLOCOS OPCIONAIS DE PROVA SOCIAL, PRONTOS E DESLIGADOS
         Instrucoes completas em public/README-prova-social.md
         Para ligar: apague as duas linhas de comentario que cercam o bloco e
         coloque os arquivos citados dentro de public/.
         =================================================================== -->
    <!--
    <section class="prints" aria-label="Mensagens de clientes">
        <div class="container">
            <h2 class="section-title">O que chega no WhatsApp</h2>
            <div class="prints-grid">
                <figure class="print-item"><img width="600" height="900" loading="lazy" decoding="async" src="print-cliente-1.webp" alt="Descreva aqui o que a mensagem diz"></figure>
                <figure class="print-item"><img width="600" height="900" loading="lazy" decoding="async" src="print-cliente-2.webp" alt="Descreva aqui o que a mensagem diz"></figure>
                <figure class="print-item"><img width="600" height="900" loading="lazy" decoding="async" src="print-cliente-3.webp" alt="Descreva aqui o que a mensagem diz"></figure>
            </div>
        </div>
    </section>
    -->
    <!--
    <section class="video-cliente" aria-label="Vídeo de cliente">
        <div class="container">
            <h2 class="section-title">Em trinta segundos, por quem viajou</h2>
            <video class="video-cliente-player" controls preload="none" width="1080" height="1920"
                   poster="video-cliente-poster.webp">
                <source src="video-cliente.mp4" type="video/mp4">
                Seu navegador não abre vídeo. <a href="video-cliente.mp4">Baixe o arquivo</a>.
            </video>
            <p class="video-cliente-legenda">Nome do cliente, destino, mês e ano</p>
        </div>
    </section>
    -->

`;
{
    const com = l.secao(t, 'comunidade');
    let p = com.fim;
    while (t[p] === '\r' || t[p] === '\n') p++;
    t = t.slice(0, p) + cr(OPCIONAIS) + t.slice(p);
}

l.gravar('index.html', t);

console.log('estrelas inventadas restantes:', (t.match(/author-rating/g) || []).length);
console.log('cards no grid:', (t.match(/class="testimonial-card"/g) || []).length);
console.log('ordem das secoes:', [...t.matchAll(/<section class="([a-z-]+)/g)].map(x => x[1]).join(' > '));
l.conferir('index.html');
