
import LogModel from "../../../../DB/models/log.model.js";
import UserModel from "../../../../DB/models/user.model.js";
import { handelError } from "../../../middleware/handelError.js";


import ApiFeatures from "../../../utilties/ApiFeature.js";
import { AppError } from "../../../utilties/AppError.js";



const getAllLogs = handelError(async (req, res) => {
    let apiFeature = new ApiFeatures(LogModel.find().populate('user', 'name email role '),req.query).pagination().sort().search().filter().fields()
    let result = await apiFeature.mongooesQuery;
    res.json({ message: "Success", page: apiFeature.page, result });
  
})


export {
    getAllLogs
}
