import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                We're on a mission to revolutionize content creation through artificial intelligence.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, fontSize: '1.125rem', lineHeight: 1.7 }}
              >
                Our team of experts combines advanced AI technology with deep understanding of content creation to help businesses and individuals produce high-quality, engaging content that resonates with their audience.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="/about-image.svg"
                alt="About Us"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
