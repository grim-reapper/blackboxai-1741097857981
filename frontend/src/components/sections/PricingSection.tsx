import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { fadeInUp } from '../../animations/variants';

const plans = [
  {
    title: 'Free',
    price: '0',
    features: [
      'Up to 5 articles per month',
      'Basic AI suggestions',
      'Standard support',
      'Limited templates',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined' as const,
  },
  {
    title: 'Pro',
    price: '29',
    features: [
      'Unlimited articles',
      'Advanced AI features',
      'Priority support',
      'All templates',
      'Custom branding',
      'Team collaboration',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'contained' as const,
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: '99',
    features: [
      'Everything in Pro',
      'Custom AI training',
      'Dedicated support',
      'API access',
      'Advanced analytics',
      'Custom integration',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outlined' as const,
  },
];

const PricingSection: React.FC = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box 
      id="pricing" 
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
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Choose the plan that best fits your needs
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} alignItems="center">
          {plans.map((plan, index) => (
            <Grid item key={plan.title} xs={12} md={4}>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  elevation={plan.highlighted ? 8 : 1}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transform: plan.highlighted ? 'scale(1.05)' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: plan.highlighted ? 'scale(1.08)' : 'scale(1.03)',
                    },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      <Typography variant="subtitle2">Most Popular</Typography>
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Typography variant="h4" component="div" gutterBottom>
                        {plan.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                        <Typography variant="h3" component="span">
                          ${plan.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          /mo
                        </Typography>
                      </Box>
                    </Box>
                    <List sx={{ mb: 2 }}>
                      {plan.features.map((feature) => (
                        <ListItem key={feature} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ p: 4, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to="/register"
                      fullWidth
                      variant={plan.buttonVariant}
                      size="large"
                      sx={plan.highlighted ? {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                        },
                      } : {}}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;
