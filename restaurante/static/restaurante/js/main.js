// JavaScript para funcionalidades adicionales del menú

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del menú hamburguesa
    const menuToggle = document.getElementById('menuToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Función para abrir el menú
    function openMenu() {
        sidebarMenu.classList.add('active');
        menuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el menú
    function closeMenuFunc() {
        sidebarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners para abrir/cerrar el menú
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuFunc);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenuFunc);
    }

    // Scroll suave a las secciones y cerrar menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar el menú
                closeMenuFunc();
                
                // Calcular posición con offset para el header
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar carrusel si existe
    const carousel = document.querySelector('#platosCarousel');
    if (carousel) {
        // El carrusel se inicializa automáticamente con Bootstrap
        // Aquí puedes agregar funcionalidades adicionales si es necesario
    }
    
    // Animación suave al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de platos
    const platoCards = document.querySelectorAll('.plato-card');
    platoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Formatear precios con separadores de miles (puntos)
    function formatPrice(priceText) {
        // Extraer el número del texto (remover el $ y espacios)
        const match = priceText.match(/\d+/);
        if (!match) return priceText;
        
        const number = parseInt(match[0]);
        // Formatear con puntos como separadores de miles
        const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        // Reemplazar el número original con el formateado
        return priceText.replace(/\d+/, formatted);
    }
    
    // Aplicar formato a todos los precios
    const precioElements = document.querySelectorAll('.plato-precio');
    precioElements.forEach(element => {
        const originalText = element.textContent;
        element.textContent = formatPrice(originalText);
    });
});

