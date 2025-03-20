const mongoose = require('mongoose');
const readline = require('readline');
const path = require('path');

// Resolve and log the path to config.env
const configPath = path.resolve(__dirname, "../../config.env");
console.log('Resolved path to config.env:', configPath);

require('dotenv').config({ path: configPath }); // Use resolved path

// Debugging: Log the value of ATLAS_URI
console.log('ATLAS_URI:', process.env.ATLAS_URI);

const dbURI = process.env.ATLAS_URI;

if (!dbURI) {
  console.error('Error: ATLAS_URI is not defined in the environment variables.');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a simple user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true }, 
});
const User = mongoose.model('User', userSchema);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to add a new user to MongoDB
const addUser = async (name, score) => {
  try {
    const newUser = new User({
      name,
      score,
    });
    const savedUser = await newUser.save();

    console.log('User added successfully:', savedUser);
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    rl.close(); // Close the readline interface
    mongoose.connection.close(); // Close the database connection
  }
};

// Prompt the user for inputs
rl.question('Enter username: ', (name) => {
  rl.question('Enter score: ', (score) => {
    if (!isNaN(score)) {
      addUser(name, parseInt(score)); // Convert score to a number before saving
    } else {
      console.error('Invalid score. Please enter a numeric value.');
      rl.close();
      mongoose.connection.close();
    }
  });
});
