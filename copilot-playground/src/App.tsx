import { useState } from 'react'
import './App.css'

// Render the Copilot playground and its interactive counter.
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="playground">
      <p className="eyebrow">React + TypeScript + Vite</p>
      <h1>Copilot Playground</h1>
      <p>A small app to experiment with GitHub Copilot.</p>

      <section className="card" aria-labelledby="counter-heading">
        <h2 id="counter-heading">Try the counter</h2>
        <p aria-live="polite">Count: {count}</p>
        <div className="actions">
          <button
            type="button"
            onClick={
              // Increment the counter when the button is clicked.
              () => setCount(
                // Derive the next count from the latest state.
                (value) => value + 1,
              )
            }
          >
            Increment
          </button>
          <button
            type="button"
            onClick={
              // Reset the counter to zero when the button is clicked.
              () => setCount(0)
            }
          >
            Reset
          </button>
        </div>
      </section>

      <section className="card" aria-labelledby="ideas-heading">
        <h2 id="ideas-heading">Ideas to try with Copilot</h2>
        <ul>
          <li>Add a decrement button.</li>
          <li>Extract the counter into its own typed component.</li>
          <li>Add a dark mode toggle.</li>
        </ul>
        <p>Edit <code>src/App.tsx</code> and save to see changes instantly.</p>
      </section>
    </main>
  )
}

export default App
