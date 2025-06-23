import { FormEvent, useEffect, useState } from 'react';
import moment from 'moment';
import { ModalStyle } from './styles/event-form-modal';
import { EltEvent } from '../../../../common/types';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Omit<EltEvent, 'id'>) => void;
  onEdit?: (event: Omit<EltEvent, 'id'>) => void;
  event?: EltEvent | undefined;
}

export const EventFormModal = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  event,
}: EventFormModalProps) => {
  const [title, setTitle] = useState(event?.title || '');
  const [start, setStart] = useState(
    event ? moment(event.start).format('YYYY-MM-DDTHH:mm') : '',
  );
  const [end, setEnd] = useState(
    event ? moment(event.end).format('YYYY-MM-DDTHH:mm') : '',
  );

  useEffect(() => {
    setTitle(event?.title || '');
    setStart(event ? moment(event.start).format('YYYY-MM-DDTHH:mm') : '');
    setEnd(event ? moment(event.end).format('YYYY-MM-DDTHH:mm') : '');
  }, [event]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title || !start || !end || moment(start).isAfter(moment(end))) {
      alert('Please enter a valid title and date range');
      return;
    }

    const eventPayload = {
      title,
      start: new Date(start),
      end: new Date(end),
    };

    // Edit mode is true if there is an event and an onEdit handler function
    const isEditMode = !!event && typeof onEdit === 'function';

    if (isEditMode) {
      onEdit(eventPayload);
    } else {
      onCreate(eventPayload);
    }

    setTitle('');
    setStart('');
    setEnd('');
  };

  if (!isOpen) return null;

  return (
    <div css={ModalStyle}>
      <div>
        <h2>{event ? 'Edit Event' : 'Create New Event'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Start Time
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </label>
          <label>
            End Time
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="submit">{event ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
