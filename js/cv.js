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
