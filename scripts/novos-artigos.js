// Gera 5 artigos novos para o Diário, no mesmo template dos 27 existentes.
//
// Escolha dos temas: os 27 artigos atuais cobrem 15 destinos, 3 sobre malas e
// temas como lua de mel, slow travel e multigeracional. Faltava a parte chata e
// prática, que é justamente a que mais gera busca e a que a Terra Venture
// resolve como serviço: documentação, dinheiro, voo longo, imprevisto e
// criança pequena. Nenhum repete assunto existente.
//
// Cuidado com fatos: tudo que muda com frequência (alíquota de IOF, data de
// início do ETIAS) é descrito pelo mecanismo, sem número ou data que possa
// envelhecer errado no site de um negócio real.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';
const DATA = '13 de Outubro, 2026';
const DATA_ISO = '2026-10-13';

const ARTIGOS = [
    {
        slug: 'blog-documentos-para-viajar',
        titulo: 'Documentos para Viajar: O Que Conferir Antes de Comprar a Passagem',
        desc: 'Validade de passaporte, visto, autorização de menor e as exigências que só aparecem no balcão do check-in.',
        img: 'blog_seguro_viagem.webp',
        tag: 'Dicas para Viajantes',
        cat: 'viajantes',
        resumo: 'Validade de passaporte, visto e as exigências que só aparecem no balcão do check-in.',
        lead: 'A maioria dos problemas de documentação não aparece no embarque. Aparece semanas antes, quando já não dá tempo de resolver.',
        corpo: [
            [null, 'Documento é a parte da viagem que ninguém gosta de pensar e que tem o maior custo quando falha: você perde o voo, perde a diária, perde o roteiro inteiro. A boa notícia é que quase tudo é previsível com antecedência.'],
            ['A Regra dos Seis Meses', 'Boa parte dos países exige que o passaporte tenha validade mínima de seis meses a contar da data de entrada, não da data da compra. Um passaporte que vence em quatro meses pode ser recusado no check-in mesmo que a viagem dure uma semana. Confira a validade antes de fechar passagem, porque a emissão e a renovação dependem de agenda da Polícia Federal e o prazo varia bastante conforme a época do ano e a cidade.'],
            ['Visto Não é Só Carimbo', 'Visto é apenas uma das formas de autorização. Existem também as autorizações eletrônicas, pedidas on-line antes do embarque, e os acordos de isenção, que dispensam visto mas não dispensam requisitos. A Europa está implantando um sistema de autorização eletrônica prévia para quem hoje entra sem visto; a data de início foi adiada mais de uma vez, então vale confirmar a exigência vigente perto da viagem, não meses antes. Para Estados Unidos, o visto segue obrigatório e o gargalo costuma ser a fila de entrevista, que em alguns consulados passa de um ano.'],
            ['Criança Sai do País com Regra Própria', 'Menor brasileiro viajando para o exterior sem os dois responsáveis precisa de autorização formal de quem não vai. Viajando com apenas um dos pais, é preciso autorização do outro. Viajando com terceiros ou sozinho, de autorização de ambos. A exigência é verificada no embarque e não há jeito de contornar na hora. Documento de identificação com foto do menor também é obrigatório, e certidão de nascimento sozinha nem sempre basta.'],
            ['O Que Mais Pedem no Balcão', 'Alguns destinos exigem comprovante de vacinação, em especial febre amarela para parte da África e da América do Sul, e a carteira internacional precisa ser emitida com antecedência. Outros pedem comprovante de seguro viagem, passagem de saída do país ou comprovante de hospedagem. Nada disso aparece no site da companhia aérea: são regras do país de destino, verificadas pela companhia porque é ela quem paga a multa se embarcar alguém irregular.'],
            ['O Jeito Simples de Não Ser Pego', 'Monte a lista de exigências por destino assim que a viagem tiver data, não quando tiver passagem. Guarde cópias digitais e físicas separadas do passaporte e do seguro, porque a cópia no celular não ajuda quando o celular é o que sumiu. E confira seu nome: o bilhete precisa bater exatamente com o documento, inclusive na ordem dos sobrenomes.'],
        ],
    },
    {
        slug: 'blog-dinheiro-na-viagem',
        titulo: 'Dinheiro na Viagem: Câmbio, Cartão e Quanto Levar em Espécie',
        desc: 'Como dividir entre espécie, cartão e conta internacional sem pagar imposto à toa nem ficar na mão.',
        img: 'blog_mala.webp',
        tag: 'Dicas para Viajantes',
        cat: 'viajantes',
        resumo: 'Como dividir entre espécie, cartão e conta internacional sem pagar à toa nem ficar na mão.',
        lead: 'Não existe a melhor forma de levar dinheiro. Existe a combinação certa, e ela muda conforme o destino.',
        corpo: [
            [null, 'Quem leva tudo em espécie carrega risco. Quem leva tudo no cartão descobre, no primeiro vilarejo sem maquininha, que precisava de uma reserva. A divisão é o que resolve.'],
            ['Espécie: Menos do Que Você Pensa', 'Dinheiro vivo serve para o que cartão não cobre: táxi em cidade pequena, gorjeta, feira, entrada de atração local, e a primeira hora no destino antes de você entender como as coisas funcionam ali. Para a maior parte dos roteiros, uma reserva modesta por dia resolve, guardada em dois lugares diferentes. Levar muito acima disso aumenta o risco sem aumentar a conveniência, e há limite declaratório para entrar e sair do Brasil com valores altos.'],
            ['Cartão de Crédito Internacional', 'É o mais prático e o que dá melhor proteção em caso de problema, porque permite contestar cobrança. O custo é o imposto sobre operação financeira, que incide sobre compras em moeda estrangeira e cuja alíquota tem mudado nos últimos anos, então vale conferir a vigente antes de viajar. Avise o banco sobre as datas e o destino: bloqueio por suspeita de fraude no meio da viagem é comum e resolver de fora do país é lento.'],
            ['Conta Internacional e Cartão Pré-pago', 'Permitem travar o câmbio antes da viagem, o que protege de oscilação, e costumam ter imposto menor que o crédito. Funcionam bem para gasto programado: hospedagem, passeios, refeições. Dois cuidados: saque em caixa eletrônico quase sempre tem tarifa fixa por operação, então sacar muitas vezes valores pequenos sai caro; e vale confirmar a aceitação da bandeira no destino, porque fora dos grandes centros nem toda bandeira passa.'],
            ['A Regra do Dois', 'Leve dois meios de pagamento de origens diferentes, guardados separados. Cartão clonado, conta bloqueada e carteira perdida são eventos comuns, e nenhum deles vira crise se existe um segundo caminho. O mesmo vale para o acompanhante: cada pessoa com seu meio, não tudo com a mesma pessoa.'],
            ['Pagar em Real no Exterior é Armadilha', 'Quando a maquininha pergunta se você quer pagar na sua moeda, ela está oferecendo fazer a conversão por conta própria, com câmbio pior que o da bandeira. Escolha sempre a moeda local. É uma decisão de dois segundos que aparece várias vezes por viagem.'],
        ],
    },
    {
        slug: 'blog-voos-longos',
        titulo: 'Voos Longos: Como Escolher a Conexão, o Assento e Chegar Inteiro',
        desc: 'Tempo mínimo de conexão, escolha de assento e o que de fato reduz o jet lag.',
        img: 'blog_trilha.webp',
        tag: 'Dicas para Viajantes',
        cat: 'viajantes',
        resumo: 'Tempo de conexão, escolha de assento e o que de fato reduz o jet lag.',
        lead: 'O primeiro dia da viagem é o mais caro: foi pago inteiro e costuma ser perdido pela metade. Dá para reduzir isso antes de embarcar.',
        corpo: [
            [null, 'Voo longo não é só duração. É a soma de conexão mal dimensionada, assento errado e chegada fora de hora. As três coisas se decidem na compra, não no aeroporto.'],
            ['Conexão Curta é Economia Cara', 'Uma hora de conexão em aeroporto grande, com troca de terminal e nova inspeção, é aposta. Se o primeiro trecho atrasa, você perde o segundo. A diferença entre uma conexão apertada e uma confortável costuma ser pequena no preço e enorme no risco. Atenção especial quando os trechos são de companhias sem acordo entre si: nesse caso a bagagem não segue sozinha, você precisa retirar e despachar de novo, e a companhia do segundo trecho não tem obrigação com o atraso do primeiro.'],
            ['Assento: o Que Muda de Verdade', 'Em voo noturno, janela permite encostar a cabeça e ninguém te acorda para passar. Em voo diurno e longo, corredor dá liberdade de levantar, o que importa mais do que parece em dez horas. Evite a última fileira, que costuma ter encosto limitado e fica ao lado do banheiro, e a fileira logo atrás de uma divisória, onde os berços são instalados. Fileira de saída de emergência tem mais espaço para as pernas, mas quase sempre o encosto não reclina e o apoio de braço é fixo.'],
            ['Jet Lag: o Que Funciona', 'O corpo se ajusta pela luz, não pelo sono. Chegando de manhã, pegue sol e resista ao cochilo longo: um descanso curto é suficiente, dormir à tarde atrasa o ajuste em dias. Chegando à noite, durma no horário local mesmo sem sono. Começar a ajustar o horário de dormir dois ou três dias antes do embarque reduz o estranhamento. Álcool a bordo parece ajudar a dormir e piora a qualidade do sono e a desidratação.'],
            ['A Bagagem de Mão Que Salva', 'Uma muda de roupa, medicação de uso contínuo, documentos e carregador vão com você, não na bagagem despachada. Essa é a diferença entre um extravio ser um transtorno e ser o fim do primeiro dia. Em roteiro com conexão apertada ou com troca de companhia, essa regra deixa de ser recomendação e vira necessidade.'],
            ['Chegada Também se Planeja', 'Transfer combinado antes, endereço salvo offline e primeira noite reservada perto do centro ou do aeroporto evitam decisão ruim num momento de cansaço. O dia da chegada não é dia de roteiro cheio: é dia de chegar, comer bem e dormir no horário certo.'],
        ],
    },
    {
        slug: 'blog-quando-algo-da-errado',
        titulo: 'Quando Algo Dá Errado: Voo Cancelado, Bagagem Extraviada e Seus Direitos',
        desc: 'O que fazer nas primeiras horas de um cancelamento ou extravio, e o que você pode exigir.',
        img: 'blog_melhor_epoca.webp',
        tag: 'Dicas para Viajantes',
        cat: 'viajantes',
        resumo: 'O que fazer nas primeiras horas de um cancelamento ou extravio, e o que você pode exigir.',
        lead: 'Toda viagem longa tem alguma chance de dar errado em algum ponto. A diferença entre transtorno e prejuízo está nas primeiras duas horas.',
        corpo: [
            [null, 'Ninguém planeja viagem contando com problema, mas quem sabe o que fazer resolve em minutos o que de outra forma custa dias e dinheiro.'],
            ['Voo Atrasado ou Cancelado no Brasil', 'A regra brasileira prevê assistência conforme o tempo de espera: a partir de uma hora, comunicação; a partir de duas, alimentação; a partir de quatro, hospedagem e transporte quando houver pernoite. Em cancelamento ou atraso longo, você pode escolher entre reacomodação em outro voo, inclusive de outra companhia, reembolso integral ou execução do serviço por outro meio de transporte. A escolha é sua, não da companhia.'],
            ['Voo Internacional Segue Outra Lógica', 'Em trechos internacionais vale a convenção internacional aplicável e, em alguns casos, a regra do país de origem do voo, que pode ser mais favorável que a brasileira. O ponto prático é o mesmo: registre tudo. Peça o motivo do atraso por escrito, guarde cartão de embarque, comprovantes de gastos e prints dos avisos. Sem documentação, qualquer pedido posterior vira palavra contra palavra.'],
            ['Bagagem Extraviada: as Primeiras Duas Horas', 'Registre a ocorrência antes de sair da área de desembarque. O protocolo emitido ali é o documento que sustenta tudo depois, e conseguir abrir o registro remotamente é bem mais difícil. A companhia tem prazo para localizar e devolver a bagagem, e nesse intervalo você tem direito a ressarcimento de itens de primeira necessidade. Guarde as notas. Passado o prazo sem devolução, a bagagem é considerada extraviada em definitivo e entra em indenização.'],
            ['O Que o Seguro Cobre e o Que Não Cobre', 'Seguro viagem costuma complementar o que a companhia paga, não substituir. Em geral há franquia de horas antes de acionar e limite por item, com valores baixos para eletrônicos. Ler a apólice antes de precisar é o que separa quem recebe de quem descobre a cláusula no pior momento.'],
            ['Por Que Ter Alguém do Seu Lado Muda o Jogo', 'Resolver reacomodação em outro fuso, em outra língua, com fila no balcão e celular acabando é onde a maior parte das pessoas aceita a primeira proposta ruim que aparece. Ter quem acompanhe a viagem e assuma essa conversa é exatamente o que a gente faz enquanto você está fora.'],
        ],
    },
    {
        slug: 'blog-viajar-com-criancas-pequenas',
        titulo: 'Viajar com Crianças Pequenas: O Que Muda no Planejamento',
        desc: 'Ritmo, documentação, voo e hospedagem quando a viagem inclui quem tem menos de seis anos.',
        img: 'blog_chapada.webp',
        tag: 'Dicas para Viajantes',
        cat: 'viajantes',
        resumo: 'Ritmo, documentação, voo e hospedagem quando a viagem inclui quem tem menos de seis anos.',
        lead: 'Viajar com criança pequena não é a mesma viagem com uma pessoa a mais. É outra viagem, e tratar como a mesma é o erro que estraga o passeio.',
        corpo: [
            [null, 'A questão quase nunca é o destino. É o ritmo, a logística e as expectativas. Ajustados esses três, quase tudo fica possível.'],
            ['Menos Lugares, Mais Dias', 'O instinto é aproveitar ao máximo e encaixar três cidades. Com criança pequena, cada troca de hospedagem custa meio dia entre arrumar, deslocar e reinstalar, e esse meio dia costuma ser o pior do passeio para todo mundo. Ficar mais tempo em menos lugares não é abrir mão de ver coisas: é trocar deslocamento por experiência.'],
            ['O Dia Tem Uma Atividade Grande', 'Uma atração principal por dia, de preferência pela manhã, e o resto do dia aberto. Parque, praça e piscina do hotel não são tempo perdido: são o que permite que o museu da manhã seguinte funcione. Roteiro cheio com criança pequena não entrega mais, entrega menos, porque a terceira atração do dia já não é aproveitada por ninguém.'],
            ['Documentação Tem Regra Própria', 'Menor brasileiro saindo do país sem os dois responsáveis precisa de autorização formal de quem não vai, e isso é conferido no embarque. Criança também precisa de documento de identificação com foto. Em voo, bebê de colo normalmente não ocupa assento e paga taxa reduzida, mas precisa estar no bilhete desde a emissão: incluir depois nem sempre é possível no mesmo voo.'],
            ['Voo e Fuso', 'Voo noturno costuma funcionar melhor com criança pequena, porque coincide com o sono. Berço de bordo existe em parte das aeronaves, tem limite de peso e precisa ser solicitado com antecedência, com a fileira certa reservada. Para o fuso, o ajuste é mais lento que o do adulto: conte dois ou três dias de adaptação e não marque nada importante neles.'],
            ['Hospedagem: Cozinha Vale Mais que Vista', 'Apartamento com cozinha e máquina de lavar resolve mais problema do que um quarto com vista. Poder preparar uma refeição simples no horário da criança e lavar roupa no meio da viagem reduz o volume da mala e o número de refeições fora, que são justamente os dois pontos de atrito. Confirme antes se o berço é de verdade e se o elevador existe.'],
        ],
    },
];

