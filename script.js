document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission with PHP backend
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formMessage = this.querySelector('.form-message');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            try {
                const formData = new FormData(this);
                
                // Add timestamp to prevent caching
                formData.append('timestamp', new Date().getTime());
                
                const response = await fetch('send_email.php', {
                    method: 'POST',
                    body: formData
                });
                
                // Check if response is OK
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                
                if (data.success) {
                    formMessage.textContent = data.message;
                    formMessage.classList.add('success');
                    this.reset();
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = error.message || 'There was an error sending your message. Please try again later.';
                formMessage.classList.add('error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Terminal typing effect
    const terminalLines = [
        "whoami",
        "Petras_Kulyumba",
        "cat about_me.txt",
        "CEH | Security+ | Future CISO",
        "Purple Team | SOC | Threat Intel"
    ];
    
    const terminalBody = document.querySelector('.terminal-body');
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentLine = '';
    
    function typeTerminal() {
        const currentText = terminalLines[lineIndex];
        
        if (isDeleting) {
            currentLine = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentLine = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Update terminal content
        terminalBody.innerHTML = `
            <p>$ ${currentLine}<span class="cursor">█</span></p>
        `;
        
        // Determine typing speed
        let typingSpeed = 100;
        if (isDeleting) {
            typingSpeed /= 2;
        }
        
        // Check if line is complete
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1000; // Pause at end of line
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            lineIndex++;
            if (lineIndex >= terminalLines.length) {
                lineIndex = 0;
            }
        }
        
        setTimeout(typeTerminal, typingSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeTerminal, 1000);
    
    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-header, .timeline-item, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.card, .section-header, .timeline-item, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
