import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from 'react';
import { EltEvent } from '../common/types';

interface CalendarContextValue {
  showIds: boolean;
  setShowIds: Dispatch<boolean>;
  selectedEvent?: EltEvent;
  setSelectedEvent: (event: EltEvent) => void;
}

interface CalendarProviderProps {
  children: ReactNode;
  initialShowIds?: boolean;
  initialSelectedEvent?: EltEvent;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

export const CalendarProvider = ({
  children,
  initialShowIds = false,
  initialSelectedEvent = undefined,
}: CalendarProviderProps) => {
  const [showIds, setShowIds] = useState(initialShowIds);
  const [selectedEvent, setSelectedEvent] = useState<EltEvent | undefined>(
    initialSelectedEvent,
  );

  return (
    <CalendarContext.Provider
      value={{ showIds, setShowIds, selectedEvent, setSelectedEvent }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
};
