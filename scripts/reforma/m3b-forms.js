// Formularios: destino real e funcionamento sem JS.
// Casar bloco literal nao serve aqui: o texto visivel tem espaco inquebravel
// desde o passo das viuvas. Entao a edicao e por atributo, dentro do bloco do
// <form> localizado por id.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);

/* ---------- 1. formulario longo ---------- */
{
    const i = t.indexOf('<form id="briefingForm"');
    if (i === -1) { console.error('FALHA: formulario nao encontrado'); process.exit(1); }
    const fim = t.indexOf('</form>', i) + '</form>'.length;
    let bloco = t.slice(i, fim);
    const antes = bloco;

    if (!/action=/.test(bloco)) {
        bloco = bloco.replace('<form id="briefingForm"',
            '<form id="briefingForm" action="https://wa.me/5551994596233" method="get" target="_blank"');
    }
    // os campos tinham id mas nao name: num envio sem JS nao ia nada.
    // o campo da mensagem vira name="text", que e o parametro que o wa.me le.
    const nomes = { name: 'nome', phone: 'whatsapp', destination: 'destino', message: 'text' };
    const auto = { name: 'name', phone: 'tel' };
    for (const [id, nome] of Object.entries(nomes)) {
        const re = new RegExp('(<(?:input|textarea)[^>]*\\bid="' + id + '")([^>]*>)');
        if (!re.test(bloco)) { console.error('FALHA: campo', id); process.exit(1); }
        bloco = bloco.replace(re, (m, a, b) => {
            if (/\bname=/.test(m)) return m;
            const ac = auto[id] ? ' autocomplete="' + auto[id] + '"' : '';
            return a + ' name="' + nome + '"' + ac + b;
        });
    }
    bloco = bloco.replace(/>Enviar solicitação</, '>Enviar pelo WhatsApp<');

    const COMENT = cr(`<!-- action e method de verdade: sem JS o envio abre a conversa no WhatsApp
                         com o texto escrito, em vez de recarregar a home. Os campos nao
                         tinham name, entao nada era enviado. -->
                    `);
    if (bloco === antes) { console.error('FALHA: nada mudou no formulario'); process.exit(1); }
    t = t.slice(0, i) + COMENT + bloco + t.slice(fim);
    console.log('formulario longo: action, method e name nos quatro campos');
}

/* ---------- 2. briefing de cinco passos: saida sem JS ---------- */
{
    const ANC = '<p class="briefing-alternativa">';
    const i = t.indexOf(ANC);
    if (i === -1) { console.error('FALHA: alternativa do briefing'); process.exit(1); }
    if (!t.includes('<noscript>\r\n                <p class="briefing-alternativa">') && !t.includes('briefing precisa de JavaScript')) {
        const iniLinha = t.lastIndexOf('\n', i) + 1;
        const NOSCRIPT = cr(`            <noscript>
                <p class="briefing-alternativa">
                    O briefing precisa de JavaScript para funcionar. <a href="https://wa.me/5551994596233?text=Ol%C3%A1%2C%20Nicholas%20e%20Giovana!%20Gostaria%20de%20conversar%20sobre%20minha%20pr%C3%B3xima%20viagem." target="_blank" rel="noopener">Fale direto no WhatsApp</a> ou use o formulário no fim da página.
                </p>
            </noscript>
`);
        t = t.slice(0, iniLinha) + NOSCRIPT + t.slice(iniLinha);
        console.log('briefing: saida sem JS');
    }
}

l.gravar('index.html', t);
l.conferir('index.html');
console.log('campos com name:', (l.ler('index.html').match(/<(?:input|textarea)[^>]*\bname="(?:nome|whatsapp|destino|text)"/g) || []).length);
