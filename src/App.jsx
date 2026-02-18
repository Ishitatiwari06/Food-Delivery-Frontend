import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-500">
        Tailwind v4 Working 🚀
      </h1>
    </div>
  )
}

export default App
