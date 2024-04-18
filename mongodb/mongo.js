import mongoose from "mongoose";
 mongoose.connect('');

const UserSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  // Assume this.password is the hashed password stored in the database

  return new Promise((resolve, reject) => {
      // Compare the candidate password with the stored hashed password
      if (candidatePassword === this.password) {
          resolve(true); // Passwords match
      } else {
          resolve(false); // Passwords do not match
      }
  });
};


const SkillSchema = new  mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Programming', 'Design', 'Marketing', 'Other'], // Example categories, you can customize as needed
      required: true,
    },
  });

const ProjectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technology: {
      type: [String], // Assuming technology can be an array of strings
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  });


const User = mongoose.model("User", UserSchema);
const Skill = mongoose.model( "Skill" , SkillSchema);
const Project = mongoose.model("Project", ProjectSchema);

export {User, Skill, Project};