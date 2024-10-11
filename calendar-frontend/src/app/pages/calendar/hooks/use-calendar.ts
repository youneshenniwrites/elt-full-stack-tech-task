import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { View } from 'react-big-calendar';
import { EltEvent } from '../../../common/types';
import { CalendarService } from '../../../service/calendar.service';

export const useCalendar = () => {
  const calendarService = new CalendarService();
  const [events, setEvents] = useState<EltEvent[]>([]);
  const [showIds, setShowIds] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EltEvent | undefined>();

  useEffect(() => {
    const today = moment();
    fetchEvents(today.startOf('week'), today.clone().endOf('week'));
  }, []);

  const fetchEvents = async (start: moment.Moment, end: moment.Moment) => {
    const { data } = await calendarService.getEventsForRange(start, end);
    const processedEvents: EltEvent[] = data.map(e => ({id: e.id, title: e.name, start: new Date(e.start), end: new Date(e.end)}));
    setEvents(processedEvents);
  };

  const onNavigate = async (newDate: Date, view: View) => {
    const newMutableDate = moment(newDate);
    await fetchEvents(newMutableDate.startOf(view as any), newMutableDate.clone().endOf(view as any))
  };

  const addEvent = async (event: EltEvent) => {
    const { data: { id } } = await calendarService.createEvent(event.title as string, moment(event.start), moment(event.end));
    setEvents(events => [...events, {...event, id}]);
  };

  return {
    events,
    showIds,
    setShowIds,
    onNavigate,
    addEvent,
    selectedEvent,
    setSelectedEvent
  }
};
