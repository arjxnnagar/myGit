import express from "express";
import userRouter from "./user.router.js";
import repoRouter from "./repo.router.js";
import issueRouter from "./issue.router.js";

const mainRouter = express.Router();


mainRouter.use("/user",userRouter);
mainRouter.use("/repo",repoRouter);
mainRouter.use("/issue",issueRouter);
mainRouter.get("/",(req,res)=>{
    res.send("welcome to server");
});

export default mainRouter;
