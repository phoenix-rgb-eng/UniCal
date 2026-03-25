/* ═══════════════════════════════════════════
   UniCal — Shared data layer + utilities
   All pages import this via <script src="../js/data.js">
═══════════════════════════════════════════ */

'use strict';

/* ── localStorage helpers ── */
const UC = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }
};

/* ── Data accessors ── */
function getUsers()    { return UC.get('uc_users', {}); }
function saveUsers(u)  { UC.set('uc_users', u); }
function getSession()  { return UC.get('uc_session', null); }
function saveSession(s){ UC.set('uc_session', s); }
function clearSession(){ localStorage.removeItem('uc_session'); }

function getCourses()  {
  const stored = UC.get('uc_courses_' + getSession(), null);
  if (stored) return stored;
  return DEFAULT_COURSES.map(c => ({...c}));
}
function saveCourses(c){ UC.set('uc_courses_' + getSession(), c); }

function getDeadlines(){ return UC.get('uc_dl_' + getSession(), []); }
function saveDeadlines(d){ UC.set('uc_dl_' + getSession(), d); }

function getTasks()    { return UC.get('uc_tasks_' + getSession(), []); }
function saveTasks(t)  { UC.set('uc_tasks_' + getSession(), t); }

/* ── Default course palette ── */
const PALETTE = ['#A4CEFA','#9EFA90','#DC99F5','#EABB1F','#F0964A','#E8635A','#7B9FDE','#62B067'];

const DEFAULT_COURSES = [
  { id:'cs101',  label:'Web Development',    bg:'#A4CEFA', dark:'#3A6EA8' },
  { id:'cs102',  label:'Data Structures',    bg:'#9EFA90', dark:'#2E7D32' },
  { id:'pm01',   label:'Project Management', bg:'#DC99F5', dark:'#6A1B9A' },
];

/* ── Derive dark version of a hex ── */
function deriveDark(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.round(r*0.45)},${Math.round(g*0.45)},${Math.round(b*0.45)})`;
}

/* ── ID helpers ── */
function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}

/* ── Date helpers ── */
function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

function daysUntil(iso) {
  if (!iso) return 999;
  const today = new Date(); today.setHours(0,0,0,0);
  const due   = new Date(iso + 'T00:00:00');
  return Math.round((due - today) / 86400000);
}

function todayISO() {
  return new Date().toISOString().slice(0,10);
}

/* ── Auth guard: redirect to index if not logged in ── */
function requireAuth() {
  const sess = getSession();
  if (!sess || !getUsers()[sess]) {
    window.location.href = rootPath() + 'index.html';
    return false;
  }
  return sess;
}

/* ── Root path (works from /pages/ subfolder) ── */
function rootPath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : '';
}

/* ── Populate sidebar user chip ── */
function populateSidebarUser() {
  const sess = getSession();
  if (!sess) return;
  const user = getUsers()[sess];
  if (!user) return;
  const name = user.displayName || sess;
  const initials = name.slice(0,2).toUpperCase();
  document.querySelectorAll('.sidebar-username').forEach(el => el.textContent = name);
  document.querySelectorAll('.sidebar-initials').forEach(el => el.textContent = initials);
}

/* ── Logout ── */
function logout() {
  clearSession();
  window.location.href = rootPath() + 'index.html';
}

/* ── Mobile sidebar toggle ── */
function initMobileSidebar() {
  const toggle = document.getElementById('navToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const expanded = sidebar.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded);
  });

  // Close on backdrop click
  document.addEventListener('click', e => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open')
        && !sidebar.contains(e.target) && e.target !== toggle) {
      sidebar.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Mark active nav link ── */
function markActiveNav() {
  const cur = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === cur) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ── Toast notifications ── */
function showToast(msg, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.style.cssText = `
    background:var(--surface);border:1.5px solid var(--border);
    border-radius:var(--radius-sm);padding:12px 18px;
    font-size:0.85rem;font-weight:500;color:var(--text);
    box-shadow:var(--shadow-lg);animation:fadeUp 0.3s ease both;
    display:flex;align-items:center;gap:8px;max-width:280px;
  `;
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  const iconColor = type === 'success' ? 'var(--medium)' : type === 'error' ? 'var(--urgent)' : 'var(--accent-slate)';
  t.innerHTML = `<span style="color:${iconColor};font-weight:700">${icon}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}

/* ── Course pill helper ── */
function coursePill(course) {
  if (!course) return '';
  return `<span class="badge" style="background:${course.bg}33;color:${course.dark}">${course.label}</span>`;
}

/* ── Find course by id ── */
function courseById(id) {
  return getCourses().find(c => c.id === id) || { label:'—', bg:'#ddd', dark:'#555' };
}
