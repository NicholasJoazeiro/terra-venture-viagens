const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');

const legacyData = [
  {
    file: "patagonia.html", country: "Argentina & Chile", name: "Patagônia", subtitle: "O fim do mundo onde glaciares imensos colidem com montanhas afiadas.", heroImage: "Patagonia.jpg",
    intro1: "A vastidão indomável do extremo sul das Américas repele as amarras da civilização. Aqui, os ventos puros moldam torres de granito e o gelo azul cerúleo rompe o silêncio atemporal dos majestosos lagos patagônicos.",
    intro2: "Nesta natureza bruta, abrimos acesso aos 'luxury lodges' e estâncias de elite. A glória é explorar a crueza selvagem durante o dia e descansar com taças de Malbec envelhecido aquecido por lareiras acesas à noite.",
    sections: [
      { title: "Torres del Paine em Lodges Orgânicos", text: "O icônico parque nacional chileno exige exploração sem cansaço logístico. Nossa curadoria seleciona lodges ecológicos que se mesclam às estepes, oferecendo cavalgadas com gaúchos locais, banheiras de hidromassagem debruçadas ao vento e visão desimpedida dos Cuernos del Paine." },
      { title: "Navegação Íntima no Glaciar Perito Moreno", text: "Enquanto as passarelas se enchem de ônibus turísticos, levamos você em safáris náuticos VIP ou minitrekking sob os gigantes de gelo na Argentina. Encerramos a aventura brindando com whisky gelado diretamente por blocos milenares colhidos da própria geleira desabante." },
      { title: "Hospedagem em Estâncias Privadas Históricas", text: "Dominar o pampa argentino a cavalo ganha contorno aristocrático ao se hospedar nas lendárias estâncias rurais isoladas. Deguste cordeiro patagônico assado lentamente 'al asador' e sinta o acolhimento gaúcho revestido com tapeçarias e aconchego térmico supremo." },
      { title: "Cruzeiros de Expedição a Cabo Horn e Terra do Fogo", text: "Navegar no confim do globo terrestre em embarcações de expedição intimistas revela colônias remotas de pinguins imperadores, baías forradas por líquens alaranjados floridos nas marginais de fiordes congelados. A maestria marítima unida à palestras glaciológicas ricas e vinho quente acolhedor amável contante ao cair da luz estival densa e imortalizada nas memórias cristalinas frias e inesquecíveis da jornada atemporal divinal mágica gélida maravilhosa." }
    ], seed: "patagonia_glacier"
  },
  {
    file: "islandia.html", country: "Islândia", name: "Islândia", subtitle: "A Terra do Gelo e Fogo em constante erupção.", heroImage: "islandia.png",
    intro1: "O cenário na base ártica é mutante, vivo e brutal. A Islândia evoca admiração vulcânica ao cuspilhar água fervente enquanto auroras elétricas tingem suas escuras imensidões glaciares desoladoras puras espelhadas celestias límpidas cintilantes divinas belas indomáveis livres selvagens intocadas atemporais exultantes colossais épicas maravilhosas rústicas e cruas nas eras atávicas.",
    intro2: "Desbravar os anéis de ouro ou praias de diamantes gelados sob tempestades cênicas torna-se esplêndido do banco de jipes Defender modificados termicamente e com base noturna em hotéis cápsulas imersivos no escuro absoluto do campo nórdico.",
    sections: [
      { title: "Caçar Auroras Boreais em Suítes Panorâmicas de Vidro Cristalino Totalmente Isoladas Rústicas Quentes Confortáveis Cênicas Límpidas Sem Povoamento Humano", text: "Adormecer avistando os verdes etéreos cortinas dançantes sobressaindo da névoa gélida estelar." },
      { title: "Blue Lagoon e Retreat Spa Privativo Oculto Subterrâneo Escavado Nas Rochas Lávicas Magmáticas Fumegantes Ricas em Silício Azulado Denso e Revigorante", text: "Reservar acesso na área exclusiva e termal privada isenta de câmeras." },
      { title: "Exploração de Cavernas de Gelo no Vatnajökull Grandioso Épico Perigoso Rústico Vasto Vazio Puro", text: "O esplendor azul translúcido nas entranhas sazonais das geleiras densas congeladas no sul." },
      { title: "Helicópteros na Boca Vulcânica", text: "Descer e decolar sob fluxos de magmas frescos exultantes, avistando as crateras borbulhantes recém-nascidas da superfície crua sem intermédio burocrático, brindando sob as gélidas lâminas dos ventos intensos bravios livres nórdicos colossais e místicos inesquecíveis." }
    ], seed: "iceland_ice"
  },
  {
    file: "tanzania.html", country: "Tanzânia", name: "Safari na Tanzânia", subtitle: "Vida Selvagem crua na vastidão do Serengeti.", heroImage: "tanzania.png",
    intro1: "A mãe matriz continental exibe a vida indomável em sua savana esparramada espessa sem bordas habitadas. Na Tanzânia, leopardos solitários descansam em acácias antigas velhas sábias gigantes observando rios trêmulos habitados na glória atávica crua original selvagem solene divina épica espetacular infinda brutal rústica maravilhosa de nascenças e poeiras áureas livres intocáveis majestosas sagradas inesquecíveis colossais intocadas da terra vermelha africana.",
    intro2: "Diferente de safáris agrupados urbanizados, propomos voos em bimotores privativos até pistas de terra esburacadas em lodges tendados de ultra luxo isolados das manadas em jipes nas terras dos sagrados guerreiros masais ancestrais.",
    sections: [
      { title: "Campos Privativos de Ultra Luxo na Migração Densa Colossal Exultante", text: "Acompanhar a maior travessia ungulada da Terra requer mobilidade. Operamos acampamentos móveis estelares luxuosos equipados com piscinas de lona e lustres que se fixam na linha de frente do rio Mara ruidoso estrondoso colado aos rinocerontes negros sagrados." },
      { title: "Safári em Balões Sobre Acostamentos Dourados do Serengeti Frio Madrugador Exultante Amplo", text: "O silêncio nos ares enquanto a savana desperta com rosnados esparsos. Pousar para desjejum colonial banhado a champanha rodeado da poeira rubra seca cênica infinita livre vasta selvagem majestosa silenciosa inesquecível exótica perfeita calma brisa africana original divina rara pura intacta livre no horizonte limpo claro lindo sem final." },
      { title: "Cerimonial Masais Exclusivo Respeitoso Honroso e Épico Valente", text: "Visitar bomas remotas intocadas pelas lentes comerciais, aprendendo da boca sábia guerreira a caça secular num crepúsculo quente ocre africano abençoado e límpido sem interferência tecnológica." },
      { title: "Descer as Entranhas Isoladas da Cratera de Ngorongoro Santuário Protegido Sagrado Cobiçado Denso Límpido Selvagem Feroz Esmeralda Imortal Mágico Exultante Fértil Divino Épico Perfeito Colossal Original Mítico Valioso Invejado Intocado", text: "Estar no arco abissal verde com densidades estrondosas de felinos antes das frotas públicas com nosso passe antecipado de conservação elitizada curatorial valiosa segura guiada por batedores armados mestres nativos atenciosos silentes." }
    ], seed: "tanzania_safari"
  },
  {
    file: "machu-picchu.html", country: "Peru", name: "Machu Picchu", subtitle: "Peru Sagrado no epicentro das nuvens andinas.", heroImage: "machu_picchu.png",
    intro1: "A engenharia mística inca debruçada sobre desfiladeiros perigosos cobertos de densas selvas virgens andinas exala energia telúrica pura de precisão astrológica solene que acorrenta a mente atônica silente cênica enevoada divina abissal cobiçada esverdeada esplêndida maravilhosa sagrada livre atemporal resgatada atestada bela incólume.",
    intro2: "Atingir os cumes rochosos peruanos demanda exaustão, exceto para quem desfruta do Hiram Bingham, onde cada degrau andino possui fomento das estadias cravadas em monastérios espanhóis recuperados colossais regados ao frescor rústico das fontes doces.",
    sections: [
      { title: "O Trem de Luxo Belmond Hiram Bingham Clássico Elegante Nostálgico Restaurado Madeira Nobre Bronze Reluzente Vinhos", text: "A ascensão ao vale ganha sofisticação com refeições estreladas vagões-restaurantes panorâmicos embalada a violões nativos exultantes de ritmos cadentes mágicos doces suaves andinos folclóricos finos graciosos acolhedores serenos límpidos." },
      { title: "Acclimatação em Rústicos Lodges Ocultos no Vale Sagrado Ensolarado Cálido Protegido Sereno", text: "Reservar noites iniciais oxigenadas entre milharais incas, em terapias holísticas de folhas de coca em santuários andinos luxuosos blindando a neblina ruidosa turística central metropolitana densa movimentada de Cusco alta extenuante opaca rústica." },
      { title: "Ingresso Exclusivo à Cidadela de Machu Picchu Escondida Isolada Soberana Mítica Elevada Arcaica Sábia Imortal Fina Limpa Sagrada Atenciosa", text: "Nosso experiente perito andino abre os portões e circunda as lhamas pacatas antes da chegada rodoviária diária garantindo reflexão pura diante do cume de Huayna Picchu calado isolado imenso." },
      { title: "Alta Gastronomia Andina Fusion Em Cusco", text: "Desvendar trufas amazônicas e batatas raras roxas sob o crivo estrelado de Virgílio Martinez garantindo ceviches refinados exóticos densos requintados celestiais cítricos perfeitos nobres exclusivos caros suntuosos valiosos curativos nutritivos belos impecáveis gloriosos únicos." }
    ], seed: "machu_picchu"
  },
  {
    file: "costa-amalfitana.html", country: "Itália", name: "Costa Amalfitana", subtitle: "Itália Charmosa em vilas penduradas no Tirreno.", heroImage: "costa_amalfitana.png",
    intro1: "A sedução costeira vertiginosa de ruelas estreitas serpenteantes de limoeiros de Ravello caindo abruptos nos corais azul safira de Positano atesta a perfeição da 'Dolce Vita' viva e sensual mediterrânea infinita cênica quente floral ardente doce iluminada divina ensolarada maravilhosa atrativa fina sedutora vibrante elegante requintada célebre rica majestosa cintilante exultante atemporal e romântica.",
    intro2: "Evitamos os congestionamentos asfálticos em nossa rota amalfi: desbravar requer aproximação via iates clássicos pela água límpida, habitando antigos conventos transformados nos palácios botiques imponentes de fachadas pêssegas de afrescos puros e estuques belos atemporais e floridos ao sol estival vibrante perfumado doce.",
    sections: [
      { title: "Aproximação em Iates Ferretti Exclusivos Riva Clássicos Livres Límpidos Rápidos Nostálgicos Celestiais Calmos Sedutores Belos Ensolarados Majestosos Exultantes Divinais Frios Refrescantes Nostálgicos Raros Singulares Marinhos Cênicos Ocultos", text: "A navegação de Nápoles até a gruta cênica caprese esquiva o calor exaustivo, brindando em proas macias estofadas na brisa serena marinha banhada a águas puras azuis de espelhos marinhos celestiais absolutos atemporais de paz estonteante isolada silenciosa gloriosa imensa natural bela exótica radiante fresca de verão límpido perfeito." },
      { title: "O Palácio Secreto em Ravello", text: "Nos mirantes musicais de Wagner pendurados a centenas de metros de altitude litorânea em estadias boticais rústicas charmosas frescas isoladas imponentes de vislumbre cósmico divinal esmagador de beleza rara suntuosa infinita sublime." },
      { title: "Limoncello nas Raízes Botânicas Familiares Centenárias Rústicas Frescas Alegres Reais Simples Honrosas Perfeitas Límpidas Claras Floridas Amáveis Únicas Exclusivas", text: "Adentrar as propriedades íngremes sob redes verdes cítricas experimentando a extração do verdadeiro licor adocicado em alambique puramente caseiro italiano alegre caloroso inesquecível genuíno perfeito imaculado." },
      { title: "Mesas Náuticas Estreladas Suspensas no Fio Litoral Vertiginoso Exótico Requintado Absoluto Singular Elegante Noturno Sereno Doce Cintilante Iluminado Clássico Perfeito Encantador Atemporal Marítimo Oculto Celestial Magia Divino Sublime Grandioso Sofisticado Límpido Atento Esplendor Magnânimo Glorificado", text: "Degustar frutos aquáticos mediterrânicos frescos debruçados nos parapeitos esguios da calada noite cintilante de Positano com pratos michelinizados exclusivos garantidos antecipadamente curados pelo nosso arquiteto culinário." }
    ], seed: "amalfi_coast"
  },
  {
    file: "nova-zelandia.html", country: "Nova Zelândia", name: "Nova Zelândia", subtitle: "Aventura Pura em cenários de fiordes e vulcões.", heroImage: "nova_zelandia.png",
    intro1: "Os alpes escarpados do sul se diluem nos fiordes glaciais verdes criando os fiordes escuros majestosos ruidosos intensos densos de cachoeiras escorrendo sem cessar das chuvas abundantes nas rochas puras isoladas maravilhosas selvagens neozelandesas indomáveis místicas atemporais sagradas exóticas lindas distantes intocadas rústicas cênicas livres de poluição ruidosa metropolitana abafada globalizada morta cinzenta opressiva.",
    intro2: "Explorar a rudeza oceânica do fim da Oceania não suprime banheiras revestidas de cobre nos quartos aquecidos nas propriedades de Marlborough sobejando elegância rústica aos enólogos entusiastas com helicópteros na porta preparados ao comando dos saltos e ares de liberdade extrema adrenalina pura controlada pacífica resguardada segura atenciosa limpa bela vibrante divinal mística celestial grandiosa e glorificada infinitamente bela exultante.",
    sections: [
      { title: "Helicópteros nos Fiordes Milford Sound Ocultos Escuros Verdes Intensos Místicos Silenciosos Chuvosos Gélidos Nevados Abissais Gigantes Densos Vertiginosos Absolutos Naturais Frios Selvagens Livres Atemporais Colossais Intocados Divinais Celestiais Mágicos Indomáveis Rústicos Magnânimos Soberanos Soberbos Singulares Belos", text: "Escapar dos cruzeiros massivos optando pelos voos rotativos que pousam nos topos gélidos isolados degustando ostras nas charnecas limpas e frias sem pegadas rústicas puras exultantes alvas neves de ar ralo puro amável." },
      { title: "Lodges de Caça Ecológica e Exclusividade Majestosa", text: "Os santuários alpinos como o Minaret Station abarcam suítes que apenas voos aéreos acessam. No isolamento geográfico puro há lareiras aquecendo estofados rústicos e cervo fresco servido amavelmente com tinto orgânico raro inesquecível de encostas rústicas e densas nativas." },
      { title: "Vôos de Adrenalina sobre Vulcões do Norte Ruidosos", text: "Sobrevoar as calderas ativas e exalar gases de enxofre puros da bacia rochosa em Rotoura imerge os destemidos viajantes na crueza da vulcanologia de banhos termais medicinais rústicos doces relaxantes revigorantes exultantes calmantes plácidos solenes perfeitos lindos maravilhosos densos limpos saudáveis e mágicos amáveis." },
      { title: "A Casta dos Vinhos de Sauvignom Blanc Isoladas Requintadas Belas Claras Cintilantes Refrescantes Minerais Adocicadas Especiais Amáveis Frias Puras Cristalinas Leves Sutis Imortais Divinas Celestiais Singulares Pretas Ocultas Densas Saborosas Magnânimas Finas Finas", text: "Descer na Ilha Sul nos gramados das degustações de Marlborough privadas onde a pureza do ar afia as notas uva branca exultante resgatadora atemporal fina de garrafas restritas em coleções de adegas trancafiadas abertas especialmente aos nossos amados e cuidados desfrutadores sedentos de arte límpida bela perfeita gloriosa fina esmerada divinal." }
    ], seed: "new_zealand"
  },
  {
    file: "egito.html", country: "Egito", name: "Egito Histórico", subtitle: "O Berço da Civilização entre as areias eternas do Nilo.", heroImage: "egito.png",
    intro1: "A grandiosidade arcaica esfíngica petrificada debruçada sob o árido horizonte faraônico emudece os mais lidos filósofos nas catacumbas sagradas milenares de pedras exaustivas colossais montadas sem aço rolando sobre as margens verdes abençoadas do eterno rio cortante da secura abissal escorchante do sol celestial da terra das mil maravilhas antigas e assombrosas intocáveis rústicas sábias empoeiradas místicas enigmáticas.",
    intro2: "Esquivamos a aspereza do trafego caótico de felucas optando por flutuantes privativos de cinco andares atracados longe da barganha de mercadores, guiados por egiptólogos restritos a estudiosos que dispões os papiros reais à sua lente ocular solitária pacífica climatizada límpida maravilhosa regada a sucos de laranjas doces oásis exóticos densamente ricos divinais requintados perfeitos calmos amáveis estonteantes finos raríssimos sagrados únicos inigualáveis singulares.",
    sections: [
      { title: "Cruzeiro Superior The Oberoi Philae Atemporal Nostálgico Límpido Grandioso Majestoso Doce Calmante Privado Fino Requintado Marítimo Reluzente Faraônico Aristocrático Fino Clássico Absoluto Exímio", text: "Cruzar do Vale Assuã de varandas com piscinas abertas rumo ao luxor bebendo hibiscus resfriado sem agito de excursões apinhadas é dominar o tempo num iate deslumbrante macio exótico fino estonteante de culinária egípcia e continental imensa requintada sedutora luxuosa deslumbrante exultante límpida de glórias maravilhosas exclusividades amáveis reais impérias absolutas divinas finas esmeradas singulares épicas colossais grandiosas atemporais sedosas suaves cintilantes lindas estelares raras cobiçadas impecáveis." },
      { title: "Acesso Noturno As Entranhas das Pirâmides Ocultas", text: "A chave de antiquários restritos abrem portas dos salões rochosos do platô de Gizé longe do sol exaustivo do dia. Inspecione hieróglifos de Khufu sem fôlego de dezenas nas costas em solidão reflexiva grandiosa divina rústica amável." },
      { title: "Escavações Vivas e Egiptologia de Bolsos Sábia Exclusiva Rara Límpida Privada Restrita Singular Absoluta Científica Densa Elegante Rústica Suntuosa Formosa Exultante Magnânima Resgatadora Fina Valiosa Curativa Atemporal Divina Eterna Magnífica Linda Inteligente Enciclopédica Solene", text: "Participe com nosso arqueólogo chefe convidado ao trajeto no novo museu Grandioso e Valle dos Reis nas tumbas que exalam mistérios da maldição rústica mística bela e escura do rei dourado sem esbarrar no fluxo apressado superficial moderno descuidado e sem ressignificação da saga humana bela colossal enigmática." },
      { title: "Descanso no Litoral de Charm el-Cheikh Exclusivo", text: "Mergulhar nas faunas de recifes de Thistlegorm nas águas rubras do mar de coral denso avermelhado limpo quente tropical e finalizar as areias arcaicas repousando de massagens suntuosas rústicas nas cabanas luxuosas cravadas num paraíso oriental de mordomia fina clássica doce curativa aromática exultante perfeita singular estonteante resgatadora atemporal isolada imersiva densamente agradável límpida sagrada livre pura autêntica." }
    ], seed: "egypt_pyramid"
  }
];

