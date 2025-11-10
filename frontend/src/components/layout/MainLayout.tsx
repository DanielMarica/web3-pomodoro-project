import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      
      <MainContent maxWidth="lg">
        {children}
      </MainContent>
    </LayoutContainer>
  );
};
