import { EltEvent } from '../../../../common/types';
import { Dispatch } from 'react';
import { useCalendarToolbar } from '../../hooks/use-calendar-toolbar';
import { ToolbarStyle } from './styles/calendar-toolbar-style';

interface ICalendarToolbarProps {
  addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  showIds: boolean;
  setShowIds: Dispatch<boolean>;
  selectedEvent?: EltEvent;
}

export const CalendarToolbar = ({
  addEvent,
  showIds,
  setShowIds,
  selectedEvent,
}: ICalendarToolbarProps) => {
  const { createRandomEvent } = useCalendarToolbar(addEvent);

  const editEvent = (event?: EltEvent) => {
    console.log('todo');
  };

  return (
    <div css={ToolbarStyle}>
      <button data-testid="add-event-btn" onClick={createRandomEvent}>
        Add event
      </button>
      <button
        data-testid="edit-event-btn"
        onClick={() => editEvent(selectedEvent)}
        disabled={!selectedEvent}
      >
        Edit event
      </button>
      <label htmlFor="show-ids-checkbox">
        <input
          id="show-ids-checkbox"
          type="checkbox"
          defaultChecked={showIds}
          onClick={(e) => setShowIds(e.currentTarget.checked)}
        ></input>
        Show ids
      </label>
    </div>
  );
};
