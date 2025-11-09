import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { CircularTimer } from '../components/timer/CircularTimer';
import { BottomButtons } from '../components/timer/BottomButtons';
import { TaskSidebar } from '../components/tasks/TaskSidebar';

export const HomePage = () => {
  const [showTasks, setShowTasks] = useState(false);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        bgcolor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header avec les dropdowns */}
      <Header />

      {/* Contenu principal - Prend toute la largeur */}
      <Box
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 6 }, // Padding responsive
          py: 4,
        }}
      >
        {/* Timer circulaire */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <CircularTimer />
        </motion.div>

        {/* Boutons du bas */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '4rem' }}
        >
          <BottomButtons onTasksClick={() => setShowTasks(true)} />
        </motion.div>
      </Box>

      {/* Sidebar des tâches */}
      <AnimatePresence>
        {showTasks && (
          <TaskSidebar
            open={showTasks}
            onClose={() => setShowTasks(false)}
          />
        )}
      </AnimatePresence>
    </Box>
  );
};
