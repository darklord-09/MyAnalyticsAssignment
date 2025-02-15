import {User} from './models/userModel.js';
import bcrypt from 'bcryptjs';

export async function login(username, password){
   
    
    
    
    const findUser = await User.findOne({username: username});
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