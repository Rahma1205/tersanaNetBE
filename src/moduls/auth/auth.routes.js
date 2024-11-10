import express from 'express'
import { signIn } from './auth.controller.js';
import { validation } from "../../middleWare/Validation.js";
import { signInSchema } from './auth.validation.js';

const authRoutes=express.Router();
authRoutes.post("/signIn",validation(signInSchema),signIn)

export default authRoutes;