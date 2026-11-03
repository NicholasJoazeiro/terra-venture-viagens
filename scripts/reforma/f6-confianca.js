// Fase 6: confianca e coerencia.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* =======================================================================
   1. rotulo unico para a pagina da agencia
   ======================================================================= */
{
    let t = l.ler('index.html');
    const de = '<li><a href="#quem-somos">A Agência</a></li>';
    if (!t.includes(de)) { console.error('FALHA: rotulo do rodape'); process.exit(1); }
    // o resto do site ja usa "A Terra Venture" apontando para /historia
    t = t.replace(de, '<li><a href="/historia">A Terra Venture</a></li>');
    l.gravar('index.html', t);
    console.log('rodape da home alinhado com as outras 75 paginas');
}

/* =======================================================================
   2. bloco de confianca
   ======================================================================= */
// "Mostre so o que estiver preenchido": o que nao existe fica comentado, nao
// vira marcador. Marcador no rodape de 76 paginas e pior do que linha nenhuma.
const BLOCO_CONFIANCA = `                <div class="footer-confianca">
                    <h4>A empresa</h4>
                    <ul>
                        <li><span>Sede</span> Ivoti, RS, no Vale dos Sinos</li>
                        <!-- TODO(nicholas): descomente cada linha abaixo assim que
                             tiver o dado. Deixei comentado de proposito: marcador
                             no rodape de 76 paginas pega pior do que linha nenhuma.
                        <li><span>Cadastur</span> [numero]</li>
                        <li><span>CNPJ</span> [numero]</li>
                        <li><span>Atuacao</span> desde novembro de 2025</li>
                        <li><span>Parcerias</span> [operadoras e representacoes]</li>
                        -->
                    </ul>
                </div>
`;

let rodapes = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let h = fs.readFileSync(fp, 'utf8');
    if (h.includes('footer-confianca')) continue;
    const q = h.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    // entra como ultima coluna do rodape, antes do fechamento do footer-grid
    const i = h.indexOf('class="container footer-grid"');
    if (i === -1) continue;
    const fim = l.bloco(h, h.lastIndexOf('<div', i), 'div');
    if (fim === -1) continue;
    const iFechaDiv = h.lastIndexOf('</div>', fim);
    h = h.slice(0, iFechaDiv) + BLOCO_CONFIANCA.split('\n').join(q) + h.slice(iFechaDiv);
    fs.writeFileSync(fp, h, 'utf8');
    rodapes++;
}
console.log('rodapes com bloco de confianca:', rodapes);

/* =======================================================================
   3. FAQ: como a Terra Venture e remunerada
   ======================================================================= */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    const ANCORA = `                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">Vocês vendem pacotes prontos?</span>`;
    if (!t.includes(cr(ANCORA))) { console.error('FALHA: ancora do FAQ'); process.exit(1); }
    const NOVA = `                <div class="faq-item">
                    <button class="faq-button"><span class="faq-title">Como a Terra Venture é remunerada?</span><i class="fas fa-chevron-down"></i></button>
                    <!-- TODO(nicholas): escreva aqui, com suas palavras, como voce
                         cobra. Comissao das operadoras? Taxa de consultoria? Os
                         dois? Esta e a pergunta que mais trava fechamento e a
                         unica resposta deste site que eu nao posso escrever por
                         voce, porque so voce sabe a resposta. -->
                    <div class="faq-content"><p>[__]</p></div>
                </div>
`;
    t = t.replace(cr(ANCORA), cr(NOVA) + cr(ANCORA));
    l.gravar('index.html', t);
    console.log('pergunta sobre remuneracao adicionada ao FAQ');
}

/* =======================================================================
   4. "a partir de" nos cards da pagina de destinos
   ======================================================================= */
{
    let d = l.ler('destinos.html');
    const antes = (d.match(/dest-preco/g) || []).length;
    if (antes === 0) {
        const q = d.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
        // TODO(nicholas): os valores entram aqui, um por destino
        d = d.replace(/(<p class="dest-desc">[^<]*<\/p>)/g,
            '$1' + q + '                        <p class="dest-preco">a partir de [R$ ___]</p>');
        l.gravar('destinos.html', d);
    }
    console.log('cards de destino com "a partir de":', (l.ler('destinos.html').match(/dest-preco/g) || []).length);
}

