// Os 22 artigos do blog não têm rodapé: quem chega pelo Google lê e não tem
// pra onde ir. Ruim pra navegação e pra SEO (zero internal linking saindo).
// Insere o mesmo rodapé das outras páginas, logo antes do botão flutuante.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');

const FOOTER = `
        <footer class="footer">
        <div class="footer-main">
            <div class="container footer-grid">
                <div class="footer-brand">
                    <h3 class="logo-text">Terra Venture</h3>
                    <p>A essência da aventura com o conforto da exclusividade. Do sonho ao retorno.</p>
                    <p>Com sede em Ivoti, no Vale dos Sinos, atendemos clientes de todo o Brasil.</p>
                    <div class="footer-social" style="margin-top:16px;"><a href="https://www.instagram.com/terraventureviagens/" target="_blank" style="display:inline-flex;align-items:center;gap:8px;color:var(--bone-dim);font-size:.95rem;"><i class="fab fa-instagram" style="font-size:1.3rem;"></i> @terraventureviagens</a></div>
                </div>
                <div class="footer-links"><h4>Navegação</h4><ul>
                    <li><a href="/#quem-somos">A Agência</a></li>
                    <li><a href="/destinos">Destinos</a></li>
                    <li><a href="/blog">Diário de Bordo</a></li>
                    <li><a href="/#quiz">Descubra seu destino</a></li>
                    <li><a href="/#contato">Contato</a></li>
                </ul></div>
                <div class="footer-links"><h4>Contato</h4><ul>
                    <li><a href="https://wa.me/5551994596233" target="_blank">WhatsApp</a></li>
                    <li><a href="mailto:contato@terraventureviagens.com.br">Email</a></li>
                    <li><a href="/transfer-executivo">Transfer Executivo</a></li>
                </ul></div>
            </div>
        </div>
        <div class="footer-bottom"><div class="container"><p>&copy; 2026 Terra Venture Viagens. Todos os direitos reservados.</p></div></div>
    </footer>
`;

const files = fs.readdirSync(dir).filter(f => /^blog-.*\.html$/.test(f));
let done = 0, skipped = [];

for (const f of files) {
    const fp = path.join(dir, f);
    let s = fs.readFileSync(fp, 'utf8');
    if (/<footer/.test(s)) { skipped.push(f + ' (ja tem)'); continue; }

    const anchor = '    <a href="https://wa.me/5551994596233" class="whatsapp-float';
    if (!s.includes(anchor)) { skipped.push(f + ' (sem ancora do whatsapp-float)'); continue; }

    s = s.replace(anchor, FOOTER + anchor);
    fs.writeFileSync(fp, s, 'utf8');
    done++;
}

console.log('rodape adicionado em', done, 'artigos');
if (skipped.length) console.log('pulados:\n  ' + skipped.join('\n  '));
