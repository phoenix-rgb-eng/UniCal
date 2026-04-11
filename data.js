'use strict';

/* ── localStorage helpers ── */
var UC = {
  get: function(key, fallback) {
    if (fallback === undefined) fallback = null;
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  },
  set: function(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} }
};

/* ── Data accessors ── */
function getUsers()     { return UC.get('uc_users', {}); }
function saveUsers(u)   { UC.set('uc_users', u); }
function getSession()   { return UC.get('uc_session', null); }
function saveSession(s) { UC.set('uc_session', s); }
function clearSession() { localStorage.removeItem('uc_session'); }

var PALETTE = ['#A4CEFA','#9EFA90','#DC99F5','#EABB1F','#F0964A','#E8635A','#7B9FDE','#62B067'];

var DEFAULT_COURSES = [
  { id:'sample1', label:'Sample Course 1', bg:'#A4CEFA', dark:'#3A6EA8' },
  { id:'sample2', label:'Sample Course 2', bg:'#9EFA90', dark:'#2E7D32' },
  { id:'sample3', label:'Sample Course 3', bg:'#DC99F5', dark:'#6A1B9A' },
];

/* ── Courses ── */
function getCourses()   { return UC.get('uc_courses_'+getSession(), null) || DEFAULT_COURSES.map(function(c){return Object.assign({},c);}); }
function saveCourses(c) { UC.set('uc_courses_'+getSession(), c); }

/* ── Deadlines ── */
function getDeadlines() { return UC.get('uc_dl_'+getSession(), null) || generateSampleDeadlines(); }
function saveDeadlines(d){ UC.set('uc_dl_'+getSession(), d); }

/* ── Tasks (study sessions etc.) ── */
function getTasks()     { return UC.get('uc_tasks_'+getSession(), null) || generateSampleTasks(); }
function saveTasks(t)   { UC.set('uc_tasks_'+getSession(), t); }

/* ── Assignments ── */
function getAssignments() { return UC.get('uc_assign_'+getSession(), null) || generateSampleAssignments(); }
function saveAssignments(a){ UC.set('uc_assign_'+getSession(), a); }

/* ── Events ── */
function getEvents()    { return UC.get('uc_events_'+getSession(), null) || generateSampleEvents(); }
function saveEvents(ev) { UC.set('uc_events_'+getSession(), ev); }

/* ── Exams ── */
function getExams()     { return UC.get('uc_exams_'+getSession(), null) || generateSampleExams(); }
function saveExams(ex)  { UC.set('uc_exams_'+getSession(), ex); }

/* ── Notes (markdown) ── */
function getNotes()     { return UC.get('uc_notes_'+getSession(), []); }
function saveNotes(n)   { UC.set('uc_notes_'+getSession(), n); }

/* ── Helpers ── */
function deriveDark(hex) {
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return 'rgb('+Math.round(r*0.45)+','+Math.round(g*0.45)+','+Math.round(b*0.45)+')';
}

function nextId(arr) { return arr.length ? Math.max.apply(null, arr.map(function(x){return x.id;}))+1 : 1; }

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
}

function fmtTime(time) {
  if (!time) return '';
  var parts = time.split(':');
  var hr = parseInt(parts[0]), min = parts[1];
  var ampm = hr >= 12 ? 'PM' : 'AM';
  var hr12 = hr % 12 || 12;
  return hr12+':'+min+' '+ampm;
}

function fmtDateTime(iso, time) {
  var str = fmtDate(iso);
  if (time) str += ' at ' + fmtTime(time);
  return str;
}

function daysUntil(iso) {
  if (!iso) return 999;
  var today = new Date(); today.setHours(0,0,0,0);
  return Math.round((new Date(iso+'T00:00:00') - today) / 86400000);
}

function todayISO() { return new Date().toISOString().slice(0,10); }

function courseById(id) {
  return getCourses().find(function(c){return c.id===id;}) || { label:'—', bg:'#ddd', dark:'#555' };
}

/* ── Relative date helper for sample data ── */
function _relDate(offset) {
  var d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0,10);
}

