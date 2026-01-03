import { useRef, useState } from 'react'

export default function CharacterCounter() {
  const inputRef = useRef(null)
  const [count, setCount] = useState(0)
  const [words, setWords] = useState(0)
  const [sentences, setSentences] = useState(0)

  const handleInput = () => {
    if (inputRef.current) {
      const text = inputRef.current.value
      setCount(text.length)
      setWords(
        text
          .trim()
          .split(/\s+/)
          .filter((w) => w).length || 0
      )
      setSentences(text.split(/[.!?]+/).filter((s) => s.trim()).length || 0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Character Counter
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Type something and watch the counter update
        </p>

        <div className="space-y-4">
          <textarea
            ref={inputRef}
            onInput={handleInput}
            placeholder="Start typing here..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none h-32 text-gray-700 transition-colors"
          />

          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-center">
            <div className="text-white text-5xl font-bold mb-2">{count}</div>
            <div className="text-purple-100 text-sm uppercase tracking-wide">
              {count === 1 ? 'Character' : 'Characters'}
            </div>
          </div>

          {count > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span> Words: {words}</span>
              <span> Sentences: {sentences}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
