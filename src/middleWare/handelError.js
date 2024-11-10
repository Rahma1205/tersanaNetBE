import { AppError } from "../utilties/AppError.js";





export const handelError = (fn) => {
    return (req, res, next) => {
        // Ensure fn is a promise, so we can catch errors
        Promise.resolve(fn(req, res,next))
            .catch(err => {
         
                next(new AppError(err.message, 500));
            });
    };
};