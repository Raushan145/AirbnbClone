import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import helmet from "helmet";
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authroutes.js';
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import listingRouter from './routes/listingRoute.js';
import bookingRouter from './routes/bookingRoutes.js';
import reviewRouter from './routes/reviewroutes.js';
import compression from 'compression';
import {apiLimiter} from "./middlewares/rateLimiter.js"
import errorHandler from './middlewares/errorHandler.js';

const app = express();

const port = process.env.PORT || 8080;

app.use(helmet());
app.use(compression());

app.use(cors({
    origin:"https://airbnbclone-b7rb.onrender.com",
    credentials:true
}))

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api", apiLimiter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/reviews", reviewRouter);


app.use((err,req,res,next) => {
  console.log(err);
  next(err)
})

app.use((req,res) => {
  res.status(404).json({message:"Page Not Found "})
})
app.use(errorHandler)
connectDB()
app.listen(port,()=>{
    console.log(`✅ Server starting .......... at ${port}`)
})

 
