import { profile, focusAreas, education, currentFocus, experience, research, projects, skillGroups, notes } from './data.js';

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
      const dateText = (item.start && item.end) ? `${item.start} — ${item.end}` : safeText(item.start);
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
          <p>${safeText(item.description)}</p>
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

  const getProjectSvg = (type) => {
    switch (type) {
      case 'pipeline': return `<svg viewBox="0 0 200 40" class="tech-svg"><path d="M10 20h180M40 10v20M80 10v20M120 10v20M160 10v20" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2" /><text x="25" y="24" font-size="10" text-anchor="middle" fill="currentColor">IF</text><text x="60" y="24" font-size="10" text-anchor="middle" fill="currentColor">ID</text><text x="100" y="24" font-size="10" text-anchor="middle" fill="currentColor">EX</text><text x="140" y="24" font-size="10" text-anchor="middle" fill="currentColor">MEM</text><text x="175" y="24" font-size="10" text-anchor="middle" fill="currentColor">WB</text></svg>`;
      case 'dma': return `<svg viewBox="0 0 200 40" class="tech-svg"><path d="M10 20h30l5-5l5 10l5-10l5 10l5-5h30" stroke="currentColor" stroke-width="1.5"/><rect x="40" y="10" width="55" height="20" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="67" y="24" font-size="10" text-anchor="middle" fill="currentColor">FIR</text><path d="M95 20h25M117 17l3 3l-3 3" stroke="currentColor" stroke-width="1.5"/><rect x="120" y="10" width="30" height="20" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="135" y="24" font-size="10" text-anchor="middle" fill="currentColor">DMA</text><path d="M150 20h25M172 17l3 3l-3 3" stroke="currentColor" stroke-width="1.5"/><rect x="175" y="10" width="15" height="20" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`;
      case 'asic': return `<svg viewBox="0 0 200 40" class="tech-svg"><path d="M10 20h170" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="currentColor"/><text x="20" y="10" font-size="8" text-anchor="middle" fill="currentColor">RTL</text><circle cx="70" cy="20" r="3" fill="currentColor"/><text x="70" y="10" font-size="8" text-anchor="middle" fill="currentColor">SYNTH</text><circle cx="120" cy="20" r="3" fill="currentColor"/><text x="120" y="10" font-size="8" text-anchor="middle" fill="currentColor">P&R</text><circle cx="170" cy="20" r="3" fill="currentColor"/><text x="170" y="10" font-size="8" text-anchor="middle" fill="currentColor">GDS</text></svg>`;
      case 'uart': return `<svg viewBox="0 0 200 40" class="tech-svg"><rect x="10" y="10" width="30" height="20" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="25" y="24" font-size="10" text-anchor="middle" fill="currentColor">TX</text><path d="M40 20h110M147 17l3 3l-3 3" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2"/><rect x="150" y="10" width="30" height="20" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="165" y="24" font-size="10" text-anchor="middle" fill="currentColor">RX</text></svg>`;
      case 'modulation': return `<svg viewBox="0 0 200 40" class="tech-svg"><path d="M10 20h10v-10h10v20h10v-20h10v10h10" stroke="currentColor" stroke-width="1.5"/><path d="M80 20 Q 90 5, 100 20 T 120 20 T 140 20 T 160 20" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M170 20h10v-10h5v20h5v-20h5v10h5" stroke="currentColor" stroke-width="1.5"/></svg>`;
      case 'multiplier': return `<svg viewBox="0 0 200 40" class="tech-svg"><rect x="40" y="10" width="40" height="20" stroke="currentColor" fill="none" stroke-width="1.5"/><rect x="120" y="10" width="40" height="20" stroke="currentColor" fill="none" stroke-width="1.5"/><text x="100" y="24" font-size="12" text-anchor="middle" fill="currentColor">×</text><path d="M10 20h30M80 20h40M160 20h30M187 17l3 3l-3 3" stroke="currentColor" stroke-width="1.5"/></svg>`;
      default: return '';
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
          <div class="project-meta mono">
            ${item.tech ? item.tech.map(t => `<span>${safeText(t)}</span>`).join('') : ''}
          </div>
        </div>
        <div class="project-visual">
          ${getProjectSvg(item.visualType)}
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
        ${note.visualType ? `<div class="note-visual" aria-hidden="true">${getProjectSvg(note.visualType)}</div>` : ''}
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
