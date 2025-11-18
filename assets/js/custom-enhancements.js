/**
 * FABRIVENTANAS - CUSTOM ENHANCEMENTS JAVASCRIPT
 * Super Genial Interactive Effects
 */

(function() {
   'use strict';

   // Wait for DOM to be ready
   document.addEventListener('DOMContentLoaded', function() {

      // === PARALLAX EFFECT ON HERO ===
      initParallax();

      // === SMOOTH SCROLL FOR ANCHOR LINKS ===
      initSmoothScroll();

      // === NAVBAR BACKGROUND ON SCROLL ===
      initNavbarScroll();

      // === INTERSECTION OBSERVER FOR ANIMATIONS ===
      initScrollAnimations();

      // === PARTICLE EFFECT ===
      initParticles();

      // === PRODUCT CARDS TILT EFFECT ===
      initTiltEffect();

      // === RIPPLE EFFECT ON BUTTONS ===
      initRippleEffect();

      // === COUNTER ANIMATION ===
      initCounters();

      // === IMAGE LAZY LOADING ENHANCEMENT ===
      initLazyLoadEnhancement();
   });

   /**
    * Parallax effect on hero image
    */
   function initParallax() {
      const heroImage = document.querySelector('[style*="background-image"]');
      if (!heroImage) return;

      window.addEventListener('scroll', function() {
         const scrolled = window.pageYOffset;
         const rate = scrolled * 0.5;

         if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
         }
      });
   }

   /**
    * Smooth scroll for anchor links
    */
   function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);
            if (target) {
               e.preventDefault();
               const offsetTop = target.offsetTop - 80;

               window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
               });
            }
         });
      });
   }

   /**
    * Navbar background change on scroll
    */
   function initNavbarScroll() {
      const navbar = document.querySelector('.navbar-clone');
      if (!navbar) return;

      window.addEventListener('scroll', function() {
         if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
         } else {
            navbar.classList.remove('scrolled');
         }
      });
   }

   /**
    * Intersection Observer for scroll animations
    */
   function initScrollAnimations() {
      const observerOptions = {
         threshold: 0.1,
         rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               entry.target.classList.add('bounce-in');
               observer.unobserve(entry.target);
            }
         });
      }, observerOptions);

      // Observe product cards
      document.querySelectorAll('.col[id^="puerta"], .col[id^="ventana"], .col[id^="espejo"]').forEach(card => {
         observer.observe(card);
      });
   }

   /**
    * Simple particle effect for hero section
    */
   function initParticles() {
      const heroSection = document.querySelector('.hero-section, .py-md-10');
      if (!heroSection) return;

      // Check if particles container already exists
      if (document.getElementById('particles-js')) return;

      // Create particles container
      const particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-js';
      particlesContainer.style.cssText = 'position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; pointer-events: none;';

      heroSection.style.position = 'relative';
      heroSection.insertBefore(particlesContainer, heroSection.firstChild);

      // Create simple floating particles
      createFloatingParticles(particlesContainer, 30);
   }

   /**
    * Create floating particles
    */
   function createFloatingParticles(container, count) {
      for (let i = 0; i < count; i++) {
         const particle = document.createElement('div');
         const size = Math.random() * 4 + 2;
         const duration = Math.random() * 20 + 10;
         const delay = Math.random() * 5;
         const startX = Math.random() * 100;
         const endX = startX + (Math.random() * 20 - 10);

         particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${startX}%;
            bottom: -10px;
            animation: floatUp ${duration}s ${delay}s infinite ease-in-out;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
         `;

         container.appendChild(particle);
      }

      // Add keyframes if not already added
      if (!document.getElementById('particle-keyframes')) {
         const style = document.createElement('style');
         style.id = 'particle-keyframes';
         style.textContent = `
            @keyframes floatUp {
               0% {
                  transform: translateY(0) translateX(0) scale(1);
                  opacity: 0;
               }
               10% {
                  opacity: 1;
               }
               90% {
                  opacity: 1;
               }
               100% {
                  transform: translateY(-100vh) translateX(50px) scale(0);
                  opacity: 0;
               }
            }
         `;
         document.head.appendChild(style);
      }
   }

   /**
    * Tilt effect on product cards
    */
   function initTiltEffect() {
      const cards = document.querySelectorAll('.col[data-cues="zoomIn"]');

      cards.forEach(card => {
         card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            const img = card.querySelector('img');
            if (img) {
               img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            }
         });

         card.addEventListener('mouseleave', function() {
            const img = card.querySelector('img');
            if (img) {
               img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
         });
      });
   }

   /**
    * Ripple effect on buttons
    */
   function initRippleEffect() {
      const buttons = document.querySelectorAll('.btn');

      buttons.forEach(button => {
         button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
               position: absolute;
               width: ${size}px;
               height: ${size}px;
               border-radius: 50%;
               background: rgba(255, 255, 255, 0.5);
               left: ${x}px;
               top: ${y}px;
               transform: scale(0);
               animation: ripple 0.6s ease-out;
               pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
         });
      });

      // Add ripple keyframes
      if (!document.getElementById('ripple-keyframes')) {
         const style = document.createElement('style');
         style.id = 'ripple-keyframes';
         style.textContent = `
            @keyframes ripple {
               to {
                  transform: scale(4);
                  opacity: 0;
               }
            }
         `;
         document.head.appendChild(style);
      }
   }

   /**
    * Counter animation (can be used for stats)
    */
   function initCounters() {
      const counters = document.querySelectorAll('[data-counter]');

      counters.forEach(counter => {
         const target = parseInt(counter.getAttribute('data-counter'));
         const duration = 2000;
         const increment = target / (duration / 16);
         let current = 0;

         const updateCounter = () => {
            current += increment;
            if (current < target) {
               counter.textContent = Math.floor(current);
               requestAnimationFrame(updateCounter);
            } else {
               counter.textContent = target;
            }
         };

         const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
               updateCounter();
               observer.disconnect();
            }
         });

         observer.observe(counter);
      });
   }

   /**
    * Enhanced lazy loading with blur effect
    */
   function initLazyLoadEnhancement() {
      const images = document.querySelectorAll('img[loading="lazy"], img.card-lift');

      images.forEach(img => {
         if (img.complete) {
            img.classList.add('loaded');
         } else {
            img.addEventListener('load', function() {
               img.classList.add('loaded');
            });
         }
      });

      // Add CSS for image loading effect
      if (!document.getElementById('lazy-load-styles')) {
         const style = document.createElement('style');
         style.id = 'lazy-load-styles';
         style.textContent = `
            img.card-lift {
               filter: blur(0);
               transition: filter 0.3s ease-in-out;
            }
            img.card-lift:not(.loaded) {
               filter: blur(5px);
            }
         `;
         document.head.appendChild(style);
      }
   }

   /**
    * Mouse trail effect (optional - subtle)
    */
   function initMouseTrail() {
      let lastX = 0;
      let lastY = 0;
      let isMoving = false;

      document.addEventListener('mousemove', function(e) {
         if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
               createTrailDot(e.clientX, e.clientY);
               isMoving = false;
            });
         }
      });
   }

   function createTrailDot(x, y) {
      const dot = document.createElement('div');
      dot.style.cssText = `
         position: fixed;
         width: 8px;
         height: 8px;
         background: radial-gradient(circle, rgba(22, 54, 69, 0.3), transparent);
         border-radius: 50%;
         pointer-events: none;
         left: ${x}px;
         top: ${y}px;
         transform: translate(-50%, -50%);
         z-index: 9999;
         animation: fadeOut 1s ease-out forwards;
      `;

      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
   }

   // Add fade out animation for trail
   if (!document.getElementById('trail-keyframes')) {
      const style = document.createElement('style');
      style.id = 'trail-keyframes';
      style.textContent = `
         @keyframes fadeOut {
            to {
               opacity: 0;
               transform: translate(-50%, -50%) scale(2);
            }
         }
      `;
      document.head.appendChild(style);
   }

   /**
    * Add "back to top" button functionality enhancement
    */
   window.addEventListener('scroll', function() {
      const scrollBtn = document.querySelector('.btn-scroll-top');
      if (scrollBtn) {
         if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
         } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
         }
      }
   });

   /**
    * Product card hover sound effect (optional, commented out)
    */
   // function playHoverSound() {
   //    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE=');
   //    audio.volume = 0.1;
   //    audio.play().catch(() => {}); // Ignore errors
   // }

   // Log initialization
   console.log('🎨 Fabri Ventanas Custom Enhancements Loaded Successfully!');
   console.log('✨ Features: Parallax, Smooth Scroll, Particles, Tilt Effects, Ripple Buttons');

})();
