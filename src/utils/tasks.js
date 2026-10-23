export const TASK_TYPES = [
  { value: 'timetable', label: 'Timetable entry' },
  { value: 'test', label: 'Test paper creation' },
  { value: 'substitution', label: 'Substitution management' },
  { value: 'diary', label: 'Diary / Bring message' },
  { value: 'defaulters', label: 'Defaulters follow-up' },
  { value: 'other', label: 'Other duty' },
]

export const TASK_STATUS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

export function taskTypeLabel(value) {
  return TASK_TYPES.find((type) => type.value === value)?.label || value || 'Task'
}

export function taskStatusLabel(value) {
  return TASK_STATUS.find((status) => status.value === value)?.label || 'Pending'
}
