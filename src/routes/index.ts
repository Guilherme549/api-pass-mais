import { Router } from "express";
import { usersRoutes } from "./user-register-routes";

const routes = Router()

routes.use("/users", usersRoutes)


export { routes };
