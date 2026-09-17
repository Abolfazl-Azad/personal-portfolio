import { profile, researchInterests, focusAreas, education, coursework, currentFocus, experience, research, projects, skillGroups, notes } from './data.js';

const el = (selector) => document.querySelector(selector);
const safeText = (val) => val ? val : "";

const render = () => {
  const focusAreasList = el('#focus-areas-list');
  if (focusAreasList) {
    focusAreasList.innerHTML = focusAreas.map(item => `
      <article class="reveal">
        <strong>${safeText(item.title)}</strong>
        <p>${safeText(item.description)}</p>
      </article>
    `).join('');
  }

  const currentFocusList = el('#current-focus-list');
  if (currentFocusList) {
    currentFocusList.innerHTML = currentFocus.map(item => `
      <article class="reveal">
        <span class="mono muted">${safeText(item.status)}</span>
        <strong>${safeText(item.title)}</strong>
        <p>${safeText(item.description)}</p>
      </article>
    `).join('');
  }

  const eduList = el('#education-list');
  if (eduList) {
    eduList.innerHTML = education.map((item, index) => {
      let dateText = '';
      if (item.start && item.end) {
        dateText = `${item.start} — ${item.end}`;
        if (item.startPersian && item.endPersian) {
          dateText += `<br><span style="font-size: 0.75em; opacity: 0.6;">(${item.startPersian} — ${item.endPersian})</span>`;
        }
      } else {
        dateText = safeText(item.start);
      }
      return `
      <article class="timeline-item reveal">
        <div class="timeline-date mono muted">
          ${dateText}<br>
          <span style="font-size: 0.65em; letter-spacing: 0.1em;">0${index + 1}</span>
        </div>
        <div>
          <h3>${safeText(item.institution)}</h3>
          <p>${safeText(item.degree)}</p>
        </div>
      </article>
      `;
    }).join('');
  }

  const aboutKeywordsList = el('#about-keywords-list');
  if (aboutKeywordsList) {
    aboutKeywordsList.innerHTML = `
      <div class="about-focus-tree mono mt-4 reveal">
        <div class="tree-node"><span>ABOUT</span></div>
        <div class="tree-branch">
          ${profile.aboutKeywords.map(kw => `<div class="tree-item">${kw}</div>`).join('')}
        </div>
      </div>
    `;
  }

  // Research Interests
  const researchInterestsContent = el('#research-interests-content');
  if (researchInterestsContent) {
    researchInterestsContent.innerHTML = `
      <div class="research-interests-block reveal">
        <p class="research-statement">${safeText(researchInterests.statement)}</p>
        <div class="research-directions-grid">
          ${researchInterests.directions.map(d => `
            <div class="research-direction-item">
              <h3>${safeText(d.area)}</h3>
              <p>${safeText(d.detail)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Coursework
  const courseworkList = el('#coursework-list');
  if (courseworkList) {
    courseworkList.innerHTML = coursework.map(group => `
      <article class="reveal">
        <span class="mono muted">${safeText(group.category)}</span>
        <div class="coursework-items">
          ${group.courses.map(c => `<span class="coursework-tag">${c}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }


  const expList = el('#experience-list');
  if (expList) {
    expList.innerHTML = experience.map(item => `
      <article class="timeline-item reveal">
        <div class="mono muted">${safeText(item.date)}</div>
        <div>
          <h3>${safeText(item.title)}</h3>
          <p>${safeText(item.org)}</p>
          <p class="mt-2">${safeText(item.detail)}</p>
        </div>
      </article>
    `).join('');
  }

  const resList = el('#research-list');
  if (resList) {
    resList.innerHTML = research.map(item => `
      <article class="research-item reveal">
        <div>
          <h3>${safeText(item.topic)}</h3>
          <span class="mono type">${safeText(item.type)}</span>
          ${item.status ? `<span class="research-status mono">${safeText(item.status)}</span>` : ''}
          <p>${safeText(item.description)}</p>
          ${item.contribution ? `
            <div class="research-detail mt-2">
              <span class="mono muted" style="font-size: 0.7rem;">MY CONTRIBUTION</span>
              <p>${safeText(item.contribution)}</p>
            </div>
          ` : ''}
          ${item.methodology ? `
            <div class="research-detail mt-2">
              <span class="mono muted" style="font-size: 0.7rem;">METHODOLOGY</span>
              <p>${safeText(item.methodology)}</p>
            </div>
          ` : ''}
          <p class="muted mt-2">Supervisor<br>${safeText(item.supervisor)}</p>
          <div class="hero-tags mono mt-2">
            ${item.tags ? item.tags.map(t => `<span>${safeText(t)}</span>`).join('') : ''}
          </div>
        </div>
        <div class="research-svg">
          <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--accent); width: 100%; height: auto;">
            <text x="60" y="15" font-family="monospace" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">INPUT</text>
            <path d="M60 20 v10 M57 26 l3 4 l3 -4" />
            <text x="60" y="45" font-family="monospace" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">CONFIG</text>
            <path d="M60 50 v10 M57 56 l3 4 l3 -4" />
            <rect x="20" y="65" width="80" height="60" stroke="currentColor" fill="rgba(56,255,139,0.05)" />
            <path d="M20 85 h80 M20 105 h80 M46.6 65 v60 M73.3 65 v60" stroke-dasharray="2 2" />
            <text x="33" y="79" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="60" y="79" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="86" y="79" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="33" y="99" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="60" y="99" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="86" y="99" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="33" y="119" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="60" y="119" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <text x="86" y="119" font-family="monospace" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">PE</text>
            <path d="M60 125 v10 M57 131 l3 4 l3 -4" />
            <text x="60" y="150" font-family="monospace" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">OUTPUT</text>
          </svg>
        </div>
      </article>
    `).join('');
  }

const getProjectDiagram = (type) => {
    const base = `
      fill="none"
      viewBox="0 0 500 76"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    `;

    const arrow = (x1, x2) => `
      <line x1="${x1}" y1="38" x2="${x2 - 7}" y2="38" stroke="currentColor" stroke-width="1"/>
      <path d="M${x2 - 7} 34 L${x2} 38 L${x2 - 7} 42"
            stroke="currentColor" stroke-width="1" fill="none"/>
    `;

    const box = (x, width, label, highlight = false) => `
      <rect x="${x}" y="23" width="${width}" height="30" rx="2"
            fill="${highlight ? 'rgba(56,255,139,.05)' : 'none'}"
            stroke="${highlight ? 'var(--accent)' : 'currentColor'}"
            stroke-width="1"/>
      <text x="${x + width / 2}" y="38"
            fill="${highlight ? 'var(--accent)' : 'currentColor'}"
            font-family="monospace"
            font-size="11"
            text-anchor="middle"
            dominant-baseline="middle">${label}</text>
    `;

    switch (type) {
      case 'pipeline':
        return `
          <svg ${base} aria-label="Five-stage RISC-V pipeline">
            ${box(8, 70, 'IF')}
            ${arrow(78, 108)}
            ${box(108, 70, 'ID')}
            ${arrow(178, 208)}
            ${box(208, 70, 'EX')}
            ${arrow(278, 308)}
            ${box(308, 70, 'MEM')}
            ${arrow(378, 408)}
            ${box(408, 70, 'WB')}
          </svg>
        `;

      case 'dma':
        return `
          <svg ${base} aria-label="FIR filter and DMA flow">
            ${box(85, 90, 'FIR')}
            ${arrow(175, 205)}
            ${box(205, 90, 'DMA')}
            ${arrow(295, 325)}
            ${box(325, 90, 'MEM')}
          </svg>
        `;

      case 'asic':
        return `
          <svg ${base} aria-label="ASIC design flow">
            ${box(8, 90, 'RTL')}
            ${arrow(98, 128)}
            ${box(128, 90, 'SYNTH')}
            ${arrow(218, 248)}
            ${box(248, 90, 'P&amp;R')}
            ${arrow(338, 368)}
            ${box(368, 90, 'GDS')}
          </svg>
        `;

      case 'uart':
        return `
          <svg ${base} aria-label="UART communication flow">
            ${box(85, 90, 'TX')}
            ${arrow(175, 205)}
            ${box(205, 90, 'UART', true)}
            ${arrow(295, 325)}
            ${box(325, 90, 'RX')}
          </svg>
        `;

      case 'modulation':
        return `
          <svg ${base} aria-label="Digital modulation flow">
            ${box(55, 110, 'DATA')}
            ${arrow(165, 195)}
            ${box(195, 110, 'DDS/MOD', true)}
            ${arrow(305, 335)}
            ${box(335, 110, 'SIGNAL')}
          </svg>
        `;

      case 'multiplier':
        return `
          <svg
            width="100%"
            height="92"
            viewBox="0 0 240 120"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Booth multiplier flow"
          >
            <rect x="55" y="4" width="130" height="28" rx="2" stroke="currentColor"/>
            <rect x="55" y="46" width="130" height="28" rx="2"
                  stroke="var(--accent)" fill="rgba(56,255,139,.05)"/>
            <rect x="55" y="88" width="130" height="28" rx="2" stroke="currentColor"/>

            <line x1="120" y1="32" x2="120" y2="46" stroke="currentColor"/>
            <path d="M116 42 L120 46 L124 42" stroke="currentColor"/>

            <line x1="120" y1="74" x2="120" y2="88" stroke="currentColor"/>
            <path d="M116 84 L120 88 L124 84" stroke="currentColor"/>

            <g font-family="monospace" font-size="9"
               text-anchor="middle" dominant-baseline="middle">
              <text x="120" y="18" fill="currentColor">MULTIPLICAND</text>
              <text x="120" y="60" fill="var(--accent)">BOOTH</text>
              <text x="120" y="102" fill="currentColor">PRODUCT</text>
            </g>
          </svg>
        `;

      default:
        return '';
    }
  };

  const projList = el('#project-list');
  if (projList) {
    projList.innerHTML = projects.map(item => `
      <a href="${item.github ? item.github : '#'}" target="_blank" rel="noopener noreferrer" class="project-card reveal">
        <div class="project-num mono">${safeText(item.number)}</div>
        <div class="project-content">
          <h3>${safeText(item.title)}</h3>
          <div class="project-type mono">${safeText(item.type)}</div>
          <p>${safeText(item.description)}</p>
          <div class="project-meta">
            ${item.tech.map(t => `<span>${safeText(t)}</span>`).join('')}
          </div>
        </div>
        <div class="project-visual" aria-hidden="true">
          ${getProjectDiagram(item.visualType)}
        </div>
        <div class="project-link-icon">↗</div>
      </a>
    `).join('');
    
    // Add "VIEW ALL PROJECTS ON GITHUB" button at the end
    projList.insertAdjacentHTML('afterend', `
      <div class="view-all-projects reveal">
        <a class="button-link" href="https://github.com/Abolfazl-Azad" target="_blank" rel="noopener noreferrer">VIEW ALL PROJECTS ON GITHUB ↗</a>
      </div>
    `);
  }

  const skillsList = el('#skills-list');
  if (skillsList) {
    skillsList.innerHTML = skillGroups.map(group => `
      <article class="skill-group reveal">
        <div class="skill-group-header">
          <span class="mono skill-num">${group.number}</span>
          <h3>${group.title}</h3>
        </div>
        <p>${group.description}</p>
        <div class="skill-tags mono">
          ${group.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  const notesList = el('#notes-list');
  if (notesList) {
    notesList.innerHTML = notes.map((note, idx) => `
      <div class="note-journal-item reveal">
        <div class="note-index mono muted">0${idx + 1}</div>
        <div class="note-content">
          <div class="note-meta mono">
            <span class="note-status ${safeText(note.status).toLowerCase()}">${safeText(note.status)}</span>
          </div>
          <h3>${safeText(note.title)}</h3>
          <p class="note-topic mono">${safeText(note.topic)}</p>
          <div class="note-tech mono">
            ${note.tech ? note.tech.map(t => `<span>${safeText(t)}</span>`).join(' &middot; ') : ''}
          </div>
          <a href="${note.sourceUrl ? safeText(note.sourceUrl) : '#'}" target="_blank" rel="noopener noreferrer" class="note-read-link mono">
            [READ NOTE ↗]
          </a>
        </div>
        ${note.visualType ? `<div class="note-visual" aria-hidden="true">${getProjectDiagram(note.visualType)}</div>` : ''}
      </div>
    `).join('');
  }
};

render();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;
    observer.observe(node);
  });
}

// Subtle floating motion for the hero instrument panel.
const art = document.querySelector('.hero-monitor');
if (art && !reduceMotion) {
  let t = 0;
  setInterval(() => {
    t += 0.08;
    art.style.transform = `translateY(${Math.sin(t) * 1.8}px)`;
  }, 60);
}

// Matrix-like binary background: each stream is independent, softly glowing,
// and partially faded so the portfolio content remains dominant.
const binaryCanvas = document.querySelector('#binary-bg');
if (binaryCanvas) {
  const ctx = binaryCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let fontSize = 18;
  let columns = [];
  let raf = null;

  const makeColumns = () => {
    fontSize = window.innerWidth < 700 ? 14 : 18;
    const count = Math.ceil(window.innerWidth / (fontSize * 1.45));
    columns = Array.from({ length: count }, (_, i) => ({
      x: i * fontSize * 1.45 + Math.random() * 8,
      y: Math.random() * window.innerHeight,
      speed: .18 + Math.random() * .62,
      gap: fontSize * (0.85 + Math.random() * .55),
      length: 8 + Math.floor(Math.random() * 17),
      drift: (Math.random() - .5) * .10,
      phase: Math.random() * Math.PI * 2,
    }));
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    binaryCanvas.width = Math.floor(width * dpr);
    binaryCanvas.height = Math.floor(height * dpr);
    binaryCanvas.style.width = `${width}px`;
    binaryCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeColumns();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px "DM Mono", monospace`;
    ctx.textBaseline = 'top';

    const now = performance.now() * .001;
    for (const stream of columns) {
      for (let i = 0; i < stream.length; i++) {
        const y = stream.y - i * stream.gap;
        if (y < -stream.gap || y > height + stream.gap) continue;
        const head = 1 - i / stream.length;
        const flicker = .62 + .38 * Math.sin(now * 2.4 + stream.phase + i);
        const alpha = Math.max(.015, .055 + .20 * head) * flicker;
        ctx.fillStyle = `rgba(56, 255, 139, ${alpha})`;
        ctx.fillText(Math.random() > .5 ? '1' : '0', stream.x + Math.sin(now + stream.phase) * 1.4, y);
      }
      stream.y += stream.speed * 2.2;
      stream.x += stream.drift;
      if (stream.y - stream.length * stream.gap > height) {
        stream.y = -Math.random() * height * .25;
        stream.speed = .18 + Math.random() * .62;
      }
    }
    if (document.visibilityState === 'visible') {
      raf = requestAnimationFrame(draw);
    }
  };

  const startAnimation = () => { if (!raf) raf = requestAnimationFrame(draw); };
  const stopAnimation = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startAnimation();
    else stopAnimation();
  });
  
  if (!reduceMotion) startAnimation();
}

// Animated PCB-style traces and nodes. These stay behind the content and are
// intentionally sparse to evoke digital hardware instead of a generic matrix.
const circuitCanvas = document.querySelector('#circuit-bg');
if (circuitCanvas) {
  const ctx = circuitCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let traces = [];
  let raf = null;

  const makeTraces = () => {
    const count = Math.max(12, Math.floor(window.innerWidth / 95));
    traces = Array.from({ length: count }, () => {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const horizontal = Math.random() > .42;
      const length = 90 + Math.random() * 280;
      const rise = (Math.random() > .5 ? 1 : -1) * (18 + Math.random() * 95);
      return {
        points: horizontal
          ? [{x: startX, y: startY}, {x: startX + length * .45, y: startY}, {x: startX + length * .55, y: startY + rise}, {x: startX + length, y: startY + rise}]
          : [{x: startX, y: startY}, {x: startX, y: startY + length * .45}, {x: startX + rise, y: startY + length * .55}, {x: startX + rise, y: startY + length}],
        speed: .00004 + Math.random() * .00008,
        phase: Math.random(),
        radius: 2 + Math.random() * 2.5,
      };
    });
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    circuitCanvas.width = Math.floor(width * dpr);
    circuitCanvas.height = Math.floor(height * dpr);
    circuitCanvas.style.width = `${width}px`;
    circuitCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeTraces();
  };

  const drawTrace = (trace, now) => {
    const pts = trace.points;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.strokeStyle = 'rgba(56, 255, 139, .095)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const progress = (now * trace.speed + trace.phase) % 1;
    const index = Math.floor(progress * (pts.length - 1));
    const local = progress * (pts.length - 1) - index;
    const a = pts[index];
    const b = pts[Math.min(index + 1, pts.length - 1)];
    const x = a.x + (b.x - a.x) * local;
    const y = a.y + (b.y - a.y) * local;

    ctx.beginPath();
    ctx.arc(x, y, trace.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 255, 139, .55)';
    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(56,255,139,.60)';
    ctx.fill();
    ctx.shadowBlur = 0;

    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56,255,139,.24)';
      ctx.fill();
    }
  };

  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    for (const trace of traces) drawTrace(trace, time);
    if (document.visibilityState === 'visible') {
      raf = requestAnimationFrame(draw);
    }
  };

  const startAnimation = () => { if (!raf) raf = requestAnimationFrame(draw); };
  const stopAnimation = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startAnimation();
    else stopAnimation();
  });

  if (!reduceMotion) startAnimation();
}

