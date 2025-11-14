import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCryptoData } from '../features/cryptoThunk/cryptoSlice';

// Interface pour typer les données crypto
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export const CryptoTrackerPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { coins, loading, error, lastUpdated } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    // Charger les données au montage
    dispatch(fetchCryptoData());

    // Rafraîchir toutes les 60 secondes
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatPrice(value);
  };

  if (loading && coins.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#667EEA', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            🚀 Chargement des cryptos...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 2,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          <Typography variant="h6">❌ Erreur</Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Bouton retour */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
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

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4, mt: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          💰 Crypto Tracker
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Suivez vos cryptos pendant vos sessions Pomodoro
        </Typography>
        {lastUpdated && (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Dernière mise à jour: {new Date(lastUpdated).toLocaleTimeString('fr-FR')}
          </Typography>
        )}
      </Box>

      {/* Grille de cryptos */}
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
          maxWidth: 1400,
          mx: 'auto',
        }}
      >
        {coins.map((coin: CryptoData) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          
          return (
            <Box key={coin.id}>
              <Card
                sx={{
                  height: '100%',
                  border: (theme) => `3px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  borderRadius: '16px',
                  boxShadow: (theme) => `4px 4px 0px ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `6px 6px 0px ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* En-tête avec logo et nom */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      component="img"
                      src={coin.image}
                      alt={coin.name}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                      }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {coin.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {coin.symbol}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Prix et variation */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {formatPrice(coin.current_price)}
                    </Typography>
                    <Chip
                      icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={`${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        bgcolor: isPositive ? '#d1fae5' : '#fee2e2',
                        color: isPositive ? '#10b981' : '#ef4444',
                        border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#555' : '#000'}`,
                      }}
                    />
                  </Box>

                  {/* Détails */}
                  <Box sx={{ borderTop: '2px solid', borderColor: 'divider', pt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Market Cap
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {formatMarketCap(coin.market_cap)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Volume 24h
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {formatMarketCap(coin.total_volume)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};