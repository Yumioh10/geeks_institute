import { Router } from 'express';
import { auth } from '#@/middlewares/auth.js';
import { 
    createProject, 
    getAllProjects, 
    getProjectById, 
    updateProject, 
    deleteProject 
} from '#@/modules/project/services/index.js';

const projectRouter = Router();

projectRouter.use(auth);

// GET /api/projects - READ ALL (Role filtering handled in service)
projectRouter.get('/', async (req, res) => {
    try {
        const projects = await getAllProjects(req.user);
        return res.status(200).json(projects);
    } catch (error) {
        console.error("GET /projects error:", error.message);
        return res.status(500).json({ message: 'Failed to fetch projects.' });
    }
});

// POST /api/projects - CREATE (Owner is authenticated user)
projectRouter.post('/', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Project title is required.' });
        }
        
        const newProject = await createProject({ title, description, status }, req.user._id);
        return res.status(201).json({
            message: 'Project created successfully.',
            project: newProject
        });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'Failed to create project.' });
    }
});

// GET /api/projects/:id - READ ONE (Role filtering handled in service)
projectRouter.get('/:id', async (req, res) => {
    try {
        const project = await getProjectById(req.params.id, req.user);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found or access denied.' });
        }
        
        return res.status(200).json(project);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Project ID format.' });
    }
});

// PUT /api/projects/:id - UPDATE (Ownership/Admin check handled in service)
projectRouter.put('/:id', async (req, res) => {
    try {
        const updatedProject = await updateProject(req.params.id, req.body, req.user);

        if (!updatedProject) {
             return res.status(404).json({ message: 'Project not found.' });
        }

        return res.status(200).json({
            message: 'Project updated successfully.',
            project: updatedProject
        });
    } catch (error) {
        if (error.message.includes('forbidden')) {
            return res.status(403).json({ message: error.message });
        }
        return res.status(400).json({ message: 'Update failed.' });
    }
});

// DELETE /api/projects/:id - DELETE (Ownership/Admin check handled in service)
projectRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await deleteProject(req.params.id, req.user);

        if (!deleted) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        return res.status(204).json(); // No content response
    } catch (error) {
        if (error.message.includes('forbidden')) {
            return res.status(403).json({ message: error.message });
        }
        return res.status(400).json({ message: 'Deletion failed.' });
    }
});


export default projectRouter;