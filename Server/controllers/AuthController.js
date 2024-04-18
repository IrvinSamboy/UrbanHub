import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {errorHandler} from "../utils/error.js";

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
           return next(errorHandler(404, "Usuario no encontrado"))
        }
        const validity = bcrypt.compareSync(password, user.password)
        if(!validity){
           return next(errorHandler(401, "Contraseña incorrecta"))
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET)
        const {password: pass, ...rest} = user._doc
        res.cookie("token", token, {httpOnly: true}).status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}

export const googleAuth = async (req, res, next) => {
    const {email, username, photo} = req.body
    
    try{
        const user = await UserModel.findOne({email: email})
        if(!user){
            const generatepass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const salt = await bcrypt.genSalt(10)
            const hashedPassWord = await bcrypt.hash(generatepass, salt)
            const randomunique = Math.random().toString(36).slice(-8)
            const usernameunique = username.split(" ").join("").toLowerCase() + randomunique
            const newUser = new UserModel({username: usernameunique, email, password: hashedPassWord, photo})
            await newUser.save()
            const {password: pass, ...rest} = newUser._doc
            const token = jwt.sign({id: newUser._id}, process.env.SECRET)
            rest.cookie("toker", token, {httpOnly: true}).status(200).json(rest)
        }
        else{
            const token = jwt.sign({id: user._id}, process.env.SECRET)
            const {password: pass, ...rest} = user._doc
            res.cookie("token", token, {httpOnly: true}).status(200).json(rest)
        }
    }
    catch(error){
        next(error)
    }
}