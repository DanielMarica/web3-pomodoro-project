import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface MusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}));

export const MusicButton: React.FC<MusicButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <Tooltip title={isPlaying ? 'Désactiver la musique' : 'Activer la musique'}>
      <StyledIconButton onClick={onToggle} color="primary">
        {isPlaying ? <VolumeUp /> : <VolumeOff />}
      </StyledIconButton>
    </Tooltip>
  );
};
