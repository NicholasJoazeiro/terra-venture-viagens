const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..');
const destinosHtmlPath = path.join(publicDir, 'destinos.html');
let html = fs.readFileSync(destinosHtmlPath, 'utf8');

// 1. Fix the Hero Section
const heroP = '<p class="section-desc">Uma seleção cuidadosa dos destinos mais incríveis do planeta, desenhada para viajantes que buscam autenticidade e luxo.</p>';
const validHeroEnd = '\n            </div>\n        </div>\n    </section>';

const heroPIndex = html.indexOf(heroP);
const gridSectionStart = html.indexOf('\n    <!-- Destinos Grid & Filters -->');

if (heroPIndex !== -1 && gridSectionStart !== -1) {
    const extractedCardsBlock = html.substring(heroPIndex + heroP.length, gridSectionStart);
    // The extracted block contains the wrong injection. We will delete it from here.
    const cleanHtmlTop = html.substring(0, heroPIndex + heroP.length) + validHeroEnd;
    const cleanHtmlBottom = html.substring(gridSectionStart);
    
    html = cleanHtmlTop + cleanHtmlBottom;
    
    // Check if we captured the cards in extractedCardsBlock
    // It should contain '<!-- 15 New Destinations -->'
    if (extractedCardsBlock.includes('<!-- 15 New Destinations -->')) {
        // Let's strip the closing tags from the top of the block since they belonged to hero
        // The block looks like: "\n\n                <!-- 15 New Destinations -->... " followed by "            </div>\n        </div>\n    </section>"
        
        let justCards = extractedCardsBlock;
        const endOfCardsIndex = justCards.lastIndexOf('</div>');
        // Let's just cleanly extract all '<!-- 15 New Destinations -->' to the last '</a>\n                </div>'
        const firstCardPos = justCards.indexOf('<!-- 15 New Destinations -->');
        const lastCardPos = justCards.lastIndexOf('</a>\n                </div>') + 27; // length of '</a>\n                </div>'
        
        if (firstCardPos !== -1 && lastCardPos !== -1) {
            const pureCards = justCards.substring(firstCardPos, lastCardPos);
            
            // 2. Append to the true grid end
            // The grid ends after '<!-- 10. Egito -->'
            const egitoMarker = '<!-- 10. Egito -->';
            const egitoIndex = html.indexOf(egitoMarker);
            
            // After Egito, we look for the grid closing tags '            </div>\n        </div>\n    </section>'
            const nextGridEnd = html.indexOf('            </div>\n        </div>\n    </section>', egitoIndex);
            
            if (nextGridEnd !== -1) {
                html = html.substring(0, nextGridEnd) + "\n" + pureCards + "\n" + html.substring(nextGridEnd);
                fs.writeFileSync(destinosHtmlPath, html, 'utf8');
                console.log("DOM Surgery complete: Hero restored, Cards moved to true grid!");
            } else {
                console.log("Could not find the end of the true grid.");
            }
        } else {
             console.log("Could not parse the pure cards out of the hero section.");
        }
    } else {
        console.log("No wrong injection found in hero section!");
    }
} else {
    console.log("Could not find hero or grid section anchors.");
}
