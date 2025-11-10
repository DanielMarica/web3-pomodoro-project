import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { CircularTimer } from '../components/timer/CircularTimer';
import { BottomButtons } from '../components/timer/BottomButtons';
import { TaskSidebar } from '../components/tasks/TaskSidebar';
import { useAppSelector } from '../store/hooks';

export const HomePage = () => {
  const [showTasks, setShowTasks] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        bgcolor: 'background.default',
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
        {/* Message de bienvenue - Juste au-dessus du timer */}
        {isAuthenticated && user?.username && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              marginBottom: '3rem', 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary', // Noir en mode clair, blanc en mode sombre
                textAlign: 'center',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Bienvenue Pomodoeur {user.username} 
            </Typography>
          </motion.div>
        )}

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
