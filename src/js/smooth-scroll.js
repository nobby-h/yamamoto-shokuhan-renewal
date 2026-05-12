import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const pagetopBtn = document.getElementById('js-pagetop');
const floatingLogo = document.querySelector('.p-floating-logo');

// Toggle visibility of pagetop button and floating logo based on scroll
if (pagetopBtn || floatingLogo) {
  const PAGETOP_THRESHOLD = 400;
  const FLOATING_LOGO_THRESHOLD = 600;

  const onScroll = () => {
    const y = window.scrollY;
    if (pagetopBtn) pagetopBtn.classList.toggle('is-visible', y > PAGETOP_THRESHOLD);
    if (floatingLogo) floatingLogo.classList.toggle('is-visible', y > FLOATING_LOGO_THRESHOLD);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (pagetopBtn) {
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
