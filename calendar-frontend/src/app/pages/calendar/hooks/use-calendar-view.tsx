import { useMemo } from 'react';
import { EltEvent } from '../../../common/types';

const getCustomCalendarEventComponent =
  ({ showIds }: { showIds: boolean }) =>
  ({ event }: { event: EltEvent }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        {showIds && <div>id: {event.id}</div>}
      </span>
    );
  };

export const useCalendarView = (showIds: boolean) => {
  const components = useMemo(
    () => ({ event: getCustomCalendarEventComponent({ showIds }) }),
    [showIds],
  );

  return {
    components,
  };
};
