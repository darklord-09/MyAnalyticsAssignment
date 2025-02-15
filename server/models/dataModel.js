import mongoose from 'mongoose';
const userSchema = new  mongoose.Schema({
    username: {
        type : String,
        require : true,
    }, 
    candidate: {
        type : String,
        require : true,
    },
    interviewDate: {
        type : Date,
        require : true,
    },
    interviewTime: {
        type : String,
        require : true,
    },
    status:{
        type : Boolean,
        require : true,
    }


})

export const Data= new mongoose.model("Data", userSchema)

