import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { store } from './store/store';
import type { RootState } from './store/store';
import { HomePage } from './pages/HomePage';
import { MusicPage } from './pages/MusicPage';
import { useTimer } from './hooks/useTimer';

function AppContent() {
  // Hook personnalisé pour gérer le timer automatiquement
  useTimer();

  // Lire le thème depuis Redux
  const themeMode = useSelector((state: RootState) => state.settings.theme);

  // Créer le thème dynamiquement basé sur Redux
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        palette: {
          mode: themeMode, // 'light' ou 'dark'
          primary: {
            main: '#667EEA',
          },
          secondary: {
            main: '#76D672',
          },
          background: {
            default: themeMode === 'light' ? '#f5f5f5' : '#1a1a1a',
            paper: themeMode === 'light' ? '#ffffff' : '#2d2d2d',
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/music" element={<MusicPage />} />
          {/* Ajoute d'autres routes ici plus tard */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
