// Reescreve a secao "Monte sua cotacao" de /servicos como "Compra avulsa" com passo a passo
// e aponta o link do rodape (todas as paginas) para essa secao, que explica antes de mandar ao portal.
const fs = require('fs');
const l = require('./lib.js');
const PORTAL = 'https://app.onertravel.com/terraventureviagens/home';

let h = l.ler('servicos.html');
const q = l.quebra(h);
const ini = h.indexOf('<section class="serv-cotacao">');
const fim = h.indexOf('</section>', ini) + '</section>'.length;
if (ini === -1 || fim < ini) throw new Error('secao nao achada');

const NOVA = `<section class="serv-cotacao" id="compra-avulsa">
        <div class="container">
            <div class="cotacao-caixa cotacao-passos">
                <div class="cotacao-texto">
                    <span class="eyebrow">Compra avulsa</span>
                    <h2>Só precisa de uma passagem, uma diária ou um seguro?</h2>
                    <p>Nem toda compra precisa de consultoria. Para um aéreo simples, uma reserva de hotel ou um seguro, você pode pesquisar e montar sozinho no nosso portal, no seu tempo.</p>
                    <p class="cotacao-aviso"><strong>Importante:</strong> o portal é uma ferramenta de compra, não de planejamento. Roteiro, escolha de hospedagem, ritmo da viagem e acompanhamento acontecem na consultoria.</p>
                </div>
                <ol class="cotacao-lista">
                    <li><strong>Abra o portal.</strong> Ele abre em outra aba, no ambiente da Terra Venture.</li>
                    <li><strong>Pesquise e monte.</strong> Escolha voo, hotel ou seguro e monte a sua seleção com calma.</li>
                    <li><strong>Finalize.</strong> Dependendo da compra, você fecha ali mesmo; em outras, a cotação chega para a gente autorizar antes e retornamos com você.</li>
                </ol>
                <div class="cotacao-acoes">
                    <a class="btn-primary btn-large" href="${PORTAL}" target="_blank" rel="noopener">Abrir o portal</a>
                    <a class="cotacao-alt" href="/contato">Prefere que a gente monte? Fale com a gente</a>
                </div>
            </div>
        </div>
    </section>`;
h = h.slice(0, ini) + NOVA.split('\n').join(q) + h.slice(fim);
l.gravar('servicos.html', h);

const CSS = `
/* Compra avulsa (servicos) */
.cotacao-passos { grid-template-columns: 1fr; gap: 28px; }
.cotacao-texto p + p { margin-top: 14px; }
.cotacao-aviso { border-left: 3px solid var(--sage); padding-left: 16px; }
.cotacao-lista { list-style: none; counter-reset: passo; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 0; padding: 0; }
.cotacao-lista li { counter-increment: passo; position: relative; padding: 18px 18px 18px 56px; background: rgba(255,255,255,.55); border-radius: 12px; color: var(--espresso-soft); line-height: 1.6; }
.cotacao-lista li::before { content: counter(passo); position: absolute; left: 18px; top: 16px; width: 28px; height: 28px; border-radius: 50%; background: var(--sage); color: #fff; font-weight: 600; display: grid; place-items: center; font-size: .9rem; }
.cotacao-lista strong { color: var(--espresso); display: block; margin-bottom: 4px; }
.cotacao-acoes { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
.cotacao-alt { color: var(--espresso); text-decoration: underline; text-underline-offset: 4px; }
@media (max-width: 860px) { .cotacao-lista { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .cotacao-acoes .btn-primary { width: 100%; text-align: center; } }
`;
let css = l.ler('terra.css');
if (!css.includes('Compra avulsa (servicos)')) l.gravar('terra.css', css + CSS.split('\n').join(l.quebra(css)));

// rodape de todas as paginas
let n = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    let t = l.ler(f);
    const velho = `<li><a href="${PORTAL}" target="_blank" rel="noopener">Monte sua cotação</a></li>`;
    if (!t.includes(velho)) continue;
    t = t.replace(velho, '<li><a href="/servicos#compra-avulsa">Compra avulsa</a></li>');
    l.gravar(f, t); n++;
}
console.log('rodapes atualizados:', n);
