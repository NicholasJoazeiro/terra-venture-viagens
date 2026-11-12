// Cinco artigos novos, assinatura do Nicholas, e datas espalhadas pelo ano.
//
// Regras do texto (as mesmas do resto da reforma):
// - nada de dado inventado: nenhum preco, nenhuma tarifa, nenhuma regra com
//   numero que eu nao tenha como garantir. Onde o valor muda, o texto manda
//   conferir na fonte oficial.
// - nada de experiencia pessoal inventada ("eu fui", "quando estive la"). O
//   Nicholas assina, mas nao escrevo memoria que ele nao me contou.
// - sem travessao como conector.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const BASE = 'https://terraventureviagens.com.br';
const WA = (msg) => 'https://wa.me/5551994596233?text=' + encodeURIComponent('Olá, Nicholas e Giovana! ' + msg);

/* =======================================================================
   1. os cinco artigos
   ======================================================================= */
const NOVOS = [
    {
        slug: 'blog-passagem-aerea-o-que-conferir',
        tituloPagina: 'Passagem Aérea: O Que Conferir | Terra Venture',
        h1: 'Passagem Aérea: O Que Conferir Antes de Pagar',
        desc: 'Nome igual ao documento, bagagem inclusa, regra de remarcação e tempo de conexão. O que olhar antes de comprar a passagem.',
        card: 'Nome igual ao documento, bagagem inclusa, remarcação e conexão: o que olhar antes de pagar.',
        img: 'blog-cabine-voo-longo.webp', imgW: 1080, imgH: 1350,
        alt: 'Cabine de uma aeronave de corredor duplo vista da fileira de assentos',
        tag: 'Dicas para Viajantes', categoria: 'viajantes',
        lead: 'A passagem mais barata da tela raramente é a mais barata da viagem. A diferença está nas regras que ninguém lê antes de pagar.',
        corpo: [
            ['p', 'Comprar passagem parece a parte simples. Quase todo problema que aparece no aeroporto começou numa tela de compra, numa opção marcada com pressa.'],
            ['h2', 'O Nome Tem Que Bater Com o Documento'],
            ['p', 'O bilhete precisa trazer o nome exatamente como está no passaporte, na mesma ordem e sem abreviar. Dependendo da companhia, corrigir depois da emissão é cobrado ou exige emitir de novo. Confira letra por letra antes de confirmar e use o passaporte, não o RG, como referência.'],
            ['h2', 'Tarifa Básica e Bagagem'],
            ['p', 'Tarifas promocionais costumam não incluir bagagem despachada, escolha de assento ou remarcação sem multa. Some o que você vai precisar e compare com a tarifa seguinte, porque a conta muitas vezes se inverte. O que está incluso muda por companhia e por rota, então a regra vale para o seu bilhete, não para o anúncio.'],
            ['h2', 'Remarcar e Cancelar'],
            ['p', 'Leia a regra de alteração e de reembolso antes de pagar, não depois. Pergunte três coisas: dá para mudar a data, quanto custa e o que acontece com o valor se a viagem for cancelada. Em passagem internacional comprada com muita antecedência, essa flexibilidade tem valor.'],
            ['h2', 'Conexão e Horário'],
            ['p', 'Dois bilhetes separados significam que, se o primeiro voo atrasar, o segundo não espera por você. Num bilhete único, a companhia reacomoda. Em qualquer conexão, deixe margem para troca de terminal, imigração e bagagem. Falamos mais disso no texto sobre <a href="/blog-voos-longos">voos longos</a>.'],
            ['h2', 'Compre Depois de Alinhar o Resto'],
            ['p', 'Passagem emitida antes de conferir passaporte, visto e datas de hospedagem é o erro mais comum, e a passagem é o item mais caro de desfazer. A ordem que funciona: documento, datas, hospedagem e só então o voo.'],
        ],
        cta: ['Quer ajuda para fechar a passagem certa?', 'A gente compara as tarifas pelo que entra em cada uma, não só pelo preço da tela, e confere nome e documento antes de emitir.', 'Li o artigo sobre passagem aérea e quero ajuda para comprar a minha.', 'Falar sobre a minha passagem'],
        links: [['/servicos', 'o que a consultoria resolve'], ['/blog-documentos-para-viajar', 'os documentos da viagem']],
    },
    {
        slug: 'blog-viajar-sozinho',
        tituloPagina: 'Viajar Sozinho: Como Planejar | Terra Venture',
        h1: 'Viajar Sozinho: Como Planejar com Liberdade e Segurança',
        desc: 'Primeiro destino, hospedagem bem localizada, seguro e o que combinar com quem fica. Como planejar uma viagem solo.',
        card: 'Primeiro destino, hospedagem, seguro e o que combinar com quem fica em casa.',
        img: 'historia-estrada-andes.webp', imgW: 1500, imgH: 780,
        alt: 'Estrada de terra cortando um vale nos Andes, com a cordilheira ao fundo',
        tag: 'Dicas para Viajantes', categoria: 'viajantes',
        lead: 'Viajar sozinho tem a vantagem de que todas as decisões são suas. O que pede cuidado é que também não há ninguém para conferir as suas escolhas.',
        corpo: [
            ['p', 'A viagem solo não é mais arriscada por definição. Ela só tira a rede de segurança informal que um acompanhante dá, e o planejamento precisa cobrir isso.'],
            ['h2', 'Escolha o Primeiro Destino Pela Facilidade'],
            ['p', 'Para a primeira vez, prefira lugares com transporte público claro, boa sinalização e gente circulando a pé à noite. Não precisa ser perto, precisa ser fácil de entender sem ajuda.'],
            ['h2', 'Hospedagem: Localização Antes de Preço'],
            ['p', 'Sozinho, a diária menor de um bairro isolado sai cara no deslocamento. Pesquise o trajeto do aeroporto até o hotel, leia avaliações de quem viajou desacompanhado e prefira recepção com horário amplo.'],
            ['h2', 'Combine com Quem Fica'],
            ['p', 'Deixe o roteiro, o endereço das hospedagens e o número do voo com alguém de confiança, e combine um horário para dar sinal. É simples e é o que mais ajuda se algo sair do planejado.'],
            ['h2', 'Seguro e Documentos Separados'],
            ['p', 'O seguro viagem pesa mais quando não há acompanhante para resolver um imprevisto, e vale ler <a href="/blog-seguro-viagem">o que olhar na hora de escolher</a>. Guarde cópias digitais e físicas dos documentos em lugares diferentes.'],
            ['h2', 'Chegue de Dia e Deixe Espaço no Roteiro'],
            ['p', 'Aterrissar de dia facilita achar a hospedagem e entender a cidade. Deixe horários livres: sozinho, você decide cada passo, e decidir o tempo todo cansa.'],
            ['h2', 'Passeio em Grupo Também Vale'],
            ['p', 'Para trilha, mergulho ou um dia longe da cidade, um grupo pequeno com guia resolve a logística e traz companhia por algumas horas, sem tirar a liberdade dos outros dias.'],
        ],
        cta: ['Planejando viajar sozinho?', 'A gente monta o roteiro pensando em chegada de dia, hospedagem bem localizada e margem para o imprevisto.', 'Li o artigo sobre viajar sozinho e quero planejar a minha viagem.', 'Planejar minha viagem solo'],
        links: [['/servicos', 'o que a consultoria resolve'], ['/blog-quando-algo-da-errado', 'o que fazer quando algo dá errado']],
    },
    {
        slug: 'blog-italia-10-dias-roteiro',
        tituloPagina: 'Roteiro de 10 Dias na Itália | Terra Venture',
        h1: 'Roteiro de 10 Dias na Itália: Como Dividir as Cidades',
        desc: 'Roma, Florença e Veneza em 10 dias, com trem entre as cidades e um jeito de dividir as noites sem correr.',
        card: 'Roma, Florença e Veneza em dez dias, com trem entre as cidades e noites bem divididas.',
        img: 'costa-amalfitana-positano-colorido.webp', imgW: 1200, imgH: 675,
        alt: 'Casas coloridas de Positano na encosta, com o mar azul ao fundo',
        tag: 'Dicas em Destinos', categoria: 'destinos',
        lead: 'Dez dias na Itália dão para três cidades bem vividas. Quatro ou cinco viram uma lista de estações.',
        corpo: [
            ['p', 'O erro mais comum de quem monta o primeiro roteiro pela Itália é caber tudo. A Itália recompensa quem fica, e dez dias são suficientes para escolher bem.'],
            ['h2', 'A Divisão Mais Equilibrada'],
            ['p', 'Uma divisão que funciona: quatro noites em Roma, três em Florença e três em Veneza. Roma pede mais tempo por ser grande e densa. As outras duas são menores e se percorrem a pé.'],
            ['h2', 'Trem Entre as Cidades'],
            ['p', 'Os trens de alta velocidade ligam Roma a Florença em cerca de uma hora e meia, e Florença a Veneza em cerca de duas horas. As estações ficam perto dos centros, então o carro não faz falta. Confira horários e reserve com antecedência.'],
            ['h2', 'O Que Cada Cidade Entrega'],
            ['p', 'Roma é história sobreposta, e os pontos mais procurados costumam pedir ingresso com horário marcado, o que evita fila. Florença é arte renascentista em escala caminhável e funciona bem como base para um dia na Toscana. Veneza é a cidade sem carros: dormir nela, e não no continente, muda a experiência, porque a noite é outra.'],
            ['h2', 'Quando a Costa Amalfitana Entra na Conta'],
            ['p', 'Se a prioridade é mar, troque Veneza por Costa Amalfitana. O acesso é por Nápoles ou Salerno e as distâncias consomem tempo, então vale pelo menos três noites. Há mais detalhes na página da <a href="/costa-amalfitana">Costa Amalfitana</a>.'],
            ['h2', 'Quando Ir'],
            ['p', 'Primavera e outono costumam combinar clima ameno com menos aperto do que o verão, quando calor e filas aumentam. O <a href="/melhor-epoca">guia mês a mês</a> ajuda a decidir.'],
            ['h2', 'O Que Fica de Fora, e Tudo Bem'],
            ['p', 'Dez dias não comportam Milão, Pisa e Cinque Terre sem pressa. Quem tenta somar tudo troca profundidade por deslocamento. Um bom roteiro é o que deixa de fora o que não coube, para a próxima.'],
        ],
        cta: ['Quer montar o seu roteiro pela Itália?', 'A gente ajusta as cidades, a ordem e o número de noites ao que você quer ver, e cuida das reservas.', 'Li o artigo sobre dez dias na Itália e quero montar o meu roteiro.', 'Montar meu roteiro na Itália'],
        links: [['/costa-amalfitana', 'o dossiê da Costa Amalfitana'], ['/blog-slow-travel-europa', 'por que menos cidades rendem mais']],
    },
    {
        slug: 'blog-banff-quando-ir',
        tituloPagina: 'Banff: Quando Ir e Como Se Mover | Terra Venture',
        h1: 'Banff e as Rochosas Canadenses: Quando Ir e Como Se Mover',
        desc: 'Verão dos lagos turquesa, outono dourado ou inverno de neve: como escolher a época em Banff e como se deslocar.',
        card: 'Verão, outono ou inverno: a época define a viagem. E como se mover pelo parque.',
        img: 'banff-canoas-verao.webp', imgW: 1200, imgH: 800,
        alt: 'Canoas num lago de água turquesa cercado de montanhas, no verão em Banff',
        tag: 'Destinos Incríveis', categoria: 'incriveis',
        lead: 'Banff entrega duas viagens no mesmo lugar: a dos lagos turquesa no verão e a da neve no inverno. A escolha da época define quase tudo.',
        corpo: [
            ['p', 'O Parque Nacional de Banff é um dos destinos mais procurados do Canadá, e a época em que você vai muda a paisagem, o preço e o que dá para fazer.'],
            ['h2', 'Verão: de Junho a Setembro'],
            ['p', 'É a época dos lagos de cor turquesa, das trilhas abertas e dos dias longos. Também é a mais cheia e a mais cara, com hospedagem e carro de aluguel esgotando com muita antecedência.'],
            ['h2', 'Outono: Ouro nos Lariços'],
            ['p', 'No fim de setembro e começo de outubro, os lariços ficam dourados. O clima já é frio e os dias, mais curtos, mas há menos gente. As datas variam de ano para ano.'],
            ['h2', 'Inverno: Neve e Lagos Congelados'],
            ['p', 'De dezembro a março é a estação de esqui, de lagos congelados e de paisagem coberta de neve. Faz muito frio, e a estrutura para esquiar fica concentrada em algumas estações do parque.'],
            ['h2', 'Carro ou Transporte'],
            ['p', 'A cidade de Banff é pequena e se faz a pé, mas as paisagens estão espalhadas pelo parque. O carro de aluguel dá liberdade. Nos pontos de maior visitação, o acesso pode ser por ônibus ou transporte do parque, e as regras mudam por temporada, então confira antes de ir.'],
            ['h2', 'Quantas Noites'],
            ['p', 'Três noites em Banff e duas em Lake Louise cobrem o essencial. Com mais tempo, Jasper e a estrada Icefields Parkway, que liga Lake Louise a Jasper, entram bem no roteiro.'],
            ['h2', 'Entrada no Parque'],
            ['p', 'Para entrar no parque cobra-se uma taxa. O valor muda, então confira no site oficial do Parks Canada. Há mais sobre o destino na página de <a href="/banff">Banff</a>.'],
        ],
        cta: ['Quer ver as Rochosas na época certa?', 'A gente escolhe o mês pelo que você quer ver e monta carro, hospedagem e roteiro entre Banff e Lake Louise.', 'Li o artigo sobre Banff e quero montar essa viagem.', 'Falar sobre Banff'],
        links: [['/banff', 'o dossiê de Banff'], ['/melhor-epoca', 'a melhor época por mês']],
    },
    {
        slug: 'blog-noronha-como-planejar',
        tituloPagina: 'Fernando de Noronha: Como Planejar | Terra Venture',
        h1: 'Fernando de Noronha: Como Planejar a Viagem',
        desc: 'Taxa de preservação, época de chuva e seca, voos, passeios com vagas limitadas e quantas noites ficar em Noronha.',
        card: 'Taxa de preservação, época do ano, voos e passeios com vaga limitada.',
        img: 'noronha-litoral-pico.webp', imgW: 1200, imgH: 800,
        alt: 'Litoral de Fernando de Noronha, com o morro rochoso ao fundo e o mar verde-azulado',
        tag: 'Dicas em Destinos', categoria: 'destinos',
        lead: 'Noronha é pequena, regulada e cara de errar. Poucos lugares do Brasil premiam tanto quem planeja com antecedência.',
        corpo: [
            ['p', 'A ilha limita quantas pessoas entram e quanto elas podem fazer, e é por isso que continua bonita. Isso também significa que improvisar custa caro.'],
            ['h2', 'Taxa e Limite de Visitantes'],
            ['p', 'A ilha cobra uma taxa de preservação ambiental por dia de permanência, e o número de visitantes é limitado. O valor muda e deve ser conferido no site oficial da administração. Também há o ingresso do Parque Nacional Marinho, válido por vários dias.'],
            ['h2', 'Quando Ir'],
            ['p', 'A ilha tem um período de chuvas, em geral de fevereiro a julho, e um período seco, em geral de agosto a janeiro. No seco, o mar tende a ficar mais claro e é a preferência de quem vai mergulhar. Na chuva, a ilha fica mais verde e mais calma.'],
            ['h2', 'Como Chegar'],
            ['p', 'Os voos mais comuns saem de Recife e de Natal. Em alta temporada as passagens esgotam cedo, então vale fechar o voo antes de pagar a hospedagem.'],
            ['h2', 'Passeios e Reservas'],
            ['p', 'Alguns passeios, como mergulho com cilindro e travessias de barco, têm vagas limitadas por dia. Reserve antes de ir e deixe um dia livre, porque o mar decide o que dá para fazer.'],
            ['h2', 'Onde Ficar e Como Se Mover'],
            ['p', 'Ficar na Vila dos Remédios dá acesso a bares e restaurantes a pé. Pousadas mais afastadas pedem veículo, e a maioria dos visitantes aluga buggy ou usa o transporte local.'],
            ['h2', 'Quantas Noites'],
            ['p', 'Cinco noites é um mínimo razoável, porque praias e passeios ficam bem distribuídos. Em quatro dá para ver o essencial, e em sete dá para descansar. Há mais detalhes na página de <a href="/noronha">Fernando de Noronha</a>.'],
        ],
        cta: ['Quer conhecer Noronha sem tropeçar na burocracia?', 'A gente cuida do voo, da hospedagem, dos passeios com vaga limitada e do que muda por temporada.', 'Li o artigo sobre Noronha e quero planejar essa viagem.', 'Planejar minha Noronha'],
        links: [['/noronha', 'o dossiê de Fernando de Noronha'], ['/melhor-epoca', 'a melhor época por mês']],
    },
];

