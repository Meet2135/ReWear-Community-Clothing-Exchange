const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', itemController.getAllItems);
router.get('/featured', itemController.getFeaturedItems);
router.get('/search', itemController.searchItems);
router.get('/my-items', auth, itemController.getMyItems);
router.get('/:id', itemController.getItemById);

// Protected routes
router.post('/', auth, upload.array('images', 5), itemController.createItem);
router.put('/:id', auth, upload.array('images', 5), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);
router.post('/:id/like', auth, itemController.toggleLike);
router.post('/:id/view', itemController.incrementViews);

module.exports = router; 