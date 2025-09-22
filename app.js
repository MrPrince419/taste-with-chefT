// TasteWithChefT Nigerian Catering Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollEffects();
    initPhoneHandling();
    initAnimations();
    initMobileMenu();
    initContactInteractions();
    initMenuInteractions();
    initNigerianTheme();
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
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add enhanced shadow to navbar when scrolling
        if (scrollTop > 50) {
            navbar.style.boxShadow = 'var(--shadow-lg)';
            navbar.style.background = 'rgba(var(--color-surface), 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.background = 'var(--color-surface)';
            navbar.style.backdropFilter = 'none';
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
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('Mobile toggle found:', mobileToggle);
    console.log('Nav links found:', navLinks);
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function(e) {
            console.log('Hamburger menu clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active classes
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            console.log('Menu toggle active:', this.classList.contains('active'));
            console.log('Nav links active:', navLinks.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinkItems = navLinks.querySelectorAll('.nav-link, .nav-cta');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    } else {
        console.log('Mobile menu elements not found!');
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
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
    
    // Add click event listeners to tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category immediately for mobile
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Force visibility immediately on mobile
                if (window.innerWidth <= 768) {
                    targetElement.style.display = 'block';
                    targetElement.style.opacity = '1';
                    targetElement.style.visibility = 'visible';
                    
                    // Scroll to menu section on mobile for better UX
                    setTimeout(() => {
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 100);
                } else {
                    // Desktop smooth transition
                    targetElement.style.opacity = '0';
                    setTimeout(() => {
                        targetElement.style.opacity = '1';
                    }, 50);
                }
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
    initQRCode();
    initKeyboardShortcuts();
    
    // Console welcome message
    console.log('🇳🇬 Welcome to TasteWithChefT! 🇳🇬');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl+P: Quick call');
    console.log('- Ctrl+M: Jump to menu');
    console.log('- Ctrl+K: Jump to contact');
    console.log('- Type "NDEWO": Special greeting');
});