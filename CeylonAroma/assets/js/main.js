/* ==========================================================================
   CEYLON AROMA - PREMIUM LUXURY JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Preloader Removal
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        });
        
        // Fallback in case load event already fired or takes too long
        setTimeout(() => {
            if (document.body.contains(preloader)) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }
        }, 3000);
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Trigger check on page load to handle refreshed page scroll position
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Statistics Animated Counter
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');
    
    if (statsSection && counters.length > 0) {
        let countStarted = false;
        
        const startCounting = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds animation
                const stepTime = Math.max(Math.floor(duration / target), 15);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += Math.ceil(target / (duration / stepTime));
                    if (current >= target) {
                        counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                        clearInterval(timer);
                    } else {
                        counter.textContent = current + (counter.getAttribute('data-suffix') || '');
                    }
                }, stepTime);
            });
        };

        // Intersection Observer to start counters when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    countStarted = true;
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(statsSection);
    }

    // 5. Gallery Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    
    if (galleryItems.length > 0 && lightboxModal) {
        const lightboxImg = lightboxModal.querySelector('.lightbox-image');
        const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('.gallery-img');
                const title = this.querySelector('.gallery-title');
                const subtitle = this.querySelector('.gallery-subtitle');
                
                if (img) {
                    lightboxImg.src = img.getAttribute('src');
                    lightboxImg.alt = img.getAttribute('alt') || 'Ceylon Aroma Gallery';
                    
                    let captionHtml = '';
                    if (title) captionHtml += `<h4 class="mb-1">${title.textContent}</h4>`;
                    if (subtitle) captionHtml += `<span class="text-gold text-uppercase tracking-wider small">${subtitle.textContent}</span>`;
                    
                    lightboxCaption.innerHTML = captionHtml || 'Ceylon Aroma Spices';
                    
                    const bsModal = new bootstrap.Modal(lightboxModal);
                    bsModal.show();
                }
            });
        });
    }

    // 6. Contact Form Validation and Success State
    const contactForm = document.getElementById('luxuryContactForm');
    const formSuccessModal = document.getElementById('formSuccessModal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Remove previous error classes
            contactForm.classList.remove('was-validated');
            
            // Standard form validation checks
            let isValid = true;
            const name = document.getElementById('formName');
            const email = document.getElementById('formEmail');
            const phone = document.getElementById('formPhone');
            const message = document.getElementById('formMessage');
            
            // 6a. Name validation
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            } else {
                name.classList.remove('is-invalid');
            }
            
            // 6b. Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.remove('is-invalid');
            }
            
            // 6c. Phone validation (Optional check or custom check)
            const phoneRegex = /^[0-9+ ]{9,15}$/;
            if (!phone.value.trim() || !phoneRegex.test(phone.value.trim().replace(/\s/g, ''))) {
                phone.classList.add('is-invalid');
                isValid = false;
            } else {
                phone.classList.remove('is-invalid');
            }
            
            // 6d. Message validation
            if (!message.value.trim() || message.value.trim().length < 10) {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Disable submit button and show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

                // Send form data via FormSubmit AJAX API
                fetch('https://formsubmit.co/ajax/contact.ceylonaroma@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: name.value.trim(),
                        Email: email.value.trim(),
                        Phone: phone.value.trim(),
                        Message: message.value.trim()
                    })
                })
                .then(response => response.json())
                .then(data => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    if (data.success === "true" || data.success === true) {
                        // Display success modal
                        if (formSuccessModal) {
                            const bsSuccessModal = new bootstrap.Modal(formSuccessModal);
                            bsSuccessModal.show();
                        }
                        contactForm.reset();
                    } else {
                        alert('Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    alert('There was an error sending your message. Please check your internet connection and try again.');
                });
            } else {
                contactForm.classList.add('was-validated');
            }
        });
        
        // Remove error highlights on input
        const inputs = contactForm.querySelectorAll('.form-control-luxury');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }

    // 7. Active Nav Link Highlighter based on Current URL
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if path matches or ends with the link destination
        if (currentPath.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        } else if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 8. Testimonials Slider auto-init with custom configurations
    const testimonialCarouselEl = document.querySelector('#testimonialCarousel');
    if (testimonialCarouselEl) {
        new bootstrap.Carousel(testimonialCarouselEl, {
            interval: 5000,
            ride: 'carousel',
            pause: 'hover'
        });
    }
});
