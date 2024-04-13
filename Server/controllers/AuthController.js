import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const singUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassWord = await bcrypt.hash(password, salt)

    const user = new UserModel({username, email, password: hashedPassWord})

    try{
        await user.save()
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}