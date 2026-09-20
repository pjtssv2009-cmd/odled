/**
 * Hero Canvas: Interactive LED Matrix & Ambient Silver Particle Visualizer
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let dots = [];
  const spacing = 32; // Grid spacing in px
  let mouse = { x: -1000, y: -1000, radius: 180 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
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
          baseAlpha: 0.1 + Math.random() * 0.08,
          currentAlpha: 0.12,
          radius: 1.5
        });
      }
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
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

      // Subtle light pulse across matrix
      const wave = Math.sin(t + dot.x * 0.005 + dot.y * 0.005);
      let alpha = dot.baseAlpha + wave * 0.06;

      let radius = dot.radius;
      let color = `rgba(255, 255, 255, ${alpha})`;

      // Mouse proximity illumination
      if (dist < mouse.radius) {
        const proximity = 1 - (dist / mouse.radius);
        alpha = Math.min(1, alpha + proximity * 0.85);
        radius = dot.radius + proximity * 2;
        color = `rgba(255, 255, 255, ${alpha})`;

        // Ambient halo
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 228, 231, ${proximity * 0.12})`;
        ctx.fill();
      }

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
