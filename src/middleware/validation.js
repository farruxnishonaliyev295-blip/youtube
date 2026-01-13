import { BadRequesError, InternalServerError } from "../utils/error.js"
import validations from "../validations/validations.js"
class UserMiddleware{
    register = (req,res,next)=>{
        try {
            const {error} = validations.registerSchema.validae(req.body)
            if(error){
               next(new BadRequesError(400,error.details[0].message))
        }
        next()
        } catch (error) {
            throw next(new InternalServerError(500,error.message))
        }

    }
}

export default new UserMiddleware()