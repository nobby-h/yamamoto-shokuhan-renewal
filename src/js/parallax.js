import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ─── Vision: deep multi-layer parallax ───
const visionBg = document.querySelector('.p-vision__bg');
if (visionBg) {
  gsap.fromTo(visionBg,
    { yPercent: 20, scale: 1.15 },
    {
      yPercent: -50,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-vision',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
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

// ─── Parallax bands: background depth ───
document.querySelectorAll('.p-parallax-band__bg').forEach((bg) => {
  gsap.fromTo(bg,
    { yPercent: 25, scale: 1.2 },
    {
      yPercent: -45,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.4,
      },
    }
  );
});

// Parallax band text — opposite direction
document.querySelectorAll('.p-parallax-band__content').forEach((content) => {
  gsap.fromTo(content,
    { yPercent: -30 },
    {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: content.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.4,
      },
    }
  );
});

// ─── Section headers: en title drift (position only, no opacity) ───
document.querySelectorAll('.p-section-header__en').forEach((el) => {
  gsap.fromTo(el,
    { yPercent: 40, xPercent: -10 },
    {
      yPercent: -60,
      xPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    }
  );
});

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

// ─── Numbers: background text sweep (decorative only) ───
const numbersBgText = document.querySelector('.p-numbers__bg-text');
if (numbersBgText) {
  gsap.fromTo(numbersBgText,
    { xPercent: 90 },
    {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-numbers',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
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

// Gallery overlay text — parallax
const galleryText = document.querySelector('.p-gallery__text');
if (galleryText) {
  gsap.fromTo(galleryText,
    { yPercent: 60 },
    {
      yPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-gallery',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    }
  );
}

// ─── Recruit CTA: background zoom ───
const recruitBg = document.querySelector('.p-recruit-cta__bg');
if (recruitBg) {
  gsap.fromTo(recruitBg,
    { scale: 1, rotate: -1 },
    {
      scale: 1.35,
      rotate: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-recruit-cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
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
