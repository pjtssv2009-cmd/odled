import { initHeroCanvas } from './hero-canvas.js';
import { initScrollingLED } from './scrolling-led.js';
import { initTechBreakdown } from './tech-breakdown.js';
import { initModals } from './quote-modal.js';
import { initProjectFilters } from './project-filter.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // 4. Product Tab Switcher on Homepage & Catalog
  const tabButtons = document.querySelectorAll('[data-product-tab]');
  const productGrids = document.querySelectorAll('[data-tab-content]');

  if (tabButtons.length > 0 && productGrids.length > 0) {
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTab = btn.dataset.productTab;
        productGrids.forEach((grid) => {
          if (grid.dataset.tabContent === targetTab || targetTab === 'all') {
            grid.style.display = 'grid';
          } else {
            grid.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Dynamic Stats Counter Animation
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.counterTarget, 10);
            const duration = 1800;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeProgress * target);

              counter.textContent = currentVal + (counter.dataset.counterSuffix || '');

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = target + (counter.dataset.counterSuffix || '');
              }
            };

            requestAnimationFrame(updateCount);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  // Initialize specific modules
  initHeroCanvas();
  initScrollingLED();
  initTechBreakdown();
  initModals();
  initProjectFilters();
});
