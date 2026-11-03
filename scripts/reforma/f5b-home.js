// Fase 5 (home): secao "Proximas saidas", linha de cruzeiros no dossie com o
// filtro correspondente, e o cartao de cruzeiros dentro de "O que a gente
// oferece".
//
// A linha de cruzeiros entra sem foto de proposito. Nao existe foto de navio
// no projeto, e por uma foto de banco de imagens generica nao vale a pena: o
// bloco tipografico e honesto e some quando chegar a foto de verdade.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);
const WA = 'https://wa.me/5551994596233?text=';

/* ---------- 1. chip de filtro + linha de cruzeiros ---------- */
{
    const de = `                    <button class="vibe-chip" data-vibe="romance" type="button">Romance</button>`;
    if (!t.includes(cr(de))) { console.error('FALHA: chips de vibe'); process.exit(1); }
    t = t.replace(cr(de), cr(de + `
                    <button class="vibe-chip" data-vibe="cruzeiros" type="button">Cruzeiros</button>`));

    const LINHA = `                <a class="dossie-row flip dossie-sem-foto" href="/cruzeiros" data-vibe="cruzeiros">
                    <!-- TODO(nicholas): quando houver foto de navio, trocar este bloco
                         pelo mesmo <figure class="dossie-media"> das outras linhas. -->
                    <div class="dossie-media dossie-media-vazia" aria-hidden="true">
                        <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 76 C 54 64, 104 88, 158 76 S 266 62, 314 74" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                            <path d="M6 92 C 60 82, 108 102, 160 92 S 264 80, 314 90" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
                            <path d="M6 106 C 66 98, 112 114, 162 106 S 262 96, 314 104" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.32"/>
                        </svg>
                    </div>
                    <div class="dossie-body">
                        <span class="dossie-regiao">Brasil, Mediterrâneo e Caribe</span>
                        <h3>Cruzeiros</h3>
                        <p class="dossie-line">A diferença entre uma cabine e a cabine ao lado muda a viagem inteira. É aí que a consultoria entra.</p>
                        <div class="dossie-meta">
                            <span>Vibe<b>Mar &amp; descanso</b></span>
                            <span>Melhor época<b>Nov a Abr no Brasil</b></span>
                            <span>Dias ideais<b>[__ dias]</b></span>
                            <span>A partir de<b>[R$ ___]</b></span>
                        </div>
                        <span class="dossie-link">Ver a página de cruzeiros <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`;
    const ANCORA = `            </div>
            <div class="de-cta">`;
    if (!t.includes(cr(ANCORA))) { console.error('FALHA: fim da lista de dossies'); process.exit(1); }
    t = t.replace(cr(ANCORA), cr(LINHA + `
            </div>
            <div class="de-cta">`));
}

/* ---------- 2. Proximas saidas ---------- */
const msgTulipas = encodeURIComponent('Olá! Quero saber mais sobre a saída em grupo Rota das Tulipas e Canais, de Porto Alegre, em abril de 2027.');
const msgCataratas = encodeURIComponent('Olá! Quero saber mais sobre a saída em grupo Rota das Cataratas, para Foz do Iguaçu e Puerto Iguazú.');

const SAIDAS = `    <section class="saidas" id="proximas-saidas">
        <div class="container">
            <div class="saidas-intro">
                <h2 class="section-title">Próximas saídas em grupo</h2>
                <p class="section-desc">Data marcada, grupo pequeno e a gente junto desde o aeroporto. Quem prefere não planejar sozinho começa por aqui.</p>
            </div>
            <!-- TODO(nicholas): para cada saída, faltam valor, datas exatas, o que
                 está incluso e uma foto. Os marcadores entre colchetes ficam à
                 vista de propósito, para ninguém publicar com eles. -->
            <div class="saidas-grid">
                <article class="saida-card">
                    <div class="saida-selo">Abril de 2027</div>
                    <h3>Rota das Tulipas e Canais</h3>
                    <p class="saida-destinos">Amsterdã, Bruges e Paris</p>
                    <p class="saida-texto">Saída de Porto Alegre na época das tulipas, com os canais de Bruges no meio do caminho e Paris no fim.</p>
                    <dl class="saida-dados">
                        <dt>Datas exatas</dt><dd>[__ a __ de abril de 2027]</dd>
                        <dt>Duração</dt><dd>[__ dias]</dd>
                        <dt>Investimento</dt><dd>[a partir de R$ ___ por pessoa]</dd>
                        <dt>Incluso</dt><dd>[__]</dd>
                    </dl>
                    <a class="btn-outline" href="${WA}${msgTulipas}" target="_blank" rel="noopener">Quero saber mais</a>
                </article>
                <article class="saida-card">
                    <div class="saida-selo">Dezembro e janeiro</div>
                    <h3>Rota das Cataratas</h3>
                    <p class="saida-destinos">Foz do Iguaçu e Puerto Iguazú</p>
                    <p class="saida-texto">Cerca de cinco dias para ver as cataratas dos dois lados, o brasileiro e o argentino, sem correria entre um e outro.</p>
                    <dl class="saida-dados">
                        <dt>Datas exatas</dt><dd>[__]</dd>
                        <dt>Duração</dt><dd>cerca de 5 dias</dd>
                        <dt>Investimento</dt><dd>[a partir de R$ ___ por pessoa]</dd>
                        <dt>Incluso</dt><dd>[__]</dd>
                    </dl>
                    <a class="btn-outline" href="${WA}${msgCataratas}" target="_blank" rel="noopener">Quero saber mais</a>
                </article>
            </div>
        </div>
    </section>

`;
{
    const s = l.secao(t, 'destinos-editorial');
    if (!s) { console.error('FALHA: destinos'); process.exit(1); }
    let p = s.fim;
    while (t[p] === '\r' || t[p] === '\n') p++;
    t = t.slice(0, p) + cr(SAIDAS) + t.slice(p);
}

/* ---------- 3. cartao de cruzeiros em "O que a gente oferece" ---------- */
{
    const ANCORA = `            <div class="incl-cta">`;
    if (!t.includes(cr(ANCORA))) { console.error('FALHA: cta dos diferenciais'); process.exit(1); }
    const CARTAO = `            <a class="cartao-cruzeiros" href="/cruzeiros">
                <div>
                    <h3>Cruzeiros</h3>
                    <p>Escolha de navio e cabine, voos com folga para o embarque, noites antes e depois no porto, seguro e transfer. A reserva do navio é a parte menor.</p>
                </div>
                <span class="cartao-cruzeiros-link">Ver a página de cruzeiros</span>
            </a>
`;
    t = t.replace(cr(ANCORA), cr(CARTAO + ANCORA));
}

l.gravar('index.html', t);
console.log('chips de vibe:', (t.match(/vibe-chip/g) || []).length);
console.log('linhas de dossie:', (t.match(/class="dossie-row/g) || []).length);
console.log('saidas:', (t.match(/class="saida-card"/g) || []).length);
console.log('ordem:', [...t.matchAll(/<section class="([a-z-]+)/g)].map(x => x[1]).join(' > '));
l.conferir('index.html');
