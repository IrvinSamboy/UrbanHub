import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const singUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassWord = await bcrypt.hash(password, salt)

    const user = new UserModel({username, email, password: hashedPassWord})

    try{
        await user.save()
        res.status(200).json({message: "Usuario creado con exito"})
    }catch(err){
        next(err)
    }
}

export const singIn = async (req, res, next) => {
    const { email, password } = req.body
    
    try{
        const user = await UserModel.findOne({email: email})

        if(!user){
            next(error(404, "Usuario no encontrado"))
        }
        const validity = bcrypt.compareSync(password, user.password)
        if(!validity){
            next(error(401, "Contraseña incorrecta"))
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET)
        const {password: pass, ...rest} = user._doc
        res.cookie("token", token, {httpOnly: true}).status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}