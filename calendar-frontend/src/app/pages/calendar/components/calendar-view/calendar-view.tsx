import { useEffect, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './styles/calendar.scss';
import { EltEvent } from '../../../../common/types';
import { CalendarFormats } from './formats';
import { useCalendarView } from '../../hooks/use-calendar-view';
import { CalendarService } from '../../../../service/calendar.service';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<EltEvent>(Calendar);

interface ICalendarViewProps {
  onNavigate: (date: Date, view: View) => void;
  events: EltEvent[];
  showIds: boolean;
  setSelectedEvent: (event: EltEvent) => void;
}

export const CalendarView = ({
  onNavigate,
  events,
  showIds,
  setSelectedEvent,
}: ICalendarViewProps) => {
  const { components } = useCalendarView(showIds);
  const [localEvents, setLocalEvents] = useState<EltEvent[]>(events);
  const calendarService = useMemo(() => new CalendarService(), []);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const onEventDrop = async ({
    event,
    start,
    end,
  }: EventInteractionArgs<EltEvent>) => {
    try {
      await calendarService.updateEvent(
        event.id,
        event.title,
        moment(start),
        moment(end),
      );

      setLocalEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev.id === event.id
            ? { ...ev, start: new Date(start), end: new Date(end) }
            : ev,
        ),
      );
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };
  const onEventResize = async ({
    event,
    start,
    end,
  }: EventInteractionArgs<EltEvent>) => {
    try {
      await calendarService.updateEvent(
        event.id,
        event.title,
        moment(start),
        moment(end),
      );

      setLocalEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev.id === event.id
            ? { ...ev, start: new Date(start), end: new Date(end) }
            : ev,
        ),
      );
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  return (
    <DnDCalendar
      components={components}
      defaultDate={moment().toDate()}
      events={localEvents}
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
      dayLayoutAlgorithm={'no-overlap'}
    />
  );
};
