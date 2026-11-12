// Nove artigos sobre o Sul e o resto do Brasil, assinados por Nicholas.
//
// Mesmas regras dos anteriores: nenhum preco, tarifa, percentual ou horario de
// funcionamento que eu nao possa garantir; onde o valor ou a regra muda
// (entrada de parque, taxa, documento), o texto manda conferir na fonte
// oficial; nenhuma experiencia pessoal inventada; sem travessao.
//
// Datas: 09 a 12 de novembro de 2026, dias uteis, que e quando foram escritos.
// Diferente da rodada anterior, aqui nao ha pedido de espalhar pelo ano.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');
const A = require('./lib-artigo.js');

const NOVOS = [
    {
        slug: 'blog-gramado-canela-como-planejar',
        data: '2026-11-09',
        tituloPagina: 'Gramado e Canela: Como Planejar | Terra Venture',
        h1: 'Gramado e Canela: Como Planejar Sem Cair nas Filas',
        desc: 'Quando ir a Gramado e Canela, quantos dias ficar, onde se hospedar e como fugir da multidão na Serra Gaúcha.',
        card: 'Quando ir, quantos dias ficar e como fugir da multidão na Serra Gaúcha.',
        img: 'gramado-serra-gaucha.webp', imgW: 1200, imgH: 800, alt: 'Rua de Gramado, na Serra Gaúcha, com casas de estilo europeu e flores',
        local: 'Serra Gaúcha', tag: 'Rio Grande do Sul', categoria: 'brasil',
        lead: 'Gramado e Canela cabem em um fim de semana, mas só rendem de verdade quando a data e a hospedagem são escolhidas com cuidado.',
        corpo: [
            ['p', 'As duas cidades ficam coladas, na Serra Gaúcha, a cerca de 120 km de Porto Alegre. Fora de feriado, a viagem de carro leva em torno de duas horas, e é justamente por isso que a serra lota em qualquer data que sobra folga no calendário.'],
            ['h2', 'Quando Ir'],
            ['p', 'No inverno, de junho a agosto, faz frio de verdade, com geada e, muito raramente, neve. É a época de fondue, lareira e chocolate quente. O Natal Luz, com decoração e apresentações, costuma acontecer no fim do ano. As hortênsias florescem, em geral, no fim da primavera e no verão. As datas dos eventos mudam, então confira a programação oficial antes de reservar.'],
            ['h2', 'Gramado ou Canela'],
            ['p', 'Gramado concentra restaurantes, lojas e a rua mais movimentada. Canela é mais calma, com parques e a Catedral de Pedra, e está a poucos minutos de carro. Quem quer caminhar à noite entre restaurantes costuma preferir Gramado. Quem quer sossego e natureza pode ficar em Canela e visitar Gramado de dia.'],
            ['h2', 'Datas Cheias e Como Fugir Delas'],
            ['p', 'Feriados, fins de semana de inverno e a temporada de Natal lotam hotéis e restaurantes. Meio de semana é mais tranquilo e, em geral, mais barato. Restaurantes de fim de semana pedem reserva com antecedência.'],
            ['h2', 'Quantos Dias'],
            ['p', 'Dois dias cobrem o centro de Gramado e uma ida a Canela. Três ou quatro permitem passeios para fora e um ritmo sem pressa, como um dia nos <a href="/blog-canions-aparados-da-serra">cânions de Aparados da Serra</a>.'],
            ['h2', 'Combine Com a Região'],
            ['p', 'A Serra Gaúcha permite juntar Gramado com o <a href="/blog-vale-dos-vinhedos-bento-goncalves">Vale dos Vinhedos</a> e com a <a href="/blog-rota-romantica-vale-dos-sinos">Rota Romântica</a>, que liga a serra ao Vale dos Sinos. Cada um merece pelo menos um dia inteiro.'],
        ],
        cta: ['Quer montar a sua Serra Gaúcha?', 'A gente escolhe a data fora do pico, a hospedagem pelo perfil da viagem e combina Gramado com o resto da região.', 'Li o artigo sobre Gramado e Canela e quero planejar uma viagem pela Serra Gaúcha.', 'Planejar minha Serra Gaúcha'],
        links: [['/blog-vale-dos-vinhedos-bento-goncalves', 'o Vale dos Vinhedos'], ['/blog-canions-aparados-da-serra', 'os cânions de Aparados da Serra']],
    },
    {
        slug: 'blog-vale-dos-vinhedos-bento-goncalves',
        data: '2026-11-09',
        tituloPagina: 'Vale dos Vinhedos: Como Visitar | Terra Venture',
        h1: 'Vale dos Vinhedos: Como Visitar Vinícolas Sem Pressa',
        desc: 'Quantas vinícolas visitar por dia, a época da vindima, transporte e o que reservar no Vale dos Vinhedos, em Bento Gonçalves.',
        card: 'Quantas vinícolas por dia, quando é a vindima e quem dirige.',
        img: 'vale-dos-vinhedos.webp', imgW: 1200, imgH: 800, alt: 'Parreirais do Vale dos Vinhedos, em Bento Gonçalves, com colinas ao fundo',
        local: 'Vale dos Vinhedos', tag: 'Rio Grande do Sul', categoria: 'brasil',
        lead: 'O Vale dos Vinhedos é pequeno no mapa e generoso em vinícolas. O erro é tentar encaixar muitas no mesmo dia.',
        corpo: [
            ['p', 'O vale fica na Serra Gaúcha, entre Bento Gonçalves, Garibaldi e Monte Belo do Sul. É uma das regiões vinícolas mais conhecidas do Brasil e foi a primeira a receber o selo de Indicação de Procedência, em 2002.'],
            ['h2', 'Quantas Vinícolas por Dia'],
            ['p', 'Três vinícolas por dia é um bom limite. Cada visita com degustação costuma levar de uma hora e meia a duas horas, e vinho com estrada pede ritmo lento.'],
            ['h2', 'Quando Ir'],
            ['p', 'A vindima acontece, em geral, entre janeiro e março, com colheita e festas nas vinícolas. O outono traz parreirais dourados, e o inverno combina com tintos e espumantes, com frio na serra. As datas variam de ano para ano.'],
            ['h2', 'Reserve Antes'],
            ['p', 'Visitas guiadas, almoços e jantares em vinícola costumam exigir reserva, principalmente nos fins de semana. Algumas só recebem com agendamento.'],
            ['h2', 'Quem Dirige'],
            ['p', 'Degustar e dirigir não combinam. Contrate motorista, transfer ou passeio com condutor. Quem vai de carro próprio deve combinar, desde o começo do dia, quem fica sem beber.'],
            ['h2', 'Mais Que Vinho'],
            ['p', 'Um dos passeios mais conhecidos da região é o de trem a vapor, a Maria Fumaça, entre Bento Gonçalves e Carlos Barbosa, que costuma incluir degustação a bordo. A cultura de imigração italiana aparece nas cantinas e nos restaurantes de comida típica. Dá para combinar o vale com <a href="/blog-gramado-canela-como-planejar">Gramado e Canela</a> na mesma viagem.'],
        ],
        cta: ['Quer um dia de vinícola bem montado?', 'A gente escolhe as vinícolas pelo seu gosto, reserva as visitas e organiza o motorista.', 'Li o artigo sobre o Vale dos Vinhedos e quero montar um roteiro de vinícolas.', 'Montar meu roteiro de vinícolas'],
        links: [['/blog-gramado-canela-como-planejar', 'Gramado e Canela'], ['/blog-rota-do-vinho-mendocina', 'a rota do vinho em Mendoza']],
    },
    {
        slug: 'blog-canions-aparados-da-serra',
        data: '2026-11-10',
        tituloPagina: 'Cânions de Aparados da Serra | Terra Venture',
        h1: 'Cânions de Aparados da Serra: Itaimbezinho e Fortaleza',
        desc: 'Como visitar os cânions Itaimbezinho e Fortaleza: época, neblina, estrada, entrada nos parques e quantos dias reservar.',
        card: 'Itaimbezinho e Fortaleza: neblina, estrada, entrada nos parques e como dividir os dias.',
        img: 'canions-aparados-da-serra.webp', imgW: 1200, imgH: 800, alt: 'Paredão do cânion Itaimbezinho, nos Aparados da Serra, com vegetação e neblina',
        local: 'Aparados da Serra', tag: 'Rio Grande do Sul', categoria: 'brasil',
        lead: 'Poucos lugares do Sul entregam uma paisagem tão grande quanto os cânions de Aparados da Serra. Também poucos dependem tanto do clima.',
        corpo: [
            ['p', 'Os cânions ficam na divisa entre o Rio Grande do Sul e Santa Catarina, nos parques nacionais de Aparados da Serra e da Serra Geral. O mais visitado é o Itaimbezinho, em Cambará do Sul, que também é a cidade mais próxima para dormir.'],
            ['h2', 'O Clima Decide'],
            ['p', 'A neblina é comum e pode esconder o cânion por horas. Muita gente vai cedo, quando o céu costuma estar mais limpo, e deixa folga no roteiro para um segundo dia, caso o primeiro feche. Frio e vento forte pedem agasalho.'],
            ['h2', 'Itaimbezinho e Fortaleza'],
            ['p', 'O Itaimbezinho tem trilhas curtas à beira do cânion e uma trilha mais longa até o fundo. O Fortaleza é outro cânion, com outra vista, e vale visitar os dois se houver tempo. Cada um pede uma manhã ou uma tarde.'],
            ['h2', 'Funcionamento e Entrada'],
            ['p', 'Os parques têm dias e horários de funcionamento definidos e podem cobrar entrada ou exigir agendamento. As regras mudam, então confira no site do ICMBio antes de ir.'],
            ['h2', 'Estrada'],
            ['p', 'Parte do acesso pode ter estrada de chão ou piso irregular. Dirija com atenção, abasteça antes e evite chegar à noite.'],
            ['h2', 'Onde Dormir'],
            ['p', 'Cambará do Sul concentra pousadas perto dos parques. Quem prefere mais opções de restaurante pode dormir em <a href="/blog-gramado-canela-como-planejar">Gramado ou Canela</a> e fazer o dia dos cânions saindo cedo, sabendo que a ida e a volta tomam boa parte do dia.'],
            ['h2', 'Quantos Dias'],
            ['p', 'Dois dias na região cobrem os dois cânions com folga para o tempo fechar. Do outro lado da divisa, a <a href="/blog-serra-catarinense-urubici-sao-joaquim">Serra Catarinense</a> combina com o mesmo roteiro.'],
        ],
        cta: ['Quer ver os cânions com a janela de tempo certa?', 'A gente monta o roteiro com folga para o clima, escolhe a base pelo seu perfil e cuida do resto da logística.', 'Li o artigo sobre os cânions de Aparados da Serra e quero planejar essa viagem.', 'Planejar minha ida aos cânions'],
        links: [['/blog-gramado-canela-como-planejar', 'Gramado e Canela'], ['/blog-serra-catarinense-urubici-sao-joaquim', 'a Serra Catarinense, do outro lado da divisa']],
    },
    {
        slug: 'blog-rota-romantica-vale-dos-sinos',
        data: '2026-11-10',
        tituloPagina: 'Rota Romântica: Fim de Semana | Terra Venture',
        h1: 'Rota Romântica: Um Fim de Semana Entre o Vale dos Sinos e a Serra',
        desc: 'O caminho de influência alemã que liga o Vale dos Sinos à Serra Gaúcha, com cafés coloniais e cidades pequenas.',
        card: 'O caminho de influência alemã entre o Vale dos Sinos e a Serra, com café colonial.',
        img: 'rota-romantica-rs.webp', imgW: 1200, imgH: 800, alt: 'Casa de arquitetura enxaimel numa cidade da Rota Romântica, no Rio Grande do Sul',
        local: 'Rota Romântica', tag: 'Rio Grande do Sul', categoria: 'brasil',
        lead: 'A Rota Romântica liga o Vale dos Sinos à Serra e é um dos roteiros mais fáceis de fazer de carro no Rio Grande do Sul.',
        corpo: [
            ['p', 'O caminho atravessa cidades de colonização alemã, como São Leopoldo, Dois Irmãos, Nova Petrópolis e Picada Café, e chega a Gramado e Canela. Ivoti, onde fica a Terra Venture, está no começo desse trajeto.'],
            ['h2', 'De Onde Veio'],
            ['p', 'São Leopoldo foi a primeira colônia alemã do Rio Grande do Sul, fundada em 1824. A partir dali, a imigração se espalhou pelo vale e pela serra, e a arquitetura, a comida e os costumes da rota vêm dessa história.'],
            ['h2', 'Como Dividir'],
            ['p', 'Em um fim de semana, dá para dormir uma noite em Nova Petrópolis ou em Picada Café e outra em Gramado. Em três dias, sobra tempo para as cidades menores e para mais de um café colonial.'],
            ['h2', 'Café Colonial'],
            ['p', 'É a refeição que define o roteiro: mesa farta de pães, cucas, queijos, frios e doces, servida no fim da tarde. Muitos têm horário e capacidade limitados, então reserve.'],
            ['h2', 'Nova Petrópolis'],
            ['p', 'É conhecida pelo Parque Aldeia do Imigrante e pelo Labirinto Verde, passeios fáceis de encaixar com crianças.'],
            ['h2', 'Quando Ir'],
            ['p', 'Qualquer estação funciona. O inverno é frio na serra, e as hortênsias florescem, em geral, no fim da primavera e no verão.'],
            ['h2', 'Depois da Rota'],
            ['p', 'Quem chega a Gramado pode seguir para o <a href="/blog-vale-dos-vinhedos-bento-goncalves">Vale dos Vinhedos</a> ou para os <a href="/blog-canions-aparados-da-serra">cânions de Aparados da Serra</a>. O texto sobre <a href="/blog-gramado-canela-como-planejar">Gramado e Canela</a> detalha o fim do caminho.'],
        ],
        cta: ['Quer sair do Vale dos Sinos para a Serra sem pensar no roteiro?', 'A gente monta o fim de semana, reserva os cafés coloniais e a hospedagem, e combina a rota com Gramado.', 'Li o artigo sobre a Rota Romântica e quero montar um fim de semana pela serra.', 'Montar meu fim de semana'],
        links: [['/blog-gramado-canela-como-planejar', 'Gramado e Canela'], ['/blog-vale-dos-vinhedos-bento-goncalves', 'o Vale dos Vinhedos']],
    },
    {
        slug: 'blog-serra-catarinense-urubici-sao-joaquim',
        data: '2026-11-11',
        tituloPagina: 'Serra Catarinense: Urubici e São Joaquim | Terra Venture',
        h1: 'Serra Catarinense: Urubici, São Joaquim e a Chance de Ver Neve',
        desc: 'Frio, geada e, algumas vezes, neve: como planejar uma viagem à Serra Catarinense, entre Urubici e São Joaquim.',
        card: 'Frio, geada, cânions e a chance de neve. Como planejar a serra de Santa Catarina.',
        img: 'serra-catarinense-urubici.webp', imgW: 1200, imgH: 800, alt: 'Paisagem de campos de altitude e neblina na Serra Catarinense, perto de Urubici',
        local: 'Serra Catarinense', tag: 'Santa Catarina', categoria: 'brasil',
        lead: 'A Serra Catarinense tem as temperaturas mais baixas do Brasil e uma paisagem de cânions e campos de altitude. A neve é possível, nunca garantida.',
        corpo: [
            ['p', 'A região reúne Urubici, São Joaquim e Bom Jardim da Serra, em altitudes onde o inverno é rigoroso e o verão é ameno. É um dos poucos lugares do país onde se viaja pelo frio.'],
            ['h2', 'O Que Esperar do Frio'],
            ['p', 'O inverno, de junho a agosto, traz geada com frequência e dias de frio intenso. A neve acontece em alguns invernos e em poucos dias, então quem viaja só por ela precisa aceitar o risco de não ver. Quem aceita a geada e a paisagem tem uma boa viagem de qualquer jeito.'],
            ['h2', 'Urubici'],
            ['p', 'É a base mais completa, com pousadas, restaurantes e acesso a cânions e cascatas. O Morro da Igreja tem um dos mirantes mais altos da região.'],
            ['h2', 'São Joaquim'],
            ['p', 'É a cidade conhecida pelo frio e pelas maçãs, e a região também tem vinícolas de altitude.'],
            ['h2', 'Serra do Rio do Rastro'],
            ['p', 'A estrada em curvas que desce a serra para o litoral é um dos trechos mais fotografados de Santa Catarina. O mirante e a descida combinam com um dia inteiro de passeio.'],
            ['h2', 'Estrada e Clima'],
            ['p', 'Neblina e gelo na pista podem aparecer nos dias mais frios, e a estrada tem trechos de chão. Planeje com folga e evite dirigir à noite. Leve roupa para o frio, como no texto sobre <a href="/blog-arrumar-mala-inverno">como arrumar a mala para a neve</a>.'],
            ['h2', 'Como Montar'],
            ['p', 'Três noites em Urubici cobrem os pontos principais. Quem quer incluir a Serra do Rio do Rastro soma mais uma noite no caminho. Do outro lado da divisa, os <a href="/blog-canions-aparados-da-serra">cânions de Aparados da Serra</a> completam o roteiro.'],
        ],
        cta: ['Quer ver o inverno do Sul de perto?', 'A gente escolhe a semana com mais chance de frio forte, monta a base em Urubici e deixa folga para o clima.', 'Li o artigo sobre a Serra Catarinense e quero planejar uma viagem de inverno.', 'Planejar minha viagem de inverno'],
        links: [['/blog-arrumar-mala-inverno', 'como arrumar a mala para o frio'], ['/blog-canions-aparados-da-serra', 'os cânions de Aparados da Serra']],
    },
    {
        slug: 'blog-florianopolis-qual-praia',
        data: '2026-11-11',
        tituloPagina: 'Florianópolis: Como Escolher a Praia | Terra Venture',
        h1: 'Florianópolis: Como Escolher a Praia Certa',
        desc: 'Norte, leste ou sul da ilha: como escolher a região de Florianópolis pelo tipo de viagem e pela época.',
        card: 'Norte, leste ou sul: escolher o lado da ilha vale mais que escolher a praia.',
        img: 'florianopolis-praia.webp', imgW: 1200, imgH: 800, alt: 'Praia de Florianópolis com faixa de areia, mar azul e morros ao fundo',
        local: 'Florianópolis', tag: 'Santa Catarina', categoria: 'brasil',
        lead: 'Florianópolis não é uma praia, é uma ilha com dezenas delas e personalidades diferentes. Escolher o lado certo vale mais do que escolher a praia.',
        corpo: [
            ['p', 'Quem chega sem escolher o lado da ilha passa a viagem no carro, atravessando de um ponto a outro. Dois ou três pontos bem escolhidos rendem mais do que a ilha inteira.'],
            ['h2', 'Norte'],
            ['p', 'É o lado de águas mais calmas e mornas e de boa estrutura de restaurantes e hospedagem. Costuma agradar famílias e quem quer verão movimentado, com praias como Jurerê e Canasvieiras.'],
            ['h2', 'Leste'],
            ['p', 'É o lado do mar aberto, das ondas e da vida noturna, com a Joaquina e a Praia Mole. Atrai quem gosta de surfe e de movimento.'],
            ['h2', 'Sul'],
            ['p', 'É mais rústico e tranquilo, com enseadas, trilhas e restaurantes de frutos do mar, em lugares como o Campeche e o Pântano do Sul.'],
            ['h2', 'Trânsito'],
            ['p', 'No verão, o trânsito entre os lados da ilha pode ser lento. Escolha um lado para ficar e explore poucos pontos por dia, em vez de atravessar a ilha.'],
            ['h2', 'Quando Ir'],
            ['p', 'De dezembro a fevereiro é a alta temporada, com praias cheias, preços mais altos e água mais quente. Setembro e outubro, e março e abril, costumam combinar clima agradável com menos gente. O <a href="/melhor-epoca">guia mês a mês</a> ajuda a decidir.'],
            ['h2', 'Além da Praia'],
            ['p', 'A Ponte Hercílio Luz, a Lagoa da Conceição e os restaurantes de ostras e frutos do mar são bons programas para dias de tempo fechado. Quem quer trocar o mar pela serra encontra, no mesmo estado, a <a href="/blog-serra-catarinense-urubici-sao-joaquim">Serra Catarinense</a>.'],
        ],
        cta: ['Quer escolher o lado certo da ilha?', 'A gente monta a viagem pela região que combina com o seu perfil, e fora do pico quando possível.', 'Li o artigo sobre Florianópolis e quero planejar a minha viagem.', 'Planejar minha Floripa'],
        links: [['/melhor-epoca', 'a melhor época por mês'], ['/blog-serra-catarinense-urubici-sao-joaquim', 'a Serra Catarinense, no mesmo estado']],
    },
    {
        slug: 'blog-bonito-ms-como-planejar',
        data: '2026-11-12',
        tituloPagina: 'Bonito, MS: Como Planejar | Terra Venture',
        h1: 'Bonito, MS: Como Montar os Passeios Sem Perder Vaga',
        desc: 'Passeios com vagas limitadas, época de água cristalina e quantos dias ficar em Bonito, no Mato Grosso do Sul.',
        card: 'Passeios com vaga limitada, época da água clara e quantos dias ficar.',
        img: 'bonito-ms.webp', imgW: 1200, imgH: 800, alt: 'Rio de água cristalina em Bonito, no Mato Grosso do Sul, cercado de vegetação',
        local: 'Bonito, MS', tag: 'Pelo Brasil', categoria: 'brasil',
        lead: 'Em Bonito, quase tudo tem vaga limitada e agenda fechada. Quem chega sem reserva descobre que os melhores passeios já esgotaram.',
        corpo: [
            ['p', 'A cidade fica no Mato Grosso do Sul e vive do turismo de natureza: rios de água muito clara, grutas e cachoeiras. A maioria dos atrativos é privada, funciona com número limitado de visitantes e exige voucher comprado antes, por agência ou operadora credenciada.'],
            ['h2', 'Reserve Antes'],
            ['p', 'O número de visitantes por dia é limitado, e os passeios mais procurados esgotam com semanas de antecedência, principalmente em feriados e em julho. Compre os principais antes de fechar a hospedagem.'],
            ['h2', 'Quando Ir'],
            ['p', 'A água costuma ser mais cristalina no período de seca, em geral de abril a setembro. No período de chuvas, de outubro a março, os rios podem ficar turvos depois de temporais, e alguns passeios sofrem ajustes. Julho é alta temporada.'],
            ['h2', 'Passeios Que Costumam Entrar'],
            ['p', 'Flutuação em rios de água clara, grutas como a do Lago Azul, o Buraco das Araras e as cachoeiras estão entre os programas mais conhecidos. Alguns têm restrições de idade, peso ou preparo físico, então confira antes.'],
            ['h2', 'Distâncias'],
            ['p', 'Os atrativos ficam espalhados, a alguns quilômetros da cidade, e a maioria dos passeios inclui o traslado. Planeje dois ou três passeios por dia, não mais.'],
            ['h2', 'Como Chegar'],
            ['p', 'O acesso costuma ser por Campo Grande ou por aeroportos da região, seguido de estrada. Confira as opções e o tempo de deslocamento com antecedência.'],
            ['h2', 'Quantos Dias'],
            ['p', 'Quatro noites permitem um ritmo bom, com três ou quatro passeios principais e um dia de descanso. Se o seu gosto é natureza, vale ler também sobre a <a href="/blog-chapada-dos-veadeiros">Chapada dos Veadeiros</a>.'],
        ],
        cta: ['Quer garantir os passeios certos em Bonito?', 'A gente reserva os passeios principais antes de fechar a hospedagem e monta a ordem pelo seu ritmo.', 'Li o artigo sobre Bonito e quero planejar essa viagem.', 'Planejar minha Bonito'],
        links: [['/blog-chapada-dos-veadeiros', 'a Chapada dos Veadeiros, outro destino de natureza'], ['/blog-noronha-como-planejar', 'Fernando de Noronha, que também trabalha com vagas limitadas']],
    },
    {
        slug: 'blog-foz-do-iguacu-cataratas',
        data: '2026-11-12',
        tituloPagina: 'Foz do Iguaçu: Cataratas dos Dois Lados | Terra Venture',
        h1: 'Foz do Iguaçu: Cataratas dos Dois Lados',
        desc: 'Lado brasileiro ou argentino das Cataratas do Iguaçu? O que muda em cada um, documento para cruzar e quantos dias ficar.',
        card: 'O que muda entre o lado brasileiro e o argentino, e como combinar os dois.',
        img: 'cataratas-do-iguacu.webp', imgW: 1200, imgH: 800, alt: 'Quedas das Cataratas do Iguaçu cercadas de floresta, com neblina da água no ar',
        local: 'Foz do Iguaçu', tag: 'Pelo Brasil', categoria: 'brasil',
        lead: 'As Cataratas do Iguaçu ficam entre o Brasil e a Argentina, e cada lado mostra uma coisa diferente. Vale ver os dois.',
        corpo: [
            ['p', 'Foz do Iguaçu fica na tríplice fronteira com a Argentina e o Paraguai, e é ponto de partida para os dois parques nacionais que protegem as quedas.'],
            ['h2', 'Lado Brasileiro'],
            ['p', 'Oferece a vista panorâmica do conjunto de quedas, em passarelas que chegam perto da Garganta do Diabo. O percurso é curto e cabe em uma manhã.'],
            ['h2', 'Lado Argentino'],
            ['p', 'O lado argentino é maior e permite chegar mais perto das quedas, com mais trilhas e passarelas. Reserve um dia inteiro.'],
            ['h2', 'Documento Para Cruzar'],
            ['p', 'A travessia para a Argentina exige documento válido. Confira antes de viajar qual documento é aceito e em que condições, porque a regra pode mudar, e o passaporte é a opção mais segura. Veja o texto sobre <a href="/blog-documentos-para-viajar">documentos para viajar</a>.'],
            ['h2', 'Quando Ir'],
            ['p', 'O volume de água varia ao longo do ano e depende da chuva. Em períodos de cheia, algumas passarelas podem fechar. Confira as condições antes de ir.'],
            ['h2', 'Além das Cataratas'],
            ['p', 'O Marco das Três Fronteiras, o Parque das Aves e a usina de Itaipu entram bem no roteiro, em um dia mais curto.'],
            ['h2', 'Quantos Dias'],
            ['p', 'Três noites permitem ver os dois lados com um dia livre no meio.'],
        ],
        cta: ['Quer ver as Cataratas dos dois lados?', 'A gente monta os dois dias de parque, cuida da travessia e deixa folga para o clima.', 'Li o artigo sobre Foz do Iguaçu e quero planejar essa viagem.', 'Planejar minha Foz'],
        links: [['/blog-documentos-para-viajar', 'os documentos da viagem'], ['/blog-bonito-ms-como-planejar', 'Bonito, outro destino de natureza no Brasil']],
    },
    {
        slug: 'blog-lencois-maranhenses-quando-ir',
        data: '2026-11-12',
        tituloPagina: 'Lençóis Maranhenses: Quando Ir | Terra Venture',
        h1: 'Lençóis Maranhenses: Quando as Lagoas Estão Cheias',
        desc: 'As lagoas dos Lençóis Maranhenses mudam ao longo do ano. Quando ir, onde ficar e como se mover pelas dunas.',
        card: 'As lagoas mudam ao longo do ano. Quando ir e como se mover pelas dunas.',
        img: 'lencois-maranhenses.webp', imgW: 1200, imgH: 800, alt: 'Dunas brancas dos Lençóis Maranhenses com lagoas de água azul entre elas',
        local: 'Lençóis Maranhenses', tag: 'Pelo Brasil', categoria: 'brasil',
        lead: 'Os Lençóis Maranhenses mudam de cara ao longo do ano. A paisagem que as pessoas fotografam depende da chuva.',
        corpo: [
            ['p', 'O parque nacional, no Maranhão, é um campo de dunas brancas com lagoas de água clara entre elas. As lagoas não são fixas: elas aparecem e desaparecem com o regime das chuvas.'],
            ['h2', 'Como Funciona'],
            ['p', 'As lagoas se formam entre as dunas com a água da chuva, que cai nos primeiros meses do ano. Depois o nível baixa devagar, e muitas diminuem ou secam no fim do ano.'],
            ['h2', 'Quando Ir'],
            ['p', 'Em geral, de junho a setembro as lagoas estão cheias e o tempo é mais seco, o que facilita os passeios. No fim do ano, muitas lagoas diminuem. Na época de chuvas, o acesso pode ser mais difícil. O <a href="/melhor-epoca">guia mês a mês</a> ajuda a situar o seu mês.'],
            ['h2', 'Onde Ficar'],
            ['p', 'Barreirinhas é a base mais usada, com hotéis e passeios. Outras opções, como Santo Amaro, ficam mais perto das dunas e têm outro ritmo.'],
            ['h2', 'Como Se Mover'],
            ['p', 'Os passeios nas dunas geralmente são feitos em veículos 4x4 com guia, e o deslocamento por estrada de areia faz parte da viagem. Leve protetor solar e roupa leve.'],
            ['h2', 'Quantas Noites'],
            ['p', 'Três noites permitem alguns passeios em lagoas e um passeio de barco no rio Preguiças. É uma viagem de natureza, no mesmo espírito de <a href="/blog-noronha-como-planejar">Fernando de Noronha</a>.'],
        ],
        cta: ['Quer ver as lagoas cheias?', 'A gente escolhe o mês pelo nível das lagoas e monta a base e os passeios pelo seu ritmo.', 'Li o artigo sobre os Lençóis Maranhenses e quero planejar essa viagem.', 'Planejar meus Lençóis'],
        links: [['/melhor-epoca', 'a melhor época por mês'], ['/blog-noronha-como-planejar', 'Noronha, outro destino de natureza']],
    },
];

