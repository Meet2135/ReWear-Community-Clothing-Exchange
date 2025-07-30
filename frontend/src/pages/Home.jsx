import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  People,
  SwapHoriz,
  ArrowForward,
  Star
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const features = [
    {
      title: "Sustainable Fashion",
      description: "Reduce textile waste by giving clothes a second life",
      icon: "🌱",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      title: "Community Driven",
      description: "Connect with like-minded fashion enthusiasts",
      icon: "👥",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      title: "Points System",
      description: "Earn points for every successful swap",
      icon: "⭐",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    }
  ];

  const stats = [
    { number: "1,234", label: "Active Users", icon: "👥", color: "#3b82f6" },
    { number: "89kg", label: "Waste Saved", icon: "🌱", color: "#10b981" },
    { number: "567", label: "Successful Swaps", icon: "🔄", color: "#f59e0b" },
    { number: "4.8", label: "User Rating", icon: "⭐", color: "#f59e0b" }
  ];

  const benefits = [
    "Reduce your carbon footprint",
    "Save money on new clothes",
    "Discover unique fashion pieces",
    "Support circular fashion economy"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      content: "ReWear has completely changed how I think about fashion. I've found amazing pieces and made new friends!",
      avatar: "SJ",
      rating: 5,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      name: "Mike Chen",
      role: "Sustainability Advocate",
      content: "Finally, a platform that makes sustainable fashion accessible and fun. The points system is brilliant!",
      avatar: "MC",
      rating: 5,
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      name: "Emma Davis",
      role: "Student",
      content: "As a student on a budget, ReWear has been a game-changer. I can refresh my wardrobe sustainably!",
      avatar: "ED",
      rating: 5,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    }
  ];

  return (
    <>
      <Helmet>
        <title>ReWear - Sustainable Fashion Exchange Platform</title>
        <meta name="description" content="Join ReWear to swap clothes, earn points, and help reduce textile waste. Sustainable fashion made easy." />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #f59e0b 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  mb: 3
                }}
              >
                Sustainable Fashion
                <Box component="span" sx={{ 
                  display: 'block',
                  background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none'
                }}>
                  Made Simple
                </Box>
              </Typography>
              <Typography 
                variant="h5" 
                paragraph 
                sx={{ 
                  opacity: 0.9,
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Join thousands of fashion enthusiasts who are reducing textile waste 
                by swapping clothes and building a sustainable community.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1e293b',
                    fontWeight: 700,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 35px rgba(255, 215, 0, 0.4)',
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/browse"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '2px',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#FFD700',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  Browse Items
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ 
                  fontSize: '8rem', 
                  color: '#FFD700', 
                  opacity: 0.3,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                  animation: 'pulse 2s infinite'
                }}>
                  🌱
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 4, 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <Typography variant="h2" sx={{ 
                  color: stat.color, 
                  fontWeight: 800, 
                  mb: 1,
                  fontSize: '3rem'
                }}>
                  {stat.icon}
                </Typography>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  color: '#1e293b', 
                  mb: 1,
                  fontSize: '2.5rem'
                }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#64748b',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 10,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2310b981" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E")',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              color: '#1e293b',
              mb: 6,
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Why Choose ReWear?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  p: 5, 
                  height: '100%', 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                  }
                }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    fontSize: '2.5rem'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h4" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: '#1e293b',
                    fontFamily: '"Poppins", sans-serif',
                    mb: 2
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: '#64748b',
                    lineHeight: 1.7,
                    fontSize: '1.1rem'
                  }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            color: '#1e293b',
            mb: 6,
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '2.5rem', md: '3rem' }
          }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ 
                width: 100, 
                height: 100, 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                mx: 'auto', 
                mb: 3,
                fontSize: '2.5rem',
                fontWeight: 700,
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
              }}>
                1
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                fontFamily: '"Poppins", sans-serif',
                mb: 2
              }}>
                Upload Your Items
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '1.1rem'
              }}>
                Take photos of clothes you no longer wear and add them to your profile. 
                Set your desired points value and wait for swap requests.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ 
                width: 100, 
                height: 100, 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                mx: 'auto', 
                mb: 3,
                fontSize: '2.5rem',
                fontWeight: 700,
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
              }}>
                2
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                fontFamily: '"Poppins", sans-serif',
                mb: 2
              }}>
                Browse & Request Swaps
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '1.1rem'
              }}>
                Discover amazing pieces from other community members. 
                Send swap requests for items you love and start conversations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ 
                width: 100, 
                height: 100, 
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                mx: 'auto', 
                mb: 3,
                fontSize: '2.5rem',
                fontWeight: 700,
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}>
                3
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700, 
                color: '#1e293b',
                fontFamily: '"Poppins", sans-serif',
                mb: 2
              }}>
                Complete Swaps & Earn Points
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '1.1rem'
              }}>
                Meet up safely to exchange items. Earn points for successful swaps 
                and use them to get items from other members.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white', 
        py: 10,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              color: '#FFD700',
              mb: 6,
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Benefits of Joining ReWear
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    color: '#FFD700'
                  }}>
                    {benefit}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            color: '#1e293b',
            mb: 6,
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '2.5rem', md: '3rem' }
          }}
        >
          What Our Community Says
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                p: 4, 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    background: testimonial.gradient,
                    color: 'white',
                    fontWeight: 700,
                    mr: 2,
                    width: 60,
                    height: 60,
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      color: '#1e293b',
                      fontFamily: '"Poppins", sans-serif'
                    }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#64748b',
                      fontWeight: 500
                    }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ 
                  color: '#64748b',
                  lineHeight: 1.7,
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  mb: 3
                }}>
                  "{testimonial.content}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ 
                      color: '#FFD700', 
                      fontSize: 24,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }} />
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 10,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2310b981" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E")',
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper sx={{ 
            p: 6, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #f59e0b 100%)', 
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h2" gutterBottom sx={{ 
              fontWeight: 800, 
              color: '#FFD700',
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3
            }}>
              Ready to Start Swapping?
            </Typography>
            <Typography variant="h5" paragraph sx={{ 
              opacity: 0.9, 
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6
            }}>
              Join thousands of fashion enthusiasts who are making sustainable choices every day.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                color: '#1e293b',
                fontWeight: 700,
                px: 5,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: 3,
                textTransform: 'none',
                letterSpacing: '0.025em',
                boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(255, 215, 0, 0.4)',
                }
              }}
            >
              Join ReWear Today
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Home; 