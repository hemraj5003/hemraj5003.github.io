 ================================================
   HEMRAJ'S CYBERSECURITY PORTFOLIO — script.js
   ================================================ */
 
'use strict';
 
// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
  }, 2000);
});
 
// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
 
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});
 
function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();
 
// Scale cursor on hoverable elements
document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    if (cursorTrail) cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    if (cursorTrail) cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});
 
// ---- NAVBAR ----
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav && nav.classList.add('scrolled');
  } else {
    nav && nav.classList.remove('scrolled');
  }
});
 
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'translateY(6px) rotate(45deg)' : '';
    spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'translateY(-6px) rotate(-45deg)' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}
 
// ---- TYPING ANIMATION ----
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const roles = [
    'SOC Analyst',
    'Threat Hunter',
    'Security Engineer',
    'CTF Player',
    'SIEM Architect',
    'Lab Enthusiast',
    'Bug Bounty Hunter',
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
 
  function typeLoop() {
    const current = roles[roleIdx];
    typingEl.textContent = isDeleting
      ? current.slice(0, charIdx--)
      : current.slice(0, charIdx++);
 
    let delay = isDeleting ? 60 : 100;
 
    if (!isDeleting && charIdx > current.length) {
      isDeleting = true;
      delay = 1800;
    } else if (isDeleting && charIdx < 0) {
      isDeleting = false;
      charIdx = 0;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();
}
 
// ---- PARTICLES CANVAS ----
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
 
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
 
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.6 ? '#0aff9d' : '#00d4ff';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
 
  for (let i = 0; i < 80; i++) particles.push(new Particle());
 
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
 
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.strokeStyle = '#0aff9d';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
 
// ---- SCROLL FADE-IN ----
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));
 
// ---- SKILL BARS ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
 
document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});
 
// ---- MOUSE-REACTIVE CARDS ----
document.querySelectorAll('.project-card, .cert-card, .blog-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
 
// ---- CONTRIBUTION HEATMAP ----
const heatmap = document.getElementById('contrib-heatmap');
if (heatmap) {
  const cells = 52 * 7;
  for (let i = 0; i < cells; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    // Random contribution level with higher chance of 0
    const rand = Math.random();
    const level = rand < 0.55 ? 0 : rand < 0.75 ? 1 : rand < 0.88 ? 2 : rand < 0.95 ? 3 : 4;
    if (level > 0) cell.setAttribute('data-level', level);
    heatmap.appendChild(cell);
  }
}
 
// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
 
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
 
// ---- CONTACT FORM ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '[ SENDING... ]';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '[ SENT ✓ ]';
      btn.style.borderColor = 'var(--neon-green)';
      btn.style.color = 'var(--neon-green)';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = '[ SEND MESSAGE ]';
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 3000);
    }, 1200);
  });
}
 
// ---- SMOOTH PARALLAX on SCROLL ----
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, i) => {
    const speed = 0.1 + i * 0.05;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
 
// ---- GLITCH EFFECT on hero name ----
const heroName = document.querySelector('.hero-name');
if (heroName) {
  setInterval(() => {
    heroName.classList.add('glitch');
    setTimeout(() => heroName.classList.remove('glitch'), 150);
  }, 6000);
}
 
// ---- TERMINAL BOOT SEQUENCE ----
const terminalLines = document.querySelectorAll('.t-line[data-delay]');
terminalLines.forEach(line => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transition = 'opacity 0.3s';
  }, parseInt(line.dataset.delay));
});
 
// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--neon-green)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });
 
sections.forEach(s => sectionObserver.observe(s));
