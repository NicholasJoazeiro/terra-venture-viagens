// Fase 2 (HTML da home): tira a cara de pagina gerada.
// - a faixa de uma linha abaixo do hero sai: era enfeite, nao informacao
// - "O Processo" vira bloco editorial, alinhado a esquerda, numeros grandes,
//   sem circulos e com alturas diferentes
// - cards de destino perdem "Intensidade" e ganham dias e preco como marcador
// - "O que a gente oferece" troca quatro listas de check por tres diferenciais,
//   cada um com uma prova dita por um cliente
// - uma faixa de foto em tela cheia quebra o ritmo entre secoes de texto
// - as etiquetas em caixa-alta caem de 14 para 2 na pagina
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);
const antes = t;

/* ---------- 1. fora a faixa de uma linha ---------- */
t = l.removerSecao(t, 'diferencial-banner');

/* ---------- 2. O Processo, em formato editorial ---------- */
const PROCESSO = `    <section class="processo" id="como-funciona">
        <div class="container">
            <div class="rota" aria-hidden="true">
                <svg viewBox="0 0 320 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 40 C 62 6, 118 50, 174 22 S 268 8, 316 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1 7"/>
                    <circle cx="4" cy="40" r="3.2" fill="currentColor"/>
                    <circle cx="316" cy="18" r="3.2" fill="currentColor"/>
                </svg>
            </div>
            <div class="processo-intro">
                <h2 class="section-title">Como a gente trabalha</h2>
                <p class="section-desc">Da primeira mensagem no WhatsApp até o dia em que você desfaz a mala em casa.</p>
            </div>
            <!-- TODO(nicholas): cada passo ganharia muito com uma prova visual: um
                 trecho de roteiro de verdade, o print de um dia do itinerário ou uma
                 foto de bastidor. Me manda e eu troco o texto pela imagem. -->
            <ol class="processo-lista">
                <li class="processo-passo">
                    <span class="passo-num">01</span>
                    <h3>Você conta o que quer</h3>
                    <p>Uma conversa no WhatsApp, sem custo e sem compromisso. Quem viaja, quando, quantos dias e quanto você quer gastar.</p>
                </li>
                <li class="processo-passo">
                    <span class="passo-num">02</span>
                    <h3>A gente monta e você ajusta</h3>
                    <p>Volta para você um roteiro com hospedagem, deslocamentos e horários. Você pede mudança quantas vezes precisar, até ficar do seu jeito.</p>
                </li>
                <li class="processo-passo">
                    <span class="passo-num">03</span>
                    <h3>Você viaja e a gente fica por perto</h3>
                    <p>Reservas feitas, documentos conferidos, seguro contratado. Durante a viagem a gente responde no WhatsApp e faz check-in quando você precisa.</p>
                </li>
            </ol>
        </div>
    </section>`;
t = l.trocarSecao(t, 'como-funciona', PROCESSO);

/* ---------- 3. cabecalho e cards dos destinos ---------- */
t = t.replace(cr(`                <div>
                    <span class="eyebrow">Curadoria Terra Venture</span>
                    <h2 class="de-title">Alguns lugares que<br>desenhamos pra viver.</h2>
                </div>`), cr(`                <div>
                    <h2 class="de-title">Quatro destinos com dossiê pronto</h2>
                    <p class="de-sub">Cada um tem página própria, com melhor época, o que ver e quanto tempo faz sentido ficar.</p>
                </div>`));

// "Intensidade" sai; entram dias e preco como marcador visivel
let trocasMeta = 0;
t = t.replace(/\s*<span>Intensidade<b>\d+ de 5<\/b><\/span>/g, () => {
    trocasMeta++;
    return '';
});
t = t.replace(/(<span>Melhor época<b>[^<]*<\/b><\/span>)/g,
    '$1\n                            <span>Dias ideais<b>[__ dias]</b></span>\n                            <span>A partir de<b>[R$ ___]</b></span>');

// a etiqueta de continente era mais uma caixa-alta; vira linha editorial
t = t.replace(/<span class="eyebrow">(América do Sul|Europa|Ásia)<\/span>/g,
    '<span class="dossie-regiao">$1</span>');

// legenda da foto: so onde o lugar e verificavel pelo proprio arquivo
t = t.replace(cr(`                    <div class="dossie-media"><img width="1200" height="800" decoding="async" loading="lazy" src="patagonia-torres-del-paine.webp" alt="Patagônia"></div>`),
    cr(`                    <figure class="dossie-media">
                        <img width="1200" height="800" decoding="async" loading="lazy" src="patagonia-torres-del-paine.webp" alt="As Torres del Paine recortadas contra o céu, no sul do Chile">
                        <figcaption class="dossie-legenda">Torres del Paine, Chile <!-- TODO(nicholas): ano da foto --></figcaption>
                    </figure>`));

/* ---------- 4. faixa de foto em tela cheia, para quebrar o ritmo ---------- */
const FAIXA = `    <section class="faixa-foto">
        <img width="1500" height="780" decoding="async" loading="lazy" src="historia-estrada-andes.webp" alt="Estrada de terra cortando um vale nos Andes, com a cordilheira ao fundo">
        <div class="faixa-foto-texto">
            <div class="container">
                <h2>Nenhum roteiro nosso sai de catálogo</h2>
                <p>Cada viagem começa numa conversa sobre quem vai, quando e quanto dá para gastar. O que sai dali não serve para mais ninguém.</p>
            </div>
        </div>
    </section>

`;

