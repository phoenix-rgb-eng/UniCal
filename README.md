# UniCal

> **"Make your calendar manageable."**

A lightweight, accessible schedule web app for university students and young professionals. Built as a single-developer front-end project using vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no server required.

---

## Features

| Feature | Description |
|---|---|
| **Login / Register** | Client-side authentication persisted in `localStorage` |
| **Dashboard** | At-a-glance stats + upcoming deadlines and tasks |
| **Calendar** | Month view with colour-coded dots per course; click any date to see events |
| **Deadlines** | Add, edit, complete, and filter deadlines by priority |
| **Tasks** | Card-based task manager with descriptions, priorities, and completion |
| **Courses** | Create, rename, recolour, and delete course labels used across the app |
| **Accessibility** | Skip links, ARIA roles, `aria-live` regions, `aria-label`s, keyboard support, focus styles, `prefers-reduced-motion` support |
| **Responsive** | Collapsible sidebar on mobile (≤ 768 px) |
| **Notifications** | Inline toast messages for CRUD actions |

---

## File structure

```
unical/
├── index.html              ← Landing page + Login / Register
├── css/
│   └── global.css          ← Design tokens, shared component styles
├── js/
│   ├── data.js             ← localStorage layer, utility functions
│   └── sidebar.js          ← Sidebar HTML builder
└── pages/
    ├── dashboard.html
    ├── calendar.html
    ├── deadlines.html
    ├── tasks.html
    └── courses.html
```

---

## Design decisions

### Colours
The palette is taken from an Adobe Color file referenced in project baseline:
- Blue `#A4CEFA`, Green `#9EFA90`, Pink `#DC99F5`, Yellow `#EABB1F`, Slate `#616C8F`

Background uses a warm parchment tone (`#F0EBE3`) to reduce eye strain for long study sessions.

### Typography
- **Fraunces** (serif display) — headings, logos, italic accents
- **DM Sans** (sans-serif) — all body text, labels, UI

### Accessibility
- All interactive elements have accessible names (`aria-label`, `<label>`, or visible text).
- Dynamic content regions use `aria-live="polite"`.
- Modal dialogs use `role="dialog"` and `aria-modal="true"`.
- Keyboard users can navigate fully: Tab, Enter, Escape (closes modals).
- Skip-to-content link appears on first Tab keypress.
- `prefers-reduced-motion` disables all animations for users who opt out.
- Colour is never the sole indicator of meaning (priority labels always include text too).

---

## Known limitations / future improvements

- Passwords are stored base64-encoded in `localStorage` — not suitable for production. A real backend with hashed passwords would be required.
- Data is per-browser; no cloud sync.
- No drag-and-drop reordering (planned).
- No recurring events (planned).
- No week view in the calendar (planned).

---

## Assessment criteria mapping

| Criterion | How it is met |
|---|---|
| **Accessibility** | Skip links, ARIA, keyboard nav, reduced-motion, colour + text labels |
| **Completeness** | All 5 pages functional; full CRUD for deadlines, tasks, courses |
| **User experience** | Consistent visual language, empty states, toasts, confirmation dialogs |
| **Stability** | No external dependencies other than Google Fonts; graceful fallbacks in data layer |
| **Documentation** | This README + inline code comments throughout |
