import { useEffect, useRef, useState } from 'react'

// Thin wrapper over the browser Web Speech API (Chrome / Edge).
export function useSpeechToText() {
  const recognitionRef = useRef(null)
  const callbackRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState('')

  const supported =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)

  useEffect(() => {
    if (!supported) return undefined

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.continuous = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join(' ')
        .trim()
      if (text) callbackRef.current?.(text)
    }

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Browser settings se allow karein.')
      } else if (event.error === 'no-speech') {
        setError('Kuch sunai nahi diya, dobara try karein.')
      } else {
        setError('Voice input available nahi hai. Dobara try karein.')
      }
      setListening(false)
    }

    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort?.()
      recognitionRef.current = null
    }
  }, [supported])

  function start(onResult) {
    if (!recognitionRef.current) return
    callbackRef.current = onResult
    setError('')
    try {
      recognitionRef.current.start()
      setListening(true)
    } catch {
      setError('Voice input start nahi hua. Thodi der baad try karein.')
    }
  }

  function stop() {
    recognitionRef.current?.stop()
    setListening(false)
  }

  return { supported, listening, start, stop, error }
}
