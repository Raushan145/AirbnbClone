import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

userRouter.get("/currentUser", isAuth, getCurrentUser);

export default userRouter;