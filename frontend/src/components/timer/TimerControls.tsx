import { Box, Button, IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/hooks';
import { startTimer, pauseTimer, resetTimer } from '../../features/timer/timerSlice';

interface TimerControlsProps {
  variant: 'start' | 'controls';
}

export const TimerControls = ({ variant }: TimerControlsProps) => {
  const dispatch = useAppDispatch();

  if (variant === 'start') {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Button
          onClick={() => dispatch(startTimer())}
          sx={{
            bgcolor: '#76D672',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '20px',
            textTransform: 'none',
            px: 5,
            py: 1.5,
            borderRadius: '50px',
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            '&:hover': {
              bgcolor: '#6BC668',
              transform: 'translateY(-2px)',
              boxShadow: '6px 6px 0px #000',
            },
            transition: 'all 0.2s',
          }}
        >
          START
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          bgcolor: '#fff',
          border: '3px solid #000',
          borderRadius: '50px',
          p: 0.5,
          boxShadow: '4px 4px 0px #000',
        }}
      >
        {/* Pause Button */}
        <IconButton
          onClick={() => dispatch(pauseTimer())}
          sx={{
            bgcolor: '#667EEA',
            color: '#fff',
            width: 50,
            height: 50,
            '&:hover': {
              bgcolor: '#5568D3',
            },
          }}
        >
          <PauseIcon />
        </IconButton>

        {/* Stop Button */}
        <IconButton
          onClick={() => dispatch(resetTimer())}
          sx={{
            bgcolor: '#667EEA',
            color: '#fff',
            width: 50,
            height: 50,
            '&:hover': {
              bgcolor: '#5568D3',
            },
          }}
        >
          <StopIcon />
        </IconButton>
      </Box>
    </motion.div>
  );
};
