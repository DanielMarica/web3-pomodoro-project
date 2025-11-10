import React from 'react';
import { Box, Checkbox, IconButton, Typography, Chip } from '@mui/material';
import { Delete, RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import type { Task } from '../../types/task.types';

interface TaskItemProps {
  task: Task;
  isActive: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const TaskContainer = styled(Box)<{ isactive: string; iscompleted: string }>(({ theme, isactive, iscompleted }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${isactive === 'true' ? theme.palette.primary.main : (theme.palette.mode === 'dark' ? '#555' : 'transparent')}`,
  opacity: iscompleted === 'true' ? 0.6 : 1,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(255, 255, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const TaskContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const TaskTitle = styled(Typography)<{ iscompleted: string }>(({ iscompleted }) => ({
  textDecoration: iscompleted === 'true' ? 'line-through' : 'none',
  fontWeight: 500,
  fontSize: '16px',
}));

const PomodoroChip = styled(Chip)({
  height: '24px',
  fontSize: '12px',
  fontWeight: 600,
});

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  isActive, 
  onToggle, 
  onDelete,
  onSelect 
}) => {
  return (
    <TaskContainer 
      isactive={isActive.toString()} 
      iscompleted={task.completed.toString()}
      onClick={onSelect}
    >
      <Checkbox
        checked={task.completed}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        sx={{ padding: 0 }}
      />
      
      <TaskContent>
        <TaskTitle iscompleted={task.completed.toString()}>
          {task.title}
        </TaskTitle>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {/* Pomodoros réalisés */}
          {task.pomodorosCount !== undefined && task.pomodorosCount > 0 && (
            <PomodoroChip
              label={`${task.pomodorosCount}`}
              size="small"
              color="success"
              variant="filled"
            />
          )}
          
          {/* Temps estimé */}
          {task.estimatedPomodoros !== undefined && task.estimatedPomodoros > 0 && (
            <PomodoroChip
              label={`${task.estimatedPomodoros} pomodoro${task.estimatedPomodoros > 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          
          {/* Pauses estimées */}
          {task.estimatedBreakPomodoros !== undefined && task.estimatedBreakPomodoros > 0 && (
            <PomodoroChip
              label={`${task.estimatedBreakPomodoros} pause${task.estimatedBreakPomodoros > 1 ? 's' : ''}`}
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
        </Box>
      </TaskContent>
      
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        sx={{ color: 'error.main' }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </TaskContainer>
  );
};
