// Pagina de conversao: /contato
//
// O site nao tinha uma pagina cujo unico trabalho fosse converter. O briefing
// morava dentro da home, no meio de doze secoes. Esta pagina tem uma meta so.
//
// O briefing e as respostas do FAQ sao EXTRAIDOS da home, nao redigitados:
// assim nao existem duas versoes do mesmo texto para sair de sincronia.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const home = l.ler('index.html');
const base = l.ler('servicos.html');
const cr = l.crlf(base);

/* ---------- esqueleto: head, navbar e rodape de uma pagina existente ---------- */
const iBody = base.indexOf('<body class="subpage">');
const iNavFim = base.indexOf('</header>') + '</header>'.length;
const iFooter = base.indexOf('    <footer class="footer">');
if (iBody === -1 || iFooter === -1) { console.error('FALHA: esqueleto'); process.exit(1); }

let head = base.slice(0, iBody + '<body class="subpage">'.length);
const navbar = base.slice(iBody + '<body class="subpage">'.length, iNavFim);
const rodape = base.slice(iFooter);

const TITULO = 'Fale com a Terra Venture | Consultoria de Viagem Sob Medida';
const DESC = 'Conte a sua ideia de viagem e a gente volta com um roteiro. Sem custo e sem compromisso. Consultoria de Ivoti, RS, para clientes do Brasil inteiro.';
head = head
    .split('Serviços | Consultoria de Viagem Sob Medida | Terra Venture').join(TITULO)
    .split('https://terraventureviagens.com.br/servicos').join('https://terraventureviagens.com.br/contato');
