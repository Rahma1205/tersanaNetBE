import Joi from "joi";

export const addUserSchema=Joi.object({
    id:Joi.string().hex().length(24),
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name should have at least 3 characters",
        "string.max": "Name should not exceed 30 characters"
    }),
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
    }),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required().messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number should contain only digits",
        "string.min": "Phone number should have at least 10 digits",
        "string.max": "Phone number should not exceed 15 digits"
    }),
    sportName: Joi.string().min(3).max(50).optional().messages({
        "string.min": "Sport name should have at least 3 characters",
        "string.max": "Sport name should not exceed 50 characters"
    }),
    role: Joi.string()


    });
    export const updateUserSchema=Joi.object({
        id:Joi.string().hex().length(24),
        name: Joi.string().min(3).max(30).messages({
           
            "string.min": "Name should have at least 3 characters",
            "string.max": "Name should not exceed 30 characters"
        }),
        email: Joi.string().email().messages({
            "string.email": "Please enter a valid email address",
            
        }),
        password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"))
        
        .messages({
          
            "string.min": "Password should be at least 8 characters long",
            "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }),
        phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).messages({
           
            "string.pattern.base": "Phone number should contain only digits",
            "string.min": "Phone number should have at least 10 digits",
            "string.max": "Phone number should not exceed 15 digits"
        }),
        sportName: Joi.string().min(3).max(50).optional().messages({
            "string.min": "Sport name should have at least 3 characters",
            "string.max": "Sport name should not exceed 50 characters"
        }),
        role: Joi.string()
    
    
        });

        export const changePasswordSchema=Joi.object({
            id:Joi.string().hex().length(24),
            password: Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"))
            .required()
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password should be at least 8 characters long",
                "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            }),
           
        
        
            });