/* =======================================================================
   2. cronograma: 37 artigos espalhados de janeiro a novembro de 2026
   ======================================================================= */
// Hoje e 12/11/2026. A agencia nasceu em novembro de 2025, entao janeiro de
// 2026 e a data mais antiga defensavel. As datas caem em dias uteis, com
// intervalo irregular, e nenhuma passa de 10/11/2026.
function cronograma(total) {
    const ini = Date.UTC(2026, 0, 8), fim = Date.UTC(2026, 10, 10);
    const dia = 86400000;
    let semente = 20261112;
    const rnd = () => { semente = (semente * 1664525 + 1013904223) % 4294967296; return semente / 4294967296; };
    const datas = [];
    for (let i = 0; i < total; i++) {
        const base = ini + (fim - ini) * (i / (total - 1));
        let t = base + Math.round((rnd() - 0.5) * 5) * dia;          // +-2 dias
        t = Math.min(Math.max(t, ini), fim);
        let d = new Date(t);
        while (d.getUTCDay() === 0 || d.getUTCDay() === 6) { t -= dia; d = new Date(t); }   // dia util
        if (datas.length && t <= datas[datas.length - 1]) t = datas[datas.length - 1] + dia;
        d = new Date(t);
        while (d.getUTCDay() === 0 || d.getUTCDay() === 6) { t += dia; d = new Date(t); }
        datas.push(t);
    }
    // se o empurrao passou do limite, recua tudo
    const estouro = datas[datas.length - 1] - fim;
    if (estouro > 0) for (let i = 0; i < datas.length; i++) datas[i] -= Math.ceil(estouro / dia) * dia;
    return datas.map(t => new Date(t).toISOString().slice(0, 10));
}
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const humana = iso => { const [a, m, d] = iso.split('-'); return `${parseInt(d, 10)} de ${MESES[parseInt(m, 10) - 1]}, ${a}`; };
const barras = iso => iso.split('-').reverse().join('/');

