import { periodText } from './notify.js'

// Detects schedule conflicts before a substitution is saved.
export function findSubstitutionConflicts({
  period,
  classSection,
  absentTeacher,
  substitute,
  teachers,
  substitutions,
}) {
  const conflicts = []
  const selectedPeriod = Number(period)
  const cleanSubstitute = (substitute || '').trim()
  const cleanClass = (classSection || '').trim()
  const cleanAbsent = (absentTeacher || '').trim()

  if (!cleanSubstitute) return conflicts

  if (cleanAbsent && cleanSubstitute.toLowerCase() === cleanAbsent.toLowerCase()) {
    conflicts.push({
      type: 'self',
      message: 'Absent teacher ko hi substitute nahi bana sakte.',
    })
  }

  const teacher = teachers.find((item) => item.name === cleanSubstitute)
  const scheduledClass = teacher?.timetable?.[selectedPeriod]
  if (scheduledClass) {
    conflicts.push({
      type: 'busy',
      message: `${cleanSubstitute} ${periodText(selectedPeriod)} mein already class ${scheduledClass} le rahe hain.`,
    })
  }

  const existingSubstitution = substitutions.find(
    (item) =>
      Number(item.period) === selectedPeriod &&
      item.substitute === cleanSubstitute &&
      item.classSection !== cleanClass,
  )
  if (existingSubstitution) {
    conflicts.push({
      type: 'double-booked',
      message: `${cleanSubstitute} is period mein already ${existingSubstitution.classSection} mein substitute hain.`,
    })
  }

  const classAlreadyAssigned = substitutions.find(
    (item) =>
      Number(item.period) === selectedPeriod &&
      cleanClass &&
      (item.classSection || '').trim().toLowerCase() === cleanClass.toLowerCase(),
  )
  if (classAlreadyAssigned) {
    conflicts.push({
      type: 'duplicate-class',
      message: `${periodText(selectedPeriod)} ke liye class ${cleanClass} ka substitute already assign hai (${classAlreadyAssigned.substitute}).`,
    })
  }

  return conflicts
}