// ---------- template ----------
const nav = `        <header class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="/" class="logo">Terra Venture</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/servicos">Serviços</a></li>
                    <li><a href="/melhor-epoca">Melhor Época</a></li>
                    <li><a href="/blog">Diário</a></li>
                    <li><a href="/historia">A Terra Venture</a></li>
                    <li><a href="https://wa.me/5551994596233?text=Olá! Gostaria de uma consultoria de viagem." class="btn-primary nav-btn" target="_blank">Conversar</a></li>
                </ul>
            </nav>
            <div class="menu-toggle" id="mobile-menu"><i class="fas fa-bars"></i></div>
        </div>
    </header>`;

// reaproveita o rodapé de um artigo existente, para não divergir
const modelo = fs.readFileSync(path.join(dir, 'blog-seguro-viagem.html'), 'utf8');
const rodape = modelo.slice(modelo.indexOf('    <footer class="footer">'), modelo.indexOf('</html>') + 7);
if (!rodape.includes('footer-grid')) { console.error('FALHA: nao consegui extrair o rodape'); process.exit(1); }

const pixel = modelo.slice(modelo.indexOf('    <!-- Meta Pixel Code -->'), modelo.indexOf('</head>'));

function artigo(a) {
    const url = base + '/' + a.slug;
    const corpo = a.corpo.map(([h, p]) => (h ? `                <h2>${h}</h2>\n` : '') + `                <p>${p}</p>`).join('\n');
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>if('IntersectionObserver'in window)document.documentElement.classList.add('js')</script>
    <title>${a.titulo} | Blog Terra Venture</title>
    <link rel="canonical" href="${url}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${a.titulo}",
      "description": "${a.desc}",
      "image": "${base}/${a.img}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },
      "author": { "@type": "Organization", "name": "Terra Venture Viagens", "url": "${base}/" },
      "publisher": {
        "@type": "TravelAgency",
        "name": "Terra Venture Viagens",
        "url": "${base}/",
        "logo": { "@type": "ImageObject", "url": "${base}/icon.webp" }
      },
      "inLanguage": "pt-BR",
      "datePublished": "${DATA_ISO}",
      "dateModified": "${DATA_ISO}"
    }
    </script>
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${a.titulo} | Blog Terra Venture">
    <meta property="og:description" content="${a.desc}">
    <meta property="og:image" content="${base}/og-image.jpg">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Terra Venture Viagens">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${a.titulo} | Blog Terra Venture">
    <meta name="twitter:description" content="${a.desc}">
    <meta name="twitter:image" content="${base}/og-image.jpg">
    <meta name="description" content="${a.desc}">
    <link rel="icon" type="image/webp" href="icon.webp">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="terra.css">
