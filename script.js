document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                startTypewriter(); // Start typewriter after loading
            }, 1000);
        }, 1000); // 1 second artificial delay for the elegant loader
    });

    // --- 2. Floating Particles ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Random animation duration between 10s and 25s
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }

    // --- 3. Audio Control ---
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    // Try to set volume a bit lower so it's not overpowering
    bgMusic.volume = 0.4;
    bgMusic.currentTime = 63; // 1 minute 3 seconds

    // Autoplay attempt
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = '⏸ Pause Music';
        musicBtn.style.color = 'var(--pink)';
    }).catch(error => {
        console.log("Autoplay prevented:", error);
        // Fallback to play on click anywhere
        document.body.addEventListener('click', () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicBtn.textContent = '⏸ Pause Music';
                    musicBtn.style.color = 'var(--pink)';
                }).catch(() => {});
            }
        }, { once: true });
    });

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '🎵 Play Music';
            musicBtn.style.color = 'var(--gold)';
        } else {
            // Error handling for play promise
            bgMusic.play().then(() => {
                musicBtn.textContent = '⏸ Pause Music';
                musicBtn.style.color = 'var(--pink)';
            }).catch(error => {
                console.log("Audio play failed:", error);
                alert("Please add an audio file path to index.html to play music.");
            });
        }
        isPlaying = !isPlaying;
    });

    // --- 4. Typewriter Effect ---
    const heroTitle = document.getElementById('hero-title');
    const textToType = "You are the most beautiful thing I have ever seen.";
    let charIndex = 0;

    function startTypewriter() {
        if (charIndex < textToType.length) {
            heroTitle.textContent += textToType.charAt(charIndex);
            charIndex++;
            // Randomize typing speed slightly for realism
            const typingSpeed = Math.random() * 50 + 50; 
            setTimeout(startTypewriter, typingSpeed);
        }
    }

    // --- 5. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.caption');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});