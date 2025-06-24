import { render, screen, waitFor } from '@testing-library/react';
import { CalendarToolbar } from './calendar-toolbar';
import { EltEvent } from '../../../../common/types';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { CalendarProvider } from '../../../../context/calendar.context';
import * as CalendarContext from '../../../../context/calendar.context';

describe('CalendarToolbarComponent', () => {
  let addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  let updateEvent: (event: EltEvent) => Promise<void>;
  const mockEvent: EltEvent = {
    id: 100,
    title: 'Mock event',
    start: new Date(),
    end: new Date(),
  };

  beforeEach(() => {
    addEvent = jest.fn();
    updateEvent = jest.fn();
  });

  const renderWithProvider = (
    initialShowIds = false,
    initialSelectedEvent?: EltEvent,
  ) =>
    render(
      <CalendarProvider
        initialShowIds={initialShowIds}
        initialSelectedEvent={initialSelectedEvent}
      >
        <CalendarToolbar addEvent={addEvent} updateEvent={updateEvent} />
      </CalendarProvider>,
    );

  it('renders correctly', () => {
    const { container } = renderWithProvider();

    expect(container).toMatchSnapshot();
  });

  describe('Add event button', () => {
    it('should open the modal when Add event button is clicked', () => {
      renderWithProvider();

      const btn = screen.getByTestId('add-event-btn');
      userEvent.click(btn);

      expect(screen.getByText('Create New Event')).toBeInTheDocument();
    });

    it('should close modal when Cancel button is clicked', () => {
      renderWithProvider();

      const addBtn = screen.getByTestId('add-event-btn');
      userEvent.click(addBtn);

      expect(screen.getByText(/create new event/i)).toBeInTheDocument();

      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      userEvent.click(cancelBtn);

      expect(screen.queryByText(/create new event/i)).not.toBeInTheDocument();
    });

    it('should close modal after successful event creation', async () => {
      renderWithProvider();

      const addBtn = screen.getByTestId('add-event-btn');
      userEvent.click(addBtn);

      expect(screen.getByText(/create new event/i)).toBeInTheDocument();

      const titleInput = screen.getByLabelText(/title/i);
      const startTimeInput = screen.getByLabelText(/start time/i);
      const endTimeInput = screen.getByLabelText(/end time/i);

      userEvent.type(titleInput, 'Test Event');
      userEvent.type(startTimeInput, '25/06/2025, 09:00');
      userEvent.type(endTimeInput, '25/06/2025, 10:30');

      const createBtn = screen.getByRole('button', { name: /create/i });

      userEvent.click(createBtn);

      setTimeout(() => {
        expect(screen.queryByText(/create new event/i)).not.toBeInTheDocument();
      }, 0);
    });
  });

  describe('Edit event button', () => {
    it('should only be disabled if there is no selected event', async () => {
      renderWithProvider(false, undefined);

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeDisabled();
    });

    it('should only be disabled if there is a selected event', async () => {
      renderWithProvider(false, mockEvent);

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeEnabled();
    });

    it('should open the modal when Edit event button is clicked', () => {
      renderWithProvider(false, mockEvent);

      const btn = screen.getByTestId('edit-event-btn');
      userEvent.click(btn);

      expect(screen.getByText('Edit Event')).toBeInTheDocument();
      expect(screen.getByText(/update/i)).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    });

    it('should call updateEvent and close modal after submitting edited event', async () => {
      renderWithProvider(false, mockEvent);

      userEvent.click(screen.getByTestId('edit-event-btn'));

      const titleInput = screen.getByLabelText(/title/i);
      userEvent.clear(titleInput);
      userEvent.type(titleInput, 'Updated Event Title');

      const submitBtn = screen.getByRole('button', { name: /save|update/i });
      userEvent.click(submitBtn);

      expect(updateEvent).toHaveBeenCalledWith({
        id: mockEvent.id,
        title: 'Updated Event Title',
        start: expect.any(Date),
        end: expect.any(Date),
      });

      await waitFor(() => {
        expect(screen.queryByText('Edit Event')).not.toBeInTheDocument();
      });
    });
  });

  describe('Show ids checkbox', () => {
    it('should toggle ids being shown', () => {
      const setShowIdsMock = jest.fn();

      // Spy on useCalendarContext to return controlled values
      jest.spyOn(CalendarContext, 'useCalendarContext').mockReturnValue({
        showIds: false,
        setShowIds: setShowIdsMock,
        selectedEvent: undefined,
        setSelectedEvent: jest.fn(),
      });

      render(<CalendarToolbar addEvent={addEvent} updateEvent={updateEvent} />);

      const checkbox = screen.getByLabelText('Show ids');
      expect(checkbox).not.toBeChecked();

      // Check
      userEvent.click(checkbox);
      expect(setShowIdsMock).toHaveBeenCalledWith(true);

      // Uncheck
      userEvent.click(checkbox);
      expect(setShowIdsMock).toHaveBeenCalledWith(false);
    });
  });
});
