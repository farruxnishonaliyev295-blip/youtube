import { config } from "dotenv";
import express from "express"
import fileUpload from "express-fileupload";
import indexRouter from "./routers/index.js"
import fs from "fs"
import { join } from "path";
config()

const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(indexRouter.userRouter)


app.use((error, req,res,next)=>{
    if(error.status < 500){
        return res.status(error.status).json({
            status:error.status,
            messege:error.messege,
            name:error.name
        })
    }else{
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}${error.messege}`
        fs.appendFileSync(join(process.cwd(),'src','logs','logger.txt'),errorText)
        
        res.status(error.status).json({
            status:error.status,
            messege:"InternalServerError"
        })
    }
})


app.listen(process.env.PORT,() => console.log("server is run"));