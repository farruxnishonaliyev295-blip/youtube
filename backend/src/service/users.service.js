import pool from "../databases/config.js";
import {extname, join} from "path"
import {comparePassword, hashPassword} from "../utils/bcrypt.js"
import JWT from "jsonwebtoken"
import { BadRequesError, ConflictError, InternalServerError, NotFountError } from "../utils/error.js";

class UserService{
    async register(body,files,next){
        const {username, password} = body;
        const avatar = files.avatar; 

        const fileName = Date.now() + extname(avatar.name);

        const existFile = [".png",".jpg",".jpeg",".svg"]

        if(!existFile.includes(extname(avatar.name))){
            throw new BadRequesError(400,"file format mos emas")
        }
        const existUser = await pool.query(
            "select *from users where username=$1",
            [username])
        if(existUser.rowCount){
           throw new ConflictError(409,"User already exist")
        }
 
        const newUser = await pool.query("insert into users(username,password,avatar) values ($1,$2,$3) RETURNING *",
            [username, await hashPassword(password),fileName ]
        );

        avatar.mv(join(process.cwd(),"src","uploads", "imgs",fileName),(err) =>{
            if(err){
                next(new InternalServerError(500,err))
            };
            
        });
        return{
            status:201,
            message:"User success created",
            accessToken:JWT.sign({id:newUser.rows[0].id,
                username:newUser.rows[0].username},
                process.env.JWT_SECRET,{expiresIn:'10m'}
            ),
            refreshToken:JWT.sign({id:newUser.rows[0].id,
                username:newUser.rows[0].username},
                process.env.JWT_SECRET,{expiresIn:'1d'}
            )
        }
    }

    async login(body,next){
        const { username, password} = body;
        
        const existUser = await pool.query(
            "select *from users where username=$1",
            [username])
        if(!existUser.rowCount){
           throw new NotFountError(404,"username or password wrong")
        }

        if(!(await comparePassword(password,existUser.rows[0].password))){
           throw new NotFountError(404,"username or password wrong")
        }
         return{
            status:200,
            message:"User success created",
            accessToken:JWT.sign({id:existUser.rows[0].id,
                username:existUser.rows[0].username},
                process.env.JWT_SECRET,{expiresIn:'30m'}
            ),
            refreshToken:JWT.sign({id:existUser.rows[0].id,
                username:existUser.rows[0].username},
                process.env.JWT_SECRET,{expiresIn:'1d'}
            )
        }

    } 
    async getAllUsers(){
        const users = await pool.query("select id, username,avatar from users")
        return users.rows
    }
}

export default new UserService()