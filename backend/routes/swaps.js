const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/', swapController.getAllSwaps);
router.get('/user', swapController.getUserSwaps);
router.get('/pending', swapController.getPendingSwaps);
router.get('/:id', swapController.getSwapById);
router.post('/', swapController.createSwap);
router.put('/:id', swapController.updateSwap);
router.delete('/:id', swapController.deleteSwap);
router.post('/:id/accept', swapController.acceptSwap);
router.post('/:id/reject', swapController.rejectSwap);
router.post('/:id/complete', swapController.completeSwap);

module.exports = router; 