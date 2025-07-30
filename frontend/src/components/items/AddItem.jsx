import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { CloudUpload, Delete, Add } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title cannot be more than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .max(1000, 'Description cannot be more than 1000 characters'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Type is required'),
  size: Yup.string().required('Size is required'),
  condition: Yup.string().required('Condition is required'),
  brand: Yup.string().max(50, 'Brand cannot be more than 50 characters'),
  color: Yup.string()
    .required('Color is required')
    .max(30, 'Color cannot be more than 30 characters'),
  material: Yup.string().max(100, 'Material cannot be more than 100 characters'),
  pointsValue: Yup.number()
    .required('Points value is required')
    .min(1, 'Points value must be at least 1')
    .max(1000, 'Points value cannot exceed 1000'),
  location: Yup.string().max(100, 'Location cannot be more than 100 characters'),
  tags: Yup.array().of(Yup.string().max(20, 'Tag cannot be more than 20 characters'))
});

const categories = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'bags', label: 'Bags' }
];

const types = [
  { value: 'shirts', label: 'Shirts' },
  { value: 'pants', label: 'Pants' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'skirts', label: 'Skirts' },
  { value: 'jackets', label: 'Jackets' },
  { value: 'coats', label: 'Coats' },
  { value: 'sweaters', label: 'Sweaters' },
  { value: 'hoodies', label: 'Hoodies' },
  { value: 't-shirts', label: 'T-Shirts' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'shorts', label: 'Shorts' },
  { value: 'suits', label: 'Suits' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'sports', label: 'Sports' },
  { value: 'underwear', label: 'Underwear' },
  { value: 'sleepwear', label: 'Sleepwear' },
  { value: 'swimwear', label: 'Swimwear' },
  { value: 'other', label: 'Other' }
];

const sizes = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Custom'
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

const AddItem = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    const newImages = files.map(file => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return null;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return null;
      }
      return file;
    }).filter(Boolean);

    setImages(prev => [...prev, ...newImages]);
    
    // Create preview URLs
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrls(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && tags.length < 10) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      
      // Add form fields
      Object.keys(values).forEach(key => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(tags));
        } else {
          formData.append(key, values[key]);
        }
      });

      // Add images
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to add items');
      }

      const response = await api.post('/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const data = response.data;

      setSuccess('Item created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error creating item:', err);
      if (err.response) {
        setError(err.response.data.message || err.response.data.errors?.[0]?.msg || 'Failed to create item');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message || 'Failed to create item. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Item - ReWear</title>
      </Helmet>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#2E7D32' }}>
          Add New Item
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Share your sustainable fashion items with the community.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Card sx={{ 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid #dee2e6'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Formik
              initialValues={{
                title: '',
                description: '',
                category: '',
                type: '',
                size: '',
                condition: '',
                brand: '',
                color: '',
                material: '',
                pointsValue: '',
                location: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Grid container spacing={3}>
                    {/* Image Upload Section */}
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                        Upload Images (Max 5)
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          border: '2px dashed #4CAF50',
                          backgroundColor: '#f1f8e9',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: '#2E7D32',
                            backgroundColor: '#e8f5e8'
                          }
                        }}
                        onClick={() => document.getElementById('image-upload').click()}
                      >
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        <CloudUpload sx={{ fontSize: 48, color: '#4CAF50', mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                          Click to upload images or drag and drop
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          PNG, JPG up to 5MB each
                        </Typography>
                      </Paper>

                      {/* Image Previews */}
                      {imageUrls.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {imageUrls.map((url, index) => (
                            <Box
                              key={index}
                              sx={{
                                position: 'relative',
                                width: 100,
                                height: 100,
                                border: '2px solid #4CAF50',
                                borderRadius: 1,
                                overflow: 'hidden'
                              }}
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => removeImage(index)}
                                sx={{
                                  position: 'absolute',
                                  top: 2,
                                  right: 2,
                                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 1)'
                                  }
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Grid>

                    {/* Basic Information */}
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="title"
                        label="Item Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="brand"
                        label="Brand (Optional)"
                        value={values.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    {/* Category and Type */}
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                        <InputLabel>Category</InputLabel>
                        <Field
                          as={Select}
                          name="category"
                          value={values.category}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Category"
                        >
                          {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                              {category.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched.category && errors.category && (
                          <Typography variant="caption" color="error">
                            {errors.category}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.type && Boolean(errors.type)}>
                        <InputLabel>Type</InputLabel>
                        <Field
                          as={Select}
                          name="type"
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Type"
                        >
                          {types.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched.type && errors.type && (
                          <Typography variant="caption" color="error">
                            {errors.type}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Size and Condition */}
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.size && Boolean(errors.size)}>
                        <InputLabel>Size</InputLabel>
                        <Field
                          as={Select}
                          name="size"
                          value={values.size}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Size"
                        >
                          {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              {size}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched.size && errors.size && (
                          <Typography variant="caption" color="error">
                            {errors.size}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.condition && Boolean(errors.condition)}>
                        <InputLabel>Condition</InputLabel>
                        <Field
                          as={Select}
                          name="condition"
                          value={values.condition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Condition"
                        >
                          {conditions.map((condition) => (
                            <MenuItem key={condition.value} value={condition.value}>
                              {condition.label}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched.condition && errors.condition && (
                          <Typography variant="caption" color="error">
                            {errors.condition}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Color and Material */}
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="color"
                        label="Color"
                        value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.color && Boolean(errors.color)}
                        helperText={touched.color && errors.color}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="material"
                        label="Material (Optional)"
                        value={values.material}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.material && Boolean(errors.material)}
                        helperText={touched.material && errors.material}
                      />
                    </Grid>

                    {/* Points Value and Location */}
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        name="pointsValue"
                        label="Points Value"
                        value={values.pointsValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.pointsValue && Boolean(errors.pointsValue)}
                        helperText={touched.pointsValue && errors.pointsValue}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="location"
                        label="Location (Optional)"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.location && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    </Grid>

                    {/* Tags */}
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ color: '#2E7D32' }}>
                        Tags (Optional)
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                          size="small"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          placeholder="Add a tag"
                          sx={{ flexGrow: 1 }}
                        />
                        <Button
                          variant="outlined"
                          onClick={addTag}
                          disabled={!tagInput.trim() || tags.length >= 10}
                          startIcon={<Add />}
                        >
                          Add
                        </Button>
                      </Box>
                      {tags.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              onDelete={() => removeTag(tag)}
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                          mt: 2,
                          py: 1.5,
                          backgroundColor: '#4CAF50',
                          '&:hover': {
                            backgroundColor: '#2E7D32'
                          }
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Add Item'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddItem; 