import {Skill,User} from '../mongodb/mongo.js'; // Assuming you have a Skill model defined

// Create a new skill
export const createSkill = async (req, res) => {
    try {
        const { title, description, category , userId } = req.body;

        // Check if a skill with the same title already exists
        const existingSkill = await Skill.findOne({ title });

        if (existingSkill) {
            return res.status(400).json({ status: 'error', message: 'Skill with this title already exists.' });
        }

        // Create a new skill if no duplicate is found
        const skill = new Skill({ title, description, category });
        await skill.save();

        await User.findByIdAndUpdate(userId, { $push: { skills: skill._id } });
       
        res.status(201).json({ status: 'success', data: skill });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};


// Get all skills
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({ status: 'success', data: skills });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Update a skill by ID
export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category } = req.body;
        const skill = await Skill.findByIdAndUpdate(id, { title, description, category }, { new: true });
        if (!skill) {
            return res.status(404).json({ status: 'error', message: 'Skill not found' });
        }
        res.status(200).json({ status: 'success', data: skill });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Delete a skill by ID
export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByIdAndDelete(id);
        if (!skill) {
            return res.status(404).json({ status: 'error', message: 'Skill not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
