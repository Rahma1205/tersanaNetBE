import authRoutes from "./auth/auth.routes.js"
import logRoute from "./user copy 2/log.routes.js"
import sportRoute from "./user copy/sport.routes.js"
import userRoute from "./user/user.routes.js"



export const allRoutes =(app)=>{
    app.use("/api/v1/user",userRoute)
    app.use("/api/v1/auth",authRoutes)
    app.use("/api/v1/sport",sportRoute)
    app.use("/api/v1/auth",authRoutes)
    app.use("/api/v1/logs",logRoute)
}