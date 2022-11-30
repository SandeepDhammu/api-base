import userRouter from "./users.js";
import express from "express";
import publicRouter from "./public.js";


const mainRouter = express.Router();
mainRouter.use("/users", userRouter);
mainRouter.use("/public", publicRouter);

export default mainRouter;
