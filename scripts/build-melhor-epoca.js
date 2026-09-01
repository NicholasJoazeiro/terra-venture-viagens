// Gera public/melhor-epoca.html
//
// MODELO: cada destino tem TEMPORADAS, não uma nota única.
// Um destino pode estar na melhor janela por motivos opostos em épocas
// opostas (Santiago: vinhedos no verão, esqui no inverno). A nota exibida
// muda conforme o mês escolhido.
//
// REGRA DE CONTEÚDO: só entra mês que é de fato boa janela, e a nota diz
// POR QUE aquele mês. Nada de texto genérico, nada de mês incluído "pra
// encher". Quando existe ressalva relevante (estrada fechada, hotel
// fechado, temporada de água-viva), ela aparece.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';

const SEASONS = {
    'patagonia': [
        { m: [11, 12, 1, 2, 3], n: 'Verão austral: trilhas de Torres del Paine abertas, dias que esticam até quase meia-noite e navegação liberada nos glaciares.' },
        { m: [4, 10], n: 'Temporada de ombro. Mesma paisagem com metade das pessoas, em troca de mais frio e alguns acessos ainda fechados.' },
    ],
    'santiago': [
        { m: [9, 10, 11, 12, 1, 2], n: 'Céu limpo para ver a cordilheira do alto do Sky Costanera e dias longos nas vinícolas do Vale do Maipo.' },
        { m: [3, 4], n: 'Vindima no Maipo e no Colchagua: colheita, pisa da uva e almoços entre os vinhedos.' },
        { m: [6, 7, 8], n: 'Temporada de esqui em Valle Nevado, La Parva e Portillo, a cerca de uma hora do centro.' },
    ],
    'atacama': [
        { m: [3, 4, 5, 9, 10, 11], n: 'Meses mais equilibrados do deserto: dias amenos, noites frias e céu limpo para os salares e o Valle de la Luna.' },
        { m: [6, 7, 8], n: 'Inverno: as noites mais frias do ano e também as mais limpas, o melhor período para astronomia.' },
        { m: [12], n: 'Dias longos e quentes antes das chuvas de altiplano de janeiro e fevereiro.' },
    ],
    'machu-picchu': [
        { m: [5, 6, 7, 8, 9], n: 'Estação seca: céu aberto sobre a citadela e trilhas em boas condições. É preciso reservar ingresso com meses de antecedência.' },
        { m: [4, 10], n: 'Ombro da estação seca: vegetação ainda verde das chuvas e bem menos gente nas ruínas.' },
    ],
    'noronha': [
        { m: [8, 9, 10, 11, 12], n: 'Mar mais transparente do ano, a melhor janela para mergulho na Baía do Sancho e no Porto de Santo Antônio.' },
        { m: [1, 2, 3, 4, 5, 6], n: 'Temporada de ondas na Cacimba do Padre, quando a ilha vira ponto de surfe.' },
    ],
    'ilha-de-pascoa': [
        { m: [10, 11, 12, 1, 3], n: 'Meses mais quentes, com mar calmo para chegar aos campos de moais da costa.' },
        { m: [2], n: 'Tapati Rapa Nui: o festival cultural da ilha, com competições e danças tradicionais rapanui.' },
    ],
    'banff': [
        { m: [6, 7, 8, 9], n: 'Lagos degelados no azul turquesa que dá fama a Louise e Moraine, com todas as trilhas abertas.' },
        { m: [12, 1, 2, 3], n: 'Temporada de esqui em Lake Louise e Sunshine Village. A estrada de Moraine Lake fecha no inverno.' },
    ],
    'paris': [
        { m: [4, 5, 6, 9, 10], n: 'Melhor clima do ano, sem o calor nem a lotação do verão europeu. Dias longos para caminhar bairro a bairro.' },
        { m: [12], n: 'Vitrines de Natal, luzes nos bulevares e museus vazios nas manhãs frias.' },
    ],
    'santorini': [
        { m: [5, 6, 9, 10], n: 'Ombro da temporada: o mesmo pôr do sol de Oia com bem menos gente e hotéis com vista ainda disponíveis.' },
        { m: [7, 8], n: 'Auge do verão grego. Ilha cheia e quente, mas com a caldeira no seu azul mais intenso.' },
    ],
    'costa-amalfitana': [
        { m: [5, 6, 9], n: 'A costa no ponto: mar quente, limoeiros carregados e as ruelas de Positano sem os ônibus de julho.' },
        { m: [7, 8], n: 'Alta temporada italiana. Mais calor e mais gente, com a costa na sua energia máxima.' },
        { m: [4, 10], n: 'Bordas da temporada: dias amenos e preços mais baixos, com parte dos hotéis já abrindo ou encerrando.' },
    ],
    'alpes-suicos': [
        { m: [12, 1, 2, 3], n: 'Temporada de esqui em Zermatt, com o Matterhorn como pano de fundo e vilarejos sem carro.' },
        { m: [6, 7, 8, 9], n: 'Verão alpino: trilhas abertas, lagos de degelo e o Glacier Express cruzando os vales.' },
    ],
    'dolomitas': [
        { m: [6, 7, 8, 9], n: 'Trilhas e vias ferratas abertas em torno das Tre Cime, com refúgios de montanha funcionando.' },
        { m: [12, 1, 2, 3], n: 'Esqui no circuito Dolomiti Superski, com os picos rosados cobertos de neve.' },
    ],
    'courchevel': [
        { m: [12, 1, 2, 3, 4], n: 'Temporada de esqui nos Trois Vallées. Fora do inverno, boa parte dos chalés e restaurantes fecha.' },
    ],
    'islandia': [
        { m: [6, 7, 8], n: 'Sol da meia-noite: Ring Road inteira aberta, incluindo as estradas de terras altas que só existem no verão.' },
        { m: [9, 10, 11, 12, 1, 2, 3], n: 'Temporada de aurora boreal, com noites longas e escuras. As terras altas ficam fechadas.' },
    ],
    'laponia': [
        { m: [12, 1, 2, 3], n: 'Inverno ártico: auroras, trenó puxado por huskies e cabanas de teto de vidro sobre a neve.' },
        { m: [6, 7], n: 'Sol da meia-noite: o dia não termina, e a floresta fica aberta para caminhada e canoa.' },
    ],
    'uzbequistao': [
        { m: [4, 5, 9, 10], n: 'Primavera e outono: temperatura para caminhar entre as madraças de Samarcanda sem o sol a pino do deserto.' },
    ],
    'marrakech': [
        { m: [3, 4, 5, 9, 10, 11], n: 'Calor no ponto certo para percorrer a medina a pé e escapar para o deserto ou para o Atlas.' },
        { m: [12, 1, 2], n: 'Dias amenos e noites frias, com o Alto Atlas coberto de neve a poucas horas da cidade.' },
    ],
    'egito': [
        { m: [10, 11, 12, 1, 2, 3, 4], n: 'Única janela confortável: temperatura que permite explorar Gizé e o Vale dos Reis sem exaustão.' },
    ],
    'petra': [
        { m: [3, 4, 5, 9, 10, 11], n: 'Primavera e outono: dá para caminhar o Siq inteiro até o Mosteiro sem o calor extremo do verão jordaniano.' },
        { m: [12, 1, 2], n: 'Baixa temporada: frio seco e sítio bem mais vazio. Pode chover e, raramente, nevar sobre o Tesouro.' },
    ],
    'tanzania': [
        { m: [6, 7, 8, 9, 10], n: 'Estação seca: a vegetação abre e os animais se concentram nos pontos de água, o melhor período para safári.' },
        { m: [7, 8, 9], n: 'A Grande Migração cruza o rio Mara, o momento mais disputado do calendário de safári.' },
        { m: [1, 2, 3], n: 'Temporada de parto no Ndutu: milhares de filhotes de gnu nascem em poucas semanas, atraindo predadores.' },
    ],
    'ruanda': [
        { m: [6, 7, 8, 9], n: 'Estação seca longa: as trilhas de barro até os gorilas ficam firmes, o que torna o trekking bem menos duro.' },
        { m: [12, 1, 2], n: 'Estação seca curta: mesma condição de trilha, com florestas mais verdes das chuvas recentes.' },
    ],
    'namibia': [
        { m: [5, 6, 7, 8, 9, 10], n: 'Estação seca: dunas de Sossusvlei nítidas ao amanhecer e animais reunidos nos poços do Etosha.' },
    ],
    'cidade-do-cabo': [
        { m: [11, 12, 1, 2, 3], n: 'Verão do hemisfério sul: praias, dias longos e vinhedos de Stellenbosch em plena atividade.' },
        { m: [7, 8, 9, 10], n: 'Temporada de baleias-francas em Hermanus, a duas horas da cidade, com avistamento a partir da própria costa.' },
    ],
    'seychelles': [
        { m: [4, 5, 10, 11], n: 'Meses de transição entre as monções: vento fraco, mar calmo e a melhor visibilidade do ano para mergulho.' },
    ],
    'japao': [
        { m: [3, 4], n: 'Floração das cerejeiras. A janela é curta e muda a cada ano, então exige reserva com meses de antecedência.' },
        { m: [11], n: 'Momiji: os bordos ficam vermelhos e os templos de Kyoto entram no seu período mais fotografado.' },
        { m: [1, 2], n: 'Neve em Hokkaido e nos Alpes japoneses, temporada de onsen ao ar livre e de esqui em pó.' },
    ],
    'bali': [
        { m: [4, 5, 6, 7, 8, 9, 10], n: 'Estação seca: a janela para combinar arrozais de Ubud e dias de praia no mesmo roteiro.' },
    ],
    'maldivas': [
        { m: [11, 12, 1, 2, 3, 4], n: 'Estação seca: mar transparente, sol firme e a melhor visibilidade para mergulho nos atóis.' },
        { m: [6, 7, 8], n: 'Monção do sudoeste traz plâncton e, com ele, arraias-manta e tubarões-baleia em Hanifaru. Chove mais, em pancadas curtas.' },
    ],
    'vietna': [
        { m: [10, 11, 12, 1, 2, 3], n: 'Norte no seco: melhor período para navegar a Baía de Ha Long com céu aberto e menos neblina.' },
        { m: [2, 3, 4, 5, 6, 7], n: 'Centro do país no seco: Hoi An e as praias de Da Nang na sua melhor fase, antes das chuvas de outubro.' },
    ],
    'india': [
        { m: [10, 11, 12, 1, 2], n: 'Estação fresca: a única realmente confortável para percorrer o Rajastão e ver o Taj Mahal ao amanhecer.' },
        { m: [3], n: 'Holi, o festival das cores, ainda dentro da janela de clima ameno no norte do país.' },
    ],
    'sri-lanka': [
        { m: [12, 1, 2, 3, 4], n: 'Sul e oeste no seco: praias de Mirissa e Galle, e temporada de baleias-azuis na costa sul.' },
        { m: [5, 6, 7, 8, 9], n: 'Costa leste no seco: Trincomalee e Arugam Bay, enquanto o oeste recebe a monção.' },
    ],
    'capadocia': [
        { m: [4, 5, 6, 9, 10, 11], n: 'Melhor clima para o voo de balão ao amanhecer, com menos cancelamento por vento.' },
        { m: [12, 1, 2], n: 'Neve sobre as chaminés de fada. A paisagem fica única, mas o balão cancela com mais frequência.' },
    ],
    'nova-zelandia': [
        { m: [12, 1, 2, 3], n: 'Verão: todas as trilhas abertas, incluindo Milford Track e Tongariro, com dias longos para dirigir as duas ilhas.' },
        { m: [7, 8, 9], n: 'Temporada de esqui em Queenstown e Wanaka, nos campos dos Alpes do Sul.' },
    ],
    'bora-bora': [
        { m: [5, 6, 8, 9, 10], n: 'Estação seca: lagoa calma e transparente, o período certo para os bangalôs sobre a água.' },
        { m: [7], n: 'Heiva: o maior festival da Polinésia Francesa, com dança, canto e competições tradicionais.' },
    ],
    'grande-barreira-de-coral': [
        { m: [6, 7, 8, 9, 10], n: 'Estação seca, com a melhor visibilidade do ano e fora da temporada de águas-vivas, que vai de novembro a maio.' },
        { m: [6, 7], n: 'Baleias jubarte passam pelas Whitsundays na rota de migração.' },
    ],
    'antartida': [
        { m: [11], n: 'Começo da janela: gelo ainda intacto, paisagem mais branca e pinguins em pleno cortejo.' },
        { m: [12, 1], n: 'Auge do verão austral: filhotes de pinguim nascendo e até vinte horas de luz por dia.' },
        { m: [2, 3], n: 'Fim da temporada: melhor período para avistamento de baleias e desembarques com menos gelo no caminho.' },
    ],
};

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Lê nome/país/imagem das próprias páginas de destino, para não dessincronizar
const destinos = [];
for (const slug of Object.keys(SEASONS)) {
    const fp = path.join(dir, slug + '.html');
    if (!fs.existsSync(fp)) { console.log('AVISO: pagina nao encontrada:', slug); continue; }
    const s = fs.readFileSync(fp, 'utf8');
    const h1 = (s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    const eyebrow = (s.match(/<span class="eyebrow">([^<]*)<\/span>/) || [])[1];
    const img = (s.match(/background-image:[^;]*url\('([^']+\.webp)'\)/) || [])[1]
        || (s.match(/src="([a-zA-Z0-9_.,-]+\.webp)"/) || [])[1];
    if (!h1 || !img) { console.log('AVISO: sem h1/img:', slug); continue; }
    destinos.push({
        slug,
        nome: h1.replace(/<[^>]*>/g, '').trim(),
        pais: (eyebrow || '').trim(),
        img,
        temporadas: SEASONS[slug],
    });
}
destinos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

// checagem de sanidade do dataset
let erros = [];
for (const d of destinos) {
    const todos = new Set();
    d.temporadas.forEach(t => t.m.forEach(m => {
        if (m < 1 || m > 12) erros.push(d.slug + ': mes invalido ' + m);
        todos.add(m);
    }));
    if (!todos.size) erros.push(d.slug + ': sem nenhum mes');
    d.temporadas.forEach(t => { if (!t.n || t.n.length < 30) erros.push(d.slug + ': nota curta demais'); });
}
if (erros.length) { console.error('ERROS NO DATASET:\n' + erros.join('\n')); process.exit(1); }

const esc = t => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = destinos.map(d => {
    const todosMeses = [...new Set(d.temporadas.flatMap(t => t.m))].sort((a, b) => a - b);
    const dados = esc(JSON.stringify(d.temporadas));
    return `                <article class="epoca-card" data-meses="${todosMeses.join(',')}" data-temporadas="${dados}">
                    <div class="epoca-card-img"><img loading="lazy" decoding="async" src="${d.img}" alt="${d.nome}"></div>
                    <div class="epoca-card-body">
                        <span class="epoca-card-pais">${d.pais}</span>
                        <h3><a href="/${d.slug}">${d.nome}</a></h3>
                        <p class="epoca-card-nota">${d.temporadas[0].n}</p>
                    </div>
                </article>`;
}).join('\n');

const chips = MESES.map((m, i) => `                    <button class="epoca-chip" data-mes="${i + 1}" type="button" aria-pressed="false">${m}</button>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Melhor Época para Viajar: Guia Mês a Mês | Terra Venture</title>
    <link rel="canonical" href="${base}/melhor-epoca">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Melhor Época para Viajar: Guia Mês a Mês",
      "description": "Escolha o mês e descubra quais destinos estão na melhor janela do ano.",
      "url": "${base}/melhor-epoca",
      "inLanguage": "pt-BR",
      "publisher": {
        "@type": "TravelAgency",
        "name": "Terra Venture Viagens",
        "url": "${base}/"
      }
    }
    </script>
    <meta property="og:type" content="website">
    <meta property="og:url" content="${base}/melhor-epoca">
    <meta property="og:title" content="Melhor Época para Viajar: Guia Mês a Mês | Terra Venture">
    <meta property="og:description" content="Escolha o mês e descubra quais destinos estão na melhor janela do ano.">
    <meta property="og:image" content="${base}/og-image.jpg">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Terra Venture Viagens">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Melhor Época para Viajar: Guia Mês a Mês | Terra Venture">
    <meta name="twitter:description" content="Escolha o mês e descubra quais destinos estão na melhor janela do ano.">
    <meta name="twitter:image" content="${base}/og-image.jpg">
    <link rel="icon" type="image/webp" href="icon.webp">
    <meta name="description" content="Escolha o mês e veja quais destinos estão na melhor janela do ano, de Patagônia a Japão. Guia mês a mês da Terra Venture.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="terra.css">
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','1383241600338162');fbq('track','PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1383241600338162&ev=PageView&noscript=1" alt=""/></noscript>
</head>
<body>
    <header class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="/" class="logo">Terra Venture</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/melhor-epoca">Melhor Época</a></li>
                    <li><a href="/blog">Diário</a></li>
                    <li><a href="/#quem-somos">A Terra Venture</a></li>
                    <li><a href="https://wa.me/5551994596233?text=Olá! Gostaria de uma consultoria de viagem." class="btn-primary nav-btn" target="_blank">Conversar</a></li>
                </ul>
            </nav>
            <div class="menu-toggle" id="mobile-menu"><i class="fas fa-bars"></i></div>
        </div>
    </header>

    <section class="epoca-hero">
        <div class="container">
            <span class="eyebrow">Guia mês a mês</span>
            <h1>Todo lugar tem a sua hora.</h1>
            <p>Escolha o mês em que você consegue viajar. A gente mostra onde o mundo está no melhor momento, e por quê.</p>
        </div>
    </section>

    <section class="epoca-section">
        <div class="container">
            <div class="epoca-chips" role="group" aria-label="Escolha o mês">
${chips}
            </div>
            <p class="epoca-status" id="epoca-status" role="status">Mostrando os ${destinos.length} destinos. Escolha um mês para filtrar.</p>
            <div class="epoca-grid" id="epoca-grid">
${cards}
            </div>
            <div class="epoca-cta">
                <h2>Achou o seu mês?</h2>
                <p>A gente desenha o roteiro inteiro a partir daí. A primeira conversa é sem compromisso.</p>
                <a class="btn-primary btn-large" href="https://wa.me/5551994596233?text=Olá! Vi o guia de melhor época no site e queria conversar sobre uma viagem." target="_blank">Conversar com a gente</a>
            </div>
        </div>
    </section>

        <footer class="footer">
        <div class="footer-main">
            <div class="container footer-grid">
                <div class="footer-brand">
                    <h3 class="logo-text">Terra Venture</h3>
                    <p>A essência da aventura com o conforto da exclusividade. Do sonho ao retorno.</p>
                    <p>Com sede em Ivoti, no Vale dos Sinos, atendemos clientes de todo o Brasil.</p>
                    <div class="footer-social" style="margin-top:16px;"><a href="https://www.instagram.com/terraventureviagens/" target="_blank" style="display:inline-flex;align-items:center;gap:8px;color:var(--bone-dim);font-size:.95rem;"><i class="fab fa-instagram" style="font-size:1.3rem;"></i> @terraventureviagens</a></div>
                </div>
                <div class="footer-links"><h4>Navegação</h4><ul>
                    <li><a href="/#quem-somos">A Agência</a></li>
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/melhor-epoca">Melhor época para viajar</a></li>
                    <li><a href="/blog">Diário de Bordo</a></li>
                    <li><a href="/#contato">Contato</a></li>
                </ul></div>
                <div class="footer-links"><h4>Contato</h4><ul>
                    <li><a href="https://wa.me/5551994596233" target="_blank">WhatsApp</a></li>
                    <li><a href="mailto:contato@terraventureviagens.com.br">Email</a></li>
                    <li><a href="/transfer-executivo">Transfer Executivo</a></li>
                </ul></div>
            </div>
        </div>
        <div class="footer-bottom"><div class="container"><p>&copy; 2026 Terra Venture Viagens. Todos os direitos reservados.</p></div></div>
    </footer>

    <a href="https://wa.me/5551994596233" class="whatsapp-float pulse" target="_blank" aria-label="Falar com um Guia Especialista"><i class="fab fa-whatsapp"></i></a>
    <script src="script.js"></script>
    <script>
    (function(){
        var MESES=${JSON.stringify(MESES)};
        var chips=[].slice.call(document.querySelectorAll('.epoca-chip'));
        var cards=[].slice.call(document.querySelectorAll('.epoca-card'));
        var status=document.getElementById('epoca-status');
        var ativo=null;

        cards.forEach(function(c){
            try{ c._temporadas=JSON.parse(c.dataset.temporadas); }
            catch(e){ c._temporadas=[]; }
            c._notaPadrao=c._temporadas.length?c._temporadas[0].n:'';
        });

        function notaDoMes(card,mes){
            // Se o destino tem mais de uma temporada no mesmo mês (ex: seca e
            // migração na Tanzânia), vence a mais específica: a de menos meses.
            var candidatas=card._temporadas.filter(function(t){return t.m.indexOf(mes)!==-1;});
            if(!candidatas.length) return card._notaPadrao;
            candidatas.sort(function(a,b){return a.m.length-b.m.length;});
            return candidatas[0].n;
        }

        function aplicar(mes){
            var n=0;
            cards.forEach(function(c){
                var meses=c.dataset.meses.split(',').map(Number);
                var ok=!mes||meses.indexOf(mes)!==-1;
                c.hidden=!ok;
                if(ok){
                    n++;
                    var p=c.querySelector('.epoca-card-nota');
                    if(p) p.textContent=mes?notaDoMes(c,mes):c._notaPadrao;
                }
            });
            status.textContent=mes
                ? n+(n===1?' destino está':' destinos estão')+' na melhor janela em '+MESES[mes-1]+'.'
                : 'Mostrando os '+cards.length+' destinos. Escolha um mês para filtrar.';
        }

        chips.forEach(function(ch){
            ch.addEventListener('click',function(){
                var mes=Number(ch.dataset.mes);
                if(ativo===mes){
                    ativo=null; ch.classList.remove('active'); ch.setAttribute('aria-pressed','false');
                }else{
                    chips.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false');});
                    ch.classList.add('active'); ch.setAttribute('aria-pressed','true'); ativo=mes;
                }
                aplicar(ativo);
                if(typeof fbq==='function'){fbq('trackCustom','MelhorEpocaFiltro',{mes:ativo?MESES[ativo-1]:'todos'});}
            });
        });

        // abre já filtrada pelo mês corrente
        var alvo=document.querySelector('.epoca-chip[data-mes="'+(new Date().getMonth()+1)+'"]');
        if(alvo) alvo.click();
    })();
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'melhor-epoca.html'), html, 'utf8');

// relatório de cobertura por mês
const porMes = {};
for (let m = 1; m <= 12; m++) porMes[m] = destinos.filter(d => d.temporadas.some(t => t.m.indexOf(m) !== -1)).length;
console.log('melhor-epoca.html gerado com', destinos.length, 'destinos');
console.log('temporadas totais:', destinos.reduce((s, d) => s + d.temporadas.length, 0));
console.log('--- destinos por mes ---');
MESES.forEach((nome, i) => console.log('  ' + nome.padEnd(10) + porMes[i + 1]));
