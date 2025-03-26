const { MongoClient } = require("mongodb");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "../config.env") }); // Corrected path to config.env

async function main() {
  const Db = process.env.ATLAS_URI;

  // Debugging: Log the value of ATLAS_URI
  console.log('ATLAS_URI:', Db);

  if (!Db) {
    console.error('Error: ATLAS_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process with an error code
  }

  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("tcrypto");
    const usersCollection = db.collection("users");

    // Add users to the collection
    const addUser = async (name, score) => {
      console.log("adding a user ...");
      const result = await usersCollection.inserOne({name:name, score:score});
      console.log(`${result.insertedCount} user added:`, result.insertedIds);
    };

    // Read and display all users from the collection
    const listUsers = async () => {
      console.log("Listing users...");
      const users = await usersCollection.find().toArray();
      console.log("All Users:");
      users.forEach(user => {
        console.log(`Name: ${user.name}, Score: ${user.score}`);
      });
    };

    // Perform operations
    await addUser("test", 100);
    await listUsers();
  } catch (e) {
    console.error("Error during database operations:", e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();