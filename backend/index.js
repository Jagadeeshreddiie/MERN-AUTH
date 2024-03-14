const express=require('express')
const mongoose=require('mongoose');
require("dotenv").config();

const {userRoute}=require('./Routes/userRoutes');
const {authRoute}=require('./Routes/authRoutes');

const cors=require("cors");
const app=express();

// middle ware

app.use(express.json());
app.use(cors());


// routes handlers

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);


// mongoose connection and server connection

mongoose.connect(process.env.MONGO_URL).then(
    app.listen(process.env.PORT,()=>{
        console.log("Mongo connected & Server is started at 3000");
    })
).catch(error=>console.log(error));

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
    // next();
})
