import { AppError } from "../utilties/AppError.js"

export const validation = (schema) => {
    return (req, res, next) => {
        const filters = { ...req.body, ...req.params, ...req.query };

        const { error } = schema.validate(filters, { abortEarly: false });

        if (!error) {
            next();
        } else {
            const errorList = error.details.map(detail => detail.message);
            next(new AppError(errorList, 401));
        }
    }
}