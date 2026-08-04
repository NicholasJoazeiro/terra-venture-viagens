const fs = require('fs');
const path = require('path');

const publicDir = path.join('c:', 'Users', 'nberj', '.gemini', 'antigravity', 'scratch', 'Terra Venture', 'public');
const blogHtmlPath = path.join(publicDir, 'blog.html');

const blogs = [
    {
        filename: "blog-aurora-boreal-islandia.html",
        title: "A Magia da Aurora Boreal na Islândia",
        category: "destinos",
        tag: "Dicas em Destinos",
        date: "28 de Março, 2026",
        image: "https://images.unsplash.com/photo-1520638026118-80e9bd23659c?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1520638026118-80e9bd23659c?auto=format&fit=crop&w=500",
        desc_short: "Planeje a viagem perfeita para ver o maior espetáculo de luzes da natureza no ártico islandês.",
        p1: "Ver a Aurora Boreal dançando nos céus do norte é o sonho de muitos viajantes. A Islândia, com sua posição geográfica privilegiada e paisagens dramáticas, oferece um dos melhores palcos do mundo para esse fenômeno.",
        p2: "Mas a 'caça' à Aurora Boreal envolve ciência, clima, perseverança e um pouco de sorte. Nossa equipe de especialistas mapeou as melhores estratégias para maximizar suas chances.",
        h1: "A Época Certa",
        p3: "O período ideal vai do final de setembro até o início de abril, sendo os meses de inverno (novembro a fevereiro) os que possuem noites mais longas. É essencial que o céu esteja escuro e limpo.",
        h2: "Localização, Localização, Localização",
        p4: "Fugir da poluição luminosa de Reykjavik é o primeiro passo. Regiões como Snaefellsnes e o sul da ilha oferecem mirantes isolados e escuros perfeitos para visualização, inclusive com hospedagens equipadas com tetos de vidro."
    },
    {
        filename: "blog-turismo-sustentavel.html",
        title: "Turismo Sustentável: Como Viajar Deixando Apenas Pegadas Boas",
        category: "viajantes",
        tag: "Dicas para Viajantes",
        date: "29 de Março, 2026",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=500",
        desc_short: "Entenda as práticas que fazem da sua viagem uma força de proteção cultural e ambiental ao redor do planeta.",
        p1: "O mundo é nossa casa e preservá-lo nunca foi tão importante. O ecoturismo e o turismo de luxo sustentável mudaram a forma como interagimos com a natureza selvagem e com as comunidades locais.",
        p2: "Na Terra Venture, acreditamos que viagens excepcionais podem existir em total harmonia com práticas ambientais responsáveis. Separamos nossas filosofias diárias de viagem ética.",
        h1: "Hospedagem Eco-Luxe",
        p3: "Priorize hotéis e lodges que usam energia limpa, compensam as emissões de carbono e tratam corretamente os resíduos. Muitos dos nossos parceiros na África, por exemplo, não deixam pegada ecológica alguma no parque.",
        h2: "Valorizando a Economia Local",
        p4: "Fuja do modelo 'all inclusive' massivo. Alimentar-se em restaurantes autênticos de famílias locais e comprar artesanato diretamente dos produtores injeta dinheiro em quem realmente precisa prosperar com o turismo."
    },
    {
        filename: "blog-rota-do-vinho-mendocina.html",
        title: "Rota do Vinho: As 5 Vinícolas Imperdíveis em Mendoza",
        category: "destinos",
        tag: "Dicas em Destinos",
        date: "30 de Março, 2026",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=500",
        desc_short: "Um roteiro hedonista pelo melhor do enoturismo aos pés da majestosa Cordilheira dos Andes.",
        p1: "Mendoza é a capital indiscutível do vinho sul-americano. Com a impressionante Cordilheira dos Andes como pano de fundo, essa região desértica foi transformada em um oásis verdejante onde amadurecem os melhores Malbecs do globo.",
        p2: "O nível de sofisticação arquitetônica e gastronômica das 'bodegas' argentinas alcançou patamares altíssimos. Compartilhamos nossas paradas absolutamente obrigatórias.",
        h1: "Bodega Catena Zapata e Casa Vigil",
        p3: "Catena é uma lenda, sua pirâmide maia se eleva nos vinhedos. Além da degustação monumental lá, o almoço de múltiplos passos harmonizados com safras raras em Casa Vigil (El Enemigo) sob as videiras é uma experiência que altera a vida.",
        h2: "Zuccardi Valle de Uco",
        p4: "Eleita repetidas vezes a melhor vinícola do mundo. A arquitetura bruta feita de rochas andinas que parece surgir do chão de forma natural impressiona tanto quanto os vinhos de *terroir* e o azeite premium produzido por eles."
    },
    {
        filename: "blog-arrumar-mala-inverno.html",
        title: "O Segredo das Camadas: Como Arrumar a Mala para a Neve",
        category: "viajantes",
        tag: "Dicas para Viajantes",
        date: "02 de Abril, 2026",
        image: "https://images.unsplash.com/photo-1498805983167-a523078d762c?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1498805983167-a523078d762c?auto=format&fit=crop&w=500",
        desc_short: "Não leve peso morto. Aprenda a técnica das três camadas para se manter aquecido nos climas mais gelados do planeta.",
        p1: "Viajar para destinos de neve extremas (como Islândia, Patagônia de inverno ou Alpes Suíços) frequentemente assusta o viajante brasileiro na hora de preparar a mala, resultando em casacos desnecessariamente enormes e bagagens pesadas.",
        p2: "O segredo do conforto térmico não é usar a jaqueta mais grossa possível, e sim o sistema de camadas. Roupas tecnológicas pesam pouco e funcionam perfeitamente para reter o calor biológico.",
        h1: "A Segunda Pele e o Middle Layer",
        p3: "Tudo começa com a 'segunda pele' térmica justa de lã merino (que não pega odor) ou tecido sintético de alta tecnologia. Por cima, o 'middle layer': um fleece grosso ou uma blusa dry para isolar completamente o ar aquecido pelo seu corpo.",
        h2: "O Outer Shell Impermeável",
        p4: "A última camada é essencialmente um escudo ou corta-vento (Gore-Tex). Ele impede que o ar gelado, o vento ártico e a neve derretida cheguem até as camadas secas de dentro. Luvas forradas, meias térmicas pesadas e botas de neve terminam a armadura perfeita."
    },
    {
        filename: "blog-japao-tradicao-futuro.html",
        title: "Japão: Onde Tradição Milenar Encontra o Futuro Tecnológico",
        category: "incriveis",
        tag: "Destinos Incríveis",
        date: "05 de Abril, 2026",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500",
        desc_short: "Tóquio de néon, pacíficos templos xintoístas em Kyoto e a majestade do Monte Fuji nesta imersão absoluta do Japão.",
        p1: "Nenhum outro país masterizou a dança entre o passado profundo e o futuro cyberpunk de maneira tão orgânica. Uma viagem pelo Japão pode ser, a cada hora, um salto constante no tempo sem paralelos.",
        p2: "Deslocar-se confortavelmente pelos velozes trens Shinkansen permite tomar um café futurista robótico no frenesi de Shibuya e, poucas horas depois, repousar visualizando jardins zen meticulosamente varridos por séculos.",
        h1: "Hospedagem Híbrida: Ryokans de Luxo",
        p3: "Recomendamos que ao menos parte da estadia ocorra em um *Ryokan* de alto padrão. Você testará o tatame tradicional, vestimentas Yukatas e o mais puro deleite de banhos termais onsen (rotensuros privados), sem abdicar do serviço meticulosamente atencioso (Omotenashi).",
        h2: "A Sagrada Rota Nakasendo",
        p4: "Para explorar o antigo Japão feudal profundo, sair das megacidades e percorrer trilhas a pé entre antigas estações de correio de montanha (como Tsumago a Magome), revelam a silenciosa sabedoria interior dos antigos samurais rurais."
    },
    {
        filename: "blog-slow-travel-europa.html",
        title: "Slow Travel na Europa: Por Que Menos Países Significam Mais Viagem",
        category: "incriveis",
        tag: "Destinos Incríveis",
        date: "10 de Abril, 2026",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200",
        card_image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500",
        desc_short: "Saia do ritmo mecânico das maratonas turísticas e passe a viver a Europa e suas pequenas vilas no compasso que elas requerem.",
        p1: "O formato padrão de turismo na Europa geralmente nos convence de que pisar em 6 países diferentes durante 10 dias caracteriza uma maratona invejável. Chamamos isso de turismo relâmpago, focado em 'ver' e nunca em 'viver'.",
        p2: "O movimento *Slow Travel* foca-se na conexão do momento, na troca genuína e num mergulho orgânico dentro de realidades rústicas, explorando vales menos povoados e o cotidiano sem pressa.",
        h1: "A Itália Além da Trindade",
        p3: "Em vez de lutar com multidões pelo fluxo Roma-Florença-Veneza, alocar 14 dias inteiros rodando lenta e poeticamente pelas estradinhas sinuosas da Toscana, experimentando vinhos rurais ou imergindo na enigmática cultura rústica da Puglia (Sul Italiano), renderá as melhores histórias visuais.",
        h2: "Alugar Casais (Villas) como Base",
        p4: "Alugar uma villa ou chateau exclusivo e usá-lo como base fixa para explorar as cidades periféricas anula aquela tensão de fazer/desfazer malas a cada 24 horas. É comprar pão cru na padaria local ao amanhecer, falar o dialeto e ser íntimo no boteco da esquina de Paris ou Provença. É viajar com a alma presente."
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

console.log('Criados 6 novos artigos via Node.js!');
