const header = document.getElementById('js-header');

if (header) {
  const onScroll = () => {
    header.classList.toggle('l-header--scrolled', window.scrollY > 80);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
