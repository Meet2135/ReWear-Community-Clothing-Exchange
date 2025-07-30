import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  InputAdornment,
  Slider,
  Paper,
  Stack,
  Avatar,
  Rating,
  Skeleton,
  Alert,
  Fab
} from '@mui/material';
import {
  Search,
  FilterList,
  Favorite,
  FavoriteBorder,
  Visibility,
  SwapHoriz,
  TrendingUp,
  Clear,
  Add
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/slices/authSlice';

const Browse = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const categories = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'bags', label: 'Bags' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const conditions = ['new', 'like-new', 'excellent', 'good', 'fair'];

  // Fetch items from backend API
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/items');
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      
      const data = await response.json();
      setItems(data.data || []);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = !category || item.category === category;
    const matchesSize = !size || item.size === size;
    const matchesCondition = !condition || item.condition === condition;
    const matchesPrice = item.pointsValue >= priceRange[0] && item.pointsValue <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesSize && matchesCondition && matchesPrice;
  });

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleAddItem = () => {
    if (isAuthenticated) {
      navigate('/add-item');
    } else {
      navigate('/login');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setSize('');
    setCondition('');
    setPriceRange([0, 1000]);
  };

  const getConditionLabel = (condition) => {
    switch (condition) {
      case 'new': return 'New';
      case 'like-new': return 'Like New';
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      case 'poor': return 'Poor';
      default: return condition;
    }
  };

  const getCategoryLabel = (category) => {
    const found = categories.find(cat => cat.value === category);
    return found ? found.label : category;
  };

  return (
    <>
      <Helmet>
        <title>Browse Items - ReWear</title>
      </Helmet>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#2E7D32', fontWeight: 600 }}>
            Browse Sustainable Fashion
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Discover amazing clothing items from our community members and find your perfect sustainable swap.
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search items, brands, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#4CAF50' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
                >
                  Filters
                </Button>
                {(searchTerm || category || size || condition || priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <Button
                    variant="text"
                    startIcon={<Clear />}
                    onClick={clearFilters}
                    sx={{ color: '#666' }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddItem}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#2E7D32' }
                  }}
                >
                  Add Item
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          {showFilters && (
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      label="Size"
                    >
                      <MenuItem value="">All Sizes</MenuItem>
                      {sizes.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Condition</InputLabel>
                    <Select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      label="Condition"
                    >
                      <MenuItem value="">All Conditions</MenuItem>
                      {conditions.map((c) => (
                        <MenuItem key={c} value={c}>
                          {getConditionLabel(c)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Points Range: {priceRange[0]} - {priceRange[1]}
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      sx={{ color: '#4CAF50' }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        {/* Results Count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            {filteredItems.length} items found
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={fetchItems}
              disabled={loading}
              sx={{ borderColor: '#4CAF50', color: '#4CAF50' }}
            >
              Refresh
            </Button>
                          {filteredItems.length > 0 && (
                <Chip
                  label="🌱 Sustainable Fashion"
                  color="primary"
                  variant="outlined"
                />
              )}
          </Box>
        </Box>

        {/* Items Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button 
              onClick={fetchItems} 
              sx={{ ml: 2 }}
              size="small"
            >
              Retry
            </Button>
          </Alert>
        ) : filteredItems.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#666' }}>
              {items.length === 0 ? 'No items available yet' : 'No items found'}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {items.length === 0 
                ? 'Be the first to add a sustainable fashion item to our community! Share your pre-loved clothing and help reduce fashion waste.'
                : 'Try adjusting your search criteria or browse all items.'
              }
            </Typography>
            {items.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                  Join our sustainable fashion community by uploading your first item. 
                  Every piece you share helps reduce waste and gives clothing a second life.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddItem}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#2E7D32' }
                  }}
                >
                  Add First Item
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#2E7D32' }
                }}
              >
                Clear Filters
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => handleItemClick(item._id)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'}
                      alt={item.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    {item.isFeatured && (
                      <Chip
                        label="Featured"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          backgroundColor: '#FFD700',
                          color: '#2E7D32',
                          fontWeight: 600
                        }}
                      />
                    )}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 1)'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle like
                      }}
                    >
                      <FavoriteBorder />
                    </IconButton>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {item.description.substring(0, 80)}...
                    </Typography>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip label={item.size} size="small" variant="outlined" />
                      <Chip label={getConditionLabel(item.condition)} size="small" variant="outlined" />
                    </Stack>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, color: '#4CAF50' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        {item.pointsValue} pts
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                        {item.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {item.user?.name || 'Anonymous'}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Visibility sx={{ fontSize: 16, color: '#666' }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.views || 0}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      startIcon={<SwapHoriz />}
                      sx={{ color: '#4CAF50' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle swap request
                      }}
                    >
                      Swap
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add item"
        onClick={handleAddItem}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#4CAF50',
          '&:hover': { backgroundColor: '#2E7D32' }
        }}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Browse; 