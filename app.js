// TasteWithChefT Nigerian Catering Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollEffects();
    initPhoneHandling();
    initAnimations();
    initEnhancedNavigation(); // Enhanced navigation with dropdowns
    initContactInteractions();
    initMenuInteractions();
    initNigerianTheme();
    initGallery(); // Add gallery initialization
    initFAQ(); // Add FAQ accordion functionality
    initExpandableContent(); // Add expandable testimonials and services
    initMultiStepForm(); // Add multi-step form functionality
    initAdvancedLazyLoading(); // Add advanced lazy loading for images
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/**
 * Add scroll effects and navbar behavior
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add enhanced effects to navbar when scrolling
        if (scrollTop > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Throttle scroll events for performance
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            animateOnScroll();
            updateActiveNavLink();
        }, 10);
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.menu-item, .contact-card, .service-card, .reason-item');
    
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
        
        if (isVisible && !element.classList.contains('animated')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animated');
        }
    });
}

/**
 * Handle phone number interactions and analytics
 */
function initPhoneHandling() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track phone clicks for analytics
            console.log('Phone call initiated:', this.href);
            
            // Show confirmation on desktop
            if (window.innerWidth > 768) {
                showPhoneConfirmation();
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

/**
 * Show phone call confirmation popup
 */
function showPhoneConfirmation() {
    const notification = document.createElement('div');
    notification.className = 'phone-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">📞</div>
            <h4>Calling Chef T</h4>
            <p>(470) 430-0782</p>
            <small>Ready to order authentic Nigerian cuisine?</small>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 2px solid var(--color-brand-primary);
        border-radius: var(--radius-lg);
        padding: var(--space-20);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all var(--duration-normal) var(--ease-standard);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Initialize enhanced navigation functionality
 */
function initEnhancedNavigation() {
    initDropdownNavigation();
    initMobileMenu();
    initMenuCategoryNavigation();
    initGalleryNavigation();
}

/**
 * Initialize dropdown navigation for desktop
 */
function initDropdownNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Desktop hover behavior
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function(e) {
                // Check if mouse is leaving to go to the dropdown menu
                const rect = dropdown.getBoundingClientRect();
                const menuRect = menu.getBoundingClientRect();
                
                // If mouse is moving to dropdown area, don't close
                if (e.clientY <= menuRect.bottom && e.clientY >= rect.bottom - 5) {
                    return;
                }
                
                this.classList.remove('active');
            });
            
            // Keep dropdown open when hovering over the menu itself
            menu.addEventListener('mouseenter', function() {
                dropdown.classList.add('active');
            });
            
            menu.addEventListener('mouseleave', function() {
                dropdown.classList.remove('active');
            });
        }
        
        // Mobile click behavior
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const clickedDropdown = e.target.closest('.nav-dropdown');
        if (!clickedDropdown) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

/**
 * Initialize menu category navigation
 */
function initMenuCategoryNavigation() {
    const menuCategoryLinks = document.querySelectorAll('[data-menu-category]');
    
    menuCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-menu-category');
            const menuSection = document.getElementById('menu');
            const menuTab = document.querySelector(`[data-category="${category}"]`);
            
            // Scroll to menu section
            if (menuSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = menuSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Activate the corresponding menu tab after scroll
                setTimeout(() => {
                    if (menuTab) {
                        menuTab.click();
                    }
                }, 500);
                
                // Close mobile menu
                closeMobileMenu();
            }
        });
    });
}

/**
 * Initialize gallery navigation
 */
function initGalleryNavigation() {
    const galleryFilterLinks = document.querySelectorAll('[data-gallery-filter]');
    
    galleryFilterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filter = this.getAttribute('data-gallery-filter');
            const gallerySection = document.getElementById('gallery');
            const galleryFilter = document.querySelector(`[data-filter="${filter}"]`);
            
            // Scroll to gallery section
            if (gallerySection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = gallerySection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Activate the corresponding gallery filter after scroll
                setTimeout(() => {
                    if (galleryFilter) {
                        galleryFilter.click();
                    }
                }, 500);
                
                // Close mobile menu
                closeMobileMenu();
            }
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    if (!mobileToggle || !navLinks) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Toggle mobile menu
    function toggleMobileMenu(open = null) {
        const isOpen = open !== null ? open : !navLinks.classList.contains('active');
        
        mobileToggle.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        if (backdrop) backdrop.classList.toggle('active', isOpen);
        
        // Handle body scroll
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        // Update ARIA attributes for accessibility
        mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    }
    
    // Toggle click handler
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking any navigation link (improved)
    navLinks.addEventListener('click', function(e) {
        const target = e.target;
        const clickedLink = target.closest('a'); // Find the actual link element
        
        // Check if clicked element is a navigation link
        const isNavLink = clickedLink && (
            clickedLink.classList.contains('nav-link') ||
            clickedLink.classList.contains('nav-cta') ||
            clickedLink.classList.contains('dropdown-item') ||
            clickedLink.getAttribute('href')?.startsWith('#')
        );
        
        // Don't close for dropdown toggles (unless they have href)
        const isDropdownToggle = target.classList.contains('dropdown-toggle') || 
                                 target.closest('.dropdown-toggle');
        const hasHref = clickedLink && clickedLink.getAttribute('href');
        
        // Close menu if it's a navigation link with href or any CTA button
        if (isNavLink && (hasHref || clickedLink.classList.contains('nav-cta'))) {
            // Add slight delay to allow smooth scrolling to start
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        }
    });
    
    // Close menu when clicking on backdrop
    if (backdrop) {
        backdrop.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu(false);
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinks.classList.contains('active') &&
            !mobileToggle.contains(e.target) && 
            !navLinks.contains(e.target)) {
            toggleMobileMenu(false);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            // Reset dropdown states on desktop
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    if (mobileToggle && navLinks) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
        mobileToggle.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Initialize animations for page elements
 */

/**
 * Remove mobile menu button
 */
function removeMobileMenuButton() {
    const mobileButton = document.querySelector('.mobile-menu-btn');
    if (mobileButton) {
        mobileButton.remove();
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const button = document.querySelector('.mobile-menu-btn');
    
    if (navLinks.style.display === 'flex') {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const button = document.querySelector('.mobile-menu-btn');
    
    navLinks.style.cssText = `
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        padding: var(--space-16);
        z-index: 1000;
    `;
    
    button.innerHTML = '✕';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const button = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && button) {
        navLinks.style.display = 'none';
        button.innerHTML = '☰';
    }
}

/**
 * Initialize loading animations
 */
function initAnimations() {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.menu-item, .contact-card, .service-card, .reason-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-standard)';
    });
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
}

