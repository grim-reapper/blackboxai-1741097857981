import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Edit as EditIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  AutoFixHigh as AutoFixHighIcon,
} from '@mui/icons-material';
import { fadeInUp } from '../../animations/variants';

const features = [
  {
    title: 'AI-Powered Writing',
    description:
      'Advanced AI algorithms help you create human-like content that engages your audience.',
    icon: EditIcon,
  },
  {
    title: 'Instant Optimization',
    description:
      'Get real-time suggestions to improve your content\'s readability and impact.',
    icon: SpeedIcon,
  },
  {
    title: 'SEO Enhancement',
    description:
      'Optimize your content for search engines while maintaining natural flow.',
    icon: TrendingUpIcon,
  },
  {
    title: 'Multiple Tones',
    description:
      'Adapt your content\'s tone to match your brand voice and target audience.',
    icon: AutoFixHighIcon,
  },
];

const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box 
      id="features" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: theme.palette.background.paper,
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
              Everything you need to create amazing content
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Our AI-powered platform helps you create, optimize, and manage your content with ease.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      backgroundColor: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(8px)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 32,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
