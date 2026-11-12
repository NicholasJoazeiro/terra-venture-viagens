/**
 * TERRA VENTURE - MAIN SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================================
       0. EVENTOS DE CONVERSÃO
       =========================================================================
       A conversao do site e o clique no WhatsApp. Tudo aqui escreve em
       dataLayer (serve ao GTM) e tambem chama gtag() direto, se existir, para
       funcionar com GA4 sem GTM. Se nenhum dos dois estiver instalado, nada
       quebra: as funcoes somem sozinhas.

       TODO(nicholas): falta o ID do GA4 (G-XXXXXXX) ou do GTM (GTM-XXXXXXX)
       no <head> das paginas. Os eventos abaixo ja estao prontos para ele.
       ========================================================================= */
    window.dataLayer = window.dataLayer || [];

    function evento(nome, dados) {
        const carga = Object.assign({
            page_path: location.pathname,
            page_location: location.href,
        }, dados || {});
        window.dataLayer.push(Object.assign({ event: nome }, carga));
        if (typeof window.gtag === 'function') window.gtag('event', nome, carga);
    }

    // de onde na pagina o clique saiu, para separar o que converte do que nao
    function ondeEstou(el) {
        if (el.closest('.whatsapp-float')) return 'botao-flutuante';
        if (el.closest('.navbar')) return 'menu';
        if (el.closest('footer')) return 'rodape';
        if (el.closest('.hero, .page-hero, .epoca-hero')) return 'hero';
        if (el.closest('#briefing')) return 'briefing';
        if (el.closest('.contato')) return 'formulario';
        if (el.closest('.article-content, .artigo-cta')) return 'artigo';
        const sec = el.closest('section');
        if (sec) return (sec.id || sec.className.split(' ')[0] || 'secao');
        return 'outro';
    }

    // um ouvinte so, na captura, pega todo link wa.me que existir ou vier a
    // existir na pagina. Nao precisa religar nada quando o DOM muda.
    document.addEventListener('click', function (e) {
        const a = e.target.closest && e.target.closest('a[href*="wa.me"]');
        if (!a) return;
        evento('whatsapp_click', {
            link_location: ondeEstou(a),
            destination: document.body.dataset.destino || undefined,
            link_url: a.getAttribute('href'),
        });
        if (typeof fbq === 'function') fbq('track', 'Contact');
    }, true);

    // UTM e fbclid: sem isso a origem da visita morre no primeiro clique
    // interno, e a campanha aparece no relatorio como trafego direto.
    (function propagarOrigem() {
        const CHAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
        const atual = new URLSearchParams(location.search);
        let guardado = {};
        try { guardado = JSON.parse(sessionStorage.getItem('tv_origem') || '{}'); } catch (err) { guardado = {}; }
        let mudou = false;
        CHAVES.forEach(k => { if (atual.has(k)) { guardado[k] = atual.get(k); mudou = true; } });
        if (mudou) { try { sessionStorage.setItem('tv_origem', JSON.stringify(guardado)); } catch (err) { /* modo privado */ } }
        const chaves = Object.keys(guardado);
        if (!chaves.length) return;
        document.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (!href || /^(#|mailto:|tel:)/.test(href)) return;
            let u;
            try { u = new URL(href, location.href); } catch (err) { return; }
            if (u.origin !== location.origin) return;          // so link interno
            chaves.forEach(k => { if (!u.searchParams.has(k)) u.searchParams.set(k, guardado[k]); });
            a.setAttribute('href', u.pathname + u.search + u.hash);
        });
    })();


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
    // Lista unica de alvos. Ela tambem existe no terra.css, nas duas regras que
    // escondem e revelam; se mudar aqui, mudar la.
    const ALVOS_REVEAL = '.section-header, .processo-passo, .diferencial-card, .dossie-row, .serv-card, .serv-passo, .epoca-card, .testimonial-card, .depo-destaque, .comunidade-item, .faq-item, .blog-card, .dest-card, .cruz-temporada, .quem-somos-img, .quem-somos-text';
    const LEGADO = '.scroll-reveal';
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function revelar(el) {
        el.classList.add(el.matches(LEGADO) ? 'active' : 'revelado');
    }
    function aindaEscondidos() {
        return [
            ...document.querySelectorAll(ALVOS_REVEAL + ':not(.revelado)'),
            ...document.querySelectorAll(LEGADO + ':not(.active)'),
        ];
    }

    if (semMovimento) {
        // quem pediu menos movimento ve a pagina inteira de uma vez
        aindaEscondidos().forEach(revelar);
    } else {
        // escalona o atraso dentro de cada grupo, para os cards entrarem em cascata
        document.querySelectorAll(ALVOS_REVEAL).forEach(el => {
            const irmaos = el.parentElement
                ? [...el.parentElement.children].filter(x => x.matches(ALVOS_REVEAL)) : [];
            const i = irmaos.indexOf(el);
            if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
        });

        const observador = new IntersectionObserver((entradas, o) => {
            entradas.forEach(e => {
                if (!e.isIntersecting) return;
                revelar(e.target);
                o.unobserve(e.target);
            });
        }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0 });
        aindaEscondidos().forEach(el => observador.observe(el));

        // Varredura: revela tudo que ja cruzou a linha de baixo da tela. E ela
        // que garante que rolagem rapida nao deixe buraco, porque nao depende
        // do lote do observer chegar a tempo.
        let agendado = false;
        function varrer() {
            agendado = false;
            const limite = window.innerHeight + 120;
            for (const el of aindaEscondidos()) {
                if (el.getBoundingClientRect().top < limite) revelar(el);
            }
        }
        function agendarVarredura() {
            if (agendado) return;
            agendado = true;
            requestAnimationFrame(varrer);
        }
        window.addEventListener('scroll', agendarVarredura, { passive: true });
        window.addEventListener('resize', agendarVarredura, { passive: true });
        varrer();

        // Rede de seguranca: se em 2,5s ainda houver algo escondido acima do fim
        // da pagina, revela. Perde-se a animacao, nunca o conteudo.
        setTimeout(() => {
            if (aindaEscondidos().length) varrer();
        }, 2500);
    }

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
            const texto = [
                'Olá! Mandei uma mensagem pelo formulário do site.',
                '',
                'Nome: ' + nome,
                'WhatsApp: ' + telefone,
                'Destino desejado: ' + destino,
                'Sobre a ocasião: ' + mensagem,
            ].join('\n');

            // Número da Terra Venture (já cadastrado no site)
            const numero = '5551994596233';
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            // Feedback visual antes de redirecionar
            btn.innerHTML = '<i class="fas fa-check"></i> Redirecionando ao WhatsApp...';
            btn.style.opacity = '0.8';

            evento('formulario_enviado', { link_location: 'formulario' });
            if (typeof fbq === 'function') fbq('track', 'Lead');

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

        // Tiles do OpenStreetMap: livres e sem chave de API. A CARTO passou a
        // exigir chave nos basemaps dela e as telas vinham com marca d'agua
        // 'API KEY REQUIRED'. O visual escuro da marca volta por filtro CSS
        // em .leaflet-tile-pane, nao pelo provedor.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; colaboradores do OpenStreetMap'
        }).addTo(map);

        // Dados dos Destinos
        const destinations = [
            {
                name: "Patagônia",
                coords: [-51.3411, -72.6936],
                url: "/patagonia",
                image: "patagonia-torres-del-paine.webp",
                countryIds: ["CHL", "ARG"]
            },
            {
                name: "Santiago",
                coords: [-33.4489, -70.6693],
                url: "/santiago",
                image: "dest_santiago_skycostanera.webp",
                countryIds: ["CHL"]
            },
            {
                name: "Paris Secreta",
                coords: [48.8566, 2.3522],
                url: "/paris",
                image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
                countryIds: ["FRA"]
            },
            {
                name: "Japão Clássico",
                coords: [35.6895, 139.6917],
                url: "/japao",
                image: "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=800",
                countryIds: ["JPN"]
            },
            {
                name: "Islândia",
                coords: [64.9631, -19.0208],
                url: "/islandia",
                image: "islandia.webp",
                countryIds: ["ISL"]
            },
            {
                name: "Safari na Tanzânia",
                coords: [-6.3690, 34.8888],
                url: "/tanzania",
                image: "tanzania.webp",
                countryIds: ["TZA"]
            },
            {
                name: "Machu Picchu",
                coords: [-13.1631, -72.5450],
                url: "/machu-picchu",
                image: "machu_picchu.webp",
                countryIds: ["PER"]
            },
            {
                name: "Costa Amalfitana",
                coords: [40.6333, 14.6000],
                url: "/costa-amalfitana",
                image: "costa_amalfitana.webp",
                countryIds: ["ITA"]
            },
            {
                name: "Nova Zelândia",
                coords: [-43.8967, 170.5222],
                url: "/nova-zelandia",
                image: "nova_zelandia.webp",
                countryIds: ["NZL"]
            },
            {
                name: "Egito Histórico",
                coords: [26.8206, 30.8025],
                url: "/egito",
                image: "egito.webp",
                countryIds: ["EGY"]
            }            ,{
                name: "Bali",
                coords: [-8.4095, 115.1889],
                url: "/bali",
                image: "blog_bali.webp",
                countryIds: ["IDN"]
            }
            ,{
                name: "Santorini",
                coords: [36.3932, 25.4615],
                url: "/santorini",
                image: "blog_santorini.webp",
                countryIds: ["GRC"]
            }
            ,{
                name: "Alpes Suíços",
                coords: [46.8182, 8.2275],
                url: "/alpes-suicos",
                image: "dest_alpes.webp",
                countryIds: ["CHE"]
            }
            ,{
                name: "Bora Bora",
                coords: [-16.5004, -151.7415],
                url: "/bora-bora",
                image: "blog_bora_bora.webp",
                countryIds: ["PYF"]
            }
            ,{
                name: "Marrakech",
                coords: [31.6295, -7.9811],
                url: "/marrakech",
                image: "dest_marrakech.webp",
                countryIds: ["MAR"]
            }
            ,{
                name: "Banff",
                coords: [51.1784, -115.5708],
                url: "/banff",
                image: "patagonia_glaciar.webp",
                countryIds: ["CAN"]
            }
            ,{
                name: "Petra",
                coords: [30.3285, 35.4444],
                url: "/petra",
                image: "dest_petra.webp",
                countryIds: ["JOR"]
            }
            ,{
                name: "Deserto do Atacama",
                coords: [-23.8634, -69.1328],
                url: "/atacama",
                image: "blog_atacama.webp",
                countryIds: ["CHL"]
            }
            ,{
                name: "Courchevel",
                coords: [45.4146, 6.6338],
                url: "/courchevel",
                image: "blog_courchevel.webp",
                countryIds: ["FRA"]
            }
            ,{
                name: "Ilhas Maldivas",
                coords: [3.2028, 73.2207],
                url: "/maldivas",
                image: "blog_maldivas.webp",
                countryIds: ["MDV"]
            }
            ,{
                name: "Capadócia",
                coords: [38.6431, 34.828],
                url: "/capadocia",
                image: "blog_capadocia.webp",
                countryIds: ["TUR"]
            }
            ,{
                name: "Uzbequistão",
                coords: [41.3775, 64.5853],
                url: "/uzbequistao",
                image: "blog_uzbequistao.webp",
                countryIds: ["UZB"]
            }
            ,{
                name: "Ilha de Páscoa",
                coords: [-27.1127, -109.3667],
                url: "/ilha-de-pascoa",
                image: "dest_pascoa.webp",
                countryIds: ["CHL"]
            }
            ,{
                name: "Fernando de Noronha",
                coords: [-3.8403, -32.4297],
                url: "/noronha",
                image: "blog_noronha.webp",
                countryIds: ["BRA"]
            }
            ,{
                name: "Dolomitas",
                coords: [46.4333, 11.8333],
                url: "/dolomitas",
                image: "dest_dolomitas.webp",
                countryIds: ["ITA"]
            }

        ];

        const previewCard = document.getElementById('map-preview');
        const previewTitle = previewCard ? previewCard.querySelector('.preview-title') || document.getElementById('preview-title') : null;

        // Ícone Customizado (Círculo Minimalista)
        const customIcon = L.divIcon({
            className: 'custom-marker',
            iconSize: [26, 26],
            iconAnchor: [7, 7]
        });

        // Adiciona Marcadores
        destinations.forEach(dest => {
            // o marcador e clicavel e navegavel por teclado, entao precisa de nome.
            // Sem isso o leitor de tela anuncia 25 botoes chamados "botao".
            const marker = L.marker(dest.coords, {
                icon: customIcon,
                alt: dest.name,
                keyboard: true,
                title: dest.name,
            }).addTo(map);
            const el = marker.getElement();
            if (el) el.setAttribute('aria-label', 'Abrir o dossiê de ' + dest.name);

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

                vibeChips.forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-pressed', 'false');
                });
                chip.setAttribute('aria-pressed', 'true');
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
       10. (removido) Lead em todo clique de WhatsApp
       =========================================================================
       Havia aqui um segundo ouvinte que disparava Lead em cada link wa.me.
       Somado ao Contact do ouvinte delegado la em cima, o mesmo clique
       contava duas vezes e toda conversa iniciada virava lead fechado no
       relatorio. Lead agora so sai do briefing e do formulario longo.
       ========================================================================= */

    /* =========================================================================
       11. BRIEFING "CONTE O BÁSICO EM 30 SEGUNDOS"
       =========================================================================
       Cinco perguntas, uma por tela, sem backend. No fim monta a mensagem e
       abre o wa.me com ela pronta.

       TODO(nicholas): hoje as respostas so viajam dentro da mensagem do
       WhatsApp. O site nao tem backend nem destino de formulario funcionando,
       entao nao ha onde gravar uma copia. Se um dia existir (uma planilha, um
       CRM, um endpoint), e aqui que entra o envio paralelo.
       ========================================================================= */
    const briefingCaixa = document.getElementById('briefing-caixa');
    if (briefingCaixa) {
        const WHATS = '5551994596233';
        const passos = [...briefingCaixa.querySelectorAll('.briefing-passo')];
        const barra = document.getElementById('briefing-barra');
        const contador = document.getElementById('briefing-contador');
        const btnVoltar = document.getElementById('briefing-voltar');
        const btnAvancar = document.getElementById('briefing-avancar');
        const linkEnviar = document.getElementById('briefing-enviar');
        let atual = 0;

        // meses e anos sao gerados na hora: lista fixa de anos envelhece sozinha
        const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const selMes = document.getElementById('brief-mes');
        const selAno = document.getElementById('brief-ano');
        MESES.forEach((m, k) => selMes.add(new Option(m, m, false, false)));
        const anoAtual = new Date().getFullYear();
        for (let a = anoAtual; a <= anoAtual + 3; a++) selAno.add(new Option(a, a, false, false));

        function mostrar(n, mexerNoFoco) {
            atual = Math.max(0, Math.min(n, passos.length - 1));
            passos.forEach((p, k) => { p.hidden = k !== atual; });
            const pct = ((atual + 1) / passos.length) * 100;
            barra.style.width = pct + '%';
            contador.textContent = 'Pergunta ' + (atual + 1) + ' de ' + passos.length;
            btnVoltar.hidden = atual === 0;
            const ultimo = atual === passos.length - 1;
            btnAvancar.hidden = ultimo;
            linkEnviar.hidden = !ultimo;
            if (ultimo) linkEnviar.href = montarLink();
            // Leva o foco para a pergunta, senao quem usa teclado fica para tras.
            // Nao na primeira chamada: focar um elemento no meio da pagina faz o
            // navegador rolar ate ele, e a home abria direto no briefing.
            if (mexerNoFoco) {
                const legenda = passos[atual].querySelector('.briefing-pergunta');
                if (legenda) legenda.focus();
            }
        }

        function respostaDe(nome) {
            const marcado = briefingCaixa.querySelector('input[name="' + nome + '"]:checked');
            return marcado ? marcado.value : '';
        }

        function quando() {
            const flex = document.getElementById('brief-flexivel').checked;
            const mes = selMes.value, ano = selAno.value;
            if (mes && ano) return mes + ' de ' + ano + (flex ? ', com flexibilidade' : '');
            if (mes) return mes + (flex ? ', com flexibilidade' : '');
            if (ano) return ano + (flex ? ', com flexibilidade' : '');
            return flex ? 'Ainda flexível' : '';
        }

        function montarLink() {
            const essenciais = [...briefingCaixa.querySelectorAll('input[name="essencial"]:checked')]
                .map(c => c.value).join(', ');
            const livre = document.getElementById('brief-livre').value.trim();
            // o filter so vale para os campos: a linha em branco da saudacao
            // e falsy e sumiria junto
            const campos = [
                campo('Quem viaja', respostaDe('quem')),
                campo('Quando', quando()),
                campo('Quantos dias', respostaDe('dias')),
                campo('Investimento por pessoa', respostaDe('investimento')),
                campo('Não pode faltar', essenciais),
                campo('Observação', livre),
            ].filter(Boolean);
            const linhas = ['Olá! Preenchi o briefing no site da Terra Venture.', ''].concat(campos);
            return 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent(linhas.join('\n'));
        }
        function campo(rotulo, valor) { return valor ? rotulo + ': ' + valor : ''; }

        btnAvancar.addEventListener('click', () => mostrar(atual + 1, true));
        btnVoltar.addEventListener('click', () => mostrar(atual - 1, true));

        // Escolher uma opcao de radio ja avanca: um clique a menos por pergunta.
        // O gatilho e o click, nao o change, de proposito. As setas do teclado
        // marcam o radio e disparam change: quem navega de teclado seria jogado
        // para a pergunta seguinte antes de ouvir as outras opcoes. O click so
        // acontece no mouse, no toque e no Espaco, que sao escolhas de verdade.
        briefingCaixa.addEventListener('click', (e) => {
            if (e.target.matches('input[type="radio"]') && atual < passos.length - 1) {
                setTimeout(() => mostrar(atual + 1, true), 220);
            }
        });
        briefingCaixa.addEventListener('change', () => {
            if (atual === passos.length - 1) linkEnviar.href = montarLink();
        });
        briefingCaixa.addEventListener('input', () => {
            if (atual === passos.length - 1) linkEnviar.href = montarLink();
        });
        // Enter dentro do campo de texto nao deve recarregar a pagina
        briefingCaixa.addEventListener('submit', (e) => e.preventDefault());

        linkEnviar.addEventListener('click', () => {
            evento('briefing_enviado', {
                link_location: 'briefing',
                respostas: passos.length,
            });
            if (typeof fbq === 'function') fbq('track', 'Lead');
        });

        mostrar(0, false);   // sem foco: so montar o primeiro passo
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
