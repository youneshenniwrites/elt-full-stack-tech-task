import { render, screen } from '@testing-library/react';
import { CalendarToolbar } from './calendar-toolbar';
import { EltEvent } from '../../../../common/types';
import { Dispatch } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('CalendarToolbarComponent', () => {
  let addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  let setShowIds: Dispatch<boolean>;
  const mockEvent: EltEvent = {
    id: 100,
    title: 'Mock event',
    start: new Date(),
    end: new Date(),
  };

  beforeEach(() => {
    addEvent = jest.fn();
    setShowIds = jest.fn();
  });

  it('renders correctly', () => {
    const { container } = render(
      <CalendarToolbar
        addEvent={addEvent}
        showIds={false}
        setShowIds={setShowIds}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  describe('Add event button', () => {
    it('should open the modal when Add event button is clicked', () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
        />,
      );

      const btn = screen.getByTestId('add-event-btn');
      userEvent.click(btn);

      expect(screen.getByText('Create New Event')).toBeInTheDocument();
    });

    it('should close modal when Cancel button is clicked', () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
        />,
      );

      const addBtn = screen.getByTestId('add-event-btn');
      userEvent.click(addBtn);

      expect(screen.getByText(/create new event/i)).toBeInTheDocument();

      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      userEvent.click(cancelBtn);

      expect(screen.queryByText(/create new event/i)).not.toBeInTheDocument();
    });

    it('should close modal after successful event creation', async () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
        />,
      );

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
      }, 25);
    });
  });

  describe('Edit event button', () => {
    it('should only be disabled if there is no selected event', async () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
        />,
      );

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeDisabled();
    });

    it('should only be disabled if there is a selected event', async () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
          selectedEvent={mockEvent}
        />,
      );

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeEnabled();
    });
  });

  describe('Show ids checkbox', () => {
    it('should toggle ids being shown', () => {
      render(
        <CalendarToolbar
          addEvent={addEvent}
          showIds={false}
          setShowIds={setShowIds}
        />,
      );

      const checkbox = screen.getByLabelText('Show ids');
      expect(checkbox).not.toBeChecked();

      // Check
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      expect(setShowIds).toHaveBeenCalledWith(true);

      // Uncheck
      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(setShowIds).toHaveBeenCalledWith(false);
    });
  });
});
