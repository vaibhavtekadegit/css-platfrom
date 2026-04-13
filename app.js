// ============================================
// CSS MASTERY PLATFORM - App Logic
// ============================================

// ---- STATE ----
const STATE = {
  currentPage: 'home',
  currentLesson: null,
  currentLevel: null,
  completedLessons: new Set(),
  bookmarks: new Set(),
  theme: 'dark',
  sidebarCollapsed: false,
};

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  loadPersistedState();
  applyTheme(STATE.theme);
  buildSidebar();
  buildHomePage();
  buildInterviewPage();
  buildPracticePage();
  buildProgressPage();
  navigateTo('home');
  hideLoading();
  setupSearch();
  setupKeyboardShortcuts();
  updateProgressBar();
});

// ---- PERSIST ----
function loadPersistedState() {
  try {
    const saved = localStorage.getItem('cssmaster_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      STATE.completedLessons = new Set(parsed.completedLessons || []);
      STATE.bookmarks = new Set(parsed.bookmarks || []);
      STATE.theme = parsed.theme || 'dark';
      STATE.sidebarCollapsed = parsed.sidebarCollapsed || false;
    }
  } catch (e) {}
}

function persistState() {
  try {
    localStorage.setItem('cssmaster_state', JSON.stringify({
      completedLessons: [...STATE.completedLessons],
      bookmarks: [...STATE.bookmarks],
      theme: STATE.theme,
      sidebarCollapsed: STATE.sidebarCollapsed,
    }));
  } catch (e) {}
}

// ---- THEME ----
function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  STATE.theme = theme;
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  persistState();
}

function toggleTheme() {
  applyTheme(STATE.theme === 'dark' ? 'light' : 'dark');
}

// ---- SIDEBAR ----
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.innerHTML = '';

  COURSE_DATA.levels.forEach(level => {
    const section = document.createElement('div');
    section.className = `nav-section level-${level.id.split('-')[1] || '7'}`;

    const header = document.createElement('div');
    header.className = 'nav-section-header';
    header.innerHTML = `
      <span>${level.emoji} ${level.title}</span>
      <span class="nav-level-badge">${level.badge}</span>
    `;
    header.addEventListener('click', () => toggleNavSection(section));
    section.appendChild(header);

    const items = document.createElement('div');
    items.className = 'nav-items';

    if (level.isInterview) {
      const item = document.createElement('div');
      item.className = 'nav-item';
      item.dataset.page = 'interview';
      item.innerHTML = `<span class="nav-icon">💼</span><span class="nav-label">Interview Questions</span><span class="done-dot"></span>`;
      item.addEventListener('click', () => navigateTo('interview'));
      items.appendChild(item);
    } else {
      level.topics.forEach(topic => {
        const item = document.createElement('div');
        item.className = `nav-item${STATE.completedLessons.has(topic.id) ? ' done' : ''}`;
        item.dataset.topicId = topic.id;
        item.innerHTML = `<span class="nav-icon">${topic.icon}</span><span class="nav-label">${topic.title}</span><span class="done-dot"></span>`;
        item.addEventListener('click', () => openLesson(topic.id, level));
        items.appendChild(item);
      });
    }

    // Practice link per level
    if (!level.isInterview && level.topics.length > 0) {
      const practiceItem = document.createElement('div');
      practiceItem.className = 'nav-item';
      practiceItem.innerHTML = `<span class="nav-icon">🧪</span><span class="nav-label">Practice Challenges</span>`;
      practiceItem.addEventListener('click', () => navigateTo('practice'));
      items.appendChild(practiceItem);
    }

    section.appendChild(items);
    nav.appendChild(section);
  });

  // Extra nav items at bottom
  const extras = [
    { icon: '📊', label: 'My Progress', page: 'progress' },
  ];

  const extraSection = document.createElement('div');
  extraSection.className = 'nav-section';
  const extraItems = document.createElement('div');
  extraItems.className = 'nav-items';

  extras.forEach(e => {
    const item = document.createElement('div');
    item.className = 'nav-item';
    item.dataset.page = e.page;
    item.innerHTML = `<span class="nav-icon">${e.icon}</span><span class="nav-label">${e.label}</span>`;
    item.addEventListener('click', () => navigateTo(e.page));
    extraItems.appendChild(item);
  });

  extraSection.appendChild(extraItems);
  nav.appendChild(extraSection);

  // Apply collapsed state
  if (STATE.sidebarCollapsed) {
    document.getElementById('sidebar').classList.add('collapsed');
  }
}

function toggleNavSection(section) {
  const items = section.querySelector('.nav-items');
  if (!items) return;
  const isHidden = items.style.display === 'none';
  items.style.display = isHidden ? 'block' : 'none';
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
  STATE.sidebarCollapsed = sidebar.classList.contains('collapsed');
  persistState();
}

function setActiveNavItem(topicId, page) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (topicId) {
    const item = document.querySelector(`.nav-item[data-topic-id="${topicId}"]`);
    if (item) item.classList.add('active');
  }
  if (page) {
    const item = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (item) item.classList.add('active');
  }
}

// ---- ROUTING ----
function navigateTo(page, data) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    target.classList.add('fade-in');
    setTimeout(() => target.classList.remove('fade-in'), 400);
  }

  STATE.currentPage = page;
  updateHeader(page, data);
  setActiveNavItem(null, page);
  window.scrollTo(0, 0);
}

function updateHeader(page, data) {
  const breadcrumb = document.getElementById('header-breadcrumb');
  if (!breadcrumb) return;

  const labels = {
    home: ['Home', 'Dashboard'],
    interview: ['Home', 'Interview Questions'],
    practice: ['Home', 'Practice Challenges'],
    progress: ['Home', 'My Progress'],
    lesson: ['Home', data?.level || 'Lessons', data?.title || 'Lesson'],
    challenge: ['Home', 'Practice', data?.title || 'Challenge'],
  };

  const parts = labels[page] || ['Home'];
  breadcrumb.innerHTML = parts.map((p, i) =>
    i === parts.length - 1
      ? `<span class="crumb-active">${p}</span>`
      : `<span>${p}</span><span class="sep">›</span>`
  ).join('');
}

