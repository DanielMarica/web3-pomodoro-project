import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
}

const StyledButton = styled(MuiButton)<{ customVariant?: string }>(({ theme, customVariant }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '10px 24px',
  fontSize: '16px',
  transition: 'all 0.3s ease',
  
  ...(customVariant === 'primary' && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
    },
  }),
  
  ...(customVariant === 'secondary' && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      transform: 'translateY(-2px)',
    },
  }),
}));

export const Button: React.FC<CustomButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const muiVariant = variant === 'outlined' || variant === 'text' ? variant : 'contained';
  
  return (
    <StyledButton 
      variant={muiVariant} 
      customVariant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
