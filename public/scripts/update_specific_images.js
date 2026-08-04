const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');

const mappings = [
    { file: "blog-glamping-atacama.html", oldImg: "santiago_cordilheira.png", newImg: "blog_atacama.png" },
    { file: "blog-esqui-courchevel.html", oldImg: "patagonia_glaciar.png", newImg: "blog_courchevel.png" },
    { file: "blog-maldivas-vs-seychelles.html", oldImg: "costa_amalfitana.png", newImg: "blog_maldivas.png" },
    { file: "blog-expresso-do-oriente.html", oldImg: "paris_cafe.png", newImg: "blog_orient_express.png" },
    { file: "blog-balao-capadocia.html", oldImg: "machu_picchu.png", newImg: "blog_capadocia.png" },
    { file: "blog-rota-da-seda-uzbequistao.html", oldImg: "egito.png", newImg: "blog_uzbequistao.png" }
];

// Update individual pages
for (let m of mappings) {
    let filePath = path.join(publicDir, m.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace the background-image URL
        content = content.replace(m.oldImg, m.newImg);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${m.file}`);
    }
}

// Update blog.html
let blogPath = path.join(publicDir, 'blog.html');
if (fs.existsSync(blogPath)) {
    let blogContent = fs.readFileSync(blogPath, 'utf8');
    
    for (let m of mappings) {
        // We know the structure is: <a href="blog-xxx.html" ...> ... <img src="oldImg" ...> 
        // We can do a string replacement targeting the block. But the simplest way is a regex that finds the img src between the href and the closing </a>.
        
        const regexStr = `href="${m.file}"[\\s\\S]*?src="${m.oldImg}"`;
        const regex = new RegExp(regexStr, 'g');
        blogContent = blogContent.replace(regex, (match) => {
            return match.replace(`src="${m.oldImg}"`, `src="${m.newImg}"`);
        });
    }
    fs.writeFileSync(blogPath, blogContent, 'utf8');
    console.log(`Updated blog.html`);
}
