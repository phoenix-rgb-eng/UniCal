/* All pages are siblings — all hrefs are flat (no subfolders) */
function buildSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebar.innerHTML = '\
    <div class="sidebar-logo">\
      <a href="index.html" class="sidebar-logo-text" aria-label="UniCal home">Uni<em>Cal</em></a>\
      <div class="sidebar-slogan">make your calendar manageable</div>\
    </div>\
    <nav aria-label="Main navigation">\
      <ul class="sidebar-nav" role="list">\
        <li class="nav-section-label" aria-hidden="true">Overview</li>\
        <li class="nav-item">\
          <a href="dashboard.html" class="nav-link" aria-label="Dashboard">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>\
            Dashboard\
          </a>\
        </li>\
        <li class="nav-item">\
          <a href="calendar.html" class="nav-link" aria-label="Calendar">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>\
            Calendar\
          </a>\
        </li>\
        <li class="nav-section-label" aria-hidden="true">Track</li>\
        <li class="nav-item">\
          <a href="tasks.html" class="nav-link" aria-label="Tasks">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>\
            Tasks\
          </a>\
        </li>\
        <li class="nav-item">\
          <a href="assignments.html" class="nav-link" aria-label="Assignments">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>\
            Assignments\
          </a>\
        </li>\
        <li class="nav-item">\
          <a href="deadlines.html" class="nav-link" aria-label="Deadlines">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\
            Deadlines\
          </a>\
        </li>\
        <li class="nav-item">\
          <a href="events.html" class="nav-link" aria-label="Events">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>\
            Events\
          </a>\
        </li>\
        <li class="nav-item">\
          <a href="exams.html" class="nav-link" aria-label="Exams">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"/></svg>\
            Exams\
          </a>\
        </li>\
        <li class="nav-section-label" aria-hidden="true">Workspace</li>\
        <li class="nav-item">\
          <a href="notes.html" class="nav-link" aria-label="Notes">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>\
            Notes\
          </a>\
        </li>\
        <li class="nav-section-label" aria-hidden="true">Manage</li>\
        <li class="nav-item">\
          <a href="courses.html" class="nav-link" aria-label="Courses">\
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\
            Courses\
          </a>\
        </li>\
      </ul>\
    </nav>\
    <div class="sidebar-bottom">\
      <div class="user-chip" role="group" aria-label="User account">\
        <div class="avatar" aria-hidden="true"><span class="sidebar-initials">—</span></div>\
        <div style="flex:1;min-width:0">\
          <div class="user-name sidebar-username"></div>\
          <div class="user-role">Student</div>\
        </div>\
        <button onclick="logout()" class="btn-icon" title="Log out" aria-label="Log out">\
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>\
        </button>\
      </div>\
    </div>\
  ';
  markActiveNav();
  populateSidebarUser();
}