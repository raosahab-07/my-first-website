// Portfolio Website - JavaScript
// Main application functionality

document.addEventListener('DOMContentLoaded', function () {
    // ========== PRELOADER ==========
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // ========== CUSTOM CURSOR ==========
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Add cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = 'var(--primary-color)';
            });
        });

        // Hide cursor on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    } else {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }

        // Active link highlight on scroll
        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ========== MOBILE MENU TOGGLE ==========
    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('active');

        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.style.display = 'flex';
            setTimeout(() => {
                navLinksContainer.style.opacity = '1';
                navLinksContainer.style.transform = 'translateY(0)';
            }, 10);
        } else {
            navLinksContainer.style.opacity = '0';
            navLinksContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinksContainer.style.display = 'none';
            }, 300);
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navLinksContainer.style.opacity = '0';
                navLinksContainer.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinksContainer.style.display = 'none';
                }, 300);
            }
        });
    });

    // ========== TYPING ANIMATION ==========
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Frontend Developer",
        "React Developer",
        "UI/UX Enthusiast"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after preloader
    setTimeout(typeEffect, 1200);

    // ========== ANIMATED COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersInitialized = false;

    function animateCounters() {
        if (countersInitialized) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });

        countersInitialized = true;
    }

    // ========== SKILL PROGRESS BARS ==========
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    let skillsInitialized = false;

    function animateSkills() {
        if (skillsInitialized) return;

        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });

        skillsInitialized = true;
    }

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .timeline, .contact-content');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');

                // Animate counters when about section is visible
                if (element.classList.contains('about-content')) {
                    animateCounters();
                }

                // Animate skills when skills section is visible
                if (element.classList.contains('skills-grid')) {
                    animateSkills();
                }
            }
        });
    }

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // ========== PROJECT FILTERING LOGIC ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                    // Ensure display: block is set (or flex/grid as per original)
                    card.style.display = 'block';
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                    // Wait for fade out animation before hiding
                    setTimeout(() => {
                        if (card.classList.contains('hide')) {
                            card.style.display = 'none';
                        }
                    }, 500);
                }
            });
        });
    });

    // ========== PROJECT CARD HOVER EFFECT ==========
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In a real implementation, you would send the form data to a server here
        // For this demo, we'll just show a success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon, Raushan.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ========== FORM INPUT ANIMATION ==========
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        // Add active class if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('active');
        }

        input.addEventListener('focus', function () {
            this.parentElement.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('active');
            }
        });

        // Handle typing and autofill
        input.addEventListener('input', function () {
            if (this.value) {
                this.parentElement.classList.add('active');
            } else {
                if (document.activeElement !== this) {
                    this.parentElement.classList.remove('active');
                }
            }
        });
    });

    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== RESUME DOWNLOAD SIMULATION ==========
    const downloadResumeBtn = document.getElementById('downloadResume');

    downloadResumeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Simulate download
        const downloadText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.disabled = true;

        setTimeout(() => {
            alert('Resume downloaded successfully! (This is a simulation in this demo)');
            this.innerHTML = downloadText;
            this.disabled = false;
        }, 1500);
    });

    // ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== RESPONSIVE NAVBAR ==========
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.opacity = '1';
            navLinksContainer.style.transform = 'translateY(0)';
            menuToggle.classList.remove('active');
        } else {
            if (!navLinksContainer.classList.contains('active')) {
                navLinksContainer.style.display = 'none';
                navLinksContainer.style.opacity = '0';
                navLinksContainer.style.transform = 'translateY(-20px)';
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // ========== THEME TOGGLE LOGIC ==========
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const htmlElement = document.documentElement;

        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'light') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

});