export const PERIODS = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export function periodLabel(period) {
  return Number(period) === 0 ? 'Zero Period' : `Period ${period}`
}

// A teacher is available for substitution when the period is explicitly marked
// free, or when the saved timetable has no class scheduled in that period.
export function isTeacherFree(teacher, period) {
  if (!teacher) return false
  const key = Number(period)
  if (teacher.freePeriods?.map(Number).includes(key)) return true
  return Boolean(teacher.timetable) && !teacher.timetable[key]
}

export function getFreePeriods(teacher) {
  return PERIODS.filter((period) => isTeacherFree(teacher, period))
}
