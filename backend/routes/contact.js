const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      status: 'pending',
      submittedAt: new Date()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.submittedAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

// Update contact status (admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { 
        status, 
        adminResponse,
        respondedAt: new Date()
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

module.exports = router; 