import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './styles/calendar.scss';
import { EltEvent } from '../../../../common/types';
import { CalendarFormats } from './formats';
import { useMemo } from 'react';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface ICalendarViewProps {
  onNavigate: (date: Date, view: View) => void;
  events: EltEvent[];
  showIds: boolean;
  setSelectedEvent: (event: EltEvent) => void;
}

const getCustomCalendarEventComponent =
  ({ showIds }: { showIds: boolean }) =>
  ({ event }: { event: EltEvent }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        {showIds && <div>id: {event.id}</div>}
      </span>
    );
  };

export const CalendarView = ({
  onNavigate,
  events,
  showIds,
  setSelectedEvent,
}: ICalendarViewProps) => {
  const components = useMemo(
    () => ({ event: getCustomCalendarEventComponent({ showIds }) }),
    [showIds],
  );

  const onEventDrop = () => console.log('todo');
  const onEventResize = () => console.log('todo');

  return (
    <DnDCalendar
      components={components}
      defaultDate={moment().toDate()}
      events={events}
      onNavigate={onNavigate}
      defaultView={'week'}
      onSelectEvent={setSelectedEvent}
      localizer={localizer}
      formats={CalendarFormats}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '80vh' }}
      popup={true}
    />
  );
};
