import {User} from './models/userModel.js';
import bcrypt from 'bcryptjs';
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL; // Get the connection string from the environment variable

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


export async function login(username, password){
   
    const db = await connectToDatabase();
    const collection = db.collection('Credentials');
    
    const findUser = await collection.findOne({username: username});
    if(findUser){
        const hash = findUser.password;
        const compareResult = bcrypt.compareSync(password, hash);
        if(compareResult===true){
        return {
            status : 202,
            success : true,
            message : "Login successful",
        };}
        else{
        return {
            status : 400,
            success : false,
            message : "Wrong password or username",
        };
    }
    }

    else{
        
            return {
                status : 400,
                success : false,
                message : "Wrong password or username",
            };
        
    }

}