// ---- HOME PAGE ----
function buildHomePage() {
  const page = document.getElementById('page-home');
  if (!page) return;

  const totalTopics = COURSE_DATA.levels.reduce((sum, l) => sum + l.topics.length, 0);
  const totalQuestions = INTERVIEW_QUESTIONS.length;

  page.innerHTML = `
    <div class="hero fade-in">
      <div class="hero-tag">✦ Complete CSS Learning System</div>
      <h1>Master CSS from<br><span class="gradient-text">Zero to Senior Engineer</span></h1>
      <p>A complete, interactive CSS learning platform with live code editors, 1000+ interview questions, and real-world projects. No external resources needed.</p>
      <div class="hero-stats">
        <div class="stat-pill">📚 <span class="stat-num">6</span> Learning Levels</div>
        <div class="stat-pill">🎯 <span class="stat-num">${totalTopics}</span> Topics</div>
        <div class="stat-pill">💼 <span class="stat-num">${totalQuestions}+</span> Interview Q&amp;As</div>
        <div class="stat-pill">🧪 <span class="stat-num">30+</span> Live Editors</div>
        <div class="stat-pill">🏆 <span class="stat-num">6</span> Real Projects</div>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;">
        <button class="btn btn-accent" onclick="startLearning()">🚀 Start Learning</button>
        <button class="btn btn-ghost" onclick="navigateTo('interview')">💼 Interview Prep</button>
      </div>
    </div>

    <div class="section-title">📚 Course Curriculum</div>
    <div class="levels-grid">
      ${COURSE_DATA.levels.filter(l => !l.isInterview).map(level => `
        <div class="level-card ${level.class}" onclick="openLevel('${level.id}')">
          <div class="level-card-header">
            <span class="level-emoji">${level.emoji}</span>
            <div>
              <div class="level-card-title">${level.title}</div>
              <div class="level-card-sub">Level ${level.badge}</div>
            </div>
          </div>
          <p>${level.description}</p>
          <div class="level-card-footer">
            <span class="topic-count">${level.topics.length} topics</span>
            <span class="btn btn-ghost" style="padding:4px 12px;font-size:12px;">Explore →</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="divider"></div>

    <div class="section-title">🎯 Learning Path</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:32px;">
      ${[
        { icon: '📖', title: 'Learn', desc: 'Read clear explanations with visual examples' },
        { icon: '👁️', title: 'See', desc: 'View pre-built working examples instantly' },
        { icon: '✍️', title: 'Try', desc: 'Edit live code and see changes in real-time' },
        { icon: '🧪', title: 'Practice', desc: 'Solve challenges at 3 difficulty levels' },
        { icon: '🏆', title: 'Master', desc: 'Build real-world projects from scratch' },
        { icon: '💼', title: 'Interview', desc: 'Crack senior engineer interviews with 1000+ Q&As' },
      ].map(step => `
        <div class="level-card" style="cursor:default;">
          <div style="font-size:28px;margin-bottom:8px;">${step.icon}</div>
          <div style="font-weight:700;margin-bottom:4px;">${step.title}</div>
          <div style="font-size:13px;color:var(--text-secondary);">${step.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function startLearning() {
  const firstLevel = COURSE_DATA.levels[0];
  const firstTopic = firstLevel.topics[0];
  if (firstTopic) openLesson(firstTopic.id, firstLevel);
}

function openLevel(levelId) {
  const level = COURSE_DATA.levels.find(l => l.id === levelId);
  if (!level || level.isInterview) { navigateTo('interview'); return; }
  const firstTopic = level.topics[0];
  if (firstTopic) openLesson(firstTopic.id, level);
}

// ---- LESSON PAGE ----
function openLesson(topicId, level) {
  // Find topic across all levels if level not provided
  let foundLevel = level;
  let topic = null;

  if (!foundLevel) {
    for (const l of COURSE_DATA.levels) {
      const t = l.topics.find(t => t.id === topicId);
      if (t) { foundLevel = l; topic = t; break; }
    }
  } else {
    topic = foundLevel.topics.find(t => t.id === topicId);
  }

  if (!topic) return;

  STATE.currentLesson = { topicId, level: foundLevel };

  // Build lesson HTML
  const lessonData = topic.lessonData;
  const lessonContent = document.getElementById('lesson-content');
  const playgroundContainer = document.getElementById('playground-container');

  if (!lessonContent || !playgroundContainer) return;

  // Render lesson content
  lessonContent.innerHTML = buildLessonHTML(lessonData, topic, foundLevel);

  // Render playground
  if (lessonData.playground) {
    EDITOR.init(lessonData.playground.html, lessonData.playground.css);
  }

  // Navigate
  navigateTo('lesson', { title: topic.title, level: foundLevel.title });
  setActiveNavItem(topicId, null);

  // Build prev/next navigation
  buildLessonNav(topicId, foundLevel);
  updateProgressBar();
}

function buildLessonHTML(lessonData, topic, level) {
  const tagColors = {
    green: 'var(--green)', blue: 'var(--blue)',
    orange: 'var(--orange)', red: 'var(--red)',
    purple: 'var(--accent)', yellow: '#eab308'
  };
  const tagColor = tagColors[lessonData.tagColor] || 'var(--green)';

  let html = `
    <div class="lesson-header">
      <div class="lesson-level-tag" style="color:${tagColor};background:${tagColor}22;border:1px solid ${tagColor}44;">
        ${lessonData.tag}
      </div>
      <h1 class="lesson-title">${lessonData.title}</h1>
      <p class="lesson-subtitle">${lessonData.subtitle}</p>
    </div>
  `;

  lessonData.sections.forEach(section => {
    if (section.type === 'explanation') {
      html += `
        <div class="lesson-section">
          <h2>${section.title}</h2>
          ${section.content}
        </div>
      `;
    } else if (section.type === 'code') {
      html += `
        <div class="lesson-section">
          <div class="code-block">
            <div class="code-block-header">
              <span class="code-lang">${section.lang || 'css'}</span>
              <span>${section.label || ''}</span>
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
            </div>
            <pre>${syntaxHighlight(section.code, section.lang || 'css')}</pre>
          </div>
        </div>
      `;
    } else if (section.type === 'infobox') {
      const kinds = {
        tip: { cls: 'info-tip', icon: '💡' },
        warn: { cls: 'info-warn', icon: '⚠️' },
        danger: { cls: 'info-danger', icon: '🚫' },
        success: { cls: 'info-success', icon: '✅' },
      };
      const k = kinds[section.kind] || kinds.tip;
      html += `
        <div class="info-box ${k.cls}">
          <span class="ib-icon">${k.icon}</span>
          <div class="ib-body">
            <strong>${section.title}</strong>
            ${section.content}
          </div>
        </div>
      `;
    } else if (section.type === 'visual-boxmodel') {
      html += buildBoxModelVisual();
    }
  });

  // Mark complete button
  const isDone = STATE.completedLessons.has(topic.id);
  html += `
    <div class="lesson-nav-bottom" id="lesson-nav-bottom">
      <button class="nav-btn-lesson" id="prev-btn" onclick="lessonNav('prev')">← Previous</button>
      <button class="btn ${isDone ? 'btn-green' : 'btn-accent'}" id="mark-done-btn"
        onclick="markLessonDone('${topic.id}')">
        ${isDone ? '✅ Completed' : '✓ Mark Complete'}
      </button>
      <button class="nav-btn-lesson next" id="next-btn" onclick="lessonNav('next')">Next →</button>
    </div>
  `;

  return html;
}

function buildBoxModelVisual() {
  return `
    <div class="visual-box box-model-viz">
      <div class="bm-margin" style="position:relative;">
        <span class="bm-label">margin</span>
        <div class="bm-border">
          <div style="font-size:10px;color:rgba(255,165,0,0.8);margin-bottom:4px;font-family:var(--font-code);">border</div>
          <div class="bm-padding">
            <div style="font-size:10px;color:rgba(0,200,100,0.8);margin-bottom:4px;font-family:var(--font-code);">padding</div>
            <div class="bm-content">content<br><small style="font-size:10px;opacity:0.7;">width × height</small></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildLessonNav(topicId, level) {
  const allTopics = level.topics;
  const idx = allTopics.findIndex(t => t.id === topicId);

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (prevBtn) {
    if (idx > 0) {
      prevBtn.textContent = `← ${allTopics[idx - 1].title}`;
      prevBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
    }
  }

  if (nextBtn) {
    if (idx < allTopics.length - 1) {
      nextBtn.textContent = `${allTopics[idx + 1].title} →`;
      nextBtn.style.display = 'flex';
    } else {
      nextBtn.textContent = 'Practice Challenges →';
      nextBtn.style.display = 'flex';
    }
  }
}

function lessonNav(dir) {
  if (!STATE.currentLesson) return;
  const { topicId, level } = STATE.currentLesson;
  const allTopics = level.topics;
  const idx = allTopics.findIndex(t => t.id === topicId);

  if (dir === 'prev' && idx > 0) {
    openLesson(allTopics[idx - 1].id, level);
  } else if (dir === 'next') {
    if (idx < allTopics.length - 1) {
      openLesson(allTopics[idx + 1].id, level);
    } else {
      navigateTo('practice');
    }
  }
}

function markLessonDone(topicId) {
  const isDone = STATE.completedLessons.has(topicId);
  if (isDone) {
    STATE.completedLessons.delete(topicId);
  } else {
    STATE.completedLessons.add(topicId);
    showToast('✅ Lesson marked as complete!', 'success');
  }

  // Update button
  const btn = document.getElementById('mark-done-btn');
  if (btn) {
    btn.className = `btn ${STATE.completedLessons.has(topicId) ? 'btn-green' : 'btn-accent'}`;
    btn.textContent = STATE.completedLessons.has(topicId) ? '✅ Completed' : '✓ Mark Complete';
  }

  // Update sidebar dot
  const navItem = document.querySelector(`.nav-item[data-topic-id="${topicId}"]`);
  if (navItem) navItem.classList.toggle('done', STATE.completedLessons.has(topicId));

  persistState();
  updateProgressBar();
}

// ---- PROGRESS ----
function updateProgressBar() {
  const totalTopics = COURSE_DATA.levels.reduce((sum, l) => sum + l.topics.length, 0);
  const pct = totalTopics > 0 ? Math.round((STATE.completedLessons.size / totalTopics) * 100) : 0;
  const fill = document.getElementById('progress-fill');
  const pctLabel = document.getElementById('progress-pct');
  if (fill) fill.style.width = `${pct}%`;
  if (pctLabel) pctLabel.textContent = `${pct}%`;
}

// ---- INTERVIEW PAGE ----
function buildInterviewPage() {
  const page = document.getElementById('page-interview');
  if (!page) return;

  const counts = {
    all: INTERVIEW_QUESTIONS.length,
    beginner: INTERVIEW_QUESTIONS.filter(q => q.level === 'beginner').length,
    intermediate: INTERVIEW_QUESTIONS.filter(q => q.level === 'intermediate').length,
    advanced: INTERVIEW_QUESTIONS.filter(q => q.level === 'advanced').length,
    senior: INTERVIEW_QUESTIONS.filter(q => q.level === 'senior').length,
  };

  const categories = [...new Set(INTERVIEW_QUESTIONS.map(q => q.category))];

  page.innerHTML = `
    <div class="interview-header">
      <h1>💼 CSS Interview Questions</h1>
      <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px;">
        ${counts.all} curated questions from beginner to senior engineer level. Click any question to reveal the answer.
      </p>
      <div class="interview-filters">
        <button class="filter-btn active" data-filter="all" onclick="filterQuestions('all', this)">All (${counts.all})</button>
        <button class="filter-btn beginner" data-filter="beginner" onclick="filterQuestions('beginner', this)">🟢 Beginner (${counts.beginner})</button>
        <button class="filter-btn intermediate" data-filter="intermediate" onclick="filterQuestions('intermediate', this)">🟡 Intermediate (${counts.intermediate})</button>
        <button class="filter-btn advanced" data-filter="advanced" onclick="filterQuestions('advanced', this)">🔴 Advanced (${counts.advanced})</button>
        <button class="filter-btn senior" data-filter="senior" onclick="filterQuestions('senior', this)">🔥 Senior (${counts.senior})</button>
      </div>
      <div class="interview-filters" style="margin-top:-8px;">
        ${categories.map(cat => `<button class="filter-btn" data-filter="cat-${cat}" onclick="filterQuestions('cat-${cat}', this)">${cat}</button>`).join('')}
      </div>
      <input type="text" class="q-search" id="q-search" placeholder="🔍 Search questions..." oninput="searchQuestions(this.value)">
      <div class="q-stats" id="q-stats">Showing <strong>${counts.all}</strong> questions</div>
    </div>
    <div id="questions-list">
      ${renderQuestions(INTERVIEW_QUESTIONS)}
    </div>
  `;
}

function renderQuestions(questions) {
  if (questions.length === 0) {
    return `<div style="text-align:center;padding:40px;color:var(--text-muted);">No questions match your search.</div>`;
  }
  return questions.map(q => `
    <div class="q-card" id="q-${q.id}" data-level="${q.level}" data-category="${q.category}">
      <div class="q-header" onclick="toggleQuestion(${q.id})">
        <span class="q-num">#${q.id}</span>
        <span class="q-text">${q.question}</span>
        <div class="q-badges">
          <span class="q-badge ${q.level}">${q.level}</span>
          <span class="q-badge" style="background:var(--bg-tertiary);color:var(--text-muted)">${q.category}</span>
        </div>
        <span class="q-chevron">▼</span>
      </div>
      <div class="q-answer">
        <div class="answer-section">
          <h4>Answer</h4>
          <p>${q.answer}</p>
        </div>
        ${q.code ? `
        <div class="answer-section">
          <h4>Code Example</h4>
          <div class="code-block">
            <div class="code-block-header">
              <span class="code-lang">CSS</span>
              <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
            </div>
            <pre>${syntaxHighlight(q.code, 'css')}</pre>
          </div>
        </div>` : ''}
        ${q.when ? `
        <div class="answer-section">
          <h4>When to Use</h4>
          <p style="color:var(--text-secondary)">${q.when}</p>
        </div>` : ''}
      </div>
    </div>
  `).join('');
}

function toggleQuestion(id) {
  const card = document.getElementById(`q-${id}`);
  if (card) card.classList.toggle('expanded');
}

function filterQuestions(filter, btn) {
  // Update active filter btn
  document.querySelectorAll('.interview-filters .filter-btn').forEach(b => {
    if (b.dataset.filter === filter) b.classList.add('active');
    else if (filter === 'all' || (!filter.startsWith('cat-') && !b.dataset.filter.startsWith('cat-'))) b.classList.remove('active');
    else if (filter.startsWith('cat-') && b.dataset.filter.startsWith('cat-')) b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  let filtered;
  if (filter === 'all') {
    filtered = INTERVIEW_QUESTIONS;
  } else if (filter.startsWith('cat-')) {
    const cat = filter.replace('cat-', '');
    filtered = INTERVIEW_QUESTIONS.filter(q => q.category === cat);
  } else {
    filtered = INTERVIEW_QUESTIONS.filter(q => q.level === filter);
  }

  const searchVal = document.getElementById('q-search')?.value || '';
  if (searchVal) {
    filtered = filtered.filter(q =>
      q.question.toLowerCase().includes(searchVal.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchVal.toLowerCase()) ||
      q.category.toLowerCase().includes(searchVal.toLowerCase())
    );
  }

  const list = document.getElementById('questions-list');
  const stats = document.getElementById('q-stats');
  if (list) list.innerHTML = renderQuestions(filtered);
  if (stats) stats.innerHTML = `Showing <strong>${filtered.length}</strong> questions`;
}

function searchQuestions(val) {
  const activeFilter = document.querySelector('.interview-filters .filter-btn.active');
  const filter = activeFilter?.dataset.filter || 'all';
  filterQuestions(filter, activeFilter);
}

// ---- PRACTICE PAGE ----
function buildPracticePage() {
  const page = document.getElementById('page-practice');
  if (!page) return;

  const challenges = getPracticeChallenges();

  page.innerHTML = `
    <div class="practice-header">
      <h1>🧪 Practice Challenges</h1>
      <p style="color:var(--text-secondary);font-size:14px;margin-bottom:24px;">
        Hands-on challenges to reinforce your CSS skills. Each has a problem statement, starter code, and solution.
      </p>
    </div>
    <div class="challenge-grid">
      ${challenges.map((c, i) => `
        <div class="challenge-card" onclick="openChallenge(${i})">
          <div class="challenge-num">#${String(i + 1).padStart(2, '0')}</div>
          <div class="challenge-info">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <div class="challenge-meta">
              <span class="diff-badge diff-${c.difficulty}">${c.difficulty}</span>
              <span style="font-size:11px;color:var(--text-muted);">${c.topic}</span>
            </div>
          </div>
          <span class="challenge-arrow">→</span>
        </div>
      `).join('')}
    </div>
  `;
}

function getPracticeChallenges() {
  return [
    {
      title: 'Center a div',
      description: 'Center a box both horizontally and vertically on the screen using Flexbox.',
      difficulty: 'easy',
      topic: 'Flexbox',
      starterCSS: `body {\n  margin: 0;\n  height: 100vh;\n  background: #f1f5f9;\n  /* Add flexbox centering here */\n}\n\n.box {\n  width: 200px;\n  height: 100px;\n  background: #6366f1;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  font-weight: bold;\n}`,
      starterHTML: `<div class="box">Centered!</div>`,
      solutionCSS: `body {\n  margin: 0;\n  height: 100vh;\n  background: #f1f5f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.box {\n  width: 200px;\n  height: 100px;\n  background: #6366f1;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  font-weight: bold;\n}`,
    },
    {
      title: 'Holy Grail Layout',
      description: 'Build a classic Holy Grail layout: fixed header, footer, left sidebar, right sidebar, and main content area.',
      difficulty: 'medium',
      topic: 'CSS Grid',
      starterCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody {\n  font-family: sans-serif;\n  height: 100vh;\n  /* Create a grid layout here */\n}\n\n.header, .footer { background: #6366f1; color: white; padding: 12px 20px; font-weight: bold; }\n.left-sidebar { background: #e0e7ff; padding: 16px; }\n.main { background: white; padding: 20px; }\n.right-sidebar { background: #f0fdf4; padding: 16px; }\n.footer { font-size: 0.85rem; }`,
      starterHTML: `<div class="header">Header</div>\n<div class="left-sidebar">Left<br>Sidebar</div>\n<div class="main">Main Content</div>\n<div class="right-sidebar">Right<br>Sidebar</div>\n<div class="footer">Footer</div>`,
      solutionCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody {\n  font-family: sans-serif;\n  height: 100vh;\n  display: grid;\n  grid-template-columns: 160px 1fr 140px;\n  grid-template-rows: 50px 1fr 40px;\n}\n\n.header  { grid-column: 1 / -1; background: #6366f1; color: white; padding: 12px 20px; font-weight: bold; display: flex; align-items: center; }\n.left-sidebar { background: #e0e7ff; padding: 16px; }\n.main { background: white; padding: 20px; overflow-y: auto; }\n.right-sidebar { background: #f0fdf4; padding: 16px; }\n.footer { grid-column: 1 / -1; background: #6366f1; color: white; display: flex; align-items: center; padding: 0 20px; font-size: 0.85rem; }`,
    },
    {
      title: 'Animated Button',
      description: 'Create a button with a smooth hover animation: translate up, shadow, and background color change.',
      difficulty: 'easy',
      topic: 'Transitions',
      starterCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; }\n\n.btn {\n  padding: 14px 32px;\n  background: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  /* Add transition and hover effects */\n}`,
      starterHTML: `<button class="btn">Hover Me!</button>`,
      solutionCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; }\n\n.btn {\n  padding: 14px 32px;\n  background: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.btn:hover {\n  background: #4f46e5;\n  transform: translateY(-4px);\n  box-shadow: 0 12px 30px rgba(99, 102, 241, 0.5);\n}\n\n.btn:active {\n  transform: translateY(0);\n  box-shadow: none;\n}`,
    },
    {
      title: 'Responsive Card Grid',
      description: 'Build a card grid that shows 1 column on mobile, 2 on tablet, 3 on desktop — using CSS Grid auto-fit.',
      difficulty: 'medium',
      topic: 'Grid + Responsive',
      starterCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: sans-serif; background: #f1f5f9; padding: 20px; }\n\n.grid {\n  display: grid;\n  /* Make this responsive without media queries! */\n  gap: 16px;\n}\n\n.card {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n}\n\n.card h3 { margin-bottom: 8px; color: #1e293b; }\n.card p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }`,
      starterHTML: `<div class="grid">\n  <div class="card"><h3>Card One</h3><p>Content for the first card.</p></div>\n  <div class="card"><h3>Card Two</h3><p>Content for the second card.</p></div>\n  <div class="card"><h3>Card Three</h3><p>Content for the third card.</p></div>\n  <div class="card"><h3>Card Four</h3><p>Content for the fourth card.</p></div>\n  <div class="card"><h3>Card Five</h3><p>Content for the fifth card.</p></div>\n  <div class="card"><h3>Card Six</h3><p>Content for the sixth card.</p></div>\n</div>`,
      solutionCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { font-family: sans-serif; background: #f1f5f9; padding: 20px; }\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n\n.card {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }\n.card h3 { margin-bottom: 8px; color: #1e293b; }\n.card p { color: #64748b; font-size: 0.9rem; line-height: 1.6; }`,
    },
    {
      title: 'CSS-Only Toggle Switch',
      description: 'Build a toggle switch using only CSS — no JavaScript. Use a checkbox input with a label.',
      difficulty: 'hard',
      topic: 'Pseudo-classes + Transforms',
      starterCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; gap: 16px; }\n\n.toggle-label {\n  position: relative;\n  display: inline-block;\n  width: 56px;\n  height: 28px;\n  cursor: pointer;\n}\n\n.toggle-label input { opacity: 0; width: 0; height: 0; }\n\n/* Style the track and thumb here */\n.toggle-label .track { }\n.toggle-label .thumb { }`,
      starterHTML: `<label class="toggle-label">\n  <input type="checkbox">\n  <span class="track"></span>\n  <span class="thumb"></span>\n</label>\n<label class="toggle-label">\n  <input type="checkbox" checked>\n  <span class="track"></span>\n  <span class="thumb"></span>\n</label>`,
      solutionCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; gap: 24px; }\n\n.toggle-label {\n  position: relative;\n  display: inline-block;\n  width: 56px;\n  height: 28px;\n  cursor: pointer;\n}\n\n.toggle-label input { opacity: 0; width: 0; height: 0; position: absolute; }\n\n.track {\n  position: absolute;\n  inset: 0;\n  background: #334155;\n  border-radius: 99px;\n  transition: background 0.3s ease;\n}\n\n.thumb {\n  position: absolute;\n  top: 3px; left: 3px;\n  width: 22px; height: 22px;\n  background: white;\n  border-radius: 50%;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  box-shadow: 0 2px 4px rgba(0,0,0,0.3);\n}\n\n/* The magic: :checked state */\ninput:checked ~ .track { background: #6366f1; }\ninput:checked ~ .thumb { transform: translateX(28px); }`,
    },
    {
      title: 'Sticky Header with Blur',
      description: 'Create a sticky navigation header that gets a frosted-glass blur effect when the page scrolls.',
      difficulty: 'medium',
      topic: 'Position + Backdrop-filter',
      starterCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; }\nbody { font-family: sans-serif; background: #f1f5f9; }\n\n.header {\n  /* Make this sticky with glass effect */\n  padding: 16px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.hero { height: 60vh; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold; }\n.content { padding: 40px 24px; }\n.content p { max-width: 65ch; line-height: 1.8; color: #475569; margin-bottom: 16px; }`,
      starterHTML: `<header class="header">\n  <div style="font-weight:800;font-size:1.2rem;color:#6366f1">Brand</div>\n  <nav style="display:flex;gap:20px;font-size:0.9rem;color:#475569">\n    <a>Home</a><a>About</a><a>Work</a>\n  </nav>\n</header>\n<div class="hero">Hero Section</div>\n<div class="content"><p>Scroll down to see the sticky header effect. The header should stay at the top and have a frosted glass appearance with a backdrop blur and semi-transparent background.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>`,
      solutionCSS: `*, *::before, *::after { box-sizing: border-box; margin: 0; }\nbody { font-family: sans-serif; background: #f1f5f9; }\n\n.header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  padding: 16px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: rgba(241, 245, 249, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-bottom: 1px solid rgba(0,0,0,0.06);\n  box-shadow: 0 2px 12px rgba(0,0,0,0.04);\n}\n\n.hero { height: 60vh; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold; }\n.content { padding: 40px 24px; }\n.content p { max-width: 65ch; line-height: 1.8; color: #475569; margin-bottom: 16px; }`,
    },
    {
      title: 'Skeleton Loading Screen',
      description: 'Build a shimmer skeleton loader for a card using CSS animations — no images or JS.',
      difficulty: 'medium',
      topic: 'Animations + Gradients',
      starterCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; }\n\n.skeleton-card {\n  background: #1e293b;\n  border-radius: 12px;\n  padding: 20px;\n  width: 280px;\n}\n\n/* Create shimmer animation here */\n.skeleton-line {\n  height: 14px;\n  background: #334155;\n  border-radius: 6px;\n  margin-bottom: 10px;\n}`,
      starterHTML: `<div class="skeleton-card">\n  <div class="skeleton-avatar"></div>\n  <div class="skeleton-line"></div>\n  <div class="skeleton-line" style="width:70%"></div>\n  <div class="skeleton-line" style="width:90%"></div>\n  <div class="skeleton-line" style="width:60%"></div>\n</div>`,
      solutionCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f172a; gap: 20px; flex-wrap: wrap; }\n\n@keyframes shimmer {\n  0% { background-position: -400px 0; }\n  100% { background-position: 400px 0; }\n}\n\n.skeleton-card {\n  background: #1e293b;\n  border-radius: 12px;\n  padding: 20px;\n  width: 280px;\n}\n\n.skeleton-avatar {\n  width: 48px; height: 48px;\n  border-radius: 50%;\n  margin-bottom: 14px;\n  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);\n  background-size: 400px 100%;\n  animation: shimmer 1.4s ease-in-out infinite;\n}\n\n.skeleton-line {\n  height: 14px;\n  border-radius: 6px;\n  margin-bottom: 10px;\n  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);\n  background-size: 400px 100%;\n  animation: shimmer 1.4s ease-in-out infinite;\n}`,
    },
    {
      title: 'CSS Variables Theme Switcher',
      description: 'Build a component that switches between 3 color themes using only CSS custom properties.',
      difficulty: 'hard',
      topic: 'CSS Variables',
      starterCSS: `body { font-family: sans-serif; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }\n\n/* Define 3 themes using CSS variables */\n:root { --primary: #6366f1; --bg: #f8faff; --surface: white; --text: #1e293b; }\n\n/* Add theme classes here */\n\n.card { background: var(--surface); color: var(--text); padding: 24px; border-radius: 12px; width: 280px; }\n.card h2 { color: var(--primary); }\n.theme-btns { display: flex; gap: 10px; margin-bottom: 20px; }`,
      starterHTML: `<div class="theme-btns">\n  <button onclick="setTheme('default')">Default</button>\n  <button onclick="setTheme('ocean')">Ocean</button>\n  <button onclick="setTheme('sunset')">Sunset</button>\n</div>\n<div class="card">\n  <h2>Theme Demo</h2>\n  <p>Click the buttons to switch themes. All colors are controlled by CSS variables!</p>\n  <button style="background:var(--primary);color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;margin-top:12px;">Action</button>\n</div>\n<script>\nfunction setTheme(t) { document.body.className = t; }\n</script>`,
      solutionCSS: `body { font-family: sans-serif; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; background: var(--bg); transition: background 0.3s ease; }\n\n:root, .default { --primary: #6366f1; --bg: #f8faff; --surface: white; --text: #1e293b; --border: #e2e8f0; }\n.ocean  { --primary: #0ea5e9; --bg: #f0f9ff; --surface: white; --text: #0c4a6e; --border: #bae6fd; }\n.sunset { --primary: #f97316; --bg: #fff7ed; --surface: white; --text: #431407; --border: #fed7aa; }\n\n.card { background: var(--surface); color: var(--text); padding: 24px; border-radius: 12px; width: 280px; border: 1px solid var(--border); box-shadow: 0 4px 16px rgba(0,0,0,0.06); transition: all 0.3s ease; }\n.card h2 { color: var(--primary); margin-bottom: 8px; }\n.card p { font-size: 0.9rem; line-height: 1.6; opacity: 0.8; }\n.theme-btns { display: flex; gap: 10px; margin-bottom: 20px; }\n.theme-btns button { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 7px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; transition: all 0.2s; }\n.theme-btns button:hover { background: var(--primary); color: white; border-color: var(--primary); }`,
    },
    {
      title: 'Pure CSS Accordion',
      description: 'Build a working accordion (expand/collapse) using only CSS — no JavaScript.',
      difficulty: 'hard',
      topic: 'Pseudo-classes + Transitions',
      starterCSS: `body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; background: #f8faff; }\n\n/* Hide the checkbox, use :checked to toggle */\n.accordion-item input[type="checkbox"] { display: none; }\n\n.accordion-label {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 16px;\n  background: white;\n  cursor: pointer;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  margin-bottom: 4px;\n  font-weight: 600;\n}\n\n.accordion-content {\n  /* Make this expand/collapse with CSS only */\n  padding: 0 16px;\n  background: white;\n  border: 1px solid transparent;\n  border-radius: 0 0 8px 8px;\n  overflow: hidden;\n}\n\n.accordion-content p { padding: 12px 0; color: #64748b; line-height: 1.6; }`,
      starterHTML: `<div class="accordion-item">\n  <input type="checkbox" id="a1">\n  <label class="accordion-label" for="a1">What is CSS? <span class="chevron">▼</span></label>\n  <div class="accordion-content"><p>CSS (Cascading Style Sheets) is the language used to style HTML elements on a webpage.</p></div>\n</div>\n<div class="accordion-item">\n  <input type="checkbox" id="a2">\n  <label class="accordion-label" for="a2">What is the Box Model? <span class="chevron">▼</span></label>\n  <div class="accordion-content"><p>The CSS Box Model describes how every element is a rectangular box with content, padding, border, and margin layers.</p></div>\n</div>\n<div class="accordion-item">\n  <input type="checkbox" id="a3">\n  <label class="accordion-label" for="a3">What is Flexbox? <span class="chevron">▼</span></label>\n  <div class="accordion-content"><p>Flexbox is a one-dimensional layout system that helps distribute space and align items in a container.</p></div>\n</div>`,
      solutionCSS: `body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; background: #f8faff; }\n\n.accordion-item input[type="checkbox"] { display: none; }\n\n.accordion-label {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 16px;\n  background: white;\n  cursor: pointer;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  margin-bottom: 4px;\n  font-weight: 600;\n  color: #1e293b;\n  transition: all 0.2s ease;\n  user-select: none;\n}\n.accordion-label:hover { background: #f1f5f9; }\n\n.chevron { transition: transform 0.3s ease; font-size: 12px; color: #94a3b8; }\n\n.accordion-content {\n  padding: 0 16px;\n  background: white;\n  border: 1px solid transparent;\n  border-radius: 0 0 8px 8px;\n  overflow: hidden;\n  max-height: 0;\n  transition: max-height 0.4s ease, padding 0.3s ease, border-color 0.3s ease;\n}\n.accordion-content p { padding: 12px 0; color: #64748b; line-height: 1.6; }\n\n/* The CSS-only magic */\ninput:checked + .accordion-label { background: #ede9fe; color: #6d28d9; border-color: #c4b5fd; border-radius: 8px 8px 0 0; margin-bottom: 0; }\ninput:checked + .accordion-label .chevron { transform: rotate(180deg); color: #6d28d9; }\ninput:checked + .accordion-label + .accordion-content { max-height: 200px; border-color: #c4b5fd; margin-bottom: 4px; }`,
    },
    {
      title: 'Neon Glow Card',
      description: 'Create a dark card with a neon glow border effect that activates on hover.',
      difficulty: 'easy',
      topic: 'Box-shadow + Transitions',
      starterCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #050510; gap: 20px; flex-wrap: wrap; }\n\n.neon-card {\n  width: 200px;\n  padding: 24px;\n  background: #0d0d1f;\n  border-radius: 12px;\n  text-align: center;\n  color: white;\n  /* Add neon glow effect here */\n}\n\n.neon-card h3 { margin-bottom: 8px; }\n.neon-card p { font-size: 0.85rem; opacity: 0.6; }`,
      starterHTML: `<div class="neon-card" style="--neon: #6366f1;">\n  <div style="font-size:2rem;margin-bottom:8px">⚡</div>\n  <h3>Electric</h3>\n  <p>Hover for glow effect</p>\n</div>\n<div class="neon-card" style="--neon: #10b981;">\n  <div style="font-size:2rem;margin-bottom:8px">🌿</div>\n  <h3>Nature</h3>\n  <p>Hover for glow effect</p>\n</div>\n<div class="neon-card" style="--neon: #f43f5e;">\n  <div style="font-size:2rem;margin-bottom:8px">🔥</div>\n  <h3>Fire</h3>\n  <p>Hover for glow effect</p>\n</div>`,
      solutionCSS: `body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #050510; gap: 20px; flex-wrap: wrap; }\n\n.neon-card {\n  width: 200px;\n  padding: 24px;\n  background: #0d0d1f;\n  border-radius: 12px;\n  text-align: center;\n  color: white;\n  border: 1px solid rgba(255,255,255,0.06);\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n\n.neon-card:hover {\n  border-color: var(--neon);\n  box-shadow:\n    0 0 10px var(--neon),\n    0 0 30px var(--neon),\n    0 0 60px color-mix(in srgb, var(--neon) 30%, transparent),\n    inset 0 0 20px color-mix(in srgb, var(--neon) 10%, transparent);\n  transform: translateY(-4px);\n}\n\n.neon-card h3 { margin-bottom: 8px; font-size: 1.1rem; }\n.neon-card p { font-size: 0.85rem; opacity: 0.6; }`,
    },
  ];
}

function openChallenge(index) {
  const challenges = getPracticeChallenges();
  const challenge = challenges[index];
  if (!challenge) return;

  STATE.currentChallenge = { index, challenge };

  const page = document.getElementById('page-challenge');
  if (!page) return;

  page.querySelector('.challenge-desc').innerHTML = `
    <h2>${challenge.title}</h2>
    <div class="diff-badge diff-${challenge.difficulty}" style="display:inline-block;margin-bottom:12px">${challenge.difficulty}</div>
    <p>${challenge.description}</p>
    <div class="divider" style="margin:16px 0"></div>
    <h3 style="font-size:13px;margin-bottom:8px;">📋 Instructions</h3>
    <p>Edit the CSS in the editor to complete the challenge. Click "Show Solution" to see the answer.</p>
    <div class="divider" style="margin:16px 0"></div>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="showSolution()">💡 Show Solution</button>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px;" onclick="resetChallenge()">↺ Reset</button>
    <div class="divider" style="margin:16px 0"></div>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="navigateTo('practice')">← Back to Challenges</button>
  `;

  EDITOR.initChallenge(challenge.starterHTML, challenge.starterCSS);
  navigateTo('challenge', { title: challenge.title });
}

function showSolution() {
  if (!STATE.currentChallenge) return;
  const { challenge } = STATE.currentChallenge;
  EDITOR.setCSS(challenge.solutionCSS);
  showToast('💡 Solution loaded!', 'success');
}

function resetChallenge() {
  if (!STATE.currentChallenge) return;
  const { challenge } = STATE.currentChallenge;
  EDITOR.setCSS(challenge.starterCSS);
  showToast('↺ Reset to starter code', '');
}

// ---- PROGRESS PAGE ----
function buildProgressPage() {
  const page = document.getElementById('page-progress');
  if (!page) return;

  const totalTopics = COURSE_DATA.levels.reduce((sum, l) => sum + l.topics.length, 0);
  const completed = STATE.completedLessons.size;
  const pct = totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0;

  page.innerHTML = `
    <div class="progress-header">
      <h1>📊 My Progress</h1>
      <p style="color:var(--text-secondary);font-size:14px;">Track your CSS mastery journey.</p>
    </div>
    <div class="progress-overview">
      <div class="progress-stat-card">
        <div class="big-num">${completed}</div>
        <div class="stat-label">Lessons Done</div>
      </div>
      <div class="progress-stat-card">
        <div class="big-num">${pct}%</div>
        <div class="stat-label">Complete</div>
      </div>
      <div class="progress-stat-card">
        <div class="big-num">${totalTopics - completed}</div>
        <div class="stat-label">Remaining</div>
      </div>
    </div>
    <div class="progress-bar-mini" style="height:8px;margin-bottom:32px;background:var(--bg-tertiary);border-radius:99px;overflow:hidden">
      <div class="progress-fill" style="width:${pct}%;height:100%;background:var(--accent);border-radius:99px;"></div>
    </div>
    <div class="section-title">📚 By Level</div>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:32px;">
      ${COURSE_DATA.levels.filter(l => !l.isInterview).map(level => {
        const done = level.topics.filter(t => STATE.completedLessons.has(t.id)).length;
        const total = level.topics.length;
        const p = total > 0 ? Math.round((done / total) * 100) : 0;
        return `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-weight:600;">${level.emoji} ${level.title}</span>
              <span style="font-size:13px;color:var(--text-muted)">${done}/${total}</span>
            </div>
            <div style="height:6px;background:var(--bg-tertiary);border-radius:99px;overflow:hidden">
              <div style="width:${p}%;height:100%;background:var(--accent);border-radius:99px;transition:width 0.5s ease;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <button class="btn btn-ghost" onclick="resetProgress()" style="color:var(--red);border-color:var(--red);">⚠️ Reset All Progress</button>
  `;
}

function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  STATE.completedLessons.clear();
  persistState();
  updateProgressBar();
  buildProgressPage();
  buildSidebar();
  showToast('Progress reset.', '');
}

// ---- SEARCH ----
function setupSearch() {
  const input = document.getElementById('sidebar-search');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll('.nav-item').forEach(item => {
      const label = item.querySelector('.nav-label')?.textContent.toLowerCase() || '';
      item.style.display = !val || label.includes(val) ? 'flex' : 'none';
    });
  });
}

// ---- KEYBOARD SHORTCUTS ----
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (STATE.currentPage === 'lesson') navigateTo('home');
      if (STATE.currentPage === 'challenge') navigateTo('practice');
    }
    if (e.ctrlKey && e.key === '/') {
      document.getElementById('sidebar-search')?.focus();
      e.preventDefault();
    }
  });
}

// ---- SYNTAX HIGHLIGHTING ----
function syntaxHighlight(code, lang) {
  if (lang === 'css') return highlightCSS(code);
  if (lang === 'html') return highlightHTML(code);
  return escapeHTML(code);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightCSS(code) {
  let escaped = escapeHTML(code);
  // Comments
  escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cm">$1</span>');
  // At-rules
  escaped = escaped.replace(/(@[\w-]+)/g, '<span class="at">$1</span>');
  // Selectors (before {)
  escaped = escaped.replace(/^([^{}\n:\/][^{}\n]*?)(?=\s*\{)/gm, '<span class="sel">$1</span>');
  // Properties
  escaped = escaped.replace(/\b([\w-]+)(?=\s*:(?!:))/g, '<span class="prop">$1</span>');
  // Values (after :)
  escaped = escaped.replace(/:\s*([^;{}\n]+)/g, (match, val) => {
    const hVal = val
      .replace(/(['"].*?['"])/g, '<span class="str">$1</span>')
      .replace(/\b(\d+\.?\d*)(px|rem|em|%|vh|vw|fr|s|ms|deg)?\b/g, '<span class="num">$1$2</span>');
    return ': ' + hVal;
  });
  // Punctuation
  escaped = escaped.replace(/([{}:;])/g, '<span class="punc">$1</span>');
  return escaped;
}

function highlightHTML(code) {
  let escaped = escapeHTML(code);
  escaped = escaped.replace(/(&lt;\/?\w[\w-]*)/g, '<span class="kw">$1</span>');
  escaped = escaped.replace(/(\w+)(?==)/g, '<span class="prop">$1</span>');
  escaped = escaped.replace(/(=&quot;[^&]*&quot;)/g, '<span class="str">$1</span>');
  return escaped;
}

// ---- COPY CODE ----
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy', 2000);
  });
}

// ---- TOAST ----
function showToast(message, type) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type || ''}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ---- LOADING ----
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    loading.style.transition = 'opacity 0.5s ease';
    setTimeout(() => loading.remove(), 500);
  }
}
