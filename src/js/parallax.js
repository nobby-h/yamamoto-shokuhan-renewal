import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Honor reduced motion — skip all scrub parallax for users who prefer reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth out scrub animations to reduce micro-jitter at small scroll deltas
gsap.defaults({ overwrite: 'auto' });
ScrollTrigger.config({ ignoreMobileResize: true });

// ─── Vision: gentler parallax (no scale to avoid wobble) ───
const visionBg = document.querySelector('.p-vision__bg');
if (visionBg && !prefersReducedMotion) {
  gsap.fromTo(visionBg,
    { yPercent: 12 },
    {
      yPercent: -22,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: '.p-vision',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    }
  );
}

// Vision quote — float-up
const visionQuote = document.querySelector('.p-vision__quote');
if (visionQuote) {
  gsap.from(visionQuote, {
    y: 80,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.p-vision',
      start: 'top 65%',
      once: true,
    },
  });
}

// Vision values — stagger
const visionValues = document.querySelectorAll('.p-vision__value');
if (visionValues.length) {
  gsap.from(visionValues, {
    y: 60,
    scale: 0.9,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.p-vision__values',
      start: 'top 80%',
      once: true,
    },
  });
}

// ─── Parallax bands: gentle vertical drift only (no scale) ───
if (!prefersReducedMotion) {
  document.querySelectorAll('.p-parallax-band__bg').forEach((bg) => {
    gsap.fromTo(bg,
      { yPercent: 15 },
      {
        yPercent: -25,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: bg.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  });
}

// Section header English title — drift disabled to prevent perceived shake while scrolling.
// (Previously animated yPercent/xPercent on every scroll, which caused visible jitter.)

// ─── Service cards: stagger entry ───
const serviceGrid = document.querySelector('.p-service__grid');
if (serviceGrid) {
  gsap.from('.p-service-card', {
    y: 80,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: serviceGrid,
      start: 'top 80%',
      once: true,
    },
  });
}

// ─── Numbers: background text sweep (smoothed) ───
const numbersBgText = document.querySelector('.p-numbers__bg-text');
if (numbersBgText && !prefersReducedMotion) {
  gsap.fromTo(numbersBgText,
    { xPercent: 60 },
    {
      xPercent: -30,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: '.p-numbers',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
}

// ─── History: items slide in ───
document.querySelectorAll('.p-history__item').forEach((item, i) => {
  const direction = i % 2 === 0 ? -1 : 1;
  gsap.from(item, {
    x: direction * 80,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 88%',
      once: true,
    },
  });
});

// ─── Gallery: scale entry ───
const gallerySection = document.querySelector('.p-gallery');
if (gallerySection) {
  gsap.from(gallerySection, {
    scale: 0.85,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: gallerySection,
      start: 'top 92%',
      once: true,
    },
  });
}

// Gallery overlay text — reduced parallax range for smoother scroll
const galleryText = document.querySelector('.p-gallery__text');
if (galleryText && !prefersReducedMotion) {
  gsap.fromTo(galleryText,
    { yPercent: 30 },
    {
      yPercent: -30,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: '.p-gallery',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
}

// ─── Recruit CTA: subtle vertical drift (no rotate — was causing perceived wobble) ───
const recruitBg = document.querySelector('.p-recruit-cta__bg');
if (recruitBg && !prefersReducedMotion) {
  gsap.fromTo(recruitBg,
    { yPercent: 10 },
    {
      yPercent: -20,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: '.p-recruit-cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    }
  );
}

// Recruit job icons — stagger
const recruitJobs = document.querySelectorAll('.p-recruit-cta__job');
if (recruitJobs.length) {
  gsap.from(recruitJobs, {
    y: 40,
    scale: 0.7,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.p-recruit-cta__jobs',
      start: 'top 85%',
      once: true,
    },
  });
}

// ─── Group card: scale reveal ───
const groupCard = document.querySelector('.p-group__card');
if (groupCard) {
  gsap.from(groupCard, {
    scale: 0.9,
    y: 40,
    duration: 1,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: groupCard,
      start: 'top 78%',
      once: true,
    },
  });
}

// ─── Footer banners: stagger slide-up ───
const footerBanners = document.querySelectorAll('.p-footer-banner');
if (footerBanners.length) {
  gsap.from(footerBanners, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.p-footer-banners',
      start: 'top 90%',
      once: true,
    },
  });
}
