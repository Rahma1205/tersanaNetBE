import express from "express";
import { addSport ,getSport,updateSport,deleteSport} from "./controller/sport.controller.js";
import { allowTo, protectedRote } from "../auth/auth.controller.js";
import { validation } from "../../middleWare/Validation.js";
import { addSportSchema ,updateSportSchema} from "./controller/sport.validation.js";


const sportRoute = express.Router();


sportRoute.route("/").post(protectedRote,allowTo("Admin","User"),validation(addSportSchema),addSport)
.get(protectedRote,allowTo("Admin","User"),getSport)

sportRoute.route("/:id").patch(protectedRote,allowTo("Admin","User"),validation(updateSportSchema),updateSport)
.delete(protectedRote,allowTo("Admin","User"),deleteSport)




export default sportRoute;