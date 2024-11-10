import express from "express";

import { 
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,cahngePassword
} from "./controller/user.controller.js";

import { allowTo, protectedRote,addLog } from "../auth/auth.controller.js";
import { validation } from "../../middleWare/Validation.js";
import { addUserSchema,changePasswordSchema,updateUserSchema } from "./controller/user.validation.js";


const userRoute = express.Router();

userRoute.route("/")
    .post(protectedRote,allowTo("Admin"),validation(addUserSchema), addUser)
    .get(protectedRote,allowTo("Admin"),getAllUsers);


userRoute.route("/:id")
    .get( protectedRote,allowTo("Admin"),getUserById)
    .patch(protectedRote, allowTo("Admin","User"),validation( updateUserSchema),updateUser)
    .delete( protectedRote,allowTo("Admin","User"),deleteUser);
userRoute.put("/cahngePassword/:id",protectedRote,allowTo("Admin","User"),validation(changePasswordSchema),cahngePassword)

export default userRoute;
