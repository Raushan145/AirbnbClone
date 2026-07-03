import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authroutes.js';
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import listingRouter from './routes/listingRoute.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin:"https://airbnbclone-b7rb.onrender.com",
    credentials:true
}))
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://10.146.230.189:5173",
//   ],
//   credentials: true,
// }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/booking", bookingRouter);


connectDB()
app.listen(port,()=>{
    console.log(`✅ Server starting .......... at ${port}`)
})

 
