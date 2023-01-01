// External imports
import { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, PaletteMode } from '@mui/material';

// Local imports
import HomePage from '../pages/Home/HomePage';
import { ColorContext } from '../themes/theme';

// Component definition
function App() {
  const setMode = useState<PaletteMode>('dark')[1];

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [setMode],
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </ColorContext.Provider>
  );
}

// Default export
export default App;
