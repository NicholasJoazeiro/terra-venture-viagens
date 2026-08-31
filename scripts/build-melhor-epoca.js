// Gera public/melhor-epoca.html: escolha um mês, veja quais destinos estão
// na melhor janela. É o tipo de página que atrai link e compartilhamento,
// e joga link interno para as 35 páginas de destino.
// Nome e imagem são lidos das próprias páginas de destino para não dessincronizar.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';

// Sazonalidade por destino. Consistente com o que já está escrito no
// parágrafo de abertura de cada página.
const SEASONS = {
    'alpes-suicos':             { m: [1,2,3,6,7,8,9,12], nota: 'Esqui de dezembro a março, trilhas e lagos de junho a setembro.' },
    'antartida':                { m: [11,12,1,2,3], nota: 'Única janela do ano: verão austral, quando o gelo abre passagem.' },
    'atacama':                  { m: [1,2,3,4,5,6,7,8,9,10,11,12], nota: 'Funciona o ano inteiro. Inverno tem noites mais frias e céu igualmente limpo.' },
    'bali':                     { m: [4,5,6,7,8,9,10], nota: 'Estação seca, a janela certa para Ubud e praia no mesmo roteiro.' },
    'banff':                    { m: [6,7,8,9], nota: 'Lagos degelam e as trilhas abrem por completo.' },
    'bora-bora':                { m: [5,6,7,8,9,10], nota: 'Estação seca, com lagoa calma e céu aberto.' },
    'capadocia':                { m: [4,5,6,9,10,11], nota: 'Balões sobem o ano todo, mas primavera e outono trazem o melhor clima.' },
    'cidade-do-cabo':           { m: [11,12,1,2,3], nota: 'Verão do hemisfério sul, com dias longos e vinhedos em cheio.' },
    'costa-amalfitana':         { m: [5,6,7,8,9], nota: 'Maio, junho e setembro entregam o mesmo mar com metade da lotação.' },
    'courchevel':               { m: [12,1,2,3,4], nota: 'Temporada de esqui nos Alpes franceses.' },
    'dolomitas':                { m: [1,2,3,6,7,8,9,12], nota: 'Verão para trilhas em Tre Cime, inverno para esqui com vista.' },
    'egito':                    { m: [10,11,12,1,2,3,4], nota: 'Calor no ponto certo para Gizé e o Vale dos Reis.' },
    'grande-barreira-de-coral': { m: [6,7,8,9,10], nota: 'Estação seca, com a melhor visibilidade para mergulho.' },
    'ilha-de-pascoa':           { m: [10,11,12,1,2,3], nota: 'Meses mais quentes, com o mar mais calmo para a travessia.' },
    'india':                    { m: [10,11,12,1,2,3], nota: 'Estação fresca, a única confortável para o Rajastão.' },
    'islandia':                 { m: [1,2,3,4,5,6,7,8,9,10,11,12], nota: 'Verão para a Ring Road inteira, inverno para aurora boreal.' },
    'japao':                    { m: [3,4,11], nota: 'Cerejeiras em março e abril, folhas vermelhas em novembro.' },
    'laponia':                  { m: [12,1,2,3], nota: 'Inverno profundo: auroras, trenó de huskies e iglus de vidro.' },
    'machu-picchu':             { m: [5,6,7,8,9], nota: 'Estação seca, com céu aberto sobre a citadela.' },
    'maldivas':                 { m: [11,12,1,2,3,4], nota: 'Estação seca, com mar transparente e sol firme.' },
    'marrakech':                { m: [3,4,5,9,10,11], nota: 'Calor no ponto certo para a medina a pé e o deserto próximo.' },
    'namibia':                  { m: [5,6,7,8,9,10], nota: 'Estação seca, com dunas nítidas e céu absurdamente azul.' },
    'noronha':                  { m: [1,2,3,4,5,6,7,8,9,10,11,12], nota: 'Agosto a dezembro para mergulho, janeiro a junho para surfe.' },
    'nova-zelandia':            { m: [12,1,2,3], nota: 'Verão abre todas as trilhas dos fiordes.' },
    'paris':                    { m: [4,5,6,9,10], nota: 'Melhor clima do ano, sem o calor nem a lotação do verão europeu.' },
    'patagonia':                { m: [10,11,12,1,2,3,4], nota: 'Alta de novembro a março. Abril e outubro: mesma paisagem, metade das pessoas.' },
    'petra':                    { m: [10,11,12,1,2,3,4], nota: 'Temperatura que permite caminhar o Siq inteiro.' },
    'ruanda':                   { m: [12,1,2,6,7,8,9], nota: 'Estações secas, quando as trilhas até os gorilas ficam firmes.' },
    'santiago':                 { m: [9,10,11,12,1,2,3,4], nota: 'Céu limpo para ver a cordilheira e janela das vinícolas do Maipo.' },
    'santorini':                { m: [5,6,7,8,9], nota: 'Maio, junho e setembro têm o mesmo pôr do sol com menos gente.' },
    'seychelles':               { m: [4,5,10,11], nota: 'Meses de transição, com mar calmo e vento fraco.' },
    'sri-lanka':                { m: [12,1,2,3,7,8,9], nota: 'Sul e oeste de dezembro a março, leste de julho a setembro.' },
    'tanzania':                 { m: [12,1,2,3,6,7,8,9,10], nota: 'Seca de junho a outubro concentra os animais. Dezembro a março é temporada de filhotes.' },
    'uzbequistao':              { m: [4,5,6,9,10], nota: 'Primavera e outono, sem o sol a pino do verão do deserto.' },
    'vietna':                   { m: [11,12,1,2,3,4], nota: 'Estação seca no norte, ideal para Ha Long e Hoi An.' },
};

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

