import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import {errorHandler} from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, "Forbidden"))
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, 
        {$set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo 
        }}, {new: true})

        const {password, ...response} = updateUser._doc
        res.status(200).json(response)
    }
    catch(err){
        return next(err)
    }
}

export const singOut = async (req, res, next) => { 
    try{
        res.clearCookie("token")
        res.status(200).json({message: "Logged out"})
    }
    catch(err){
        return next(err)
    }
}