export const BADGE_TYPES = [
  { value: 'star', label: 'Star Performer', icon: '⭐', tone: 'amber' },
  { value: 'gold', label: 'Gold Star', icon: '🌟', tone: 'gold' },
  { value: 'topper', label: 'Test Topper', icon: '🏆', tone: 'orange' },
  { value: 'attendance', label: 'Best Attendance', icon: '📅', tone: 'teal' },
  { value: 'helper', label: 'Helping Hand', icon: '🤝', tone: 'green' },
  { value: 'punctual', label: 'Punctual & Prepared', icon: '⏰', tone: 'violet' },
]

export function badgeMeta(value) {
  return (
    BADGE_TYPES.find((badge) => badge.value === value) || {
      value: 'star',
      label: 'Star',
      icon: '⭐',
      tone: 'amber',
    }
  )
}
