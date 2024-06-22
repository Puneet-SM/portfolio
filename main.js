document.addEventListener('DOMContentLoaded', function() {

    // Function to show menu on toggle click
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    };

    // Initialize menu show
    showMenu('nav-toggle', 'nav-menu');

    // Function to remove mobile menu when a link is clicked
    const navLink = document.querySelectorAll('.nav__link');
    function linkAction() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    // Function to handle form submission
    const form = document.getElementById('contactForm');
    const messageContainer = document.getElementById('messageContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch input values
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        // Simple validation
        if (name === '' || email === '' || message === '') {
            showMessage('Please fill out all fields.', 'red');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'red');
            return;
        }

        // Construct message
        const messageText = `Thank you, ${name}! Your message "${message}" has been submitted.`;

        // Display success message
        showMessage(messageText, 'green');

        // Clear form fields after submission (optional)
        form.reset();

        // Clear message after 5 seconds (adjust as needed)
        setTimeout(() => {
            messageContainer.textContent = '';
        }, 5000);
    });

    // Helper function to validate email format
    function isValidEmail(email) {
        // Very basic email validation regex (you may use a more robust solution)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to display message
    function showMessage(text, color) {
        messageContainer.textContent = text;
        messageContainer.style.color = color;
    }

    // Function to add active link class to nav menu on scroll
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollDown = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                  sectionTop = current.offsetTop - 58,
                  sectionId = current.getAttribute('id'),
                  sectionsClass = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // Initialize scroll reveal animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
    sr.reveal('.home__social-icon',{ interval: 200}); 
    sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

});
