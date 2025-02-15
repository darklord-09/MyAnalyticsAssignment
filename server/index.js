import express, { response } from 'express'
import { dbConnect } from './dbConnect.js'; 
import {login} from './login.js';
import {register} from './register.js';
import {schedule, deleter,updater,loader} from './scheduler.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app= express();

dotenv.config()
app.use(cors({origin : 'https://interviewerfrontend.vercel.app'}))
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("HELLO");
})

app.post('/login',async(req,res)=>{

    if(req.body){
       const result = await login(req.body.username,req.body.password);
       res.send(result);
    }
    else{
        res.send( {
            status :404,
            success : false,
            message : "Incorrect req body",
        });
    }
});

app.post('/register',async (req,res)=>{
    console.log(req.body);
    if(req.body){
        const result = await register(req.body.username,req.body.password);
        res.send(result);
    }
    else{
        res.send( {
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
});

app.post('/schedule',async(req,res)=>{
    if(req.body){
       const result = await schedule(req.body.username,req.body.candidate,req.body.interviewDate,req.body.interviewTime,req.body.status);
       res.send(result);
    }
    else{
        res.send( {
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/delete',async(req,res)=>{
    if(req.body){
      const result =  await deleter(req.body.id);
      res.send(result);
    }
    else{
        res.send({
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/update',async (req,res)=>{
    if(req.body){
        const result = await updater(req.body.id, req.body.data);
        res.send(result);
    }
    else{
        res.send({
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/loader',async(req,res)=>{
    if(req.body){
        const result = await loader(req.body.username);
        res.send(result);
    }
    else{
        res.send({
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})


const port =process.env.PORT||3000

app.listen(port,(req,res)=>{console.log("server running")
    dbConnect()
});