${pixel}</head>
<body class="subpage">
${nav}

    <section class="article-hero" style="background-image: url('${a.img}');">
        <div class="container article-hero-content">
            <span class="blog-tag">${a.tag}</span>
            <h1>${a.titulo}</h1>
            <div class="article-meta">
                <span><i class="far fa-calendar-alt"></i> ${DATA}</span>
            </div>
        </div>
    </section>

    <section class="article-body">
        <div class="container">
            <div class="blog-breadcrumb">
                <a href="/">Home</a> <i class="fas fa-chevron-right"></i> <a href="/blog">Blog</a>
            </div>
            <div class="article-content">
                <p class="lead-text">${a.lead}</p>
${corpo}
                <div class="article-cta" style="margin-top: 50px;">
                    <h3>Gostou das dicas? Fale com a Terra Venture.</h3>
                    <p>Nossos consultores desenham experiências de vida memoráveis em viagens de alto padrão elaboradas sob medida.</p>
                    <a href="/#contato" class="btn-primary btn-large">Comece seu roteiro agora</a>
                </div>
            </div>
        </div>
    </section>

${rodape}`;
}

let criados = 0;
for (const a of ARTIGOS) {
    const fp = path.join(dir, a.slug + '.html');
    fs.writeFileSync(fp, artigo(a), 'utf8');
    const s = fs.readFileSync(fp, 'utf8');
    try { JSON.parse(s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]); }
    catch (e) { console.error('FALHA: JSON-LD invalido em', a.slug, e.message); process.exit(1); }
    const d = (s.match(/<div\b/g) || []).length, dc = (s.match(/<\/div>/g) || []).length;
    if (d !== dc) { console.error('FALHA: divs desbalanceadas em', a.slug, d, dc); process.exit(1); }
    const palavras = s.slice(s.indexOf('article-content'), s.indexOf('article-cta')).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    console.log('  ' + a.slug.padEnd(36) + palavras + ' palavras');
    criados++;
}

// ---------- cartões no índice ----------
let blog = fs.readFileSync(path.join(dir, 'blog.html'), 'utf8');
const cartoes = ARTIGOS.filter(a => !blog.includes('/' + a.slug + '"')).map(a => `                <a href="/${a.slug}" class="blog-card" data-category="${a.cat}">
                    <div class="blog-card-img">
                        <img loading="lazy" decoding="async" src="${a.img}" alt="${a.titulo}">
                        <span class="blog-tag">${a.tag}</span>
                    </div>
                    <div class="blog-card-body">
                        <span class="blog-card-date"><i class="far fa-calendar-alt"></i> ${DATA}</span>
                        <h3>${a.titulo}</h3>
                        <p>${a.resumo}</p>
                        <span class="blog-read-more">Leia mais <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`).join('\n');

if (cartoes) {
    const marca = '<div class="blog-grid" id="blog-grid">';
    blog = blog.replace(marca, marca + '\n' + cartoes);
    fs.writeFileSync(path.join(dir, 'blog.html'), blog, 'utf8');
}
const total = (fs.readFileSync(path.join(dir, 'blog.html'), 'utf8').match(/class="blog-card/g) || []).length;
console.log('artigos criados:', criados, '| cartoes no indice agora:', total);
