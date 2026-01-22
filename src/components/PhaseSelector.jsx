import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys.js';
import './PhaseSelector.css';

const PHASES = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal', 'Late Luteal'];

export default function PhaseSelector({ selectedPhase, onChange }) {
  const [phase, setPhase] = useState(selectedPhase || 'Menstrual');

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEYS.cyclePhase);
    if (stored && PHASES.includes(stored)) {
      setPhase(stored);
      if (onChange) onChange(stored);
    }
  }, []);

  const handleChange = (e) => {
    const newPhase = e.target.value;
    setPhase(newPhase);
    localStorage.setItem(STORAGE_KEYS.cyclePhase, newPhase);
    if (onChange) onChange(newPhase);
  };

  return (
    <div className="phase-selector">
      <label htmlFor="phase-select">
        <span className="phase-label-text">Choose a phase below to view phase-specific guideance.</span>
        <select
          id="phase-select"
          value={phase}
          onChange={handleChange}
        >
          {PHASES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

