import express from "express";

import { 
    getAllLogs
} from "./controller/log.controller.js";
import { allowTo, protectedRote } from "../auth/auth.controller.js";

const logRoute = express.Router();

logRoute.route("/")

    .get(protectedRote,allowTo("Admin"),getAllLogs);



export default logRoute;
