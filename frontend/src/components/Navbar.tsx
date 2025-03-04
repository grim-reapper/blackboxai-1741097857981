import { useState, ReactElement, cloneElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import {
  AppBar,
  AppBarProps,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';

interface Props {
  window?: () => Window;
  children: ReactElement<AppBarProps>;
}

const pages = [
  { title: 'Features', id: 'features' },
  { title: 'How It Works', id: 'how-it-works' },
  { title: 'Pricing', id: 'pricing' },
  { title: 'About Us', id: 'about' },
];

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.3s ease',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
    },
  });
}

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  const scrollToSection = (id: string) => {
    handleCloseNavMenu();
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // Height of the navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navbar = (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo - Always visible */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArticleIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              Article Humanizer
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              flexGrow: 1,
              gap: 2,
              visibility: isAuthPage ? 'hidden' : 'visible',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => scrollToSection(page.id)}
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  position: 'relative',
                  '&:hover': {
                    color: 'primary.main',
                    '&::after': {
                      width: '100%',
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                component={RouterLink}
                to="/dashboard"
                onClick={handleCloseNavMenu}
                sx={{ color: 'text.primary' }}
              >
                Dashboard
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {!isAuthPage && pages.map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => scrollToSection(page.id)}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
            {isAuthenticated && (
              <MenuItem
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to="/dashboard"
              >
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Auth Buttons / User Menu */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Sign in
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

  return <ElevationScroll>{navbar}</ElevationScroll>;
}

export default Navbar;
