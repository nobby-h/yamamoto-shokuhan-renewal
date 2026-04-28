import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const pagetopBtn = document.getElementById('js-pagetop');

if (pagetopBtn) {
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    pagetopBtn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  // Scroll to top
  pagetopBtn.addEventListener('click', () => {
    gsap.to(window, { scrollTo: 0, duration: 0.8, ease: 'power2.inOut' });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerHeight = document.getElementById('js-header')?.offsetHeight || 0;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: headerHeight },
      duration: 0.8,
      ease: 'power2.inOut',
    });
  });
});
