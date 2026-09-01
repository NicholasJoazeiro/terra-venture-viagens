// Reorganiza o menu do topo em todas as páginas.
// Ordem antiga: A Terra Venture | Destinos | Descubra | Diário | [Conversar]
// Problemas: sobre-nós vinha antes do produto, "Descubra" não dizia o quê,
// e Melhor Época não estava no topo (só no rodapé).
// Ordem nova: Destinos | Melhor Época | Diário | A Terra Venture | [Conversar]
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const WA = 'https://wa.me/5551994596233?text=Olá! Gostaria de uma consultoria de viagem.';

function menu(isHome) {
    const sobre = isHome ? '#quem-somos' : '/#quem-somos';
    return `<ul class="nav-links">
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/melhor-epoca">Melhor Época</a></li>
                    <li><a href="/blog">Diário</a></li>
                    <li><a href="${sobre}">A Terra Venture</a></li>
                    <li><a href="${WA}" class="btn-primary nav-btn" target="_blank">Conversar</a></li>
                </ul>`;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let done = 0, skipped = [];

for (const f of files) {
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');

    const re = /<ul class="nav-links">[\s\S]*?<\/ul>/;
    if (!re.test(s)) { skipped.push(f); continue; }

    s = s.replace(re, menu(f === 'index.html'));
    fs.writeFileSync(fp, s, 'utf8');
    done++;
}

console.log('menu reorganizado em', done, 'paginas');
if (skipped.length) console.log('sem menu (esperado no 404):', skipped.join(', '));