/* ── Sample data generators ── */
function generateSampleDeadlines() {
  return [
    { id:1, title:'Research essay draft',       course:'sample1', due:_relDate(5),  time:'23:59', priority:'high',   notes:'Submit via LMS', done:false },
    { id:2, title:'Lab report submission',      course:'sample2', due:_relDate(8),  time:'17:00', priority:'medium', notes:'',               done:false },
    { id:3, title:'Group presentation outline',  course:'sample3', due:_relDate(3),  time:'12:00', priority:'urgent', notes:'Share with team first', done:false },
    { id:4, title:'Reading response week 6',    course:'sample1', due:_relDate(-1), time:'23:59', priority:'low',    notes:'',               done:true },
  ];
}

function generateSampleTasks() {
  return [
    { id:1, title:'Study session — Chapter 7', desc:'Focus on key concepts and practice problems', course:'sample1', due:_relDate(1), time:'10:00', priority:'high',   done:false },
    { id:2, title:'Review lecture notes',       desc:'Weeks 4–6 material',                         course:'sample2', due:_relDate(2), time:'14:00', priority:'medium', done:false },
    { id:3, title:'Practice problems set 3',    desc:'',                                           course:'sample3', due:_relDate(4), time:'',     priority:'low',    done:false },
  ];
}

function generateSampleAssignments() {
  return [
    { id:1, title:'Worksheet 5 — Data analysis',  course:'sample2', due:_relDate(6),  time:'23:59', priority:'medium', notes:'Use provided dataset', done:false },
    { id:2, title:'Reflection journal entry',      course:'sample1', due:_relDate(10), time:'17:00', priority:'low',    notes:'300–500 words',        done:false },
    { id:3, title:'Peer review feedback',          course:'sample3', due:_relDate(4),  time:'12:00', priority:'high',   notes:'Review 2 classmates',  done:false },
  ];
}

function generateSampleEvents() {
  return [
    { id:1, title:'Guest lecture — Industry panel',  course:'sample1', due:_relDate(7),  timeStart:'14:00', timeEnd:'16:00', priority:'medium', notes:'Room 204',      done:false },
    { id:2, title:'Study group meetup',              course:'sample2', due:_relDate(3),  timeStart:'10:00', timeEnd:'12:00', priority:'low',    notes:'Library floor 2', done:false },
    { id:3, title:'Campus career fair',              course:'sample3', due:_relDate(12), timeStart:'09:00', timeEnd:'15:00', priority:'high',   notes:'Bring CV',        done:false },
  ];
}

function generateSampleExams() {
  return [
    { id:1, title:'Midterm exam',           course:'sample1', due:_relDate(14), time:'09:00', location:'Hall A', priority:'urgent', notes:'Chapters 1–6',      done:false },
    { id:2, title:'Practical assessment',   course:'sample2', due:_relDate(21), time:'13:00', location:'Lab 3',  priority:'high',   notes:'Open book',          done:false },
    { id:3, title:'Quiz 3 — Short answer',  course:'sample3', due:_relDate(9),  time:'11:00', location:'Room 112', priority:'medium', notes:'30 minutes', done:false },
  ];
}

/* ── Auth guard ── */
function requireAuth() {
  var sess = getSession();
  if (!sess || !getUsers()[sess]) { window.location.href = 'index.html'; return false; }
  return sess;
}

/* ── Sidebar user population ── */
function populateSidebarUser() {
  var sess = getSession(); if (!sess) return;
  var user = getUsers()[sess]; if (!user) return;
  var name = user.displayName || sess;
  document.querySelectorAll('.sidebar-username').forEach(function(el){ el.textContent = name; });
  document.querySelectorAll('.sidebar-initials').forEach(function(el){ el.textContent = name.slice(0,2).toUpperCase(); });
}

function logout() { clearSession(); window.location.href = 'index.html'; }

