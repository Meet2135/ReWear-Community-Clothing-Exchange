const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { uploadAvatar } = require('../middleware/upload');

// Public routes
router.get('/profile/:id', userController.getUserProfile);
router.get('/:id', userController.getUserById);
router.get('/:id/stats', userController.getUserStats);

// Protected routes
router.put('/profile', auth, uploadAvatar.single('avatar'), userController.updateProfile);
router.put('/:id', auth, userController.updateUser);
router.put('/:id/points', auth, userController.updateUserPoints);

// Admin routes
router.get('/', auth, admin, userController.getAllUsers);
router.delete('/:id', auth, admin, userController.deleteUser);

module.exports = router; 