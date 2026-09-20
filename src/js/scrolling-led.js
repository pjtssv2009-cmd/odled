/**
 * Scrolling LED Display Simulator
 * Controls real-time message updates, speed adjustments, and color profile switching.
 */
export function initScrollingLED() {
  const textInput = document.getElementById('led-text-input');
  const marqueeTrack = document.getElementById('led-marquee-track');
  const colorButtons = document.querySelectorAll('[data-led-color]');
  const speedInput = document.getElementById('led-speed-input');

  if (!marqueeTrack) return;

  // Text input update
  if (textInput) {
    textInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      marqueeTrack.textContent = val.length > 0 ? val : 'ODLED • HIGH IMPACT COMMERCIAL DISPLAYS';
    });
  }

  // Color profile toggles
  if (colorButtons.length > 0) {
    colorButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        colorButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const colorMode = btn.dataset.ledColor;
        marqueeTrack.className = 'led-marquee-track';

        if (colorMode === 'red') marqueeTrack.classList.add('led-color-red');
        else if (colorMode === 'amber') marqueeTrack.classList.add('led-color-amber');
        else if (colorMode === 'green') marqueeTrack.classList.add('led-color-green');
        else marqueeTrack.classList.add('led-color-rainbow');
      });
    });
  }

  // Speed control if present
  if (speedInput) {
    speedInput.addEventListener('input', (e) => {
      const speed = e.target.value;
      const duration = 24 - speed * 1.8;
      marqueeTrack.style.animationDuration = `${duration}s`;
    });
  }
}
