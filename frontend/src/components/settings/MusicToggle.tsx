import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleMusic, toggleSound } from '../../features/settings/settingsSlice';

const ToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MusicToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { musicEnabled, soundEnabled } = useAppSelector((state) => state.settings);

  return (
    <ToggleContainer>
      <Typography variant="h6" fontWeight={600}>
        🔊 Son
      </Typography>
      
      <StyledFormControlLabel
        control={
          <Switch
            checked={soundEnabled}
            onChange={() => dispatch(toggleSound())}
            color="primary"
          />
        }
        label="Notifications sonores"
        labelPlacement="start"
      />
      
      <StyledFormControlLabel
        control={
          <Switch
            checked={musicEnabled}
            onChange={() => dispatch(toggleMusic())}
            color="primary"
          />
        }
        label="Musique de fond"
        labelPlacement="start"
      />
    </ToggleContainer>
  );
};
