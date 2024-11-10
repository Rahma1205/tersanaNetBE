import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const schema =new mongoose.Schema({
    name: { type: String, required: true },
    revenue: { type: Number, default: 0 },
    expensesDetails: { expenses:{type: Number, default: 0} ,details:{type:String}  },
    availableToUseMoney: { type: Number, default: 0 },
user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}

},{timestamps:true})


const SportModel=mongoose.model("Sport",schema);
export default SportModel;