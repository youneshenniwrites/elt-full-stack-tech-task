import { EltEvent } from '../../../../common/types';
import { Dispatch } from 'react';
import { useCalendarToolbar } from '../../hooks/use-calendar-toolbar';
import { ToolbarStyle } from './styles/calendar-toolbar-style';
import { EventFormModal } from '../event-form-modal/event-form-modal';

interface ICalendarToolbarProps {
  addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  updateEvent: (event: EltEvent) => Promise<void>;
  showIds: boolean;
  setShowIds: Dispatch<boolean>;
  selectedEvent?: EltEvent;
}

export const CalendarToolbar = ({
  addEvent,
  showIds,
  setShowIds,
  selectedEvent,
  updateEvent,
}: ICalendarToolbarProps) => {
  const {
    isModalOpen,
    editingEvent,
    openModalForCreate,
    openModalForEdit,
    closeModal,
    handleCreate,
    handleEdit,
  } = useCalendarToolbar(addEvent, updateEvent);

  const editEvent = (event?: EltEvent) => {
    if (!event) return;
    openModalForEdit(event);
  };

  return (
    <div css={ToolbarStyle}>
      <button data-testid="add-event-btn" onClick={openModalForCreate}>
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
      <EventFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleCreate}
        onEdit={handleEdit}
        event={editingEvent || undefined}
      />
    </div>
  );
};
