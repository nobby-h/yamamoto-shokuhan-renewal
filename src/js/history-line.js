import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Grow the gold timeline line as user scrolls through the section
const line = document.getElementById('js-history-line');
const timeline = document.querySelector('.p-history__timeline');

if (line && timeline) {
  gsap.to(line, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.5,
    },
  });
}
