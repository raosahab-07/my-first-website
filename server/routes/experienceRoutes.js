const express = require('express');
const router = express.Router();
const { getExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getExperience);
router.post('/', protect, admin, createExperience);
router.put('/:id', protect, admin, updateExperience);
router.delete('/:id', protect, admin, deleteExperience);

module.exports = router;
