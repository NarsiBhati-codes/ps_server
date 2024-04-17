import express from 'express';
import { authentication } from '../middleware/authentication.js';
import { createProject, getProjects, updateProject, deleteProject } from '../controller/projectController.js';

const router = express();


router.post('/project', authentication, createProject);   
router.get('/projects', authentication, getProjects);
router.put('/projectUpdate/:id', authentication, updateProject);
router.delete('/projectDelete/:id', authentication, deleteProject);

export default router;
