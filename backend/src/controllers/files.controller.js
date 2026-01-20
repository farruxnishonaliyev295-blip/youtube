import filesService from "../service/files.service.js"

class FileController{

    async createFile(req,res,next){
        try {
            const data = await filesService.creatrFile(req,next)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next()
        }
    }

    async getUserFiles(req,res,next){
       try {
         const data = await filesService.getUserFiles(req.user.id,next);
        
            return res.status(data.status).json(data)
       } catch (error) {
            next(error);
       }
    }

    async getAllFiles(req,res,next){
        try {
            const data = await filesService.getAllFiles(req,next)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getFile(req,res,next){
        try {
            const data =await filesService.getFile(req,next)
            if(data){
            return res.status(data.status).sendFile(data.filePaht);
        }
        } catch (error) {
            next(error)
        }
    }

    async fileUpdate(req,res,next){
        try {
            const data = await filesService.fileUpdate(req,next)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async daleteFile(req,res,next){
        try {
            const data = await filesService.daleteFile(req,next)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }



}

export default new FileController()
