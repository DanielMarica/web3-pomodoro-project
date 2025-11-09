import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../store/hooks';
import { formatTime } from '../utils/formatTime';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const SessionItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getModeColor = (mode: string) => {
  switch (mode) {
    case 'focus':
      return 'primary';
    case 'shortBreak':
      return 'success';
    case 'longBreak':
      return 'warning';
    default:
      return 'default';
  }
};

const getModeLabel = (mode: string) => {
  switch (mode) {
    case 'focus':
      return '🍅 Focus';
    case 'shortBreak':
      return '☕ Pause courte';
    case 'longBreak':
      return '🌴 Pause longue';
    default:
      return mode;
  }
};

export const HistoryPage: React.FC = () => {
  const { sessions } = useAppSelector((state) => state.sessions);

  return (
    <PageContainer>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        📊 Historique des sessions
      </Typography>
      
      <StyledPaper>
        {sessions.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              Aucune session enregistrée pour le moment
            </Typography>
          </Box>
        ) : (
          <List>
            {sessions.map((session) => (
              <SessionItem key={session.id}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={getModeLabel(session.type)}
                        color={getModeColor(session.type)}
                        size="small"
                      />
                      <Typography variant="body1">
                        {formatTime(session.duration)}
                      </Typography>
                    </Box>
                  }
                  secondary={new Date(session.completedAt).toLocaleString('fr-FR')}
                />
              </SessionItem>
            ))}
          </List>
        )}
      </StyledPaper>
    </PageContainer>
  );
};
