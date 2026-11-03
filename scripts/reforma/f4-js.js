// Fase 4 (JS): troca o bloco do quiz pelo do briefing dentro do script.js.
const fs = require('fs');
const path = require('path');
const sp = path.resolve(__dirname, '../../public/script.js');
let s = fs.readFileSync(sp, 'utf8');
const QB = s.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
const cr = x => x.split('\n').join(QB);

const INI = cr(`    /* =========================================================================
       11. QUIZ "DESCUBRA SEU DESTINO"
       ========================================================================= */`);
const FIM = cr(`    /* =========================================================================
       12. TILT 3D NOS CARDS DE DESTINO (só desktop com hover real)`);
const i = s.indexOf(INI), j = s.indexOf(FIM);
if (i === -1 || j === -1 || j < i) { console.error('FALHA: limites do bloco do quiz'); process.exit(1); }

const NOVO = cr(`    /* =========================================================================
       11. BRIEFING "CONTE O BÁSICO EM 30 SEGUNDOS"
       =========================================================================
       Cinco perguntas, uma por tela, sem backend. No fim monta a mensagem e
       abre o wa.me com ela pronta.

       TODO(nicholas): hoje as respostas so viajam dentro da mensagem do
       WhatsApp. O site nao tem backend nem destino de formulario funcionando,
       entao nao ha onde gravar uma copia. Se um dia existir (uma planilha, um
       CRM, um endpoint), e aqui que entra o envio paralelo.
       ========================================================================= */
    const briefingCaixa = document.getElementById('briefing-caixa');
    if (briefingCaixa) {
        const WHATS = '5551994596233';
        const passos = [...briefingCaixa.querySelectorAll('.briefing-passo')];
        const barra = document.getElementById('briefing-barra');
        const contador = document.getElementById('briefing-contador');
        const btnVoltar = document.getElementById('briefing-voltar');
        const btnAvancar = document.getElementById('briefing-avancar');
        const linkEnviar = document.getElementById('briefing-enviar');
        let atual = 0;

        // meses e anos sao gerados na hora: lista fixa de anos envelhece sozinha
        const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const selMes = document.getElementById('brief-mes');
        const selAno = document.getElementById('brief-ano');
        MESES.forEach((m, k) => selMes.add(new Option(m, m, false, false)));
        const anoAtual = new Date().getFullYear();
        for (let a = anoAtual; a <= anoAtual + 3; a++) selAno.add(new Option(a, a, false, false));

        function mostrar(n) {
            atual = Math.max(0, Math.min(n, passos.length - 1));
            passos.forEach((p, k) => { p.hidden = k !== atual; });
            const pct = ((atual + 1) / passos.length) * 100;
            barra.style.width = pct + '%';
            contador.textContent = 'Pergunta ' + (atual + 1) + ' de ' + passos.length;
            btnVoltar.hidden = atual === 0;
            const ultimo = atual === passos.length - 1;
            btnAvancar.hidden = ultimo;
            linkEnviar.hidden = !ultimo;
            if (ultimo) linkEnviar.href = montarLink();
            // leva o foco para a pergunta, senao quem usa teclado fica para tras
            const legenda = passos[atual].querySelector('.briefing-pergunta');
            if (legenda) legenda.focus();
        }

        function respostaDe(nome) {
            const marcado = briefingCaixa.querySelector('input[name="' + nome + '"]:checked');
            return marcado ? marcado.value : '';
        }

        function quando() {
            const flex = document.getElementById('brief-flexivel').checked;
            const mes = selMes.value, ano = selAno.value;
            if (mes && ano) return mes + ' de ' + ano + (flex ? ', com flexibilidade' : '');
            if (mes) return mes + (flex ? ', com flexibilidade' : '');
            if (ano) return ano + (flex ? ', com flexibilidade' : '');
            return flex ? 'Ainda flexível' : '';
        }

        function montarLink() {
            const essenciais = [...briefingCaixa.querySelectorAll('input[name="essencial"]:checked')]
                .map(c => c.value).join(', ');
            const livre = document.getElementById('brief-livre').value.trim();
            const linhas = [
                'Olá! Preenchi o briefing no site da Terra Venture.',
                '',
                campo('Quem viaja', respostaDe('quem')),
                campo('Quando', quando()),
                campo('Quantos dias', respostaDe('dias')),
                campo('Investimento por pessoa', respostaDe('investimento')),
                campo('Não pode faltar', essenciais),
                campo('Observação', livre),
            ].filter(Boolean);
            return 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(linhas.join('\\n'));
        }
        function campo(rotulo, valor) { return valor ? rotulo + ': ' + valor : ''; }

        btnAvancar.addEventListener('click', () => mostrar(atual + 1));
        btnVoltar.addEventListener('click', () => mostrar(atual - 1));

        // escolher uma opcao de radio ja avanca: um clique a menos por pergunta
        briefingCaixa.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && atual < passos.length - 1) {
                setTimeout(() => mostrar(atual + 1), 220);
            }
            if (atual === passos.length - 1) linkEnviar.href = montarLink();
        });
        briefingCaixa.addEventListener('input', () => {
            if (atual === passos.length - 1) linkEnviar.href = montarLink();
        });
        // Enter dentro do campo de texto nao deve recarregar a pagina
        briefingCaixa.addEventListener('submit', (e) => e.preventDefault());

        linkEnviar.addEventListener('click', () => {
            if (typeof fbq === 'function') fbq('track', 'Lead');
        });

        mostrar(0);
    }

`);

s = s.slice(0, i) + NOVO + s.slice(j);

// a mensagem do formulario longo tinha emoji; sai junto
s = s.replace(/const texto = `[\s\S]*?\\n\$\{mensagem\}`;/, cr(`const texto = [
                'Olá! Mandei uma mensagem pelo formulário do site.',
                '',
                'Nome: ' + nome,
                'WhatsApp: ' + telefone,
                'Destino desejado: ' + destino,
                'Sobre a ocasião: ' + mensagem,
            ].join('\\n');`));

fs.writeFileSync(sp, s, 'utf8');
console.log('quiz removido, briefing instalado');
console.log('sobrou "quiz" no script:', (s.match(/quiz/gi) || []).length);
console.log('emoji no texto do formulario:', /[\u{1F300}-\u{1FAFF}]/u.test(s) ? 'ainda ha' : 'nenhum');
