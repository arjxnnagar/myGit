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
userRouter.post("/getuserprofile",getUserProfile);
userRouter.put("/updateprofile",updateUserProfile);
userRouter.delete("/deleteprofile",deleteUserProfile);

export default userRouter;