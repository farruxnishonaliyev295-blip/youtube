import { NotFountError, UnauthorizedError } from "../utils/error.js"
import pool from "../databases/config.js";
import JWT from "jsonwebtoken"
export default async (req,res,next)=>{
    // console.log(req.headers);
    
    try {
        const {token} = req.headers;
    
    if(!token){
        throw new UnauthorizedError(401,"Don't send without token")
    }

    const data = JWT.verify(token, process.env.JWT_SECRET);
    
    const user = await pool.query("select*from users where id=$1",[data.id])
    
    if(!user.rowCount){
        throw new NotFountError(404, "User not fount")
    }

    req.user = data

    next()

    } catch (error) {
        if(error.name === "TokenExpiredError"){
            error.status = 400,
            next(error)
        }else{
            next(error)
        }
        
    }
}