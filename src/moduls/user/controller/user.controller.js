
import UserModel from "../../../../DB/models/user.model.js";
import { handelError } from "../../../middleware/handelError.js";


import ApiFeatures from "../../../utilties/ApiFeature.js";
import { AppError } from "../../../utilties/AppError.js";
import { addLog } from "../../auth/auth.controller.js";


const addUser= handelError(async (req, res) => {
    let user= await UserModel.findOne({email:req.body.email}) 
    if(user) return next(new AppError("duplicate email",409))
        let add = new UserModel(req.body);
        let added = await add.save();
        const actionType ='Add User'+" "+ req.body.email;
    await addLog(req, actionType,res);
        res.json({ message: "Success", added });

   
}) 
const getAllUsers = handelError(async (req,res)=>{
    let apiFeature=new ApiFeatures(UserModel.find().populate('sportId', 'name'),req.query).pagination().sort().search().filter().fields()  
    let result = await apiFeature.mongooesQuery;

    const actionType ='Get All Users'
    await addLog(req, actionType,res);

    res.json({message:"Success",page:apiFeature.page,result});
    

})
const getUserById = handelError(async (req,res)=>{
    let result = await UserModel.find({_id:req.params.id}).populate('sportId', 'name');
    const actionType ='Get User'+" "+ req.params.email;
    await addLog(req, actionType,res);
    res.json({message:"Success",result})
})
const updateUser= handelError(async (req,res)=>{
    let result = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const actionType ='Update User'+" "+ req.params.email;
    await addLog(req, actionType,res);
    result&&res.json({message:"Success",result})
    !result&&res.json({message:"Not found ID"})
 
})
const cahngePassword= handelError(async (req,res)=>{
   
   req.body.cahngePasswordAt=Date.now()
    let result = await UserModel.findOneAndUpdate({_id:req.user._id},req.body,{new:true});
    const actionType ='Change Password For'+" "+ req.user.email;
    await addLog(req, actionType,res);
    result&&res.json({message:"Success",result})
    !result&&res.json({message:"Not found ID"})
 
})
const deleteUser =handelError(async (req,res)=>{
    let result = await UserModel.findByIdAndDelete(req.params.id);
    const actionType ='Delete User'+" "+ req.body.email;
    await addLog(req, actionType,res);
    result&&res.json({message:"Success",result})
    !result&&res.json({message:"Not found ID"})
   
  
})


export {
addUser,getAllUsers,getUserById,updateUser,deleteUser,cahngePassword
}
