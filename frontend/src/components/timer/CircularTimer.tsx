import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';
import { formatTime } from '../../utils/formatTime';
import { calculateProgress } from '../../utils/calculateProgress';
import { TimerControls } from './TimerControls';

export const CircularTimer = () => {
  const { timeLeft, totalTime, mode, isRunning } = useAppSelector(
    (state) => state.timer
  );

  const progress = calculateProgress(timeLeft, totalTime);
  
  // Tailles responsives basées sur la largeur de l'écran
  // xs: mobile (<600px), sm: tablet (600-900px), md+: desktop (>900px)
  const getResponsiveSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 600) return { radius: 120, strokeWidth: 15 }; // Mobile
      if (width < 900) return { radius: 150, strokeWidth: 18 }; // Tablet
      return { radius: 180, strokeWidth: 20 }; // Desktop
    }
    return { radius: 180, strokeWidth: 20 };
  };

  const { radius, strokeWidth } = getResponsiveSize();
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const modeLabel = mode === 'focus' ? 'WORK TIME !!' : 'BREAK TIME !!';

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* SVG Circle */}
      <Box sx={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        <svg height={radius * 2} width={radius * 2}>
          {/* Cercle de fond */}
          <circle
            stroke="#e0e0e0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Cercle de progression */}
          <motion.circle
            stroke="#667EEA"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>

        {/* Temps au centre */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '48px', sm: '60px', md: '72px' }, // Responsive font size
              fontWeight: 'bold',
              color: '#000',
              lineHeight: 1,
              mb: 1,
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
              fontWeight: 'bold',
              color: '#000',
              letterSpacing: '2px',
            }}
          >
            {modeLabel}
          </Typography>
        </Box>

        {/* Contrôles du timer (START ou PAUSE/STOP) */}
        {!isRunning ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: -20, sm: -25, md: -30 }, // Responsive positioning
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <TimerControls variant="start" />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: -35, sm: -42, md: -50 }, // Responsive positioning
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <TimerControls variant="controls" />
          </Box>
        )}
      </Box>
    </Box>
  );
};
