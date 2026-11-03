// Fase 4: o quiz "Descubra seu proximo destino" sai e entra um briefing de
// cinco perguntas, uma por tela, que termina abrindo o WhatsApp com as
// respostas ja escritas.
//
// O quiz adivinhava um destino a partir de tres cliques e mandava a pessoa
// para uma pagina. Nao gerava conversa nem dizia nada util para quem ia
// atender. O briefing coleta o que o Nicholas precisa saber para responder.
const l = require('./lib.js');

let t = l.ler('index.html');
const cr = l.crlf(t);

const BRIEFING = `    <section class="briefing" id="briefing">
        <div class="container">
            <div class="briefing-intro">
                <h2 class="section-title">Conte o básico em 30 segundos</h2>
                <p class="section-desc">Cinco perguntas. No fim abre o WhatsApp com as respostas já escritas e você só aperta enviar.</p>
            </div>

            <form class="briefing-caixa" id="briefing-caixa" novalidate>
                <div class="briefing-progresso" role="presentation">
                    <span class="briefing-barra" id="briefing-barra"></span>
                </div>
                <p class="briefing-contador" id="briefing-contador" aria-live="polite">Pergunta 1 de 5</p>

                <fieldset class="briefing-passo" data-passo="1">
                    <legend class="briefing-pergunta" tabindex="-1">Quem viaja?</legend>
                    <div class="briefing-opcoes">
                        <label class="briefing-opcao"><input type="radio" name="quem" value="Sozinho"><span>Sozinho</span></label>
                        <label class="briefing-opcao"><input type="radio" name="quem" value="Casal"><span>Casal</span></label>
                        <label class="briefing-opcao"><input type="radio" name="quem" value="Família"><span>Família</span></label>
                        <label class="briefing-opcao"><input type="radio" name="quem" value="Grupo de amigos"><span>Grupo de amigos</span></label>
                    </div>
                </fieldset>

                <fieldset class="briefing-passo" data-passo="2" hidden>
                    <legend class="briefing-pergunta" tabindex="-1">Quando você quer viajar?</legend>
                    <div class="briefing-quando">
                        <p class="briefing-campo">
                            <label for="brief-mes">Mês</label>
                            <select id="brief-mes" name="mes">
                                <option value="">Escolha o mês</option>
                            </select>
                        </p>
                        <p class="briefing-campo">
                            <label for="brief-ano">Ano</label>
                            <select id="brief-ano" name="ano">
                                <option value="">Escolha o ano</option>
                            </select>
                        </p>
                    </div>
                    <label class="briefing-opcao briefing-opcao-larga">
                        <input type="checkbox" id="brief-flexivel" name="flexivel" value="Ainda flexível">
                        <span>Ainda estou flexível com a data</span>
                    </label>
                </fieldset>

                <fieldset class="briefing-passo" data-passo="3" hidden>
                    <legend class="briefing-pergunta" tabindex="-1">Quantos dias de viagem?</legend>
                    <div class="briefing-opcoes">
                        <label class="briefing-opcao"><input type="radio" name="dias" value="Até 4 dias"><span>Até 4 dias</span></label>
                        <label class="briefing-opcao"><input type="radio" name="dias" value="5 a 7 dias"><span>5 a 7 dias</span></label>
                        <label class="briefing-opcao"><input type="radio" name="dias" value="8 a 14 dias"><span>8 a 14 dias</span></label>
                        <label class="briefing-opcao"><input type="radio" name="dias" value="Mais de 14 dias"><span>Mais de 14 dias</span></label>
                        <label class="briefing-opcao"><input type="radio" name="dias" value="Ainda não sei"><span>Ainda não sei</span></label>
                    </div>
                </fieldset>

                <!-- TODO(nicholas): confira se estas faixas batem com o que voce
                     costuma atender. Eu escolhi valores redondos de degrau, nao
                     valores tirados de venda nenhuma. -->
                <fieldset class="briefing-passo" data-passo="4" hidden>
                    <legend class="briefing-pergunta" tabindex="-1">Quanto você pensa em investir por pessoa?</legend>
                    <div class="briefing-opcoes">
                        <label class="briefing-opcao"><input type="radio" name="investimento" value="Até R$ 5 mil"><span>Até R$ 5 mil</span></label>
                        <label class="briefing-opcao"><input type="radio" name="investimento" value="R$ 5 mil a R$ 10 mil"><span>R$ 5 mil a R$ 10 mil</span></label>
                        <label class="briefing-opcao"><input type="radio" name="investimento" value="R$ 10 mil a R$ 20 mil"><span>R$ 10 mil a R$ 20 mil</span></label>
                        <label class="briefing-opcao"><input type="radio" name="investimento" value="Acima de R$ 20 mil"><span>Acima de R$ 20 mil</span></label>
                        <label class="briefing-opcao"><input type="radio" name="investimento" value="Prefiro conversar sobre isso"><span>Prefiro conversar sobre isso</span></label>
                    </div>
                </fieldset>

                <fieldset class="briefing-passo" data-passo="5" hidden>
                    <legend class="briefing-pergunta" tabindex="-1">O que não pode faltar?</legend>
                    <div class="briefing-opcoes briefing-chips">
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Praia"><span>Praia</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Montanha"><span>Montanha</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Gastronomia"><span>Gastronomia</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Museus e história"><span>Museus e história</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Natureza e trilhas"><span>Natureza e trilhas</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Vida noturna"><span>Vida noturna</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Compras"><span>Compras</span></label>
                        <label class="briefing-opcao"><input type="checkbox" name="essencial" value="Descanso, sem correria"><span>Descanso, sem correria</span></label>
                    </div>
                    <p class="briefing-campo briefing-campo-livre">
                        <label for="brief-livre">Quer acrescentar alguma coisa? (opcional)</label>
                        <input type="text" id="brief-livre" name="livre" maxlength="140" placeholder="Ex: é aniversário de casamento, viajamos com uma criança de 3 anos">
                    </p>
                </fieldset>

                <div class="briefing-nav">
                    <button type="button" class="briefing-voltar" id="briefing-voltar" hidden>Voltar</button>
                    <button type="button" class="btn-primary" id="briefing-avancar">Continuar</button>
                    <a class="btn-primary" id="briefing-enviar" href="https://wa.me/5551994596233" target="_blank" rel="noopener" hidden>Abrir o WhatsApp com minhas respostas</a>
                </div>
            </form>

            <p class="briefing-alternativa">
                Prefere escrever com calma? <a href="#contato">Use o formulário no fim da página</a>.
                Prefere falar agora? <a href="https://wa.me/5551994596233?text=Olá Nicholas e Giovana! Quero conversar sobre uma viagem." target="_blank" rel="noopener">Chame no WhatsApp</a>.
            </p>
        </div>
    </section>`;

