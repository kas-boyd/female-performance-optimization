/**
 * Calculates which day of the cycle a given date falls on
 * @param {Date} date - The date to check
 * @param {Date} cycleStart - Day 1 of the cycle (first day of bleed)
 * @param {number} cycleLength - Average cycle length (default 28)
 * @returns {number} Day of cycle (1-based)
 */
function getDayInCycle(date, cycleStart, cycleLength) {
  const diffTime = date - cycleStart;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // Handle negative differences (date before cycleStart)
  const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;
  return dayInCycle;
}

/**
 * Infers the menstrual cycle phase for a given date
 * @param {Date} date - The date to check
 * @param {Date} cycleStart - Day 1 of the cycle (first day of bleed)
 * @param {number} cycleLength - Average cycle length (default 28)
 * @param {number} bleedLength - Average bleed length (default 5)
 * @returns {string} Phase name: 'Menstrual', 'Follicular', 'Ovulation', 'Luteal', or 'Late Luteal'
 */
export function inferPhaseForDate(date, cycleStart, cycleLength = 28, bleedLength = 5) {
  const dayInCycle = getDayInCycle(date, cycleStart, cycleLength);

  // Menstrual: day 1 to bleedLength
  if (dayInCycle <= bleedLength) {
    return 'Menstrual';
  }

  // Follicular: day (bleedLength+1) to day 12
  if (dayInCycle <= 12) {
    return 'Follicular';
  }

  // Ovulation: day 13 to 15
  if (dayInCycle <= 15) {
    return 'Ovulation';
  }

  // Late Luteal: last 7 days of cycle
  if (dayInCycle > cycleLength - 7) {
    return 'Late Luteal';
  }

  // Luteal: day 16 to (cycleLength - 7)
  return 'Luteal';
}

