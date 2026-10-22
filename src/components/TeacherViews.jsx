import { PERIODS, isTeacherFree, periodLabel } from '../utils/teachers.js'

export function MyTimetable({ teachers, profile }) {
  const teacher =
    teachers.items.find((item) => item.id === profile.teacherId) ||
    teachers.items.find((item) => item.name === profile.name)

  if (teachers.loading) {
    return <section className="card"><p className="muted">Loading your timetable…</p></section>
  }

  if (!teacher) {
    return (
      <section className="card">
        <h2 className="card-title">🗓️ My Timetable</h2>
        <p className="muted">
          Aapka teacher record abhi link nahi hua. Admin se sampark karein.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="card">
        <h2 className="card-title">🗓️ My Timetable — {teacher.name}</h2>
        <div className="paper-meta">
          <span><b>Subject:</b> {teacher.subject}</span>
          <span><b>Free Periods:</b> {
            PERIODS.filter((period) => isTeacherFree(teacher, period))
              .map((period) => (period === 0 ? 'P0' : `P${period}`))
              .join(', ') || 'None'
          }</span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => {
                const className = teacher.timetable?.[period]
                return (
                  <tr key={period}>
                    <td><b>{periodLabel(period)}</b></td>
                    <td>{className || '-'}</td>
                    <td>
                      {className
                        ? <span className="period-tag">Class</span>
                        : <span className="free-tag">Free</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export function MySubstitutions({ substitutions, profile }) {
  const mine = substitutions.items.filter(
    (item) => item.substitute === profile.name || item.absentTeacher === profile.name,
  )

  return (
    <section className="card">
      <h2 className="card-title">🔄 My Substitutions</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Class</th>
              <th>Absent Teacher</th>
              <th>Substitute</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {mine.map((item) => (
              <tr key={item.id}>
                <td><b>{periodLabel(item.period)}</b></td>
                <td>{item.classSection}</td>
                <td>{item.absentTeacher}</td>
                <td>{item.substitute}</td>
                <td>
                  <span className="role-tag role-teacher">
                    {item.substitute === profile.name ? 'You substitute' : 'Your class'}
                  </span>
                </td>
              </tr>
            ))}
            {!substitutions.loading && !mine.length && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Aaj aapki koi substitution nahi hai.</td></tr>
            )}
            {substitutions.loading && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading…</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function TeacherDiary({ dailyLogs, profile }) {
  const subject = (profile.subject || '').trim().toLowerCase()
  const entries = subject
    ? dailyLogs.items.filter((item) => (item.subject || '').trim().toLowerCase() === subject)
    : dailyLogs.items

  return (
    <section className="card">
      <h2 className="card-title">📖 Class Diary {subject ? `— ${profile.subject}` : ''}</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Classwork</th>
              <th>Homework</th>
              <th>Bring Message</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr key={item.id}>
                <td><b>{item.classSection}</b></td>
                <td>{item.subject}</td>
                <td>{item.cw || '-'}</td>
                <td>{item.hw || '-'}</td>
                <td>
                  {item.bringMessage
                    ? <span className="bring-tag">📢 {item.bringMessage}</span>
                    : '-'}
                </td>
              </tr>
            ))}
            {!dailyLogs.loading && !entries.length && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Abhi koi diary entry nahi hai.</td></tr>
            )}
            {dailyLogs.loading && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading…</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
