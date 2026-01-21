import pool from "../databases/config.js"
import { BadRequesError, InternalServerError, NotFountError } from "../utils/error.js"
import {extname,join} from "path"
import fs from "fs"
class FileService{

    async getUserFiles(userId,next){
        let files = await pool.query("select * from files where user_id=$1",[userId])

        if(!files.rowCount){
            return{
                status:200,
                message:"User has no videos",
                files: []
            }
        }
        return{
            status:200,
            files:files.rows
        }
    }

    async getAllFiles(req,next){
      const { title} = req.query
      let files
      
      if(!title){
       files =
        await pool.query(`select files.id ,files.title, files.size, files.created_at, files.file_name,
        json_build_object(
        'id', users.id,
        'name',users.username,
        'avatar',users.avatar
        )AS user from files
        inner join users on users.id = files.user_id 
        `);
      }else{
        files =
          await pool.query(`select files.id ,files.title, files.size, files.created_at, files.file_name,
        json_build_object(
        'id', users.id,
        'name',users.username,
        'avatar',users.avatar
        )AS user from files
        inner join users on users.id = files.user_id 
        where title ilike '%${title}%'
        `);
      }
      return{
          status:200,
          files:files.rows
        }
        
    }

    async getFile(req,next){
      const { file_name} = req.params
      
      const existFile = [".mp4",".webm",".mpeg",".avi",".mkv",".m4v",".ogm",".mov",".mpg"]
      const existFileAvatar = [".png",".jpg",".jpeg",".svg"]
      let filePaht

      if(existFile.includes(extname(file_name))){
        filePaht = join(process.cwd(),'src','uploads','videos',file_name)
      }else if(existFileAvatar.includes(extname(file_name))){
        filePaht = join(process.cwd(),'src','uploads','imgs',file_name)
      }else{
        throw new NotFountError(404,"File name not fount")
      }

      return{
        status:200,
        filePaht
      }
    }

    async creatrFile(req,next){
        const {title} = req.body
        const {id} = req.user        
        const {file} = req.files; 

        const existFile = [".mp4",".webm",".mpeg",".avi",".mkv",".m4v",".ogm",".mov",".mpg"]

        if(!existFile.includes(extname(file.name))){
            throw new BadRequesError(400,"Not support file")
        }
        const fileName = new Date().getTime() + extname(file.name)

        if((file.size / 1024 / 1024) < 1){
           file.size =  Math.ceil((file.size / 1024 / 1024))
        }else{
            file.size =  Math.floor((file.size / 1024 / 1024))
        }
        
        const existUser = await pool.query("select * from users where id=$1",[id])
        if(!existUser.rowCount){
            throw new NotFountError(404, "User not fount")
        }

        file.mv(join(process.cwd(),"src","uploads","videos",fileName), error =>{
            if(error){
                throw new InternalServerError(500, error)
            }
        })

        await pool.query("insert into files(title,file_name,size,user_id) values($1,$2,$3,$4)",[title,fileName,file.size,id,])
    
        return{
            status:201,
            message:"file success created"
        }
    }

    async fileUpdate(req,next){
      const { id } = req.user
      const { fileId } = req.params
      const { title } = req.body


      const existFile = await pool.query("SELECT * FROM files WHERE id=$1 AND user_id=$2",[fileId, id]);
      if (!existFile.rowCount) {
          throw new NotFountError(404, "This file does not belong to you");
    }

    await pool.query("UPDATE files set title=$1 where id=$2",[title,fileId])

    return{
      status:201,
      message:"File successfully update"
    }
    }

    async daleteFile(req) {
      const { id } = req.user;    
      const { fileId } = req.params;


  const existFile = await pool.query(
    "SELECT * FROM files WHERE id=$1 AND user_id=$2",
    [fileId, id]
  );

  if (!existFile.rowCount) {
    throw new NotFountError(404, "This file does not belong to you");
  }

  const filePath = join(
    process.cwd(),
    "src",
    "uploads",
    "videos",
    existFile.rows[0].file_name
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await pool.query("DELETE FROM files WHERE id = $1", [fileId]);

  return {
    status: 200,
    message: "File successfully deleted",
  };
    }

    async download(req){
      const {file_name} = req.params
      
      const existFile = [
        ".mp4",
        ".webm",
        ".mpeg",
        ".avi",
        ".mkv",
        ".m4v",
        ".ogm",
        ".mov",
        ".mpg"
      ];
      
      let filePaht

      if(existFile.includes(extname(file_name))){
        filePaht = join(process.cwd(),'src','uploads','videos',file_name)
      }else{
        throw new NotFountError(404,"File name not fount")
      }

      return{
        status:200,
        filePaht
      }
    
    }

}

export default new FileService()