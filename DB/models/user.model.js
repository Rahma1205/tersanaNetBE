import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const schema =new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true , enums:['Admin','User'],
        default:'User', }, // 'admin' or 'user'
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },cahngePasswordAt:Date,
    phone:String,
    sportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport' },
    sportName:{type:String}

},{timestamps:true})
schema.pre("save",function(){
    
     this.password=bcrypt.hashSync(this.password,7)
})
schema.pre('findOneAndUpdate', function() {
    // Check if password is being updated
    if (this._update.password) {
       
        this._update.password = bcrypt.hashSync(this._update.password, 7);
    }
    
});
const UserModel=mongoose.model("User",schema);
export default UserModel;