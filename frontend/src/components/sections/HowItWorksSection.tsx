import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { fadeInUp } from '../../animations/variants';

const steps = [
  {
    title: 'Input Your Content',
    description: 'Simply paste your content or start writing directly in our editor.',
  },
  {
    title: 'AI Analysis',
    description: 'Our AI analyzes your content for tone, readability, and engagement.',
  },
  {
    title: 'Get Suggestions',
    description: 'Receive instant suggestions to improve your content quality.',
  },
  {
    title: 'Optimize & Publish',
    description: 'Apply the changes and publish your enhanced content.',
  },
];

const HowItWorksSection: React.FC = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box 
      id="how-it-works" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              component="h2"
              variant="h3"
              color="text.primary"
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Get started in minutes with our simple four-step process
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={3} key={step.title}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.1),
                      fontWeight: 800,
                      fontSize: '8rem',
                      lineHeight: 1,
                      mb: 2,
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                  {index < steps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        right: -30,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <motion.div
                        animate={{
                          x: [0, 10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowForwardIcon
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 30,
                          }}
                        />
                      </motion.div>
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
