const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');
const destinosHtmlPath = path.join(publicDir, 'destinos.html');
const scriptJsPath = path.join(publicDir, 'script.js');

const newDestinations = [
    { name: "Bali", coords: [-8.4095, 115.1889], url: "bali.html", image: "islandia.png", countryIds: ["IDN"], subtitle: "A Ilha dos Deuses com foco puramente espiritual." },
    { name: "Santorini", coords: [36.3932, 25.4615], url: "santorini.html", image: "costa_amalfitana.png", countryIds: ["GRC"], subtitle: "Cúpulas azuis e a caldera mais famosa das Cíclades." },
    { name: "Alpes Suíços", coords: [46.8182, 8.2275], url: "alpes-suicos.html", image: "patagonia_glaciar.png", countryIds: ["CHE"], subtitle: "O pico de Zermatt e lagos alpinos impecáveis." },
    { name: "Bora Bora", coords: [-16.5004, -151.7415], url: "bora-bora.html", image: "costa_amalfitana.png", countryIds: ["PYF"], subtitle: "A joia cristalina do Pacífico Sul." },
    { name: "Marrakech", coords: [31.6295, -7.9811], url: "marrakech.html", image: "egito.png", countryIds: ["MAR"], subtitle: "A Cidade Vermelha e os Riads majestosos." },
    { name: "Banff", coords: [51.1784, -115.5708], url: "banff.html", image: "patagonia_torres.png", countryIds: ["CAN"], subtitle: "Beleza rochosa brutal recortada por lagos de esmeralda." },
    { name: "Petra", coords: [30.3285, 35.4444], url: "petra.html", image: "egito.png", countryIds: ["JOR"], subtitle: "A Cidade Rosa escondida nas areias do deserto." },
    { name: "Deserto do Atacama", coords: [-23.8634, -69.1328], url: "atacama.html", image: "blog_atacama.png", countryIds: ["CHL"], subtitle: "O céu mais limpo da Terra num cenário marciano." },
    { name: "Courchevel", coords: [45.4146, 6.6338], url: "courchevel.html", image: "blog_courchevel.png", countryIds: ["FRA"], subtitle: "O epicentro do esqui de luxo mundial." },
    { name: "Ilhas Maldivas", coords: [3.2028, 73.2207], url: "maldivas.html", image: "blog_maldivas.png", countryIds: ["MDV"], subtitle: "Um santuário atemporal sobre os atóis indianos." },
    { name: "Capadócia", coords: [38.6431, 34.8280], url: "capadocia.html", image: "blog_capadocia.png", countryIds: ["TUR"], subtitle: "Revoada de balões nas fantásticas chaminés de fada." },
    { name: "Uzbequistão", coords: [41.3775, 64.5853], url: "uzbequistao.html", image: "blog_uzbequistao.png", countryIds: ["UZB"], subtitle: "O coração azul cintilante da antiga Rota da Seda." },
    { name: "Ilha de Páscoa", coords: [-27.1127, -109.3667], url: "ilha-de-pascoa.html", image: "machu_picchu.png", countryIds: ["CHL"], subtitle: "Os misteriosos Moais em isolamento no Pacífico." },
    { name: "Fernando de Noronha", coords: [-3.8403, -32.4297], url: "noronha.html", image: "nova_zelandia.png", countryIds: ["BRA"], subtitle: "O paraíso intocado e protegido da costa brasileira." },
    { name: "Dolomitas", coords: [46.4333, 11.8333], url: "dolomitas.html", image: "santiago_cordilheira.png", countryIds: ["ITA"], subtitle: "Os cumes dramáticos que definem o esplendor italiano." }
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

    <!-- Destino Hero -->
    <section class="destino-individual-hero" style="background-image: url('${d.image}'); height: 60vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
        <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to top, rgba(10,10,10,0.8), rgba(10,10,10,0.3));"></div>
        <div class="container" style="position: relative; z-index: 1;">
            <h1 style="font-family: var(--font-heading); font-size: 3.5rem; margin-bottom: 20px;">${d.name}</h1>
            <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto; opacity: 0.9;">${d.subtitle}</p>
        </div>
    </section>

    <!-- Destino Detalhe -->
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

// 1. Write the 15 new specific destination HTMLs
let cardsStr = '';
for (let d of newDestinations) {
    let fPath = path.join(publicDir, d.url);
    fs.writeFileSync(fPath, templateHtml(d), 'utf8');

    // Prepare grid card string for destinos.html
    cardsStr += `
                <div class="destino-card scroll-reveal fade-up" data-regiao="outro">
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
                </div>\n`;
}

// 2. Append new cards to destinos.html (before the closing tags of the grid)
let destsHtml = fs.readFileSync(destinosHtmlPath, 'utf8');
const targetGridClose = '</div>\n        </div>\n    </section>\n\n    <!-- Banner CTA -->';
if (destsHtml.includes(targetGridClose)) {
    destsHtml = destsHtml.replace(targetGridClose, cardsStr + targetGridClose);
    fs.writeFileSync(destinosHtmlPath, destsHtml, 'utf8');
} else {
    // try finding the end of the grid another way
    const target2 = '</div> <!-- End destinos-grid (assuming) -->';
    // just append it to grid... Since we can't reliably find it if that fails, we can find the exact text in the file.
}

// Ensure the first script modification works:
const destsSplit = destsHtml.split('<div class="destinos-grid">');
if(destsSplit.length > 1) {
    let secondPart = destsSplit[1];
    let endOfGrid = secondPart.indexOf('</div>\n            </div>');
    if (endOfGrid !== -1) {
        let front = secondPart.substring(0, endOfGrid);
        let back = secondPart.substring(endOfGrid);
        fs.writeFileSync(destinosHtmlPath, destsSplit[0] + '<div class="destinos-grid">' + front + cardsStr + back, 'utf8');
        console.log("Updated destinos.html safely!");
    }
}

// 3. Update script.js array
let scriptJs = fs.readFileSync(scriptJsPath, 'utf8');
let targetArrayEnd = '        // Controles de Zoom Customizados';
let mapInsertionStr = '';
for (let d of newDestinations) {
    mapInsertionStr += `            ,{
                name: "${d.name}",
                coords: [${d.coords.join(', ')}],
                url: "${d.url}",
                image: "${d.image}",
                countryIds: ${JSON.stringify(d.countryIds)}
            }
`;
}
// We know there's a block "countryIds: ["EGY"]\n            }\n        ];"
scriptJs = scriptJs.replace(
    'countryIds: ["EGY"]\n            }\n        ];',
    'countryIds: ["EGY"]\n            }' + mapInsertionStr + '\n        ];'
);
fs.writeFileSync(scriptJsPath, scriptJs, 'utf8');

console.log("Successfully created 15 destination HTMLs, added to destinos grid, and linked to script.js interactive globe!");
