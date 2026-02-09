const { GoogleGenerativeAI } = require("@google/generative-ai");
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

// @desc Analyze Resume
// @route POST /api/ai/analyze-resume
exports.analyzeResume = async (req, res) => {
    const { resumeText } = req.body;

    try {
        const prompt = `You are a professional technical recruiter. Analyze the following resume text and provide a summary, key strengths, and areas for improvement.
        
        Resume Text: ${resumeText}
        
        Provide the response in the following JSON format:
        {
            "summary": "string",
            "strengths": ["string", "string"],
            "improvements": ["string", "string"]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc Suggest Skills from Projects
// @route GET /api/ai/suggest-skills
exports.suggestSkills = async (req, res) => {
    try {
        const projects = await Project.find().select('description techStack');
        const projectSummary = projects.map(p => `Project: ${p.description}, Tech: ${p.techStack.join(', ')}`).join('\n');

        const prompt = `Based on the user's projects, suggest 5 new technical skills they should learn to enhance their portfolio.
        
        Projects:
        ${projectSummary}
        
        Provide your answer in a JSON array of strings called 'suggestions'. Example: { "suggestions": ["Skill 1", "Skill 2"] }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc Recommend Projects for User
// @route GET /api/ai/recommend-projects
exports.recommendProjects = async (req, res) => {
    try {
        const skills = await Skill.find().select('name');
        const skillList = skills.map(s => s.name).join(', ');

        const prompt = `Based on the user's current skills, recommend 3 unique and impressive projects they could build.
        
        Skills: ${skillList}
        
        Provide a title and brief description for each in a JSON array called 'recommendations'.
        Example format:
        {
            "recommendations": [
                { "title": "Project Title", "description": "Brief description" }
            ]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json(JSON.parse(text));
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: error.message });
    }
};
