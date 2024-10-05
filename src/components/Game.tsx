import React, { useState, useEffect } from 'react'
import { Smile, Frown } from 'lucide-react'

const Game: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    generateNewLetter()
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setGameOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const generateNewLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
    setCurrentLetter(randomLetter)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key.toUpperCase() === currentLetter) {
      setScore((prevScore) => prevScore + 1)
      generateNewLetter()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentLetter])

  const restartGame = () => {
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    generateNewLetter()
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      {!gameOver ? (
        <>
          <h2 className="text-3xl font-bold mb-4">Type this letter:</h2>
          <div className="text-6xl font-bold mb-6 text-blue-600">{currentLetter}</div>
          <p className="text-xl mb-2">Score: {score}</p>
          <p className="text-xl mb-4">Time left: {timeLeft} seconds</p>
        </>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-2xl mb-4">Your final score: {score}</p>
          {score > 20 ? (
            <Smile className="w-16 h-16 mx-auto mb-4 text-green-500" />
          ) : (
            <Frown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          )}
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default Game