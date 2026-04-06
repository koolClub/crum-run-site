(() => {
  const page = document.documentElement.dataset.page;
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a[data-page]');

  navLinks.forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryTiles = document.querySelectorAll('[data-lightbox-src]');

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.style.overflow = '';
  };

  if (lightbox && lightboxImage && galleryTiles.length) {
    galleryTiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        const src = tile.getAttribute('data-lightbox-src');
        const alt = tile.getAttribute('data-lightbox-alt') || '';
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }
})();
