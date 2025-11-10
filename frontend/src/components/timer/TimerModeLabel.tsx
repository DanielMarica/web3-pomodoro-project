import React from 'react';
import { Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TimerMode } from '../../types/timer.types';

interface TimerModeLabelProps {
  mode: TimerMode;
}

const LabelContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const ModeChip = styled(Chip)<{ timermode: TimerMode }>(({ timermode }) => ({
  fontSize: '14px',
  fontWeight: 700,
  padding: '8px 16px',
  height: 'auto',
  borderRadius: '20px',
  backgroundColor: 
    timermode === 'focus' 
      ? '#667eea' 
      : timermode === 'shortBreak' 
      ? '#48bb78' 
      : '#ed8936',
  color: '#fff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const ModeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  letterSpacing: '2px',
}));

const getModeLabel = (mode: TimerMode): string => {
  switch (mode) {
    case 'focus':
      return 'FOCUS';
    case 'shortBreak':
      return 'SHORT BREAK';
    case 'longBreak':
      return 'LONG BREAK';
    default:
      return 'TIMER';
  }
};

const getModeTitle = (mode: TimerMode): string => {
  switch (mode) {
    case 'focus':
      return 'WORK TIME !!';
    case 'shortBreak':
      return 'BREAK TIME !!';
    case 'longBreak':
      return 'LONG BREAK !!';
    default:
      return 'TIMER';
  }
};

export const TimerModeLabel: React.FC<TimerModeLabelProps> = ({ mode }) => {
  return (
    <LabelContainer>
      <ModeChip label={getModeLabel(mode)} timermode={mode} />
      <ModeTitle variant="h4">
        {getModeTitle(mode)}
      </ModeTitle>
    </LabelContainer>
  );
};
