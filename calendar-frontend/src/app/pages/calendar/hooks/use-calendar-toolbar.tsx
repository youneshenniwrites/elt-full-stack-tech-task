import { useState } from 'react';
import { EltEvent } from '../../../common/types';

export const useCalendarToolbar = (
  addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>,
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreate = async (event: Omit<EltEvent, 'id'>) => {
    await addEvent(event);
    closeModal();
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleCreate,
  };
};
