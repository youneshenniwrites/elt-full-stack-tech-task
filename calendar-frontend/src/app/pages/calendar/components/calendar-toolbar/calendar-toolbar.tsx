import { css } from '@emotion/react';
import { EltEvent } from '../../../../common/types';
import moment from 'moment';
import { random } from 'lodash';
import { Dispatch } from 'react';

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
  const createRandomEvent = async () => {
    // Start in the next 48h
    const start = moment().add(random(15, 48 * 60), 'minutes');
    // Last between 30m and 1h 30m
    const end = start.clone().add(random(30, 90), 'minutes');
    const title = `Random event ${random(1, 9999)}`;

    await addEvent({ title, start: start.toDate(), end: end.toDate() });
  };

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

const ToolbarStyle = css`
  width: 100%;
  text-align: center;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    color: #373a3c;
    display: inline-block;
    margin: 0;
    text-align: center;
    vertical-align: middle;
    background: none;
    border: 1px solid #ccc;
    padding: 0.375rem 1rem;
    border-radius: 4px;
    line-height: normal;
    white-space: nowrap;

    &:hover {
      color: #373a3c;
      background-color: rgb(229.5, 229.5, 229.5);
      border-color: rgb(173.4, 173.4, 173.4);
      cursor: pointer;
    }

    &:active {
      box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      background-color: rgb(229.5, 229.5, 229.5);
      border-color: rgb(173.4, 173.4, 173.4);
    }

    &:disabled {
      background-color: #ccc;
      color: #fff;
      pointer-events: none;
    }
  }
`;
