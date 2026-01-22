// Single source of truth for cycle phase guidance
const phaseGuidance = {
  Menstrual: {
    training: [
      'Light to moderate training',
      'Technique work',
      'Easy Zone 2',
      'Mobility & strength endurance'
    ],
    fueling: [
      'Maintain carbs (do NOT cut)',
      'Moderate protein',
      'Iron-supportive foods',
      'Warm, nourishing meals'
    ],
    recovery: [
      'Prioritize sleep',
      'Increase hydration',
      'Gentle heat/cooling balance',
      'Nervous system down-regulation'
    ],
    avoid: [
      'Max effort sessions',
      'PR attempts',
      'Heavy plyometrics'
    ]
  },
  Follicular: {
    training: [
      'Highest intensity window',
      'Strength, power, speed',
      'HIIT & threshold work',
      'Heavy sleds & explosive lifts'
    ],
    fueling: [
      'Best carb tolerance → increase carbs',
      'Normal protein (≈1.8 g/kg)',
      'Balanced fats'
    ],
    recovery: [
      'Take advantage of high energy',
      'Push adaptations',
      'Shorter recovery needed'
    ],
    avoid: [
      'Under-fueling',
      'Skipping carbs'
    ]
  },
  Ovulation: {
    training: [
      'Peak strength & output',
      'Strategic hard sessions',
      'Controlled intensity'
    ],
    fueling: [
      'Slight increase in protein (≈2.2 g/kg)',
      'Maintain carbs',
      'Magnesium + zinc support'
    ],
    recovery: [
      'Extra warm-up & cooldown',
      'Joint stability focus'
    ],
    avoid: [
      'High-risk plyometrics',
      'Poor warm-ups (injury risk higher)'
    ]
  },
  Luteal: {
    training: [
      'Reduce intensity',
      'Steady endurance',
      'Strength endurance',
      'Technique & pacing'
    ],
    fueling: [
      'Increase carbs (higher burn rate)',
      'Maintain/increase protein',
      'Stabilize blood sugar'
    ],
    recovery: [
      'Longer recovery needs',
      'Cooling strategies',
      'Consistent sleep schedule'
    ],
    avoid: [
      'Excess caffeine',
      'Fasting',
      'High-volume HIIT'
    ]
  },
  'Late Luteal': {
    training: [
      'Deload or maintain',
      'Low CNS demand',
      'Aerobic base work'
    ],
    fueling: [
      'Carbs are critical (do not restrict)',
      'Hydration + electrolytes',
      'Reduce "hot" foods if overheating'
    ],
    recovery: [
      'Nervous system regulation',
      'Gentle movement',
      'Stress reduction'
    ],
    avoid: [
      'Heavy lifting',
      'Aggressive conditioning',
      'Sleep deprivation'
    ]
  }
};

export default phaseGuidance;

