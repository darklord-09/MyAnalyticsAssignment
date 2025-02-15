import mongoose from 'mongoose'
export function dbConnect(){
    try{
        mongoose.connect(`${process.env.DATABASE_URL}`).then(()=>{console.log("mongodb connected")}).catch((err)=>{console.log(err)});
        
        
    }catch(err){
        
        console.error("mongodb connection failed------",err)
    }
    
}

