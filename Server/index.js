import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import UserRoutes from './routes/UserRoutes.js';
import PropertiesRoutes from './routes/PropertiesRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config()

const PORT = process.env.PORT
const conectionstring = process.env.conectionstring
const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(morgan("dev"))

app.use(cookieParser())

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

app.use('/api/user', UserRoutes)
app.use('/api/properties', PropertiesRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        sucess: false,
        statusCode,
        message
    })
})