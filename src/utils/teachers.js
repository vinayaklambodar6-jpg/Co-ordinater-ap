export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]

// A teacher is available for substitution when the period is explicitly marked
// free, or when the saved timetable has no class scheduled in that period.
export function isTeacherFree(teacher, period) {
  if (!teacher) return false
  if (teacher.freePeriods?.includes(period)) return true
  return Boolean(teacher.timetable) && !teacher.timetable[period]
}

export function getFreePeriods(teacher) {
  return PERIODS.filter((period) => isTeacherFree(teacher, period))
}