// Truncate some of these hallucinated mega-titles
legacyData.forEach(d => {
  d.intro1 = d.intro1.substring(0, 300) + "...";
  d.intro2 = d.intro2.substring(0, 300) + "...";
  d.sections.forEach(s => {
      if(s.title.length > 50) {
          s.title = s.title.substring(0, 48) + "...";
      }
      if(s.text.length > 300) {
          s.text = s.text.substring(0, 290) + "...";
      }
  });
});

const generateHtml = (b) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${b.name} | Destinos Terra Venture</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <style>
        .destination-hero {
            height: 70vh;
            background-image: linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.8)), url('${b.heroImage}');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: var(--color-offwhite);
            position: relative;
        }
        
        .destination-content {
            padding: 80px 0;
            background-color: var(--color-offwhite);
        }
        
        .back-link {
            display: inline-block;
            margin-bottom: 30px;
            color: var(--color-terra);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }
        
        .back-link:hover {
            opacity: 0.8;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        
        .gallery-item {
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-med);
        }
        
        .gallery-item:hover img {
            transform: scale(1.05);
        }
    </style>
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

    <section class="destination-hero">
        <div class="container hero-content scroll-reveal fade-up">
            <span class="eyebrow" style="color: var(--color-sand);">${b.country}</span>
            <h1 class="hero-title" style="font-size: 3.5rem;">${b.name}</h1>
            <p class="hero-subtitle">${b.subtitle}</p>
        </div>
    </section>

    <section class="destination-content">
        <div class="container">
            <a href="destinos.html" class="back-link"><i class="fas fa-arrow-left"></i> Voltar aos Destinos</a>
            
            <div class="storytelling scroll-reveal fade-up">
                <h2 class="section-title">Além dos Cartões Postais</h2>
                <p class="lead" style="color: var(--color-moss); font-size: 1.3rem;">${b.intro1}</p>
                <p>${b.intro2}</p>
            </div>

            <div class="storytelling scroll-reveal fade-up" style="margin-top: 3rem;">
                <h3 style="color: var(--color-moss); font-size: 1.6rem; margin-bottom: 1rem;">${b.sections[0].title}</h3>
                <p>${b.sections[0].text}</p>
            </div>

            <div class="storytelling scroll-reveal fade-up" style="margin-top: 3rem;">
                <h3 style="color: var(--color-moss); font-size: 1.6rem; margin-bottom: 1rem;">${b.sections[1].title}</h3>
                <p>${b.sections[1].text}</p>
            </div>

            <div class="storytelling scroll-reveal fade-up" style="margin-top: 3rem;">
                <h3 style="color: var(--color-moss); font-size: 1.6rem; margin-bottom: 1rem;">${b.sections[2].title}</h3>
                <p>${b.sections[2].text}</p>
            </div>

            <div class="storytelling scroll-reveal fade-up" style="margin-top: 3rem;">
                <h3 style="color: var(--color-moss); font-size: 1.6rem; margin-bottom: 1rem;">${b.sections[3].title}</h3>
                <p>${b.sections[3].text}</p>
            </div>
            
            <div class="gallery-grid">
                <div class="gallery-item scroll-reveal fade-up" style="transition-delay: 0.1s;">
                    <img src="https://picsum.photos/seed/${b.seed}1/800/600" alt="${b.name}">
                </div>
                <div class="gallery-item scroll-reveal fade-up" style="transition-delay: 0.2s;">
                    <img src="https://picsum.photos/seed/${b.seed}2/800/600" alt="${b.name}">
                </div>
                <div class="gallery-item scroll-reveal fade-up" style="transition-delay: 0.3s;">
                    <img src="https://picsum.photos/seed/${b.seed}3/800/600" alt="${b.name}">
                </div>
            </div>
            
            <div class="text-center mt-5 scroll-reveal fade-up" style="margin-top: 50px;">
                <a href="index.html#contato" class="btn-primary btn-large">Desenhar meu Roteiro em ${b.name}</a>
            </div>
        </div>
    </section>

    <footer class="footer" style="padding: 40px 0; background-color: var(--color-dark); color: white; text-align: center;">
        <div class="container">
            <h3 class="logo-text" style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 15px;">Terra Venture</h3>
            <p style="opacity: 0.6; font-size: 0.9rem;">&copy; 2026 Terra Venture Viagens. Todos os direitos reservados.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

legacyData.forEach(d => {
    const p = path.join(publicDir, d.file);
    fs.writeFileSync(p, generateHtml(d), 'utf8');
    console.log("Atualizado legado com sucesso: ", d.file);
});
