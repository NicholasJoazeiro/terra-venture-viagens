// Fase 5: cruzeiros e saidas em grupo.
// A pagina /cruzeiros e montada a partir do esqueleto de servicos.html (head,
// navbar, rodape e scripts), para nao divergir das outras paginas.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const PORTAL_BRIEFING = '/#briefing';

/* =======================================================================
   1. pagina /cruzeiros
   ======================================================================= */
const base = l.ler('servicos.html');
const cr = l.crlf(base);

const iBody = base.indexOf('<body class="subpage">');
const iFooter = base.indexOf('    <footer class="footer">');
if (iBody === -1 || iFooter === -1) { console.error('FALHA: esqueleto de servicos.html'); process.exit(1); }

const cabeca = base.slice(0, iBody + '<body class="subpage">'.length);
const iNavFim = base.indexOf('</header>') + '</header>'.length;
const navbar = base.slice(iBody + '<body class="subpage">'.length, iNavFim);
const rodape = base.slice(iFooter);

let head = cabeca
    .split('Serviços | Consultoria de Viagem Sob Medida | Terra Venture').join('Cruzeiros | Terra Venture Viagens')
    .split('https://terraventureviagens.com.br/servicos').join('https://terraventureviagens.com.br/cruzeiros');
// descricao propria
head = head.replace(/<meta name="description" content="[^"]*">/,
    '<meta name="description" content="Cruzeiros com consultoria da Terra Venture: escolha de navio e cabine, voos, pré e pós-cruzeiro, seguro, transfer e acompanhamento durante a viagem.">');
