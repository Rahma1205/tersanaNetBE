import mongoose from "mongoose";


export const dbConnection= ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/tersana').then(()=>{
        console.log("DB connected");
        
    }).catch((err)=>{
        console.log(err);
        
    })

}