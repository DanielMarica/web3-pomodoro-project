import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedMusic } from '../features/settings/settingsSlice';

// Liste de 10 musiques pré-enregistrées
const musicList = [
  { id: 'lofi-1', name: 'Lofi Chill Beats', genre: 'Lo-Fi', duration: '3:45' },
  { id: 'lofi-2', name: 'Study Session', genre: 'Lo-Fi', duration: '4:12' },
  { id: 'jazz-1', name: 'Smooth Jazz Piano', genre: 'Jazz', duration: '5:20' },
  { id: 'ambient-1', name: 'Peaceful Ambient', genre: 'Ambient', duration: '6:30' },
  { id: 'classical-1', name: 'Classical Focus', genre: 'Classical', duration: '4:55' },
  { id: 'nature-1', name: 'Forest Sounds', genre: 'Nature', duration: '10:00' },
  { id: 'electronic-1', name: 'Electronic Chill', genre: 'Electronic', duration: '3:58' },
  { id: 'piano-1', name: 'Solo Piano Melodies', genre: 'Piano', duration: '5:15' },
  { id: 'rain-1', name: 'Rain & Thunder', genre: 'Nature', duration: '8:00' },
  { id: 'acoustic-1', name: 'Acoustic Guitar', genre: 'Acoustic', duration: '4:22' },
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
        bgcolor: '#f5f5f5',
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
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            '&:hover': {
              bgcolor: '#5568D3',
              transform: 'translateY(-2px)',
              boxShadow: '6px 6px 0px #000',
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
          🎵 Choose Your Music
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
                  border: isSelected ? '4px solid #667EEA' : '3px solid #000',
                  borderRadius: '16px',
                  boxShadow: isSelected
                    ? '6px 6px 0px #667EEA'
                    : '4px 4px 0px #000',
                  bgcolor: isSelected ? '#EEF2FF' : '#fff',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isSelected
                      ? '8px 8px 0px #667EEA'
                      : '6px 6px 0px #000',
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
                        border: '3px solid #000',
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
                        border: '3px solid #000',
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
                      color: '#666',
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
            color: '#666',
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
