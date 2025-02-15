import express, { response } from 'express'

import {login} from './login.js';
import {register} from './register.js';
import {schedule, deleter,updater,loader} from './scheduler.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app= express();

dotenv.config()
app.use(cors({origin :  'https://interviewerfrontend.vercel.app' }))
app.use(express.json());
app.get('/',(req,res)=>{
    
    res.send("HELLO");
})

app.post('/login',(req,res)=>{

    if(req.body){
     login(req.body.username,req.body.password).then((result)=>{res.send(result);});
       
    }
    else{
        res.send( {
            status :404,
            success : false,
            message : "Incorrect req body",
        });
    }
});

app.post('/register',(req,res)=>{
    console.log(req.body);
    if(req.body){
     register(req.body.username,req.body.password).then((result)=>{ res.send(result);})
       
    }
    else{
        res.send( {
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
});

app.post('/schedule',(req,res)=>{
    if(req.body){
     schedule(req.body.username,req.body.candidate,req.body.interviewDate,req.body.interviewTime,req.body.status).then((result)=>{res.send(result)});
       
    }
    else{
        res.send( {
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/delete',(req,res)=>{
    if(req.body){
        
     deleter(req.body.id).then((result)=>{
        console.log(result)
        res.send(result)});
     
    }
    else{
        res.send({
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/update', (req,res)=>{
    if(req.body){
        updater(req.body.id, req.body.data).then((result)=>{res.send(result)});
        
    }
    else{
        res.send({
            status : 404,
            success : false,
            message : "Incorrect req body",
        });
    }
})

app.post('/loader',(req,res)=>{
    if(req.body){
         loader(req.body.username).then((result)=>{res.send(result)});
       
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
    
});
