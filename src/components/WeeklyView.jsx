import CycleSettings from './CycleSettings.jsx';
import WeekTimeline from './WeekTimeline.jsx';

function getCurrentWeek() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const week = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    week.push(date);
  }
  return week;
}

export default function WeeklyView() {
  const weekDays = getCurrentWeek();

  return (
    <>
      <CycleSettings />
      <WeekTimeline weekDays={weekDays} />
    </>
  );
}
