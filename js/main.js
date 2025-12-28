document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    document.querySelectorAll('.card, .feature-card, .section h2, .hero h1, .hero p, .grid div, img').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
});

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const organization = document.getElementById('organization').value;
    const message = document.getElementById('message').value;

    const subject = `Aegis Contact Request: ${firstName} ${lastName}`;
    const body = `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n` +
        `Organization: ${organization}\n\n` +
        `Message:\n${message}`;

    const mailtoLink = `mailto:sec23ee053@sairamtap.edu.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default mail client
    window.location.href = mailtoLink;

    // Optional user feedback
    alert("Opening your email client to send the request...");
}
