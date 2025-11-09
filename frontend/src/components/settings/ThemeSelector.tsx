import React from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTheme } from '../../features/settings/settingsSlice';

const SelectorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  '& .MuiToggleButton-root': {
    flex: 1,
    padding: '12px',
    border: '2px solid',
    borderColor: theme.palette.divider,
    borderRadius: '12px',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      borderColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

export const ThemeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.settings);

  const handleThemeChange = (_: React.MouseEvent<HTMLElement>, newTheme: 'light' | 'dark' | null) => {
    if (newTheme) {
      dispatch(setTheme(newTheme));
    }
  };

  return (
    <SelectorContainer>
      <Typography variant="h6" fontWeight={600}>
        🎨 Thème
      </Typography>
      
      <StyledToggleButtonGroup
        value={theme}
        exclusive
        onChange={handleThemeChange}
        aria-label="theme selector"
      >
        <ToggleButton value="light" aria-label="light mode">
          <LightMode sx={{ mr: 1 }} />
          Clair
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          <DarkMode sx={{ mr: 1 }} />
          Sombre
        </ToggleButton>
      </StyledToggleButtonGroup>
    </SelectorContainer>
  );
};
