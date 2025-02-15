import {User} from './models/userModel.js';
import bcrypt from 'bcryptjs';

export async function register(username, password){
    const newUser = new User();
    newUser.username = username;
    newUser.password = bcrypt.hashSync(password, 12);
    
    const findUser = await User.findOne({username: username});
    if(findUser){
        console.log("YES");
        return {
            status : 400,
            success : false,
            message : "Username already exists",
        };
    }

    else{
        try{
          await newUser.save();
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