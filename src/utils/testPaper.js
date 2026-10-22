import { FALLBACK_TEMPLATES, MARKS, QUESTION_BANK } from '../data/questionBank.js'
import { ANSWER_BANK } from '../data/answers.js'

const OBJECTIVE_COUNT = 4
const SHORT_COUNT = 2
const LONG_COUNT = 2

export const SECTIONS = [
  {
    key: 'objective',
    title: 'Section A — Objective / Very Short Answer',
    instruction: 'Attempt all questions. Each question carries 1 mark.',
  },
  {
    key: 'short',
    title: 'Section B — Short Answer',
    instruction: 'Attempt all questions. Each question carries 3 marks.',
  },
  {
    key: 'long',
    title: 'Section C — Long Answer',
    instruction: 'Attempt all questions. Each question carries 5 marks.',
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

function shuffle(items) {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapWith]] = [copy[swapWith], copy[index]]
  }
  return copy
}

function pickQuestions(pool, answers, count, marks) {
  return shuffle(pool.map((text, index) => ({ text, answer: answers?.[index] ?? '' })))
    .slice(0, count)
    .map((question) => ({ ...question, marks }))
}

function fillFromTemplate(templates, count, marks, chapter) {
  return Array.from({ length: count }, (_, index) => ({
    text: templates[index % templates.length].replaceAll('{chapter}', chapter),
    answer: '',
    marks,
  }))
}

export function generatePaper({ className, subject, chapter }) {
  const cleanChapter = chapter.trim()
  const bankChapter = QUESTION_BANK[className]?.[subject]?.[cleanChapter]
  const answers = ANSWER_BANK[className]?.[subject]?.[cleanChapter]

  const objectivePool = bankChapter?.objective ?? []
  const shortPool = bankChapter?.short ?? []
  const longPool = bankChapter?.long ?? []

  const sections = [
    {
      ...SECTIONS[0],
      questions: objectivePool.length
        ? pickQuestions(objectivePool, answers?.objective, Math.min(OBJECTIVE_COUNT, objectivePool.length), MARKS.objective)
        : fillFromTemplate(FALLBACK_TEMPLATES.objective, OBJECTIVE_COUNT, MARKS.objective, cleanChapter),
    },
    {
      ...SECTIONS[1],
      questions: shortPool.length
        ? pickQuestions(shortPool, answers?.short, Math.min(SHORT_COUNT, shortPool.length), MARKS.short)
        : fillFromTemplate(FALLBACK_TEMPLATES.short, SHORT_COUNT, MARKS.short, cleanChapter),
    },
    {
      ...SECTIONS[2],
      questions: longPool.length
        ? pickQuestions(longPool, answers?.long, Math.min(LONG_COUNT, longPool.length), MARKS.long)
        : fillFromTemplate(FALLBACK_TEMPLATES.long, LONG_COUNT, MARKS.long, cleanChapter),
    },
  ]

  const totalMarks = sections.reduce(
    (sum, section) => sum + section.questions.reduce((sectionSum, question) => sectionSum + question.marks, 0),
    0,
  )

  return {
    className,
    subject,
    chapter: cleanChapter,
    sections,
    totalMarks,
    duration: 35,
    fromBank: Boolean(bankChapter),
    hasAnswers: sections.some((section) => section.questions.some((question) => question.answer)),
    date: new Date().toLocaleDateString('en-GB'),
  }
}
