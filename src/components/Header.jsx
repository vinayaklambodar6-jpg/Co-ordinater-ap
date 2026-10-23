import { LogIn, LogOut, Moon, Sun } from 'lucide-react'

export default function Header({
  currentTab,
  setCurrentTab,
  theme,
  onToggleTheme,
  user,
  role,
  profileName,
  onLogin,
  onLogout,
}) {
  const allTabs = [
    { id: 'dashboard', label: '📊 Dashboard', roles: ['admin'] },
    { id: 'teachers', label: '👩‍🏫 Teachers & Timetable', roles: ['admin'] },
    { id: 'syllabus', label: '📚 Subjects & Chapters', roles: ['admin'] },
    { id: 'tasks', label: '🗂️ Task Assigner', roles: ['admin'] },
    { id: 'badges', label: '🏅 Badges', roles: ['admin'] },
    { id: 'substitution', label: '🔄 Substitution Manager', roles: ['admin'] },
    { id: 'testGenerator', label: '📝 Auto Test Paper', roles: ['admin'] },
    { id: 'dailyLog', label: '📖 Diary & Bring Message', roles: ['admin'] },
    { id: 'defaulters', label: '⚠️ Defaulters Register', roles: ['admin'] },
    { id: 'notifications', label: '🔔 Notifications', roles: ['admin'] },
    { id: 'admin', label: '🔐 Admin Panel', roles: ['admin'] },
    { id: 'myTimetable', label: '🗓️ My Timetable', roles: ['teacher'] },
    { id: 'myTasks', label: '🗂️ My Tasks', roles: ['teacher'] },
    { id: 'myBadges', label: '🏅 My Badges', roles: ['teacher'] },
    { id: 'mySubstitutions', label: '🔄 My Substitutions', roles: ['teacher'] },
    { id: 'teacherDiary', label: '📖 Class Diary', roles: ['teacher'] },
  ]

  const tabs = role ? allTabs.filter((tab) => tab.roles.includes(role)) : []

  const isDark = theme === 'dark'
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const displayName = profileName || user?.displayName || user?.email || ''
  const initial = displayName.trim().charAt(0).toUpperCase() || 'U'

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

          {user ? (
            <div className="user-chip">
              {user.photoURL ? (
                <img
                  className="user-avatar"
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="user-avatar user-avatar-fallback">{initial}</span>
              )}
              <span className="user-name" title={user.email || ''}>{displayName}</span>
              {role && (
                <span className={`role-tag role-${role}`}>{role === 'admin' ? 'Admin' : 'Teacher'}</span>
              )}
              <button type="button" className="theme-toggle logout-btn" onClick={onLogout}>
                <LogOut size={15} aria-hidden="true" />
                Logout
              </button>
            </div>
          ) : (
            <button type="button" className="theme-toggle" onClick={onLogin}>
              <LogIn size={15} aria-hidden="true" />
              Login
            </button>
          )}
        </div>
      </div>

      {user && (
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
      )}
    </header>
  )
}
