// Color mapping for cycle phases
export const phaseColors = {
  Menstrual: {
    primary: '#c85a5a',
    light: '#ffe0e0',
    dark: '#b84a4a'
  },
  Follicular: {
    primary: '#E0AED0',
    light: '#f8f0f5',
    dark: '#d095c0'
  },
  Ovulation: {
    primary: '#AC87C5',
    light: '#f5f0f8',
    dark: '#9a6db5'
  },
  Luteal: {
    primary: '#756AB6',
    light: '#f0eef5',
    dark: '#64589f'
  },
  'Late Luteal': {
    primary: '#756AB6',
    light: '#f0eef5',
    dark: '#64589f'
  }
};

/**
 * Get color values for a phase
 * @param {string} phase - Phase name
 * @returns {object} Color object with primary, light, and dark properties, or null if phase not found
 */
export function getPhaseColor(phase) {
  return phaseColors[phase] || null;
}


