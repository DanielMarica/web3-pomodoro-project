import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import type { RootState } from './store/store';
import { HomePage } from './pages/HomePage';
import { MusicPage } from './pages/MusicPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CryptoTrackerPage } from './pages/CryptoPage';
import { useTimer } from './hooks/useTimer';
import { useMusic } from './hooks/useMusic';

function App() {
  // Hook personnalisé pour gérer le timer automatiquement
  useTimer();
  
  // Hook pour gérer la musique de fond
  useMusic();

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
          <Route path="/crypto" element={<CryptoTrackerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
