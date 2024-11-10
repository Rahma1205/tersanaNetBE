import mongoose from "mongoose";

const schema =new mongoose.Schema({
   user:{type: mongoose.Types.ObjectId, ref: 'User'} ,
   action: {
    type:String,
    required:true
},
device:{type:String,
    required:true},
    method:{
        type:String,
    required:true
    },status:{type:Number ,required:true}

},{timestamps:true})


const LogModel=mongoose.model("Log",schema);
export default LogModel;