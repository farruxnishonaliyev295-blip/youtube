import {Router} from "express"
import fileController from "../controllers/files.controller.js"
import validation from "../middleware/validation.js"
const  router = Router()

router
    .post("/api/files",validation.files,fileController.createFile)

    // .get("/api/files",userController.getAllFiles)

export default router