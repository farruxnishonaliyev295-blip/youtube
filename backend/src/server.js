import { config } from "dotenv";
import express from "express"
import fileUpload from "express-fileupload";
import indexRouter from "./routers/index.js"
import pool from "./databases/config.js"
import fs from "fs"
import cors from "cors"
import { join } from "path";
config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static(join(process.cwd(),'src','uploads')))
app.use(indexRouter.userRouter)
app.use(indexRouter.fileRouter)


app.use((error, req, res,next) => {
    if(error.status && error.status < 500){
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            name: error.name,
        }) 
    } else {
        let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${error.message}`
        fs.appendFileSync(join(process.cwd(),'src','logs','logger.txt'), errorText)

        res.status(500).json({
            status: 500, 
            message: "InternalServerError"
        })
    }
})


app.listen(process.env.PORT,() => console.log("server is run"));