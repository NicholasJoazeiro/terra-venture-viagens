// Gera public/sitemap.xml e public/robots.txt dinamicamente a partir dos arquivos
// .html realmente presentes em public/. Sem lista fixa: qualquer página nova
// (destino, artigo de blog, etc.) criada em public/ entra sozinha na próxima
// execução. Rodar antes de cada deploy: node scripts/generate-sitemap.js
// (teste de pipeline CI: confirma que o build automático do Cloudflare Pages roda este script)
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const base = 'https://terraventureviagens.com.br';
const EXCLUDE = new Set(['404.html']);

function classify(file) {
    const slug = file.replace(/\.html$/, '');
    if (file === 'index.html') return { loc: '/', priority: '1.0', freq: 'weekly' };
    if (file === 'destinos.html' || file === 'blog.html') return { loc: '/' + slug, priority: '0.9', freq: 'weekly' };
    if (file === 'transfer-executivo.html') return { loc: '/' + slug, priority: '0.7', freq: 'monthly' };
    if (file === 'historia.html') return { loc: '/' + slug, priority: '0.5', freq: 'monthly' };
    if (file.startsWith('blog-')) return { loc: '/' + slug, priority: '0.6', freq: 'monthly' };
    return { loc: '/' + slug, priority: '0.8', freq: 'monthly' }; // páginas de destino
}

const files = fs.readdirSync(publicDir)
    .filter(f => f.endsWith('.html') && !EXCLUDE.has(f));

const entries = files.map(f => {
    const c = classify(f);
    const mtime = fs.statSync(path.join(publicDir, f)).mtime.toISOString().slice(0, 10);
    return `  <url>\n    <loc>${base}${c.loc}</loc>\n    <lastmod>${mtime}</lastmod>\n    <changefreq>${c.freq}</changefreq>\n    <priority>${c.priority}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`sitemap.xml gerado com ${files.length} URLs.`);
