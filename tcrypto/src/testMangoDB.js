const mongoose = require('mongoose');
const readline = require('readline');

// rempalcer "mdp" par le vraie mot de passe
const dbURI = 'mongodb+srv://mdp:tcrypto@tcrypto.csatz.mongodb.net/?retryWrites=true&w=majority&appName=tcrypto'; // Replace with the connection string you copied from Atlas

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a simple user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true, unique: false }, // Changed BigInt to Number for compatibility
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to add a new user to MongoDB
const addUser = async (name, score) => {
  try {
    // Create a new user instance
    const newUser = new User({
      name,
      score,
    });

    // Save the user to the database
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
