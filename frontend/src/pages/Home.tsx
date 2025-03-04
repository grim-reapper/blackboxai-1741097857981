import React from 'react';
import { Box } from '@mui/material';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import PricingSection from '../components/sections/PricingSection';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import {
  Container,
  Grid,
  Button,
  Typography,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { fadeInLeft, fadeInRight } from '../animations/variants';

const Home: React.FC = () => {
  const theme = useTheme();
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        id="hero"
        sx={{
          background: `linear-gradient(135deg, \${alpha(theme.palette.primary.main, 0.1)} 0%, \${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInLeft}
              >
                <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    component="h1"
                    variant="h2"
                    color="text.primary"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      background: `linear-gradient(135deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <TypeAnimation
                      sequence={[
                        'Transform Your Content',
                        2000,
                        'Engage Your Audience',
                        2000,
                        'Boost Your SEO',
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4 }}
                  >
                    Article Humanizer helps you create engaging, human-like content that resonates with your audience.
                    Powered by advanced AI, we make your content more authentic and relatable.
                  </Typography>
                  <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      size="large"
                      sx={{
                        minWidth: 150,
                        background: `linear-gradient(135deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, \${theme.palette.primary.dark} 0%, \${theme.palette.secondary.dark} 100%)`,
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
                      sx={{ minWidth: 150 }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInRight}
              >
                <Box
                  component="img"
                  src="/hero-image.svg"
                  alt="AI Writing"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    display: 'block',
                    mx: 'auto',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* About Section */}
      <Box 
        id="about" 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, \${alpha(theme.palette.primary.main, 0.05)} 0%, \${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInLeft}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  About Article Humanizer
                </Typography>
                <Typography variant="h6" paragraph color="text.secondary">
                  We're on a mission to revolutionize content creation through artificial intelligence.
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Our team of experts combines advanced AI technology with deep understanding of content
                  creation to help businesses and individuals produce high-quality, engaging content
                  that resonates with their audience.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: `linear-gradient(135deg, \${theme.palette.primary.main} 0%, \${theme.palette.secondary.main} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, \${theme.palette.primary.dark} 0%, \${theme.palette.secondary.dark} 100%)`,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                  <Button variant="outlined" size="large">
                    Contact Us
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                variants={fadeInRight}
              >
                <Box
                  component="img"
                  src="/about-image.svg"
                  alt="About Us"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    display: 'block',
                    mx: 'auto',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
