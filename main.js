// script.js
document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('loaded');
            // Optional: remove preloader from DOM after transition
            setTimeout(() => {
                // preloader.remove(); // Uncomment if you want to remove it
            }, 600); // Match transition duration
        }
    });

    // Sticky Header
    const header = document.getElementById('main-header');
    const scrollThreshold = 50; // Pixels to scroll before header changes

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('#main-header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('mobile-active')) {
                    nav.classList.remove('mobile-active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                let headerOffset = header.offsetHeight;
                if (header.classList.contains('scrolled')) {
                    // Use a fixed value if the scrolled header height is different and causes issues
                    // Or recalculate based on its current state
                }
                
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-header nav a');

    function changeNavOnScroll() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - header.offsetHeight - 50)) { // Added 50px offset
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Initial check

    // Scroll Reveal Animations
    const scrollElements = document.querySelectorAll('.ethos-item, .solution-card, .timeline-item, .impact-item, .testimonial-slider, #contact-form');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('revealed');
    };

    const hideScrollElement = (element) => { // Optional: if you want to hide again when scrolling up
        // element.classList.remove('revealed');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            // Add a delay based on index for staggered effect
            const delay = parseInt(el.dataset.scrollDelay) || 0;
            if (elementInView(el, 80)) { // Trigger when 80% of element is in view
                 setTimeout(() => {
                    displayScrollElement(el);
                }, delay);
            } else {
                // hideScrollElement(el); // Optional
            }
        })
    }
    
    // Initialize with staggered delays
    scrollElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 100}ms`; // Stagger animations
        el.classList.add('reveal-on-scroll'); // Add base class for initial state
    });
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check


    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-slider .prev');
    const nextButton = document.querySelector('.testimonial-slider .next');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        if (slides.length > 1) { // Only autoplay if more than one slide
            autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    if (slides.length > 0) { // Check if testimonials exist
        showSlide(currentSlide); // Show the first slide initially
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay(); // Restart autoplay on manual navigation
            });
    
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        // Start autoplay if there are slides
        startAutoPlay();

        // Optional: Pause autoplay on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoPlay);
            slider.addEventListener('mouseleave', startAutoPlay);
        }
    }


    // Contact Form Submission (Basic)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Submitted:', data);
            
            // Replace with actual form submission logic (e.g., AJAX call)
            alert('Thank you for your inquiry! We will be in touch shortly.');
            contactForm.reset();
        });
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});
