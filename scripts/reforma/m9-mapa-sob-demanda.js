// O mapa da home custava caro em toda visita, mesmo de quem nunca chega nele:
// Leaflet (42KB de JS + 15KB de CSS) e um GeoJSON de fronteiras de 217KB
// puxado do raw.githubusercontent a cada carregamento. Sao ~274KB de um
// terceiro antes de qualquer interacao.
//
// Agora Leaflet e o GeoJSON so entram quando a secao do mapa se aproxima da
// tela. Quem nao rola ate la nao baixa nada disso.
const fs = require('fs');
const path = require('path');
const l = require('./lib.js');

/* ---------- 1. script.js: embrulha a inicializacao ---------- */
{
    const sp = path.resolve(__dirname, '../../public/script.js');
    let s = fs.readFileSync(sp, 'utf8');
    if (s.includes('carregarLeaflet')) { console.error('ja aplicado'); process.exit(1); }
    const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    const cr = x => x.split('\n').join(QB);

    const ABRE = '    if (mapContainer) {';
    const i = s.indexOf(ABRE);
    if (i === -1) { console.error('FALHA: bloco do mapa'); process.exit(1); }
    let prof = 0, j = i;
    for (; j < s.length; j++) { if (s[j] === '{') prof++; else if (s[j] === '}') { prof--; if (prof === 0) break; } }
    const corpoIf = s.slice(i + ABRE.length, j);   // o miolo do if, sem as chaves

    const NOVO = cr(`    // Leaflet e o GeoJSON de fronteiras pesam ~274KB e vem de terceiros. Nada
    // disso precisa existir antes de a pessoa chegar perto do mapa.
    function carregarLeaflet() {
        if (window.L) return Promise.resolve();
        if (window.__leafletCarregando) return window.__leafletCarregando;
        window.__leafletCarregando = new Promise((ok, falhou) => {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            css.crossOrigin = '';
            document.head.appendChild(css);
            const js = document.createElement('script');
            js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            js.crossOrigin = '';
            js.onload = ok;
            js.onerror = falhou;
            document.head.appendChild(js);
        });
        return window.__leafletCarregando;
    }

    function montarMapa() {`) + corpoIf + cr(`    }

    if (mapContainer) {
        // 400px de margem: comeca a carregar antes de o mapa aparecer, para
        // ele ja estar pronto quando entrar na tela
        const vigia = new IntersectionObserver((entradas, o) => {
            if (!entradas.some(e => e.isIntersecting)) return;
            o.disconnect();
            carregarLeaflet().then(montarMapa).catch(() => {
                mapContainer.insertAdjacentHTML('beforeend',
                    '<p class="map-erro">Não foi possível carregar o mapa agora. ' +
                    '<a href="/destinos">Ver a lista de destinos</a>.</p>');
            });
        }, { rootMargin: '400px 0px' });
        vigia.observe(mapContainer);
    }
`);

    s = s.slice(0, i) + NOVO + s.slice(j + 1);
    fs.writeFileSync(sp, s, 'utf8');
    console.log('script.js: mapa passa a carregar sob demanda');
}

/* ---------- 2. index.html: tira Leaflet do carregamento inicial ---------- */
{
    let t = l.ler('index.html');
    const antes = t;
    t = t.replace(/\s*<!-- Leaflet -->/, '');
    t = t.replace(/\s*<link rel="stylesheet" href="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.css"[^>]*>/g, '');
    t = t.replace(/\s*<noscript><link rel="stylesheet" href="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.css"[^>]*><\/noscript>/g, '');
    t = t.replace(/\s*<script defer src="https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.js"[^>]*><\/script>/g, '');
    if (t === antes) { console.error('FALHA: tags do Leaflet nao encontradas'); process.exit(1); }
    l.gravar('index.html', t);
    console.log('index.html: Leaflet fora do carregamento inicial |',
        'sobrou leaflet no html:', (l.ler('index.html').match(/leaflet/gi) || []).length);
}

/* ---------- 3. css do aviso de falha ---------- */
{
    const cp = path.resolve(__dirname, '../../public/terra.css');
    let c = fs.readFileSync(cp, 'utf8');
    const QB = c.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
    if (!c.includes('.map-erro')) {
        c += (s => s.split('\n').join(QB))(`

/* o mapa carrega sob demanda; se o Leaflet nao vier, fica a saida em texto */
.map-erro { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; padding: 24px; color: var(--bone-dim); }
.map-erro a { color: var(--bone); border-bottom: 1px solid var(--line-dark); }
`);
        fs.writeFileSync(cp, c, 'utf8');
        const a = (c.match(/\{/g) || []).length, b = (c.match(/\}/g) || []).length;
        console.log('css | chaves', a, b, a === b ? 'OK' : 'ERRO');
    }
}
