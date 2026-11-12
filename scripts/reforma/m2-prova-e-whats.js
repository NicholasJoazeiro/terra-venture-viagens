// 1. A faixa abaixo do hero repetia tres clientes que ja aparecem inteiros na
//    secao de depoimentos. Vira prova de outra natureza: nota do Google,
//    Cadastur e o primeiro ano da agencia. Nenhum numero de vendas.
// 2. Regra unica para a mensagem do WhatsApp: saudacao fixa + contexto da
//    pagina. Hoje 152 dos 233 links nao levam mensagem nenhuma.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

const MAPS = 'https://maps.app.goo.gl/fRx9mZDwVB4Kp1466';

/* =======================================================================
   1. faixa de prova
   ======================================================================= */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);
    const FAIXA = `    <section class="faixa-prova" aria-label="Credenciais da Terra Venture">
        <div class="container faixa-prova-grid">
            <!-- TODO(nicholas): quando tiver o numero de avaliacoes do Google na
                 data da publicacao, acrescente aqui, por exemplo
                 "em 12 avaliações". Deixei de fora porque nao invento numero. -->
            <a class="prova-item" href="${MAPS}" target="_blank" rel="noopener">
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
    </section>`;
    t = l.trocarSecao(t, 'faixa-prova', FAIXA);
    l.gravar('index.html', t);
    const nomes = {};
    for (const m of l.ler('index.html').replace(/<!--[\s\S]*?-->/g, '')
        .matchAll(/class="(author-name|depo-nome)"[^>]*>([^<]+)</g)) {
        const n = m[2].trim(); nomes[n] = (nomes[n] || 0) + 1;
    }
    console.log('faixa de prova trocada. Repeticao de depoimento na home:',
        Object.values(nomes).filter(v => v > 1).length, 'nomes repetidos');
}

/* =======================================================================
   2. mensagens do WhatsApp
   ======================================================================= */
const SAUDACAO = 'Olá, Nicholas e Giovana!';
const FECHO = 'gostaria de uma consultoria de viagem.';

// contexto por pagina. O que nao estiver aqui cai na regra derivada do <h1>.
const CONTEXTO = {
    'index.html': `${SAUDACAO} Gostaria de conversar sobre minha próxima viagem.`,
    'servicos.html': `${SAUDACAO} Vi a página de serviços e ${FECHO}`,
    'cruzeiros.html': `${SAUDACAO} Vi a página de cruzeiros e ${FECHO}`,
    'melhor-epoca.html': `${SAUDACAO} Vi o guia de melhor época e ${FECHO}`,
    'destinos.html': `${SAUDACAO} Vi a lista de destinos e ${FECHO}`,
    'blog.html': `${SAUDACAO} Vi o diário de viagem e ${FECHO}`,
    'historia.html': `${SAUDACAO} Li a história da Terra Venture e ${FECHO}`,
    '404.html': `${SAUDACAO} Gostaria de conversar sobre minha próxima viagem.`,
    'transfer-executivo.html': `${SAUDACAO} Gostaria de reservar um transfer executivo.`,
};

function nomeDaPagina(t, arquivo) {
    const h1 = (t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    if (h1) {
        const limpo = h1.replace(/<[^>]+>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
        if (limpo && limpo.length < 70) return limpo;
    }
    const ti = (t.match(/<title>([^<|]*)/) || [])[1];
    return ti ? ti.trim() : arquivo.replace(/\.html$/, '');
}

function mensagemDe(arquivo, t) {
    if (CONTEXTO[arquivo]) return CONTEXTO[arquivo];
    const nome = nomeDaPagina(t, arquivo);
    if (arquivo.startsWith('blog-')) return `${SAUDACAO} Li o artigo "${nome}" e ${FECHO}`;
    return `${SAUDACAO} Vi a página sobre ${nome} e ${FECHO}`;
}

let paginas = 0, links = 0;
const amostra = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let t = fs.readFileSync(fp, 'utf8');
    const o = t;
    const msg = mensagemDe(f, t);
    const alvo = 'https://wa.me/5551994596233?text=' + encodeURIComponent(msg);

    // todo href wa.me vira o alvo da pagina. O link do briefing nao entra:
    // o href dele e montado pelo script com as respostas.
    t = t.replace(/href="https:\/\/wa\.me\/5551994596233[^"]*"/g, (m, pos) => {
        const antes = t.slice(Math.max(0, pos - 220), pos);
        if (antes.includes('id="briefing-enviar"')) return m;
        links++;
        return 'href="' + alvo + '"';
    });

    if (t !== o) { fs.writeFileSync(fp, t, 'utf8'); paginas++; if (amostra.length < 5) amostra.push([f, msg]); }
}
console.log('links wa.me padronizados:', links, 'em', paginas, 'paginas');
amostra.forEach(a => console.log('   ', a[0].padEnd(30), a[1].slice(0, 76)));

// confere que nao sobrou link sem mensagem
const sem = [];
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const t = l.ler(f);
    const n = (t.match(/href="https:\/\/wa\.me\/5551994596233"/g) || []).length;
    if (n) sem.push(f + ' (' + n + ')');
}
console.log('links sem mensagem restantes:', sem.length ? sem.join(', ') : 'nenhum');
