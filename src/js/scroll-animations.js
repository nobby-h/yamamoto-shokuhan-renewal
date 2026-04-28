import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Batch animate all [data-animate] elements — no opacity, movement only
ScrollTrigger.batch('[data-animate]', {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 50,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  },
  start: 'top 88%',
  once: true,
});