/**
 * Handle contact interactions
 */
function initContactInteractions() {
    // Email link interactions
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email client opened:', this.href);
            showEmailNotification();
        });
    });
    
    // Instagram link interactions
    const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Instagram opened:', this.href);
            showInstagramNotification();
        });
    });
}

/**
 * Show email notification
 */
function showEmailNotification() {
    showNotification('📧', 'Opening Email Client', 'chefteff@gmail.com', 'Send us your catering requests!');
}

/**
 * Show Instagram notification
 */
function showInstagramNotification() {
    showNotification('📱', 'Opening Instagram', '@tastewithcheft', 'Follow for daily specials and get 5% off your first order!');
}

/**
 * Generic notification function
 */
function showNotification(icon, title, subtitle, message) {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <h4>${title}</h4>
            <p>${subtitle}</p>
            <small>${message}</small>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 2px solid var(--color-brand-primary);
        border-radius: var(--radius-lg);
        padding: var(--space-20);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all var(--duration-normal) var(--ease-standard);
        max-width: 320px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

/**
 * Initialize menu interactions
 */
function initMenuInteractions() {
    // Initialize menu tabs
    initMenuTabs();
    
    // Original menu item interactions
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click interaction for featured items
        if (item.classList.contains('featured')) {
            item.addEventListener('click', function() {
                showFeaturedItemInfo(this);
            });
        }
    });
}

/**
 * Initialize menu tab functionality
 */
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (!menuTabs.length || !menuCategories.length) {
        console.warn('Menu tabs or categories not found');
        return;
    }
    
    // Add click event listeners to tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCategory = this.getAttribute('data-category');
            
            if (!targetCategory) return;
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Simple scroll into view
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }

        });
    });
}

/**
 * Show information about featured menu items
 */
function showFeaturedItemInfo(item) {
    const itemName = item.querySelector('h4').textContent;
    showNotification('⭐', 'Featured Item!', itemName, 'This is one of Chef T\'s signature dishes. Call (470) 430-0782 to order!');
}

/**
 * Initialize Nigerian theme interactions and Easter eggs
 */
function initNigerianTheme() {
    // Add Nigerian flag colors effect
    const specialElements = document.querySelectorAll('.hero-badge, .coming-soon');
    
    specialElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #008751, #FFFFFF, #008751)';
            this.style.transition = 'background 0.5s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Add Nigerian greeting Easter egg
    let greetingSequence = [];
    const nigerianGreeting = ['KeyN', 'KeyD', 'KeyE', 'KeyW', 'KeyO']; // "NDEWO"
    
    document.addEventListener('keydown', function(e) {
        greetingSequence.push(e.code);
        greetingSequence = greetingSequence.slice(-nigerianGreeting.length);
        
        if (greetingSequence.join('') === nigerianGreeting.join('')) {
            showNigerianGreeting();
            greetingSequence = [];
        }
    });
}

/**
 * Show Nigerian greeting Easter egg
 */
function showNigerianGreeting() {
    const greeting = document.createElement('div');
    greeting.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🇳🇬</div>
            <h2 style="margin: 0; color: var(--color-brand-primary);">Ndewo!</h2>
            <p style="margin: 8px 0 0 0; color: var(--color-text);">Welcome to TasteWithChefT!</p>
        </div>
    `;
    
    greeting.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-surface);
        border: 3px solid var(--color-brand-primary);
        padding: var(--space-32);
        border-radius: var(--radius-lg);
        z-index: 2000;
        box-shadow: var(--shadow-lg);
        animation: bounce 0.6s ease;
    `;
    
    document.body.appendChild(greeting);
    
    setTimeout(() => {
        if (greeting.parentNode) {
            greeting.parentNode.removeChild(greeting);
        }
    }, 3000);
}

/**
 * Add click effects to all buttons
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

/**
 * Initialize QR code placeholder functionality
 */
function initQRCode() {
    // Placeholder for future QR code implementation
    const qrSection = document.querySelector('.qr-section');
    if (qrSection) {
        qrSection.addEventListener('click', function() {
            showNotification('📱', 'QR Code Coming Soon!', 'Scan & Order', 'QR code functionality will be available at official opening!');
        });
    }
}

