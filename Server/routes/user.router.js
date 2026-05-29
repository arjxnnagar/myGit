import express from "express";
import {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/alluser",getAllUsers);
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/getuserprofile/:id",getUserProfile);
userRouter.put("/updateprofile/:id",updateUserProfile);
userRouter.delete("/deleteprofile/:id",deleteUserProfile);

export default userRouter;