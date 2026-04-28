const menuBtn = document.getElementById('js-menu-btn');
const drawer = document.getElementById('js-drawer');
const overlay = document.getElementById('js-drawer-overlay');

if (menuBtn && drawer && overlay) {
  const toggle = (open) => {
    const isOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', isOpen);
    overlay.classList.toggle('is-open', isOpen);
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', () => toggle());
  overlay.addEventListener('click', () => toggle(false));

  // Close on link click
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      toggle(false);
    }
  });
}
