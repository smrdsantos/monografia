// CÓDIGO JAVASCRIPT CORRIGIDO E REORGANIZADO
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Seleciona todos os elementos importantes ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const contentWrapper = document.getElementById('content-wrapper');
    const rotateOverlay = document.querySelector('.rotate-suggestion-overlay');
    const closeRotateBtn = document.getElementById('closeRotateSuggestion');
    const backToTopButton = document.getElementById('backToTopBtn');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav li a');
    let previouslyFocusedElement = null;

    // --- Função de Layout Robusta ---
    function adjustLayout() {
        if (!contentWrapper) return;
        if (window.innerWidth > 768) {
            contentWrapper.style.paddingLeft = 'var(--sidebar-width)';
            if (sidebar) sidebar.classList.remove('open');
        } else {
            contentWrapper.style.paddingLeft = '0';
        }
    }

    // --- Gatilhos de Eventos ---

    // 1. Fechar o aviso de "Melhor Experiência"
    if (closeRotateBtn) {
        closeRotateBtn.addEventListener('click', () => {
            if (rotateOverlay) {
                rotateOverlay.style.display = 'none';
            }
            adjustLayout();
        });
    }

    // 2. Abrir/Fechar o menu (com gerenciamento de foco)
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpening = !sidebar.classList.contains('open');
            sidebar.classList.toggle('open');

            if (isOpening) {
                previouslyFocusedElement = document.activeElement;
                sidebar.querySelector('a').focus();
            } else if (previouslyFocusedElement) {
                previouslyFocusedElement.focus();
            }
        });
    }

    // 3. Fechar o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                if (previouslyFocusedElement) {
                    previouslyFocusedElement.focus();
                }
            }
        }
    });
    
    // 4. Botão "Voltar ao Topo"
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // 5. Menu dinâmico (Highlight Ativo) - VERSÃO CORRIGIDA E MAIS PRECISA
    const observerOptions = {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Chamadas iniciais ---
    window.addEventListener('resize', adjustLayout);
    adjustLayout();
});  

window.addEventListener('orientationchange', function() {
    // Adiciona um pequeno atraso para garantir que o navegador já tenha ajustado a tela
    setTimeout(function() {
        window.scrollTo(0, 0); // Rola a página para o topo (posição x=0, y=0)
    }, 100); 
});
