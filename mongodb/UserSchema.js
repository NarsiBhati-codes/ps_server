import {Schema} from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
});



export {userSchema};