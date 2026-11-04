// Fase 7: texto alternativo descritivo nas 61 imagens que tinham alt de uma ou
// duas palavras ("Antártida", "Índia", "Paris"...). Nome de lugar nao e alt:
// quem usa leitor de tela ja leu o titulo da secao, o que falta e o que esta
// na foto. Cada descricao abaixo foi escrita olhando a propria imagem.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const ALTS = {
    // Antártida
    'dest_antartida.webp': 'Colônia de pinguins numa encosta de neve, com um navio de expedição ancorado na baía e montanhas geladas ao fundo',
    'dest_antartida_g1.webp': 'Iceberg plano à deriva em mar calmo, com pinguins enfileirados sobre o gelo',
    'dest_antartida_g2.webp': 'Pinguins reunidos sobre um bloco de gelo azulado, ao pé de um paredão rochoso',
    'dest_antartida_g3.webp': 'Iceberg de bordas azul-turquesa recortado contra o céu cinza da Antártida',
    // Cidade do Cabo
    'dest_capetown.webp': 'A parede rochosa da Montanha da Mesa erguida acima dos prédios da Cidade do Cabo',
    'dest_capetown_g1.webp': 'Lion\'s Head coberto de vegetação verde atrás dos bairros da Cidade do Cabo, em dia de céu azul',
    'dest_capetown_g2.webp': 'Vista aérea da Cidade do Cabo entre o porto e a Montanha da Mesa, com nuvem baixa na encosta',
    'dest_capetown_g3.webp': 'A Montanha da Mesa iluminada pelo sol baixo, com a cidade espalhada aos seus pés',
    // clientes
    'marcia-reis-cliente-italia.webp': 'Márcia Reis sorrindo na neve, em frente a um prédio histórico de cúpula, durante a viagem à Itália',
    // Índia
    'dest_india.webp': 'O Taj Mahal em mármore branco, visto de frente, com os jardins simétricos à sua volta',
    'dest_india_g1.webp': 'O Taj Mahal emoldurado por galhos, com os quatro minaretes e o espelho d\'água à frente',
    'dest_india_g2.webp': 'O Taj Mahal ao fim da tarde, com a cúpula central destacada contra o céu claro',
    'dest_india_g3.webp': 'Fachada rosa do Hawa Mahal, em Jaipur, vista de baixo, com suas centenas de janelas em arco',
    // Lapônia
    'dest_laponia.webp': 'Aurora boreal verde e lilás sobre as copas de pinheiros numa noite de inverno',
    'dest_laponia_g1.webp': 'Estrada de neve entre pinheiros, com a aurora boreal verde riscando o céu escuro',
    'dest_laponia_g2.webp': 'Aurora boreal sobre uma fileira de árvores iluminadas por postes, à beira de um campo de neve',
    'dest_laponia_g3.webp': 'Pinheiros completamente cobertos de neve, formando vultos brancos contra o céu claro',
    // Alpes e Dolomitas
    'dest_alpes.webp': 'O Matterhorn refletido num lago alpino de águas paradas, com pedras na margem em primeiro plano',
    'dest_dolomitas.webp': 'As três torres de rocha das Tre Cime di Lavaredo, com flores amarelas no prado em primeiro plano',
    // Bali, Bora Bora, Maldivas, Seychelles, Noronha
    'blog_bali.webp': 'Piscina de borda infinita entre bangalôs de telhado de palha, cercada por mata tropical em Bali',
    'blog_bora_bora.webp': 'Bangalôs sobre palafitas numa lagoa turquesa, com o monte Otemanu ao fundo, em Bora Bora',
    'blog_maldivas.webp': 'Bangalô sobre a água ligado por um deque de madeira, numa lagoa rasa e transparente das Maldivas',
    'dest_seychelles.webp': 'Rochas de granito arredondadas sobre a areia de uma praia das Seychelles, com o mar ao fundo',
    'dest_seychelles_g1.webp': 'Formações de granito cinza e palmeiras numa praia das Seychelles, sob céu de nuvens altas',
    'dest_seychelles_g2.webp': 'Blocos de granito na beira do mar turquesa, numa enseada de areia clara das Seychelles',
    'dest_seychelles_g3.webp': 'Grande formação de granito com veios escuros, isolada na areia, com mata verde atrás',
    'blog_noronha.webp': 'Os dois morros dos Dois Irmãos vistos da praia, com mar esverdeado e areia clara em Fernando de Noronha',
    // Capadócia, Atacama, Courchevel
    'blog_capadocia.webp': 'Dezenas de balões coloridos subindo ao amanhecer sobre os vales de rocha da Capadócia',
    'blog_atacama.webp': 'Tenda de glamping iluminada por dentro, no deserto, sob um céu cheio de estrelas e a Via Láctea',
    'blog_courchevel.webp': 'Chalé de madeira iluminado e coberto de neve, numa encosta de estação de esqui ao anoitecer',
    // Costa Amalfitana, Santorini, Paris
    'costa_amalfitana.webp': 'Positano ao pôr do sol, com as casas coloridas na encosta e barcos na enseada',
    'blog_santorini.webp': 'Casas brancas de cúpulas azuis descendo o penhasco de Oia, sobre a caldeira de Santorini',
    'paris_cafe.webp': 'Casal sentado na mesa de um café parisiense, na calçada de uma rua de prédios claros',
    // Egito, Petra, Marrakech, Uzbequistão
    'egito.webp': 'As três pirâmides de Gizé ao pôr do sol, com dunas e uma caravana de camelos em primeiro plano',
    'dest_petra.webp': 'A fachada esculpida do Tesouro de Petra, com suas colunas e frontão talhados na rocha rosada',
    'dest_marrakech.webp': 'O minarete da mesquita Koutoubia entre palmeiras, em Marrakech, sob céu azul',
    'blog_uzbequistao.webp': 'A praça Registan, em Samarcanda, com suas madraçais de portais azulejados ao entardecer',
    // Ásia
    'japao_fuji.webp': 'O monte Fuji nevado refletido num lago, emoldurado por galhos de cerejeira em flor',
    'dest_halong.webp': 'Dois paredões de rocha coberta de mata se estreitando sobre a água, na baía de Ha Long',
    'dest_halong_g1.webp': 'Barcos de turismo ancorados entre ilhas de rocha na baía de Ha Long, em dia de névoa',
    'dest_halong_g2.webp': 'Pequenos barcos navegando entre os morros de pedra da baía de Ha Long',
    'dest_halong_g3.webp': 'Ilhas de rocha cobertas de vegetação emolduram um barco ao longe, na baía de Ha Long',
    'dest_srilanka.webp': 'Elefantes adultos se alimentando de folhagem à beira de um rio, no Sri Lanka',
    'dest_srilanka_g1.webp': 'Vista aérea de plantações de chá em terraços verdes, cortadas por uma trilha de terra',
    'dest_srilanka_g2.webp': 'Grupo de elefantes, entre eles um filhote, caminhando perto de visitantes no Sri Lanka',
    'dest_srilanka_g3.webp': 'Campo de chá visto de perto, com as folhas novas cobrindo o terreno até o horizonte',
    // Américas
    'patagonia-torres-del-paine.webp': 'As três torres de granito do Paine erguidas acima de um lago glacial, no sul do Chile',
    'machu_picchu.webp': 'As ruínas de Machu Picchu em terraços, com o pico Huayna Picchu atrás e névoa no vale',
    'dest_pascoa.webp': 'Fileira de moais de costas para o mar, sobre a plataforma de pedra, na Ilha de Páscoa',
    'dest_santiago_skycostanera.webp': 'A torre de vidro do Costanera Center acima dos prédios de Santiago, com os Andes ao fundo',
    'nova_zelandia.webp': 'Montanhas nevadas refletidas num lago de águas paradas, com duas pessoas caminhando na margem',
    // África
    'dest_namibia.webp': 'Duna de areia alaranjada da Namíbia, com a crista recortada contra o céu azul',
    'dest_namibia_g1.webp': 'Campo de dunas alaranjadas da Namíbia, com arbustos secos no primeiro plano',
    'dest_namibia_g2.webp': 'Árvores mortas e secas no leito branco de Deadvlei, com a duna vermelha atrás',
    'dest_namibia_g3.webp': 'Duna alta da Namíbia dividida ao meio entre a face iluminada e a face na sombra',
    'dest_ruanda.webp': 'Gorila-das-montanhas sentado na vegetação, olhando para a câmera, em Ruanda',
    'dest_ruanda_g1.webp': 'Gorila-das-montanhas em meio à folhagem densa, segurando um ramo',
    'dest_ruanda_g2.webp': 'Gorila jovem parcialmente escondido pela vegetação da floresta de Ruanda',
    'dest_ruanda_g3.webp': 'Rosto de um gorila-das-montanhas em primeiro plano, cercado de folhas verdes',
    'tanzania.webp': 'Leão de juba escura parado na savana ao pôr do sol, com acácias recortadas no horizonte',
    'islandia.webp': 'Aurora boreal verde sobre uma laguna glacial com blocos de gelo, e um fotógrafo com tripé na margem',
};

