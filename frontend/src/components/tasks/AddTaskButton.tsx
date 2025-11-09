import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../features/tasks/tasksSlice';

const AddTaskContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

const AddButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[300],
  },
  transition: 'all 0.2s ease',
}));

export const AddTaskButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask({
        title: taskTitle.trim(),
        completed: false,
        pomodorosCount: 0,
      }));
      setTaskTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <AddTaskContainer>
      <StyledTextField
        size="small"
        placeholder="+ Ajouter une tâche..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
      />
      <AddButton
        onClick={handleAddTask}
        disabled={!taskTitle.trim()}
        size="medium"
      >
        <Add />
      </AddButton>
    </AddTaskContainer>
  );
};
