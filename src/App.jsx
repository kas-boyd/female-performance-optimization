import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from './utils/storageKeys.js'
import './App.css'
import PhaseSelector from './components/PhaseSelector.jsx'
import TodayDashboard from './components/TodayDashboard.jsx'
import WeeklyView from './components/WeeklyView.jsx'

function App() {
  const [selectedPhase, setSelectedPhase] = useState('Menstrual')

  useEffect(() => {
    // Load initial phase from localStorage
    const stored = localStorage.getItem(STORAGE_KEYS.cyclePhase)
    if (stored) {
      setSelectedPhase(stored)
    }
  }, [])

  const handlePhaseChange = (phase) => {
    setSelectedPhase(phase)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Cycle Performance Guide</h1>
        <p>This site is an educational, note-style tool informed by the SHE Program Master Class led by Jade Skillen. It is intended to support cycle-aware performance decisions and is not a substitute for professional medical advice.</p>
      </header>
      <main>
        <section>
          <PhaseSelector selectedPhase={selectedPhase} onChange={handlePhaseChange} />
          <TodayDashboard phase={selectedPhase} />
        </section>
        <section>
          <WeeklyView />
        </section>
      </main>
    </div>
  )
}

export default App
