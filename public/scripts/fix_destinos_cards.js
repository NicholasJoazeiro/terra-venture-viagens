const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');
const destinosHtmlPath = path.join(publicDir, 'destinos.html');

const newDestinations = [
    { name: "Bali", url: "bali.html", image: "blog_bali.png", continent: "asia", style: "praia", subtitle: "A Ilha dos Deuses com foco puramente espiritual." },
    { name: "Santorini", url: "santorini.html", image: "blog_santorini.png", continent: "europa", style: "praia", subtitle: "Cúpulas azuis e a caldera mais famosa das Cíclades." },
    { name: "Alpes Suíços", url: "alpes-suicos.html", image: "patagonia_glaciar.png", continent: "europa", style: "montanha", subtitle: "O pico de Zermatt e lagos alpinos impecáveis." },
    { name: "Bora Bora", url: "bora-bora.html", image: "blog_bora_bora.png", continent: "oceania", style: "praia", subtitle: "A joia cristalina do Pacífico Sul." },
    { name: "Marrakech", url: "marrakech.html", image: "egito.png", continent: "africa", style: "urbano", subtitle: "A Cidade Vermelha e os Riads majestosos." },
    { name: "Banff", url: "banff.html", image: "patagonia_torres.png", continent: "america", style: "montanha", subtitle: "Beleza rochosa brutal recortada por lagos de esmeralda." },
    { name: "Petra", url: "petra.html", image: "egito.png", continent: "asia", style: "historia", subtitle: "A Cidade Rosa escondida nas areias do deserto." },
    { name: "Deserto do Atacama", url: "atacama.html", image: "blog_atacama.png", continent: "america", style: "montanha", subtitle: "O céu mais limpo da Terra num cenário marciano." },
    { name: "Courchevel", url: "courchevel.html", image: "blog_courchevel.png", continent: "europa", style: "montanha", subtitle: "O epicentro do esqui de luxo mundial." },
    { name: "Ilhas Maldivas", url: "maldivas.html", image: "blog_maldivas.png", continent: "asia", style: "praia", subtitle: "Um santuário atemporal sobre os atóis indianos." },
    { name: "Capadócia", url: "capadocia.html", image: "blog_capadocia.png", continent: "europa", style: "historia", subtitle: "Revoada de balões nas fantásticas chaminés de fada." },
    { name: "Uzbequistão", url: "uzbequistao.html", image: "blog_uzbequistao.png", continent: "asia", style: "historia", subtitle: "O coração azul cintilante da antiga Rota da Seda." },
    { name: "Ilha de Páscoa", url: "ilha-de-pascoa.html", image: "machu_picchu.png", continent: "oceania", style: "historia", subtitle: "Os misteriosos Moais em isolamento no Pacífico." },
    { name: "Fernando de Noronha", url: "noronha.html", image: "blog_noronha.png", continent: "america", style: "praia", subtitle: "O paraíso intocado e protegido da costa brasileira." },
    { name: "Dolomitas", url: "dolomitas.html", image: "santiago_cordilheira.png", continent: "europa", style: "montanha", subtitle: "Os cumes dramáticos que definem o esplendor italiano." }
];

const templateHtml = (d) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d.name} | Destinos Terra Venture</title>
    <link rel="icon" type="image/jpeg" href="icon.jpg">
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
                    <li><a href="destinos.html" style="color: var(--color-terra); font-weight: 600;">Destinos</a></li>
                    <li><a href="index.html#experiencia" style="color: var(--color-moss);">Consultoria</a></li>
                    <li><a href="blog.html" style="color: var(--color-moss);">Blog</a></li>
                </ul>
            </nav>
            <a href="index.html#contato" class="btn-primary nav-btn">Iniciar Briefing</a>
        </div>
    </header>

    <div class="blog-breadcrumb">
        <div class="container">
            <a href="index.html">Home</a>
            <span>›</span>
            <a href="destinos.html">Destinos</a>
            <span>›</span>
            <span class="current">${d.name}</span>
        </div>
    </div>

    <section class="destino-individual-hero" style="background-image: url('${d.image}'); height: 60vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to top, rgba(10,10,10,0.8), rgba(10,10,10,0.3));"></div>
        <div class="container" style="position: relative; z-index: 1;">
            <h1 style="font-family: var(--font-heading); font-size: 3.5rem; margin-bottom: 20px;">${d.name}</h1>
            <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto; opacity: 0.9;">${d.subtitle}</p>
        </div>
    </section>

    <section class="section-padding bg-offwhite">
        <div class="container">
            <div class="storytelling scroll-reveal fade-up" style="max-width: 800px; margin: 0 auto; text-align: center;">
                <p class="lead" style="font-style: italic; color: var(--color-terra); font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 30px;">O segredo por trás do destino.</p>
                <p style="color: #555; font-size: 1.1rem; line-height: 1.8;">Nossos roteiros em ${d.name} fogem completamente do guia tradicional turístico. Acesso exclusivo a propriedades reclusas e curadoria feita por arquitetos de viagens farão você experimentar o lado autêntico e intocado desta região magnânima.</p>
                <a href="index.html#contato" class="btn-primary btn-large" style="margin-top: 40px; display: inline-block;">Agendar Briefing Deste Destino</a>
            </div>
        </div>
    </section>
</body>
</html>`;

let cardsStr = '';
for (let d of newDestinations) {
    let fPath = path.join(publicDir, d.url);
    fs.writeFileSync(fPath, templateHtml(d), 'utf8');

    cardsStr += `
                <!-- 15 New Destinations -->
                <div class="destino-card scroll-reveal fade-up" data-continent="${d.continent}" data-style="${d.style}">
                    <a href="${d.url}" style="display: block; width: 100%; height: 100%;">
                        <div class="destino-img" style="background-image: url('${d.image}');"></div>
                        <div class="destino-overlay">
                            <div class="destino-info">
                                <h3>${d.name}</h3>
                                <p>${d.subtitle}</p>
                                <span class="btn btn-outline" style="color: white; border-color: white;">Explorar <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </a>
                </div>`;
}

// Fixed append logic for destinos.html
let destsHtml = fs.readFileSync(destinosHtmlPath, 'utf8');
const egitoMarker = '<!-- 10. Egito -->';
if (destsHtml.includes(egitoMarker)) {
    // Find the end of the destinos-grid by looking for the next closing </div> of the grid container after Egito
    const parts = destsHtml.split(egitoMarker);
    const beforeEgito = parts[0];
    let afterEgito = egitoMarker + parts[1];
    
    // We expect afterEgito to look like:
    // <!-- 10. Egito -->
    // <div class="...">...</div>
    // </div>  <-- closing of destinos-grid
    // </div>  <-- closing of container
    
    // Simple way: replace the first '            </div>\n        </div>\n    </section>' safely
    let gridEndMatch = '            </div>\n        </div>\n    </section>';
    if(destsHtml.includes(gridEndMatch)) {
         destsHtml = destsHtml.replace(gridEndMatch, cardsStr + '\n' + gridEndMatch);
         fs.writeFileSync(destinosHtmlPath, destsHtml, 'utf8');
         console.log("Successfully appended exactly to the grid!");
    } else {
         console.log("Could not find grid end string");
    }
}
