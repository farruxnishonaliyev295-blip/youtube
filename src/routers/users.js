import {Router} from "express"
import userController from "../controllers/users.controller.js"
import validation from "../middleware/validation.js"
const  router = Router()

router
    .post("/api/register",validation.register,userController.register)
    // .post("/api/login",validation,userController.login)

    // .get("/api/users".userController.getAllUsers)

export default router