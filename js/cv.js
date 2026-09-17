import { education, experience, research, projects, skillGroups } from './data.js';

const el = (selector) => document.querySelector(selector);
const safeText = (val) => val ? val : "";

const renderCV = () => {
  const eduList = el('#cv-education');
  if (eduList) {
    eduList.innerHTML = education.map((item) => {
      const dateText = (item.start && item.end) ? `${item.start} — ${item.end}` : safeText(item.start);
      return `
        <div class="cv-item">
          <div class="timeline-date mono muted">${dateText}</div>
          <div>
            <h2>${safeText(item.institution)}</h2>
            <p>${safeText(item.degree)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  const expList = el('#cv-experience');
  if (expList) {
    expList.innerHTML = experience.map(item => `
        <div class="cv-item">
          <div class="timeline-date mono muted">${safeText(item.date)}</div>
          <div>
            <h2>${safeText(item.title)}</h2>
            <p>${safeText(item.org)}</p>
            <p class="cv-desc">${safeText(item.detail)}</p>
          </div>
        </div>
    `).join('');
  }

  const resList = el('#cv-research');
  if (resList) {
    resList.innerHTML = research.map(item => `
        <div class="cv-item">
          <div class="timeline-date mono muted">${safeText(item.type)}</div>
          <div>
            <h2>${safeText(item.topic)}</h2>
            <p>${safeText(item.description)}</p>
            ${item.supervisor ? `<p class="muted cv-desc">Supervisor: ${safeText(item.supervisor)}</p>` : ''}
          </div>
        </div>
    `).join('');
  }

  const projList = el('#cv-projects');
  if (projList) {
    // Select curated subset: first 5 projects
    const selected = projects.slice(0, 5);
    
    projList.innerHTML = selected.map(item => `
        <div class="cv-item cv-project-item">
          <div class="timeline-date mono muted">${safeText(item.number)}</div>
          <div>
            <h2>${safeText(item.title)} <a href="${item.github ? safeText(item.github) : '#'}" target="_blank" rel="noopener noreferrer" class="cv-project-link mono">GitHub ↗</a></h2>
            <p class="cv-desc">${safeText(item.description)}</p>
            <p class="mono muted cv-tech">${item.tech ? item.tech.map(t => safeText(t)).join(' &middot; ') : ''}</p>
          </div>
        </div>
    `).join('');
  }

  const skillsList = el('#cv-skills');
  if (skillsList) {
    skillsList.innerHTML = skillGroups.map(group => `
        <div class="cv-skill-group">
          <h3 class="mono">${safeText(group.title)}</h3>
          <p>${group.skills.map(skill => safeText(skill)).join(' &middot; ')}</p>
        </div>
    `).join('');
  }
};

renderCV();


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
    requestAnimationFrame(() => {
      p.style.transition = 'opacity 0.5s ease';
      p.style.opacity = '0';
    });
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

    const tdx = mouseX - lastTrailX;
    const tdy = mouseY - lastTrailY;
    if (tdx * tdx + tdy * tdy > 900) {
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

