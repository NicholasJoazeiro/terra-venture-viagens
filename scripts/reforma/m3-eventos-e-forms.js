// Camada de eventos e conserto dos formularios.
//
// O GA4 ainda nao tem ID, entao a camada escreve em dataLayer e chama gtag()
// so se ele existir. Quando o ID entrar, os eventos ja estao disparando.
// O Pixel ja existe, entao Contact e Lead passam a valer hoje.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* =======================================================================
   1. script.js: eventos
   ======================================================================= */
{
    const sp = path.resolve(__dirname, '../../public/script.js');
    let s = fs.readFileSync(sp, 'utf8');
    if (s.includes('whatsapp_click')) { console.error('ja aplicado'); process.exit(1); }
    const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);

    const BLOCO = cr(`    /* =========================================================================
       0. EVENTOS DE CONVERSÃO
       =========================================================================
       A conversao do site e o clique no WhatsApp. Tudo aqui escreve em
       dataLayer (serve ao GTM) e tambem chama gtag() direto, se existir, para
       funcionar com GA4 sem GTM. Se nenhum dos dois estiver instalado, nada
       quebra: as funcoes somem sozinhas.

       TODO(nicholas): falta o ID do GA4 (G-XXXXXXX) ou do GTM (GTM-XXXXXXX)
       no <head> das paginas. Os eventos abaixo ja estao prontos para ele.
       ========================================================================= */
    window.dataLayer = window.dataLayer || [];

    function evento(nome, dados) {
        const carga = Object.assign({
            page_path: location.pathname,
            page_location: location.href,
        }, dados || {});
        window.dataLayer.push(Object.assign({ event: nome }, carga));
        if (typeof window.gtag === 'function') window.gtag('event', nome, carga);
    }

    // de onde na pagina o clique saiu, para separar o que converte do que nao
    function ondeEstou(el) {
        if (el.closest('.whatsapp-float')) return 'botao-flutuante';
        if (el.closest('.navbar')) return 'menu';
        if (el.closest('footer')) return 'rodape';
        if (el.closest('.hero, .page-hero, .epoca-hero')) return 'hero';
        if (el.closest('#briefing')) return 'briefing';
        if (el.closest('.contato')) return 'formulario';
        if (el.closest('.article-content, .artigo-cta')) return 'artigo';
        const sec = el.closest('section');
        if (sec) return (sec.id || sec.className.split(' ')[0] || 'secao');
        return 'outro';
    }

    // um ouvinte so, na captura, pega todo link wa.me que existir ou vier a
    // existir na pagina. Nao precisa religar nada quando o DOM muda.
    document.addEventListener('click', function (e) {
        const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
        if (!a) return;
        evento('whatsapp_click', {
            link_location: ondeEstou(a),
            destination: document.body.dataset.destino || undefined,
            link_url: a.getAttribute('href'),
        });
        if (typeof fbq === 'function') fbq('track', 'Contact');
    }, true);

    // UTM e fbclid: sem isso a origem da visita morre no primeiro clique
    // interno, e a campanha aparece no relatorio como trafego direto.
    (function propagarOrigem() {
        const CHAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
        const atual = new URLSearchParams(location.search);
        let guardado = {};
        try { guardado = JSON.parse(sessionStorage.getItem('tv_origem') || '{}'); } catch (err) { guardado = {}; }
        let mudou = false;
        CHAVES.forEach(k => { if (atual.has(k)) { guardado[k] = atual.get(k); mudou = true; } });
        if (mudou) { try { sessionStorage.setItem('tv_origem', JSON.stringify(guardado)); } catch (err) { /* modo privado */ } }
        const chaves = Object.keys(guardado);
        if (!chaves.length) return;
        document.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (!href || /^(#|mailto:|tel:)/.test(href)) return;
            let u;
            try { u = new URL(href, location.href); } catch (err) { return; }
            if (u.origin !== location.origin) return;          // so link interno
            chaves.forEach(k => { if (!u.searchParams.has(k)) u.searchParams.set(k, guardado[k]); });
            a.setAttribute('href', u.pathname + u.search + u.hash);
        });
    })();

`);

    // entra logo depois do DOMContentLoaded, antes de tudo
    const ANC = cr(`document.addEventListener('DOMContentLoaded', () => {
`);
    if (!s.includes(ANC)) { console.error('FALHA: ancora do DOMContentLoaded'); process.exit(1); }
    s = s.replace(ANC, ANC + BLOCO);

    // o briefing ja chamava fbq Lead; agora avisa as duas pontas
    const DE = cr(`        linkEnviar.addEventListener('click', () => {
            if (typeof fbq === 'function') fbq('track', 'Lead');
        });`);
    if (!s.includes(DE)) { console.error('FALHA: clique do briefing'); process.exit(1); }
    s = s.replace(DE, cr(`        linkEnviar.addEventListener('click', () => {
            evento('briefing_enviado', {
                link_location: 'briefing',
                respostas: passos.length,
            });
            if (typeof fbq === 'function') fbq('track', 'Lead');
        });`));

    // o formulario longo tambem e um lead
    const DE2 = cr(`            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }`);
    if (s.includes(DE2)) {
        s = s.replace(DE2, cr(`            evento('formulario_enviado', { link_location: 'formulario' });
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }`));
    }

    fs.writeFileSync(sp, s, 'utf8');
    console.log('script.js: camada de eventos instalada');
}

