import React, { useState, useEffect } from 'react'
import { Keyboard } from 'lucide-react'
import Game from './components/Game'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Keyboard Adventure</h1>
      {!gameStarted ? (
        <div className="text-center">
          <p className="text-xl mb-4">Welcome to Keyboard Adventure!</p>
          <p className="mb-6">Practice your typing skills and have fun!</p>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center"
          >
            <Keyboard className="mr-2" />
            Start Game
          </button>
        </div>
      ) : (
        <Game />
      )}
    </div>
  )
}

export default App