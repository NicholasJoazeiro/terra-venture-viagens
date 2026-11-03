// Captura a pagina inteira numa largura dada, via protocolo do Chrome.
// O --screenshot do chrome headless so pega o que cabe na janela; para a
// pagina toda e preciso Page.captureScreenshot com captureBeyondViewport.
//
// uso: node capturar.js <url> <largura> <altura do viewport> <arquivo.png>
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const [url, largura, alturaViewport, saida] = process.argv.slice(2);
if (!saida) { console.error('uso: node capturar.js <url> <largura> <altura> <saida.png>'); process.exit(1); }

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORTA = 9333 + (Number(largura) % 50);
const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'cap-'));

const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--remote-debugging-port=' + PORTA,
    '--user-data-dir=' + perfil,
    'about:blank',
], { stdio: 'ignore' });

const esperar = ms => new Promise(r => setTimeout(r, ms));

(async () => {
    // espera o endpoint subir
    let alvo = null;
    for (let i = 0; i < 40 && !alvo; i++) {
        await esperar(350);
        try {
            const res = await fetch('http://127.0.0.1:' + PORTA + '/json/list');
            const abas = await res.json();
            alvo = abas.find(a => a.type === 'page');
        } catch (e) { /* ainda subindo */ }
    }
    if (!alvo) throw new Error('o Chrome nao abriu o endpoint de depuracao');

    const ws = new WebSocket(alvo.webSocketDebuggerUrl);
    let id = 0;
    const pendentes = new Map();
    const eventos = new Map();
    ws.onmessage = e => {
        const m = JSON.parse(e.data);
        if (m.id && pendentes.has(m.id)) { pendentes.get(m.id)(m.result); pendentes.delete(m.id); }
        if (m.method && eventos.has(m.method)) { eventos.get(m.method)(); eventos.delete(m.method); }
    };
    const enviar = (method, params) => new Promise(r => {
        const n = ++id;
        pendentes.set(n, r);
        ws.send(JSON.stringify({ id: n, method, params: params || {} }));
    });
    await new Promise(r => { ws.onopen = r; });

    await enviar('Page.enable');
    await enviar('Emulation.setDeviceMetricsOverride', {
        width: Number(largura), height: Number(alturaViewport),
        deviceScaleFactor: 1, mobile: Number(largura) < 700,
    });
    const carregou = new Promise(r => eventos.set('Page.loadEventFired', r));
    await enviar('Page.navigate', { url });
    await carregou;

    // rola a pagina inteira primeiro: as secoes so aparecem quando sao reveladas
    await enviar('Runtime.evaluate', {
        expression: `(async () => {
            document.documentElement.style.scrollBehavior = 'auto';
            const passo = innerHeight * 0.8;
            for (let y = 0; y < document.body.scrollHeight; y += passo) {
                scrollTo(0, y);
                await new Promise(r => setTimeout(r, 90));
            }
            scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 400));
            return document.body.scrollHeight;
        })()`,
        awaitPromise: true,
    });
    await esperar(900);

    const r = await enviar('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true, fromSurface: true,
    });
    fs.writeFileSync(saida, Buffer.from(r.data, 'base64'));
    console.log(saida, 'gravado');
    ws.close();
    chrome.kill();
    process.exit(0);
})().catch(e => { console.error('FALHA:', e.message); chrome.kill(); process.exit(1); });
