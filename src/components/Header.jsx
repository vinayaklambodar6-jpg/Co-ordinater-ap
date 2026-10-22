import { Moon, Sun } from 'lucide-react'

export default function Header({ currentTab, setCurrentTab, theme, onToggleTheme }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'teachers', label: '👩‍🏫 Teachers & Timetable' },
    { id: 'syllabus', label: '📚 Subjects & Chapters' },
    { id: 'substitution', label: '🔄 Substitution Manager' },
    { id: 'testGenerator', label: '📝 Auto Test Paper' },
    { id: 'dailyLog', label: '📖 Diary & Bring Message' },
    { id: 'defaulters', label: '⚠️ Defaulters Register' },
  ]

  const isDark = theme === 'dark'
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <header className="main-header">
      <div className="header-top">
        <div>
          <h1 className="school-title">School Coordinator Portal</h1>
          <p className="header-subtitle">Operations, Timetable &amp; Daily Tracking</p>
        </div>

        <div className="header-actions">
          <div className="badge">📅 {today}</div>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      <nav className="nav-bar" aria-label="Main navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav-btn ${currentTab === tab.id ? 'active' : ''}`}
            aria-current={currentTab === tab.id ? 'page' : undefined}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
