import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../store/hooks';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StatValue = styled(Typography)({
  fontSize: '48px',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

export const StatsPage: React.FC = () => {
  const { sessions } = useAppSelector((state) => state.sessions);
  const { completedPomodoros } = useAppSelector((state) => state.timer);
  const { tasks } = useAppSelector((state) => state.tasks);

  const totalSessions = sessions.length;
  const totalFocusTime = sessions
    .filter((s) => s.type === 'focus')
    .reduce((acc, s) => acc + s.duration, 0);
  const completedTasks = tasks.filter((t) => t.completed).length;

  const formatMinutes = (seconds: number) => {
    return Math.floor(seconds / 60);
  };

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
        📈 Statistiques
      </Typography>

      <StatsGrid>
        <StatCard>
          <StatValue>{completedPomodoros}</StatValue>
          <StatLabel>🍅 Pomodoros terminés</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{totalSessions}</StatValue>
          <StatLabel>📊 Sessions totales</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{formatMinutes(totalFocusTime)}</StatValue>
          <StatLabel>⏱️ Minutes de focus</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{completedTasks}</StatValue>
          <StatLabel>✅ Tâches complétées</StatLabel>
        </StatCard>
      </StatsGrid>
    </PageContainer>
  );
};
