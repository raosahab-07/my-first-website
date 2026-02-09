const express = require('express');
const router = express.Router();
const { analyzeResume, suggestSkills, recommendProjects } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.post('/analyze-resume', analyzeResume);
router.get('/suggest-skills', suggestSkills);
router.get('/recommend-projects', recommendProjects);

module.exports = router;
