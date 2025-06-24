import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { useCalendar } from './hooks/use-calendar';

export const CalendarPage = () => {
  const { events, addEvent, updateEvent, onNavigate } = useCalendar();

  return (
    <div>
      <CalendarToolbar addEvent={addEvent} updateEvent={updateEvent} />
      <CalendarView onNavigate={onNavigate} events={events} />
    </div>
  );
};