/**
 * Initialize keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Quick call with Ctrl+P
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            const phoneLink = document.querySelector('a[href="tel:+14704300782"]');
            if (phoneLink) {
                phoneLink.click();
            }
        }
        
        // Quick menu with Ctrl+M
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            const menuSection = document.querySelector('#menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Quick contact with Ctrl+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Add CSS for animations and effects
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        40%, 43% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        70% {
            transform: translate(-50%, -50%) scale(1.05);
        }
        90% {
            transform: translate(-50%, -50%) scale(1.02);
        }
    }
    
    .phone-notification .notification-content,
    .custom-notification .notification-content {
        text-align: center;
    }
    
    .notification-icon {
        font-size: 32px;
        margin-bottom: var(--space-12);
    }
    
    .notification-content h4 {
        margin: 0 0 var(--space-8) 0;
        color: var(--color-brand-primary);
        font-size: var(--font-size-lg);
    }
    
    .notification-content p {
        margin: 0 0 var(--space-8) 0;
        color: var(--color-text);
        font-weight: var(--font-weight-semibold);
    }
    
    .notification-content small {
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
        line-height: 1.4;
    }
    
    .nav-link.active {
        color: var(--color-brand-primary);
        font-weight: var(--font-weight-semibold);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .phone-notification,
        .custom-notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

document.head.appendChild(dynamicStyles);

/**
 * Initialize Gallery functionality
 */