head = head.replace(/content="[^"]*"(\s*>\s*<meta property="og:image")/, (m) => m);
head = head.replace(/(og:description" content=")[^"]*"/, '$1Cruzeiros com consultoria da Terra Venture: navio, cabine, voos, pré e pós-cruzeiro, seguro e acompanhamento."');
head = head.replace(/(twitter:description" content=")[^"]*"/, '$1Cruzeiros com consultoria da Terra Venture: navio, cabine, voos, pré e pós-cruzeiro, seguro e acompanhamento."');

const CORPO = `

    <section class="page-hero">
        <!-- TODO(nicholas): trocar por uma foto de navio de verdade, de preferencia
             de um embarque que voce atendeu. Esta e uma foto da costa de Positano,
             que e parada de roteiro no Mediterraneo, nao um navio. -->
        <div class="page-hero-bg"><img width="1200" height="674" src="costa-amalfitana-positano-aerea.webp" alt="Positano vista do mar, com as casas coloridas subindo a encosta e barcos ancorados na enseada" loading="eager" fetchpriority="high" decoding="async"></div>
        <div class="container">
            <h1>Cruzeiros</h1>
            <p>Navio, cabine, voo, documento e o que fazer em cada parada. A gente resolve a viagem inteira em volta do cruzeiro, não só a reserva dele.</p>
        </div>
    </section>

    <section class="serv-intro">
        <div class="container">
            <p>Cruzeiro parece a viagem mais simples de comprar e é das mais fáceis de errar. A diferença entre uma cabine e a cabine ao lado muda a viagem inteira, o voo errado faz você perder o embarque, e metade do que as pessoas acham que está incluído não está. É aí que a consultoria entra.</p>
        </div>
    </section>

    <section class="cruz-quando">
        <div class="container">
            <h2 class="section-title">Quando e de onde</h2>
            <div class="cruz-temporadas">
                <article class="cruz-temporada">
                    <h3>Costa brasileira</h3>
                    <p>A temporada vai, em geral, de novembro a abril. É quando os navios ficam baseados no Brasil e você embarca sem voo internacional.</p>
                    <!-- TODO(nicholas): confirmar os portos de embarque que voce atende -->
                    <p class="cruz-todo">Portos de embarque: [__]</p>
                </article>
                <article class="cruz-temporada">
                    <h3>Mediterrâneo</h3>
                    <p>Roteiros entre Itália, Grécia, Espanha e França, com parada em cidade histórica quase todo dia.</p>
                    <!-- TODO(nicholas): confirmar meses e portos de embarque -->
                    <p class="cruz-todo">Meses: [__] &middot; Portos: [__]</p>
                </article>
                <article class="cruz-temporada">
                    <h3>Caribe</h3>
                    <p>Ilhas, praia e mar calmo. É o destino mais procurado por quem está fazendo o primeiro cruzeiro.</p>
                    <!-- TODO(nicholas): confirmar meses e portos de embarque -->
                    <p class="cruz-todo">Meses: [__] &middot; Portos: [__]</p>
                </article>
            </div>
        </div>
    </section>

    <section class="cruz-resolve">
        <div class="container">
            <h2 class="section-title">O que a consultoria resolve</h2>
            <ul class="cruz-lista">
                <li><strong>Escolha do navio</strong>Navio de família e navio de casal sem criança são viagens diferentes. A gente pergunta quem vai antes de sugerir.</li>
                <li><strong>Escolha da cabine</strong>Interna, externa, varanda ou suíte, e em que deck. Posição no navio muda preço, ruído e balanço.</li>
                <li><strong>Voos</strong>Marcados com folga para o embarque. Chegar no mesmo dia do navio é o erro mais caro que existe em cruzeiro.</li>
                <li><strong>Pré e pós-cruzeiro</strong>Noites na cidade do porto antes e depois, para a viagem não começar e terminar dentro de um táxi.</li>
                <li><strong>Seguro</strong>Cotado e explicado, com o que cobre e o que não cobre dito em português.</li>
                <li><strong>Transfer</strong>De casa ao aeroporto, do aeroporto ao porto, e a volta inteira.</li>
                <li><strong>Acompanhamento</strong>Durante a viagem, no WhatsApp. Se algo mudar no roteiro, você fala com a gente.</li>
            </ul>
        </div>
    </section>

    <section class="cruz-roteiros">
        <div class="container">
            <h2 class="section-title">Exemplos de roteiro</h2>
            <p class="section-desc">Três roteiros que a gente monta com frequência, para você ter ideia de formato.</p>
            <!-- TODO(nicholas): me manda tres roteiros reais, com numero de noites,
                 portos e o que esta incluso. Nao inventei nenhum. -->
            <div class="cruz-roteiros-grid">
                <article class="cruz-roteiro"><h3>[Nome do roteiro]</h3><p>[__] noites &middot; [portos] &middot; a partir de [R$ ___]</p></article>
                <article class="cruz-roteiro"><h3>[Nome do roteiro]</h3><p>[__] noites &middot; [portos] &middot; a partir de [R$ ___]</p></article>
                <article class="cruz-roteiro"><h3>[Nome do roteiro]</h3><p>[__] noites &middot; [portos] &middot; a partir de [R$ ___]</p></article>
            </div>
        </div>
    </section>

    <section class="faq-section" id="faq">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Quem nunca fez cruzeiro pergunta isso</h2>
                <p class="section-desc">As respostas mudam de armador para armador. A gente confere a sua antes de você fechar.</p>
            </div>
            <div class="faq-grid">
                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">O que está incluído na passagem?</span><i class="fas fa-chevron-down"></i></button>
                    <div class="faq-content"><p>Em geral: a cabine, as refeições dos restaurantes principais, o entretenimento de bordo e o deslocamento entre os portos. Quase sempre fica de fora: bebida alcoólica, restaurante de especialidade, excursão em terra, internet, spa e a taxa de serviço. O que entra e o que não entra muda de armador para armador, e essa é uma das primeiras coisas que a gente confere com você.</p></div>
                </div>
                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">Como funcionam as gorjetas?</span><i class="fas fa-chevron-down"></i></button>
                    <div class="faq-content"><p>A maioria dos armadores cobra uma taxa de serviço por pessoa, por noite, que cai na conta de bordo e é paga no fim da viagem. O valor varia por armador e por categoria de cabine. Alguns deixam você pagar junto com a passagem, o que ajuda a não levar susto no desembarque. A gente te diz qual é o valor do seu antes de fechar.</p></div>
                </div>
                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">E as bebidas?</span><i class="fas fa-chevron-down"></i></button>
                    <div class="faq-content"><p>Água, café, chá e suco costumam estar inclusos nas refeições. Refrigerante, cerveja, vinho e destilado geralmente não. Quase todo armador vende pacote de bebidas por dia. Se compensa ou não depende de quanto vocês bebem, e essa conta a gente faz junto com você antes de comprar.</p></div>
                </div>
                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">E se eu enjoar?</span><i class="fas fa-chevron-down"></i></button>
                    <div class="faq-content"><p>Navio grande e moderno tem estabilizador e balança bem menos do que as pessoas imaginam, principalmente em roteiro de costa e no Caribe. Se você sabe que tende a enjoar, cabine no meio do navio e em deck mais baixo balança menos, e isso a gente leva em conta na hora de escolher. Sobre remédio, converse com o seu médico antes de embarcar.</p></div>
                </div>
                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">Que documento eu preciso levar?</span><i class="fas fa-chevron-down"></i></button>
                    <div class="faq-content"><p>Depende do roteiro. Cruzeiro só na costa brasileira costuma pedir documento de identidade com foto, dentro da validade. Roteiro que toca outro país pede passaporte e, em alguns casos, visto. Menor de idade viajando sem os dois pais precisa de autorização. A gente monta a lista do seu roteiro e confere com você antes da compra, não na véspera.</p></div>
                </div>
            </div>
        </div>
    </section>

    <!-- TODO(nicholas): quando houver depoimento de cliente que fez cruzeiro com a
         gente, cole aqui o bloco .depoimento-do-destino. Modelo em
         README-prova-social.md, item 4. -->

    <section class="serv-cta">
        <div class="container">
            <h2>Conta o básico e a gente volta com opções</h2>
            <p>Cinco perguntas rápidas. Dá para responder do celular, na fila do banco.</p>
            <a class="btn-primary btn-large" href="${PORTAL_BRIEFING}">Começar o briefing</a>
        </div>
    </section>

`;

const pagina = head + navbar + cr(CORPO) + rodape;
l.gravar('cruzeiros.html', pagina);
console.log('cruzeiros.html criado:', pagina.length, 'caracteres');

/* =======================================================================
   2. menu e rodape de todas as paginas
   ======================================================================= */
const ITEM_MENU = '<li><a href="/servicos">Serviços</a></li>';
const NOVO_MENU = ITEM_MENU + '\n                    <li><a href="/cruzeiros">Cruzeiros</a></li>';
const ITEM_RODAPE = '<li><a href="/servicos">Serviços</a></li>';
let menus = 0, rodapes = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let h = fs.readFileSync(fp, 'utf8');
    if (h.includes('/cruzeiros')) continue;
    const q = h.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const o = h;
    // menu: dentro de .nav-links
    const iNav = h.indexOf('class="nav-links"');
    if (iNav !== -1) {
        const fimNav = h.indexOf('</ul>', iNav);
        const trecho = h.slice(iNav, fimNav);
        if (trecho.includes(ITEM_MENU)) {
            h = h.slice(0, iNav) + trecho.replace(ITEM_MENU, NOVO_MENU.split('\n').join(q)) + h.slice(fimNav);
            menus++;
        }
    }
    // rodape
    const iRod = h.indexOf('footer-links');
    if (iRod !== -1) {
        const cabeca2 = h.slice(0, iRod), cauda = h.slice(iRod);
        if (cauda.includes(ITEM_RODAPE)) {
            h = cabeca2 + cauda.replace(ITEM_RODAPE,
                ITEM_RODAPE + q + '                    <li><a href="/cruzeiros">Cruzeiros</a></li>');
            rodapes++;
        }
    }
    if (h !== o) fs.writeFileSync(fp, h, 'utf8');
}
console.log('menus com Cruzeiros:', menus, '| rodapes:', rodapes);

/* =======================================================================
   3. FAQ da home: resposta sobre pacotes prontos
   ======================================================================= */
{
    let t = l.ler('index.html');
    const de = '<div class="faq-content"><p>Não. Só fazemos consultoria personalizada. Cada viagem é desenhada à mão, refletindo seus interesses, ritmo, orçamento e desejos. Por isso cada experiência Terra Venture é única.</p></div>';
    if (!t.includes(de)) { console.error('FALHA: resposta do FAQ nao encontrada'); process.exit(1); }
    t = t.replace(de, '<div class="faq-content"><p>Fazemos roteiros sob medida e também cruzeiros e saídas em grupo com data marcada. Em todos os casos, a gente cuida do planejamento e do suporte.</p></div>');
    l.gravar('index.html', t);
    console.log('FAQ sobre pacotes prontos corrigido');
}
