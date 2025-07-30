import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Email,
  Phone,
  Support,
  ExpandMore,
  Send,
  Chat,
  Help,
  BugReport,
  Feedback
} from '@mui/icons-material';

const ContactSupport = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: result.message || 'Thank you for your message! We\'ll get back to you soon.',
          severity: 'success'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to send message. Please try again.',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSnackbar({
        open: true,
        message: 'Network error. Please check your connection and try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Email Support",
      description: "Get in touch with our support team",
      contact: "support@rewear.com",
      response: "Response within 24 hours"
    },
    {
      icon: <Chat sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 9 AM - 6 PM EST",
      response: "Instant response"
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      response: "Available during business hours"
    }
  ];

  const faqs = [
    {
      question: "How does ReWear work?",
      answer: "ReWear is a sustainable clothing exchange platform where users can list items they no longer wear and find new-to-them clothing from other users. Simply upload photos of your items, set your preferences, and start exchanging!"
    },
    {
      question: "Is ReWear free to use?",
      answer: "Yes! ReWear is completely free to use. We believe sustainable fashion should be accessible to everyone. There are no hidden fees or subscription costs."
    },
    {
      question: "How do I ensure the quality of exchanged items?",
      answer: "We encourage users to be honest about item condition and provide clear photos. Our community guidelines help maintain quality standards, and users can rate their exchange experiences."
    },
    {
      question: "What if I don't receive my exchanged item?",
      answer: "We have a support system in place to help resolve any issues with exchanges. Contact our support team immediately if you encounter any problems, and we'll work to resolve the situation."
    },
    {
      question: "Can I exchange items internationally?",
      answer: "Currently, we support exchanges within the same country to reduce shipping costs and environmental impact. We're working on expanding to international exchanges in the future."
    },
    {
      question: "How do you ensure the safety of users?",
      answer: "We implement various safety measures including user verification, secure messaging, and community guidelines. Users can also meet in public places for exchanges and report any concerns to our support team."
    }
  ];

  const supportCategories = [
    {
      icon: <Help sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
      title: "General Help",
      description: "Questions about how to use ReWear"
    },
    {
      icon: <BugReport sx={{ fontSize: 30, color: theme.palette.error.main }} />,
      title: "Technical Issues",
      description: "Report bugs or technical problems"
    },
    {
      icon: <Feedback sx={{ fontSize: 30, color: theme.palette.secondary.main }} />,
      title: "Feedback",
      description: "Share your suggestions and ideas"
    },
    {
      icon: <Support sx={{ fontSize: 30, color: theme.palette.success.main }} />,
      title: "Account Support",
      description: "Help with account-related issues"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                textAlign: 'center',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Contact Support
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9,
                fontWeight: 300
              }}
            >
              We're here to help! Get in touch with our support team
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Contact Methods */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Get in Touch
          </Typography>
          <Grid container spacing={4}>
            {contactMethods.map((method, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: 3,
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)',
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {method.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: theme.palette.text.primary
                      }}
                    >
                      {method.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        lineHeight: 1.6
                      }}
                    >
                      {method.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 1
                      }}
                    >
                      {method.contact}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontStyle: 'italic'
                      }}
                    >
                      {method.response}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form and Support Categories */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              Send us a Message
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: 4,
                border: '1px solid rgba(34, 197, 94, 0.1)'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Support Categories */}
          <Grid item xs={12} lg={4}>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              Support Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {supportCategories.map((category, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: 2,
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: '0 10px 20px rgba(34, 197, 94, 0.15)',
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {category.icon}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 0.5
                          }}
                        >
                          {category.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary
                          }}
                        >
                          {category.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: 2,
                  border: '1px solid rgba(34, 197, 94, 0.1)',
                  '&:before': {
                    display: 'none',
                  },
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: '0 5px 15px rgba(34, 197, 94, 0.1)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: theme.palette.primary.main }} />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '16px 0',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: 2,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSupport; 