function initGallery() {
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    let filteredImages = Array.from(galleryItems);
    
    // Gallery filtering
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            
            // Update active filter
            galleryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filteredImages = [];
            galleryItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    filteredImages.push(item);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('visible');
                }
            });
        });
    });
    
    // Modal functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;
            
            // Set modal content
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Find current index in filtered images
            currentImageIndex = filteredImages.indexOf(this);
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation in modal
    function showImage(index) {
        if (index < 0) index = filteredImages.length - 1;
        if (index >= filteredImages.length) index = 0;
        
        currentImageIndex = index;
        const item = filteredImages[index];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
    }
    
    modalPrev.addEventListener('click', function() {
        showImage(currentImageIndex - 1);
    });
    
    modalNext.addEventListener('click', function() {
        showImage(currentImageIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showImage(currentImageIndex - 1);
                    break;
                case 'ArrowRight':
                    showImage(currentImageIndex + 1);
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    modal.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only handle horizontal swipes that are larger than vertical ones
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next image
                showImage(currentImageIndex + 1);
            } else {
                // Swipe right - previous image
                showImage(currentImageIndex - 1);
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
    
    // Initialize with all items visible
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
    initQRCode();
    initKeyboardShortcuts();
    initGallery(); // Add gallery initialization
    initOrderForm(); // Initialize order form functionality
    initTestimonials(); // Initialize testimonials animations
    
    // Console welcome message
    console.log('🇳🇬 Welcome to TasteWithChefT! 🇳🇬');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl+P: Quick call');
    console.log('- Ctrl+M: Jump to menu');
    console.log('- Ctrl+K: Jump to contact');
    console.log('- Type "NDEWO": Special greeting');
    console.log('Gallery shortcuts:');
    console.log('- Arrow keys: Navigate images in modal');
    console.log('- Escape: Close modal');
    console.log('- Swipe: Navigate on mobile');
    console.log('🍽️ Order form ready for submissions!');
});

/**
 * Dynamic Order Form System
 */
class OrderFormManager {
    constructor() {
        this.selectedItems = [];
        this.orderType = 'individual';
        this.initializeElements();
        this.attachEventListeners();
        this.setMinimumDates();
        this.updateUI();
    }

    initializeElements() {
        this.form = document.getElementById('orderForm');
        this.dishSelect = document.getElementById('dishSelect');
        this.sizeSelect = document.getElementById('sizeSelect');
        this.addItemBtn = document.getElementById('addItemBtn');
        this.itemsList = document.getElementById('itemsList');
        this.itemCount = document.getElementById('itemCount');
        this.submitBtn = document.getElementById('submitOrderBtn');
        this.orderSummary = document.getElementById('orderSummaryText');
        this.eventDetailsSection = document.getElementById('eventDetailsSection');
        this.orderSectionTitle = document.getElementById('orderSectionTitle');
        this.selectedItemsData = document.getElementById('selectedItemsData');
        this.orderTypeData = document.getElementById('orderTypeData');
    }

    attachEventListeners() {
        // Order type tabs
        document.querySelectorAll('.order-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleOrderTypeChange(e));
        });

        // Dish and size selection
        this.dishSelect.addEventListener('change', () => this.validateAddButton());
        this.sizeSelect.addEventListener('change', () => {
            this.handleSizeChange();
            this.validateAddButton();
        });

        // Add item button
        this.addItemBtn.addEventListener('click', () => this.addItem());

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Enter key support for adding items
        this.dishSelect.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!this.addItemBtn.disabled) this.addItem();
            }
        });

        this.sizeSelect.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!this.addItemBtn.disabled) this.addItem();
            }
        });

        // Custom size details input
        const customSizeDetails = document.getElementById('customSizeDetails');
        if (customSizeDetails) {
            customSizeDetails.addEventListener('input', () => this.validateAddButton());
            customSizeDetails.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (!this.addItemBtn.disabled) this.addItem();
                }
            });
        }
    }

    setMinimumDates() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const eventDate = document.getElementById('eventDate');
        const preferredDate = document.getElementById('preferredDate');
        
        if (eventDate) eventDate.min = minDate;
        if (preferredDate) preferredDate.min = minDate;
    }

    handleOrderTypeChange(e) {
        const newType = e.target.dataset.type;
        if (!newType) return;

        // Update active tab
        document.querySelectorAll('.order-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');

        // Update order type
        this.orderType = newType;
        this.orderTypeData.value = newType;

        // Update UI based on type
        if (newType === 'catering') {
            this.eventDetailsSection.style.display = 'block';
            this.orderSectionTitle.textContent = 'Select Event Menu';
        } else {
            this.eventDetailsSection.style.display = 'none';
            this.orderSectionTitle.textContent = 'Select Your Dishes';
        }

        this.updateUI();
    }

    handleSizeChange() {
        const customSizeInput = document.getElementById('customSizeInput');
        const customSizeDetails = document.getElementById('customSizeDetails');
        
        if (this.sizeSelect.value === 'Custom') {
            customSizeInput.style.display = 'block';
            customSizeDetails.required = true;
        } else {
            customSizeInput.style.display = 'none';
            customSizeDetails.required = false;
            customSizeDetails.value = '';
        }
    }

    validateAddButton() {
        const hasDish = this.dishSelect.value.trim() !== '';
        const hasSize = this.sizeSelect.value.trim() !== '';
        
        // If custom size is selected, also check if custom details are provided
        if (hasSize && this.sizeSelect.value === 'Custom') {
            const customDetails = document.getElementById('customSizeDetails').value.trim();
            this.addItemBtn.disabled = !(hasDish && hasSize && customDetails);
        } else {
            this.addItemBtn.disabled = !(hasDish && hasSize);
        }
    }

    addItem() {
        const dish = this.dishSelect.value;
        const size = this.sizeSelect.value;
        const sizeOption = this.sizeSelect.querySelector(`option[value="${size}"]`);
        let serves = sizeOption.dataset.serves || '';
        
        // Handle custom size
        let sizeDisplay = size;
        if (size === 'Custom') {
            const customDetails = document.getElementById('customSizeDetails').value.trim();
            if (!customDetails) return; // Don't add if custom details are missing
            
            sizeDisplay = `Custom: ${customDetails}`;
            serves = customDetails;
        }

        if (!dish || !size) return;

        // Create item object
        const item = {
            id: Date.now() + Math.random(),
            dish: dish,
            size: size,
            sizeDisplay: sizeDisplay,
            serves: serves,
            customDetails: size === 'Custom' ? document.getElementById('customSizeDetails').value.trim() : null
        };

        // Add to selected items
        this.selectedItems.push(item);

        // Reset selectors
        this.dishSelect.value = '';
        this.sizeSelect.value = '';
        document.getElementById('customSizeDetails').value = '';
        this.handleSizeChange(); // Hide custom input
        this.validateAddButton();

        // Update UI
        this.updateUI();

        // Focus back on dish select for easy multiple additions
        this.dishSelect.focus();
    }

    removeItem(itemId) {
        this.selectedItems = this.selectedItems.filter(item => item.id !== itemId);
        this.updateUI();
    }

    updateUI() {
        this.updateItemCount();
        this.renderSelectedItems();
        this.updateOrderSummary();
        this.updateSubmitButton();
        this.updateHiddenFields();
    }

    updateItemCount() {
        this.itemCount.textContent = this.selectedItems.length;
    }

    renderSelectedItems() {
        if (this.selectedItems.length === 0) {
            this.itemsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🍽️</div>
                    <p>No items selected yet</p>
                    <small>Use the form above to add dishes to your order</small>
                </div>
            `;
            return;
        }

        this.itemsList.innerHTML = this.selectedItems.map(item => {
            const displaySize = item.sizeDisplay || item.size;
            const servesText = item.size === 'Custom' ? '' : (item.serves ? `(${item.serves})` : '');
            
            return `
                <div class="selected-item">
                    <div class="item-info">
                        <div class="item-name">${item.dish}</div>
                        <div class="item-size">${displaySize} ${servesText}</div>
                    </div>
                    <button type="button" class="item-remove" onclick="orderForm.removeItem(${item.id})" title="Remove item">
                        ✕
                    </button>
                </div>
            `;
        }).join('');
    }

    updateOrderSummary() {
        if (this.selectedItems.length === 0) {
            this.orderSummary.textContent = 'Select items to place your order';
            return;
        }

        const itemText = this.selectedItems.length === 1 ? 'item' : 'items';
        const typeText = this.orderType === 'catering' ? 'catering order' : 'order';
        this.orderSummary.textContent = `Ready to submit ${typeText} with ${this.selectedItems.length} ${itemText}`;
    }

    updateSubmitButton() {
        const hasItems = this.selectedItems.length > 0;
        const hasCustomerInfo = this.validateCustomerInfo();
        
        this.submitBtn.disabled = !(hasItems && hasCustomerInfo);
    }

    updateHiddenFields() {
        this.selectedItemsData.value = JSON.stringify(this.selectedItems);
    }

    validateCustomerInfo() {
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        
        return name.length >= 2 && this.isValidEmail(email) && this.isValidPhone(phone);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length === 10 || digitsOnly.length === 11;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Remove existing messages
        this.removeMessages();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        const originalText = this.submitBtn.innerHTML;
        this.submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Sending Order...';
        this.submitBtn.disabled = true;

        try {
            const formData = new FormData(this.form);
            
            // Add custom subject based on order type
            const subject = this.orderType === 'catering' 
                ? 'Event Catering Request from TasteWithChefT Website'
                : 'Individual Order Request from TasteWithChefT Website';
            formData.append('_subject', subject);

            const response = await fetch('https://formspree.io/f/xqayzbde', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.showSuccess();
                this.resetForm();
            } else {
                throw new Error('Submission failed');
            }

        } catch (error) {
            console.error('Order submission error:', error);
            this.showError();
        } finally {
            this.submitBtn.innerHTML = originalText;
            this.submitBtn.disabled = false;
        }
    }

    validateForm() {
        const errors = [];

        // Check for items
        if (this.selectedItems.length === 0) {
            errors.push('Please add at least one dish to your order');
        }

        // Check customer info
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();

        if (!name || name.length < 2) {
            errors.push('Please enter your full name');
        }

        if (!email || !this.isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }

        if (!phone || !this.isValidPhone(phone)) {
            errors.push('Please enter a valid phone number');
        }

        // Check catering-specific fields
        if (this.orderType === 'catering') {
            const eventDate = document.getElementById('eventDate').value;
            const guestCount = document.getElementById('guestCount').value;
            const eventType = document.getElementById('eventType').value;

            if (!eventDate) {
                errors.push('Please select an event date');
            }

            if (!guestCount || parseInt(guestCount) < 10) {
                errors.push('Please enter number of guests (minimum 10)');
            }

            if (!eventType) {
                errors.push('Please select event type');
            }
        }

        if (errors.length > 0) {
            this.showValidationErrors(errors);
            return false;
        }

        return true;
    }

    showValidationErrors(errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <strong>❌ Please Fix These Issues:</strong><br>
            <ul style="margin: 10px 0; padding-left: 20px; text-align: left;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        this.form.parentNode.insertBefore(errorDiv, this.form);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => errorDiv.remove(), 8000);
    }

    showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <strong>🎉 Order Request Submitted Successfully!</strong><br>
            Thank you for choosing TasteWithChefT! We'll call you within 24 hours to confirm your order details and provide pricing.
        `;
        
        this.form.parentNode.insertBefore(successDiv, this.form);
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => successDiv.remove(), 10000);
    }

    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <strong>❌ Order Submission Failed</strong><br>
            Sorry, there was an error. Please try again or call us at 
            <a href="tel:+14704300782">(470) 430-0782</a>.
        `;
        
        this.form.parentNode.insertBefore(errorDiv, this.form);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => errorDiv.remove(), 8000);
    }

    removeMessages() {
        document.querySelectorAll('.form-success, .form-error').forEach(msg => msg.remove());
    }

    resetForm() {
        this.selectedItems = [];
        this.orderType = 'individual';
        this.form.reset();
        
        // Reset tabs
        document.querySelectorAll('.order-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector('.order-tab[data-type="individual"]').classList.add('active');
        
        // Reset sections
        this.eventDetailsSection.style.display = 'none';
        this.orderSectionTitle.textContent = 'Select Your Dishes';
        
        this.updateUI();
    }
}

/**
 * Initialize Order Form Functionality
 */
function initOrderForm() {
    // Create global order form manager
    window.orderForm = new OrderFormManager();

    // Add real-time validation for customer info
    ['customerName', 'customerEmail', 'customerPhone'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                window.orderForm.updateSubmitButton();
            });
        }
    });
}

/**
 * Initialize Testimonials Animations
 */
function initTestimonials() {
    // Animate testimonials on scroll
    const observeTestimonials = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const trustItems = document.querySelectorAll('.trust-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        // Initially hide and position elements
        [...testimonialCards, ...trustItems].forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };

    // Animate trust indicator numbers
    const animateNumbers = () => {
        const trustNumbers = document.querySelectorAll('.trust-number');
        
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const isDecimal = finalNumber.includes('.');
                    
                    // Extract number for animation
                    let targetValue;
                    if (isDecimal) {
                        targetValue = parseFloat(finalNumber);
                    } else {
                        targetValue = parseInt(finalNumber.replace(/\D/g, ''));
                    }
                    
                    if (targetValue && targetValue > 0) {
                        animateNumber(target, 0, targetValue, finalNumber, 2000);
                    }
                    
                    numberObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        trustNumbers.forEach(number => {
            numberObserver.observe(number);
        });
    };

    // Number animation function
    const animateNumber = (element, start, end, finalText, duration) => {
        if (finalText.includes('.')) {
            // Handle decimal numbers (like 4.9/5)
            const parts = finalText.split('/');
            const rating = parseFloat(parts[0]);
            let current = 0;
            const increment = rating / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= rating) {
                    element.textContent = finalText;
                    clearInterval(timer);
                } else {
                    element.textContent = current.toFixed(1) + (parts[1] ? '/' + parts[1] : '');
                }
            }, 16);
        } else {
            // Handle whole numbers
            const hasPlus = finalText.includes('+');
            let current = start;
            const increment = (end - start) / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    element.textContent = end.toLocaleString() + (hasPlus ? '+' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                }
            }, 16);
        }
    };

    // Add hover effects to testimonial cards
    const addHoverEffects = () => {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add subtle pulse to stars
                const stars = card.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        star.style.transition = 'transform 0.2s ease';
                        
                        setTimeout(() => {
                            star.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 50);
                });
            });
        });
    };

    // Initialize all testimonial features
    if ('IntersectionObserver' in window) {
        observeTestimonials();
        animateNumbers();
    }
    
    addHoverEffects();
    
    console.log('✨ Testimonials animations initialized');
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // Add keyboard navigation
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make questions focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
    });
    
    // Update aria-expanded when items are toggled
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const item = mutation.target;
                const question = item.querySelector('.faq-question');
                const isActive = item.classList.contains('active');
                
                if (question) {
                    question.setAttribute('aria-expanded', isActive.toString());
                }
            }
        });
    });
    
    faqItems.forEach(item => {
        observer.observe(item, { attributes: true });
    });
    
    console.log('✨ FAQ accordion initialized');
}

/**
 * Initialize expandable content for testimonials and services
 */
function initExpandableContent() {
    const expandableElements = document.querySelectorAll('.expandable');
    
    expandableElements.forEach(element => {
        const header = element.querySelector('.testimonial-header, .service-header');
        const content = element.querySelector('.testimonial-content, .service-details');
        const expandText = element.querySelector('.expand-text');
        
        if (!header || !content) return;
        
        // Handle click events
        header.addEventListener('click', () => {
            toggleExpandable(element, header, content, expandText);
        });
        
        // Handle keyboard events for accessibility
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleExpandable(element, header, content, expandText);
            }
        });
    });
    
    function toggleExpandable(element, header, content, expandText) {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        
        // Update ARIA attributes
        header.setAttribute('aria-expanded', newState);
        content.setAttribute('aria-hidden', !newState);
        
        // Update classes for CSS transitions
        element.setAttribute('aria-expanded', newState);
        
        // Update expand text
        if (expandText) {
            const isService = element.querySelector('.service-header');
            if (newState) {
                expandText.textContent = 'Show less';
            } else {
                expandText.textContent = isService ? 'Learn more' : 'Read more';
            }
        }
        
        // Smooth scroll to element if expanding and partially off-screen
        if (newState) {
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const isPartiallyVisible = rect.bottom > window.innerHeight;
                
                if (isPartiallyVisible) {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 200); // Wait for animation to start
        }
    }
    
    console.log('✨ Expandable content initialized');
}

/**
 * Initialize multi-step form functionality
 */
function initMultiStepForm() {
    const form = document.querySelector('.multi-step-form');
    if (!form) return;
    
    const steps = form.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    let currentStep = 1;
    let formData = {
        orderType: 'individual'
    };
    
    // Initialize first step
    showStep(1);
    
    // Order type selection
    const orderTypeCards = form.querySelectorAll('.order-type-card');
    orderTypeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            orderTypeCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
            // Store selection
            formData.orderType = card.dataset.type;
            
            // Show event details section for catering orders
            const eventDetailsSection = form.querySelector('.event-details-conditional');
            if (eventDetailsSection) {
                eventDetailsSection.style.display = formData.orderType === 'catering' ? 'block' : 'none';
            }
        });
    });
    
    // Quick order selection
    const quickOrderCards = form.querySelectorAll('.quick-order-card');
    quickOrderCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle selection
            card.classList.toggle('selected');
            
            // Auto-fill order details based on selection
            const orderDetailsTextarea = form.querySelector('#orderDetails');
            if (orderDetailsTextarea && card.classList.contains('selected')) {
                const comboType = card.dataset.combo;
                let description = '';
                
                switch (comboType) {
                    case 'jollof-combo':
                        description = 'Jollof Special: Jollof rice with grilled chicken and fried plantain';
                        break;
                    case 'party-tray':
                        description = 'Party Tray: Mixed rice dishes with assorted proteins and sides';
                        break;
                    case 'custom':
                        description = '';
                        orderDetailsTextarea.focus();
                        break;
                }
                
                if (description) {
                    orderDetailsTextarea.value = description;
                }
            }
        });
    });
    
    // Navigation buttons
    const nextButtons = form.querySelectorAll('.btn-next');
    const backButtons = form.querySelectorAll('.btn-back');
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const nextStep = parseInt(btn.dataset.next);
            
            if (validateStep(currentStep)) {
                currentStep = nextStep;
                showStep(currentStep);
            }
        });
    });
    
    backButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const prevStep = parseInt(btn.dataset.back);
            currentStep = prevStep;
            showStep(currentStep);
        });
    });
    
    // Form submission with AJAX
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Always prevent default form submission
        
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Show loading state
        const submitButton = form.querySelector('.btn-submit');
        const originalButtonContent = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="btn-icon">⏳</span>Sending Order...';
        
        try {
            // Prepare form data
            const formDataObj = new FormData(form);
            formDataObj.append('order_type', formData.orderType);
            
            // Send form data via AJAX (with fallback)
            let response;
            if (typeof fetch !== 'undefined') {
                response = await fetch(form.action, {
                    method: 'POST',
                    body: formDataObj,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            } else {
                // Fallback for older browsers using XMLHttpRequest
                response = await sendFormWithXHR(form.action, formDataObj);
            }
            
            if (response.ok) {
                // Success - show success message and reset form
                showFormSuccess();
                form.reset();
                currentStep = 1;
                showStep(1);
                
                // Track successful submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'engagement',
                        'event_label': formData.orderType
                    });
                }
            } else {
                // Handle server errors
                const errorData = await response.json().catch(() => ({}));
                showFormError(errorData.error || 'There was a problem sending your order. Please try again.');
            }
        } catch (error) {
            // Handle network errors
            console.error('Form submission error:', error);
            showFormError('Unable to send your order. Please check your connection and try again, or call us directly at (470) 430-0782.');
        } finally {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;
        }
    });
    
    function showStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = form.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update progress indicator
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < stepNumber - 1) {
                step.classList.add('completed');
            } else if (index === stepNumber - 1) {
                step.classList.add('active');
            }
        });
        
        // Update progress bar
        const progressPercentage = (stepNumber / steps.length) * 100;
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstInput = currentStepElement?.querySelector('input, textarea, button');
            if (firstInput && stepNumber > 1) {
                firstInput.focus();
            }
        }, 300);
    }
    
    function validateStep(stepNumber) {
        const currentStepElement = form.querySelector(`[data-step="${stepNumber}"]`);
        if (!currentStepElement) return true;
        
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            // Remove previous error styling
            field.classList.remove('error');
            
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
                
                // Add error styling
                field.style.borderColor = '#ef4444';
                
                // Remove error styling on input
                field.addEventListener('input', () => {
                    field.style.borderColor = '';
                    field.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (!isValid) {
            // Show error message
            showFormMessage('Please fill in all required fields', 'error');
        }
        
        return isValid;
    }
    
    function showFormMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 12px 16px;
            margin: 16px 0;
            border-radius: 8px;
            font-size: 14px;
            background: ${type === 'error' ? '#fef2f2' : '#f0f9ff'};
            color: ${type === 'error' ? '#dc2626' : '#0369a1'};
            border: 1px solid ${type === 'error' ? '#fecaca' : '#bae6fd'};
        `;
        
        // Insert message
        const currentStepElement = form.querySelector(`[data-step="${currentStep}"]`);
        const stepContent = currentStepElement?.querySelector('.step-content');
        if (stepContent) {
            stepContent.appendChild(messageElement);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    function showFormSuccess() {
        // Create success overlay
        const successOverlay = document.createElement('div');
        successOverlay.className = 'form-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h3>Order Request Sent!</h3>
                <p>Thank you for your order! We'll call you within 24 hours to confirm details and pricing.</p>
                <div class="success-actions">
                    <button class="btn btn-primary" onclick="this.closest('.form-success-overlay').remove()">
                        Continue Browsing
                    </button>
                    <a href="tel:+14704300782" class="btn btn-secondary">
                        <span class="btn-icon">📞</span>
                        Call Us Now
                    </a>
                </div>
            </div>
        `;
        
        // Style the overlay
        successOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Style the success content
        const successContentStyle = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(successOverlay);
        
        const successContent = successOverlay.querySelector('.success-content');
        successContent.style.cssText = successContentStyle;
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (successOverlay.parentNode) {
                successOverlay.remove();
            }
        }, 10000);
    }
    
    function showFormError(message) {
        // Create error overlay
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'form-error-overlay';
        errorOverlay.innerHTML = `
            <div class="error-content">
                <div class="error-icon">❌</div>
                <h3>Unable to Send Order</h3>
                <p>${message}</p>
                <div class="error-actions">
                    <button class="btn btn-primary" onclick="this.closest('.form-error-overlay').remove()">
                        Try Again
                    </button>
                    <a href="tel:+14704300782" class="btn btn-secondary">
                        <span class="btn-icon">📞</span>
                        Call Instead
                    </a>
                </div>
            </div>
        `;
        
        // Style the overlay
        errorOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Style the error content
        const errorContentStyle = `
            background: white;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(errorOverlay);
        
        const errorContent = errorOverlay.querySelector('.error-content');
        errorContent.style.cssText = errorContentStyle;
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (errorOverlay.parentNode) {
                errorOverlay.remove();
            }
        }, 15000);
    }
    
    // XMLHttpRequest fallback for older browsers
    function sendFormWithXHR(url, formData) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST', url);
            xhr.setRequestHeader('Accept', 'application/json');
            
            xhr.onload = function() {
                resolve({
                    ok: xhr.status >= 200 && xhr.status < 300,
                    status: xhr.status,
                    json: () => Promise.resolve(JSON.parse(xhr.responseText || '{}'))
                });
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error'));
            };
            
            xhr.send(formData);
        });
    }
    
    console.log('✨ Multi-step form initialized');
}

