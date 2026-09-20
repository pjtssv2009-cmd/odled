/**
 * Hero Canvas: Interactive Full-Color Chromatic LED Matrix Visualizer
 * In resting state, subtle monochrome silver matrix dots pulse gently.
 * While hovering in the hero section, pixels dynamically ignite in vibrant, colorful RGB spectrum
 * with crisp, tiny, refined micro-pixel sizing.
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const heroSection = document.getElementById('hero') || canvas.closest('.section-hero') || canvas.parentElement;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let dots = [];
  const spacing = 24; // Dense micro-grid spacing in px
  let mouse = { x: -1000, y: -1000, radius: 170 };

  function resize() {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
    createGrid();
  }

  function createGrid() {
    dots = [];
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * spacing + (spacing / 2),
          y: r * spacing + (spacing / 2),
          baseAlpha: 0.07 + Math.random() * 0.05,
          radius: 1.0
        });
      }
    }
  }

  window.addEventListener('resize', resize);

  // Track hover only within hero section
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Touch support for mobile
  heroSection.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  heroSection.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function render(time) {
    ctx.clearRect(0, 0, width, height);

    const t = time * 0.0015;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Subtle resting wave across matrix
      const wave = Math.sin(t + dot.x * 0.006 + dot.y * 0.006);
      let alpha = dot.baseAlpha + wave * 0.035;
      let radius = dot.radius;
      let color = `rgba(255, 255, 255, ${Math.max(0.04, alpha)})`;

      // Mouse proximity illumination: Dynamic multi-color RGB chromatic spectrum with tiny micro-dots
      if (dist < mouse.radius) {
        const proximity = 1 - (dist / mouse.radius);
        alpha = Math.min(1, alpha + proximity * 0.95);
        
        // Keep pixels tiny and crisp on hover
        radius = dot.radius + proximity * 0.75;

        // Calculate dynamic RGB color spectrum on hover
        const angle = Math.atan2(dy, dx);
        const hue = Math.floor((time * 0.12 + (dot.x * 0.38) + (dot.y * 0.38) + (angle * 180 / Math.PI)) % 360);

        // Core vivid micro LED dot
        color = `hsla(${hue}, 100%, 65%, ${alpha})`;

        // Crisp compact colorful glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 95%, 55%, ${proximity * 0.22})`;
        ctx.fill();
      }

      // Draw LED pixel dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  resize();
  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}
