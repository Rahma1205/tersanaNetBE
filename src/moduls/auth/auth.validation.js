import Joi from "joi";

export const signInSchema=Joi.object({
    id:Joi.string().hex().length(24),

    email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required"
    }),
    password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"))
    .required()
    .messages({
        "string.empty": "Password is required",
        "string.min": "Password should be at least 8 characters long",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    })


    });
    
