/**
 * Quote Modal & Cloud Login Handlers
 */
export function initModals() {
  // Quote Modal triggers
  const quoteModal = document.getElementById('quote-modal');
  const quoteTriggers = document.querySelectorAll('[data-open-quote]');
  const quoteCloseBtns = document.querySelectorAll('[data-close-quote]');

  // Login Modal triggers
  const loginModal = document.getElementById('login-modal');
  const loginTriggers = document.querySelectorAll('[data-open-login]');
  const loginCloseBtns = document.querySelectorAll('[data-close-login]');

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxCloseBtns = document.querySelectorAll('[data-close-lightbox]');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  quoteTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });

  quoteCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(quoteModal));
  });

  loginTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModal);
    });
  });

  loginCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(loginModal));
  });

  lightboxCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => closeModal(lightboxModal));
  });

  // Close on outside click
  [quoteModal, loginModal, lightboxModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape key closes open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(quoteModal);
      closeModal(loginModal);
      closeModal(lightboxModal);
    }
  });

  // Quick Spec / Quote Calculator inside Quote Modal
  const appTypeSelect = document.getElementById('quote-app-type');
  const pitchSelect = document.getElementById('quote-pitch');
  const widthInput = document.getElementById('quote-width');
  const heightInput = document.getElementById('quote-height');
  const calcOutput = document.getElementById('quote-calc-summary');

  function updateEstimate() {
    if (!calcOutput) return;
    const w = parseFloat(widthInput?.value) || 0;
    const h = parseFloat(heightInput?.value) || 0;
    const pitch = pitchSelect?.value || 'P4';
    const appType = appTypeSelect?.value || 'Outdoor';

    if (w > 0 && h > 0) {
      const areaSqFt = (w * h).toFixed(1);
      const pitchNum = parseFloat(pitch.replace('P', '')) || 4;
      const totalPixels = Math.round(((w * 304.8) / pitchNum) * ((h * 304.8) / pitchNum));
      const formattedPixels = totalPixels >= 1000000 
        ? `${(totalPixels / 1000000).toFixed(2)} Million Pixels` 
        : `${(totalPixels / 1000).toFixed(0)}k Pixels`;

      calcOutput.innerHTML = `
        <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 8px; padding: 0.8rem 1rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent-cyan); line-height: 1.5;">
          <strong>Configuration Preview:</strong> ${appType} ${pitch} • ${w} × ${h} ft (${areaSqFt} sq.ft)<br>
          <span style="color: #ffffff;">Est. Screen Resolution: ~${formattedPixels}</span>
        </div>
      `;
    } else {
      calcOutput.innerHTML = '';
    }
  }

  [appTypeSelect, pitchSelect, widthInput, heightInput].forEach((el) => {
    if (el) el.addEventListener('input', updateEstimate);
  });

  // Handle Quote Form Submit
  const quoteForm = document.getElementById('odled-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      setTimeout(() => {
        quoteForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 54px; height: 54px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; color: #10b981;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">Quotation Request Received</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 440px; margin: 0 auto 1.5rem;">
              Thank you for contacting ODLED. Our display engineering team will review your specifications and send a tailored quotation within 2 business hours.
            </p>
            <button type="button" class="btn btn-secondary btn-sm" data-close-quote>Close</button>
          </div>
        `;
        const newClose = quoteForm.querySelector('[data-close-quote]');
        if (newClose) newClose.addEventListener('click', () => closeModal(quoteModal));
      }, 800);
    });
  }
}
