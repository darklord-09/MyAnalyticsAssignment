
import bcrypt from 'bcryptjs';

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

export async function register(username, password){
   
    let newPassword = bcrypt.hashSync(password, 12);
    const db = await connectToDatabase();
    const collection = db.collection('Credentials');
    
    const findUser = await collection.findOne({username: username});
    if(findUser){
        
        return {
            status : 400,
            success : false,
            message : "Username already exists",
        };
    }

    else{
        try{
          await db.collection.insertOne({username : username, password: newPassword});
          return {
            status : 202,
            success : true,
            message : "User created successfully",
        };
        }catch(err){
            return {
                status : 404,
                success : false,
                message : "DBerror",
            };
        }
            
        
    }

}