import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>SPC App Final</h1>
        <p>Applicazione SPC in funzione!</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Contatore: {count}
          </button>
        </div>
        <p className="read-the-docs">
          Clicca sul pulsante per testare la reattività
        </p>
      </header>
    </div>
  )
}

export default App