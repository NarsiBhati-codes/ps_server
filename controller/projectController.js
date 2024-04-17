import {Project,User} from '../mongodb/mongo.js'; // Assuming you have a Project model defined

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { title, description, technology, imageUrl ,userID } = req.body;
        
        // Check if a project with the same title already exists
        const existingProject = await Project.findOne({ title });
        if (existingProject) {
            return res.status(400).json({ status: 'error', message: 'Project with this title already exists' });
        }
        
        // Create and save the new project
        const project = new Project({ title, description, technology, imageUrl });
        await project.save();

        await User.findByIdAndUpdate({userID}, { $push: { projects: project._id } });
        
        res.status(201).json({ status: 'success', data: project });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};


// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ status: 'success', data: projects });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Update a project by ID
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technology, imageUrl } = req.body;
        const project = await Project.findByIdAndUpdate(id, { title, description, technology, imageUrl }, { new: true });
        if (!project) {
            return res.status(404).json({ status: 'error', message: 'Project not found' });
        }
        res.status(200).json({ status: 'success', data: project });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ status: 'error', message: 'Project not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
