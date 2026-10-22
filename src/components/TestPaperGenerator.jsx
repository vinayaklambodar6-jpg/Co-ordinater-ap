import { useMemo, useState } from 'react'
import {
  generatePaper,
  getChapters,
  getClasses,
  getSubjects,
} from '../utils/testPaper.js'

const CLASSES = getClasses()
const OTHER = '__other__'

function printOnly(mode) {
  const cleanup = () => {
    delete document.body.dataset.print
    window.removeEventListener('afterprint', cleanup)
  }

  document.body.dataset.print = mode
  window.addEventListener('afterprint', cleanup)
  window.print()
  window.setTimeout(cleanup, 2000)
}

export default function TestPaperGenerator() {
  const [className, setClassName] = useState(CLASSES[0] ?? 'Class 10')
  const [subjectChoice, setSubjectChoice] = useState(getSubjects(CLASSES[0])[0] ?? '')
  const [customSubject, setCustomSubject] = useState('')
  const [chapterChoice, setChapterChoice] = useState(
    getChapters(CLASSES[0], getSubjects(CLASSES[0])[0])[0] ?? '',
  )
  const [customChapter, setCustomChapter] = useState('')
  const [paper, setPaper] = useState(() =>
    generatePaper({
      className: CLASSES[0] ?? 'Class 10',
      subject: getSubjects(CLASSES[0])[0] ?? 'General',
      chapter: getChapters(CLASSES[0], getSubjects(CLASSES[0])[0])[0] ?? 'General Revision',
    }),
  )

  const subjects = useMemo(() => getSubjects(className), [className])
  const chapters = useMemo(
    () => getChapters(className, subjectChoice === OTHER ? '' : subjectChoice),
    [className, subjectChoice],
  )

  const isCustomSubject = subjectChoice === OTHER
  const isCustomChapter = chapterChoice === OTHER

  function handleClassChange(value) {
    setClassName(value)
    const nextSubjects = getSubjects(value)
    const nextSubject = nextSubjects[0] ?? ''
    setSubjectChoice(nextSubject)
    setCustomSubject('')
    setChapterChoice(getChapters(value, nextSubject)[0] ?? '')
    setCustomChapter('')
  }

  function handleSubjectChange(value) {
    setSubjectChoice(value)
    setCustomSubject('')
    setChapterChoice(getChapters(className, value === OTHER ? '' : value)[0] ?? '')
    setCustomChapter('')
  }

  function handleGenerate(event) {
    event.preventDefault()

    const subject = (isCustomSubject ? customSubject : subjectChoice).trim()
    const chapter = (isCustomChapter ? customChapter : chapterChoice).trim()

    if (!subject || !chapter) {
      window.alert('Subject aur chapter bharna zaroori hai!')
      return
    }

    setPaper(generatePaper({ className, subject, chapter }))
  }

  function handleRegenerate() {
    if (!paper) return
    setPaper(generatePaper({ className: paper.className, subject: paper.subject, chapter: paper.chapter }))
  }

  // Number questions across sections so the answer key matches the paper.
  const numberedSections = useMemo(() => {
    let counter = 0
    return paper.sections.map((section) => ({
      ...section,
      questions: section.questions.map((question) => {
        counter += 1
        return { ...question, number: counter }
      }),
    }))
  }, [paper])

  return (
    <>
      <section className="card generator-card">
        <h2 className="card-title">📝 Auto Test Paper Generator (Syllabus &amp; Chapter Based)</h2>

        <form onSubmit={handleGenerate} className="no-print">
          <div className="form-grid">
            <div className="form-group">
              <label>Select Class</label>
              <select value={className} onChange={(event) => handleClassChange(event.target.value)}>
                {CLASSES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select value={subjectChoice} onChange={(event) => handleSubjectChange(event.target.value)}>
                {subjects.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
                <option value={OTHER}>Other subject…</option>
              </select>
            </div>

            <div className="form-group">
              <label>Chapter</label>
              <select
                value={chapterChoice}
                onChange={(event) => setChapterChoice(event.target.value)}
                disabled={isCustomSubject}
              >
                {chapters.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
                {!chapters.length && <option value="">No chapter in bank</option>}
                <option value={OTHER}>Other chapter…</option>
              </select>
            </div>

            {isCustomSubject && (
              <div className="form-group">
                <label>Subject Name</label>
                <input
                  required
                  placeholder="e.g. Computer Science"
                  value={customSubject}
                  onChange={(event) => setCustomSubject(event.target.value)}
                />
              </div>
            )}

            {isCustomChapter && (
              <div className="form-group">
                <label>Chapter Name</label>
                <input
                  required
                  placeholder="e.g. Chapter 6 Triangles"
                  value={customChapter}
                  onChange={(event) => setCustomChapter(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="button-row">
            <button type="submit" className="btn-primary">Create Instant Paper</button>
            <button type="button" className="btn-secondary" onClick={handleRegenerate}>
              🔀 New Set of Questions
            </button>
          </div>
        </form>

        {!paper.fromBank && (
          <div className="info-banner no-print">
            Is chapter ke ready-made questions bank mein nahi mile, isliye chapter name par based
            questions banaye gaye hain. Teacher ek baar review kar lein.
          </div>
        )}

        <div className="test-paper-sheet">
          <div className="paper-heading">
            <h3>CLASS ASSESSMENT / REVISION TEST</h3>
            <p>Time: {paper.duration} Minutes &nbsp;|&nbsp; Maximum Marks: {paper.totalMarks}</p>
          </div>

          <div className="paper-meta">
            <span><b>Class:</b> {paper.className}</span>
            <span><b>Subject:</b> {paper.subject}</span>
            <span><b>Chapter:</b> {paper.chapter}</span>
            <span><b>Date:</b> {paper.date}</span>
          </div>

          <p className="paper-instruction">
            <b>General Instructions:</b> All questions are compulsory. Write answers neatly and
            show all steps in numerical questions.
          </p>

          {numberedSections.map((section) => (
            <div className="paper-section" key={section.key}>
              <h4>{section.title}</h4>
              <p className="paper-section-note">{section.instruction}</p>
              <ol className="paper-questions">
                {section.questions.map((question) => (
                  <li key={`${section.key}-${question.number}`}>
                    <span className="question-text">{question.text}</span>
                    <span className="question-marks">[{question.marks}]</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className="paper-footer">
            <span>Total Marks: {paper.totalMarks}</span>
            <span>Prepared by: ______________________</span>
          </div>
        </div>

        <div className="button-row no-print" style={{ marginTop: 15 }}>
          <button type="button" onClick={() => printOnly('paper')} className="btn-secondary">
            🖨️ Print Test Paper
          </button>
          <button type="button" onClick={() => printOnly('answer')} className="btn-secondary">
            🔑 Print Answer Key
          </button>
        </div>
      </section>

      <section className="card answer-key-card">
        <h2 className="card-title">🔑 Answer Key &amp; Solutions</h2>

        <div className="answer-key-meta">
          <span><b>Class:</b> {paper.className}</span>
          <span><b>Subject:</b> {paper.subject}</span>
          <span><b>Chapter:</b> {paper.chapter}</span>
          <span><b>Total Marks:</b> {paper.totalMarks}</span>
        </div>

        {!paper.hasAnswers && (
          <div className="info-banner">
            Is paper ke model answers bank mein available nahi hain. Teacher apne answers likh kar
            answer key tayyar kar sakte hain.
          </div>
        )}

        {numberedSections.map((section) => (
          <div className="answer-section" key={`key-${section.key}`}>
            <h4>{section.title}</h4>
            <ol className="answer-list">
              {section.questions.map((question) => (
                <li key={`answer-${section.key}-${question.number}`}>
                  <div className="answer-question">
                    <span className="answer-number">Q{question.number}.</span>
                    <span>{question.text}</span>
                    <span className="question-marks">[{question.marks}]</span>
                  </div>
                  <p className="answer-text">
                    <b>Ans.</b>{' '}
                    {question.answer || 'Model answer bank mein nahi hai — teacher apna answer likhein.'}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </>
  )
}
