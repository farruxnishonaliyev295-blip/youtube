class FileService{

    async creatrFile(req,next){
        const {title, userId} = req.body
        const { file } = req.files

        console.log(title, userId);
        console.log(file);
        
    }

}


export default new FileService()