// Lê nome e imagem de cada página de destino, para não dessincronizar
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
        meses: SEASONS[slug].m,
        nota: SEASONS[slug].nota,
    });
}
destinos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

const cards = destinos.map(d => `                <article class="epoca-card" data-meses="${d.meses.join(',')}">
                    <div class="epoca-card-img"><img loading="lazy" decoding="async" src="${d.img}" alt="${d.nome}"></div>
                    <div class="epoca-card-body">
                        <span class="epoca-card-pais">${d.pais}</span>
                        <h3><a href="/${d.slug}">${d.nome}</a></h3>
                        <p>${d.nota}</p>
                    </div>
                </article>`).join('\n');

const chips = MESES.map((m, i) => `                    <button class="epoca-chip" data-mes="${i + 1}" type="button">${m}</button>`).join('\n');

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
                    <li><a href="/#quem-somos">A Terra Venture</a></li>
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/#quiz">Descubra</a></li>
                    <li><a href="/blog">Diário</a></li>
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
            <p>Escolha o mês em que você consegue viajar. A gente mostra onde o mundo está no melhor momento.</p>
        </div>
    </section>

    <section class="epoca-section">
        <div class="container">
            <div class="epoca-chips" role="tablist" aria-label="Escolha o mês">
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
                    <li><a href="/blog">Diário de Bordo</a></li>
                    <li><a href="/melhor-epoca">Melhor época para viajar</a></li>
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
        var chips=document.querySelectorAll('.epoca-chip');
        var cards=document.querySelectorAll('.epoca-card');
        var status=document.getElementById('epoca-status');
        var ativo=null;

        function aplicar(mes){
            var n=0;
            cards.forEach(function(c){
                var meses=c.dataset.meses.split(',').map(Number);
                var ok=!mes||meses.indexOf(mes)!==-1;
                c.hidden=!ok;
                if(ok)n++;
            });
            if(mes){
                status.textContent=n+(n===1?' destino está':' destinos estão')+' na melhor janela em '+MESES[mes-1]+'.';
            }else{
                status.textContent='Mostrando os '+cards.length+' destinos. Escolha um mês para filtrar.';
            }
        }

        chips.forEach(function(ch){
            ch.addEventListener('click',function(){
                var mes=Number(ch.dataset.mes);
                if(ativo===mes){ ativo=null; ch.classList.remove('active'); ch.setAttribute('aria-pressed','false'); }
                else{
                    chips.forEach(function(x){x.classList.remove('active');x.setAttribute('aria-pressed','false');});
                    ch.classList.add('active'); ch.setAttribute('aria-pressed','true'); ativo=mes;
                }
                aplicar(ativo);
                if(typeof fbq==='function'){fbq('trackCustom','MelhorEpocaFiltro',{mes:ativo?MESES[ativo-1]:'todos'});}
            });
            ch.setAttribute('aria-pressed','false');
        });

        // pre-seleciona o mes atual, para a pagina ja abrir util
        var hoje=new Date().getMonth()+1;
        var alvo=document.querySelector('.epoca-chip[data-mes="'+hoje+'"]');
        if(alvo){alvo.click();}
    })();
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'melhor-epoca.html'), html, 'utf8');
console.log('melhor-epoca.html gerado com', destinos.length, 'destinos');
const semMes = destinos.filter(d => d.meses.length === 12).map(d => d.slug);
console.log('destinos marcados como ano inteiro:', semMes.join(', ') || 'nenhum');