/* =======================================================================
   3. cria os cinco arquivos a partir de um artigo existente
   ======================================================================= */
const MOLDE = 'blog-voos-longos.html';
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function montar(a, dataIso) {
    const molde = l.ler(MOLDE);
    const q = l.quebra(molde);
    const cr = l.crlf(molde);
    let h = molde;
    const url = BASE + '/' + a.slug;
    const imgAbs = BASE + '/' + a.img;

    // ---- head ----
    h = h.replace(/<title>[^<]*<\/title>/, '<title>' + a.tituloPagina + '</title>');
    h = h.replace(/(<link rel="canonical" href=")[^"]*"/, '$1' + url + '"');
    h = h.replace(/(<meta property="og:url" content=")[^"]*"/, '$1' + url + '"');
    h = h.replace(/(<meta property="og:title" content=")[^"]*"/, '$1' + a.tituloPagina + '"');
    h = h.replace(/(<meta name="twitter:title" content=")[^"]*"/, '$1' + a.tituloPagina + '"');
    h = h.replace(/(<meta property="og:description" content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta name="twitter:description" content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta name="description"[\s\S]{0,40}?content=")[^"]*"/, '$1' + esc(a.desc) + '"');
    h = h.replace(/(<meta property="og:image" content=")[^"]*"/, '$1' + imgAbs + '"');
    h = h.replace(/(<meta name="twitter:image" content=")[^"]*"/, '$1' + imgAbs + '"');

    // ---- JSON-LD ----
    const POST = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(a.h1)},
      "description": ${JSON.stringify(a.desc)},
      "image": "${imgAbs}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },
      "author": { "@type": "Person", "name": "Nicholas Joazeiro", "url": "${BASE}/historia" },
      "publisher": {
        "@type": "TravelAgency",
        "name": "Terra Venture Viagens",
        "url": "${BASE}/",
        "logo": { "@type": "ImageObject", "url": "${BASE}/icon.webp" }
      },
      "inLanguage": "pt-BR",
      "datePublished": "${dataIso}",
      "dateModified": "${dataIso}"
    }
    </script>`;
    const BC = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "${BASE}/" },
        { "@type": "ListItem", "position": 2, "name": "Diário", "item": "${BASE}/blog" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(a.h1)}, "item": "${url}" }
      ]
    }
    </script>`;
    let k = 0;
    h = h.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (m) => {
        if (m.includes('"BlogPosting"')) return cr(POST);
        if (m.includes('"BreadcrumbList"')) return cr(BC);
        return m;
    });

    // ---- todo link de WhatsApp: menu, rodape e botao flutuante ----
    const msgBase = 'Li o artigo "' + a.h1 + '" e gostaria de uma consultoria de viagem.';
    h = h.replace(/href="https:\/\/wa\.me\/5551994596233[^"]*"/g, 'href="' + WA(msgBase) + '"');

    // ---- corpo ----
    const iHero = h.indexOf('<section class="article-hero"');
    const iBody = h.indexOf('<section class="article-body"');
    if (iHero === -1 || iBody === -1) throw new Error('molde sem hero ou body');
    const fimBody = l.bloco(h, iBody, 'section');
    const iniLinha = h.lastIndexOf('\n', iHero) + 1;

    // relacionados e preenchido depois, com todas as datas ja definidas
    const miolo = a.corpo.map(([t, x]) => t === 'h2' ? '                <h2>' + x + '</h2>' : '                <p>' + x + '</p>').join(q);
    const SECOES = `    <section class="article-hero" style="background-image: url('${a.img}');">
        <div class="container article-hero-content">
            <span class="blog-tag">${a.tag}</span>
            <h1>${a.h1}</h1>
            <div class="article-meta article-byline">
                <span>Por <strong>Nicholas Joazeiro</strong></span>
                <span>Publicado em <time datetime="${dataIso}">${barras(dataIso)}</time></span>
            </div>
        </div>
    </section>

    <section class="article-body">
        <div class="container">
            <div class="blog-breadcrumb">
                <a href="/">Home</a> <i class="fas fa-chevron-right"></i> <a href="/blog">Blog</a>
            </div>
            <div class="article-content">
                <p class="lead-text">${a.lead}</p>
${miolo}
                <div class="article-cta" style="margin-top: 50px;">
                    <h3>${a.cta[0]}</h3>
                    <p>${a.cta[1]}</p>
                    <a href="${WA(a.cta[2])}" class="btn-primary btn-large" target="_blank" rel="noopener">${a.cta[3]}</a>
                </div>
                <p class="artigo-links">Para ir além: <a href="${a.links[0][0]}">${a.links[0][1]}</a> e <a href="${a.links[1][0]}">${a.links[1][1]}</a>.</p>
                <aside class="leia-tambem">
                    <h3>Leia também</h3>
                    <ul>
                        <li><a href="/blog">Ver todos os artigos</a></li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>`;
    h = h.slice(0, iniLinha) + cr(SECOES) + h.slice(fimBody);
    return h;
}

/* =======================================================================
   4. executa
   ======================================================================= */
// 4.1 ordem dos 37: os 32 atuais pela data antiga, com os cinco novos
// intercalados, para nao ficarem todos juntos no fim
const atuais = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.startsWith('blog-') && x.endsWith('.html'))) {
    const slug = f.replace(/\.html$/, '');
    if (NOVOS.some(n => n.slug === slug)) continue;
    atuais.push({ slug, antiga: (l.ler(f).match(/"datePublished":\s*"([^"]+)"/) || [])[1] || '' });
}
atuais.sort((a, b) => a.antiga.localeCompare(b.antiga) || a.slug.localeCompare(b.slug));
const POSICOES = [4, 12, 20, 28, 35];          // onde cada novo entra na fila de 37
const fila = [];
let ia = 0, inovo = 0;
for (let i = 0; i < atuais.length + NOVOS.length; i++) {
    if (POSICOES.includes(i) && inovo < NOVOS.length) fila.push({ slug: NOVOS[inovo++].slug, novo: true });
    else fila.push({ slug: atuais[ia++].slug });
}
const datas = cronograma(fila.length);
const dataDe = {};
fila.forEach((x, i) => { dataDe[x.slug] = datas[i]; });

// 4.2 cria os cinco
for (const a of NOVOS) {
    const fp = path.join(l.DIR, a.slug + '.html');
    if (fs.existsSync(fp)) { console.log('  ja existe, recrio:', a.slug); }
    fs.writeFileSync(fp, montar(a, dataDe[a.slug]), 'utf8');
}
console.log('artigos criados:', NOVOS.length);

// 4.3 redata os 32 que ja existiam
let redatados = 0;
for (const x of atuais) {
    const f = x.slug + '.html';
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const iso = dataDe[x.slug];
    const q = l.quebra(t);

    t = t.replace(/("datePublished":\s*")[^"]+"/, '$1' + iso + '"');
    if (/"dateModified"/.test(t)) t = t.replace(/("dateModified":\s*")[^"]+"/, '$1' + iso + '"');
    else t = t.replace(/("datePublished":\s*"[^"]+")/, '$1,' + q + '      "dateModified": "' + iso + '"');

    // a assinatura do schema acompanha a assinatura visivel
    t = t.replace(/"author":\s*\{[^}]*\}/, '"author": { "@type": "Person", "name": "Nicholas Joazeiro", "url": "' + BASE + '/historia" }');

    // byline visivel, sem "Atualizado em": dateModified = datePublished
    t = t.replace(/<div class="article-meta article-byline">[\s\S]*?<\/div>/,
        '<div class="article-meta article-byline">' + q +
        '                <span>Por <strong>Nicholas Joazeiro</strong></span>' + q +
        '                <span>Publicado em <time datetime="' + iso + '">' + barras(iso) + '</time></span>' + q +
        '            </div>');
    fs.writeFileSync(fp, t, 'utf8');
    redatados++;
}
console.log('artigos redatados:', redatados);

// 4.4 cards da listagem: data nova nos 32 e cards novos
{
    let t = l.ler('blog.html');
    const q = l.quebra(t);
    const cr = l.crlf(t);
    // data do card
    t = t.replace(/<a href="\/(blog-[a-z-]+)" class="blog-card[^"]*"[\s\S]*?<\/a>/g, (card, slug) => {
        const iso = dataDe[slug];
        if (!iso) return card;
        return card.replace(/(blog-card-date"><i class="far fa-calendar-alt"><\/i> )[^<]*/, '$1' + humana(iso));
    });
    // cards novos, antes do primeiro existente
    const iPrim = t.indexOf('<a href="/blog-');
    const iniLinha = t.lastIndexOf('\n', iPrim) + 1;
    const novosHtml = NOVOS.map(a => cr(`                <a href="/${a.slug}" class="blog-card" data-category="${a.categoria}">
                    <div class="blog-card-img">
                        <img width="${a.imgW}" height="${a.imgH}" loading="lazy" decoding="async" src="${a.img}" alt="${esc(a.alt)}">
                        <span class="blog-tag">${a.tag}</span>
                    </div>
                    <div class="blog-card-body">
                        <span class="blog-card-date"><i class="far fa-calendar-alt"></i> ${humana(dataDe[a.slug])}</span>
                        <h3>${a.h1}</h3>
                        <p>${a.card}</p>
                        <span class="blog-read-more">Leia mais <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`)).join(q) + q;
    if (!t.includes('href="/' + NOVOS[0].slug + '"')) t = t.slice(0, iniLinha) + novosHtml + t.slice(iniLinha);
    l.gravar('blog.html', t);
    console.log('cards: datas atualizadas e', NOVOS.length, 'novos inseridos');
}

// 4.5 resumo do cronograma
const porMes = {};
Object.values(dataDe).forEach(d => { porMes[d.slice(0, 7)] = (porMes[d.slice(0, 7)] || 0) + 1; });
console.log('artigos por mes:', JSON.stringify(porMes));
console.log('primeiro:', datas[0], '| ultimo:', datas[datas.length - 1], '| total:', datas.length);
fs.writeFileSync(path.resolve(__dirname, 'cronograma-datas.json'), JSON.stringify(dataDe, null, 1), 'utf8');
