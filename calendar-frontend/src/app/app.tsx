import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import { CalendarPage } from './pages/calendar/calendar.page';
import { CalendarProvider } from './context/calendar.context';
const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <CalendarProvider>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
        </Routes>
      </CalendarProvider>
    </StyledApp>
  );
}

export default App;
