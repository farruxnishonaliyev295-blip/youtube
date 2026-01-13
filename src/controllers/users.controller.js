import usersService from "../service/users.service.js";
class UserController{
    async register(req,res){
        const data=await usersService.register(req.body,req.files)
    }
    // async login(req,res){

    // }
    // async getAllUsers(req,res){

    // }
}

export default new UserController()