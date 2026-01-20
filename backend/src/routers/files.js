import {Router} from "express"
import fileController from "../controllers/files.controller.js"
import validation from "../middleware/validation.js"
import checkToken from "../middleware/checkToken.js"
const  router = Router()

router
    .post("/api/files",validation.files,fileController.createFile)

    .get("/api/files/oneUser",checkToken,fileController.getUserFiles)
 
    .get("/api/files/all",fileController.getAllFiles)

    .get("/file/:file_name",fileController.getFile)


    .put("/api/files/:fileId",checkToken,validation.title,fileController.fileUpdate)

    .delete("/api/files/:fileId", checkToken,fileController.daleteFile)

export default router