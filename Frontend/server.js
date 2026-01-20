import express from "express"
import {join} from "path"
const app =express()

app.use(express.static(join(process.cwd(),"css")))
app.get("/home",(req,res) =>{
    console.log(req.url);
    
    res.sendFile(join(process.cwd(),"index.html"))
})

app.listen(9090,()=> console.log("Front server is running"))