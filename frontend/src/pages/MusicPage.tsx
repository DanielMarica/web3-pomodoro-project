import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedMusic } from '../features/settings/settingsSlice';

// Liste de musiques disponibles (basée sur les fichiers réels)
const musicList = [
  { 
    id: 'groovy-vibe', 
    name: 'Groovy Vibe', 
    genre: 'Lo-Fi', 
    duration: '7:07',
    file: '/sounds/groovy-vibe-427121.mp3'
  },
  { 
    id: 'embrace', 
    name: 'Embrace', 
    genre: 'Ambient', 
    duration: '6:04',
    file: '/sounds/embrace-364091.mp3'
  },
  { 
    id: 'gorila', 
    name: 'Gorila', 
    genre: 'Hip-Hop', 
    duration: '5:15',
    file: '/sounds/gorila-315977.mp3'
  },
  { 
    id: 'kugelsicher', 
    name: 'Kugelsicher', 
    genre: 'Electronic', 
    duration: '5:02',
    file: '/sounds/kugelsicher-by-tremoxbeatz-302838.mp3'
  },
  { 
    id: 'the-last-point', 
    name: 'The Last Point', 
    genre: 'Electronic', 
    duration: '6:34',
    file: '/sounds/the-last-point-beat-electronic-digital-394291.mp3'
  },
];

export const MusicPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedMusic = useAppSelector((state) => state.settings.selectedMusic);

  const handleSelectMusic = (musicId: string) => {
    dispatch(setSelectedMusic(musicId));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Header avec bouton retour */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            bgcolor: '#667EEA',
            color: '#fff',
            border: (theme) => `3px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
            boxShadow: (theme) => theme.palette.mode === 'dark' ? '4px 4px 0px #555' : '4px 4px 0px #000',
            '&:hover': {
              bgcolor: '#5568D3',
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.palette.mode === 'dark' ? '6px 6px 0px #555' : '6px 6px 0px #000',
            },
            transition: 'all 0.2s',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '28px', sm: '36px', md: '42px' },
          }}
        >
        Choose Your Music
        </Typography>
      </Box>

      {/* Grille de musiques */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {musicList.map((music, index) => {
          const isSelected = selectedMusic === music.id;

          return (
            <motion.div
              key={music.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => handleSelectMusic(music.id)}
                sx={{
                  cursor: 'pointer',
                  border: (theme) => isSelected 
                    ? '4px solid #667EEA' 
                    : `3px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  borderRadius: '16px',
                  boxShadow: (theme) => isSelected
                    ? '6px 6px 0px #667EEA'
                    : `4px 4px 0px ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  bgcolor: (theme) => isSelected 
                    ? (theme.palette.mode === 'dark' ? '#1e3a8a' : '#EEF2FF')
                    : 'background.paper',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => isSelected
                      ? '8px 8px 0px #667EEA'
                      : `6px 6px 0px ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Icône de sélection */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        bgcolor: '#10B981',
                        borderRadius: '50%',
                        border: (theme) => `3px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                        p: 0.5,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: '#fff',
                          fontSize: '32px',
                        }}
                      />
                    </Box>
                  )}

                  {/* Icône musique */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#667EEA',
                        borderRadius: '50%',
                        p: 2,
                        border: (theme) => `3px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                      }}
                    >
                      <MusicNoteIcon
                        sx={{
                          fontSize: '48px',
                          color: '#fff',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Nom de la musique */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mb: 1,
                      fontSize: '18px',
                    }}
                  >
                    {music.name}
                  </Typography>

                  {/* Genre */}
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: '#667EEA',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      mb: 0.5,
                    }}
                  >
                    {music.genre}
                  </Typography>

                  {/* Durée */}
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'text.secondary',
                      fontSize: '12px',
                    }}
                  >
                    {music.duration}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>

      {/* Footer info */}
      <Box
        sx={{
          mt: 6,
          textAlign: 'center',
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '14px',
            fontStyle: 'italic',
          }}
        >
          💡 Tip: Select a music to play during your Pomodoro sessions. The
          music will loop continuously while the timer is running.
        </Typography>
      </Box>
    </Box>
  );
};
