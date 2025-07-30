import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add,
  Visibility,
  Edit,
  Delete,
  TrendingUp,
  Inventory,
  SwapHoriz,
  Star,
  Person,
  LocationOn,
  CalendarToday
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectIsAuthenticated } from '../redux/slices/authSlice';

const Dashboard = () => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchUserItems();
  }, [isAuthenticated, navigate]);

  const fetchUserItems = async () => {
    try {
      const response = await fetch('/api/items/my-items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      
      const data = await response.json();
      setUserItems(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    
    try {
      const response = await fetch(`/api/items/${itemToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      
      setUserItems(prev => prev.filter(item => item._id !== itemToDelete));
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteDialog = (itemId) => {
    setItemToDelete(itemId);
    setDeleteDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'swapped': return 'info';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending Approval';
      case 'swapped': return 'Swapped';
      case 'expired': return 'Expired';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - ReWear</title>
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#2E7D32' }}>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Manage your sustainable fashion items and track your impact.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {user?.points || 0}
                    </Typography>
                    <Typography variant="body2">
                      Total Points
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {userItems.length}
                    </Typography>
                    <Typography variant="body2">
                      My Items
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SwapHoriz sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {userItems.filter(item => item.status === 'swapped').length}
                    </Typography>
                    <Typography variant="body2">
                      Successful Swaps
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Star sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" component="div">
                      {userItems.filter(item => item.isFeatured).length}
                    </Typography>
                    <Typography variant="body2">
                      Featured Items
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/add-item')}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#2E7D32' }
                }}
              >
                Add New Item
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/browse')}
                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
              >
                Browse Items
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/swap-requests')}
                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
              >
                View Swap Requests
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* My Items Section */}
        <Card sx={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#2E7D32' }}>
                My Items
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => navigate('/add-item')}
                sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
              >
                Add Item
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : userItems.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f1f8e9' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                  No items yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Start sharing your sustainable fashion items with the community!
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/add-item')}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#2E7D32' }
                  }}
                >
                  Add Your First Item
                </Button>
              </Paper>
            ) : (
              <List>
                {userItems.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <ListItem sx={{ 
                      backgroundColor: 'white', 
                      borderRadius: 1, 
                      mb: 1,
                      border: '1px solid #e0e0e0'
                    }}>
                      <ListItemAvatar>
                        <Avatar
                          src={item.images?.[0]?.url}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        >
                          {item.title.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" component="span">
                              {item.title}
                            </Typography>
                            <Chip
                              label={getStatusLabel(item.status)}
                              color={getStatusColor(item.status)}
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {item.description.substring(0, 100)}...
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                              <Chip
                                icon={<TrendingUp />}
                                label={`${item.pointsValue} pts`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                icon={<Visibility />}
                                label={`${item.views} views`}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                icon={<SwapHoriz />}
                                label={`${item.swapRequestsCount || 0} requests`}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        }
                      />
                      
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/items/${item._id}`)}
                            sx={{ color: '#4CAF50' }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/edit-item/${item._id}`)}
                            sx={{ color: '#FF9800' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(item._id)}
                            sx={{ color: '#f44336' }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < userItems.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this item? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteItem} 
              color="error" 
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard; 