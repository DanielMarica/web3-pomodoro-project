import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dropdown } from '../common/Dropdown';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setWorkDuration, setShortBreakDuration, setLongBreakDuration } from '../../features/settings/settingsSlice';

const SelectorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const timeOptions = [
  { value: 1, label: '1 minute' },
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
  { value: 25, label: '25 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
];

const breakOptions = [
  { value: 1, label: '1 minute' },
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
];

export const TimeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workDuration, shortBreakDuration, longBreakDuration } = useAppSelector(
    (state) => state.settings
  );

  return (
    <SelectorContainer>
      <Typography variant="h6" fontWeight={600}>
        ⏱️ Durées
      </Typography>
      
      <Dropdown
        label="Temps de travail"
        value={workDuration}
        options={timeOptions}
        onChange={(value) => dispatch(setWorkDuration(value as number))}
        fullWidth
      />
      
      <Dropdown
        label="Pause courte"
        value={shortBreakDuration}
        options={breakOptions}
        onChange={(value) => dispatch(setShortBreakDuration(value as number))}
        fullWidth
      />
      
      <Dropdown
        label="Pause longue"
        value={longBreakDuration}
        options={breakOptions}
        onChange={(value) => dispatch(setLongBreakDuration(value as number))}
        fullWidth
      />
    </SelectorContainer>
  );
};
