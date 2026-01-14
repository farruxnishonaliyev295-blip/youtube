import filesService from "../service/files.service.js"

class FileController{

    async createFile(req,res,next){
        try {
            const data = await filesService.creatrFile(req,next)
        } catch (error) {
            next()
        }
    }
}


export default new FileController