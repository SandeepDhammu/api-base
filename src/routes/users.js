import {
  update,
  search,
  getById,
  remove,
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/users.js";
import express from "express";
import decorate from "../middlewares/response.js";
import { validateToken } from "../middlewares/auth.js";

const userRouter = express.Router();
userRouter.use(decorate);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/:id", validateToken, update);
userRouter.get("/", validateToken, search);
userRouter.get("/:id", validateToken, getById);
userRouter.delete("/", validateToken, remove);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.put("/resetPassword/:id", resetPassword);
userRouter.put("/updatePassword/:id", validateToken, updatePassword);

export default userRouter;
