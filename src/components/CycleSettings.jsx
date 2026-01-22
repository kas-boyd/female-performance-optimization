import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/storageKeys.js';
import './CycleSettings.css';

export default function CycleSettings() {
  const [cycleStartDate, setCycleStartDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [bleedLength, setBleedLength] = useState(5);

  useEffect(() => {
    // Load from localStorage
    const storedCycleStart = localStorage.getItem(STORAGE_KEYS.cycleStartDate);
    const storedCycleLength = localStorage.getItem(STORAGE_KEYS.cycleLength);
    const storedBleedLength = localStorage.getItem(STORAGE_KEYS.bleedLength);

    if (storedCycleStart) setCycleStartDate(storedCycleStart);
    if (storedCycleLength) setCycleLength(parseInt(storedCycleLength, 10));
    if (storedBleedLength) setBleedLength(parseInt(storedBleedLength, 10));
  }, []);

  const handleCycleStartChange = (e) => {
    setCycleStartDate(e.target.value);
  };

  const handleCycleLengthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCycleLength(value || 28);
  };

  const handleBleedLengthChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setBleedLength(value || 5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEYS.cycleStartDate, cycleStartDate);
    localStorage.setItem(STORAGE_KEYS.cycleLength, cycleLength.toString());
    localStorage.setItem(STORAGE_KEYS.bleedLength, bleedLength.toString());
  };

  return (
    <div className="cycle-settings-navbar">
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-group">
          <label>
            <span className="label-text">Cycle Start Date</span>
            <input
              type="date"
              value={cycleStartDate}
              onChange={handleCycleStartChange}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            <span className="label-text">Cycle Length</span>
            <input
              type="number"
              min="21"
              max="35"
              value={cycleLength}
              onChange={handleCycleLengthChange}
            />
          </label>
        </div>
        <div className="settings-group">
          <label>
            <span className="label-text">Bleed Length</span>
            <input
              type="number"
              min="1"
              max="10"
              value={bleedLength}
              onChange={handleBleedLengthChange}
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

