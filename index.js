import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from 'cors'

import { dbConnection } from './DB/connection.js';
import { allRoutes } from './src/moduls/routes.js';
import { AppError } from './src/utilties/AppError.js';

const app= express()
const port =  process.env.PORT || 8080;




app.use(express.json())

allRoutes(app)
dbConnection()
app.use(cors());
app.use("*",(req,res,next)=>{
    next(new AppError("URL not found",404))
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).json({message:err.message})
  })
app.listen(port,()=>{
    console.log(`srever rnning on port ${port}`);
    
})


