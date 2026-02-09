const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getSkills);
router.post('/', protect, admin, createSkill);
router.put('/:id', protect, admin, updateSkill);
router.delete('/:id', protect, admin, deleteSkill);

module.exports = router;