/* ── Mobile sidebar (improved touch handling) ── */
function initMobileSidebar() {
  var toggle = document.getElementById('navToggle');
  var sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  /* Create backdrop overlay */
  var backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; /* Prevent background scroll */
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  /* Toggle button — use both click and touchend for reliability */
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (sidebar.classList.contains('open')) { closeSidebar(); }
    else { openSidebar(); }
  });

  /* Backdrop click closes sidebar */
  backdrop.addEventListener('click', function(e) {
    e.preventDefault();
    closeSidebar();
  });

  /* Close when a nav link is clicked (mobile) */
  sidebar.addEventListener('click', function(e) {
    if (!isMobile()) return;
    var link = e.target.closest('.nav-link');
    if (link) {
      /* Small delay so user sees the tap feedback */
      setTimeout(closeSidebar, 150);
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* Close sidebar on resize to desktop */
  window.addEventListener('resize', function() {
    if (!isMobile() && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* Allow sidebar content to scroll without propagating */
  sidebar.addEventListener('touchmove', function(e) {
    e.stopPropagation();
  }, { passive: true });
}

/* ── Active nav link ── */
function markActiveNav() {
  var cur = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(a) {
    if (a.getAttribute('href').split('/').pop() === cur) {
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });
}

/* ── Toast ── */
function showToast(msg, type) {
  if (!type) type = 'success';
  var c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.setAttribute('role','status'); c.setAttribute('aria-live','polite');
    c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9000;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(c);
  }
  var t = document.createElement('div');
  var iconColor = type==='success' ? 'var(--medium)' : type==='error' ? 'var(--urgent)' : 'var(--accent-slate)';
  var icon = type==='success' ? '✓' : type==='error' ? '✕' : 'ℹ';
  t.style.cssText = 'background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:12px 18px;font-size:0.85rem;font-weight:500;color:var(--text);box-shadow:var(--shadow-lg);animation:fadeUp 0.3s ease both;display:flex;align-items:center;gap:8px;max-width:280px;pointer-events:auto;';
  t.innerHTML = '<span style="color:'+iconColor+';font-weight:700">'+icon+'</span> '+msg;
  c.appendChild(t);
  setTimeout(function() { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(function(){t.remove();},300); }, 3000);
}

/* ── Collect all track items for a given date (used by calendar, dashboard) ── */
function getAllTrackItemsForDate(iso) {
  return [
    getDeadlines().filter(function(d){return !d.done && d.due===iso;}).map(function(d){d=Object.assign({},d);d._type='deadline';return d;}),
    getTasks().filter(function(t){return !t.done && t.due===iso;}).map(function(t){t=Object.assign({},t);t._type='task';return t;}),
    getAssignments().filter(function(a){return !a.done && a.due===iso;}).map(function(a){a=Object.assign({},a);a._type='assignment';return a;}),
    getEvents().filter(function(e){return !e.done && e.due===iso;}).map(function(e){e=Object.assign({},e);e._type='event';return e;}),
    getExams().filter(function(x){return !x.done && x.due===iso;}).map(function(x){x=Object.assign({},x);x._type='exam';return x;})
  ].reduce(function(acc,arr){return acc.concat(arr);},[]);
}

/* ── Collect all pending track items (used by dashboard stats) ── */
function getAllPendingTrackItems() {
  return [
    getDeadlines().filter(function(d){return !d.done;}).map(function(d){d=Object.assign({},d);d._type='deadline';return d;}),
    getTasks().filter(function(t){return !t.done;}).map(function(t){t=Object.assign({},t);t._type='task';return t;}),
    getAssignments().filter(function(a){return !a.done;}).map(function(a){a=Object.assign({},a);a._type='assignment';return a;}),
    getEvents().filter(function(e){return !e.done;}).map(function(e){e=Object.assign({},e);e._type='event';return e;}),
    getExams().filter(function(x){return !x.done;}).map(function(x){x=Object.assign({},x);x._type='exam';return x;})
  ].reduce(function(acc,arr){return acc.concat(arr);},[]);
}

/* ── Get all track items for a course ── */
function getTrackItemsForCourse(courseId) {
  return {
    deadlines:   getDeadlines().filter(function(d){return d.course===courseId;}),
    tasks:       getTasks().filter(function(t){return t.course===courseId;}),
    assignments: getAssignments().filter(function(a){return a.course===courseId;}),
    events:      getEvents().filter(function(e){return e.course===courseId;}),
    exams:       getExams().filter(function(x){return x.course===courseId;}),
    notes:       getNotes().filter(function(n){return n.course===courseId;}),
  };
}