/* =======================================================================
   5. "Quem cuida da sua viagem": espaco para foto em viagem e video
   ======================================================================= */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    const DE = `                <div class="quem-somos-img">
                    <img width="800" height="800" loading="lazy" decoding="async" src="nicholas-e-giovana-fundadores-terra-venture.webp" alt="Nicholas Joazeiro e Giovana Konrath, fundadores da Terra Venture">
                </div>`;
    if (!t.includes(cr(DE))) { console.error('FALHA: foto dos fundadores'); process.exit(1); }
    const PARA = `                <div class="quem-somos-img">
                    <img width="800" height="800" loading="lazy" decoding="async" src="nicholas-e-giovana-fundadores-terra-venture.webp" alt="Nicholas Joazeiro e Giovana Konrath, fundadores da Terra Venture">
                    <!-- TODO(nicholas): uma foto de voces dois VIAJANDO vale mais do
                         que a foto posada. Salve como
                         nicholas-e-giovana-em-viagem.webp (800x1000 serve) e
                         descomente o bloco abaixo.
                    <img class="quem-somos-img-viagem" width="800" height="1000" loading="lazy" decoding="async"
                         src="nicholas-e-giovana-em-viagem.webp"
                         alt="Nicholas e Giovana em viagem, [descreva o lugar]">
                    -->
                    <!-- TODO(nicholas): video curto de voces se apresentando, ate 40
                         segundos, vertical. Precisa do poster, senao o navegador
                         baixa parte do video so para mostrar o primeiro quadro.
                    <video class="quem-somos-video" controls preload="none" width="800" height="1000"
                           poster="nicholas-e-giovana-video-poster.webp">
                        <source src="nicholas-e-giovana.mp4" type="video/mp4">
                        Seu navegador não abre vídeo. <a href="nicholas-e-giovana.mp4">Baixe o arquivo</a>.
                    </video>
                    -->
                </div>`;
    t = t.replace(cr(DE), cr(PARA));
    l.gravar('index.html', t);
    console.log('espaco para foto em viagem e video marcado em "Quem cuida"');
}

/* =======================================================================
   6. ordem dos destinos em destaque
   ======================================================================= */
// Primeiro os que tem prova nos depoimentos. Dos cinco pedidos, so Paris e
// Italia tem pagina no site: Rio de Janeiro, Bonito e Buenos Aires nao tem
// pagina nem foto de destino, so foto de cliente. Isso vai para a lista final.
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    const iLista = t.indexOf('<div class="dossie-list">');
    if (iLista === -1) { console.error('FALHA: lista de dossies'); process.exit(1); }
    const fimLista = l.bloco(t, iLista, 'div');
    const lista = t.slice(iLista, fimLista);

    const linhas = [];
    let i = lista.indexOf('<a class="dossie-row');
    while (i !== -1) {
        const fim = l.bloco(lista, i, 'a');
        if (fim === -1) break;
        const iniLinha = lista.lastIndexOf('\n', i) + 1;
        linhas.push(lista.slice(iniLinha, fim));
        i = lista.indexOf('<a class="dossie-row', fim);
    }
    if (linhas.length !== 5) { console.error('FALHA: esperava 5 linhas, achei', linhas.length); process.exit(1); }

    const nome = h => (h.match(/<h3>([^<]*)<\/h3>/) || [])[1];
    const ordem = ['Paris Secreta', 'Patagônia', 'Santiago', 'Japão Clássico', 'Cruzeiros'];
    const ordenadas = ordem.map(n => {
        const achou = linhas.find(x => nome(x) === n);
        if (!achou) { console.error('FALHA: nao achei a linha', n); process.exit(1); }
        return achou;
    });

    // alterna o lado da foto de novo, agora na ordem nova
    const q = l.quebra(t);
    const corpo = ordenadas.map((h, k) => {
        let novo = h.replace(/class="dossie-row( flip)?( dossie-sem-foto)?"/,
            'class="dossie-row' + (k % 2 ? ' flip' : '') + (/dossie-sem-foto/.test(h) ? ' dossie-sem-foto' : '') + '"');
        return novo;
    }).join(q);

    const TODO = `                <!-- TODO(nicholas): Rio de Janeiro, Bonito e Buenos Aires tem
                     depoimento de cliente mas nao tem pagina de destino nem foto do
                     lugar, so foto de cliente. Enquanto nao tiverem, nao da para
                     coloca-los aqui na frente. Vale criar as tres paginas. -->
`;
    t = t.slice(0, iLista) + '<div class="dossie-list">' + q + cr(TODO) + corpo + q + '            ' + t.slice(fimLista - '</div>'.length);
    l.gravar('index.html', t);
    console.log('ordem dos destinos:', [...l.ler('index.html').matchAll(/<h3>([^<]*)<\/h3>/g)].map(x => x[1]).slice(0, 5).join(' > '));
}

l.conferir('index.html');
l.conferir('destinos.html');
