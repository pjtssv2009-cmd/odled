/**
 * Technology Section: Modular Exploded Architecture Interactive Explorer
 */
export function initTechBreakdown() {
  const stepButtons = document.querySelectorAll('.tech-step-btn');
  const stageTitle = document.getElementById('tech-stage-title');
  const stageDesc = document.getElementById('tech-stage-desc');
  const stageBullets = document.getElementById('tech-stage-bullets');
  const stageImg = document.getElementById('tech-stage-img');
  const stageTag = document.getElementById('tech-stage-tag');

  if (!stepButtons.length) return;

  const techData = {
    module: {
      tag: 'LAYER 01 / CORE COMPONENT',
      title: 'High-Density LED Module',
      desc: 'The fundamental building block of ODLED video walls. Engineered with premium SMD LEDs, high-refresh ICs, and multi-layer copper PCBs to deliver true-to-life contrast, deep blacks, and exceptional color fidelity.',
      img: '/src/assets/images/products/module-p2.jpg',
      bullets: [
        'Available in pixel pitches from P1.25mm up to P10mm',
        '3840Hz+ ultra-high refresh rate for flicker-free camera capture',
        'Gold-wire bonded SMD LED packages for 100,000-hour operational life',
        'Front-serviceable magnetic module mounting for 10-second maintenance'
      ]
    },
    cabinet: {
      tag: 'LAYER 02 / STRUCTURAL INTEGRITY',
      title: 'Die-Cast Aluminium Cabinet',
      desc: 'Precision-machined structural framework that houses and aligns modules with zero mechanical tolerance. Ultra-lightweight and naturally corrosion-resistant for both indoor architectural and outdoor environments.',
      img: '/src/assets/images/products/rental-cabinet-3.91.jpg',
      bullets: [
        'CNC-milled die-cast aluminium for sub-millimeter seam accuracy',
        'Natural passive convection airflow channels for heat dissipation',
        'Integrated fast-locking latches for swift modular assembly',
        'Lightweight build reduces structural load on building walls and trusses'
      ]
    },
    controller: {
      tag: 'LAYER 03 / PROCESSING INTELLIGENCE',
      title: 'Video Processor & Controller',
      desc: 'The brain of the display system. Sits between your media sources (HDMI, DisplayPort, SDI, IP Streaming) and pixel tiles, providing real-time hardware scaling, color calibration, and low-latency synchronization.',
      img: '/src/assets/images/products/controller.jpg',
      bullets: [
        'Real-time seamless scaling, PIP, and multi-window composition',
        'Hardware-level color correction and real-time screen dimming',
        'Multi-Gigabit Gigabit Ethernet & fiber optical signal distribution',
        'Cloud-enabled remote diagnostics and centralized content control'
      ]
    },
    power: {
      tag: 'LAYER 04 / ELECTRICAL REGULATION',
      title: 'High-Efficiency SMPS Power System',
      desc: 'Switched-Mode Power Supply units engineered for ultra-high conversion efficiency (92%+). Regulates high-voltage AC from the grid into pure, ripple-free low-voltage DC, ensuring electrical safety and thermal control.',
      img: '/src/assets/images/products/accessories.jpg',
      bullets: [
        '92%+ power conversion efficiency minimizing thermal output',
        'Over-voltage, over-current, and short-circuit auto-recovery protection',
        'Dual-power redundancy options for mission-critical command centers',
        'Low-noise fanless dissipation for quiet indoor installations'
      ]
    },
    display: {
      tag: 'LAYER 05 / FINAL INTEGRATION',
      title: 'Complete Seamless Display Wall',
      desc: 'The assembled LED video wall operates as a single uniform high-impact canvas without visible bezels or seams. Configurable to any aspect ratio, curve radius, or monumental scale.',
      img: '/src/assets/images/products/outdoor-p4.jpg',
      bullets: [
        '100% bezel-free seamless visual canvas of unlimited size',
        '140° to 160° ultra-wide horizontal and vertical viewing angles',
        'IP65 front and rear all-weather proofing for outdoor installations',
        'Dynamic HDR contrast with wide color gamut matching DCI-P3'
      ]
    }
  };

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepKey = btn.dataset.techStep;
      if (!techData[stepKey]) return;

      stepButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const data = techData[stepKey];
      if (stageTag) stageTag.textContent = data.tag;
      if (stageTitle) stageTitle.textContent = data.title;
      if (stageDesc) stageDesc.textContent = data.desc;
      if (stageImg) {
        stageImg.src = data.img;
        stageImg.alt = data.title;
      }

      if (stageBullets) {
        stageBullets.innerHTML = data.bullets
          .map(
            (b) => `
          <li class="tech-feature-bullet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>${b}</span>
          </li>
        `
          )
          .join('');
      }
    });
  });
}
