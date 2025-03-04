import { Box, Button, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const words = ["engaging", "human-like", "authentic", "powerful"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  color: '#1e293b',
                  position: 'relative',
                }}
              >
                Create{' '}
                <Box
                  sx={{
                    display: 'inline-block',
                    position: 'relative',
                    minWidth: '200px',
                    height: '60px',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentWordIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {words[currentWordIndex]}
                    </motion.div>
                  </AnimatePresence>
                </Box>
                <br />
                content that resonates
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: '#475569',
                  mb: 4,
                  textAlign: { xs: 'center', md: 'left' },
                  lineHeight: 1.6,
                }}
              >
                Powered by advanced AI, we make your content more authentic and relatable.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                  boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1d4ed8, #6d28d9)',
                    boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.6)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderColor: '#6366f1',
                  color: '#6366f1',
                  '&:hover': {
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              >
                Sign In
              </Button>
            </motion.div>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ width: '100%', maxWidth: '600px' }}
            >
              <motion.img
                src="/hero-image.svg"
                alt="AI-powered content creation"
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
