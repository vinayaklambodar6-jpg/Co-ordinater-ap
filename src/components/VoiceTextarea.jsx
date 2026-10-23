import { useSpeechToText } from '../hooks/useSpeechToText.js'

// Textarea with a built-in dictation (voice-to-text) button.
export default function VoiceTextarea({ value, onChange, hint, ...props }) {
  const { supported, listening, start, stop, error } = useSpeechToText()

  function toggle() {
    if (listening) {
      stop()
      return
    }

    start((text) => {
      const next = value ? `${value.trim()} ${text}` : text
      onChange(next)
    })
  }

  return (
    <div className="voice-field">
      <textarea value={value} onChange={(event) => onChange(event.target.value)} {...props} />

      <div className="voice-actions">
        <button
          type="button"
          className={`voice-btn${listening ? ' listening' : ''}`}
          onClick={toggle}
          disabled={!supported}
          title={
            supported
              ? 'Bolkar likhein (English / Hinglish)'
              : 'Voice input is browser mein supported nahi hai (Chrome/Edge use karein)'
          }
        >
          {listening ? '⏹ Stop listening' : '🎤 Dictate'}
        </button>
        {hint && <span className="voice-hint">{hint}</span>}
      </div>

      {listening && <p className="voice-live">🔴 Sun rahe hain… bolna shuru karein.</p>}
      {error && <p className="voice-error">{error}</p>}
    </div>
  )
}
