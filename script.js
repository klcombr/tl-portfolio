// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.profile-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}

// Particle background effect
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// Slideshow functionality
let slideIndex = 1;
let isTransitioning = false;

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
});

function changeSlide(n) {
    if (isTransitioning) return;
    showSlides(slideIndex += n, n > 0 ? 'next' : 'prev');
}

function currentSlide(n) {
    if (isTransitioning) return;
    let direction = n > slideIndex ? 'next' : 'prev';
    showSlides(slideIndex = n, direction);
}

function showSlides(n, direction = 'next') {
    isTransitioning = true;
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    // Reset all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.transform = direction === 'next' ? "translateX(100%)" : "translateX(-100%)";
        slides[i].style.zIndex = "1";
    }

    // Reset dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Set current slide as active
    slides[slideIndex-1].classList.add("active");
    slides[slideIndex-1].style.transform = "translateX(0)";
    slides[slideIndex-1].style.zIndex = "2";

    // Update dots
    dots[slideIndex-1].className += " active";

    // Allow next transition after animation completes
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

// Auto slideshow
setInterval(() => {
    changeSlide(1);
}, 5000); // Change slide every 5 seconds

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
