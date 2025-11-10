import { Box, Menu, MenuItem, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setWorkDuration, setShortBreakDuration, setTheme } from '../../features/settings/settingsSlice';
import { updateTimerDuration } from '../../features/timer/timerSlice';
import { logout } from '../../features/auth/authSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workDuration, shortBreakDuration } = useAppSelector(
    (state) => state.settings
  );
  const { mode } = useAppSelector((state) => state.timer);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // États pour les menus
  const [workAnchor, setWorkAnchor] = useState<null | HTMLElement>(null);
  const [breakAnchor, setBreakAnchor] = useState<null | HTMLElement>(null);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  const [authAnchor, setAuthAnchor] = useState<null | HTMLElement>(null);

  const workDurations = [1, 5, 10, 15, 20, 25, 30, 45, 60];
  const breakDurations = [5, 10, 15, 20];
  const themes = ['Light', 'Dark'];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap', // Permet le retour à la ligne sur petits écrans
        gap: { xs: 2, sm: 3, md: 4 }, // Gap responsive
        py: { xs: 2, sm: 3 }, // Padding vertical responsive
        px: { xs: 1, sm: 2 }, // Padding horizontal responsive
      }}
    >
      {/* My Work Times */}
      <Box>
        <Button
          onClick={(e) => setWorkAnchor(e.currentTarget)}
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Taille responsive
            textTransform: 'none',
            '&:hover': { bgcolor: 'transparent' },
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          My Work Times
        </Button>
        <Menu
          anchorEl={workAnchor}
          open={Boolean(workAnchor)}
          onClose={() => setWorkAnchor(null)}
          PaperProps={{
            sx: {
              border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
              borderRadius: '12px',
              mt: 1,
            },
          }}
        >
          {workDurations.map((duration) => (
            <MenuItem
              key={duration}
              onClick={() => {
                dispatch(setWorkDuration(duration));
                // Mettre à jour le timer si on est en mode focus
                if (mode === 'focus') {
                  dispatch(updateTimerDuration({ duration, resetTime: true }));
                }
                setWorkAnchor(null);
              }}
              sx={{
                fontWeight: duration === workDuration ? 'bold' : 'normal',
                bgcolor: (theme) => duration === workDuration 
                  ? (theme.palette.mode === 'dark' ? '#3a3a3a' : '#f0f0f0')
                  : 'transparent',
              }}
            >
              {duration} minutes
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* My Break Time */}
      <Box>
        <Button
          onClick={(e) => setBreakAnchor(e.currentTarget)}
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Taille responsive
            textTransform: 'none',
            '&:hover': { bgcolor: 'transparent' },
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          My Break Time
        </Button>
        <Menu
          anchorEl={breakAnchor}
          open={Boolean(breakAnchor)}
          onClose={() => setBreakAnchor(null)}
          PaperProps={{
            sx: {
              border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
              borderRadius: '12px',
              mt: 1,
            },
          }}
        >
          {breakDurations.map((duration) => (
            <MenuItem
              key={duration}
              onClick={() => {
                dispatch(setShortBreakDuration(duration));
                // Mettre à jour le timer immédiatement si on est en mode break
                // Sinon, la durée sera utilisée lors du prochain changement de mode
                if (mode === 'shortBreak' || mode === 'longBreak') {
                  dispatch(updateTimerDuration({ duration, resetTime: true }));
                }
                setBreakAnchor(null);
              }}
              sx={{
                fontWeight: duration === shortBreakDuration ? 'bold' : 'normal',
                bgcolor: (theme) => duration === shortBreakDuration 
                  ? (theme.palette.mode === 'dark' ? '#3a3a3a' : '#f0f0f0')
                  : 'transparent',
              }}
            >
              {duration} minutes
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* My Themes */}
      <Box>
        <Button
          onClick={(e) => setThemeAnchor(e.currentTarget)}
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Taille responsive
            textTransform: 'none',
            '&:hover': { bgcolor: 'transparent' },
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          My Themes
        </Button>
        <Menu
          anchorEl={themeAnchor}
          open={Boolean(themeAnchor)}
          onClose={() => setThemeAnchor(null)}
          PaperProps={{
            sx: {
              border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
              borderRadius: '12px',
              mt: 1,
            },
          }}
        >
          {themes.map((themeOption) => (
            <MenuItem
              key={themeOption}
              onClick={() => {
                dispatch(setTheme(themeOption.toLowerCase() as 'light' | 'dark'));
                setThemeAnchor(null);
              }}
            >
              {themeOption}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* My Account */}
      <Box>
        <Button
          onClick={(e) => setAuthAnchor(e.currentTarget)}
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Taille responsive
            textTransform: 'none',
            '&:hover': { bgcolor: 'transparent' },
          }}
          endIcon={<KeyboardArrowDownIcon />}
        >
          My Account
        </Button>
        <Menu
          anchorEl={authAnchor}
          open={Boolean(authAnchor)}
          onClose={() => setAuthAnchor(null)}
          PaperProps={{
            sx: {
              border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
              borderRadius: '12px',
              mt: 1,
            },
          }}
        >
          {isAuthenticated ? (
            <>
              {/* Info utilisateur */}
              <MenuItem disabled sx={{ opacity: 1 }}>
                <Box>
                  <Box sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {user?.username || user?.email}
                  </Box>
                  {user?.email && user?.username && (
                    <Box sx={{ fontSize: '12px', color: 'text.secondary' }}>
                      {user.email}
                    </Box>
                  )}
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  setAuthAnchor(null);
                }}
                sx={{
                  color: 'error.main',
                  fontWeight: 'bold',
                }}
              >
                Déconnexion
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  navigate('/login');
                  setAuthAnchor(null);
                }}
              >
                Se connecter
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/signup');
                  setAuthAnchor(null);
                }}
              >
                S'inscrire
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Box>
  );
};
