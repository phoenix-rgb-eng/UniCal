'use strict';

/* ── localStorage helpers ── */
const UC = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
};

/* ── Data accessors ── */
function getUsers()     { return UC.get('uc_users', {}); }
function saveUsers(u)   { UC.set('uc_users', u); }
function getSession()   { return UC.get('uc_session', null); }
function saveSession(s) { UC.set('uc_session', s); }
function clearSession() { localStorage.removeItem('uc_session'); }

const PALETTE = ['#A4CEFA','#9EFA90','#DC99F5','#EABB1F','#F0964A','#E8635A','#7B9FDE','#62B067'];

const DEFAULT_COURSES = [
  { id:'cs101', label:'Web Development',    bg:'#A4CEFA', dark:'#3A6EA8' },
  { id:'cs102', label:'Data Structures',    bg:'#9EFA90', dark:'#2E7D32' },
  { id:'pm01',  label:'Project Management', bg:'#DC99F5', dark:'#6A1B9A' },
];

function getCourses()   { return UC.get('uc_courses_'+getSession(), null) || DEFAULT_COURSES.map(c=>({...c})); }
function saveCourses(c) { UC.set('uc_courses_'+getSession(), c); }
function getDeadlines() { return UC.get('uc_dl_'+getSession(), []); }
function saveDeadlines(d){ UC.set('uc_dl_'+getSession(), d); }
function getTasks()     { return UC.get('uc_tasks_'+getSession(), []); }
function saveTasks(t)   { UC.set('uc_tasks_'+getSession(), t); }

function deriveDark(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.round(r*0.45)},${Math.round(g*0.45)},${Math.round(b*0.45)})`;
}

function nextId(arr) { return arr.length ? Math.max(...arr.map(x=>x.id))+1 : 1; }

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
}

function daysUntil(iso) {
  if (!iso) return 999;
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.round((new Date(iso+'T00:00:00') - today) / 86400000);
}

function todayISO() { return new Date().toISOString().slice(0,10); }

function courseById(id) {
  return getCourses().find(c=>c.id===id) || { label:'—', bg:'#ddd', dark:'#555' };
}

/* ── Auth guard — all inner pages are siblings of index.html now ── */
function requireAuth() {
  const sess = getSession();
  if (!sess || !getUsers()[sess]) { window.location.href = 'index.html'; return false; }
  return sess;
}

/* ── Sidebar user population ── */
function populateSidebarUser() {
  const sess = getSession(); if (!sess) return;
  const user = getUsers()[sess]; if (!user) return;
  const name = user.displayName || sess;
  document.querySelectorAll('.sidebar-username').forEach(el => el.textContent = name);
  document.querySelectorAll('.sidebar-initials').forEach(el => el.textContent = name.slice(0,2).toUpperCase());
}

function logout() { clearSession(); window.location.href = 'index.html'; }

/* ── Mobile sidebar ── */
function initMobileSidebar() {
  const toggle = document.getElementById('navToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', sidebar.classList.contains('open'));
  });
  document.addEventListener('click', e => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('open')
        && !sidebar.contains(e.target) && e.target !== toggle) {
      sidebar.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
}

/* ── Active nav link ── */
function markActiveNav() {
  const cur = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === cur) {
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
}

/* ── Toast ── */
function showToast(msg, type='success') {
  let c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.setAttribute('role','status'); c.setAttribute('aria-live','polite');
    c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  const iconColor = type==='success' ? 'var(--medium)' : type==='error' ? 'var(--urgent)' : 'var(--accent-slate)';
  const icon = type==='success' ? '✓' : type==='error' ? '✕' : 'ℹ';
  t.style.cssText = 'background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:12px 18px;font-size:0.85rem;font-weight:500;color:var(--text);box-shadow:var(--shadow-lg);animation:fadeUp 0.3s ease both;display:flex;align-items:center;gap:8px;max-width:280px;';
  t.innerHTML = `<span style="color:${iconColor};font-weight:700">${icon}</span> ${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3000);
}
