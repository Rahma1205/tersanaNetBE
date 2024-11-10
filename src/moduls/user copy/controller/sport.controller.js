import SportModel from "../../../../DB/models/sport.model.js";
import { handelError } from "../../../middleware/handelError.js";
import ApiFeatures from "../../../utilties/ApiFeature.js";
import { addLog } from "../../auth/auth.controller.js";

const addSport = handelError(async (req, res, next) => {
if(req.user.sportName){
   
    const add = new SportModel({
        name:req.user.sportName,
        revenue:req.body.revenue,
        expensesDetails:{expenses:req.body.expensesDetails.expenses,details:req.body.expensesDetails.details},
        availableToUseMoney:req.body.availableToUseMoney,
        user:req.user._id
    });
    const added = await add.save();
    const actionType ='Add Sport'+" "+ req.user.sportName;
    await addLog(req, actionType,res);
   return res.json({ message: "Success", added });
}else{
    const add = new SportModel({
        name:req.body.name,
        revenue:req.body.revenue,
        expensesDetails:{expenses:req.body.expensesDetails.expenses,details:req.body.expensesDetails.details},
        availableToUseMoney:req.body.availableToUseMoney,
        user:req.user._id
    });
    const added = await add.save();
    const actionType ='Add Sport'+" "+ req.body.name;
    await addLog(req, actionType,res);

   return res.json({ message: "Success", added });
}
    
    
})
const getSport = handelError(async (req, res, next) => {
    if(req.user.sportName){
        const result = await SportModel.find({ name: req.user.sportName }).populate('user', 'name email');
        const actionType ='Get Sport'+" "+ req.user.sportName;
        await addLog(req, actionType,res);
       return res.json({ message: "Success", result });
    }else{
        let apiFeature=new ApiFeatures(SportModel.find().populate('user', 'name email'),req.query).pagination().sort().search().filter().fields()  
        let result = await apiFeature.mongooesQuery;
        const actionType ='Get All Sports';
        await addLog(req, actionType,res);
        res.json({message:"Success",page:apiFeature.page,result})
    }


});
const updateSport = handelError(async (req, res, next) => {
    if(req.user.sportName){
        let result = await SportModel.findOneAndUpdate({_id:req.params.id},{
            name:req.user.sportName,
            revenue:req.body.revenue,
            expensesDetails:{expenses:req.body.expensesDetails.expenses,details:req.body.expensesDetails.details},
            availableToUseMoney:req.body.availableToUseMoney,
            user:req.user._id
        },{new:true});
        const actionType ='Update Sport'+" "+req.user.sportName;
        await addLog(req, actionType,res);
        result&&res.json({message:"Success",result})
        !result&&res.json({message:"Not found ID"})
    }else{
        let result = await SportModel.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            revenue:req.body.revenue,
            expensesDetails:{expenses:req.body.expensesDetails.expenses,details:req.body.expensesDetails.details},
            availableToUseMoney:req.body.availableToUseMoney,
            user:req.user._id
        },{new:true});
        const actionType ='Update Sport'+" "+req.body.name;
        await addLog(req, actionType,res);
        result&&res.json({message:"Success",result})
        !result&&res.json({message:"Not found ID"})
    }


});
    
const deleteSport = handelError(async (req, res, next) => {
    if(req.user.sportName){
        let result = await SportModel.findOneAndDelete({_id:req.params.id,name:req.user.sportName});
        const actionType ='Delete Sport'+" "+req.user.sportName;
        await addLog(req, actionType,res);   
         result&&res.json({message:"Success",result})
    !result&&res.json({message:"Not found ID"})
    }else{
        let result = await SportModel.findByIdAndDelete(req.params.id);
        const actionType ='Delete Sport'+" "+req.body.name;
        await addLog(req, actionType,res);   
        result&&res.json({message:"Success",result})
        !result&&res.json({message:"Not found ID"})
    }


});
    
   
    





export{
    addSport,getSport,updateSport,deleteSport
}
