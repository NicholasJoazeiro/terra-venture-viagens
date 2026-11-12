// Blog: CTA ligado ao tema, links internos, "Leia tambem", byline visivel,
// ordem da listagem e titulos encurtados.
//
// Os 32 artigos terminavam todos com o mesmo bloco: "Gostou das dicas? Fale
// com a Terra Venture" e um botao para /#contato. CTA generico no fim de um
// texto especifico e desperdicio: quem leu sobre documento quer resolver
// documento, nao "comecar um roteiro".
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const WA = (msg) => 'https://wa.me/5551994596233?text=' +
    encodeURIComponent('Olá, Nicholas e Giovana! ' + msg);

// Para cada artigo: titulo e texto do CTA, o que a mensagem do WhatsApp diz, e
// dois links internos com ancora descritiva.
const MAPA = {
    'blog-amalfitana-de-barco': { t: 'Quer ver a Costa Amalfitana do mar?', p: 'A gente monta o roteiro de barco, com as paradas e os horários que fazem a diferença.', m: 'Li o artigo sobre a Costa Amalfitana de barco e quero montar esse roteiro.', b: 'Montar meu roteiro na Amalfitana', links: [['/costa-amalfitana', 'o dossiê da Costa Amalfitana'], ['/melhor-epoca', 'a melhor época para ir à Itália']] },
    'blog-arrumar-mala-inverno': { t: 'Viagem de neve à vista?', p: 'A gente ajuda com a lista do que levar e com o resto da viagem, do voo ao transfer.', m: 'Li o artigo sobre mala de inverno e quero planejar uma viagem de neve.', b: 'Planejar minha viagem de neve', links: [['/courchevel', 'o dossiê de Courchevel'], ['/alpes-suicos', 'os Alpes Suíços']] },
    'blog-aurora-boreal-islandia': { t: 'Quer ver a aurora com data certa?', p: 'A janela de aurora é curta e muda a cada ano. A gente acerta a data antes de você comprar passagem.', m: 'Li o artigo sobre a aurora boreal e quero planejar essa viagem.', b: 'Falar sobre a Islândia', links: [['/islandia', 'o dossiê da Islândia'], ['/laponia', 'a Lapônia, outra opção de aurora']] },
    'blog-balao-capadocia': { t: 'Quer subir de balão na Capadócia?', p: 'O voo depende do clima e lota meses antes. A gente reserva e monta o resto em volta.', m: 'Li o artigo sobre o balão na Capadócia e quero essa viagem.', b: 'Falar sobre a Capadócia', links: [['/capadocia', 'o dossiê da Capadócia'], ['/melhor-epoca', 'quando o céu da Capadócia colabora']] },
    'blog-chapada-dos-veadeiros': { t: 'Vai para a Chapada?', p: 'A gente resolve hospedagem, guia e transfer, e você só caminha.', m: 'Li o artigo sobre a Chapada dos Veadeiros e quero planejar a viagem.', b: 'Planejar minha Chapada', links: [['/servicos', 'o que entra numa consultoria'], ['/destinos', 'outros destinos no Brasil']] },
    'blog-dinheiro-na-viagem': { t: 'Quer saber quanto levar na sua viagem?', p: 'Câmbio, cartão e reserva de emergência mudam por destino. A gente faz essa conta com você.', m: 'Li o artigo sobre dinheiro na viagem e quero ajuda para planejar o orçamento.', b: 'Falar sobre orçamento de viagem', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-seguro-viagem', 'como escolher o seguro viagem']] },
    'blog-documentos-para-viajar': { t: 'Quer que a gente confira a documentação da sua viagem?', p: 'Passaporte, visto, autorização de menor e vacina. A gente monta a lista do seu roteiro antes de você comprar passagem.', m: 'Li o artigo sobre documentos e quero que vocês confiram a documentação da minha viagem.', b: 'Conferir meus documentos', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-seguro-viagem', 'o que olhar no seguro viagem']] },
    'blog-esqui-courchevel': { t: 'Quer esquiar em Courchevel?', p: 'Escola, aluguel de equipamento, transfer de Genebra e hospedagem na pista certa.', m: 'Li o artigo sobre Courchevel e quero montar essa viagem.', b: 'Falar sobre Courchevel', links: [['/courchevel', 'o dossiê de Courchevel'], ['/blog-arrumar-mala-inverno', 'como arrumar a mala para a neve']] },
    'blog-expresso-do-oriente': { t: 'Quer viajar de trem de luxo?', p: 'Trecho, cabine e as noites antes e depois do embarque. A gente monta a viagem inteira em volta do trem.', m: 'Li o artigo sobre os trens de luxo e quero saber como funciona.', b: 'Falar sobre trens de luxo', links: [['/servicos', 'o que a consultoria resolve'], ['/destinos', 'os destinos com dossiê pronto']] },
    'blog-gastronomia-san-sebastian': { t: 'Quer comer bem em San Sebastián?', p: 'Reserva de estrela Michelin abre com meses de antecedência. A gente cuida disso e do roteiro em volta.', m: 'Li o artigo sobre San Sebastián e quero montar uma viagem gastronômica.', b: 'Falar sobre a viagem gastronômica', links: [['/servicos', 'o que entra numa consultoria'], ['/melhor-epoca', 'quando ir ao norte da Espanha']] },
    'blog-glamping-atacama': { t: 'Quer dormir sob o céu do Atacama?', p: 'As melhores hospedagens do deserto têm poucos quartos e enchem cedo.', m: 'Li o artigo sobre glamping no Atacama e quero planejar essa viagem.', b: 'Falar sobre o Atacama', links: [['/atacama', 'o dossiê do Atacama'], ['/melhor-epoca', 'a melhor época no deserto']] },
    'blog-japao-tradicao-futuro': { t: 'Quer conhecer o Japão?', p: 'Entre a cerejeira e o outono há duas viagens diferentes. A gente ajuda a escolher e monta o roteiro.', m: 'Li o artigo sobre o Japão e quero montar esse roteiro.', b: 'Falar sobre o Japão', links: [['/japao', 'o dossiê do Japão'], ['/melhor-epoca', 'a melhor época para o Japão']] },
    'blog-lua-de-mel-exclusiva': { t: 'Planejando a lua de mel?', p: 'A gente monta a viagem inteira e combina as surpresas com a hospedagem, sem você precisar pedir.', m: 'Li o artigo sobre lua de mel e quero planejar a nossa.', b: 'Planejar nossa lua de mel', links: [['/maldivas', 'o dossiê das Maldivas'], ['/bora-bora', 'o dossiê de Bora Bora']] },
    'blog-mala-viagem-internacional': { t: 'Quer ajuda com a viagem inteira, não só com a mala?', p: 'Franquia de bagagem muda por companhia e por trecho. A gente confere isso junto com o resto.', m: 'Li o artigo sobre mala para viagem internacional e quero ajuda com o planejamento.', b: 'Falar com a Terra Venture', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-documentos-para-viajar', 'os documentos que você vai precisar']] },
    'blog-malas-safari': { t: 'Quer fazer um safári?', p: 'Peso de bagagem em avião pequeno é regra séria no safári. A gente planeja isso com você.', m: 'Li o artigo sobre malas para safári e quero planejar essa viagem.', b: 'Falar sobre o safári', links: [['/tanzania', 'o dossiê da Tanzânia'], ['/namibia', 'o dossiê da Namíbia']] },
    'blog-maldivas-vs-seychelles': { t: 'Ainda em dúvida entre as duas?', p: 'A escolha muda com quem viaja, com o mês e com o orçamento. A gente faz essa conta com você.', m: 'Li o artigo comparando Maldivas e Seychelles e quero ajuda para escolher.', b: 'Ajuda para escolher', links: [['/maldivas', 'o dossiê das Maldivas'], ['/seychelles', 'o dossiê das Seychelles']] },
    'blog-marrocos-alem-marrakech': { t: 'Quer ir além de Marrakech?', p: 'Deserto, Atlas e riad pedem logística que não se resolve no balcão do hotel.', m: 'Li o artigo sobre o Marrocos e quero montar esse roteiro.', b: 'Falar sobre o Marrocos', links: [['/marrakech', 'o dossiê de Marrakech'], ['/melhor-epoca', 'a melhor época no Marrocos']] },
    'blog-melhor-epoca-viajar': { t: 'Já sabe quando pode viajar?', p: 'Conte o mês que cabe na sua agenda e a gente mostra onde ele rende mais.', m: 'Li o guia de melhor época e quero ajuda para escolher o destino.', b: 'Escolher o destino comigo', links: [['/melhor-epoca', 'o guia mês a mês'], ['/destinos', 'os destinos com dossiê pronto']] },
    'blog-patagonia-quando-ir': { t: 'Quer montar a sua Patagônia?', p: 'A janela de bom tempo é curta e a logística entre os parques é o que faz o roteiro funcionar.', m: 'Li o artigo sobre a Patagônia e quero montar esse roteiro.', b: 'Falar sobre a Patagônia', links: [['/patagonia', 'o dossiê da Patagônia'], ['/melhor-epoca', 'a melhor época no extremo sul']] },
    'blog-petra-amanhecer': { t: 'Quer ver Petra sem multidão?', p: 'Chegar antes do ônibus do dia exige dormir no lugar certo. A gente resolve isso.', m: 'Li o artigo sobre Petra ao amanhecer e quero essa viagem.', b: 'Falar sobre Petra', links: [['/petra', 'o dossiê de Petra'], ['/egito', 'o Egito, que combina no mesmo roteiro']] },
    'blog-primeira-trilha': { t: 'Primeira trilha a caminho?', p: 'A gente escolhe o percurso pelo seu preparo, não pela foto bonita.', m: 'Li o artigo sobre a primeira trilha e quero planejar uma viagem assim.', b: 'Planejar minha trilha', links: [['/patagonia', 'o dossiê da Patagônia'], ['/dolomitas', 'as Dolomitas, boas para começar']] },
    'blog-quando-algo-da-errado': { t: 'Quer alguém do seu lado quando der errado?', p: 'Voo cancelado e bagagem extraviada acontecem. A diferença é ter quem resolva enquanto você espera.', m: 'Li o artigo sobre imprevistos e quero entender como funciona o suporte de vocês.', b: 'Entender o suporte', links: [['/servicos', 'o suporte durante a viagem'], ['/blog-seguro-viagem', 'o que o seguro cobre de verdade']] },
    'blog-retiros-wellness-suica': { t: 'Quer uma viagem para descansar de verdade?', p: 'Retiro bom tem vaga limitada e calendário próprio. A gente acerta data e logística.', m: 'Li o artigo sobre retiros na Suíça e quero planejar essa viagem.', b: 'Falar sobre o retiro', links: [['/alpes-suicos', 'o dossiê dos Alpes Suíços'], ['/servicos', 'o que a consultoria resolve']] },
    'blog-rota-da-seda-uzbequistao': { t: 'Quer percorrer a Rota da Seda?', p: 'Transporte entre as cidades e guia que fale a língua mudam a viagem inteira.', m: 'Li o artigo sobre o Uzbequistão e quero montar esse roteiro.', b: 'Falar sobre o Uzbequistão', links: [['/uzbequistao', 'o dossiê do Uzbequistão'], ['/melhor-epoca', 'a melhor época na Ásia Central']] },
    'blog-rota-do-vinho-mendocina': { t: 'Quer fazer a rota do vinho?', p: 'Vinícola boa pede reserva e motorista. A gente monta o dia inteiro, almoço incluído.', m: 'Li o artigo sobre Mendoza e quero montar a rota do vinho.', b: 'Falar sobre Mendoza', links: [['/santiago', 'Santiago, do outro lado da cordilheira'], ['/servicos', 'o que entra numa consultoria']] },
    'blog-safari-fotografico': { t: 'Quer fotografar um safári?', p: 'Lodge, estação e horário de saída decidem a foto. A gente escolhe isso com você.', m: 'Li o artigo sobre safári fotográfico e quero planejar essa viagem.', b: 'Falar sobre o safári', links: [['/tanzania', 'o dossiê da Tanzânia'], ['/ruanda', 'Ruanda, para os gorilas']] },
    'blog-seguro-viagem': { t: 'Quer o seguro certo para a sua viagem?', p: 'A gente cota, explica o que cada cobertura faz e contrata junto com o resto.', m: 'Li o artigo sobre seguro viagem e quero uma cotação.', b: 'Cotar meu seguro', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-documentos-para-viajar', 'os documentos da viagem']] },
    'blog-slow-travel-europa': { t: 'Quer uma Europa sem correria?', p: 'Menos cidades e mais noites em cada uma. A gente monta o roteiro nesse ritmo.', m: 'Li o artigo sobre slow travel e quero montar uma Europa assim.', b: 'Montar minha Europa', links: [['/paris', 'o dossiê de Paris'], ['/costa-amalfitana', 'o dossiê da Costa Amalfitana']] },
    'blog-turismo-sustentavel': { t: 'Quer viajar com menos impacto?', p: 'Hospedagem, transporte e operador local mudam a conta. A gente escolhe com esse critério.', m: 'Li o artigo sobre turismo sustentável e quero planejar uma viagem assim.', b: 'Falar com a Terra Venture', links: [['/ruanda', 'Ruanda, onde o turismo financia a conservação'], ['/servicos', 'o que a consultoria resolve']] },
    'blog-viagem-multigeracional': { t: 'Viagem com a família toda?', p: 'Ritmos diferentes na mesma viagem é o ponto mais difícil, e é o que a gente resolve.', m: 'Li o artigo sobre viagem multigeracional e quero planejar a nossa.', b: 'Planejar a viagem da família', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-viajar-com-criancas-pequenas', 'viajar com crianças pequenas']] },
    'blog-viajar-com-criancas-pequenas': { t: 'Vai viajar com criança pequena?', p: 'Voo, hospedagem e ritmo do dia mudam tudo. A gente planeja pensando nisso.', m: 'Li o artigo sobre viajar com crianças e quero planejar a nossa viagem.', b: 'Planejar nossa viagem', links: [['/servicos', 'o que a consultoria resolve'], ['/blog-voos-longos', 'como encarar voos longos']] },
    'blog-voos-longos': { t: 'Quer chegar inteiro do outro lado?', p: 'Conexão, assento e horário decidem como você desembarca. A gente escolhe isso por você.', m: 'Li o artigo sobre voos longos e quero ajuda para montar a viagem.', b: 'Falar sobre os voos', links: [['/japao', 'o dossiê do Japão'], ['/servicos', 'o que a consultoria resolve']] },
};

/* ---------- dados dos artigos: titulo, tag, data ---------- */
const arts = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.startsWith('blog-') && x.endsWith('.html'))) {
    const t = l.ler(f);
    const slug = f.replace(/\.html$/, '');
    const h1 = (t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
    arts.push({
        slug, f,
        titulo: h1.replace(/<[^>]*>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(),
        tag: (t.match(/class="blog-tag">([^<]*)/) || [])[1] || '',
        data: (t.match(/"datePublished":\s*"([^"]+)"/) || [])[1] || '',
    });
}
arts.sort((a, b) => b.data.localeCompare(a.data));

function relacionados(a) {
    const mesmaTag = arts.filter(x => x.slug !== a.slug && x.tag === a.tag);
    const resto = arts.filter(x => x.slug !== a.slug && x.tag !== a.tag);
    return mesmaTag.concat(resto).slice(0, 3);
}

/* ---------- aplica em cada artigo ---------- */
let ctas = 0, bylines = 0, leias = 0;
for (const a of arts) {
    const fp = path.join(l.DIR, a.f);
    let t = fs.readFileSync(fp, 'utf8');
    const o = t;
    const q = t.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const m = MAPA[a.slug];
    if (!m) { console.log('  sem mapa:', a.slug); continue; }

    /* CTA do tema, links internos e "Leia tambem" */
    const iCta = t.indexOf('<div class="article-cta"');
    if (iCta !== -1) {
        const fCta = l.bloco(t, iCta, 'div');
        const rel = relacionados(a);
        const NOVO = [
            '<div class="article-cta" style="margin-top: 50px;">',
            '                    <h3>' + m.t + '</h3>',
            '                    <p>' + m.p + '</p>',
            '                    <a href="' + WA(m.m) + '" class="btn-primary btn-large" target="_blank" rel="noopener">' + m.b + '</a>',
            '                </div>',
            '                <p class="artigo-links">Para ir além: <a href="' + m.links[0][0] + '">' + m.links[0][1] + '</a> e <a href="' + m.links[1][0] + '">' + m.links[1][1] + '</a>.</p>',
            '                <aside class="leia-tambem">',
            '                    <h3>Leia também</h3>',
            '                    <ul>',
            ...rel.map(r => '                        <li><a href="/' + r.slug + '">' + r.titulo + '</a></li>'),
            '                    </ul>',
            '                </aside>',
        ].join(q);
        t = t.slice(0, iCta) + NOVO + t.slice(fCta);
        ctas++; leias++;
    }

    /* byline visivel */
    const iMeta = t.indexOf('<div class="article-meta">');
    if (iMeta !== -1 && !t.includes('article-byline')) {
        const fMeta = l.bloco(t, iMeta, 'div');
        const pub = a.data ? a.data.split('-').reverse().join('/') : '';
        const mod = ((t.match(/"dateModified":\s*"([^"]+)"/) || [])[1] || a.data);
        const modBr = mod ? mod.split('-').reverse().join('/') : '';
        const BY = [
            '<div class="article-meta article-byline">',
            '                <span>Por <strong>Nicholas Joazeiro</strong></span>',
            '                <span>Publicado em <time datetime="' + a.data + '">' + pub + '</time></span>',
            modBr && modBr !== pub ? '                <span>Atualizado em <time datetime="' + mod + '">' + modBr + '</time></span>' : '',
            '            </div>',
        ].filter(Boolean).join(q);
        t = t.slice(0, iMeta) + BY + t.slice(fMeta);
        bylines++;
    }

    if (t !== o) fs.writeFileSync(fp, t, 'utf8');
}
console.log('artigos com CTA do tema:', ctas, '| byline:', bylines, '| "Leia tambem":', leias);
console.log('TODO(nicholas): confirmar a autoria. Coloquei Nicholas Joazeiro em todos; se algum for da Giovana, me diz quais.');

/* ---------- listagem do blog em ordem decrescente ---------- */
{
    let t = l.ler('blog.html');
    const iGrade = t.indexOf('<div class="blog-grid"');
    const iniGrade = iGrade !== -1 ? iGrade : t.indexOf('<a class="blog-card"');
    if (iniGrade === -1) { console.error('FALHA: grade do blog'); process.exit(1); }
    const cards = [];
    let i = t.indexOf('<a class="blog-card"', iniGrade);
    const primeiro = i;
    let ultimo = i;
    while (i !== -1) {
        const fim = l.bloco(t, i, 'a');
        if (fim === -1) break;
        const slug = (t.slice(i, fim).match(/href="\/(blog-[a-z-]+)"/) || [])[1];
        cards.push({ slug, html: t.slice(t.lastIndexOf('\n', i) + 1, fim) });
        ultimo = fim;
        i = t.indexOf('<a class="blog-card"', fim);
    }
    const porData = Object.fromEntries(arts.map(a => [a.slug, a.data]));
    const antes = cards.map(c => porData[c.slug] || '');
    cards.sort((a, b) => (porData[b.slug] || '').localeCompare(porData[a.slug] || ''));
    const q = l.quebra(t);
    const iniLinha = t.lastIndexOf('\n', primeiro) + 1;
    t = t.slice(0, iniLinha) + cards.map(c => c.html).join(q) + t.slice(ultimo);
    l.gravar('blog.html', t);
    let fora = 0; for (let k = 1; k < antes.length; k++) if (antes[k] > antes[k - 1]) fora++;
    console.log('listagem do blog reordenada:', cards.length, 'cards | pares fora de ordem antes:', fora);
}

l.conferir('blog.html');
