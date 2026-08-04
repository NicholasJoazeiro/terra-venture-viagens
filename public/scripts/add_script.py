import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'script.js' not in content:
        print(f"Adding script.js to {file}")
        content = content.replace('</body>', '<script src="script.js"></script>\n</body>')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
