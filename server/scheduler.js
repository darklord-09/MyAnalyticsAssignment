import {Data} from './models/dataModel.js';

async function schedule(username, candidate, interviewDate,interviewTime,status){
   const newData=new Data();
   newData.username=username;
   newData.candidate=candidate;
   newData.interviewDate=interviewDate;
   newData.interviewTime=interviewTime;
   newData.status=status;

   try{
    await newData.save();
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
     await Data.findByIdAndDelete(id);
     return {
       status : 202, 
       success : true,
       message : "Entry deleted successfully",
   };
    }catch(err){
     return {
        status : 404,
         success : false,
         message : err,
     };
    }
 
 }


 async function updater(id, body){
   
    try{
        
     await Data.findByIdAndUpdate(id, {$set:{candidate:body.candidate,interviewDate:body.interviewDate,interviewTime:body.interviewTime,status:body.status}});
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
        const userData=await Data.find({username : username});
        return {
           status : 202, 
          success : true,
          message : userData,
      };
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