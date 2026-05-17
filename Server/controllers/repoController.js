import express from "express";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/userModel.js";
import mongoose from "mongoose";

const createRepository = async (req, res) => {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      res.status(400).json({ message: "Repo Name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      res.status(400).json({ message: "Invalid User ID" });
    }

    const newRepo = new Repository({
      owner,
      name,
      visibility,
      content,
      issues,
      description,
    });

    const result = await newRepo.save();

    res.status(200).json({ message: "Repo Created", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

const getAllRepositories = async (req, res) => {
  try {
    const repoData = await Repository.find()
      .populate("owner")
      .populate("issues");
    res.json(repoData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

const fetchRepositoryById = async (req, res) => {
  const repoId = req.params.id;

  try {
    const result = await Repository.findById(repoId)
      .populate("owner")
      .populate("issues");
    res.status(200).json({ message: "Repo fetched by Id", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

const fetchRepositoryByName = async (req, res) => {
  const name = req.params.name;

  try {
    const result = await Repository.find({ name: name }).populate("owner");
    res.status(200).json({ message: "Repo fetched by name", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  const userId = req.params.userID;

  try {
    const result = await Repository.find({ owner: userId })
      .populate("owner")
      .populate("issues");
    if (!result) {
      res.status(404).json({ message: "No repo for this user" });
    }

    res.status(200).json({ message: "Repo fetched by Id", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

const updateRepositoryById = async (req, res) => {
  const id = req.params.id;
  const { content, description } = req.body;

  try {
    let updatedFields = {};
    if (content) {
      updatedFields.content = content;
    }
    if (description) {
      updatedFields.description = description;
    }

    const repo = await Repository.findByIdAndUpdate(id, updatedFields, {
      returnDocument: "after",
    });
    if (!repo) {
      return res.status(404).json({ message: "No repo for updation" });
    }
    res.status(200).json({ message: "Repo updated by Id", repo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};
const toggleVisibilityById = async (req, res) => {
  const id = req.params.id;

  try {
    const repo = await Repository.findById(id);

    if (!repo) {
      return res.status(404).json({
        message: "No repo to toggle",
      });
    }

    repo.visibility = !repo.visibility;

    const updatedRepo = await repo.save();

    res.status(200).json({
      message: "Repo toggled",
      repo: updatedRepo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};
const deleteRepositoryById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Repository.findByIdAndDelete(id);
    if(!result){
      return res.status(404).json({ message: "No repo for deletion" });
    }

    res.status(200).json({message:"Repo deleted succesfully"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in Server" });
  }
};

export {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
