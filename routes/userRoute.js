import express from 'express';
import {authentication} from '../middleware/authentication.js';
import  {signup,login,userDetails,updateUser,deleteUser} from '../controller/userController.js';

const router = express();

// User Routes
// Sign up a new user (access: all)
router.post('/signup', signup); 


// Log in an existing user (access: all)
router.post('/login', login);  


// Get details of the logged-in user (access: authenticated users only)
router.get('/details',authentication, userDetails);    


// Update the details of the logged-in user (access: authenticated users only)
router.put('/update',authentication, updateUser);    


// Delete the account of the logged-in user (access: authenticated users only)
router.delete('/delete',authentication, deleteUser);    

export default router;