import { useState } from 'react';
import { EltEvent } from '../../../common/types';

export const useCalendarToolbar = (
  addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>,
  updateEvent: (event: EltEvent) => Promise<void>,
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EltEvent | null>(null);

  const openModalForCreate = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (event: EltEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCreate = async (event: Omit<EltEvent, 'id'>) => {
    try {
      await addEvent(event);
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create event.');
    }
  };

  const handleEdit = async (event: Omit<EltEvent, 'id'>) => {
    if (!editingEvent) return;
    try {
      await updateEvent({ ...event, id: editingEvent.id });
      closeModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update event.');
    }
  };

  return {
    isModalOpen,
    editingEvent,
    openModalForCreate,
    openModalForEdit,
    closeModal,
    handleCreate,
    handleEdit,
  };
};
