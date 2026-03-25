/* All pages are siblings — all hrefs are flat (no subfolders) */
function buildSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="index.html" class="sidebar-logo-text" aria-label="UniCal home">Uni<em>Cal</em></a>
      <div class="sidebar-slogan">make your calendar manageable</div>
    </div>
    <nav aria-label="Main navigation">
      <ul class="sidebar-nav" role="list">
        <li class="nav-section-label" aria-hidden="true">Overview</li>
        <li class="nav-item">
          <a href="dashboard.html" class="nav-link" aria-label="Dashboard">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a href="calendar.html" class="nav-link" aria-label="Calendar">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Calendar
          </a>
        </li>
        <li class="nav-section-label" aria-hidden="true">Track</li>
        <li class="nav-item">
          <a href="deadlines.html" class="nav-link" aria-label="Deadlines">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Deadlines
          </a>
        </li>
        <li class="nav-item">
          <a href="tasks.html" class="nav-link" aria-label="Tasks">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Tasks
          </a>
        </li>
        <li class="nav-section-label" aria-hidden="true">Manage</li>
        <li class="nav-item">
          <a href="courses.html" class="nav-link" aria-label="Courses">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Courses
          </a>
        </li>
      </ul>
    </nav>
    <div class="sidebar-bottom">
      <div class="user-chip" role="group" aria-label="User account">
        <div class="avatar" aria-hidden="true"><span class="sidebar-initials">—</span></div>
        <div style="flex:1;min-width:0">
          <div class="user-name sidebar-username"></div>
          <div class="user-role">Student</div>
        </div>
        <button onclick="logout()" class="btn-icon" title="Log out" aria-label="Log out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  `;

  markActiveNav();
  populateSidebarUser();
}
