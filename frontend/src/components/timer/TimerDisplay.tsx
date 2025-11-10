import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatTime } from '../../utils/formatTime';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: '72px',
  fontWeight: 700,
  fontFamily: '"Roboto Mono", monospace',
  color: theme.palette.text.primary,
  userSelect: 'none',
}));

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  return (
    <TimeText variant="h1">
      {formatTime(timeLeft)}
    </TimeText>
  );
};