head = head.replace(/<meta name="description"[\s\S]{0,400}?>/, '<meta name="description" content="' + DESC + '">');
head = head.replace(/(og:description" content=")[^"]*"/, '$1' + DESC + '"');
head = head.replace(/(twitter:description" content=")[^"]*"/, '$1' + DESC + '"');
head = head.replace(/(og:title" content=")[^"]*"/, '$1' + TITULO + '"');
head = head.replace(/(twitter:title" content=")[^"]*"/, '$1' + TITULO + '"');
// o preload da abertura de servicos nao serve aqui
head = head.replace(/\s*<link rel="preload" as="image"[^>]*>/g, '');

/* ---------- briefing extraido da home ---------- */
const iB = home.indexOf('<form class="briefing-caixa"');
const fB = home.indexOf('</form>', iB) + '</form>'.length;
if (iB === -1 || fB < iB) { console.error('FALHA: briefing na home'); process.exit(1); }
const briefing = home.slice(home.lastIndexOf('\n', iB) + 1, fB);

/* ---------- quatro perguntas do FAQ, com a resposta que ja esta no ar ---------- */
// as perguntas tem espaco inquebravel desde o passo das viuvas, entao a
// busca normaliza antes de comparar
const QUERO = ['Quanto custa uma consultoria', 'souber para onde ir',
    'vendem pacotes prontos', 'próximo passo'];
const homePlano = home.replace(/ /g, ' ');
const faqs = [];
for (const q of QUERO) {
    const i = homePlano.indexOf(q);
    if (i === -1) { console.error('FALHA: pergunta nao encontrada:', q); process.exit(1); }
    const ini = home.lastIndexOf('<div class="faq-item">', i);
    const fim = l.bloco(home, ini, 'div');
    faqs.push(home.slice(home.lastIndexOf('\n', ini) + 1, fim).trim());
}

const WA = 'https://wa.me/5551994596233?text=' +
    encodeURIComponent('Olá, Nicholas e Giovana! Quero contar a minha ideia de viagem.');

const CORPO = `

    <section class="conversao-hero">
        <div class="container conversao-hero-grid">
            <div class="conversao-hero-texto">
                <h1>Conte a sua ideia. A gente volta com um roteiro.</h1>
                <p>Sem custo e sem compromisso na primeira conversa. Você fala com o Nicholas e a Giovana, não com um atendimento.</p>
                <div class="conversao-cta">
                    <a class="btn-primary btn-large" href="${WA}" target="_blank" rel="noopener">Falar no WhatsApp agora</a>
                    <a class="link-plain" href="#briefing">Prefiro responder cinco perguntas</a>
                </div>
            </div>
            <figure class="conversao-hero-foto">
                <img width="800" height="800" src="nicholas-e-giovana-fundadores-terra-venture.webp" alt="Nicholas Joazeiro e Giovana Konrath, fundadores da Terra Venture" loading="eager" fetchpriority="high" decoding="async">
                <figcaption>Nicholas e Giovana, Terra Venture</figcaption>
            </figure>
        </div>
    </section>

    <section class="faixa-prova" aria-label="Credenciais da Terra Venture">
        <div class="container faixa-prova-grid">
            <!-- TODO(nicholas): numero de avaliacoes do Google, quando tiver -->
            <a class="prova-item" href="https://maps.app.goo.gl/fRx9mZDwVB4Kp1466" target="_blank" rel="noopener">
                <strong>5,0 no Google</strong>
                <span>Ver as avaliações da agência</span>
            </a>
            <a class="prova-item" href="https://cadastur.turismo.gov.br/cadastur/#!/public/qrcode/63865418000181" target="_blank" rel="noopener">
                <strong>Cadastrada no Cadastur</strong>
                <span>Agência de turismo registrada no Ministério do Turismo</span>
            </a>
            <div class="prova-item prova-item-estatico">
                <strong>Desde novembro de 2025</strong>
                <span>Consultoria de Ivoti, RS, para clientes do Brasil inteiro</span>
            </div>
        </div>
    </section>

    <section class="conversao-passos">
        <div class="container">
            <h2 class="section-title">O que acontece depois que você chama</h2>
            <ol class="conversao-lista">
                <li><span class="passo-num">01</span>
                    <h3>A gente responde no mesmo dia útil</h3>
                    <p>Primeiro vêm perguntas, não proposta: quem viaja, quando, quantos dias e quanto você quer gastar.</p>
                </li>
                <li><span class="passo-num">02</span>
                    <h3>Volta um roteiro para você ajustar</h3>
                    <p>Hospedagem, deslocamentos e horários, escritos para a sua viagem. Você pede mudança quantas vezes precisar.</p>
                </li>
                <li><span class="passo-num">03</span>
                    <h3>Você viaja e a gente fica por perto</h3>
                    <p>Reservas feitas, documentos conferidos, seguro contratado. Durante a viagem a gente responde no WhatsApp.</p>
                </li>
            </ol>
        </div>
    </section>

    <section class="briefing" id="briefing">
        <div class="container">
            <div class="briefing-intro">
                <h2 class="section-title">Conte o básico em 30 segundos</h2>
                <p class="section-desc">Cinco perguntas. No fim abre o WhatsApp com as respostas já escritas e você só aperta enviar.</p>
            </div>

${briefing}

            <noscript>
                <p class="briefing-alternativa">
                    O briefing precisa de JavaScript para funcionar. <a href="${WA}" target="_blank" rel="noopener">Fale direto no WhatsApp</a>.
                </p>
            </noscript>
            <p class="briefing-alternativa">
                Prefere escrever com calma? <a href="/#contato">Use o formulário da home</a>. Prefere falar agora? <a href="${WA}" target="_blank" rel="noopener">Chame no WhatsApp</a>.
            </p>
        </div>
    </section>

    <section class="faq-section" id="faq">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Antes de chamar</h2>
                <p class="section-desc">As quatro perguntas que mais aparecem na primeira conversa.</p>
            </div>
            <div class="faq-grid">
${faqs.map(f => '                ' + f).join('\n')}
            </div>
        </div>
    </section>

    <section class="serv-cta">
        <div class="container">
            <h2>Toda viagem começa com uma mensagem</h2>
            <p>Mesmo que ainda seja uma vontade vaga, sem data e sem destino. É daí que a gente parte.</p>
            <a class="btn-primary btn-large" href="${WA}" target="_blank" rel="noopener">Falar no WhatsApp agora</a>
        </div>
    </section>

`;

l.gravar('contato.html', head + navbar + cr(CORPO) + rodape);
console.log('contato.html criado');

/* ---------- link no rodape de todas as paginas ---------- */
{
    const ITEM = '<li><a href="/servicos">Serviços</a></li>';
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let h = fs.readFileSync(fp, 'utf8');
        if (h.includes('/contato')) continue;
        const q = h.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
        const iRod = h.indexOf('footer-links');
        if (iRod === -1) continue;
        const cab = h.slice(0, iRod), cauda = h.slice(iRod);
        if (!cauda.includes(ITEM)) continue;
        h = cab + cauda.replace(ITEM,
            '<li><a href="/contato">Fale com a gente</a></li>' + q + '                    ' + ITEM);
        fs.writeFileSync(fp, h, 'utf8');
        n++;
    }
    console.log('rodapes com o link da pagina de conversao:', n);
}

l.conferir('contato.html');
