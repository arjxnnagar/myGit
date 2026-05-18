import express from "express";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";
import mongoose from "mongoose";

export const createIssue = async (req,res)=>{
    const repoId = req.params.repoid;
    const { title, description,} = req.body;

  try {
    if (!title || !description) {
      res.status(400).json({ message: "Missing Details" });
    }
    if (!mongoose.Types.ObjectId.isValid(repoId)) {
      res.status(400).json({ message: "Invalid User ID" });
    }

    const newIssue = new Issue({
      title,
      repository:repoId,
      description,
    });

    const result = await newIssue.save();

    res.status(200).json({ message: "Issue Created", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server during Issue Creation"});
  }
}

export const updateIssuebyId = async (req,res)=>{
    const id = req.params.id;
    const {title , description , status} = req.body;

    try{
        const issue = await Issue.findById(id).populate("repository");

        if(!issue){
            res.status(404).json({ message: "issue not found" });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.status(200).json({ message: "Issue Updated", issue });
    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server during Issue Updation" });
  }
}

export const deleteIssuebyId = async (req,res)=>{
    const id = req.params.id;

    try{
        const issue = await Issue.findByIdAndDelete(id);
        if(!issue){
            res.status(404).json({ message: "issue not found" });
        }
        res.status(200).json({ message: "Issue Deleted", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server during Issue Deletion" });
    }
}


export const getAllIssue = async (req,res)=>{

    try{
        const issue = await Issue.find().populate("repository");
        if(!issue){
            res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue Deleted", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server during fetching all Issues" });
    }
}

export const getIssuebyId = async (req,res)=>{
    const id = req.params.id;
    try{
        const issue = await Issue.findById(id).populate("repository");
        if(!issue){
            res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue Feteched", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server During fetching Issue by Id" });
    }
}