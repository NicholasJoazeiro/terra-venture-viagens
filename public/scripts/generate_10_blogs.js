const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');
const blogHtmlPath = path.join(publicDir, 'blog.html');

const blogs = [
    {
        filename: "blog-glamping-atacama.html",
        title: "Glamping no Deserto de Atacama: Luxo sob o Céu Estrelado",
        category: "destinos",
        tag: "Dicas em Destinos",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=500",
        desc_short: "A experiência transformadora de dormir em lodges exclusivas no deserto mais árido do planeta.",
        p1: "O Deserto do Atacama, no norte do Chile, não é apenas o local mais árido do mundo, mas também um dos mais mágicos. Silêncio absoluto, vulcões majestosos e lagoas salgadas compõem uma paisagem alienígena.",
        p2: "Para viajantes exigentes, a experiência não exige abrir mão do conforto. A modalidade de 'Glamping' (Glamour + Camping) no Atacama eleva a imersão na natureza a um novo patamar de exclusividade e serviço impecável.",
        h1: "Lodges Arquitetônicos e Sustentáveis",
        p3: "Os melhores resorts estão harmoniosamente integrados à geografia local. Arquitetura de adobe, madeira e vidro oferecem vistas ininterruptas do vulcão Licancabur, servindo alta gastronomia com ingredientes locais andinos.",
        h2: "Astronomia Privativa",
        p4: "Com o céu mais limpo e livre de poluição luminosa da Terra, os lodges oferecem observatórios astronômicos privativos. Um guia especialista o acompanhará sob um manto denso de estrelas, servindo um Pisco Sour perfeito à meia-noite."
    },
    {
        filename: "blog-esqui-courchevel.html",
        title: "Esqui em Courchevel: O Refúgio Europeu de Inverno Definitivo",
        category: "incriveis",
        tag: "Destinos Incríveis",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=500",
        desc_short: "Pistas imaculadas, gastronomia estrelada e chalés aconchegantes no coração pulsante dos Alpes Franceses.",
        p1: "Quando o assunto é combinar esqui de alto desempenho com o mais elegante apres-ski do mundo, Courchevel 1850 reina absoluta. Localizada no domínio de Les Trois Vallées, a estação é sinônimo de excelência e hospitalidade europeia.",
        p2: "Além da neve perfeita tipo powder, Courchevel é famosa por abrigar mais hotéis palacianos e restaurantes com estrelas Michelin do que qualquer outro resort de esqui alpino.",
        h1: "Chalés Privativos com Atendimento Boutique",
        p3: "Imagine um chalé projetado em madeira tradicional de Savoie, mas equipado com spas privativos, salas de cinema e seu próprio chef e mordomo 24h. O serviço é invisível, porém prevê cada um de seus desejos após um dia nas pistas.",
        h2: "Heliski e Experiências Radicais",
        p4: "Para quem busca adrenalina além das pistas demarcadas, expedições de heliski guiadas colocam você no topo de encostas virgens e secretas. A liberdade de desbravar a neve fresca nas alturas é o clímax da temporada de inverno."
    },
    {
        filename: "blog-viagem-multigeracional.html",
        title: "Como Organizar uma Viagem Multigeracional Inesquecível",
        category: "viajantes",
        tag: "Dicas para Viajantes",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1608228068998-5715560b39dc?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1608228068998-5715560b39dc?auto=format&fit=crop&w=500",
        desc_short: "Equilibrando descanso, aventura e logística para avós, pais e netos sem perder o fôlego ou o encanto.",
        p1: "Viajar em família, envolvendo três ou até quatro gerações, é criar um legado de memórias. No entanto, equilibrar a energia inesgotável das crianças com a necessidade de repouso dos avós e o desejo de sofisticação dos pais requer inteligência logística.",
        p2: "Na Terra Venture, observamos que o sucesso de viagens intergeracionais de alto padrão se resume ao respeito aos diferentes cronogramas biológicos, além da escolha astuta do destino e acomodação.",
        h1: "Villas Exclusivas como Base de Operações",
        p3: "A estratégia de ouro é alugar propriedades privativas espaçosas. Isso garante que todos tomem café da manhã juntos, enquanto a divisão dos quartos preserva a intimidade e o silêncio para os mais velhos. Um chef local pode cuidar das refeições.",
        h2: "Atividades Modulares e Paralelas",
        p4: "A agenda diária não precisa ser um bloco rígido para todos. Planejamos dias onde avós fazem um cruzeiro tranquilo ao pôr-do-sol, enquanto os netos têm uma aula dinâmica de surf ou culinária infantil, para à noite todos cruzarem as histórias na mesa de jantar."
    },
    {
        filename: "blog-maldivas-vs-seychelles.html",
        title: "Maldivas vs. Seychelles: Qual Paraíso Escolher?",
        category: "destinos",
        tag: "Destinos Incríveis",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1540202404-b711ed7052ff?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1540202404-b711ed7052ff?auto=format&fit=crop&w=500",
        desc_short: "A eterna dúvida do Oceano Índico: bangalôs sobre as águas ou enormes rochas de granito cercadas por tartarugas.",
        p1: "O arquipélago das Maldivas e as exuberantes Ilhas Seychelles frequentemente disputam o topo da lista de desejos para viagens românticas e retiros de profundo exílio tropical no Oceano Índico.",
        p2: "Apesar da imagem frequente de águas cristalinas e areia branca, os dois destinos entregam propostas incrivelmente distintas em termos de vibração, relevo e estilo de hospedagem.",
        h1: "Maldivas: Isolamento e Arquitetura",
        p3: "As Maldivas são coroadas pela cultura do 'um resort, uma ilha'. O apelo aqui é arquitetônico: os icônicos bangalôs overwater, mergulhos em atóis de corais privados e uma experiência focada na contemplação, no spa e na excelência dentro do hotel.",
        h2: "Seychelles: Natureza Bruta e Exploração",
        p4: "Já Seychelles é um santuário de biodiversidade montanhosa. Aqui o prêmio é alugar um carro ou barco e fazer 'island hopping', explorando densas florestas tropicais, praias abraçadas por rochas gigantes de granito e nadando com as imensas tartarugas terrestres em Aldabra."
    },
    {
        filename: "blog-expresso-do-oriente.html",
        title: "A Magia dos Trens de Luxo: A Bordo do Expresso do Oriente",
        category: "incriveis",
        tag: "Experiências Únicas",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1532154064375-7bc05ba2136d?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1532154064375-7bc05ba2136d?auto=format&fit=crop&w=500",
        desc_short: "O charme da Era Dourada das viagens ressurge sobre trilhos através da Europa em cabines de laca e cristal.",
        p1: "O Venice Simplon-Orient-Express é mais do que transporte; é teatro em movimento, um tributo direto à Era Dourada da exploração glamourosa nos anos 1920. Vestir-se para o jantar é obrigatório, e o champagne parece nunca acabar.",
        p2: "Atravessar o continente europeu a bordo desses vagões históricos meticulosamente restaurados é desconectar-se do frenesi do século 21 e abraçar o mistério e a elegância atemporal.",
        h1: "Cabines Suíte: Obra de Arte Móvel",
        p3: "As lendárias Grand Suítes levantam o padrão da viagem ferroviária moderna: contêm banheiros privativos de mármore, aquecimento no chão e serviço de mordomo incansável servindo caviar enquanto os alpes franceses passam velozmente pela janela.",
        h2: "A Alta Gastronomia nos Trilhos",
        p4: "Três carros-restaurantes exuberantes servem o cume da culinária francesa, preparada impecavelmente em uma minúscula cozinha em movimento. Ingredientes colhidos ao longo da rota brilham sob a prataria polida a cada anoitecer."
    },
    {
        filename: "blog-malas-safari.html",
        title: "O Guia Definitivo para Fazer as Malas para um Safári de Luxo",
        category: "viajantes",
        tag: "Dicas para Viajantes",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=500",
        desc_short: "Entenda por que tons neutros e tecidos tecnológicos são seus melhores amigos na África.",
        p1: "Partir para a savana africana — seja na Cratera de Ngorongoro na Tanzânia ou no Delta do Okavango em Botsuana — exige uma bagagem curiosamente minimalista. Os rigores dos pequenos aviões operando entre as escarpas definem limites estritos de peso e tamanho.",
        p2: "Além da logística de voos, o ambiente do safári dita suas próprias regras quanto a cores e tecidos para otimizar sua segurança e absorção na natureza crua.",
        h1: "As Restrições das Malas Flexíveis",
        p3: "A maioria das conexões rurais de safári proíbe malas de rodinhas rígidas. Você precisará de duffel bags de tecido flexível que se moldem aos pequenos compartimentos de carga dos aviões Cessna. O limite total costuma girar em 15 quilos por pessoa.",
        h2: "A Paleta de Cores de Preservação e Camadas",
        p4: "Evite preto e azul-marinho (eles atraem mosquitos) e esqueça tons neon. Caqui, tons de oliva, areia e marrom-claro ajudam você a se camuflar na poeira. O safári matinal congela, mas chegado o meio-dia o sol é ardente: camadas finas com fator de proteção UV são a maior moeda de troca no jipe."
    },
    {
        filename: "blog-gastronomia-san-sebastian.html",
        title: "Estrelas Michelin e Pintxos Mágicos em San Sebastián",
        category: "destinos",
        tag: "Dicas em Destinos",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1512484776495-a09fc48747ae?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1512484776495-a09fc48747ae?auto=format&fit=crop&w=500",
        desc_short: "Descubra como uma pequena cidade litorânea no País Basco concentra a maior densidade de estrelas Michelin do mundo.",
        p1: "Para o aficionado por gastronomia (foodie), nenhuma rota global brilha tão cintilante quanto a região espanhola de Donostia/San Sebastián. De um modesto vilarejo pesqueiro, a cidade basca emergiu como a força gravitacional da culinária vanguardista mundial.",
        p2: "Curiosamente, o charme da cidade é bipolar: abriga templos minimalistas estrelados pela Michelin lado a lado a cacofônicos botecos seculares que servem 'pintxos' esplêndidos regados à cidra derramada do alto.",
        h1: "Os Templos Michelin Arzak e Mugaritz",
        p3: "As reservas nestes estabelecimentos devem ser feitas com meses de antecedência. Em Arzak ou Mugaritz, pratos parecem brincar com a física e botânica, traduzindo as flores secas e os peixes abissais da Baía da Biscaia em arte imersiva, performática.",
        h2: "A Cultura Despretensiosa do Txikiteo",
        p4: "O verdadeiro coração basco, contudo, pulsa à noite nas vielas estreitas da Parte Vieja. Pular de bar em bar (Txikiteo) degustando miniaturas elaboradas — polvo fumegante, pimentões piquillo recheados, anchovas premium brilhantes e foie gras na chapa — é inigualável."
    },
    {
        filename: "blog-retiros-wellness-suica.html",
        title: "Retiros de Wellness na Suíça: Reiniciando Corpo e Mente",
        category: "viajantes",
        tag: "Bem-estar",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1610488661642-16a243a75501?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1610488661642-16a243a75501?auto=format&fit=crop&w=500",
        desc_short: "A medicina alpina do futuro aliada à pureza das paisagens lacustres forma o verdadeiro epítome do luxo em saúde.",
        p1: "Nas últimas décadas, o conceito de luxo migrou radicalmente do mero consumismo material para o resgate do tempo, longevidade e saúde curativa. A Suíça lidera magistralmente essa revolução da hiper personalização médica-preventiva.",
        p2: "Escondidas nos vales alpinos ou de frente aos cristalinos lagos Leman ou Lucerna, as chamadas 'Medical Spas' suíças prometem uma revitalização celular completa, combinando ciência ocidental avançada e terapias holísticas.",
        h1: "O Legado Alpino da Sáude Extrema",
        p3: "Clínicas renomadas atraem lideranças mundiais promovendo curas exclusivas de desintoxicação e terapias anti-aging usando recursos naturais para revigorar o sistema neurológico submetido à estresse altíssimo.",
        h2: "Arquitetura da Calma e Ar Puro",
        p4: "A jornada terapêutica não acontece apenas em salas de tratamento. Caminhar pelas trilhas desenhadas por pinhais centenários, inalando oxigênio alpino agudo é parte integrante do remédio celestial."
    },
    {
        filename: "blog-balao-capadocia.html",
        title: "Passeio de Balão na Capadócia: Sinfonia de Cores ao Amanhecer",
        category: "incriveis",
        tag: "Destinos Incríveis",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=500",
        desc_short: "Flutue serenamente entre as fadas de chaminé na Turquia num dos cartões postais alados mais belos do mundo.",
        p1: "Existem raros momentos em viagens que correspondem integralmente e sem falhas à gigantesca publicidade virtual que lhes precede. O voo de balão sobre os vales ocres da Capadócia, no interior pulsante da Turquia, é sem dúvidas um desses momentos eternos.",
        p2: "O silêncio nos ares, quebrado apenas pela lufada quente dos maçaricos empurrando o cesto de vime para cima e para fora do Desfiladeiro de Göreme, evoca uma reverência contemplativa que toca o sagrado.",
        h1: "O Balé Aéreo de Centenas de Esferas",
        p3: "A magia real se atrela tanto à paisagem excêntrica esculpida pela fúria vulcânica antiga, cheia de 'chaminés de fadas' pontiagudas, mas também ao espetáculo simultâneo de outros balões coloridos se erguendo e flutuando sob os tons da aurora.",
        h2: "A Perspectiva Cave Hotel Privativo",
        p4: "Não é apenas do céu que a beleza transborda: dormir e acordar nos luxuosos 'Cave Hotels' cravados diretamente nas falésias e possuir varandas forradas por tapetes otomanos para ver a revoada do solo compõe uma segunda etapa incontornável."
    },
    {
        filename: "blog-rota-da-seda-uzbequistao.html",
        title: "Explorando a Rota da Seda: Mistério e Azulejos no Uzbequistão",
        category: "destinos",
        tag: "Destinos Incríveis",
        date: "24 de Março, 2026",
        image: "https://images.unsplash.com/photo-1610488661642-16a243a7550f?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1621217646580-cfaaf0f33166?auto=format&fit=crop&w=500",
        desc_short: "A reabertura suntuosa do coração da Eurásia atrai viajantes experientes em busca das madrasas com mosaicos.",
        p1: "Para o turista que sente que a Europa Clássica já foi intensamente trilhada, o olhar exploratório desvia-se para os místicos territórios atravessados pelas caravanas persas e caravançarais antigos na épica Rota da Seda. E o Uzbequistão é a joia indiscutível desse mapa.",
        p2: "Aberto recentemente de forma muito mais receptiva para viajantes curiosos do Ocidente, o país abriga uma coleção de praças monumentais e desertos implacáveis que remontam ao império de Tamerlão.",
        h1: "Samarcanda e o Epicentro do Mundo, Registan",
        p3: "Ver a Praça do Registan ao anoitecer, rodeada pelas majestosas Madrasas banhadas em tons elétricos de azul ciano, lapis-lazúli e ouro resplandecente, induz ao puro assombro perante a grandiosidade arquitetônica islâmica.",
        h2: "O Labirinto de Bukhara e Khiva",
        p4: "Distante do monumentalismo central reside a velha Bukhara e a impressionante cidadela fortificada de Itchan Kala em Khiva, locais onde perder-se pelos bazares perfumados recria um teletransporte orgânico para a essência contada por Marco Polo."
    }
];