// Set dynamic copyright year
const yearEl = document.getElementById('copyright-year');
if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()} Abolfazl Azad`;
}

// Header and Scroll Logic
const header = document.getElementById('main-header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // Header scrolled state
  if (header) {
    if (y > 50) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  // Back to top visibility
  if (backToTop) {
    if (y > 600) {
      backToTop.style.opacity = '1';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.pointerEvents = 'none';
    }
  }
}, { passive: true });

// Mobile Menu
const menuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('primary-nav');

if (menuBtn && nav) {
  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('is-open');
  };

  menuBtn.addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('is-open')) toggleMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) toggleMenu();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) toggleMenu();
    });
  });
}

// Active Section Indicator
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          if (link.getAttribute('href').endsWith(`#${entry.target.id}`)) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px', threshold: 0 });

  sections.forEach(sec => navObserver.observe(sec));
}

// Copy Email Interaction
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Only intercept if we have a way to copy
    if (navigator.clipboard && window.isSecureContext) {
      e.preventDefault();
      const email = link.getAttribute('href').replace('mailto:', '');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = link.textContent;
        link.textContent = 'Copied!';
        setTimeout(() => link.textContent = originalText, 2000);
      });
    }
  });
});


/* =========================================================
   CUSTOM CURSOR IMPLEMENTATION
   ========================================================= */
