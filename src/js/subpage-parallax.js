import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ─── Page hero: Ken Burns zoom + parallax ───
const heroBackground = document.querySelector('.p-page-hero__bg');
if (heroBackground) {
  gsap.fromTo(heroBackground,
    { scale: 1.15 },
    {
      scale: 1,
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-page-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    }
  );
}

// ─── Parallax bands on subpages ───
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

// ─── Section headers: en title drift (position only) ───
document.querySelectorAll('.p-section-header__en').forEach((el) => {
  gsap.fromTo(el,
    { yPercent: 40, xPercent: -10 },
    {
      yPercent: -60,
      xPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el.closest('.p-page-section') || el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    }
  );
});

// ─── Scroll reveal: [data-animate] — movement only, no opacity ───
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

// ─── Image reveal with clip-path ───
document.querySelectorAll('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    clipPath: 'inset(10% 10% 10% 10%)',
    scale: 0.95,
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true,
    },
  });
});

// ─── Stagger items: [data-stagger] container ───
document.querySelectorAll('[data-stagger]').forEach((container) => {
  const items = container.children;
  gsap.from(items, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger: container,
      start: 'top 82%',
      once: true,
    },
  });
});

// ─── Counter animation for any [data-count-to] ───
document.querySelectorAll('[data-count-to]').forEach((el) => {
  const target = parseInt(el.dataset.countTo, 10);
  if (isNaN(target)) return;
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString();
        },
      });
    },
  });
});

// ─── Full-width image parallax: [data-parallax-bg] ───
document.querySelectorAll('[data-parallax-bg]').forEach((el) => {
  gsap.fromTo(el,
    { yPercent: -15 },
    {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    }
  );
});

// ─── Horizontal slide-in: [data-slide="left"|"right"] ───
document.querySelectorAll('[data-slide]').forEach((el) => {
  const dir = el.dataset.slide === 'right' ? 80 : -80;
  gsap.from(el, {
    x: dir,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
    },
  });
});

// ─── Text line-by-line reveal: [data-lines] ───
document.querySelectorAll('[data-lines]').forEach((block) => {
  const lines = block.querySelectorAll('p, li, h3, dt, dd, tr');
  if (!lines.length) return;
  gsap.from(lines, {
    y: 20,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: block,
      start: 'top 82%',
      once: true,
    },
  });
});

// ─── Footer banners stagger ───
const footerBanners = document.querySelectorAll('.p-footer-banner');
if (footerBanners.length) {
  gsap.from(footerBanners, {
    y: 40,
    scale: 0.95,
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
