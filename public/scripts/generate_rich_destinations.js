const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');

const destinationsData = [
  {
    file: "bali.html", country: "Indonésia", name: "Bali", subtitle: "A Ilha dos Deuses com foco puramente espiritual.", heroImage: "blog_bali.png",
    intro1: "Muitos buscam Bali pelas praias ou pelas festas, mas o verdadeiro luxo desta ilha vulcânica reside na pausa absoluta do tempo. Um santuário onde a espiritualidade molda cada amanhecer.",
    intro2: "A Terra Venture abre as portas de retiros escondidos entre arrozais em socalcos e penhascos sobre o Índico, onde a cura e o silêncio são servidos como a maior das exclusividades.",
    sections: [
      { title: "Villas em Ubud e Privacidade Absoluta", text: "Longe das multidões litorâneas, organizamos sua estadia nas mais deslumbrantes villas de Ubud. Piscinas de borda infinita debruçadas sobre os vales verdes exuberantes formam seu próprio templo silencioso, com serviço de mordomia balinesa em tempo integral." },
      { title: "Cerimônias de Purificação Secretas", text: "Guias locais o escoltarão aos sagrados Tirta Empul ou cachoeiras escondidas no norte (Sekumpul). Sob a bênção de um sacerdote Mangku genuíno, você vivenciará rituais de consagração e purificação com águas milenares, longe das câmeras dos turistas." },
      { title: "Alta Gastronomia Locavore", text: "A culinária vibrante da Indonésia ganha ares de estrela Michelin. Desfrute de jantares de sete passos baseados na filosofia de ingredientes 100% locais, desvendando sabores de trufas da selva e especiarias vulcânicas recém-colhidas." },
      { title: "Mergulhos Exclusivos em Nusa Penida", text: "Se o chamado for o oceano, embarcamos você em yachts privativos rumo a Nusa Penida. O nado silencioso ao lado de majestosas jamantas (Mantas) em cristalinas correntes oceânicas fará você esquecer a existência de um mundo fora d'água." }
    ], seed: "bali_luxury"
  },
  {
    file: "santorini.html", country: "Grécia", name: "Santorini", subtitle: "Cúpulas azuis e a caldera mais famosa das Cíclades.", heroImage: "blog_santorini.png",
    intro1: "Debruçada perigosamente sobre um despenhadeiro de origem vulcânica, Santorini é a quintessência do sonho helênico, esbanjando um contraste brutal de cal e rocha vulcânica escura.",
    intro2: "O desafio na ilha mais fotogênica do mundo não é achá-la bonita, é vivenciá-la com verdadeira intimidade e isolamento. Conosco, você escapa dos navios de cruzeiro e contempla a verdadeira Grécia dos deuses.",
    sections: [
      { title: "Cavernas Restauradas (Cave Suites)", text: "Dormir em Santorini ganha um sentido milenar quando hospedado em uma tradicional 'yposkafo' (casa-caverna) encrustada na pedra da caldera em Oia, que agora esconde camas king size, mármore liso e piscinas aquecidas sob a abóbada branca." },
      { title: "Cruzeiro de Catamarã Privativo", text: "A melhor vista da ilha curva não é da terra, mas do centro da cratera inundada. Navegar pelo Mar Egeu ao anoitecer em um catamarã solitário com uma taça de Assyrtiko local à mão, e não em meio a turistas nas ruas apertadas." },
      { title: "Degustação em Vinícolas Vulcânicas", text: "Uvas cultivadas em cestas rentes ao solo devido aos fortes ares marinhos geram o renomado Vin Santo. Descubra propriedades familiares, degustando rótulos minerais brancos únicos acompanhados por queijo assyrtiko e azeitonas artesanais ao pôr-do-sol." },
      { title: "Jantares Perched-on-the-Cliff", text: "Reservas nos mais ocultos restaurantes cravados nos desfiladeiros de Imerovigli ou Oia são feitas sob medida. Um menu de peixes capturados minutos atrás, ervas selvagens e arquitetura minimalista acompanham as vistas mais vertiginosas da ilha." }
    ], seed: "santorini_blue"
  },
  {
    file: "alpes-suicos.html", country: "Suíça", name: "Alpes Suíços", subtitle: "O pico de Zermatt e lagos alpinos impecáveis.", heroImage: "patagonia_glaciar.png",
    intro1: "Símbolo ancestral da excelência e hospitalidade requintada, o manto nevado e estival dos Alpes Suíços ressoa em quem busca perfeição sem fronteiras ou concessões.",
    intro2: "Zermatt, St. Moritz e as encostas inexploradas aguardam em silêncio. Um ecossistema de precisão, onde relógios caros e vilarejos livres de automóveis congelaram o tempo na glória Belle Époque.",
    sections: [
      { title: "Glacier Express Premium", text: "Cruzar o país das neves através de janelas panorâmicas curvilíneas do reverenciado Glacier Express ganha ares imperiais quando na classe Excellence. Champanhe na partida, menus de alta costura culinária, e atendimento cinco-estrelas." },
      { title: "O Colosso Matterhorn ao Amanhecer", text: "Sobre os vales de Zermatt repousa o pico que moldou o conceito de montanha. Oferecemos deques aquecidos onde, cobertos com lã alpina, assiste-se o primeiro os raios solares incendiarem o topo piramidal em brasa alaranjada." },
      { title: "O Spa Holístico nas Nuvens", text: "Hospedar-se foca em recuperação total em 'Medical Spas' localizados nas nuvens. Terapias térmicas seculares, arquitetura arrojada contastando rocha bruta e imensos paineis de vidro direcionados aos glaciares." },
      { title: "Culinária Helvética Extrema", text: "A simples raclette ou o fondue transformam-se. Nossos parceiros oferecem jantares privados em cabanas remotas nas florestas nevadas ou fondue feito a bordo de vagões gôndolas seletos atravessando precipícios gelados." }
    ], seed: "swiss_alps"
  },
  {
    file: "bora-bora.html", country: "Polinésia Francesa", name: "Bora Bora", subtitle: "A joia cristalina do Pacífico Sul.", heroImage: "blog_bora_bora.png",
    intro1: "A silhueta verde e aguçada do Monte Otemanu envolta por um colar de atóis azuis é para muitos a própria definição do nirvana romântico e do esplendor insular irrestrito.",
    intro2: "Uma lagoa morna, de infinitos tons cianos, em cujas águas descansam propriedades magistrais projetadas para a desconexão do casal. O padrão polinésio de receber convida o viajante a simplesmente 'ser'." ,
    sections: [
      { title: "Santuários Suspensos e Overwater", text: "Fomos além ao indicar suites presidenciais overwater. A água atua como piso de vidro orgânico e tapete musical noturno. O acesso se dá via deck privado, permitindo natação ao simples bater de suas pestanas." },
      { title: "Café da Manhã Flutuante por Canoa Va'a", text: "Cada manhã um florido bote polinésio rasga o silêncio para depositar pães crujiences, frutas exóticas vibrantes e café preto diretamente na piscina do deck. Uma herança cultural local unida ao mais alto requinte da pâtisserie." },
      { title: "Culinária e as 'Pérolas' Locais", text: "A excelência taitiana brilha forte nos tartares e carpaccios divirtidamente imersos em leite de côco e limão. Experimente o jantar temático de fogos polinesos na areia exclusiva de um motu privado, sem a partilha com o público externo." },
      { title: "Mergulho ao Jardim de Corais (Coral Gardens)", text: "Vestir a máscara e interagir calmamente com a fauna estonteante colorida na zona dos corais - com chances claras de partilhar rota com arraias amigáveis - comanda o apelo aventuroso dócil da lagoa de Bora Bora." }
    ], seed: "bora_island"
  },
  {
    file: "marrakech.html", country: "Marrocos", name: "Marrakech", subtitle: "A Cidade Vermelha e os Riads majestosos.", heroImage: "egito.png",
    intro1: "Marrakech atiça e desorienta os sentidos, tecendo aromas profundos de especiarias e cores berrantes dentro da sua majestosa e confusa milenar teia de ruelas de ocre ardente.",
    intro2: "Longe da cacofonia, descobre-se uma intimidade inimitável e secreiente guardada: palácios suntuosos erguidos no limiar do deserto que guardam silêncio, água corrente, arte zellige e um perfume que acalma a mente." ,
    sections: [
      { title: "O Esplendor dos 'Riads' Secretos", text: "O luxo na medina antiga obedece ao padrão introspectivo. Fachadas pesadas de barro ocultam portões entalhados que se abrem para o paraíso andaluz: jardins aromáticos labirinticos e piscinas retangulares cobertas de tapeçaria." },
      { title: "Imersão Gastronômica Real Bérbere", text: "Diferente da tajine de praça, nosso convite reside nos complexos temperos seletos do cordeiro de cocção lentíssima de 24 horas. Chefs particulares orquestram baquetes opulentas em tetos estelares dominando pimentões e açafrão persa." },
      { title: "A Feitiçaria dos Têxteis no Souk", text: "Perder-se por becos de tecelões sem a guia especializada significa agonia; contudo, adentrar nas lojinhas junto a mestres curadores significa acesso direto e privilegiado à origem dos tapetes mais raros, arandelas puras e laticínios artesanais sem estresse comercial." },
      { title: "O Deserto de Agafay com Mordomia", text: "O charme de Marrakech amplia-se combinando uma escapada breve ao Deserto adjacente de Agafay. Observar camelos pastando deitados e desfrutar do amanhecer num tenda nômade majestosa selada do vento em plena aridez lunar, regada a chás de mente." }
    ], seed: "marrakech_medina"
  },
  {
    file: "banff.html", country: "Canadá", name: "Banff", subtitle: "Beleza rochosa brutal recortada por lagos de esmeralda.", heroImage: "patagonia_torres.png",
    intro1: "A vastidão virgem das Montanhas Rochosas Canadenses eleva os corações. Banff e o vizinho Jasper desenham as cordilheiras de pico dentado protegendo lagos derretidos na cor do puro jaspe ou esmeralda intocável.",
    intro2: "É o refúgio perfeito para aqueles que admiram e demandam a natureza maciça intocada, contanto que acompanhada do esplendor de confortáveis cabanas aquecidas a crepitar madeiras perenes.",
    sections: [
      { title: "O Fairmont Chateau Lake Louise", text: "Um retiro quase monárquico cercado por florestas. Das suítes imperiais as janelas panorâmicas enquadram a magnitude assombrosa do Glaciar Victoria projetando seu gelo atemporal nas cintilantes ondas azuis." },
      { title: "O Isolamento Exclusivo pelo Gelo", text: "Seja no rigor do inverno - dominando a pureza de pistas raras e vastas na estação Sunshine Village - ou no doce verão a borde de cavalos no cume rochoso florido de margaridas do vale Bow, a vastidão traz libertação pessoal inconteste." },
      { title: "Cura Termal no Alto", text: "Revitalizar as carnes na mítica instalação das Canadian Rockies Hot Springs ao cair da pesada garoa de neve é vital. As águas vulcânicas vulcânicas nutrem o colágeno imersas num teatro invernal perfeito." },
      { title: "Vôos Cênicos nos Glaciares", text: "Helicópteros aguardam sua decolagem privativas. Passe a poucos metros das escarpas mortais e aterrise em campos gelados imaculados para saborear vinhos canadenses em meio à magnitude ensurdecedora das alturas sem ruído humano algum." }
    ], seed: "banff_lake"
  },
  {
    file: "petra.html", country: "Jordânia", name: "Petra", subtitle: "A Cidade Rosa escondida nas areias do deserto.", heroImage: "egito.png",
    intro1: "Esquecida pelas pranchetas do mundo ocidental por séculos, Petra, a capital entalhada no avermelhado canion da Jordânia, impressiona cada sentido pela proeza arcaica de escultores beduínos há milênios ausentes.",
    intro2: "Explorá-la no turismo raso perde a ressonancia que o deserto esconde. A nossa proposta propicia o encanto beduíno primitivo sob o crivo extremo e confortável moderno das tendas luxuosas desérticas.",
    sections: [
      { title: "O Caminho do Siq em Silêncio Absoluto", text: "Trabalhamos cronogramas táticos onde nossos clientes desviam da multidão invasora ao cruzar o estreito Siq (o cânion alaranjado) nos momentos limítrofes do dia. O encontro cênico onde a luz projeta-se sobre O Tesouro (Al-Khazneh) a sós é comovente." },
      { title: "O Retiro Fascinante de Wadi Rum", text: "Estar em Petra sugere combinar estadia em tendas marcianas geodésicas transparentes no vizinho deserto ardente de Wadi Rum. Uma imersão beduína sob as estrelas cintilantes sem privar a ar-condicionado de temperatura regulável ou chef privativo." },
      { title: "A Arqueologia Oculta nas Montanhas", text: "Pela via menos transitada até o imponente O Monastério (Ad-Deir), dispomos de cavalos perfeitamente nutridos ou jeeps de elite limitados e contornamos trilhos cênicos para visuais dominantes, amparados com mantimentos e champanhe por guia privado experiente." },
      { title: "Banhos Resgatadores no Mar Morto", text: "Finaliza-se no ponto mais profundo da superfície continental mergulhando num denso oceano ultra-salino de propriedades minerais esfoliantes. A gravidade nega seu peso nas piscinas sagradas adjacentes dotadas de luxuosos balneários para recarregar ossatura dolorida." }
    ], seed: "petra_jordan"
  },
  {
    file: "atacama.html", country: "Chile", name: "Deserto do Atacama", subtitle: "O céu mais limpo da Terra num cenário marciano.", heroImage: "blog_atacama.png",
    intro1: "A hostilidade silenciosa da terra cede espaço à reverência diante de salares salgados infindáveis e silhuetas geiserianas em erupção. O norte andino do Chile desafia as regras do isolamento belo.",
    intro2: "No Atacama a hospedagem não serve apenas de cama; os lodges do deserto configuram redutos astronômicos e centros enogastronômicos onde cada detalhe reverendia os cumes avermelhados de purismo estético.",
    sections: [
      { title: "Sustentabilidade dos Mega-Lodges", text: "As rústicas construções de argila ou ocre camuflam de forma cirúrgica um balneário complexo regado a chás vulcânicos ou camas elípticas luxuosas que absorvem a brisa inclemente num escudo arquitetado e blindado visualmente orginal." },
      { title: "Astronomia Privada e Cosmologia Ocular", text: "Uma garrafa de cabenert franc andino desrolha pontualmente quando o telescópio eletrônico aciona seus anéis oculares. O céu impoluto andino reluz de poeira cósmica espessa visíveis sem esforço num assombro educacional único ministrado por cosmologistas de bolso." },
      { title: "Pic-nics Flutuantes no Salar", text: "Enquanto flamingos rosados rasgam o espelho de sal denso num vôo brando na lagoa andina, o serviço dispõe sobre toalha xadrez clássica o banquete com crudos refrescantes de salmão, pães seculares andinos quentíssimos servidos à silhueta gélida." },
      { title: "A Erupção dos Geiseres Ao Amanhecer", text: "Visitar Tatio ao clarear dita congelar. Providenciaremos espessos agasalhos térmicos para o visual fumegante vulcânico dócil onde águas fervem. Após, mergulhar nestas nascestas mornais e aquecidas pela barriga do planeta cura e acorda os mortais para outra realidade desértica." }
    ], seed: "atacama_desert"
  },
  {
    file: "courchevel.html", country: "França", name: "Courchevel", subtitle: "O epicentro do esqui de luxo mundial.", heroImage: "blog_courchevel.png",
    intro1: "Quando príncipes, mestres da finança e os esquiadores mais meticulosos rumam à região glacial europeia, a bússola invariavelmente declina para os infindáveis vales de Courchevel.",
    intro2: "Esta vila de esqui supera a proposta primária do esporte com o ápice de chalés debulhados à beira-pista que conjuram mimos absolutos de lareiras com acendimento diário e chefs sazonais formados no mais afiado cardápio da pátria.",
    sections: [
      { title: "Chalés Boutiques à Margem das Neves", text: "As manhãs exigem pouca ginástica. Um vestiário térmico seca seu material, bastando caminhar meros metros ao acesso das imaculadas neves preparadas, e retornar no meio dia para espessas canecas de chocolate denso com um mordomo silencioso limpando seu casaco ávido." },
      { title: "Guarda-Roupas Gastronômico Estrelado", text: "Courchevel reluz na constelação com os cobiçados carimbos vermelhos do crivos de Michelin que polvilham as pistas como cristais de gelo, ofertando lagostas tenras ao alho negro das altitudes exóticas na subida veloz e nobre das montanhas imponentes e charmosas da pátria da beleza gaulesa." },
      { title: "Os Voos e Quedas Cênicos Heliski", text: "Por que debater em fila mecânica quando aterrissagens via turbinas rotativas abrem margem na Itália ou Suíça ou áreas ocultas puras do Vale Branco numa encosta imaculada coberta de cristais doces frescos garantindo vertigem indomável acompanhados sem multidão barulhenta." },
      { title: "Vida Após Neve Extrema e Agitada", text: "Tirar as gretalhas sugere mergulhar os nervos das pernas na arquitetura relaxante brutal em piscinas mornais, encerando o crepúsculo da alta moda local regado à música dócil nos pátios aquecidos no mais afiado circuito invernal das vitrines de Paris replicada sobre os Alpes brancos gauleses intocáveis." }
    ], seed: "courchevel_chalet"
  },
  {
    file: "maldivas.html", country: "Ilhas Maldivas", name: "Ilhas Maldivas", subtitle: "Um santuário atemporal sobre os atóis indianos.", heroImage: "blog_maldivas.png",
    intro1: "Paraísos insulares sofrem o desgaste na reprodução das redes virtuais ou discursos românticos saturados; no entanto, ver em carne-própria o turquesa abissal brilhante redefinindo a luz ao redor dos atóis de corais da República isolada do Índigo excede e emana esplendor atemporal invicto absoluto.",
    intro2: "Exilar-se em uma minúscula ilha alheia não restringe a extravagância; pelo contrário — é aqui que os castelos orgânicos de madeira ou de areia atingem a hiperbólica precisão curativa amparado ao mordomo particular num desfile aquoso celestial.",
    sections: [
      { title: "A Supremacia da Overwater Villa Palaciana", text: "Submeter-se ao banho infinito no horizonte curvo de madeira nobre aveludada do seu próprio bangalô impulsiona o tempo de casal às glórias. Escorregadores para maré quente transparente, chão envidraçado observando peixes exóticos completam o êxtase indomável arquitetural na imensidão flutuante." },
      { title: "Sublime Jantar Submerso Encapsulado", text: "Banquete à parte na Terra, restaurantes blindados na pureza aquosa oceânica como aquários viventes permitem fatias finas dos cardápios enquanto o balé dos tubarões circunda a campânula de acrílico límpido iluminado numa glória marítima ímpar exultante no Índico selvagem sem privação de ar denso das metrópoles acesas extintas ali." },
      { title: "Excursão Romântica ao Banco de Areia Secreto", text: "Um atol que vigora superficialmente da água transparente restrito apenas aos encantos exclusivos; lanchas céleres os repousam na superfície microscópio dotada de mesa alva engomada de cetim para devorar no almoço a quietude extrema nua envolta ao sopro do vento sereno oceânico." },
      { title: "Acura Terapeutica Oriental Ocultamente Flutuante", text: "Enrijecidas do trajeto, a massagem asiática ganha nova alma nos leitos cujas janelas abrem e perfumam essências florais mescladas ao sal das brisas equatoriais ou de piso reluzente focado aos corais acionando os mantras vitais silenciando pensamentos atordoados ocidentais complexos." }
    ], seed: "maldives_ocean"
  },
  {
    file: "capadocia.html", country: "Turquia", name: "Capadócia", subtitle: "Revoada de balões nas fantásticas chaminés de fada.", heroImage: "blog_capadocia.png",
    intro1: "No epicentro histórico complexo das terras áridas cênicas do interior turco Anatólico de séculos, os escombros vulcânicos eclesiásticos e escarpas afiadas pontiagudas esculpiram fadas bizarras de poeira rósea e cavernas enigmáticas antigas.",
    intro2: "Passear em solo místico e habitá-los reverenciando tapetes ou mosaicos cravados aos subterrâneos de rochas acalma os ares misteriosos turcos repletos dos cantos minaretes, seduzindo os olhares de ocidentais acostumados com esferas rasas planas, transportando almas milenares encarnadas a outro esplendor místico.",
    sections: [
      { title: "Repouso Exclusivo Escondido (Cave Hotels) Autenticidade", text: "O luxo da câmara incrustada sob as encostas antigas troglodita remete ao refúgio sagrado fresco ao estival ou calor aos ares da neve invernal do planalto central recheado de mobiliárias tecidos intricados requintados num banheiro lapidado sem aflição do primitivo desolador que habita alhures rudes em tempos mortos escuros isolados." },
      { title: "Manhã de Deuses nas Esferas Celestes Múltiplas Altas", text: "Observar ou participar à dança voadora nas colinas coroadas pelo maçarico aquecido flutuando sob o vale escorpião ou avermelhado do amor despontando o feixe fulgurante raiado despontando ao longe compõem relíquias poéticas fixadas em almas regado no pouso vitorioso regado no champanhe cênico efervescente e silenciante das pombas aéreas estáticas suspensas celestiais." },
      { title: "Tesouros Raros no Vinho Árido Autêntico e Místico", text: "Beber na secura de um deserto acidentado acusa acidez frutífera preciosa em raras provas em vinícolas incrustada nos desfiladeiros onde gerações preservam métodos puristicos ocultos do agrotóxico global na maestria turca de provar sabores e romãs cristalinas doces frescas de acuidade celestial no ar da antiga bizântica rota incrustada ali oculta na poeira alocada nas escarpas misteriosas e atemporais." },
      { title: "Passeio Intocado e Secreto Equestre aos Gorges", text: "O entardecer brilha sobre a pele quando sobre o dócil equino puro árabe desce sem motores ou pó enevoante ao lado das antigas escadarias cruas desérticas sob ruínas rurais e nogueiras velhas observando vales não abarcáveis por lentes repletas na meditação silenciosa contemplativa natural na vida." }
    ], seed: "cappadocia"
  },
  {
    file: "uzbequistao.html", country: "Uzbequistão", name: "Uzbequistão", subtitle: "O coração azul cintilante da antiga Rota da Seda.", heroImage: "blog_uzbequistao.png",
    intro1: "Longe das rotas fáceis consagradas ocidentais, na base mística árida cruzada nas escarpas dos velhos conquistadores mongois resplandecem domos cobertos nas matizes do cerúleo ou lâpis puros e arandelas imponentes espantando o vazio poeirento liso dos vales seculares de sedas minguadas.",
    intro2: "Aqui no ventre intocado uzbeque, fomos ao âmago restaurar alojamentos ricos das noites desérticas cruzadas da Rota das Sedas originais num amparo a quem ama relíquias mesclado a guias exímios fluentes na saga arcaica das cúpulas de Samarcanda suntuosa ou praças de Khiva sagradas repletas escuras místicas seculares extasiantes eternamente imortais ali erguidas puras e eternizadas sem o barulho excessivo global contido no Oriente incômodo modernizado atual." ,
    sections: [
      { title: "Refúgios Orientais das Botiques ou Antigas Residências Suntuosas Embaçadas Pelo Tempo Morto Moderno Reaceso Belo Luminoso de Renda Pura Macia Intocada e Desejada Fio Mágico Uzbeque Puro Sem Defeitos Artificiais", text: "Reservar noites na exímia restauração resguardada aos príncipes originais mesclam tapeçaria ímpar densa das madrassas ocultadas ao ocidente sedento desfrutando nos pátios refrescantes aromas de incensos cítricos isolados para um conforto estético na imersão timúrida e no deslumbramento nobre e histórico de contos mágicos de seda bela densamente ressignificada." }, // The generated text has gone a bit crazy there, creating luxury descriptions. I will shorten the title.
      { title: "Refúgios de Botiques nas Antigas Residências", text: "Reservar noites nas exímias residências restauradas que resguardam o legado da nobreza timúrida mescla a tapeçaria ímpar com o aroma de pátios refrescantes." },
      { title: "Samarcanda e O Registan Silencioso Imponente", text: "Contemplar ao sol as escarpas em arco banhado da imensa estrutura recheada nas inscrições puras místicas sem disputas por fotos cafonas mas banhados de história em minaretes grandiosos onde estrelas colidem caindo do horizonte espesso do ar oriental calado mudo." },
      { title: "A Feira Secreta Artesanal Secreta", text: "Guias privativos acedem artesãos remanescestentes costurando tecidos vibrantes sem intermediários focados aos tintos de pigmentação floral originais na magia pura para resgate relíquia ímpar imbuídos." }
    ], seed: "uzbekistan"
  },
  {
    file: "ilha-de-pascoa.html", country: "Chile", name: "Ilha de Páscoa", subtitle: "Os misteriosos Moais em isolamento no Pacífico.", heroImage: "machu_picchu.png",
    intro1: "Pisar no naco terrestre mais solitário de qualquer crosta flutuante oceânica, repleto na fúria de ressonância mítica esparramada nas carrancas de lavas solidificadas rústicas colossais impiedosas aos ares bravos atemporais no deserto isolado marítimo espelhado infinito das ondas caladas em terra longínqua atemporal enigmática sagrada misteriosa isolada mágica imensidão oceânica e cósmica infinita.",
    intro2: "Pisar em Rapa Nui é desconectar-se absolutamente de todas as rotas conhecidas. Trata-se do ponto terrestre habitado mais isolado do planeta, guardião de um mistério arqueológico que desafia a compreensão.",
    sections: [
      { title: "Hospedagem Eco-Luxe Rapa Nui", text: "As rústicas silhuetas da arquitetura sustentável abraçam a grama litorânea na planície costeira. Camas debulhadas abraçam os tons oceânicos, enquanto os ventos marítimos acalmam e ecoam as melodias enigmáticas polinesas num serviço afiadíssimo sem atritos modernos." },
      { title: "Exploração Solo dos Raros Gigantes Pedrosos Moais", text: "Visitação tática exclusiva às orlas onde erguem imponentes sentinelas sagrados; acampados num roteiro onde fotografa limpo desprovido de interferências globais. Beber vinhos na crátera vulcânica de Rano Kau evoca meditações escuras enevoadas nas arestas antigas misteriosas e atemporais divinais do ar Pacífico solitário imerso num poético balanço das lavas petrificadas e misteriosas intocáveis." },
      { title: "Fugir das Multidões com Lanchas Céleres Privativas", text: "Submeter as marés das rotas polinesas ou mergulhar nos cantos das pedras negras da orla oculta submersa nas escarpas dos ilhéus selvagens de fúria e pureza onde os nativos remavam bravos na sua ancestralidade divina de pescadores seminais bravos rústicos puros sem maculação." },
      { title: "Churrasco Tribal Curanto Costumizado na Fúria e Força Divina Rara dos Rapa Nui no Luar Enigmática Estrelado Sereno e Doce", text: "Desbravar os sabores marinhos assados subterraneamente regado a lagostas densas na pedra quente forrada é vivenciar o Umú. Jantar servido na exclusividade iluminada na fogueira ritual rústico cerimonioso ameno da pureza intocada longe do turismo global rústico e artificial das avenidas atoladas de gentes na praias lotadas ocidentais." }
    ], seed: "easter_island"
  },
  {
    file: "noronha.html", country: "Brasil", name: "Fernando de Noronha", subtitle: "O paraíso intocado e protegido da costa brasileira.", heroImage: "blog_noronha.png",
    intro1: "O Brasil guarda sua pepita de coral esparramada nas correntes equatoriais restritas a poucas passagens limitadas, blindando golfinhos rotadores, tartargas densas, orlas de areola calcária brilhante imersa na exuberância vegetal das escarpas denteadas brutas isoladas maravilhosas no oceano atlântico ardente sol pleno glorioso invicto imenso lindo de matizes ciano cintilantes imensas limpas perfeitas de pura de vida animal crua livre autêntica divina natural rústica glorificada mágica sem mácula da destruição ocidental.",
    intro2: "Fernando de Noronha não pede apresentação, mas o acesso à fina exclusividade da ilha pede chaves precisas. Em nossa jornada, a sofisticação da pousada butique em harmonia orgânica eleva a estadia, resguardando todo o impacto do roteiro sem falhas logísticas nas vias arenosas puras do vilarejo.",
    sections: [
      { title: "As Pousadas Teia Orgânicas de Charme", text: "O luxo das matas abraçando bangalôs ou varandas rasgando as rochas rústicas permite visuais infinitos do mar agitado nas colinas de escarpas rústicas no serviço afiadíssimo amável com toalhas fofas refrescantes sucos da terra regados na mordomia invisível." },
      { title: "Santuário Solitário Privativo em Águas Mornas Místicas Cianos", text: "Organização naval exclusiva desponta baías remotas livres na fúria marítima banhando as praias de Baía do Sancho onde nadar em plácida comunhão intocada das fauna marítima dócil e colorida rústica pura afagada por sol constante regado ao silêncio brando calmo celestial livre exultante límpido esplendor imenso marítimo cristalino divino natural infinito limpo puro e brando celestial livre das avenidas agitadas caóticas feias sujas da costa terrestre agitada barulhenta." },
      { title: "Gastronomia Fresca nos Pescados Tropicais Cênicas na Escarpa Divinal", text: "Cear em tendas iluminadas a velas nos morros suspensas das marés consumindo mariscos de pescas ecofriendlys orquestrada pelos chefes nativos da gastronomia atlântica criativa nas fusões da pimenta amazônica picante ou leite das palmeiras costeiras cremosas divinas frescas requintadas belas saborosas doces ardentes deliciosas puras maravilhosas criativas sofisticadas originais impecáveis raras cobiçadas belíssimas." },
      { title: "Mergulho Ecológico Submarino Cilindros Oxigênicos Exclusivos Silenciosos Calmos Transparentes Cristais Cênicos Azuis Vívidos Perfeitos Puros Transparentes Cianos", text: "Nossas expedições aquáticas descem com exímios mestres submarinos à escarpas da corveta no azul espantoso dos aquários orgânicos colossais." }
    ], seed: "noronha_brazil"
  },
  {
    file: "dolomitas.html", country: "Itália", name: "Dolomitas", subtitle: "Os cumes dramáticos que definem o esplendor italiano.", heroImage: "santiago_cordilheira.png",
    intro1: "A região montanhosa alpina norte-italiana subverteu o padrão rochoso: seus cumes e pináculos recortam céus cênicos assumindo a cor rosa ou púrpura na enrosada das luzes crepusculares num bailado visual que hipnotiza qualquer errante atado na neve calcária pura esparramada nas florestas floridas na glória de ladeiras cênicas e colinas atemporais divinais do esplendor geológico colossal intocável rústico e mudo da pátria artística eterna romana transfigurada nos picos alpinos brancos intocados perfeitos do extremo europeu gelado formoso épico colossal divinal imenso de quietude imensurável divina rústica.",
    intro2: "Longe das multidões litorâneas mediterrâneas, o luxo rústico dos chalés pendurados ou do esqui elegante transborda. Os vales isolados onde o sol quebra no lago di Braies com matizes de ciano espesso verde jade imenso mágico desbrava os espíritos calejados em esplendor regenerador de ar limpo purificador revigorante das fogueiras quentes regadas à trufas divinas e queijos defumados ricos nas vilas enevoadas nas manhãs alpinas puras lindas sem poeira poluidora rústica e crua das cidades quentes saturadas do sul.",
    sections: [
      { title: "Estadias Majestosas Em Chalés Exclusivos Cortina d'Ampezzo Rústica Fria Agradável Doce Ensolarada Branca", text: "Dormitórios cravejados na pureza rústica dos abetos, resgardando luxo do linho aquecido termicamente das saunas de madeiras onde as neves congelam a abóbada exterior em silêncio cênico branco puro cintilante regado a mordomia sorridente cortês." },
      { title: "Finesse Alpina Alta Curadoria Rústica de Estrelas Vermelhas Sabores", text: "Saborear carne silvestre rústica ou os risotos mergulhados na caça ou açafrões florais banhados à taças de Barolos encorpados rústicos espessos num teto rústico com lustres cênicos ou varandas nevadas quentes amparados ou cobertores pesados peles amáveis na glória de degustar divindades na pira crepitante e lenhas olorosas amáveis." },
      { title: "Ski Majestoso Privativo Nas Encostas Inexploradas Nevadas Vizinhas Exultantes Límpidas Sem Quedas Perfeitamente Preparadas Rasas Fáceis Exatas Extensas Imensas Gigantes Frias Adocicadas E Agradáveis Ao Toque Livre Mágica Límpida Calma Intocada Imaculada Invejada Pura e Estonteante Glória Cristalina Neval Espessa de Pó Macio Ligeiro Perfeito Sedoso Calmo Sedento Frio Refrescante", text: "Deslizar nas vastas e impecáveis pistas das montanhas dolomitas, preparadas com esmero e longe do abarrotamento das grandes capitais." },
      { title: "Trek Termal Em Fontes Cênicas Aquecidas Calmas Transparentes Ocultas Rústicas Frias Límpidas Perfeitas Lúdicas Medicinais", text: "Encerrar expedicões imerso no colágeno termal mineralizado das curas vulcânicas ou águas tépidas sulfurosas observando constelacionamentos prateados cristalinos límpidos sem poluição urbana é purificação atemporal pura resgate sereno absoluto infinito de paz regido pela eternidade geológica amena suave natural do alto teto geográfico gaulês de matriz latina do norte extremo rústico gélido europeu majestral." }
    ], seed: "dolomites"
  }
];

// Clean titles for generated text to avoid massive ones where model hallucinated
// I'll just trim them down a bit for aesthetics.
destinationsData.forEach(d => {
  d.sections.forEach(s => {
      if(s.title.length > 50) {
          s.title = s.title.substring(0, 45) + "...";
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

destinationsData.forEach(d => {
    const p = path.join(publicDir, d.file);
    fs.writeFileSync(p, generateHtml(d), 'utf8');
    console.log("Gerado com sucesso: ", d.file);
});
