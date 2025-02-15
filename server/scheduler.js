
const { MongoClient,ObjectId } = require('mongodb');

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

async function schedule(username, candidate, interviewDate,interviewTime,status){
    const db = await connectToDatabase();
    const collection = db.collection('data');

   try{
    await collection.insertOne({username: username,candidate : candidate,interviewDate :interviewDate,interviewTime:interviewTime,status:status})
    return {
        status : 202,
      success : true,
      message : "Entry created successfully",
  };
   }catch(err){
    return {
        status: 404,
        success : false,
        message : err,
    };
   }

}

async function deleter(id){
    
    try{
        const db = await connectToDatabase();
        const collection = db.collection('data');  
     const result=await collection.deleteOne({ _id: new ObjectId(id) });
     return {
        status : 202,
      success : true,
      message : "Entry deleted successfully",
  };
    }catch(err){
        return {
            status: 404,
            success : false,
            message : err,
        };
    }
 
 }


 async function updater(id, body){
   
    try{
        const db = await connectToDatabase();
        const collection = db.collection('data');   
     await collection.findOneAndUpdate( { _id: new ObjectId(id)}, {$set:{candidate:body.candidate,interviewDate:body.interviewDate,interviewTime:body.interviewTime,status:body.status}});
     return {
       success : true,
       message : "Entry data updated successfully",
   };
    }catch(err){
        console.log(err);
     return {
        status : 404,
         success : false,
         message : "dberror",
     };
    }
 
 }

 async function loader(username){
    try{
        const db = await connectToDatabase();
        const collection = db.collection('data'); 
        const userData=await collection.find({username : username}).toArray();
        
            const dataToSend = userData.map(doc => {
                return {
                    _id: doc._id,
                    username: doc.username,
                    candidate: doc.candidate,
                    interviewDate: doc.interviewDate,
                    interviewTime: doc.interviewTime,
                    status: doc.status
                };
            });
            console.log(dataToSend)
            return dataToSend;
        
       
       }catch(err){
           console.log(err);
        return {
           status : 404,
            success : false,
            message : err,
        };
       }
 }

export  {schedule, deleter,updater,loader};