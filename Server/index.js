import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import AuthRoutes from './routes/AuthRoutes.js';

dotenv.config()

const PORT = process.env.PORT
const conectionstring = process.env.conectionstring
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(morgan("dev"))


const setUpServer = async () => {
    try{
        await mongoose.connect(conectionstring)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

setUpServer()

app.use('/api/user', AuthRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        sucess: false,
        statusCode,
        message
    })
})