/**
 * Initialize advanced lazy loading for images
 */
function initAdvancedLazyLoading() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        fallbackLazyLoading();
        return;
    }
    
    const lazyImages = document.querySelectorAll('.lazy-image');
    const lazyContainers = document.querySelectorAll('.lazy-load');
    
    // Image loading options
    const imageObserverOptions = {
        root: null,
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1
    };
    
    // Create intersection observer for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                imageObserver.unobserve(entry.target);
            }
        });
    }, imageObserverOptions);
    
    // Observe all lazy images
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    function loadImage(img) {
        const container = img.closest('.lazy-load');
        const placeholder = container?.querySelector('.image-placeholder');
        
        // Skip if already loaded or loading
        if (img.classList.contains('loaded') || img.classList.contains('loading')) {
            return;
        }
        
        // Add loading state
        img.classList.add('loading');
        if (container) {
            container.classList.add('loading');
        }
        
        // Get image source with fallback handling
        let imageSrc = img.dataset.src || img.getAttribute('data-src');
        
        if (!imageSrc) {
            console.warn('No image source found for:', img);
            handleImageError(img, container, placeholder, 'No source');
            return;
        }
        
        // Normalize the image path
        imageSrc = imageSrc.trim();
        
        // Create a new image to preload with enhanced error handling
        const imageLoader = new Image();
        
        // Set up timeout for slow loading images
        const loadTimeout = setTimeout(() => {
            console.warn('Image loading timeout:', imageSrc);
            handleImageError(img, container, placeholder, 'Timeout');
        }, 10000); // 10 second timeout
        
        imageLoader.onload = () => {
            clearTimeout(loadTimeout);
            
            // Image loaded successfully
            img.src = imageSrc;
            img.classList.remove('loading');
            img.classList.add('loaded');
            
            if (container) {
                container.classList.remove('loading');
                container.classList.add('loaded');
            }
            
            // Hide placeholder
            if (placeholder) {
                placeholder.style.opacity = '0';
                placeholder.style.pointerEvents = 'none';
            }
            
            // Remove data-src to prevent reloading
            img.removeAttribute('data-src');
            
            // Trigger custom event for analytics/tracking
            img.dispatchEvent(new CustomEvent('imageLoaded', {
                detail: { src: img.src, alt: img.alt }
            }));
        };
        
        imageLoader.onerror = () => {
            clearTimeout(loadTimeout);
            console.error('Failed to load image:', imageSrc);
            handleImageError(img, container, placeholder, 'Load Error');
        };
        
        // Start loading the image
        imageLoader.src = imageSrc;
    }
    
    function handleImageError(img, container, placeholder, errorType) {
        img.classList.remove('loading');
        img.classList.add('error');
        
        if (container) {
            container.classList.remove('loading');
            container.classList.add('error');
        }
        
        // Show error placeholder with better styling
        if (placeholder) {
            placeholder.innerHTML = '🖼️';
            placeholder.style.fontSize = '2.5rem';
            placeholder.style.opacity = '0.6';
            placeholder.title = `Image failed to load (${errorType})`;
        }
        
        // Try alternative image source if available
        const altSrc = img.getAttribute('data-alt-src');
        if (altSrc && !img.hasAttribute('data-retry-attempted')) {
            img.setAttribute('data-retry-attempted', 'true');
            img.setAttribute('data-src', altSrc);
            setTimeout(() => loadImage(img), 1000); // Retry after 1 second
        }
    }
    
    // Fallback for browsers without Intersection Observer
    function fallbackLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        function loadImagesInViewport() {
            lazyImages.forEach(img => {
                if (img.dataset.src && isInViewport(img)) {
                    loadImage(img);
                }
            });
        }
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Load images on scroll and resize
        window.addEventListener('scroll', throttle(loadImagesInViewport, 200));
        window.addEventListener('resize', throttle(loadImagesInViewport, 200));
        
        // Initial load
        loadImagesInViewport();
    }
    
    // Throttle function for performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // Preload critical images (first few in viewport)
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('.lazy-image');
        const isMobile = window.innerWidth <= 768;
        const preloadCount = Math.min(isMobile ? 2 : 4, criticalImages.length);
        
        for (let i = 0; i < preloadCount; i++) {
            const img = criticalImages[i];
            if (img.dataset.src) {
                // Check if image is likely to be above the fold
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight * 1.5) { // Increased threshold
                    loadImage(img);
                }
            }
        }
    }
    
    // Enhanced mobile handling
    function handleMobileOptimizations() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce preload count for slow connections
                console.log('Slow connection detected, reducing image preloading');
                return;
            }
        }
        
        // Add retry mechanism for failed images
        setTimeout(() => {
            const failedImages = document.querySelectorAll('.lazy-image.error');
            failedImages.forEach(img => {
                if (!img.hasAttribute('data-retry-attempted')) {
                    console.log('Retrying failed image:', img.dataset.src);
                    img.classList.remove('error');
                    img.removeAttribute('data-retry-attempted');
                    loadImage(img);
                }
            });
        }, 3000);
    }
    
    // Preload critical images after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(preloadCriticalImages, 100);
            setTimeout(handleMobileOptimizations, 2000);
        });
    } else {
        setTimeout(preloadCriticalImages, 100);
        setTimeout(handleMobileOptimizations, 2000);
    }
    
    // Add global error recovery
    window.addEventListener('online', () => {
        console.log('Connection restored, retrying failed images');
        const failedImages = document.querySelectorAll('.lazy-image.error');
        failedImages.forEach(img => {
            img.classList.remove('error');
            img.removeAttribute('data-retry-attempted');
            if (img.dataset.src) {
                setTimeout(() => loadImage(img), Math.random() * 2000);
            }
        });
    });
    
    // Debug helper for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.retryAllImages = () => {
            const allImages = document.querySelectorAll('.lazy-image');
            allImages.forEach(img => {
                img.classList.remove('loaded', 'error', 'loading');
                img.removeAttribute('data-retry-attempted');
                if (img.dataset.src) {
                    loadImage(img);
                }
            });
        };
        console.log('🔧 Debug: Use retryAllImages() to retry all gallery images');
    }
    
    console.log('✨ Advanced lazy loading initialized with enhanced error handling');
}

