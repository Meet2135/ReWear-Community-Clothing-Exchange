import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Eco,
  Favorite,
  TrendingUp,
  Psychology,
  School,
  Work
} from '@mui/icons-material';

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Team members data
  const teamMembers = [
    {
      name: "Jishan",
      role: "Team Lead & Full Stack Developer",
      avatar: "👨‍💻",
      bio: "Passionate about sustainable technology and creating impactful solutions. Leading the development of ReWear platform.",
      skills: ["React", "Node.js", "MongoDB", "Leadership"],
      education: "Computer Science",
      experience: "3+ years",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Meet",
      role: "Frontend Developer",
      avatar: "👩‍💻",
      bio: "Creative developer focused on user experience and modern UI/UX design. Making sustainable fashion accessible to everyone.",
      skills: ["React", "Material-UI", "CSS", "UX Design"],
      education: "Web Development",
      experience: "2+ years",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Fenil",
      role: "Backend Developer",
      avatar: "👨‍💻",
      bio: "Backend specialist with expertise in API development and database design. Ensuring robust and scalable solutions.",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      education: "Software Engineering",
      experience: "2+ years",
      linkedin: "#",
      github: "#"
    }
  ];

  // Move values array here, after hooks
  const values = [
    {
      icon: '🌱',
      title: "Sustainability",
      description: "Committed to reducing fashion waste and promoting circular economy principles."
    },
    {
      icon: '❤️',
      title: "Community",
      description: "Building a supportive community of conscious consumers and fashion enthusiasts."
    },
    {
      icon: '🚀',
      title: "Innovation",
      description: "Leveraging technology to create innovative solutions for sustainable fashion."
    },
    {
      icon: '🔍',
      title: "Transparency",
      description: "Providing clear information about the environmental impact of fashion choices."
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
              About ReWear
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
              Revolutionizing fashion through sustainable exchange and conscious consumption
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Our Mission
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
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                fontSize: '1.2rem'
              }}
            >
              We're on a mission to transform the fashion industry by creating a sustainable platform 
              where people can exchange clothing items, reducing waste and promoting conscious consumption. 
              Our goal is to make sustainable fashion accessible, affordable, and enjoyable for everyone 
              while building a community of environmentally conscious individuals.
            </Typography>
          </Paper>
        </Box>

        {/* Values Section */}
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
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: theme.palette.text.primary
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
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
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={6} key={index}>
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
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          fontSize: '2rem',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          mr: 3
                        }}
                      >
                        {member.avatar}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 0.5
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 500
                          }}
                        >
                          {member.role}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        mb: 3
                      }}
                    >
                      {member.bio}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          mb: 1
                        }}
                      >
                        Skills & Technologies
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {member.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                              color: 'white',
                              fontWeight: 500
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {member.education}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Work sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {member.experience}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Story Section */}
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
            Our Story
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
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                fontSize: '1.1rem',
                mb: 3
              }}
            >
              ReWear was born from a simple observation: the fashion industry is one of the largest 
              contributors to environmental pollution, with millions of tons of clothing ending up 
              in landfills every year. We realized that many people have perfectly good clothing 
              items they no longer wear, while others are looking for sustainable alternatives to 
              fast fashion.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                fontSize: '1.1rem',
                mb: 3
              }}
            >
              Our team came together during a hackathon with a shared vision: to create a platform 
              that makes clothing exchange easy, fun, and accessible. We believe that by connecting 
              people who want to give their clothes a second life with those who are looking for 
              unique, sustainable fashion options, we can make a real difference in reducing fashion waste.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                fontSize: '1.1rem'
              }}
            >
              Today, ReWear is more than just a platform—it's a community of conscious consumers 
              who believe in the power of sustainable fashion. We're committed to continuously 
              improving our platform and expanding our impact, one clothing exchange at a time.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs; 