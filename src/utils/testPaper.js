import { FALLBACK_TEMPLATES, MARKS, QUESTION_BANK } from '../data/questionBank.js'
import { ANSWER_BANK } from '../data/answers.js'

const MARKS_OPTIONS = [10, 20, 80, 100]

export const SECTIONS = [
  {
    key: 'objective',
    title: 'Section A — Objective / Very Short Answer',
  },
  {
    key: 'short',
    title: 'Section B — Short Answer',
  },
  {
    key: 'long',
    title: 'Section C — Long Answer',
  },
]

export function getClasses() {
  return Object.keys(QUESTION_BANK)
}

export function getSubjects(className) {
  const subjects = QUESTION_BANK[className]
  return subjects ? Object.keys(subjects) : []
}

export function getChapters(className, subject) {
  const subjects = QUESTION_BANK[className]
  const chapters = subjects?.[subject]
  return chapters ? Object.keys(chapters) : []
}

export function getMarksOptions() {
  return MARKS_OPTIONS
}

function shuffle(items) {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapWith]] = [copy[swapWith], copy[index]]
  }
  return copy
}

function chapterPool(className, subject, chapter) {
  const bankChapter = QUESTION_BANK[className]?.[subject]?.[chapter]
  const answers = ANSWER_BANK[className]?.[subject]?.[chapter]

  if (bankChapter) {
    return [
      ...bankChapter.objective.map((text, index) => ({
        text,
        answer: answers?.objective?.[index] ?? '',
        marks: MARKS.objective,
        type: 'objective',
        chapter,
      })),
      ...bankChapter.short.map((text, index) => ({
        text,
        answer: answers?.short?.[index] ?? '',
        marks: MARKS.short,
        type: 'short',
        chapter,
      })),
      ...bankChapter.long.map((text, index) => ({
        text,
        answer: answers?.long?.[index] ?? '',
        marks: MARKS.long,
        type: 'long',
        chapter,
      })),
    ]
  }

  // Chapter is not in the curated bank: build template questions so the
  // paper can still be generated from a teacher-entered syllabus.
  return [
    ...FALLBACK_TEMPLATES.objective.map((template) => ({
      text: template.replaceAll('{chapter}', chapter),
      answer: '',
      marks: MARKS.objective,
      type: 'objective',
      chapter,
    })),
    ...FALLBACK_TEMPLATES.short.map((template) => ({
      text: template.replaceAll('{chapter}', chapter),
      answer: '',
      marks: MARKS.short,
      type: 'short',
      chapter,
    })),
    ...FALLBACK_TEMPLATES.long.map((template) => ({
      text: template.replaceAll('{chapter}', chapter),
      answer: '',
      marks: MARKS.long,
      type: 'long',
      chapter,
    })),
  ]
}

// Exact subset-sum over the question pool. Randomised item order gives a
// different paper each time while keeping the total marks exact.
function selectQuestions(items, target) {
  const reachable = new Array(target + 1).fill(null)
  reachable[0] = { prev: -1, item: -1 }

  items.forEach((question, index) => {
    for (let sum = target; sum >= question.marks; sum -= 1) {
      if (!reachable[sum] && reachable[sum - question.marks]) {
        reachable[sum] = { prev: sum - question.marks, item: index }
      }
    }
  })

  let total = target
  while (total > 0 && !reachable[total]) total -= 1

  const selected = []
  let cursor = total
  while (cursor > 0 && reachable[cursor]) {
    const step = reachable[cursor]
    selected.push(items[step.item])
    cursor = step.prev
  }

  return { selected, total }
}

export function generatePaper({
  className,
  subject,
  chapter,
  chapters,
  maxMarks = 20,
  chapterPool: availableChapters = [],
}) {
  const selectedChapters = (chapters?.length ? chapters : [chapter])
    .map((item) => String(item ?? '').trim())
    .filter(Boolean)

  const target = Number(maxMarks) || 20
  const primary = selectedChapters[0] ?? 'General Revision'

  const chapterQuestions = new Map(
    selectedChapters.map((name) => [name, shuffle(chapterPool(className, subject, name))]),
  )

  const extraChapters = shuffle(
    availableChapters.filter((item) => item && !selectedChapters.includes(item)),
  )

  let pool = selectedChapters.flatMap((name) => chapterQuestions.get(name))
  let extraDepth = 0
  const poolMarks = () => pool.reduce((sum, question) => sum + question.marks, 0)

  // If the selected chapters cannot supply the requested marks, mix in other
  // chapters from the same class/subject.
  while (extraDepth < extraChapters.length && poolMarks() < target) {
    pool = [...pool, ...shuffle(chapterPool(className, subject, extraChapters[extraDepth]))]
    extraDepth += 1
  }

  let selection = selectQuestions(pool, target)

  // For a multi-chapter paper, keep at least one question from every selected
  // chapter when the marks budget allows it.
  if (selectedChapters.length > 1 && target >= selectedChapters.length) {
    const mandatory = []
    const used = new Set()
    selectedChapters.forEach((name) => {
      const objective = chapterQuestions
        .get(name)
        ?.filter((question) => question.type === 'objective')
        .find((question) => !used.has(question))
      if (objective) {
        mandatory.push(objective)
        used.add(objective)
      }
    })

    const remainingTarget = target - mandatory.reduce((sum, question) => sum + question.marks, 0)
    const rest = pool.filter((question) => !used.has(question))
    const restSelection = remainingTarget > 0 ? selectQuestions(rest, remainingTarget) : { selected: [], total: 0 }

    if (mandatory.length && mandatory.length + restSelection.selected.length) {
      selection = {
        selected: [...mandatory, ...restSelection.selected],
        total: mandatory.reduce((sum, question) => sum + question.marks, 0) + restSelection.total,
      }
    }
  }

  const grouped = { objective: [], short: [], long: [] }
  selection.selected.forEach((question) => {
    grouped[question.type].push(question)
  })

  const sections = SECTIONS.map((section) => ({
    ...section,
    questions: shuffle(grouped[section.key]),
  }))

  const totalMarks = selection.total
  const appearedChapters = [
    ...new Set(selection.selected.map((question) => question.chapter)),
  ].filter(Boolean)

  const chapterLabel =
    selectedChapters.length > 1
      ? `${selectedChapters.slice(0, 3).join(', ')}${
          selectedChapters.length > 3 ? ` + ${selectedChapters.length - 3} more` : ''
        }`
      : primary

  return {
    className,
    subject,
    chapter: chapterLabel,
    chapters: selectedChapters,
    chaptersUsed: appearedChapters.length,
    sections,
    totalMarks,
    requestedMarks: target,
    shortfall: totalMarks < target,
    duration: Math.max(20, Math.round((totalMarks / 20) * 35)),
    fromBank: selectedChapters.every((name) => Boolean(QUESTION_BANK[className]?.[subject]?.[name])),
    hasAnswers: selection.selected.some((question) => question.answer),
    date: new Date().toLocaleDateString('en-GB'),
  }
}