let trocas = 0;
const naoUsados = new Set(Object.keys(ALTS));
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const o = t;
    for (const tag of [...new Set(t.match(/<img\b[^>]*>/g) || [])]) {
        const src = (tag.match(/src="([^"]+)"/) || [])[1];
        if (!src || !ALTS[src]) continue;
        const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
        if (alt === undefined) continue;
        if (alt.trim().split(/\s+/).length > 3) continue;   // ja tem descricao
        t = t.split(tag).join(tag.replace(/alt="[^"]*"/, 'alt="' + ALTS[src] + '"'));
        naoUsados.delete(src);
        trocas++;
    }
    if (t !== o) fs.writeFileSync(fp, t, 'utf8');
}
console.log('alts reescritos:', trocas);
if (naoUsados.size) console.log('nao encontrados no html:', [...naoUsados].join(', '));

// quantos ainda tem alt fraco
let restam = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const t = l.ler(f).replace(/<!--[\s\S]*?-->/g, '');
    for (const tag of t.match(/<img\b[^>]*>/g) || []) {
        const src = (tag.match(/src="([^"]+)"/) || [])[1];
        const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
        if (!src || /^https?:/.test(src) || !alt) continue;
        if (alt.trim().split(/\s+/).length <= 3) { restam++; console.log('   ainda fraco:', f, src, JSON.stringify(alt)); }
    }
}
console.log('imagens locais com alt de ate 3 palavras:', restam);
