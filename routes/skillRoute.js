import express from 'express';
import { authentication } from '../middleware/authentication.js';
import { createSkill, getSkills, updateSkill, deleteSkill } from '../controller/skillController.js';

const router = express();

router.post('/skill', authentication, createSkill);
router.get('/skills', authentication, getSkills);
router.put('/skills/:id', authentication, updateSkill);
router.delete('/skills/:id', authentication, deleteSkill);

export default router;
