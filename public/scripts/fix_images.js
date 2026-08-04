const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const localImages = [
    "santiago_cordilheira.png", // Atacama
    "patagonia_glaciar.png", // Courchevel
    "blog_trilha.png", // Familia
    "costa_amalfitana.png", // Maldivas
    "paris_cafe.png", // Oriente
    "tanzania.png", // Safari
    "santiago_mercado.png", // San Sebastian
    "santiago_vinicola.png", // Wellness
    "machu_picchu.png", // Balao
    "egito.png", // Rota Seda
    "egito.png" // Fallback card pra khiva
];

const urls = [
    "https://images.unsplash.com/photo-1549887534-1541e9326642",
    "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
    "https://images.unsplash.com/photo-1608228068998-5715560b39dc",
    "https://images.unsplash.com/photo-1540202404-b711ed7052ff",
    "https://images.unsplash.com/photo-1532154064375-7bc05ba2136d",
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    "https://images.unsplash.com/photo-1512484776495-a09fc48747ae",
    "https://images.unsplash.com/photo-1610488661642-16a243a75501",
    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee",
    "https://images.unsplash.com/photo-1610488661642-16a243a7550f",
    "https://images.unsplash.com/photo-1621217646580-cfaaf0f33166"
];

for(let file of files) {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
    let modified = false;
    urls.forEach((u, i) => {
        // match ?auto=format...
        const regexStr = u.replace(/\//g, "\\/") + "\\?auto=format&fit=crop&w=\\d+";
        const regex = new RegExp(regexStr, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, localImages[i]);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(path.join(publicDir, file), content, 'utf8');
        console.log("Fixed images in", file);
    }
}
console.log("Images replaced successfully!");
