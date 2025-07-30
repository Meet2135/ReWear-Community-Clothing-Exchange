import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Link, 
  IconButton, 
  Divider,
  Stack
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Browse Items", path: "/browse" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Points System", path: "/points" },
        { name: "Safety Guidelines", path: "/safety" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Success Stories", path: "/stories" },
        { name: "Community Guidelines", path: "/guidelines" },
        { name: "Contact Support", path: "/contact" }
      ]
    },
    {
      title: "Sustainability",
      links: [
        { name: "Environmental Impact", path: "/impact" },
        { name: "Circular Fashion", path: "/circular-fashion" },
        { name: "Waste Reduction", path: "/waste-reduction" },
        { name: "Green Initiatives", path: "/initiatives" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Data Protection", path: "/data-protection" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <LinkedIn />, url: "https://linkedin.com", label: "LinkedIn" }
  
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: '2px solid #10b981',
        boxShadow: '0 -4px 24px rgba(16, 185, 129, 0.08)'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFD700' }}>
                  🌱 ReWear
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                Join the sustainable fashion revolution. Swap clothes, earn points, and help reduce 
                textile waste while building a community of conscious consumers.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    📧 jishanpochi30@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    📞 +91 8980243431
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    📍 Sustainable Fashion Hub, Green City
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Typography variant="h6" sx={{ mb: 3, color: '#FFD700', fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#FFD700',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', mb: 4 }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2
        }}>
          {/* Copyright */}
          <Typography variant="body2" sx={{ opacity: 0.8, textAlign: { xs: 'center', md: 'left' } }}>
            © {currentYear} ReWear. All rights reserved. 
            Built with ❤️ for sustainable fashion.
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#2E7D32',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Environmental Impact */}
        <Box sx={{ 
          mt: 4, 
          p: 3, 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" sx={{ color: '#FFD700', mb: 2, fontWeight: 600 }}>
            🌱 Our Environmental Impact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            Together, we've saved over 89kg of textile waste and helped create a more sustainable fashion industry.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Every swap counts towards a greener future! 🌍
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 