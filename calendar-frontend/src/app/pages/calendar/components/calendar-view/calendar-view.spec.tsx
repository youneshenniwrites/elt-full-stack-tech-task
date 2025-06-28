import { render, screen, within } from '@testing-library/react';
import { CalendarView } from './calendar-view';
import { View } from 'react-big-calendar';
import { EltEvent } from '../../../../common/types';
import '@testing-library/jest-dom';
import { CalendarProvider } from '../../../../context/calendar.context';

describe('CalendarView', () => {
  let onNavigate: (date: Date, view: View) => void;
  const mockEvent: EltEvent = {
    id: 100,
    title: 'Mock event',
    start: new Date('2024-10-11T12:15:00Z'),
    end: new Date('2024-10-11T12:45:00Z'),
  };

  beforeEach(() => {
    onNavigate = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2024-10-11T10:30:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderWithProvider = (events: EltEvent[], initialShowIds = false) =>
    render(
      <CalendarProvider initialShowIds={initialShowIds}>
        <CalendarView onNavigate={onNavigate} events={events} />
      </CalendarProvider>,
    );

  it('should render an empty calendar', () => {
    const { container } = renderWithProvider([]);

    expect(container).toMatchSnapshot();
  });

  it('should render a calendar with an event', () => {
    const { container } = renderWithProvider([mockEvent]);

    expect(container).toMatchSnapshot();

    const eventLabel = screen.getByText('Mock event');
    const event = eventLabel.closest('.rbc-event') as HTMLElement;
    const eventTime = event?.querySelector('.rbc-event-label');

    expect(eventTime).toHaveTextContent('12:15 - 12:45');
    expect(within(event).queryByText('id: 100')).not.toBeInTheDocument();
  });

  it('should show event ids if flag is set', () => {
    renderWithProvider([mockEvent], true);

    const eventLabel = screen.getByText('Mock event');
    const event = eventLabel.closest('.rbc-event') as HTMLElement;

    expect(within(event).queryByText('id: 100')).toBeInTheDocument();
  });
});
