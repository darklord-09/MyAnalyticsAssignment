const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Get the connection string from the environment variable

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(); // Return the database object
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to handle it appropriately
  }
}