const templateHtml = (b) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${b.title} | Blog Terra Venture</title>
    <link rel="icon" type="image/jpeg" href="Icon.jpg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar scrolled" id="navbar" style="position: sticky; background-color: rgba(248, 247, 244, 1);">
        <div class="container nav-container">
            <a href="index.html" class="logo" style="color: var(--color-moss);">Terra Venture</a>
            <nav>
                <ul class="nav-links" style="display: flex;">
                    <li><a href="index.html#diferenciais" style="color: var(--color-moss);">A Terra Venture</a></li>
                    <li><a href="index.html#destinos" style="color: var(--color-moss);">Destinos</a></li>
                    <li><a href="index.html#experiencia" style="color: var(--color-moss);">Consultoria</a></li>
                    <li><a href="blog.html" style="color: var(--color-terra); font-weight: 600;">Blog</a></li>
                </ul>
            </nav>
            <a href="index.html#contato" class="btn-primary nav-btn">Iniciar Briefing</a>
        </div>
    </header>

    <section class="article-hero" style="background-image: url('${b.image}');">
        <div class="container article-hero-content">
            <span class="blog-tag">${b.tag}</span>
            <h1>${b.title}</h1>
            <div class="article-meta">
                <span><i class="far fa-calendar-alt"></i> ${b.date}</span>
            </div>
        </div>
    </section>

    <div class="blog-breadcrumb">
        <div class="container">
            <a href="index.html">Home</a>
            <span>›</span>
            <a href="blog.html">Blog</a>
        </div>
    </div>

    <section class="article-body">
        <div class="container">
            <div class="article-content">
                <p class="lead-text">${b.p1}</p>
                <p>${b.p2}</p>
                <h2>${b.h1}</h2>
                <p>${b.p3}</p>
                <h2>${b.h2}</h2>
                <p>${b.p4}</p>
                <div class="article-cta" style="margin-top: 50px;">
                    <h3>Gostou das dicas? Fale com a Terra Venture.</h3>
                    <p>Nossos consultores desenham experiências de vida memoráveis em viagens de alto padrão elaboradas sob medida.</p>
                    <a href="index.html#contato" class="btn-primary btn-large">Comece seu roteiro agora</a>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;

let cardsStr = '';

for (const b of blogs) {
    const fPath = path.join(publicDir, b.filename);
    fs.writeFileSync(fPath, templateHtml(b), 'utf8');

    cardsStr += `
                <a href="${b.filename}" class="blog-card scroll-reveal fade-up" data-category="${b.category}">
                    <div class="blog-card-img">
                        <img src="${b.card_image}" alt="${b.title}" style="object-fit: cover; height: 100%; width: 100%;">
                        <span class="blog-tag">${b.tag}</span>
                    </div>
                    <div class="blog-card-body">
                        <span class="blog-card-date"><i class="far fa-calendar-alt"></i> ${b.date}</span>
                        <h3>${b.title}</h3>
                        <p>${b.desc_short}</p>
                        <span class="blog-read-more">Leia Mais <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>\n`;
}

// Append to blog.html
let blogContent = fs.readFileSync(blogHtmlPath, 'utf8');
const target = '<div class="blog-grid">';
blogContent = blogContent.replace(target, target + cardsStr);
fs.writeFileSync(blogHtmlPath, blogContent, 'utf8');

console.log('Criados 10 novos artigos via Node.js!');
