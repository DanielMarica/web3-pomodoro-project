import React from 'react';
import { Box, Typography, Drawer, IconButton, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { TaskList } from './TaskList';
import { AddTaskButton } from './AddTaskButton';
import { useAppSelector } from '../../store/hooks';

interface TaskSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  height: '100%',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: '12px',
}));

const StatItem = styled(Box)({
  textAlign: 'center',
});

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  marginTop: '4px',
}));

export const TaskSidebar: React.FC<TaskSidebarProps> = ({ open, onClose }) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const { completedPomodoros } = useAppSelector((state) => state.timer);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          backgroundColor: 'background.default',
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6" fontWeight={700}>
          📋 Mes Tâches
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DrawerHeader>

      <Divider />

      <DrawerContent>
        <StatsBox>
          <StatItem>
            <StatValue>{completedPomodoros}</StatValue>
            <StatLabel>Pomodoros</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>
              {completedTasks}/{totalTasks}
            </StatValue>
            <StatLabel>Tâches</StatLabel>
          </StatItem>
        </StatsBox>

        <AddTaskButton />

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Liste des tâches
          </Typography>
          <TaskList />
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