t = l.trocarSecao(t, 'quiz-section', BRIEFING);

/* ---------- contato vira "prefiro escrever" ---------- */
const trocas = [
    [`                    <h2 class="section-title">Bora tirar do papel?</h2>
                    <p><strong>Conversa gratuita, sem compromisso.</strong> A gente entende o seu sonho de viagem e cria algo único pra você.</p>
                    <p>Ou preenche o formulário, nossa equipe responde em até 24 horas.</p>`,
     `                    <h2 class="section-title">Prefiro escrever</h2>
                    <p>Se você quer contar a sua ideia com mais calma, escreva aqui. A gente responde em até 24 horas, no WhatsApp que você deixar.</p>
                    <p>Se der para resumir em cinco cliques, <a href="#briefing">o briefing é mais rápido</a>.</p>`],
    // o segundo botao dos destinos levava ao formulario; agora leva ao briefing
    [`                <a href="#contato" class="btn-outline-white">Monte seu roteiro ideal</a>`,
     `                <a href="#briefing" class="btn-outline-white">Contar o que eu quero</a>`],
];
for (const [de, para] of trocas) {
    const d = cr(de), p = cr(para);
    if (!t.includes(d)) { console.error('FALHA na troca:', de.trim().slice(0, 50)); process.exit(1); }
    t = t.replace(d, p);
}

l.gravar('index.html', t);

/* ---------- rodape: tira "Descubra seu destino" de todas as paginas ---------- */
const fs = require('fs');
const path = require('path');
let rodapes = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    const fp = path.join(l.DIR, f);
    let h = fs.readFileSync(fp, 'utf8');
    const o = h;
    h = h.replace(/\s*<li><a href="#quiz">Descubra seu destino<\/a><\/li>/g, '');
    h = h.replace(/\s*<li><a href="\/#quiz">Descubra seu destino<\/a><\/li>/g, '');
    if (h !== o) { fs.writeFileSync(fp, h, 'utf8'); rodapes++; }
}
console.log('rodapes sem "Descubra seu destino":', rodapes);
console.log('ancoras #quiz restantes no site:',
    fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))
        .reduce((n, f) => n + (fs.readFileSync(path.join(l.DIR, f), 'utf8').match(/#quiz/g) || []).length, 0));
l.conferir('index.html');
