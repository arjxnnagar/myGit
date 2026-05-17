import express from "express";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/userModel.js";
import mongoose from "mongoose";

const createIssue = async (req,res)=>{
    const id = req.params.id;
    const { title, description,} = req.body;

  try {
    if (!title ) {
      res.status(400).json({ message: "Title is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      res.status(400).json({ message: "Invalid User ID" });
    }

    const newIssue = new Issue({
      title,
      repository:id,
      description,
    });

    const result = await newIssue.save();

    res.status(200).json({ message: "Issue Created", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
}

const updateIssuebyId = async (req,res)=>{
    const id = req.params.id;
    const {title , description , status} = req.body;

    try{
        const issue = await Issue.findById(id);

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
    res.status(500).json({ message: "Error in Server" });
  }
}

const deleteIssuebyId = async (req,res)=>{
    const id = req.params.id;

    try{
        const issue = await Issue.findByIdAndDelete(id);
        if(!issue){
            res.status(404).json({ message: "issue not found" });
        }
        res.status(200).json({ message: "Issue Deleted", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server" });
    }
}


const getAllIssue = async (req,res)=>{
    const id = req.params.id;

    try{
        const issue = await Issue.find({repository:id});
        if(!issue){
            res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue Deleted", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server" });
    }
}

const getIssuebyId = async (req,res)=>{
    const id = req.params.id;
    try{
        const issue = await Issue.findById(id);
        if(!issue){
            res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue Feteched", issue });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in Server" });
    }
}

export {
    createIssue,
    updateIssuebyId,
    deleteIssuebyId,
    getAllIssue,
    getIssuebyId,
};