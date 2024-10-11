import { Culture, DateLocalizer, DateRange, Formats } from 'react-big-calendar';

export const CalendarFormats: Formats = {
  eventTimeRangeFormat: (range: DateRange, culture?: Culture, localizer?: DateLocalizer) => `${localizer?.format(range.start, 'HH:mm')} - ${localizer?.format(range.end, 'HH:mm')}`
};
