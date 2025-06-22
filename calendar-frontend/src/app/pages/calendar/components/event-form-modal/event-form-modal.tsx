import { useState } from 'react';
import moment from 'moment';
import { ModalStyle } from './styles/event-form-modal';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: { title: string; start: Date; end: Date }) => void;
}

export const EventFormModal = ({
  isOpen,
  onClose,
  onCreate,
}: EventFormModalProps) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !start || !end || moment(start).isAfter(moment(end))) {
      alert('Please enter a valid title and date range');
      return;
    }

    onCreate({
      title,
      start: new Date(start),
      end: new Date(end),
    });

    setTitle('');
    setStart('');
    setEnd('');
  };

  if (!isOpen) return null;

  return (
    <div css={ModalStyle}>
      <div>
        <h2>Create New Event</h2>
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
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
