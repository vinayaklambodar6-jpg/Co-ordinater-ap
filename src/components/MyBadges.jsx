import { badgeMeta, BADGE_TYPES } from '../utils/badges.js'

function formatDate(value) {
  if (!value) return ''
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function MyBadges({ badges, profile }) {
  const mine = badges.items.filter(
    (badge) =>
      badge.recipientType === 'teacher' &&
      (badge.teacherId === profile?.teacherId || badge.recipientName === profile?.name),
  )

  const counts = BADGE_TYPES.map((type) => ({
    ...type,
    count: mine.filter((badge) => badge.badgeType === type.value).length,
  })).filter((type) => type.count > 0)

  return (
    <section className="card">
      <h2 className="card-title">🏅 My Appreciation Badges ({mine.length})</h2>
      <p className="muted" style={{ marginBottom: 14 }}>
        {profile?.name ? `${profile.name}, ` : ''}aapki performance par mile digital badges yahan
        hain.
      </p>

      {!!counts.length && (
        <div className="badge-summary">
          {counts.map((type) => (
            <span className={`badge-pill tone-${type.tone}`} key={type.value}>
              {type.icon} {type.label} × {type.count}
            </span>
          ))}
        </div>
      )}

      {!badges.loading && !mine.length && (
        <p className="muted">Abhi aapko koi badge nahi mila — kaam continue karein! 💪</p>
      )}
      {badges.loading && <p className="muted">Loading badges…</p>}

      <div className="badge-grid">
        {mine.map((badge) => {
          const meta = badgeMeta(badge.badgeType)
          return (
            <article className={`badge-card tone-${meta.tone}`} key={badge.id}>
              <div className="badge-icon" aria-hidden="true">{meta.icon}</div>
              <div>
                <h3>{meta.label}</h3>
                {badge.note && <p className="badge-note">“{badge.note}”</p>}
                <p className="badge-meta">
                  {badge.awardedBy ? `Awarded by ${badge.awardedBy}` : 'Awarded by Coordinator'}
                  {formatDate(badge.createdAt) ? ` · ${formatDate(badge.createdAt)}` : ''}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
