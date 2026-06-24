/* =============================================
   HARIHARA CLOTH STORES — JavaScript
   ============================================= */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    bars[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    bars[1].style.cssText = 'opacity:0';
    bars[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    bars.forEach(b => b.style.cssText = '');
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(b => b.style.cssText = '');
  });
});

// ---- INTERSECTION OBSERVER ANIMATIONS ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const rightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated-right');
      rightObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animate-fade-up elements
document.querySelectorAll('.animate-fade-up').forEach(el => fadeObserver.observe(el));
// Observe hero visual
document.querySelectorAll('.animate-slide-right').forEach(el => rightObserver.observe(el));

// ---- STAGGERED CARD ANIMATIONS ----
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('[class*="card"], [class*="arrival-item"], [class*="tl-card"], [class*="trust-badge"]');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity    = '0';
          card.style.transform  = 'translateY(30px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          requestAnimationFrame(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          });
        }, i * 120);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.collection-grid, .arrivals-grid, .taglines-grid, .trust-badges').forEach(el => {
  cardObserver.observe(el);
});

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, suffix = '') {
  let current  = 0;
  const step   = Math.ceil(target / 60);
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, 25);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(numEl => {
        const raw  = numEl.textContent.trim();
        const plus = numEl.querySelector('.stat-plus');
        const plus_text = plus ? '+' : '';
        const numStr = raw.replace('+', '');
        if (numStr.includes('K')) {
          animateCounter(numEl, 10, 'K' + plus_text);
          setTimeout(() => { numEl.innerHTML = '10K<span class="stat-plus">+</span>'; }, 1600);
        } else {
          const val = parseInt(numStr);
          if (!isNaN(val)) {
            animateCounter(numEl, val, plus_text);
            setTimeout(() => { numEl.innerHTML = val + '<span class="stat-plus">+</span>'; }, 1600);
          }
        }
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- RIPPLE EFFECT on CTAs ----
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      border-radius:50%; background:rgba(255,255,255,0.25);
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      transform:scale(0); animation:ripple 0.6s linear;
      pointer-events:none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = '@keyframes ripple { to { transform:scale(4); opacity:0; } }';
document.head.appendChild(style);

// ---- PARALLAX HERO BADGE ----
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.style.transform = `translateY(${scroll * 0.1}px)`;
  }
  const particles = document.querySelectorAll('.particles span');
  particles.forEach((p, i) => {
    const speed = 0.05 + i * 0.01;
    p.style.transform = `translateY(${-scroll * speed}px)`;
  });
});

// ---- MOUSE GLOW EFFECT on collection cards ----
document.querySelectorAll('.collection-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.left = `${x - 100}px`;
      glow.style.top  = `${y - 100}px`;
    }
  });
});

// ---- TRUST QUOTES rotation ----
const quotes = document.querySelectorAll('.tq');
if (quotes.length) {
  let active = 0;
  setInterval(() => {
    quotes.forEach(q => q.style.borderColor = '');
    quotes[active].style.borderColor    = 'rgba(245,166,35,.5)';
    quotes[active].style.background     = 'rgba(245,166,35,.06)';
    setTimeout(() => {
      quotes[active].style.borderColor = '';
      quotes[active].style.background  = '';
    }, 1800);
    active = (active + 1) % quotes.length;
  }, 2500);
}

// ---- PAGE LOAD ANIMATION TRIGGER ----
window.addEventListener('load', () => {
  document.querySelectorAll('.animate-fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('animated');
    }
  });
  document.querySelectorAll('.animate-slide-right').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('animated-right');
    }
  });
});

// ---- ARRIVAL ITEMS HOVER GLOW ----
document.querySelectorAll('.arrival-item').forEach((item, i) => {
  const colors = ['#e94d8b','#7c3aed','#06b6d4','#f5a623','#10b981','#ec4899'];
  item.addEventListener('mouseenter', () => {
    item.style.boxShadow = `0 20px 50px ${colors[i % colors.length]}33`;
    item.style.borderColor = colors[i % colors.length] + '55';
  });
  item.addEventListener('mouseleave', () => {
    item.style.boxShadow = '';
    item.style.borderColor = '';
  });
});

console.log('%c✦ Harihara Cloth Stores ✦', 'font-size:18px;font-weight:bold;background:linear-gradient(135deg,#e94d8b,#f5a623,#7c3aed);-webkit-background-clip:text;color:transparent;padding:4px;');
console.log('%cWhere Tradition Meets Trend 🛍️', 'color:#f5a623;font-size:12px;');
