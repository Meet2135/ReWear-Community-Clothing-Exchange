import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#f43f5e',
      light: '#fb7185',
      dark: '#e11d48',
    },
    info: {
      main: '#14b8a6',
      light: '#5eead4',
      dark: '#0f766e',
    },
    background: {
      default: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px rgba(0, 0, 0, 0.05)',
    '0px 6px 8px rgba(0, 0, 0, 0.05)',
    '0px 8px 12px rgba(0, 0, 0, 0.05)',
    '0px 12px 16px rgba(0, 0, 0, 0.05)',
    '0px 16px 20px rgba(0, 0, 0, 0.05)',
    '0px 20px 24px rgba(0, 0, 0, 0.05)',
    '0px 24px 28px rgba(0, 0, 0, 0.05)',
    '0px 28px 32px rgba(0, 0, 0, 0.05)',
    '0px 32px 36px rgba(0, 0, 0, 0.05)',
    '0px 36px 40px rgba(0, 0, 0, 0.05)',
    '0px 40px 44px rgba(0, 0, 0, 0.05)',
    '0px 44px 48px rgba(0, 0, 0, 0.05)',
    '0px 48px 52px rgba(0, 0, 0, 0.05)',
    '0px 52px 56px rgba(0, 0, 0, 0.05)',
    '0px 56px 60px rgba(0, 0, 0, 0.05)',
    '0px 60px 64px rgba(0, 0, 0, 0.05)',
    '0px 64px 68px rgba(0, 0, 0, 0.05)',
    '0px 68px 72px rgba(0, 0, 0, 0.05)',
    '0px 72px 76px rgba(0, 0, 0, 0.05)',
    '0px 76px 80px rgba(0, 0, 0, 0.05)',
    '0px 80px 84px rgba(0, 0, 0, 0.05)',
    '0px 84px 88px rgba(0, 0, 0, 0.05)',
    '0px 88px 92px rgba(0, 0, 0, 0.05)',
    '0px 92px 96px rgba(0, 0, 0, 0.05)',
    '0px 96px 100px rgba(0, 0, 0, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #f59e0b 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #d97706 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#e2e8f0',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#10b981',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#10b981',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#e2e8f0',
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#10b981',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme; 