(function initCustomCursor() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isTouchDevice || isReducedMotion) {
    return;
  }
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  cursorDot.setAttribute('aria-hidden', 'true');
  
  const cursorRing = document.createElement('div');
  cursorRing.className = 'custom-cursor-ring';
  cursorRing.setAttribute('aria-hidden', 'true');
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);
  
  document.documentElement.classList.add('custom-cursor-active');
  
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;
  let rafId = null;
  let isInitialized = false;
  let ringAngle = 0;

  // --- Trail particle pool ---
  const TRAIL_POOL_SIZE = 12;
  const trailPool = [];
  let trailIndex = 0;
  let lastTrailX = 0;
  let lastTrailY = 0;

  for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
    const p = document.createElement('div');
    p.className = 'cursor-trail-particle';
    p.setAttribute('aria-hidden', 'true');
    document.body.appendChild(p);
    trailPool.push(p);
  }

  const spawnTrail = (x, y) => {
    const p = trailPool[trailIndex % TRAIL_POOL_SIZE];
    trailIndex++;
    p.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    p.style.opacity = '0.6';
    // Fade out
    requestAnimationFrame(() => {
      p.style.transition = 'opacity 0.5s ease';
      p.style.opacity = '0';
    });
    // Reset transition after fade
    setTimeout(() => { p.style.transition = 'none'; }, 520);
  };

  // --- Click burst ---
  const BURST_COUNT = 6;
  const burstParticles = [];

  for (let i = 0; i < BURST_COUNT; i++) {
    const bp = document.createElement('div');
    bp.className = 'cursor-trail-particle';
    bp.setAttribute('aria-hidden', 'true');
    bp.style.width = '3px';
    bp.style.height = '3px';
    document.body.appendChild(bp);
    burstParticles.push(bp);
  }

  const spawnBurst = (x, y) => {
    const angleStep = (Math.PI * 2) / BURST_COUNT;
    burstParticles.forEach((bp, i) => {
      const angle = angleStep * i;
      const dist = 18 + Math.random() * 10;
      const ex = x + Math.cos(angle) * dist;
      const ey = y + Math.sin(angle) * dist;

      bp.style.transition = 'none';
      bp.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      bp.style.opacity = '0.8';
      bp.style.boxShadow = '0 0 4px rgba(56, 255, 139, 0.5)';

      requestAnimationFrame(() => {
        bp.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease';
        bp.style.transform = `translate3d(${ex}px, ${ey}px, 0)`;
        bp.style.opacity = '0';
      });
    });
  };
  
  const renderRing = () => {
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    
    ringX += dx * 0.2;
    ringY += dy * 0.2;

    // Slow rotation
    ringAngle += 0.3;
    
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${ringAngle}deg)`;
    
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      isMoving = false;
      cancelAnimationFrame(rafId);
      rafId = null;
    } else {
      rafId = requestAnimationFrame(renderRing);
    }
  };
  
  const updateCursorPosition = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isInitialized) {
      ringX = mouseX;
      ringY = mouseY;
      lastTrailX = mouseX;
      lastTrailY = mouseY;
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(0deg)`;
      isInitialized = true;
    }
    
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Spawn trail particles with minimum distance threshold
    const tdx = mouseX - lastTrailX;
    const tdy = mouseY - lastTrailY;
    if (tdx * tdx + tdy * tdy > 900) { // ~30px apart
      spawnTrail(mouseX, mouseY);
      lastTrailX = mouseX;
      lastTrailY = mouseY;
    }
    
    if (!isMoving) {
      isMoving = true;
      if (!rafId) {
        rafId = requestAnimationFrame(renderRing);
      }
    }
  };
  
  const onMouseEnter = () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  };
  
  const onMouseLeave = () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  };
  
  const onMouseDown = () => {
    cursorRing.classList.add('is-clicking');
    spawnBurst(mouseX, mouseY);
  };
  
  const onMouseUp = () => {
    cursorRing.classList.remove('is-clicking');
  };
  
  window.addEventListener('mousemove', updateCursorPosition, { passive: true });
  document.addEventListener('mouseenter', onMouseEnter, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave, { passive: true });
  document.addEventListener('mousedown', onMouseDown, { passive: true });
  document.addEventListener('mouseup', onMouseUp, { passive: true });
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, select, textarea, .project-card, [tabindex]:not([tabindex="-1"])')) {
      cursorRing.classList.add('is-hovering');
    } else {
      cursorRing.classList.remove('is-hovering');
    }
  }, { passive: true });
  
})();

