import {User} from '../mongodb/mongo.js'; // Assuming you have a User model defined
import jwt from 'jsonwebtoken';
const JWT_SECRET  = "";

// Controller for user signup
export const signup = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User with this email already exists.' });
        }

        // Create a new user if no duplicate is found
        const newUser = new User({ name, lastName, email, password });
        await newUser.save();
        res.status(201).json({ status: 'success', data: newUser });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};


// Controller for user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists and the password is correct
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        console.log("password is right")
        

        // Generate JWT token
        const token = jwt.sign({user}, JWT_SECRET, { expiresIn: '1h' });
        console.log("JWT token generated:", token);

        res.json({ status: 'success', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Controller to fetch user details
export const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Controller to update user details
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, lastName, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.json({ status: 'success', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Controller to delete user account
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};


