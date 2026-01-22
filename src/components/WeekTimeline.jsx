import { useState, useEffect } from 'react';
import { inferPhaseForDate } from '../utils/cycleCalculator.js';
import phaseGuidance from '../data/phaseGuidance.js';
import { getPhaseColor } from '../utils/phaseColors.js';
import { STORAGE_KEYS } from '../utils/storageKeys.js';
import './WeekTimeline.css';

export default function WeekTimeline({ weekDays }) {
  const today = new Date();
  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const [expandedDay, setExpandedDay] = useState(() => 
    weekDays.findIndex(day => isToday(day))
  );
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

    // Poll for localStorage changes
    const interval = setInterval(() => {
      const updatedCycleStart = localStorage.getItem(STORAGE_KEYS.cycleStartDate);
      const updatedCycleLength = localStorage.getItem(STORAGE_KEYS.cycleLength);
      const updatedBleedLength = localStorage.getItem(STORAGE_KEYS.bleedLength);

      if (updatedCycleStart !== cycleStartDate) setCycleStartDate(updatedCycleStart || '');
      if (updatedCycleLength && parseInt(updatedCycleLength, 10) !== cycleLength) {
        setCycleLength(parseInt(updatedCycleLength, 10));
      }
      if (updatedBleedLength && parseInt(updatedBleedLength, 10) !== bleedLength) {
        setBleedLength(parseInt(updatedBleedLength, 10));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cycleStartDate, cycleLength, bleedLength]);

  const getPhaseForDay = (date) => {
    if (!cycleStartDate) return null;
    const start = new Date(cycleStartDate);
    return inferPhaseForDate(date, start, cycleLength, bleedLength);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDayClick = (idx) => {
    setExpandedDay(expandedDay === idx ? null : idx);
  };
  
  const selectedDay = expandedDay !== null ? weekDays[expandedDay] : null;
  const selectedPhase = selectedDay ? getPhaseForDay(selectedDay) : null;
  const selectedPhaseColor = selectedPhase ? getPhaseColor(selectedPhase) : null;

  return (
    <div className="card week-timeline-card">
      <h2>7 Day Overview</h2>
      <div className="calendar-grid">
        {weekDays.map((day, idx) => {
          const phase = getPhaseForDay(day);
          const phaseColor = phase ? getPhaseColor(phase) : null;
          const isExpanded = expandedDay === idx;
          const isCurrentDay = isToday(day);
          
          return (
            <div 
              key={idx} 
              className={`calendar-day ${isCurrentDay ? 'today' : ''} ${isExpanded ? 'selected' : ''}`}
              style={phaseColor && isExpanded ? { 
                borderColor: phaseColor.primary,
                borderWidth: '2px'
              } : {}}
              onClick={() => handleDayClick(idx)}
            >
              <div className="calendar-date">{formatDate(day)}</div>
              {phase && (
                <div 
                  className="calendar-phase"
                  style={phaseColor ? { 
                    backgroundColor: phaseColor.light,
                    color: phaseColor.primary
                  } : {}}
                >
                  {phase}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {expandedDay !== null && selectedPhase && (
        <div 
          className="timeline-content-below"
          style={selectedPhaseColor ? { 
            borderTopColor: selectedPhaseColor.primary 
          } : {}}
        >
          <div className="phase-title" style={selectedPhaseColor ? { color: selectedPhaseColor.primary } : {}}>
            {selectedPhase}
          </div>
          <div className="day-guidance">
            <div className="guidance-section">
              <strong>Training:</strong>
              <ul>
                {phaseGuidance[selectedPhase]?.training.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="guidance-section">
              <strong>Fueling:</strong>
              <ul>
                {phaseGuidance[selectedPhase]?.fueling.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="guidance-section">
              <strong>Recovery:</strong>
              <ul>
                {phaseGuidance[selectedPhase]?.recovery.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="guidance-section">
              <strong>Avoid:</strong>
              <ul>
                {phaseGuidance[selectedPhase]?.avoid.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

