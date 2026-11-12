// 1) blog.html estava com o rodape antigo (sem Cadastur/CNPJ/Contato): copia o rodape de /servicos.
// 2) Selo SuperTur ao lado do Cadastur em todas as paginas que tem a faixa de selos.
const fs = require('fs');
const l = require('./lib.js');

const bloco = t => { const i = t.indexOf('<footer class="footer"'); const f = t.indexOf('</footer>', i) + 9; return [i, f]; };
{
    const ref = l.ler('servicos.html'), [ri, rf] = bloco(ref);
    let b = l.ler('blog.html'); const [bi, bf] = bloco(b);
    if (ri < 0 || bi < 0) throw new Error('footer nao achado');
    const novo = ref.slice(ri, rf).split(l.quebra(ref)).join(l.quebra(b));
    b = b.slice(0, bi) + novo + b.slice(bf);
    l.gravar('blog.html', b);
    console.log('blog.html: rodape atualizado');
}
const SELO = (q) => [
    '                <a class="supertur-selo" href="https://supertur.com.br/empresa/terra-venture-viagens-ivoti-rs" target="_blank" rel="noopener">',
    '                    <img width="220" height="56" loading="lazy" decoding="async" src="https://supertur.com.br/selo/prestador/terra-venture-viagens-ivoti-rs.svg" alt="Verificado pela SuperTur">',
    '                </a>'].join(q);
let n = 0;
for (const f of fs.readdirSync(l.DIR).filter(x => x.endsWith('.html'))) {
    let t = l.ler(f);
    if (!t.includes('footer-selo') || t.includes('supertur-selo')) continue;
    const q = l.quebra(t);
    const fim = t.indexOf('</p>', t.indexOf('class="cadastur-texto"')) + 4;
    if (fim < 4) { console.log('sem cadastur-texto:', f); continue; }
    t = t.slice(0, fim) + q + SELO(q) + t.slice(fim);
    l.gravar(f, t); n++;
}
console.log('selo SuperTur inserido em', n, 'paginas');
const CSS = `
/* Selo SuperTur: o SVG ja traz fundo escuro e cantos arredondados */
.supertur-selo { display: block; flex: none; line-height: 0; transition: transform 0.3s var(--ease); }
.supertur-selo:hover { transform: translateY(-2px); }
.supertur-selo img { display: block; width: 220px; height: 56px; }
`;
let css = l.ler('terra.css');
if (!css.includes('.supertur-selo')) l.gravar('terra.css', css + CSS.split('\n').join(l.quebra(css)));
