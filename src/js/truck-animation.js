import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const truck = document.getElementById('js-truck');
const divider = document.querySelector('.p-truck-divider');

if (truck && divider) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: divider,
      start: 'top 85%',
      end: 'bottom 15%',
      scrub: 1,
    },
  });

  // Truck drives across
  tl.fromTo(
    truck,
    { xPercent: -150 },
    { xPercent: 150, ease: 'none' }
  );

  // Clouds move slower (parallax)
  tl.fromTo('.cloud--1', { x: -30 }, { x: 80 }, 0);
  tl.fromTo('.cloud--2', { x: -20 }, { x: 60 }, 0);
  tl.fromTo('.cloud--3', { x: -10 }, { x: 40 }, 0);
}
