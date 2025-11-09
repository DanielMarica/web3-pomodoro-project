import React, { useState } from 'react';
import { Box, TextField, IconButton, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../features/tasks/tasksSlice';

const AddTaskContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px rgba(255, 255, 255, 0.05)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
  border: `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
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

const TimeSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#f9f9f9',
    },
  },
}));

export const AddTaskButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  const [estimatedBreakPomodoros, setEstimatedBreakPomodoros] = useState(1);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask({
        title: taskTitle.trim(),
        completed: false,
        pomodorosCount: 0,
        estimatedPomodoros,
        estimatedBreakPomodoros,
      }));
      setTaskTitle('');
      setEstimatedPomodoros(1);
      setEstimatedBreakPomodoros(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <AddTaskContainer>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
        ➕ Nouvelle Tâche
      </Typography>
      
      <StyledTextField
        size="small"
        placeholder="Nom de la tâche..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
        fullWidth
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          <TimeSelector size="small" fullWidth>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Temps de travail
            </Typography>
            <Select
              value={estimatedPomodoros}
              onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
              size="small"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Pomodoro{num > 1 ? 's' : ''} ({num * 25} min)
                </MenuItem>
              ))}
            </Select>
          </TimeSelector>

          <TimeSelector size="small" fullWidth>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Temps de pause
            </Typography>
            <Select
              value={estimatedBreakPomodoros}
              onChange={(e) => setEstimatedBreakPomodoros(Number(e.target.value))}
              size="small"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num} Pause{num > 1 ? 's' : ''} ({num * 5} min)
                </MenuItem>
              ))}
            </Select>
          </TimeSelector>

          <AddButton
            onClick={handleAddTask}
            disabled={!taskTitle.trim()}
            size="large"
            sx={{ minWidth: 56, height: 56 }}
          >
            <Add sx={{ fontSize: 28 }} />
          </AddButton>
        </Box>
      </Box>
    </AddTaskContainer>
  );
};
