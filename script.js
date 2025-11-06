document.addEventListener('DOMContentLoaded', () => {

    // ======== 1. MOBILE NAVIGATION MENU ========
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Show menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Hide menu when a link is clicked
    const linkAction = () => {
        navMenu.classList.remove('show-menu');
    };
    navLinks.forEach(link => link.addEventListener('click', linkAction));

    
    // ======== 2. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL ========
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (0.3 * window.innerHeight); // Trigger 30% down the viewport
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active from all links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-link');
                    });
                    // Add active to the current link
                    correspondingLink.classList.add('active-link');
                } else {
                    // correspondingLink.classList.remove('active-link'); // This line can cause issues
                }
            }
        });

        // Special case for home (top of page)
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (scrollY < 200) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
            homeLink.classList.add('active-link');
        }
    };
    window.addEventListener('scroll', scrollActive);


    // ======== 3. SCROLL-TO-TOP BUTTON ========
    const scrollUpBtn = document.getElementById('scroll-up');
    
    const showScrollUp = () => {
        if (window.scrollY >= 400) {
            scrollUpBtn.classList.add('show-scroll');
        } else {
            scrollUpBtn.classList.remove('show-scroll');
        }
    };
    window.addEventListener('scroll', showScrollUp);


    // ======== 4. FADE-IN ANIMATION ON SCROLL (INTERSECTION OBSERVER) ========
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start 50px before it enters viewport
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the 'is-visible' class
                entry.target.classList.add('reveal-visible');
                
                // Use the custom --delay property if it exists
                const delay = entry.target.style.getPropertyValue('--delay');
                if(delay) {
                    entry.target.style.transitionDelay = delay;
                }
                
                // Stop observing once it's visible
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

});