/* ---------- cria os arquivos ---------- */
let comFoto = 0, semFoto = 0;
for (const a of NOVOS) {
    fs.writeFileSync(path.join(l.DIR, a.slug + '.html'), A.montar(a, a.data), 'utf8');
    if (A.temFoto(a)) comFoto++; else semFoto++;
}
console.log('artigos criados:', NOVOS.length, '| com foto:', comFoto, '| sem foto (abertura tipografica):', semFoto);

/* ---------- cards e chip do filtro em blog.html ---------- */
{
    let t = l.ler('blog.html');
    const q = l.quebra(t);

    // remove cards antigos desses slugs, para o gerador poder rodar de novo
    for (const a of NOVOS) {
        const i = t.indexOf('<a href="/' + a.slug + '" class="blog-card');
        if (i === -1) continue;
        const fim = l.bloco(t, i, 'a');
        const ini = t.lastIndexOf('\n', i) + 1;
        t = t.slice(0, ini) + t.slice(fim).replace(/^\r?\n/, '');
    }
    const iPrim = t.indexOf('<a href="/blog-');
    const iniLinha = t.lastIndexOf('\n', iPrim) + 1;
    t = t.slice(0, iniLinha) + NOVOS.map(a => A.card(a, a.data, q)).join(q) + q + t.slice(iniLinha);

    if (!t.includes('data-filter="brasil"')) {
        const ANC = '<button class="dest-chip" data-filter="viajantes" type="button">Para Viajantes</button>';
        if (!t.includes(ANC)) { console.error('FALHA: chip de viajantes'); process.exit(1); }
        t = t.replace(ANC, ANC + q + '                    <button class="dest-chip" data-filter="brasil" type="button">Pelo Brasil</button>');
    }
    l.gravar('blog.html', t);
    console.log('blog.html: cards inseridos e chip "Pelo Brasil" criado');
}
