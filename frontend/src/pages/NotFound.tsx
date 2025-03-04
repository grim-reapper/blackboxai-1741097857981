import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)', // Account for header and footer
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          sx={{
            fontSize: '8rem',
            fontWeight: 700,
            color: 'primary.main',
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Page not found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Sorry, we couldn't find the page you're looking for. 
          Perhaps you've mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          sx={{ minWidth: 200 }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
