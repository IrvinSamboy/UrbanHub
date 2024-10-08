import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) return next(errorHandler(401, "Unauthorized"))

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return next(errorHandler(403, "Forbidden"))

        req.user = user
        next()
    })
}