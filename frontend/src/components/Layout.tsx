import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollProgress from './ScrollProgress';
import { Box, Container, Typography } from '@mui/material';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollProgress />
      <Navbar />
      <Box component="main" sx={{ pt: '64px', flex: 1 }}>
        <Outlet />
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ textAlign: 'left' }}
          >
            © {new Date().getFullYear()} Article Humanizer. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
