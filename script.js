/* =========================================
   INTERACTIVE LOGIC - VERCEL/APPLE 
   ========================================= */

// 1. Typewriter Animation (Hero)
const roles = ["Software Developer", "Creative Engineer", "Problem Solver"];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeWriter() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 40;
  } else {
    typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at end of word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingDelay = 500; // Pause before new word
  }

  setTimeout(typeWriter, typingDelay);
}
if(typewriterEl) {
  setTimeout(typeWriter, 1000);
}

// 2. Mouse Follower / Subtle Glow 
const mouseGlow = document.getElementById('mouse-glow');
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  });
} else {
  mouseGlow.style.display = 'none';
}

// 3. 3D Hover Tilt Effect (Strict Apple/Vercel smooth physics)
const init3DTilt = () => {
  const cards = document.querySelectorAll('.hover-tilt');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4; // Max rotation 4 degrees for subtle premium feel
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none'; // remove transition for smooth instantaneous tracking
    });
  });
}
// Init only on desktop to prevent mobile jitter
if (window.innerWidth > 1024) {  
  init3DTilt();
}

// 4. Smooth Scroll Reveal (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const navBtns = document.querySelectorAll('.nav-btn');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Reveal animation
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
    
    // Active styling for floating sidebar
    if (entry.isIntersecting && entry.target.classList.contains('section')) {
      const currentId = entry.target.getAttribute('id');
      navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === currentId) {
          btn.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "-10% 0px -20% 0px"
});

revealElements.forEach(el => scrollObserver.observe(el));
const sectionBlocks = document.querySelectorAll('.section');
sectionBlocks.forEach(sec => scrollObserver.observe(sec));
