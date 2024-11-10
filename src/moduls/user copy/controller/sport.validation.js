import Joi from "joi";

export const addSportSchema = Joi.object({
   
    revenue: Joi.number().required().positive(),
    expensesDetails: Joi.object({
      expenses: Joi.number().required().positive(),
      details: Joi.string()
    }).required(),
    availableToUseMoney: Joi.number().required().positive(),
    id:Joi.string().hex().length(24)
  });
  export const updateSportSchema = Joi.object({
   
    revenue: Joi.number().positive(),
    expensesDetails: Joi.object({
      expenses: Joi.number().positive(),
      details: Joi.string()
    }),
    availableToUseMoney: Joi.number().positive(),
    id:Joi.string().hex().length(24)
  });