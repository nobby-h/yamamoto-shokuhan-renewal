// CSS
import './css/main.scss';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-fade';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Alpine.js
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();

// Modules
import './js/header.js';
import './js/mobile-nav.js';
import './js/hero-slider.js';
import './js/parallax.js';
import './js/service-cards.js';
import './js/counter.js';
import './js/history-line.js';
import './js/gallery.js';
import './js/scroll-animations.js';
import './js/smooth-scroll.js';

// Subpage parallax (works on all pages via data attributes)
import './js/subpage-parallax.js';
