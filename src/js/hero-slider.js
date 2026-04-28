import Swiper from 'swiper';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';

const heroEl = document.querySelector('.p-hero__slider');

if (heroEl) {
  const animateContent = (slide) => {
    const content = slide.querySelector('.p-hero__content');
    if (!content) return;

    // Ken Burns — slow zoom on background
    const bg = slide.querySelector('.p-hero__slide-bg');
    if (bg) {
      gsap.fromTo(bg,
        { scale: 1.1 },
        { scale: 1, duration: 6, ease: 'none' }
      );
    }

    // Content elements — dramatic stagger entry
    gsap.fromTo(
      content.children,
      { y: 40 },
      { y: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: 'power3.out' }
    );
  };

  const swiper = new Swiper(heroEl, {
    modules: [EffectFade, Autoplay, Pagination],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    speed: 1500,
    loop: true,
    pagination: {
      el: '.p-hero__pagination',
      clickable: true,
    },
    on: {
      init(s) {
        animateContent(s.slides[s.activeIndex]);
      },
      slideChangeTransitionStart(s) {
        animateContent(s.slides[s.activeIndex]);
      },
    },
  });
}
