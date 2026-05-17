import express from "express";
import {
    createIssue,
    updateIssuebyId,
    deleteIssuebyId,
    getAllIssue,
    getIssuebyId,
} from "../controllers/issueController.js";

const issueRouter = express.Router();


issueRouter.post("/create",createIssue);
issueRouter.put("/update/:id",updateIssuebyId);
issueRouter.delete("/delete/:id",deleteIssuebyId);
issueRouter.get("/all",getAllIssue);
issueRouter.get("/:id",getIssuebyId);

export default issueRouter;

