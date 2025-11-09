import { Box, Menu, MenuItem, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setWorkDuration, setShortBreakDuration, setTheme } from '../../features/settings/settingsSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { workDuration, shortBreakDuration } = useAppSelector(
    (state) => state.settings
  );

  // États pour les menus
  const [workAnchor, setWorkAnchor] = useState<null | HTMLElement>(null);
  const [breakAnchor, setBreakAnchor] = useState<null | HTMLElement>(null);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);

  const workDurations = [5, 10, 15, 20, 25, 30, 45, 60];
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
            color: '#000',
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
              border: '2px solid #000',
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
                setWorkAnchor(null);
              }}
              sx={{
                fontWeight: duration === workDuration ? 'bold' : 'normal',
                bgcolor: duration === workDuration ? '#f0f0f0' : 'transparent',
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
            color: '#000',
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
              border: '2px solid #000',
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
                setBreakAnchor(null);
              }}
              sx={{
                fontWeight: duration === shortBreakDuration ? 'bold' : 'normal',
                bgcolor: duration === shortBreakDuration ? '#f0f0f0' : 'transparent',
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
            color: '#000',
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
              border: '2px solid #000',
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
    </Box>
  );
};
