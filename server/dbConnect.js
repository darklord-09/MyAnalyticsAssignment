import mongoose from 'mongoose'
export function dbConnect(){
    try{
        mongoose.connect(`${process.env.DATABASE_URL}`);
        
        console.log("mongodb connected")
    }catch(err){
        
        console.error("mongodb connection failed------",err)
    }
    
}

