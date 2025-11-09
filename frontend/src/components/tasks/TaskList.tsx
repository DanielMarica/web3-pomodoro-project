import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TaskItem } from './TaskItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTask, deleteTask, setActiveTask } from '../../features/tasks/tasksSlice';

const ListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  maxHeight: '400px',
  overflowY: 'auto',
  padding: theme.spacing(1),
  
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200],
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.grey[500],
    },
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, activeTaskId } = useAppSelector((state) => state.tasks);

  if (tasks.length === 0) {
    return (
      <EmptyState>
        <Typography variant="body1">
          Aucune tâche pour le moment
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Ajoutez une tâche pour commencer !
        </Typography>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isActive={task.id === activeTaskId}
          onToggle={() => dispatch(toggleTask(task.id))}
          onDelete={() => dispatch(deleteTask(task.id))}
          onSelect={() => dispatch(setActiveTask(task.id === activeTaskId ? null : task.id))}
        />
      ))}
    </ListContainer>
  );
};
