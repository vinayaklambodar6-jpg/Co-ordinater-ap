export default function Header({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'substitution', label: '🔄 Substitution Manager' },
    { id: 'testGenerator', label: '📝 Auto Test Paper' },
    { id: 'dailyLog', label: '📖 Diary & Bring Message' },
    { id: 'defaulters', label: '⚠️ Defaulters Register' },
  ]

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
          <p style={{ fontSize: '0.82rem', opacity: 0.85 }}>
            Operations, Timetable &amp; Daily Tracking
          </p>
        </div>
        <div className="badge">📅 {today}</div>
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