/* ---------- 5. tres diferenciais, cada um com uma prova de cliente ---------- */
const OFERECE = `    <section class="diferenciais" id="o-que-incluimos">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">O que a gente oferece</h2>
                <p class="section-desc">Nem tudo entra em toda viagem. Depende do que você contrata. Estes três aparecem em quase todas.</p>
            </div>
            <div class="diferenciais-grid">
                <article class="diferencial-card">
                    <h3>Suporte durante a viagem, não só antes</h3>
                    <p>A gente acompanha enquanto você está fora, responde no WhatsApp e faz check-in quando você precisa desse apoio.</p>
                    <blockquote class="prova">
                        <p>"Passando pra agradecer a organização da viagem, a hospedagem, os ingressos e o suporte quando ficamos sem o celular com o endereço do Airbnb."</p>
                        <cite>Márcia Reis, Itália</cite>
                    </blockquote>
                </article>
                <article class="diferencial-card">
                    <h3>A burocracia do aeroporto é com a gente</h3>
                    <p>Transfer executivo de casa ao aeroporto e de volta, mais orientação sobre o que fazer em cada balcão.</p>
                    <blockquote class="prova">
                        <p>"Recebemos auxílio do planejamento até a volta pra casa, dicas ótimas do que fazer e ajuda com toda a burocracia do aeroporto."</p>
                        <cite>Gabriel Dilly, Rio de Janeiro</cite>
                    </blockquote>
                </article>
                <article class="diferencial-card">
                    <h3>Seguro e documentos conferidos antes</h3>
                    <p>A gente cota o seguro, explica o que cada cobertura faz e confere passaporte, visto e vacina antes de você comprar passagem.</p>
                    <blockquote class="prova">
                        <p>"O processo pra contratar o seguro viagem foi fácil e rápido, tudo bem detalhado. Com certeza fez diferença viajar com mais segurança e suporte."</p>
                        <cite>Júlia e Manuela, Buenos Aires</cite>
                    </blockquote>
                </article>
            </div>
            <div class="incl-cta"><a class="link-plain" href="/servicos">Ver a lista completa de serviços</a></div>
        </div>
    </section>`;
t = l.trocarSecao(t, 'sectionenciais', OFERECE);

/* ---------- 6. a faixa de foto entra logo depois de "quem cuida" ---------- */
{
    const s = l.secao(t, 'quem-somos');
    if (!s) throw new Error('quem-somos nao encontrada');
    let p = s.fim;
    while (t[p] === '\r' || t[p] === '\n') p++;
    t = t.slice(0, p) + cr(FAIXA) + t.slice(p);
}

/* ---------- 7. cabecalhos restantes: sem etiqueta, sem frase feita ---------- */
const trocas = [
    // mapa
    [`                <span class="eyebrow">O mundo te espera</span>
                <h2 class="section-title">De onde virá sua próxima inspiração?</h2>
                <p class="section-desc">Passeie pelo mapa e espie os destinos que já desenhamos.</p>`,
     `                <h2 class="section-title">O mapa dos dossiês</h2>
                <p class="section-desc">Cada ponto é um destino com página própria aqui no site. Clique para abrir.</p>`],
    // depoimentos
    [`                <span class="eyebrow">Experiências reais</span>
                <h2 class="section-title">Quem viajou, conta.</h2>
                <p class="section-desc">Histórias de clientes que confiaram seus sonhos à nossa curadoria.</p>`,
     `                <h2 class="section-title">Quem viajou, conta</h2>
                <p class="section-desc">Mensagens que chegaram no WhatsApp depois da volta, publicadas com autorização.</p>`],
    // faq
    [`                <span class="eyebrow">Dúvidas?</span>
                <h2 class="section-title">Perguntas frequentes</h2>
                <p class="section-desc">As principais dúvidas sobre nossa consultoria.</p>`,
     `                <h2 class="section-title">Perguntas frequentes</h2>
                <p class="section-desc">O que as pessoas mais perguntam antes de fechar.</p>`],
    // quiz (a secao inteira sai na fase 4; por ora so a etiqueta)
    [`                <span class="eyebrow">Feito pra você</span>
`, ``],
    // contato
    [`                    <span class="eyebrow">Seu próximo capítulo</span>
`, ``],
    // comunidade: a etiqueta aqui e uma hashtag de verdade, fica
    // quem-somos: a etiqueta nomeia as pessoas da secao, fica

    // "colecionar memórias" era frase de efeito
    [`pra que sua única preocupação seja colecionar memórias.`,
     `pra que no dia você só precise acordar e ir.`],
    // rodape: "Do sonho ao retorno" e "a essência da aventura"
    [`                    <p>A essência da aventura com o conforto da exclusividade. Do sonho ao retorno.</p>`,
     `                    <p>Consultoria de viagem sob medida, cruzeiros e saídas em grupo.</p>`],
];
for (const [de, para] of trocas) {
    const d = cr(de), p = cr(para);
    if (!t.includes(d)) { console.error('FALHA na troca:', de.trim().slice(0, 60)); process.exit(1); }
    t = t.replace(d, p);
}

if (t === antes) { console.error('FALHA: nada mudou'); process.exit(1); }
l.gravar('index.html', t);

const eyebrows = (t.match(/class="eyebrow"/g) || []).length;
console.log('metas "Intensidade" removidas:', trocasMeta);
console.log('etiquetas em caixa-alta na home:', eyebrows, eyebrows <= 2 ? 'OK (limite 2)' : 'ACIMA DO LIMITE');
console.log('"desenhado/desenhada à mão":', (t.match(/desenhad[oa] à mão/g) || []).length, '(limite 2)');
console.log('rotas desenhadas:', (t.match(/class="rota"/g) || []).length, '(limite 3)');
l.conferir('index.html');
