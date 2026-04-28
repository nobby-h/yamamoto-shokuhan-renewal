import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const strip = document.getElementById('js-gallery-strip');
const gallery = document.querySelector('.p-gallery');

if (strip && gallery) {
  // Wide horizontal sweep
  gsap.fromTo(strip,
    { xPercent: 15 },
    {
      xPercent: -55,
      ease: 'none',
      scrollTrigger: {
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
      },
    }
  );

  // Individual items scale-in (no opacity)
  const items = strip.querySelectorAll('.p-gallery__item');
  items.forEach((item, i) => {
    gsap.from(item, {
      scale: 0.8,
      rotate: (i % 2 === 0 ? -2 : 2),
      duration: 0.8,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gallery,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
