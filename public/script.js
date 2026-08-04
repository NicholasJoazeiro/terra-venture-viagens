/**
 * TERRA VENTURE - MAIN SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. STICKY NAVBAR & GLASSMORPHISM
       ========================================================================= */
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initial check and event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    /* =========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times (close)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* =========================================================================
       3. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================================================
       4. PARALLAX EFFECT
       ========================================================================= */
    const parallaxImages = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            parallaxImages.forEach(img => {
                const scrolled = window.scrollY;
                // Ajuste a velocidade moderada (0.2)
                const val = scrolled * 0.15;
                if (val < 100) {
                    img.style.transform = `translateY(${val}px)`;
                }
            });
        });
    });



    /* =========================================================================
       6. FORM SUBMISSION → WHATSAPP
       ========================================================================= */
    const briefingForm = document.getElementById('briefingForm');
    if (briefingForm) {
        briefingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = briefingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Coleta os dados do formulário
            const nome = document.getElementById('name').value.trim();
            const telefone = document.getElementById('phone').value.trim();
            const destino = document.getElementById('destination').value.trim() || 'Não informado';
            const mensagem = document.getElementById('message').value.trim();

            // Monta a mensagem formatada para WhatsApp
            const texto = `🌍 *Nova Solicitação — Terra Venture*\n\n` +
                `👤 *Nome:* ${nome}\n` +
                `📱 *WhatsApp:* ${telefone}\n` +
                `✈️ *Destino desejado:* ${destino}\n` +
                `💬 *Sobre a ocasião:*\n${mensagem}`;

            // Número da Terra Venture (já cadastrado no site)
            const numero = '5551994596233';
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            // Feedback visual antes de redirecionar
            btn.innerHTML = '<i class="fas fa-check"></i> Redirecionando ao WhatsApp...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                window.open(url, '_blank');
                briefingForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                }, 3000);
            }, 800);
        });
    }

    /* =========================================================================
       7. EXPLORADOR GLOBAL INTERATIVO (MAPA)
       ========================================================================= */
    const mapContainer = document.getElementById('map-main');
    if (mapContainer) {
        // Inicializa o Mapa
        const map = L.map('map-main', {
            center: [20, 10],
            zoom: 2,
            minZoom: 2,
            zoomControl: false, // Usamos controles customizados
            attributionControl: true
        });

        // Camada de Tiles (CartoDB Dark Matter para visual mais escuro)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        // Dados dos Destinos
        const destinations = [
            {
                name: "Patagônia",
                coords: [-51.3411, -72.6936],
                url: "patagonia.html",
                image: "patagonia-torres-del-paine.jpg",
                countryIds: ["CHL", "ARG"]
            },
            {
                name: "Santiago",
                coords: [-33.4489, -70.6693],
                url: "santiago.html",
                image: "dest_santiago_skycostanera.jpg",
                countryIds: ["CHL"]
            },
            {
                name: "Paris Secreta",
                coords: [48.8566, 2.3522],
                url: "paris.html",
                image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
                countryIds: ["FRA"]
            },
            {
                name: "Japão Clássico",
                coords: [35.6895, 139.6917],
                url: "japao.html",
                image: "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800",
                countryIds: ["JPN"]
            },
            {
                name: "Islândia",
                coords: [64.9631, -19.0208],
                url: "islandia.html",
                image: "islandia.png",
                countryIds: ["ISL"]
            },
            {
                name: "Safari na Tanzânia",
                coords: [-6.3690, 34.8888],
                url: "tanzania.html",
                image: "tanzania.png",
                countryIds: ["TZA"]
            },
            {
                name: "Machu Picchu",
                coords: [-13.1631, -72.5450],
                url: "machu-picchu.html",
                image: "machu_picchu.png",
                countryIds: ["PER"]
            },
            {
                name: "Costa Amalfitana",
                coords: [40.6333, 14.6000],
                url: "costa-amalfitana.html",
                image: "costa_amalfitana.png",
                countryIds: ["ITA"]
            },
            {
                name: "Nova Zelândia",
                coords: [-43.8967, 170.5222],
                url: "nova-zelandia.html",
                image: "nova_zelandia.png",
                countryIds: ["NZL"]
            },
            {
                name: "Egito Histórico",
                coords: [26.8206, 30.8025],
                url: "egito.html",
                image: "egito.png",
                countryIds: ["EGY"]
            }            ,{
                name: "Bali",
                coords: [-8.4095, 115.1889],
                url: "bali.html",
                image: "blog_bali.png",
                countryIds: ["IDN"]
            }
            ,{
                name: "Santorini",
                coords: [36.3932, 25.4615],
                url: "santorini.html",
                image: "blog_santorini.png",
                countryIds: ["GRC"]
            }
            ,{
                name: "Alpes Suíços",
                coords: [46.8182, 8.2275],
                url: "alpes-suicos.html",
                image: "dest_alpes.jpg",
                countryIds: ["CHE"]
            }
            ,{
                name: "Bora Bora",
                coords: [-16.5004, -151.7415],
                url: "bora-bora.html",
                image: "blog_bora_bora.png",
                countryIds: ["PYF"]
            }
            ,{
                name: "Marrakech",
                coords: [31.6295, -7.9811],
                url: "marrakech.html",
                image: "dest_marrakech.jpg",
                countryIds: ["MAR"]
            }
            ,{
                name: "Banff",
                coords: [51.1784, -115.5708],
                url: "banff.html",
                image: "patagonia_glaciar.png",
                countryIds: ["CAN"]
            }
            ,{
                name: "Petra",
                coords: [30.3285, 35.4444],
                url: "petra.html",
                image: "dest_petra.jpg",
                countryIds: ["JOR"]
            }
            ,{
                name: "Deserto do Atacama",
                coords: [-23.8634, -69.1328],
                url: "atacama.html",
                image: "blog_atacama.png",
                countryIds: ["CHL"]
            }
            ,{
                name: "Courchevel",
                coords: [45.4146, 6.6338],
                url: "courchevel.html",
                image: "blog_courchevel.png",
                countryIds: ["FRA"]
            }
            ,{
                name: "Ilhas Maldivas",
                coords: [3.2028, 73.2207],
                url: "maldivas.html",
                image: "blog_maldivas.png",
                countryIds: ["MDV"]
            }
            ,{
                name: "Capadócia",
                coords: [38.6431, 34.828],
                url: "capadocia.html",
                image: "blog_capadocia.png",
                countryIds: ["TUR"]
            }
            ,{
                name: "Uzbequistão",
                coords: [41.3775, 64.5853],
                url: "uzbequistao.html",
                image: "blog_uzbequistao.png",
                countryIds: ["UZB"]
            }
            ,{
                name: "Ilha de Páscoa",
                coords: [-27.1127, -109.3667],
                url: "ilha-de-pascoa.html",
                image: "dest_pascoa.jpg",
                countryIds: ["CHL"]
            }
            ,{
                name: "Fernando de Noronha",
                coords: [-3.8403, -32.4297],
                url: "noronha.html",
                image: "blog_noronha.png",
                countryIds: ["BRA"]
            }
            ,{
                name: "Dolomitas",
                coords: [46.4333, 11.8333],
                url: "dolomitas.html",
                image: "dest_dolomitas.jpg",
                countryIds: ["ITA"]
            }

        ];

        const previewCard = document.getElementById('map-preview');
        const previewTitle = previewCard ? previewCard.querySelector('.preview-title') || document.getElementById('preview-title') : null;

        // Ícone Customizado (Círculo Minimalista)
        const customIcon = L.divIcon({
            className: 'custom-marker',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        // Adiciona Marcadores
        destinations.forEach(dest => {
            const marker = L.marker(dest.coords, { icon: customIcon }).addTo(map);

            marker.on('mouseover', (e) => showPreview(dest, e.originalEvent));
            marker.on('mousemove', (e) => movePreview(e.originalEvent));
            marker.on('mouseout', hidePreview);
            marker.on('click', () => window.location.href = dest.url);
        });

        // Controles de Zoom Customizados
        document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());

        // Carrega GeoJSON para Destaque de Países
        fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
            .then(res => res.json())
            .then(data => {
                L.geoJSON(data, {
                    style: (feature) => {
                        const isActive = destinations.some(d => d.countryIds.includes(feature.id) || d.countryIds.includes(feature.properties.ISO_A3));
                        return {
                            fillColor: isActive ? 'var(--color-terra)' : 'transparent',
                            weight: isActive ? 2 : 0,
                            opacity: 1,
                            color: 'var(--color-terra)',
                            fillOpacity: 0.15
                        };
                    },
                    onEachFeature: (feature, layer) => {
                        const dest = destinations.find(d => d.countryIds.includes(feature.id) || d.countryIds.includes(feature.properties.ISO_A3));
                        if (dest) {
                            layer.on({
                                mouseover: (e) => {
                                    layer.setStyle({ fillOpacity: 0.4 });
                                    showPreview(dest, e.originalEvent);
                                },
                                mouseout: (e) => {
                                    layer.setStyle({ fillOpacity: 0.15 });
                                    hidePreview();
                                },
                                mousemove: (e) => movePreview(e.originalEvent),
                                click: () => window.location.href = dest.url
                            });
                        }
                    }
                }).addTo(map);
            });

        // Funções do Preview Card
        function showPreview(dest, event) {
            previewTitle.textContent = dest.name;
            previewCard.style.backgroundImage = `url('${dest.image}')`;
            previewCard.classList.add('active');
            movePreview(event);
        }

        function movePreview(event) {
            const cardWidth = 300;
            const cardHeight = 180;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Se o mouse estiver na metade direita, mostra o card à esquerda do cursor
            let xOffset = 15;
            if (event.clientX > windowWidth / 2) {
                xOffset = -(cardWidth + 15);
            }

            let finalX = event.clientX + xOffset;
            let finalY = event.clientY + 15;

            // Ajuste simples para não sair da tela (Y)
            if (finalY + cardHeight > windowHeight) {
                finalY = event.clientY - cardHeight - 15;
            }

            previewCard.style.left = `${finalX}px`;
            previewCard.style.top = `${finalY}px`;
        }

        function hidePreview() {
            previewCard.classList.remove('active');
        }
    }

    /* =========================================================================
       8. FAQ ACCORDION
       ========================================================================= */
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Fecha todos os outros itens
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Abre o item clicado (se não estava ativo)
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    /* =========================================================================
       9. FILTRO POR VIBE (home destinos)
       ========================================================================= */
    const vibeChips = document.querySelectorAll('.vibe-chip');
    const vibeCards = document.querySelectorAll('.dossie-row[data-vibe]');

    if (vibeChips.length && vibeCards.length) {
        vibeChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const vibe = chip.dataset.vibe;

                vibeChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                vibeCards.forEach(card => {
                    const cardVibes = (card.dataset.vibe || '').split(' ');
                    const show = vibe === 'todos' || cardVibes.includes(vibe);
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    /* =========================================================================
       10. META PIXEL — evento Lead no clique dos botões WhatsApp
       ========================================================================= */
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        });
    });

    /* =========================================================================
       11. QUIZ "DESCUBRA SEU DESTINO"
       ========================================================================= */
    const quizBox = document.querySelector('.quiz-box');
    if (quizBox) {
        // Curadoria de destinos. vibes: sossego|aventura|cultura|romance|praia
        const QUIZ_DESTINOS = [
            { name: 'Patagônia', tag: 'Argentina & Chile', url: 'patagonia.html', img: 'patagonia-torres-del-paine.jpg', cont: 'america', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Machu Picchu', tag: 'Peru', url: 'machu-picchu.html', img: 'machu_picchu.png', cont: 'america', vibes: ['aventura', 'cultura'], ritmo: 'intenso' },
            { name: 'Deserto do Atacama', tag: 'Chile', url: 'atacama.html', img: 'blog_atacama.png', cont: 'america', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Santiago', tag: 'Chile', url: 'santiago.html', img: 'dest_santiago_skycostanera.jpg', cont: 'america', vibes: ['cultura'], ritmo: 'equilibrado' },
            { name: 'Fernando de Noronha', tag: 'Brasil', url: 'noronha.html', img: 'blog_noronha.png', cont: 'america', vibes: ['praia', 'sossego'], ritmo: 'relax' },
            { name: 'Paris Secreta', tag: 'França', url: 'paris.html', img: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800', cont: 'europa', vibes: ['cultura', 'romance'], ritmo: 'equilibrado' },
            { name: 'Costa Amalfitana', tag: 'Itália', url: 'costa-amalfitana.html', img: 'costa_amalfitana.png', cont: 'europa', vibes: ['praia', 'romance'], ritmo: 'relax' },
            { name: 'Santorini', tag: 'Grécia', url: 'santorini.html', img: 'blog_santorini.png', cont: 'europa', vibes: ['praia', 'romance', 'sossego'], ritmo: 'relax' },
            { name: 'Islândia', tag: 'Terra do Gelo e Fogo', url: 'islandia.html', img: 'islandia.png', cont: 'europa', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Japão Clássico', tag: 'Japão', url: 'japao.html', img: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800', cont: 'asia', vibes: ['cultura'], ritmo: 'equilibrado' },
            { name: 'Bali', tag: 'Indonésia', url: 'bali.html', img: 'blog_bali.png', cont: 'asia', vibes: ['praia', 'sossego', 'romance'], ritmo: 'relax' },
            { name: 'Ilhas Maldivas', tag: 'Maldivas', url: 'maldivas.html', img: 'blog_maldivas.png', cont: 'asia', vibes: ['praia', 'sossego', 'romance'], ritmo: 'relax' },
            { name: 'Capadócia', tag: 'Turquia', url: 'capadocia.html', img: 'blog_capadocia.png', cont: 'asia', vibes: ['aventura', 'cultura', 'romance'], ritmo: 'equilibrado' },
            { name: 'Safari na Tanzânia', tag: 'Tanzânia', url: 'tanzania.html', img: 'tanzania.png', cont: 'africa', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Egito Histórico', tag: 'Egito', url: 'egito.html', img: 'egito.png', cont: 'africa', vibes: ['cultura'], ritmo: 'equilibrado' },
            { name: 'Nova Zelândia', tag: 'Nova Zelândia', url: 'nova-zelandia.html', img: 'nova_zelandia.png', cont: 'oceania', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Bora Bora', tag: 'Polinésia Francesa', url: 'bora-bora.html', img: 'blog_bora_bora.png', cont: 'oceania', vibes: ['praia', 'sossego', 'romance'], ritmo: 'relax' },
            { name: 'Seychelles', tag: 'Seychelles', url: 'seychelles.html', img: 'dest_seychelles.jpg', cont: 'africa', vibes: ['praia', 'sossego', 'romance'], ritmo: 'relax' },
            { name: 'Cidade do Cabo', tag: 'África do Sul', url: 'cidade-do-cabo.html', img: 'dest_capetown.jpg', cont: 'africa', vibes: ['cultura', 'aventura'], ritmo: 'equilibrado' },
            { name: 'Ruanda', tag: 'Ruanda', url: 'ruanda.html', img: 'dest_ruanda.jpg', cont: 'africa', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Namíbia', tag: 'Namíbia', url: 'namibia.html', img: 'dest_namibia.jpg', cont: 'africa', vibes: ['aventura', 'sossego'], ritmo: 'intenso' },
            { name: 'Vietnã', tag: 'Vietnã', url: 'vietna.html', img: 'dest_halong.jpg', cont: 'asia', vibes: ['romance', 'cultura', 'sossego'], ritmo: 'equilibrado' },
            { name: 'Índia', tag: 'Índia', url: 'india.html', img: 'dest_india.jpg', cont: 'asia', vibes: ['cultura'], ritmo: 'intenso' },
            { name: 'Sri Lanka', tag: 'Sri Lanka', url: 'sri-lanka.html', img: 'dest_srilanka.jpg', cont: 'asia', vibes: ['aventura', 'sossego'], ritmo: 'equilibrado' },
            { name: 'Lapônia Finlandesa', tag: 'Finlândia', url: 'laponia.html', img: 'dest_laponia.jpg', cont: 'europa', vibes: ['aventura', 'sossego', 'romance'], ritmo: 'equilibrado' },
            { name: 'Antártida', tag: 'Antártida', url: 'antartida.html', img: 'dest_antartida.jpg', cont: 'oceania', vibes: ['aventura'], ritmo: 'intenso' },
            { name: 'Grande Barreira de Coral', tag: 'Austrália', url: 'grande-barreira-de-coral.html', img: 'dest_australia.jpg', cont: 'oceania', vibes: ['praia', 'sossego', 'aventura'], ritmo: 'relax' }
        ];

        const answers = { vibe: null, cont: null, ritmo: null };
        const steps = quizBox.querySelectorAll('.quiz-step');
        const bar = document.getElementById('quiz-bar');
        const backBtn = document.getElementById('quiz-back');
        const curEl = document.getElementById('quiz-cur');
        const nav = quizBox.querySelector('.quiz-nav');
        let current = 1; // 1..3, depois "result"

        const showStep = (stepId) => {
            steps.forEach(s => s.classList.toggle('active', s.dataset.step === String(stepId)));
            if (stepId === 'result') {
                bar.style.width = '100%';
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                bar.style.width = (stepId / 3 * 100) + '%';
                curEl.textContent = stepId;
                backBtn.style.visibility = stepId > 1 ? 'visible' : 'hidden';
            }
        };

        // Relevância dentro da vibe: continente exato pesa mais, depois ritmo
        const rankDestino = (d) => {
            let s = 0;
            if (answers.cont && answers.cont !== 'qualquer' && d.cont === answers.cont) s += 2;
            if (answers.ritmo && d.ritmo === answers.ritmo) s += 1;
            return s;
        };

        const renderResult = () => {
            const wantCont = answers.cont && answers.cont !== 'qualquer';

            // 1) Filtra pela VIBE escolhida (intenção principal), ranqueia por continente/ritmo
            let pool = QUIZ_DESTINOS.filter(d => d.vibes.includes(answers.vibe));
            pool.sort((a, b) => rankDestino(b) - rankDestino(a));

            // 2) Garante pelo menos 1 do continente escolhido (se existir algum)
            if (wantCont && !pool.some(d => d.cont === answers.cont)) {
                const doCont = QUIZ_DESTINOS
                    .filter(d => d.cont === answers.cont && !pool.includes(d))
                    .sort((a, b) => (b.ritmo === answers.ritmo) - (a.ritmo === answers.ritmo));
                if (doCont.length) pool.unshift(doCont[0]);
            }

            // 3) Completa até 3 com os mais próximos (prioriza mesmo continente/ritmo)
            if (pool.length < 3) {
                const extra = QUIZ_DESTINOS
                    .filter(d => !pool.includes(d))
                    .sort((a, b) => rankDestino(b) - rankDestino(a));
                pool = pool.concat(extra);
            }

            const top = pool.slice(0, 3);

            const matchesEl = document.getElementById('quiz-matches');
            matchesEl.innerHTML = top.map((d, i) => `
                <a class="quiz-match" href="${d.url}" style="animation-delay:${i * 0.12}s">
                    <img loading="lazy" decoding="async" src="${d.img}" alt="${d.name}">
                    <span class="quiz-match-ov">
                        <span class="quiz-match-name">${d.name}</span>
                        <span class="quiz-match-tag">${d.tag}</span>
                    </span>
                </a>`).join('');

            const cta = document.getElementById('quiz-cta');
            const first = top[0] ? top[0].name : 'uma viagem';
            const msg = `Olá! Fiz o quiz no site e curti ${first}. Quero um roteiro com vibe ${answers.vibe}, ritmo ${answers.ritmo}. Podem me ajudar a montar?`;
            cta.href = `https://wa.me/5551994596233?text=${encodeURIComponent(msg)}`;

            showStep('result');
            if (typeof fbq === 'function') {
                fbq('trackCustom', 'QuizConcluido', { vibe: answers.vibe, continente: answers.cont, ritmo: answers.ritmo });
            }
        };

        // Clique nas opções -> grava resposta e avança
        quizBox.querySelectorAll('.quiz-opt').forEach(opt => {
            opt.addEventListener('click', () => {
                const key = opt.dataset.key;
                answers[key] = opt.dataset.value;

                // marca selecionado no passo
                const parentStep = opt.closest('.quiz-step');
                parentStep.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');

                setTimeout(() => {
                    if (current < 3) {
                        current++;
                        showStep(current);
                    } else {
                        renderResult();
                    }
                }, 220);
            });
        });

        backBtn.addEventListener('click', () => {
            if (current > 1) {
                current--;
                showStep(current);
            }
        });

        // Lead no clique do CTA do quiz (href setado dinamicamente)
        document.getElementById('quiz-cta').addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        });

        document.getElementById('quiz-restart').addEventListener('click', () => {
            answers.vibe = answers.cont = answers.ritmo = null;
            current = 1;
            quizBox.querySelectorAll('.quiz-opt.selected').forEach(o => o.classList.remove('selected'));
            showStep(1);
        });
    }

    /* =========================================================================
       12. TILT 3D NOS CARDS DE DESTINO (só desktop com hover real)
       ========================================================================= */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.destino-card');
        const MAX = 7; // graus

        tiltCards.forEach(card => {
            card.style.transition = 'transform 0.15s ease-out';

            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;   // 0..1
                const py = (e.clientY - r.top) / r.height;   // 0..1
                const ry = (px - 0.5) * (MAX * 2);           // rotateY
                const rx = (0.5 - py) * (MAX * 2);           // rotateX
                card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});

/* =========================================================================
   BLOCO 13 — Barra de progresso de leitura
   Fina, no topo, some quando não há o que rolar.
   ========================================================================= */
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bar = document.createElement('div');
    bar.className = 'read-progress';
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(bar));

    let ticking = false;
    function update() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
        bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
})();
