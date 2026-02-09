const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { protect, admin } = require('../middleware/auth');

router.post('/', sendMessage); // Public
router.get('/', protect, admin, getMessages); // Admin only
router.delete('/:id', protect, admin, deleteMessage); // Admin only

module.exports = router;
