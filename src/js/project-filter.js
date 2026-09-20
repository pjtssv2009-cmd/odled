/**
 * Projects Filter & Lightbox Viewer
 */
export function initProjectFilters() {
  const filterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.dataset.projectFilter;

        projectCards.forEach((card) => {
          const category = card.dataset.category || '';
          if (filterVal === 'all' || category.includes(filterVal)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox click on project cards
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMeta = document.getElementById('lightbox-meta');

  if (lightboxModal && lightboxImg) {
    projectCards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const client = card.querySelector('.project-client')?.textContent || 'ODLED Installation';
        const location = card.querySelector('.project-location-badge')?.textContent || '';
        const size = card.querySelector('.project-size')?.textContent || '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = client;
        }
        if (lightboxTitle) lightboxTitle.textContent = client;
        if (lightboxMeta) lightboxMeta.textContent = `${location} • ${size}`;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }
}
