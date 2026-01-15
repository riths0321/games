// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading
    showLoading();
    
    // Initialize games
    initializeGames();
    
    // Initialize animations
    initializeAnimations();
    
    // Hide loading after 1.5 seconds
    setTimeout(hideLoading, 1500);
    
    // Update visitor count (simulated)
    updateVisitorCount();
});

// Loading Functions
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// Game Initialization
function initializeGames() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
        
        // Add click event for card
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.fullscreen-btn')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Initialize iframe games
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        // Set initial opacity
        iframe.style.opacity = '0';
    });
}

// Fullscreen Functions
function openFullscreen(url) {
    const modal = document.getElementById('fullscreenModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');
    
    // Get game title from nearest game card
    const gameTitle = event.target.closest('.game-card').querySelector('h3').textContent;
    modalTitle.textContent = gameTitle;
    
    // Create iframe for fullscreen
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.allowFullscreen = true;
    
    // Clear previous content and add new iframe
    modalContent.innerHTML = '';
    modalContent.appendChild(iframe);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

function openGameFullscreen(button) {
    const gameCard = button.closest('.game-card');
    const iframe = gameCard.querySelector('iframe');
    
    if (iframe) {
        const modal = document.getElementById('fullscreenModal');
        const modalContent = document.getElementById('modalContent');
        const modalTitle = document.getElementById('modalTitle');
        
        // Get game title
        const gameTitle = gameCard.querySelector('h3').textContent;
        modalTitle.textContent = gameTitle;
        
        // Clone the iframe
        const clonedIframe = iframe.cloneNode(true);
        clonedIframe.style.width = '100%';
        clonedIframe.style.height = '100%';
        
        // Clear previous content and add cloned iframe
        modalContent.innerHTML = '';
        modalContent.appendChild(clonedIframe);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
    }
}

function closeFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
}

// Animation Functions
function initializeAnimations() {
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
            from {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe game cards and about cards
    document.querySelectorAll('.game-card, .about-card').forEach(el => {
        observer.observe(el);
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navLinks.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Navbar Scroll Effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Visitor Count (Simulated)
function updateVisitorCount() {
    const countElement = document.querySelector('.visitor-count');
    if (countElement) {
        // Simulate random visitor count between 1000-5000
        const count = Math.floor(Math.random() * 4000) + 1000;
        countElement.textContent = count.toLocaleString();
        
        // Animate count
        countElement.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            countElement.style.animation = '';
        }, 1000);
    }
}

// Game Statistics
function trackGamePlay(gameName) {
    console.log(`Game played: ${gameName}`);
    // Here you can add analytics tracking
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Refresh Games Button
document.querySelectorAll('.refresh-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameCard = this.closest('.game-card');
        const iframe = gameCard.querySelector('iframe');
        
        if (iframe) {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing';
            this.disabled = true;
            
            // Reload iframe
            iframe.src = iframe.src;
            
            // Reset button after 1 second
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-redo"></i> Refresh';
                this.disabled = false;
            }, 1000);
        }
    });
});

// Game Instructions Modal
function showGameInstructions(gameName, instructions) {
    alert(`${gameName}\n\nInstructions: ${instructions}`);
}

// Initialize Hill Racing Egg Drop Instructions
const eggGameInstructions = `Controls:
• Tap & Hold: Accelerate
• Release: Slow Down
• Objective: Drive the truck through hills without breaking the egg in the trunk
• Collect coins to unlock new vehicles`;

// Add instructions button to Hill Racing Egg Drop game
const eggGameCard = document.querySelector('.game-card:has(.fa-egg)');
if (eggGameCard) {
    const instructionsBtn = document.createElement('button');
    instructionsBtn.className = 'instructions-btn';
    instructionsBtn.innerHTML = '<i class="fas fa-question-circle"></i> Instructions';
    instructionsBtn.onclick = () => showGameInstructions('Hill Racing Egg Drop!', eggGameInstructions);
    
    const gameFooter = eggGameCard.querySelector('.game-footer');
    if (gameFooter) {
        gameFooter.querySelector('.game-meta').appendChild(instructionsBtn);
    }
}

// Performance Optimization
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-initialize games on resize
        initializeGames();
    }, 250);
});

// Add to Home Screen Prompt (for mobile)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button (optional)
    showInstallButton();
});

function showInstallButton() {
    // You can add an install button to your UI
    console.log('PWA install available');
}

// Game Statistics Tracking
const gameStats = {
    plays: 0,
    lastPlayed: null,
    favoriteGame: null
};

// Update stats when game is played
function updateGameStats(gameName) {
    gameStats.plays++;
    gameStats.lastPlayed = new Date().toLocaleString();
    gameStats.favoriteGame = gameName;
    
    console.log('Game Stats Updated:', gameStats);
}

// Share Functionality
function shareGame(gameName) {
    if (navigator.share) {
        navigator.share({
            title: gameName,
            text: `Check out ${gameName} on GameHub Pro!`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        alert(`Share ${gameName} with your friends!`);
    }
}