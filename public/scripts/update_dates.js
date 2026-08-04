const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\nberj\\.gemini\\antigravity\\scratch\\Terra Venture\\public';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /(<i class="far fa-calendar-alt"><\/i>\s*)([^<]+)(<\/span>)/g;
const newDateString = '20 de Março, 2026';

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const oldContent = content;
    
    content = content.replace(regex, `$1${newDateString}$3`);
    
    if (content !== oldContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
    }
});

console.log(`Datas alteradas com sucesso em ${count} arquivos.`);