/* =======================================================================
   2. data-destino nas paginas de destino
   ======================================================================= */
{
    let n = 0;
    for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
        const fp = path.join(l.DIR, f);
        let t = fs.readFileSync(fp, 'utf8');
        if (!/"@type":\s*"TouristDestination"/.test(t)) continue;
        if (/<body[^>]*data-destino/.test(t)) continue;
        const nome = (t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
        if (!nome) continue;
        const limpo = nome.replace(/<[^>]+>/g, '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim().replace(/"/g, '');
        t = t.replace(/<body([^>]*)>/, '<body$1 data-destino="' + limpo + '">');
        fs.writeFileSync(fp, t, 'utf8');
        n++;
    }
    console.log('paginas de destino com data-destino:', n);
}

/* =======================================================================
   3. formularios: destino real e funcionamento sem JS
   ======================================================================= */
{
    let t = l.ler('index.html');
    const cr = l.crlf(t);

    // 3.1 formulario longo. Os campos tinham id mas nao name: num envio sem
    // JS nao iria nada. Com name e action no wa.me, o envio sem JS ja abre a
    // conversa com o texto escrito.
    const DE = `                    <form id="briefingForm">
                        <div class="form-group">
                            <label for="name">Nome completo</label>
                            <input type="text" id="name" placeholder="Como gosta de ser chamado" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">WhatsApp</label>
                            <input type="tel" id="phone" placeholder="(00) 00000-0000" required>
                        </div>
                        <div class="form-group">
                            <label for="destination">Destino dos sonhos (ou deixe a gente sugerir)</label>
                            <input type="text" id="destination" placeholder="Ex: Safári na África, Costa Amalfitana...">
                        </div>
                        <div class="form-group">
                            <label for="message">Conte um pouco sobre a ocasião</label>
                            <textarea id="message" rows="4" placeholder="Ex: Lua de mel, aniversário, viagem em família..." required></textarea>
                        </div>
                        <button type="submit" class="btn-primary w-100 mt-2">Enviar solicitação</button>
                    </form>`;
    if (!t.includes(cr(DE))) { console.error('FALHA: formulario longo'); process.exit(1); }
    const PARA = `                    <!-- action e method de verdade: sem JS o envio abre a conversa no
                         WhatsApp com o texto escrito, em vez de recarregar a home.
                         Os campos nao tinham name, entao nada era enviado. -->
                    <form id="briefingForm" action="https://wa.me/5551994596233" method="get" target="_blank">
                        <div class="form-group">
                            <label for="name">Nome completo</label>
                            <input type="text" id="name" name="nome" autocomplete="name" placeholder="Como gosta de ser chamado" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">WhatsApp</label>
                            <input type="tel" id="phone" name="whatsapp" autocomplete="tel" placeholder="(00) 00000-0000" required>
                        </div>
                        <div class="form-group">
                            <label for="destination">Destino dos sonhos (ou deixe a gente sugerir)</label>
                            <input type="text" id="destination" name="destino" placeholder="Ex: Safári na África, Costa Amalfitana...">
                        </div>
                        <div class="form-group">
                            <label for="message">Conte um pouco sobre a ocasião</label>
                            <textarea id="message" name="text" rows="4" placeholder="Ex: Lua de mel, aniversário, viagem em família..." required></textarea>
                        </div>
                        <button type="submit" class="btn-primary w-100 mt-2">Enviar pelo WhatsApp</button>
                    </form>`;
    t = t.replace(cr(DE), cr(PARA));

    // 3.2 briefing de cinco passos: sem JS so apareceria a primeira pergunta e
    // nenhum botao de envio. O <noscript> dá a saida direta.
    const ANC = `            <p class="briefing-alternativa">`;
    if (!t.includes(cr(ANC))) { console.error('FALHA: alternativa do briefing'); process.exit(1); }
    t = t.replace(cr(ANC), cr(`            <noscript>
                <p class="briefing-alternativa">
                    O briefing precisa de JavaScript para funcionar.
                    <a href="https://wa.me/5551994596233?text=Ol%C3%A1%2C%20Nicholas%20e%20Giovana!%20Gostaria%20de%20conversar%20sobre%20minha%20pr%C3%B3xima%20viagem." target="_blank" rel="noopener">Fale direto no WhatsApp</a>
                    ou use o formulário no fim da página.
                </p>
            </noscript>
`) + cr(ANC));

    l.gravar('index.html', t);
    console.log('formularios: action real e saida sem JS');
    l.conferir('index.html');
}
