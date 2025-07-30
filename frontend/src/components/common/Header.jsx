import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Container
} from '@mui/material';
import {
  Person,
  Dashboard,
  Add,
  Logout,
  Notifications
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, logout } from '../../redux/slices/authSlice';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/');
      setAnchorEl(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getActiveButtonStyle = (path) => ({
    background: isActiveRoute(path) ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    borderBottom: isActiveRoute(path) ? '3px solid #FFD700' : 'none',
    backdropFilter: isActiveRoute(path) ? 'blur(10px)' : 'none',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
    }
  });

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #f59e0b 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        zIndex: 1200
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
          {/* Logo */}
          <Typography 
            variant="h4" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              mr: { md: 4 },
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                textShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }
            }}
          >
            🌱 ReWear
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 1, 
            flexGrow: 1,
            justifyContent: 'center'
          }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/browse"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.025em',
                ...getActiveButtonStyle('/browse')
              }}
            >
              Browse
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/about"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.025em',
                ...getActiveButtonStyle('/about')
              }}
            >
              About
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.025em',
                ...getActiveButtonStyle('/contact')
              }}
            >
              Contact
            </Button>
            
            {isAuthenticated && (
              <>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/dashboard"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    ...getActiveButtonStyle('/dashboard')
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/profile"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    ...getActiveButtonStyle('/profile')
                  }}
                >
                  Profile
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/add-item"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    ...getActiveButtonStyle('/add-item')
                  }}
                >
                  Add Item
                </Button>
              </>
            )}
          </Box>
          
          {/* Right Side - User Info & Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                {/* Points Display */}
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontWeight: 700,
                    display: { xs: 'none', sm: 'flex' },
                    px: 3,
                    py: 1,
                    borderRadius: 3,
                    fontSize: '0.875rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  🌱 {user?.points || 0} pts
                </Box>
                
                {/* Notifications */}
                <IconButton
                  color="inherit"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                
                {/* User Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    onClick={handleProfileMenuOpen}
                    sx={{
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      color: '#1e293b',
                      fontWeight: 700,
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        border: '2px solid #FFD700',
                        transform: 'scale(1.1)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                      }
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        mt: 2,
                        minWidth: 220,
                        borderRadius: 3,
                        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                      }
                    }}
                  >
                    <MenuItem 
                      onClick={() => { navigate('/dashboard'); handleMenuClose(); }}
                      sx={{ 
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Dashboard sx={{ mr: 2, color: '#10b981' }} />
                      <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Dashboard
                      </Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={() => { navigate('/add-item'); handleMenuClose(); }}
                      sx={{ 
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Add sx={{ mr: 2, color: '#f59e0b' }} />
                      <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Add Item
                      </Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={() => { navigate('/profile'); handleMenuClose(); }}
                      sx={{ 
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Person sx={{ mr: 2, color: '#3b82f6' }} />
                      <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>
                        Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{ 
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(244, 63, 94, 0.05) 100%)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Logout sx={{ mr: 2, color: '#f43f5e' }} />
                      <Typography sx={{ fontWeight: 600, color: '#f43f5e' }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  component={RouterLink} 
                  to="/login"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '2px',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: '#FFD700',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/register"
                  sx={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1e293b',
                    fontWeight: 700,
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(255, 215, 0, 0.4)',
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 