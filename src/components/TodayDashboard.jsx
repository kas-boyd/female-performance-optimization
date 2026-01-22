import { useState } from 'react';
import phaseGuidance from '../data/phaseGuidance.js';
import { getPhaseColor } from '../utils/phaseColors.js';
import './TodayDashboard.css';

const SECTION_TITLES = {
  training: 'Training Focus',
  fueling: 'Fueling Adjustments',
  recovery: 'Recovery & Lifestyle Focus',
  avoid: 'What to Avoid'
};

function CollapsibleSection({ title, items, isOpen, onToggle }) {
  return (
    <div className="collapsible-card">
      <button 
        className="collapsible-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3>{title}</h3>
        <span className="collapse-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="collapsible-content">
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function TodayDashboard({ phase }) {
  const [openSections, setOpenSections] = useState({
    training: true,
    fueling: true,
    recovery: true,
    avoid: true
  });

  if (!phase || !phaseGuidance[phase]) {
    return (
      <div className="card">
        <p>Please select a phase</p>
      </div>
    );
  }

  const guidance = phaseGuidance[phase];
  const phaseColor = getPhaseColor(phase);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="card">
      <div className="today-header">
        <h2>
          Phase Guidance
          <div 
            className="phase-badge-large"
            style={{
              backgroundColor: phaseColor?.light || '#f0f0f0',
              color: phaseColor?.primary || '#0066cc'
            }}
          >
            {phase}
          </div>
        </h2>
      </div>
      <div className="today-dashboard">
        <CollapsibleSection
          title={SECTION_TITLES.training}
          items={guidance.training}
          isOpen={openSections.training}
          onToggle={() => toggleSection('training')}
        />
        <CollapsibleSection
          title={SECTION_TITLES.fueling}
          items={guidance.fueling}
          isOpen={openSections.fueling}
          onToggle={() => toggleSection('fueling')}
        />
        <CollapsibleSection
          title={SECTION_TITLES.recovery}
          items={guidance.recovery}
          isOpen={openSections.recovery}
          onToggle={() => toggleSection('recovery')}
        />
        <CollapsibleSection
          title={SECTION_TITLES.avoid}
          items={guidance.avoid}
          isOpen={openSections.avoid}
          onToggle={() => toggleSection('avoid')}
        />
      </div>
    </div>
  );
}

