import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleMusic } from '../../features/settings/settingsSlice';

interface BottomButtonsProps {
  onTasksClick: () => void;
}

export const BottomButtons = ({ onTasksClick }: BottomButtonsProps) => {
  const dispatch = useAppDispatch();
  const { musicEnabled } = useAppSelector((state) => state.settings);

  const buttonStyle = {
    bgcolor: '#667EEA',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    textTransform: 'none' as const,
    px: 4,
    py: 1.5,
    borderRadius: '50px',
    border: '3px solid #000',
    boxShadow: '4px 4px 0px #000',
    minWidth: '180px',
    '&:hover': {
      bgcolor: '#5568D3',
      transform: 'translateY(-2px)',
      boxShadow: '6px 6px 0px #000',
    },
    transition: 'all 0.2s',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'center',
      }}
    >
      {/* My Music */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button sx={buttonStyle}>My Music</Button>
      </motion.div>

      {/* MUSIC Toggle */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => dispatch(toggleMusic())}
          sx={{
            ...buttonStyle,
            bgcolor: musicEnabled ? '#10B981' : '#EF4444',
            border: '3px solid #000',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              bgcolor: musicEnabled ? '#059669' : '#DC2626',
              transform: 'translateY(-2px)',
              boxShadow: '6px 6px 0px #000',
            },
          }}
        >
          <motion.span
            initial={false}
            animate={{
              x: musicEnabled ? 0 : -100,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            MUSIC
          </motion.span>
        </Button>
      </motion.div>

      {/* My Tasks */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button onClick={onTasksClick} sx={buttonStyle}>
          My Tasks
        </Button>
      </motion.div>
    </Box>
  );
};
