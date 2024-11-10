
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError } from '../../utilties/AppError.js'
import UserModel from '../../../DB/models/user.model.js'
import { handelError } from '../../middleware/handelError.js'
import LogModel from '../../../DB/models/log.model.js'


export const signIn = handelError(async (req, res, next) => {
    let { email, password } = req.body;

 
    let isFound = await UserModel.findOne({ email });

    
    if (!isFound) {
        return next(new AppError("Incorrect email or password", 401));
    }


    
    
    
    const match = await bcrypt.compare(password, isFound.password);

    if (!match) {
        return next(new AppError("Incorrect password", 401));
    }

    // If the password matches, generate a JWT token
    let token = jwt.sign(
        { name: isFound.name, userId: isFound._id, role: isFound.role },
        "token"
    );

 

    res.json({ message: "Success", token });
});


export const protectedRote=handelError(async(req,res,next)=>{
    let { token } = req.headers;

   
    if (!token) {
        return next(new AppError("Please provide a token", 401));
    }

        
        let decoded = await jwt.verify(token,"token"); 


        
        let user = await UserModel.findById(decoded.userId);
   
        
        if (!user) {
            return next(new AppError("Invalid user", 401));
        }

        
        if (user.changePasswordAt) {
            let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000); 
            if (changePasswordTime > decoded.iat) {
                return next(new AppError("Invalid token: password was changed", 401));
            }
        }
 
        req.user = user;

        next(); 
    } 
        
        


)



export const allowTo = (...roles)=>{

return handelError((req,res,next)=>{
 
    if(!roles.includes(req.user.role)) return next(new AppError("Not Authrized",403))
next()
})


}


export const addLog = async (req, action,res) => {
    try {
        const logEntry = new LogModel({
            user: req.user._id, // Use ObjectId instead of email if possible
            action,
            device: req.headers['user-agent'],
            method: req.method,
            status:res.statusCode
        });

        const addedLog = await logEntry.save();
    
    } catch (error) {
        console.error('Error adding log:', error);
        throw error;
    }
};